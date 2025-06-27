import express from "express";
import validate from "../middleware/validate.middleware";
import adminController from "../controller/admin.controller";
import adminSchema from "../schema/admin.schema";
import { adminAuthenticationMiddleware } from "../middleware/admin.middleware";

const adminRoutes = express.Router();

adminRoutes.post("/", validate(adminSchema.loginSchema), adminController.login);

adminRoutes.get(
  "/getAllUsers",
  adminAuthenticationMiddleware,
  validate(adminSchema.getAllUsersSchema),
  adminController.getAllUsers
);

adminRoutes.put(
  "/updateUserStatus/:id",
  adminAuthenticationMiddleware,
  validate(adminSchema.updateUserSchema),
  adminController.updateUserStatus
);

adminRoutes.get(
  "/getAllUserComplaints",
  adminAuthenticationMiddleware,
  validate(adminSchema.paginationSchema),
  adminController.getAllUserComplaints
);

adminRoutes.put(
  "/updateReportStatus/:id",
  adminAuthenticationMiddleware,
  validate(adminSchema.IdSchema),
  adminController.updateReportStatus
);

adminRoutes.get(
  "/getAllAds",
  adminAuthenticationMiddleware,
  validate(adminSchema.paginationSchema),
  adminController.getAllAds
);

adminRoutes.get(
  "/getPosts",
  adminAuthenticationMiddleware,
  validate(adminSchema.paginationSchema),
  adminController.getPosts
);

adminRoutes.put(
  "/updateAdStatus/:id",
  adminAuthenticationMiddleware,
  validate(adminSchema.IdSchema),
  adminController.updateAdStatus
);

adminRoutes.put(
  "/changePassword",
  adminAuthenticationMiddleware,
  validate(adminSchema.changePasswordSchema),
  adminController.changePassword
);

export default adminRoutes;
