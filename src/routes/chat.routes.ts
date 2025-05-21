import express from "express";
import { authenticationMiddleware } from "../middleware/auth.middleware";
import validate from "../middleware/validate.middleware";
import chatController from "../controller/chat.controller";
import chatSchema from "../schema/chat.schema";
import upload from "../middleware/multer.middleware";
import validateFiles from "../middleware/validateFiles.middleware";

const chatRoutes = express.Router();

chatRoutes.get("/", authenticationMiddleware, chatController.getChats);

chatRoutes.get(
  "/:chatId",
  authenticationMiddleware,
  validate(chatSchema.getChatMessagesSchema),
  chatController.getChatsMessages
);

chatRoutes.post(
  "/report",
  authenticationMiddleware,
  upload.fields([
    { 
      name: "screenshots",
      maxCount: 5,
    },
  ]),
  validateFiles(["screenshots"]),
  validate(chatSchema.reportUserSchema),
  chatController.reportUser
);

export default chatRoutes;
