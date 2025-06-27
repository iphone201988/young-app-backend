import express from "express";
import { authenticationMiddleware } from "../middleware/auth.middleware";
import eventsController from "../controller/events.controller";
import validate from "../middleware/validate.middleware";
import eventSchema from "../schema/event.schema";
import upload from "../middleware/multer.middleware";
import validateFiles from "../middleware/validateFiles.middleware";
import uploadS3 from "../middleware/multerS3.middleware";

const eventRoutes = express.Router();

eventRoutes.post(
  "/",
  authenticationMiddleware,
  uploadS3.fields([{ name: "file", maxCount: 1 }]),
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
