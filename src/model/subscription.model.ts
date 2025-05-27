import { Schema, model } from "mongoose";
import { subscriptionStatus } from "../utils/enums";
import { SubscriptonModel } from "../../types/Database/types";

const subscriptionSchema = new Schema<SubscriptonModel>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    stripeSubscriptionId: { type: String },
    status: {
      type: String,
      enum: Object.values(subscriptionStatus),
    },
  },
  {
    timestamps: true,
  }
);

const Subscription = model<SubscriptonModel>(
  "subscription",
  subscriptionSchema
);
export default Subscription;
