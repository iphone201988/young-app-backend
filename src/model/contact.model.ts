import { Schema, model } from "mongoose";
import { ContactUsModel } from "../../types/Database/types";

const contactUsSchema = new Schema<ContactUsModel>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    subject: { type: String },
    name: { type: String },
    company: { type: String },
    email: { type: String },
    file: { type: String },
  },
  { timestamps: true }
);

const Contact = model<ContactUsModel>("contactUs", contactUsSchema);
export default Contact;
