import { NextFunction, Request, Response } from "express";
import { SUCCESS, TryCatch, getFiles } from "../utils/helper";
import Post from "../model/post.model";
import { CreatePostRequest } from "../../types/API/Post/types";

const createPost = TryCatch(
  async (
    req: Request<{}, {}, CreatePostRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { userId } = req;
    const { title, symbol, topic, description, type, scheduleDate } = req.body;
    const files = getFiles(req, ["image"]);

    await Post.create({
      userId,
      title,
      symbol,
      topic,
      description,
      image: files.image[0],
      scheduleDate: scheduleDate ? scheduleDate : undefined,
      type: type,
    });

    return SUCCESS(res, 201, "Post created successfully");
  }
);

const getPosts = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req;
    const { type, userType, sort, page = 1, limit = 10 } = req.query;

    const posts = await Post.aggregate([
      {
        $match: {
          userId,
          type,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $match: {
          "user.role": userType,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    return SUCCESS(res, 200, "Posts fetched successfully", { data: { posts } });
  }
);

export default {
  createPost,
  getPosts,
};
