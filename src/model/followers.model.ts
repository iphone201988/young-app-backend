import { Schema, model } from "mongoose";

const followersSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    follower: { type: Schema.Types.ObjectId, ref: "user" },
    customer: { type: Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

const Followers = model("followers", followersSchema);
export default Followers;
