import { Schema, model } from "mongoose";

const followersSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    follower: { type: Schema.Types.ObjectId, ref: "user", required: true },
    customer: { type: Schema.Types.ObjectId, ref: "user", required: true },
  },
  { timestamps: true }
);

const Followers = model("followers", followersSchema);
export default Followers;
