import express from "express";
import validate from "../middleware/validate.middleware";
import { authenticationMiddleware } from "../middleware/auth.middleware";
import commentsController from "../controller/comments.controller";
import commentsSchema from "../schema/comments.schema";

const commentRoutes = express.Router();

commentRoutes.post(
  "/",
  authenticationMiddleware,
  validate(commentsSchema.addCommentsSchema),
  commentsController.addComment
);

commentRoutes.get(
  "/",
  authenticationMiddleware,
  validate(commentsSchema.getAllCommentsSchema),
  commentsController.getAllComments
);

commentRoutes.put(
  "/:id",
  authenticationMiddleware,
  validate(commentsSchema.likeDislikeCommentSchema),
  commentsController.likeDislikeComment
);

export default commentRoutes;
