import express from "express";
import upload from "../middleware/multer.middleware";
import validate from "../middleware/validate.middleware";
import postSchema from "../schema/post.schema";
import postController from "../controller/post.controller";
import { authenticationMiddleware } from "../middleware/auth.middleware";

const postRoutes = express.Router();

postRoutes.post(
  "/",
  authenticationMiddleware,
  upload.fields([{ name: "image", maxCount: 1 }]),
  validate(postSchema.createPostSchema),
  postController.createPost
);

postRoutes.get(
  "/",
  authenticationMiddleware,
  validate(postSchema.getPostsSchema),
  postController.getPosts
);

postRoutes.post(
  "/addComments",
  authenticationMiddleware,
  validate(postSchema.addCommentsSchema),
  postController.addComments
);

postRoutes.get(
  "/getAllComments/:postId",
  authenticationMiddleware,
  validate(postSchema.commonSchema),
  postController.getAllComments
);

postRoutes.put(
  "/saveUnsavePost/:postId",
  authenticationMiddleware,
  validate(postSchema.commonSchema),
  postController.saveUnsavePost
);

postRoutes.put(
  "/likeDislikePost/:postId",
  authenticationMiddleware,
  validate(postSchema.commonSchema),
  postController.likeDislikePost
);

export default postRoutes;
