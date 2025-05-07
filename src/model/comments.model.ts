import { Schema, model } from "mongoose";
import { postType } from "../utils/enums";
import { CommentsModel } from "../../types/Database/types";

const commentsSchema = new Schema<CommentsModel>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    postId: { type: Schema.Types.ObjectId, ref: "post" },
    vaultId: { type: Schema.Types.ObjectId, ref: "vault" },
    comment: { type: String },
    type: { type: String, enum: Object.values(postType) },
  },
  { timestamps: true }
);

const Comments = model("comments", commentsSchema);
export default Comments;
