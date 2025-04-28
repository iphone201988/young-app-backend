import { UserModel } from "../../types/Database/types";
import User from "../model/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import { generateBase32Secret } from "../utils/helper";
import OTPAuth from "otpauth";
import QRCode from "qrcode";

export const getUserById = async (userId: string): Promise<UserModel> => {
  const user = await User.findOne({ _id: userId, isDeleted: false });
  if (!user) throw new ErrorHandler("User not found", 400);

  return user;
};

export const getUserByEmail = async (
  email: string
): Promise<UserModel | null> => {
  const user = await User.findOne({
    email: email,
    isDeleted: false,
    isVerified: true,
  });
  if (!user) return null;

  return user;
};

export const getUserByUsername = async (
  username: string
): Promise<UserModel | null> => {
  const user = await User.findOne({
    username: username,
    isDeleted: false,
    isVerified: true,
  });
  if (!user) return null;

  return user;
};

export const enable2FA = async (user: UserModel) => {
  const base32_secret = generateBase32Secret();

  user.secret = base32_secret;
  await user.save();

  const totp = new OTPAuth.TOTP({
    issuer: process.env.TOTP_ISSUER,
    label: process.env.TOTP_LABEL,
    algorithm: "SHA1",
    digits: 6,
    secret: base32_secret,
  });

  let otpauth_url = totp.toString();

  const generatedQR = await QRCode.toDataURL(otpauth_url);

  return { qrCodeUrl: generatedQR, secret: base32_secret };
};
