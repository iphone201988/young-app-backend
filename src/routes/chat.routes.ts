import express from "express";
import { authenticationMiddleware } from "../middleware/auth.middleware";
import validate from "../middleware/validate.middleware";
import chatController from "../controller/chat.controller";
import chatSchema from "../schema/chat.schema";

const chatRoutes = express.Router();

chatRoutes.get("/", authenticationMiddleware, chatController.getChats);

chatRoutes.get(
  "/:chatId",
  authenticationMiddleware,
  validate(chatSchema.getChatMessagesSchema),
  chatController.getChatsMessages
);

export default chatRoutes;
