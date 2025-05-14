import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    chatId: { type: Schema.Types.ObjectId, ref: "chat" },
    senderId: { type: Schema.Types.ObjectId, ref: "user" },
    message: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Message = model("message", messageSchema);
export default Message;
