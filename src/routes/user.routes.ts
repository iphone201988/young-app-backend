import express from "express";
import { authenticationMiddleware } from "../middleware/auth.middleware";
import validate from "../middleware/validate.middleware";
import userSchema from "../schema/user.schema";
import userController from "../controller/user.controller";
import upload from "../middleware/multer.middleware";
import validateFiles from "../middleware/validateFiles.middleware";

const userRoutes = express.Router();

userRoutes.post(
  "/register",
  validate(userSchema.registerSchema),
  userController.registerUser
);

userRoutes.post(
  "/loginUser",
  authenticationMiddleware,
  validate(userSchema.loginUserSchema),
  userController.loginUser
);

userRoutes.put(
  "/verifyOtp",
  validate(userSchema.verifyOTPSchema),
  userController.verifyOtp
);

userRoutes.put(
  "/sendOtp",
  validate(userSchema.sendOTPSchema),
  userController.sendOtp
);

userRoutes.put(
  "/completeRegistration",
  upload.fields([
    {
      name: "licenseImage",
      maxCount: 1,
    },
    {
      name: "profileImage",
      maxCount: 1,
    },
    {
      name: "additionalPhotos",
      maxCount: 5,
    },
  ]),
  validateFiles(["profileImage", "licenseImage"]),
  validate(userSchema.completeRegistrationSchema),
  userController.completeRegistration
);

userRoutes.post(
  "/enable2FA",
  authenticationMiddleware,
  userController.enable2FA
);

userRoutes.post(
  "/verify2FA",
  authenticationMiddleware,
  userController.verify2FA
);

export default userRoutes;
