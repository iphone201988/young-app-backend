import { Schema, model } from "mongoose";
import { postSymbol, postType, streamStatus, topics } from "../utils/enums";
import { PostModel } from "../../types/Database/types";

const postSchema = new Schema<PostModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    title: { type: String },
    symbol: { type: String, enum: Object.values(postSymbol) },
    topic: { type: String, enum: Object.values(topics) },
    description: { type: String },
    image: { type: String },
    symbolValue: { type: String },
    type: { type: String, enum: Object.values(postType) },
    scheduleDate: { type: Date },
    streamUrl: { type: String },
    isPublished: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    status: { type: String, enum: Object.values(streamStatus) },

    // likedBy: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "user",
    //   },
    // ],

    reSharedBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    reSharedPostId: {
      type: Schema.Types.ObjectId,
      ref: "post",
    },
  },
  {
    timestamps: true,
  }
);

const Post = model<PostModel>("post", postSchema);
export default Post;
