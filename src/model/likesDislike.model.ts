import { Schema, model } from "mongoose";
import { likesDislikesType } from "../utils/enums";

const likesDislikesSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    itemType: {
      type: String,
      required: true,
      enum: Object.values(likesDislikesType),
    },
    item: { type: Schema.Types.ObjectId, ref: "post" },
    comment: { type: Schema.Types.ObjectId, ref: "comments" },
  },
  { timestamps: true }
);

const LikesDislikes = model("likesDislikes", likesDislikesSchema);
export default LikesDislikes;
