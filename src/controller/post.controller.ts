import { NextFunction, Request, Response } from "express";
import { SUCCESS, TryCatch, getFiles } from "../utils/helper";
import Post from "../model/post.model";
import {
  AddCommentsRequest,
  CreatePostRequest,
  GetPostsRequest,
  PostIdRequest,
} from "../../types/API/Post/types";
import { getPostById } from "../services/post.services";
import Comments from "../model/comments.model";
import mongoose from "mongoose";
import User from "../model/user.model";
import { postType, ratingsType } from "../utils/enums";
import ErrorHandler from "../utils/ErrorHandler";
import Ratings from "../model/ratings.model";
import SavedItems from "../model/savedItems.model";

const createPost = TryCatch(
  async (
    req: Request<{}, {}, CreatePostRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { userId } = req;
    const { title, symbol, topic, description, type, scheduleDate } = req.body;
    const files = getFiles(req, ["image"]);

    const post = await Post.create({
      userId,
      title,
      symbol,
      topic,
      description,
      image: files.image[0],
      scheduleDate: scheduleDate ? scheduleDate : undefined,
      type: type,
    });

    return SUCCESS(res, 201, "Post created successfully", {
      data: { post: { ...post, userId: undefined } },
    });
  }
);

const getPosts = TryCatch(
  async (
    req: Request<{}, {}, {}, GetPostsRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { user, userId } = req;
    let {
      type,
      userType,
      sort,
      page = 1,
      limit = process.env.LIMIT,
    } = req.query;
    page = Number(page);
    limit = Number(limit);
    const skip = (Number(page) - 1) * limit;

    const total = await Post.aggregate([
      {
        $match: {
          type,
          isDeleted: false,
        },
      },
      {
        $lookup: {
          from: "users",
          let: { userId: "$userId" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$userId"] },
                role: userType,
              },
            },
          ],
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $count: "count",
      },
    ]);

    const posts = await Post.aggregate([
      {
        $match: {
          type,
          isDeleted: false,
        },
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
                $expr: { $eq: ["$_id", "$$userId"] },
                role: userType,
              },
            },
            {
              $project: {
                firstName: 1,
                lastName: 1,
                profileImage: 1,
                _id: 1,
              },
            },
          ],
          as: "userId",
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "comments",
        },
      },
      {
        $lookup: {
          from: "reports",
          let: { id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$postId", "$$id"] },
                reporterUserId: new mongoose.Types.ObjectId(userId),
              },
            },
            {
              $project: {
                reason: 1,
                _id: 1,
              },
            },
          ],
          as: "isReported",
        },
      },
      // {
      //   $lookup: {
      //     from: "ratings",
      //     localField: "_id",
      //     foreignField: "postId",
      //     as: "ratings",
      //   },
      // },
      {
        $lookup: {
          from: "ratings",
          let: { id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$postId", "$$id"] },
                type: ratingsType.SHARE,
                senderId: new mongoose.Types.ObjectId(userId),
              },
            },
            {
              $project: {
                ratings: 1,
                _id: 1,
              },
            },
          ],
          as: "ratings",
        },
      },
      {
        $unwind: {
          path: "$ratings",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $set: {
          ratings: "$ratings.ratings",
        },
      },
      {
        $lookup: {
          from: "saveditems",
          let: { postId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$item", "$$postId"] },
                    { $eq: ["$itemType", type] },
                    { $eq: ["$userId", new mongoose.Types.ObjectId(userId)] },
                  ],
                },
              },
            },
          ],
          as: "savedItems",
        },
      },
      {
        $addFields: {
          commentsCount: { $size: "$comments" },
          likesCount: { $size: "$likedBy" },
          isReported: { $gt: [{ $size: "$isReported" }, 0] },
          isSaved: { $gt: [{ $size: { $ifNull: ["$savedItems", []] } }, 0] },
          isLiked: {
            $cond: {
              if: {
                // $in: [new mongoose.Types.ObjectId(userId), "$savedByUsers"],
                $in: [new mongoose.Types.ObjectId(userId), "$likedBy"],
              },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $unwind: "$userId",
      },
      {
        $project: {
          __v: 0,
          updatedAt: 0,
          isPublished: 0,
          isDeleted: 0,
          comments: 0,
          likedBy: 0,
          savedItems: 0,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    return SUCCESS(res, 200, "Posts fetched successfully", {
      data: { posts },
      pagination: {
        total: total[0]?.count || 0,
        page: Number(page),
        limit: Number(limit),
      },
    });
  }
);

// const addComments = TryCatch(
//   async (
//     req: Request<{}, {}, AddCommentsRequest>,
//     res: Response,
//     next: NextFunction
//   ) => {
//     const { userId } = req;
//     const { postId, comment } = req.body;

//     const post = await getPostById(postId);

//     await Comments.create({
//       userId,
//       postId: post._id,
//       comment,
//       type: postType.SHARE,
//     });

//     return SUCCESS(res, 201, "Comment added successfully");
//   }
// );

// const getAllComments = TryCatch(
//   async (req: Request<PostIdRequest>, res: Response, next: NextFunction) => {
//     const { postId } = req.params;

//     const post = await getPostById(postId);

//     const comments = await Comments.find({ postId: post._id })
//       .populate("userId", "_id firstName lastName profileImage")
//       .select("-updatedAt -__v")
//       .sort({ createdAt: -1 });

//     return SUCCESS(res, 200, "Comments fetched successfully", {
//       data: { comments },
//     });
//   }
// );

const saveUnsavePost = TryCatch(
  async (req: Request<PostIdRequest>, res: Response, next: NextFunction) => {
    const { userId, user } = req;
    const { postId } = req.params;
    const { type } = req.query;

    const existingSavedPost = await SavedItems.findOne({
      userId,
      item: postId,
      itemType: type,
    });

    if (existingSavedPost) {
      await SavedItems.deleteOne({ _id: existingSavedPost._id });
    } else {
      await SavedItems.create({ userId, item: postId, itemType: type });
    }

    return SUCCESS(
      res,
      200,
      `Post ${existingSavedPost ? "unsaved" : "saved"} successfully`,
      {
        data: {
          postId,
        },
      }
    );
  }
);

const likeDislikePost = TryCatch(
  async (req: Request<PostIdRequest>, res: Response, next: NextFunction) => {
    const { userId } = req;
    const { postId } = req.params;

    const post = await getPostById(postId);

    const isLiked = post.likedBy.includes(userId);
    if (isLiked) {
      await Post.findByIdAndUpdate(postId, {
        $pull: { likedBy: userId },
      });
    } else {
      await Post.findByIdAndUpdate(postId, {
        $push: { likedBy: userId },
      });
    }

    return SUCCESS(
      res,
      200,
      `Post ${isLiked ? "disliked" : "liked"} successfully`,
      {
        data: {
          postId,
        },
      }
    );
  }
);

const getSavedPosts = TryCatch(
  async (
    req: Request<{}, {}, {}, GetPostsRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { userId, user } = req;
    let { page = 1, limit = process.env.LIMIT, type, userType } = req.query;
    page = Number(page);
    limit = Number(limit);

    const skip = (page - 1) * limit;

    let savedPosts = await SavedItems.find({
      userId,
      itemType: type,
    });

    savedPosts = savedPosts.map((post: any) => post?.item);

    console.log("savedPosts:::", savedPosts);

    const query: any = {
      _id: { $in: savedPosts },
      type,
      isDeleted: false,
    };

    const total = await Post.aggregate([
      {
        $match: query,
      },
      {
        $lookup: {
          from: "users",
          let: { userId: "$userId" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$userId"] },
                role: userType,
              },
            },
          ],
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $count: "count",
      },
    ]);

    const posts = await Post.aggregate([
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
                $expr: { $eq: ["$_id", "$$userId"] },
                role: userType,
              },
            },
            {
              $project: {
                firstName: 1,
                lastName: 1,
                profileImage: 1,
                _id: 1,
              },
            },
          ],
          as: "userId",
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "comments",
        },
      },
      {
        $lookup: {
          from: "ratings",
          let: { id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$postId", "$$id"] },
                type: ratingsType.SHARE,
                senderId: new mongoose.Types.ObjectId(userId),
              },
            },
            {
              $project: {
                ratings: 1,
                _id: 1,
              },
            },
          ],
          as: "ratings",
        },
      },
      {
        $unwind: {
          path: "$ratings",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $set: {
          ratings: "$ratings.ratings",
        },
      },
      {
        $lookup: {
          from: "reports",
          let: { id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$postId", "$$id"] },
                reporterUserId: new mongoose.Types.ObjectId(userId),
              },
            },
            {
              $project: {
                reason: 1,
                _id: 1,
              },
            },
          ],
          as: "isReported",
        },
      },
      {
        $addFields: {
          commentsCount: { $size: "$comments" },
          likesCount: { $size: "$likedBy" },
          isReported: { $gt: [{ $size: "$isReported" }, 0] },
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
        $unwind: "$userId",
      },
      {
        $project: {
          __v: 0,
          updatedAt: 0,
          isPublished: 0,
          isDeleted: 0,
          comments: 0,
          likedBy: 0,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    return SUCCESS(res, 200, "Posts fetched successfully", {
      data: { posts },
      pagination: {
        total: total[0]?.count || 0,
        page: Number(page),
        limit: Number(limit),
      },
    });
  }
);

const getPostDetailsById = TryCatch(
  async (req: Request<PostIdRequest>, res: Response, next: NextFunction) => {
    const { userId } = req;
    const { postId } = req.params;

    const post = await Post.findById(postId)
      .populate("userId", "_id firstName lastName profileImage")
      .select("-updatedAt -__v -likedBy");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const ratings = await Ratings.find({
      type: "share",
      postId: post._id,
      senderId: userId,
    }).select("ratings");

    return SUCCESS(res, 200, "Post fetched successfully", {
      data: {
        post: {
          ...post.toObject(),
          ratings: ratings.length ? ratings[0]?.ratings : undefined,
        },
      },
    });
  }
);

const getTrendingTopics = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const topics = await Post.aggregate([
      {
        $match: {
          isDeleted: false,
          isPublished: true,
          type: postType.SHARE,
        },
      },
      {
        $group: {
          _id: "$topic",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      { $limit: 10 },
      {
        $project: {
          topic: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);

    return SUCCESS(res, 200, "Trending topics fetched successfully", {
      data: { topics },
    });
  }
);

const reSharePost = TryCatch(
  async (req: Request<PostIdRequest>, res: Response, next: NextFunction) => {
    const { userId } = req;
    const { postId: reSharedPostId } = req.params;

    const originalPost = await Post.findById(reSharedPostId).lean();

    if (!originalPost || originalPost.isDeleted)
      return next(new ErrorHandler("Post not found", 400));

    if (originalPost.userId == userId)
      return next(new ErrorHandler("You can't reshare this post", 400));

    const isAlreadyShared = await Post.findOne({
      reSharedPostId,
      reSharedBy: userId,
    });

    if (isAlreadyShared)
      return next(new ErrorHandler("You have already reshared this post", 400));

    const { _id, ...clonedData } = originalPost;

    await Post.create({
      ...clonedData,
      reSharedPostId,
      reSharedBy: userId,
    });

    return SUCCESS(res, 200, "Post reshared successfully");
  }
);

const deletePost = TryCatch(
  async (req: Request<PostIdRequest>, res: Response, next: NextFunction) => {
    const { userId } = req;
    const { postId } = req.params;

    const post = await getPostById(postId);

    if (post.userId.toString() !== userId)
      return next(
        new ErrorHandler("You are not authorized to delete this post", 403)
      );

    post.isDeleted = true;
    await post.save();
    return SUCCESS(res, 200, "Post deleted successfully");
  }
);

export default {
  createPost,
  getPosts,
  // addComments,
  // getAllComments,
  saveUnsavePost,
  likeDislikePost,
  getSavedPosts,
  getPostDetailsById,
  getTrendingTopics,
  reSharePost,
  deletePost,
};
