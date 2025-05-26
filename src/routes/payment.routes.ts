import express from "express";
import { authenticationMiddleware } from "../middleware/auth.middleware";
import validate from "../middleware/validate.middleware";
import paymentController from "../controller/payment.controller";
import paymentSchema from "../schema/payment.schema";

const paymentRoutes = express.Router();

paymentRoutes.put(
  "/",
  authenticationMiddleware,
  validate(paymentSchema.attachPaymentMethodSchema),
  paymentController.attachPaymentMethod
);

paymentRoutes.get(
  "/",
  authenticationMiddleware,
  paymentController.getSubscriptionPlans
);

export default paymentRoutes;
