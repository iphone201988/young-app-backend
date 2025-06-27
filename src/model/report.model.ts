import { Schema, model } from "mongoose";
import { ReportsModel } from "../../types/Database/types";
import { postType } from "../utils/enums";

const reportSchema = new Schema<ReportsModel>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    reporterUserId: { type: Schema.Types.ObjectId, ref: "user" },
    postId: { type: Schema.Types.ObjectId, ref: "post" },
    vaultId: { type: Schema.Types.ObjectId, ref: "vault" },
    reason: { type: String },
    additionalDetails: { type: String },
    screenshots: [{ type: String }],
    type: { type: String, enum: Object.values({ USER: "user", ...postType }) },
    isResolved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Report = model<ReportsModel>("reports", reportSchema);
export default Report;
