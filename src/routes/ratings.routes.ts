import express from "express";
import { authenticationMiddleware } from "../middleware/auth.middleware";
import validate from "../middleware/validate.middleware";
import ratingsController from "../controller/ratings.controller";
import ratingsSchema from "../schema/ratings.schema";

const ratingsRoutes = express.Router();

ratingsRoutes.post(
  "/",
  authenticationMiddleware,
  validate(ratingsSchema.giveRatingsSchema),
  ratingsController.giveRatings
);

ratingsRoutes.get(
  "/:receiverId",
  authenticationMiddleware,
  validate(ratingsSchema.getRatingsSchema),
  ratingsController.getRatings
);

export default ratingsRoutes;
