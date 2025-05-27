import express from "express";
import { authenticationMiddleware } from "../middleware/auth.middleware";
import validate from "../middleware/validate.middleware";
import paymentController from "../controller/payment.controller";
import paymentSchema from "../schema/payment.schema";

const paymentRoutes = express.Router();

paymentRoutes.post(
  "/",
  authenticationMiddleware,
  validate(paymentSchema.paymentMethodSchema),
  paymentController.attachPaymentMethod
);

paymentRoutes.post(
  "/buySubscription",
  authenticationMiddleware,
  paymentController.buySubscription
);

paymentRoutes.put(
  "/",
  authenticationMiddleware,
  validate(paymentSchema.paymentMethodSchema),
  paymentController.removePaymentMethod
);

paymentRoutes.get(
  "/",
  authenticationMiddleware,
  paymentController.getSubscriptionPlans
);

paymentRoutes.get(
  "/getPaymentMethods",
  authenticationMiddleware,
  paymentController.getPaymentMethods
);

export default paymentRoutes;
