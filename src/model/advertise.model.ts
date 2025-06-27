import { Schema, model } from "mongoose";
import { AdvertiseModel } from "../../types/Database/types";
import { adStatus } from "../utils/enums";

const advertiseSchema = new Schema<AdvertiseModel>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    name: { type: String },
    company: { type: String },
    email: { type: String },
    website: { type: String },
    plan: { type: String },
    file: { type: String },
    status: {
      type: String,
      enum: Object.values(adStatus),
      default: adStatus.IN_REVIEW,
    },
  },
  { timestamps: true }
);

const Advertise = model<AdvertiseModel>("advertise", advertiseSchema);
export default Advertise;
