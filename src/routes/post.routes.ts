import express from "express";
import upload from "../middleware/multer.middleware";
import validate from "../middleware/validate.middleware";
import postSchema from "../schema/post.schema";
import postController from "../controller/post.controller";
import { authenticationMiddleware } from "../middleware/auth.middleware";
import uploadS3 from "../middleware/multerS3.middleware";

const postRoutes = express.Router();

postRoutes.post(
  "/",
  authenticationMiddleware,
  uploadS3.fields([{ name: "image", maxCount: 1 }]),
  validate(postSchema.createPostSchema),
  postController.createPost
);

postRoutes.get(
  "/",
  authenticationMiddleware,
  validate(postSchema.getPostsSchema),
  postController.getPosts
);

// postRoutes.post(
//   "/addComments",
//   authenticationMiddleware,
//   validate(postSchema.addCommentsSchema),
//   postController.addComments
// );

// postRoutes.get(
//   "/getAllComments/:postId",
//   authenticationMiddleware,
//   validate(postSchema.commonSchema),
//   postController.getAllComments
// );

postRoutes.put(
  "/saveUnsavePost/:postId",
  authenticationMiddleware,
  validate(postSchema.saveUnsavePostSchema),
  postController.saveUnsavePost
);

postRoutes.put(
  "/likeDislikePost/:postId",
  authenticationMiddleware,
  validate(postSchema.saveUnsavePostSchema),
  postController.likeDislikePost
);

postRoutes.get(
  "/getSavedPosts",
  authenticationMiddleware,
  validate(postSchema.getPostsSchema),
  postController.getSavedPosts
);

postRoutes.get(
  "/getTrendingTopics",
  authenticationMiddleware,
  postController.getTrendingTopics
);

postRoutes.get(
  "/downloadHistory",
  authenticationMiddleware,
  postController.downloadHistory
);

postRoutes.get(
  "/:postId",
  authenticationMiddleware,
  validate(postSchema.commonSchema),
  postController.getPostDetailsById
);

postRoutes.put(
  "/reshare/:postId",
  authenticationMiddleware,
  validate(postSchema.commonSchema),
  postController.reSharePost
);

postRoutes.delete(
  "/:postId",
  authenticationMiddleware,
  postController.deletePost
);

export default postRoutes;
