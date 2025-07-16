import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import { encode } from "hi-base32";
import { randomBytes } from "crypto";
import { UserModel } from "../../types/Database/types";
import Stripe from "stripe";

export const connectToDB = () => mongoose.connect(process.env.MONGO_URI);
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export const TryCatch =
  (func: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(func(req, res, next)).catch(next);

export const generateJwtToken = (payload: any) => {
  return jwt.sign(payload, process.env.JWT_SECRET);
};

export const generateRandomString = (length: number): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(){}[]:;<>+=?/|";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const generateOTP = () =>
  otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

export const addMinutesToCurrentTime = (minutes: number) => {
  return new Date().getTime() + minutes * 60000;
};

export const getFiles = (req: Request, fileNames: Array<string>) => {
  // Multiple files uploaded
  console.log("req:::", req.files);
  const files: any = {};
  fileNames.forEach((fileKey: string) => {
    if (req.files && req.files[fileKey]) {
      files[fileKey] = req.files[fileKey].map((file: any) => "/" + file.key);
    }
  });
  if (Object.keys(files).length) return files;

  return null;
};

export const generateBase32Secret = () => {
  const buffer = randomBytes(15);
  const base32 = encode(buffer).replace(/=/g, "").substring(0, 24);
  return base32;
};

export const filterUser = (user: UserModel) => {
  return {
    ...user,
    password: undefined,
    jti: undefined,
    otp: undefined,
    otpExpiry: undefined,
    otpVerified: undefined,
    isDeleted: undefined,
    isDeactivated: undefined,
    secret: undefined,
    unVerifiedTempCredentials: undefined,
    deviceToken: undefined,
    deviceType: undefined,
    __v: undefined,
    // createdAt: undefined,
    updatedAt: undefined,
    savedPosts: undefined,
    savedVaults: undefined,
  };
};

type ResponseData = Record<string, any>;

export const SUCCESS = (
  res: Response,
  status: number,
  message: string,
  data?: ResponseData
): ResponseData => {
  return res.status(status).json({
    success: true,
    message,
    ...(data ? data : {}),
  });
};
