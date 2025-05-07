import { Schema, model } from "mongoose";
import { userRole, vaultAccess } from "../utils/enums";
import { VaultModel } from "../../types/Database/types";

const vaultSchema = new Schema<VaultModel>(
  {
    admin: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    title: { type: String },
    topic: { type: String },
    description: { type: String },
    image: { type: String },
    access: {
      type: String,
      enum: Object.values(vaultAccess),
      default: vaultAccess.PRIVATE,
    },
    category: [
      {
        type: String,
        enum: Object.values({ ALL: "all", ...userRole }),
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Vault = model<VaultModel>("vault", vaultSchema);
export default Vault;
