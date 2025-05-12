import { Schema, model } from "mongoose";

const eventsSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    title: { type: String },
    topic: { type: String },
    description: { type: String },
    file: { type: String },
    date: { type: Date },
    isDeleted: { type: Boolean, default: false },
    
  },
  { timestamps: true }
);

const Events = model("events", eventsSchema);
export default Events;
