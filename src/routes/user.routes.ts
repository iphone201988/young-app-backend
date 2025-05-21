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
  "/login",
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
  // validateFiles(["profileImage", "licenseImage"]),
  validate(userSchema.completeRegistrationSchema),
  userController.completeRegistration
);

userRoutes.put(
  "/verify2FA",
  validate(userSchema.verify2FASchema),
  userController.verify2FA
);

userRoutes.put(
  "/changePassword",
  validate(userSchema.changePasswordSchema),
  userController.changePassword
);

userRoutes.put(
  "/followUnfollowUser/:userId",
  authenticationMiddleware,
  validate(userSchema.followUnfollowUserSchema),
  userController.followUnfollowUser
);

userRoutes.put(
  "/updateUser",
  authenticationMiddleware,
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
    {
      name: "formUpload",
      maxCount: 2,
    },
  ]),
  validate(userSchema.updateUserSchema),
  userController.updateUser
);

userRoutes.get("/logout", authenticationMiddleware, userController.logout);

userRoutes.get(
  "/getUserProfile",
  authenticationMiddleware,
  validate(userSchema.getUserProfileSchema),
  userController.getUserProfile
);

userRoutes.put(
  "/updateCustomers/:userId",
  authenticationMiddleware,
  validate(userSchema.updateCustomersSchema),
  userController.updateCustomers
);

userRoutes.get(
  "/getUsers",
  authenticationMiddleware,
  validate(userSchema.getUsersSchema),
  userController.getUsers
);

userRoutes.get(
  "/getLatestUsers",
  authenticationMiddleware,
  userController.getLatestUsers
);

userRoutes.post(
  "/contactUs",
  authenticationMiddleware,
  upload.fields([
    {
      name: "file",
      maxCount: 1,
    },
  ]),
  validateFiles(["file"]),
  validate(userSchema.contactUsSchema),
  userController.contactUs
);

export default userRoutes;
