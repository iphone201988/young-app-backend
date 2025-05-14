import express from "express";
import { authenticationMiddleware } from "../middleware/auth.middleware";
import eventsController from "../controller/events.controller";
import validate from "../middleware/validate.middleware";
import eventSchema from "../schema/event.schema";
import upload from "../middleware/multer.middleware";
import validateFiles from "../middleware/validateFiles.middleware";

const eventRoutes = express.Router();

eventRoutes.post(
  "/",
  authenticationMiddleware,
  upload.fields([{ name: "file", maxCount: 1 }]),
  validateFiles(["file"]),
  validate(eventSchema.createEventSchema),
  eventsController.createEvent
);

eventRoutes.get(
  "/",
  authenticationMiddleware,
  validate(eventSchema.getEventsSchema),
  eventsController.getEvents
);

export default eventRoutes;
