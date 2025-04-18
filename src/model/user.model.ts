import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { deviceType, userRole } from "../utils/enums";
import { UserModel } from "../../types/Database/types";

const userSchema = new Schema<UserModel>(
  {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    username: { type: String, unique: true, require: true },
    company: { type: String },
    email: { type: String, unique: true, require: true },
    countryCode: { type: String, require: true },
    phone: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    role: { type: String, enum: [...Object.values(userRole)] },
    licenseImage: { type: String, require: true },
    crdNumber: { type: String },
    profileImage: { type: String, require: true },
    additionalPhotos: [{ type: String }],
    age: { type: String },
    gender: { type: String },
    martialStatus: { type: String },
    children: { type: String },
    homeOwnerShip: { type: String },
    objective: { type: String },
    financialExperience: { type: String },
    investments: { type: String },
    servicesInterested: { type: String },
    productsOffered: { type: String },
    areaOfExpertise: { type: String },
    industry: { type: String },
    interestedIn: { type: String },
    deviceToken: { type: String },
    deviceType: { type: Number, enum: [deviceType.IOS, deviceType.ANDROID] },
    jti: { type: String },
    otp: { type: Number },
    otpExpiry: { type: Date },
    otpVerified: { type: Boolean },
    isVerified: { type: Boolean },
    isRegistrationCompleted: { type: Boolean },
    isDeleted: { type: Boolean, default: false },
    stripeCustomerId: { type: String },
    unVerifiedTempCredentials: {
      email: { type: String },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }
});

userSchema.methods.matchPassword = async function (password: string) {
  if (!this.password) return false;
  const isCompared = await bcrypt.compare(password, this.password);
  return isCompared;
};

const User = model<UserModel>("user", userSchema);
export default User;
