import { NextFunction, Request, Response } from "express";
import { SUCCESS, TryCatch } from "../utils/helper";
import { getVaultById } from "../services/vault.services";
import ErrorHandler from "../utils/ErrorHandler";
import Comments from "../model/comments.model";
import { postType } from "../utils/enums";
import { getPostById } from "../services/post.services";
import {
  AddCommentRequest,
  GetCommentsRequest,
} from "../../types/API/Comment/types";
import { CommentsModel } from "../../types/Database/types";
import mongoose from "mongoose";

const addComment = TryCatch(
  async (
    req: Request<{}, {}, AddCommentRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { userId, user } = req;
    const { id, comment, type } = req.body;

    let newComment: CommentsModel;

    if (type == "share") {
      const post = await getPostById(id);

      newComment = await Comments.create({
        userId,
        postId: post._id,
        comment,
        type: postType.SHARE,
      });
    }
    if (type == "vault") {
      const vault = await getVaultById(id);

      const isMember = vault.members.includes(userId);

      if (!isMember)
        return next(
          new ErrorHandler("You are not a member of this vault", 403)
        );

      newComment = await Comments.create({
        userId,
        vaultId: id,
        comment,
        type: postType.VAULT,
      });
    }

    return SUCCESS(res, 200, `Comment added successfully`, {
      data: {
        comment: {
          ...newComment.toObject(),
          userId: {
            _id: userId,
            firstName: user.firstName,
            lastName: user.lastName,
            profileImage: user?.profileImage,
          },
          isLiked: false,
          likedBy: undefined,
          __v: undefined,
          updatedAt: undefined,
        },
      },
    });
  }
);

const getAllComments = TryCatch(
  async (
    req: Request<{}, {}, {}, GetCommentsRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { userId } = req;
    let { id, type, page = 1, limit = process.env.LIMIT } = req.query;
    page = Number(page);
    limit = Number(limit);
    const skip = (page - 1) * limit;

    let comments: any;

    const query: any = {};

    if (type == "share") {
      const post = await getPostById(id);
      query.postId = new mongoose.Types.ObjectId(id);
    }

    if (type == "vault") {
      const vault = await getVaultById(id);
      query.vaultId = new mongoose.Types.ObjectId(id);
    }

    const total = await Comments.countDocuments(query);

    comments = await Comments.aggregate([
      {
        $match: query,
      },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: "users",
          let: { userId: "$userId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$userId"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                firstName: 1,
                lastName: 1,
                profileImage: 1,
                role: 1,
              },
            },
          ],
          as: "userId",
        },
      },
      {
        $unwind: "$userId",
      },
      {
        $addFields: {
          likesCount: { $size: "$likedBy" },
          isLiked: {
            $cond: {
              if: {
                $in: [new mongoose.Types.ObjectId(userId), "$likedBy"],
              },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $project: {
          updatedAt: 0,
          __v: 0,
          likedBy: 0,
        },
      },
    ]);

    return SUCCESS(res, 200, "Comments fetched successfully", {
      data: {
        comments,
        pagination: { total: Math.ceil(total / limit), page, limit },
      },
    });
  }
);

const likeDislikeComment = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { userId } = req;

    const comment = await Comments.findById(id);
    if (!comment) return next(new ErrorHandler("Comment not found", 404));

    const isLiked = comment.likedBy.includes(userId);

    if (isLiked) {
      await Comments.findByIdAndUpdate(id, {
        $pull: { likedBy: userId },
      });
    } else {
      await Comments.findByIdAndUpdate(id, {
        $push: { likedBy: userId },
      });
    }

    return SUCCESS(
      res,
      200,
      `Comment ${isLiked ? "disliked" : "liked"} successfully`,
      {
        data: {
          commentId: id,
        },
      }
    );
  }
);

export default {
  addComment,
  getAllComments,
  likeDislikeComment,
};
