import { Schema, model } from "mongoose";
import { ratingsType } from "../utils/enums";
import { RatingsModel } from "../../types/Database/types";

const ratingsSchema = new Schema<RatingsModel>(
  {
    senderId: { type: Schema.Types.ObjectId, ref: "user" },
    receiverId: { type: Schema.Types.ObjectId, ref: "user" },
    postId: { type: Schema.Types.ObjectId, ref: "post" },
    vaultId: { type: Schema.Types.ObjectId, ref: "vault" },
    ratings: { type: Number },
    type: { type: String, enum: Object.values(ratingsType) },
  },
  { timestamps: true }
);

const Ratings = model<RatingsModel>("ratings", ratingsSchema);

export default Ratings;
