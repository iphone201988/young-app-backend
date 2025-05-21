import { Schema, model } from "mongoose";
import { ReportsModel } from "../../types/Database/types";

const reportSchema = new Schema<ReportsModel>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    reporterUserId: { type: Schema.Types.ObjectId, ref: "user" },
    reason: { type: String },
    additionalDetails: { type: String },
    screenshots: [{ type: String }],
  },
  { timestamps: true }
);

const Report = model<ReportsModel>("reports", reportSchema);
export default Report;
