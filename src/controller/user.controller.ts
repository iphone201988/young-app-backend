import { NextFunction, Request, Response } from "express";
import {
  SUCCESS,
  TryCatch,
  addMinutesToCurrentTime,
  generateOTP,
  getFiles,
} from "../utils/helper";
import ErrorHandler from "../utils/ErrorHandler";
import User from "../model/user.model";
import { sendEmail } from "../utils/sendEmail";
import { getUserById } from "../services/user.services";
import {
  CompleteRegistrationRequest,
  RegisterUserRequest,
  SendOTPRequest,
  VerifyOTPRequest,
} from "../../types/API/User/types";

const registerUser = TryCatch(
  async (
    req: Request<{}, {}, RegisterUserRequest>,
    res: Response,
    next: NextFunction
  ) => {
    let {
      firstName,
      lastName,
      role,
      company,
      username,
      email,
      countryCode,
      phone,
      password,
      deviceToken,
      deviceType,
    } = req.body;

    email = email.toLowerCase();

    let user = await User.findOne({
      email,
      countryCode,
      phone,
      deviceToken,
      deviceType,
    });

    if (user?.isVerified)
      return next(new ErrorHandler("User already exists", 400));

    if (!user) {
      user = await User.create({
        firstName,
        lastName,
        username,
        company,
        role,
        email,
        countryCode,
        phone,
        password,
        deviceToken,
        deviceType,
      });
    }

    const otp = generateOTP();
    user.otp = Number(otp);
    user.otpExpiry = new Date(addMinutesToCurrentTime(2));
    await user.save();
    await sendEmail(email, 1, otp);

    return SUCCESS(res, 201, "Verification code has been sent to your email", {
      data: {
        userId: user._id,
        role: user.role,
      },
    });
  }
);

const verifyOtp = TryCatch(
  async (
    req: Request<{}, {}, VerifyOTPRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { userId, otp, type } = req.body; // Verification:1,Forgot:2,ChangeEmail:3
    const user = await getUserById(userId);
    const now = new Date();

    if (user.otpExpiry < now) {
      user.otp = undefined;
      user.otpExpiry = undefined;
      await user.save();
      return next(new ErrorHandler("OTP has been expired", 400));
    }

    if (user.otp != otp) return next(new ErrorHandler("Invalid OTP", 400));

    user.otp = undefined;
    user.otpExpiry = undefined;
    if (type == 1) user.isVerified = true;
    user.otpVerified = true;
    if (type == 3) {
      user.email = user.unVerifiedTempCredentials.email;
      user.unVerifiedTempCredentials.email = undefined;
      user.isVerified = true;
    }
    await user.save();
    return SUCCESS(res, 200, `OTP verified successfully`, {
      data: {
        userId: user._id,
        role: user.role,
      },
    });
  }
);

const sendOtp = TryCatch(
  async (
    req: Request<{}, {}, SendOTPRequest>,
    res: Response,
    next: NextFunction
  ) => {
    let { email, type } = req.body; // Forgot:1,ChangeEmail:2
    const emailTemplate = type == 1 ? 3 : 5;
    email = email.toLowerCase();

    let query: any = { email };
    // if (type != 2) query.isVerified = true;
    const user = await User.findOne(query);
    if (!user) return next(new ErrorHandler("User not found", 404));

    const otp = generateOTP();
    user.otp = Number(otp);
    user.otpExpiry = new Date(addMinutesToCurrentTime(2));
    user.otpVerified = false;
    await user.save();
    await sendEmail(user.email, emailTemplate, otp);

    return SUCCESS(
      res,
      200,
      `OTP ${type == 2 ? "resent" : "sent"} successfully`
    );
  }
);

const completeRegistration = TryCatch(
  async (
    req: Request<{}, {}, CompleteRegistrationRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const {
      userId,
      role,
      crdNumber,
      age,
      gender,
      martialStatus,
      children,
      homeOwnerShip,
      objective,
      financialExperience,
      investments,
      servicesInterested,
      productsOffered,
      areaOfExpertise,
      industry,
      interestedIn,
      stripeCustomerId,
    } = req.body;

    const user = await getUserById(userId);

    const images = getFiles(req, [
      "licenseImage,profileImage,additionalPhotos",
    ]);
  }
);

const loginUser = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {}
);

const forgotPassword = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export default {
  registerUser,
  forgotPassword,
};
