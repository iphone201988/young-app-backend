import { Schema, model } from "mongoose";
import { subscriptionStatus } from "../utils/enums";

const subscriptionSchema = new Schema(
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

const Subscription = model("subscription", subscriptionSchema);
export default Subscription;
