import { Schema, model } from "mongoose";
import { AdvertiseModel } from "../../types/Database/types";

const advertiseSchema = new Schema<AdvertiseModel>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    name: { type: String },
    company: { type: String },
    email: { type: String },
    website: { type: String },
    plan: { type: String },
    file: { type: String },
  },
  { timestamps: true }
);

const Advertise = model<AdvertiseModel>("advertise", advertiseSchema);
export default Advertise;
