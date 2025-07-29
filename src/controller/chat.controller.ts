import { NextFunction, Request, Response } from "express";
import { SUCCESS, TryCatch, getFiles } from "../utils/helper";
import Chat from "../model/chat.model";
import Message from "../model/message.model";
import Report from "../model/report.model";
import ErrorHandler from "../utils/ErrorHandler";

const getChats = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req;

    const chats = await Chat.find({ chatUsers: { $in: [userId] } })
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

const reportUser = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req;
    const { reporterUserId, reason, additionalDetails } = req.body;

    const chat = await Chat.findOne({
      chatUsers: { $in: [userId, reporterUserId] },
    });

    if (!chat) return next(new ErrorHandler("You can't report this user", 400));

    const files = getFiles(req, ["screenshots"]);

    await Report.create({
      userId,
      reporterUserId,
      reason,
      additionalDetails,
      screenshots: files.screenshots,
    });

    return SUCCESS(res, 200, "User reported successfully");
  }
);

export default {
  getChats,
  getChatsMessages,
  reportUser,
};
