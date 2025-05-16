import { Schema, model } from "mongoose";

const chatSchema = new Schema(
  {
    chatUsers: [{ type: Schema.Types.ObjectId, ref: "user" }],
    lastMessage: { type: Schema.Types.ObjectId, ref: "message" },
    isDeleted: { type: Boolean, default: false },
    hasUnreadMessages: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const Chat = model("chat", chatSchema);
export default Chat;
