import express from "express";
import { authenticationMiddleware } from "../middleware/auth.middleware";
import validate from "../middleware/validate.middleware";
import userSchema from "../schema/user.schema";
import userController from "../controller/user.controller";
import upload from "../middleware/multer.middleware";
import validateFiles from "../middleware/validateFiles.middleware";
import uploadS3 from "../middleware/multerS3.middleware";

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
  uploadS3.fields([
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
  uploadS3.fields([
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
userRoutes.put(
  "/deleteAccount",
  authenticationMiddleware,
  userController.deleteAccount
);

userRoutes.get(
  "/getUserProfile",
  authenticationMiddleware,
  validate(userSchema.getUserProfileSchema),
  userController.getUserProfile
);

userRoutes.get(
  "/getUnauthUser",
  validate(userSchema.getUserProfileSchema),
  userController.getUnauthUser
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
  validate(userSchema.getLatestUsersSchema),
  userController.getLatestUsers
);

userRoutes.post(
  "/contactUs",
  authenticationMiddleware,
  uploadS3.fields([
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
