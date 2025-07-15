import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import {
  accountPackage,
  deviceType,
  documentVerificationStatus,
  userRole,
} from "../utils/enums";
import { UserModel } from "../../types/Database/types";

const otherCommonFields = {
  formUpload: [{ type: String }],
  website: { type: String },
  city: { type: String },
  state: { type: String },
  race: { type: String },
  about: { type: String },
  businessRevenue: { type: String },
  industriesSeeking: { type: String },
  seeking: { type: String },
  occupation: { type: String },
  fairnessForward: { type: Boolean },
  investors: { type: Boolean },
  launchDate: { type: Date },
};

const startupOtherFields = {
  stageOfBusiness: { type: String },
  fundsRaised: { type: String },
  fundsRaising: { type: String },
};

const financialAdvisorOtherFields = {
  certificates: { type: String },
  servicesProvided: { type: String },
  yearsInFinancialIndustry: { type: String },
};

const memberOtherFields = {
  educationLevel: { type: String },
  residenceStatus: { type: String },
  yearsEmployed: { type: String },
  salaryRange: { type: String },
  riskTolerance: { type: String },
  topicsOfInterest: [{ type: String }],
  goals: { type: String },
  stockInvestments: { type: String },
  specificStockSymbols: { type: String },
  cryptoInvestments: { type: String },
  specificCryptoSymbols: { type: String },
  otherSecurityInvestments: { type: String },
  realEstate: { type: String },
  retirementAccount: { type: String },
  savings: { type: String },
  startups: { type: String },
  investmentAccounts: { type: Boolean },
  retirement: { type: Boolean },
  investmentRealEstate: { type: Boolean },
};

const userSchema = new Schema<UserModel>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    company: { type: String },
    email: { type: String, unique: true, required: true },
    countryCode: { type: String, required: true },
    phone: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(userRole) },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
      },
    },
    licenseImage: { type: String },
    lastLogin: { type: Date },
    crdNumber: { type: String },
    profileImage: { type: String },
    additionalPhotos: [{ type: String }],
    age: { type: String },
    gender: { type: String },
    maritalStatus: { type: String },
    yearFounded: { type: String },
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
    isRegistrationCompleted: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isDeactivated: { type: Boolean, default: false },
    stripeCustomerId: { type: String },
    packageName: { type: String, enum: Object.values(accountPackage) },
    secret: { type: String },
    is2FAEnabled: { type: Boolean, default: false },
    unVerifiedTempCredentials: {
      email: { type: String },
    },
    // following: [{ type: Schema.Types.ObjectId, ref: "user" }],
    // followers: [{ type: Schema.Types.ObjectId, ref: "user" }],
    // customers: [{ type: Schema.Types.ObjectId, ref: "user" }],
    ...otherCommonFields,
    ...startupOtherFields,
    ...financialAdvisorOtherFields,
    ...memberOtherFields,

    // savedPosts: [{ type: Schema.Types.ObjectId, ref: "post" }],
    // savedVaults: [{ type: Schema.Types.ObjectId, ref: "vault" }],
    subscriptionId: { type: Schema.Types.ObjectId, ref: "subscription" },
    isDocumentVerified: {
      type: String,
      enum: Object.values(documentVerificationStatus),
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
