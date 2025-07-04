import { Schema, model } from "mongoose";
import { postType } from "../utils/enums";

const savedItemSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    itemType: { type: String, required: true, enum: Object.values(postType) },
    item: { type: Schema.Types.ObjectId, ref: "post" },
    vault: { type: Schema.Types.ObjectId, ref: "vault" },
  },
  {
    timestamps: true,
  }
);

const SavedItems = model("savedItems", savedItemSchema);
export default SavedItems;
