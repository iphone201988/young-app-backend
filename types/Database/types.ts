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
  lastLogin: Date;
  crdNumber: string;
  profileImage: string;
  additionalPhotos: string[];
  age: string;
  gender: string;
  maritalStatus: string;
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
  isDeactivated: boolean;
  stripeCustomerId: string;
  packageName: string;
  secret: string;
  is2FAEnabled: boolean;
  unVerifiedTempCredentials: {
    email: string;
  };

  // otherCommonFields

  formUpload: Array<string>;
  website: string;
  city: string;
  state: string;
  race: string;
  about: string;
  businessRevenue: string;
  industriesSeeking: string;
  seeking: string;
  occupation: string;
  fairnessForward: boolean;
  investors: boolean;
  launchDate: Date;

  // startupOtherFields
  stageOfBusiness: string;
  fundsRaised: string;
  fundsRaising: string;

  // financialAdvisorOtherFields
  certificates: string;
  servicesProvided: string;
  yearsInFinancialIndustry: string;

  // memberFields
  educationLevel: string;
  residenceStatus: string;
  yearsEmployed: string;
  salaryRange: string;
  riskTolerance: string;
  topicsOfInterest: string;
  goals: string;
  stockInvestments: string;
  specificStockSymbols: string;
  cryptoInvestments: string;
  specificCryptoSymbols: string;
  otherSecurityInvestments: string;
  realEstate: string;
  retirementAccount: string;
  savings: string;
  startups: string;
  investmentAccounts: boolean;
  retirement: boolean;
  investmentRealEstate: boolean;

  following: any[];
  followedBy: any[];
  customers: any[];
  savedPosts: any[];
  savedVaults: any[];

  createdAt: Date;
  updatedAt: Date;

  matchPassword(password: string): Promise<boolean>;
}

export interface PostModel extends Document {
  userId: any;
  title: string;
  symbol: string;
  topic: string;
  description: string;
  image: string;
  type: string;
  scheduleDate: Date;
  isPublished: boolean;
  isDeleted: boolean;
  likedBy: any[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentsModel extends Document {
  postId: any;
  userId: any;
  vaultId: any;
  comment: string;
  type: string;
  likedBy: any[];

  createdAt: Date;
  updatedAt: Date;
}

export interface VaultModel extends Document {
  admin: any;
  members: any[];
  title: string;
  topic: string;
  description: string;
  image: string;
  access: string;
  category: string;
  isDeleted: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export interface EventsMModel extends Document {
  userId: any;
  title: string;
  topic: string;
  description: string;
  file: string;
  type: string;
  scheduledDate: Date;
  isDeleted: boolean;

  createdAt: Date;
  updatedAt: Date;
}
