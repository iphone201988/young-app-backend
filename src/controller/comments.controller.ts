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

const addComment = TryCatch(
  async (
    req: Request<{}, {}, AddCommentRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { userId, user } = req;
    const { id, comment, type } = req.body;

    let newComment: CommentsModel;

    if (type == "post") {
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

    let comments: any, total: number;

    if (type == "post") {
      const post = await getPostById(id);

      comments = await Comments.find({ postId: id })
        .populate("userId", "_id firstName lastName profileImage")
        .select("-updatedAt -__v")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
      total = await Comments.countDocuments({ postId: id });
    }

    if (type == "vault") {
      const vault = await getVaultById(id);
      comments = await Comments.find({ vaultId: id })
        .populate("userId", "_id firstName lastName profileImage")
        .select("-updatedAt -__v -likedBy")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
      total = await Comments.countDocuments({ vaultId: id });
    }

    comments = comments.map((comment: any) => {
      if (comment?.likedBy?.includes(userId)) {
        return {
          ...comment.toObject(),
          isLiked: true,
        };
      } else {
        return {
          ...comment.toObject(),
          isLiked: false,
        };
      }
    });

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
      `Comment ${isLiked ? "disliked" : "liked"} successfully`
    );
  }
);

export default {
  addComment,
  getAllComments,
  likeDislikeComment,
};
