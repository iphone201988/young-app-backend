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

const addComment = TryCatch(
  async (
    req: Request<{}, {}, AddCommentRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { userId } = req;
    const { id, comment, type } = req.body;

    if (type == "post") {
      const post = await getPostById(id);

      await Comments.create({
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

      await Comments.create({
        userId,
        vaultId: id,
        comment,
        type: postType.VAULT,
      });
    }

    return SUCCESS(res, 200, `Comment added successfully`);
  }
);

const getAllComments = TryCatch(
  async (
    req: Request<{}, {}, {}, GetCommentsRequest>,
    res: Response,
    next: NextFunction
  ) => {
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
        .select("-updatedAt -__v")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
      total = await Comments.countDocuments({ vaultId: id });
    }

    return SUCCESS(res, 200, "Comments fetched successfully", {
      data: { comments, pagination: { total, page, limit } },
    });
  }
);

export default {
  addComment,
  getAllComments,
};
