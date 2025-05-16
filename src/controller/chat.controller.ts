import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../utils/helper";
import Chat from "../model/chat.model";
import Message from "../model/message.model";

const getChats = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req;

    const chats = await Chat.find({ chatUsers: userId })
      .populate("chatUsers", "username role profileImage")
      .populate("lastMessage", "message")
      .select("-isDeleted -updatedAt -__v");

    return res.status(200).json({
      success: true,
      message: "Chats fetched successfully",
      data: { chats },
    });
  }
);

const getChatsMessages = TryCatch(
  async (
    req: Request<{ chatId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const { userId } = req;
    const { chatId } = req.params;

    const messages = await Message.find({ chatId })
      .populate("senderId", "username role profileImage")
      .select("-isDeleted -updatedAt -__v");

    if (messages?.length) {
      await Message.updateMany(
        { chatId, isRead: false, senderId: { $ne: userId } },
        { $set: { isRead: true } }
      );
    }

    return res.status(200).json({
      success: true,
      message: "Chat messages fetched successfully",
      data: { messages },
    });
  }
);

export default {
  getChats,
  getChatsMessages,
};
