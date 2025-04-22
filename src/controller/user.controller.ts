import { NextFunction, Request, Response } from "express";
import {
  SUCCESS,
  TryCatch,
  addMinutesToCurrentTime,
  generateBase32Secret,
  generateJwtToken,
  generateOTP,
  generateRandomString,
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
import { userRole } from "../utils/enums";
import OTPAuth from "otpauth";
import QRCode from "qrcode";

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
        role,
        email,
        countryCode,
        phone,
        password,
        deviceToken,
        deviceType,
      });
      if (company) user.company = company;
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
      packageName,
    } = req.body;

    const user = await getUserById(userId);

    if (user.role != role) return next(new ErrorHandler("Invalid role", 400));

    const images = getFiles(req, [
      "licenseImage",
      "profileImage",
      "additionalPhotos",
    ]);

    user.profileImage = images.profileImage[0];
    user.licenseImage = images.licenseImage[0];
    user.packageName = packageName;

    if (role == userRole.GENERAL_MEMBER) {
      user.age = age;
      user.gender = gender;
      user.martialStatus = martialStatus;
      user.children = children;
      user.homeOwnerShip = homeOwnerShip;
      user.objective = objective;
      user.financialExperience = financialExperience;
      user.investments = investments;
      user.servicesInterested = servicesInterested;
    }

    if (role == userRole.FINANCIAL_ADVISOR || role == userRole.FINANCIAL_FIRM) {
      user.additionalPhotos = images.additionalPhotos[0];
      user.crdNumber = crdNumber;
      user.productsOffered = productsOffered;
      user.areaOfExpertise = areaOfExpertise;
    }

    if (role == userRole.STARTUP || role == userRole.SMALL_BUSINESS) {
      user.additionalPhotos = images.additionalPhotos[0];
      user.industry = industry;
      user.interestedIn = interestedIn;
    }

    if (role == userRole.INVESTOR) {
      user.additionalPhotos = images.additionalPhotos[0];
      user.industry = industry;
      user.areaOfExpertise = areaOfExpertise;
    }

    if (stripeCustomerId) user.stripeCustomerId = stripeCustomerId;

    user.isRegistrationCompleted = true;
    const jti = generateRandomString(20);
    const token = generateJwtToken({ userId: user._id, jti });

    user.jti = jti;

    await user.save();

    return SUCCESS(res, 200, "User registration completed successfully", {
      data: {
        token,
      },
    });
  }
);

const enable2FA = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    const base32_secret = generateBase32Secret();

    user.secret = base32_secret;
    await user.save();

    const totp = new OTPAuth.TOTP({
      issuer: "ACME",
      label: "Alice",
      algorithm: "SHA1",
      digits: 6,
      secret: base32_secret,
    });

    let otpauth_url = totp.toString();

    QRCode.toDataURL(otpauth_url, (err: any, imageUrl: any) => {
      if (err) {
        return res.status(500).json({
          status: "fail",
          message: "Error while generating QR Code",
        });
      }

      SUCCESS(res, 200, "QR generated successfully", {
        data: {
          qrCodeUrl: imageUrl,
          secret: base32_secret,
        },
      });
    });
  }
);

const verify2FA = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    const { otp } = req.query;

    const totp = new OTPAuth.TOTP({
      issuer: "Young App",
      label: user._id.toString(),
      algorithm: "SHA1",
      digits: 6,
      secret: user.secret,
    });

    const isValidated = totp.validate({ token: otp.toString() });

    if (!isValidated)
      return next(new ErrorHandler("User authentication failed", 400));

    const jti = generateRandomString(20);
    const token = generateJwtToken({ userId: user._id, jti });

    user.jti = jti;

    await user.save();

    return SUCCESS(res, 200, "User authenticated successfully", {
      data: {
        token,
      },
    });
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
  verifyOtp,
  sendOtp,
  completeRegistration,
  loginUser,
  forgotPassword,
  enable2FA,
  verify2FA,
};
