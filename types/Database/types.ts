import { Document } from "mongoose";

export interface UserModel extends Document {
  firstName: string;
  lastName: string;
  username: string;
  company: string;
  email: string;
  countryCode: string;
  phone: string;
  password: string;
  role: string;
  licenseImage: string;
  crdNumber: string;
  profileImage: string;
  additionalPhotos: string[];
  age: string;
  gender: string;
  martialStatus: string;
  children: string;
  homeOwnerShip: string;
  objective: string;
  financialExperience: string;
  investments: string;
  servicesInterested: string;
  productsOffered: string;
  areaOfExpertise: string;
  industry: string;
  interestedIn: string;
  deviceToken: string;
  deviceType: number;
  jti: string;
  otp: number;
  otpExpiry: Date;
  otpVerified: boolean;
  isVerified: boolean;
  isRegistrationCompleted: boolean;
  isDeleted: boolean;
  stripeCustomerId: string;
  packageName: string;
  secret: string;
  unVerifiedTempCredentials: {
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;

  matchPassword(password: string): Promise<boolean>;
}
