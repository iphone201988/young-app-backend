import { Schema, model } from "mongoose";
import { eventType, topics } from "../utils/enums";
import { EventsMModel } from "../../types/Database/types";

const eventsSchema = new Schema<EventsMModel>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    title: { type: String },
    topic: { type: String,enum: Object.values(topics) },
    description: { type: String },
    file: { type: String },
    scheduledDate: { type: Date },
    isDeleted: { type: Boolean, default: false },
    type: { type: String, enum: Object.values(eventType) },
  },
  { timestamps: true }
);

const Events = model<EventsMModel>("events", eventsSchema);
export default Events;
