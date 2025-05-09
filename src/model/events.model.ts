import { Schema, model } from "mongoose";

const eventsSchema = new Schema(
  {
    title: { type: String },
    topic: { type: String },
    description: { type: String },
    file: { type: String },
    date: { type: Date },
  },
  { timestamps: true }
);

const Events = model("events", eventsSchema);
export default Events;
