import { Schema, model } from "mongoose";

const ratingsSchema = new Schema(
  {
    senderId: { type: Schema.Types.ObjectId, ref: "user" },
    receiverId: { type: Schema.Types.ObjectId, ref: "user" },
    ratings: { type: Number },
  },
  { timestamps: true }
);

const Ratings = model("ratings", ratingsSchema);

export default Ratings;
