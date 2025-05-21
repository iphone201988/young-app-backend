import { DefaultEventsMap, Server, Socket } from "socket.io";
import jwt, { JwtPayload } from "jsonwebtoken";
import Chat from "../model/chat.model";
import Message from "../model/message.model";
import User from "../model/user.model";

interface CustomSocket extends Socket {
  userId?: string;
}

const useSockets = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  const users = new Map<string, string>();

  const addUser = (userId: string, socketId: string) => {
    users.set(userId, socketId);
  };

  const removeUser = (socketId: string) => {
    users.forEach((value, key) => {
      if (value === socketId) {
        users.delete(key);
      }
    });
  };

  const getUser = (userId: string) => {
    return users.get(userId);
  };

  io.use((socket: CustomSocket, next) => {
    const token: any = socket.handshake.headers.token;
    if (!token) {
      return next(new Error("Authentication failed. Missing token."));
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
      if (!decoded) {
        return next(new Error("Authentication failed. Invalid token."));
      }

      socket.userId = decoded.userId;

      next();
    } catch (err) {
      return next(new Error("Authentication failed. Invalid token."));
    }
  });

  io.on("connection", async (socket: CustomSocket) => {
    addUser(socket.userId, socket.id);

    socket.on("sendMessage", async (payload: any) => {
      console.log("enter here");
      const { chatId, message, receiverId } = payload;
      let chat: any;

      if (chatId) {
        chat = await Chat.findById(chatId);
        if (!chat) {
          socket.emit("error", "Chat not found.");
          return;
        }
      }

      if (!chatId) {
        chat = await Chat.findOne({
          chatUsers: { $all: [socket.userId, receiverId] },
        });

        if (chat) {
          socket.emit("error", "Chat already exists.");
          return;
        }

        // const currentUser = await User.findById(socket.userId);
        // const isFollowing = currentUser.following.includes(receiverId);
        // if (!isFollowing) {
        //   socket.emit("error", "You can't message this user");
        //   return;
        // }

        chat = await Chat.create({
          chatUsers: [socket.userId, receiverId],
        });
      }

      let newMessage = await Message.create({
        chatId: chat._id,
        senderId: socket.userId,
        message,
      });

      chat.lastMessage = newMessage._id;
      chat.hasUnreadMessages = true;
      await chat.save();

      newMessage = await Message.findById(newMessage._id)
        .populate("senderId", "username role profileImage")
        .select("-isDeleted -updatedAt -__v");

      const receiverSocketId = getUser(receiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }
      socket.emit("newMessage", newMessage);
    });

    socket.on("disconnect", () => {
      removeUser(socket.id);
    });
  });
};

export default useSockets;
