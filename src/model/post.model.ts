import { Schema, model } from "mongoose";
import { postSymbol, postType } from "../utils/enums";

const postSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    title: { type: String },
    symbol: { type: String, enum: Object.values(postSymbol) },
    topic: { type: String },
    description: { type: String },
    image: { type: String },
    type: { type: String, enum: Object.values(postType) },
    scheduleDate: { type: Date },
    isPublished: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Post = model("post", postSchema);
export default Post;
