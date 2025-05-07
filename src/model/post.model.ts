import { Schema, model } from "mongoose";
import { postSymbol, postType } from "../utils/enums";
import { PostModel } from "../../types/Database/types";

const postSchema = new Schema<PostModel>(
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
    isPublished: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },

    likedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = model<PostModel>("post", postSchema);
export default Post;
