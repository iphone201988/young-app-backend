export type RegisterUserRequest = {
  firstName: string;
  lastName: string;
  role: string;
  company: string;
  username: string;
  email: string;
  countryCode: string;
  phone: string;
  password: string;
  deviceToken: string;
  deviceType: number;
};

export type VerifyOTPRequest = {
  userId: any;
  otp: number;
  type: number;
};

export type SendOTPRequest = {
  email: string;
  type: number;
};

export type CompleteRegistrationRequest = {
  userId: string;
  role: string;
  crdNumber: string;
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
  stripeCustomerId: string;
  packageName: string;
};

export type Verify2FARequest = {
  userId: string;
  otp: string;
};

export type LoginUserRequest = {
  username: string;
  email: string;
  password: string;
  deviceType: number;
  deviceToken: string;
};

export type ChangePasswordType = {
  userId: string;
  password: string;
};

export type FollowUnfollowRequest = {
  userId: string;
};

export type UpdateUserRequest = {
  firstName: string;
  lastName: string;
  company: string;
  website: string;
  city: string;
  state: string;
  race: string;
  gender: string;
  ageRange: string;
  yearFounded: string;
  about: string;
  fairnessForward: boolean;
  productsOffered: string;
  areaOfExpertise: string;
  businessRevenue: string;
  investors: boolean;
  isCustomer: boolean;

  industriesSeeking: string;
  launchDate: string;
  seeking: string;

  stageOfBusiness: string;
  fundsRaised: string;
  fundsRaising: string;
  industry: string;

  educationLevel: string;
  crdNumber: string;
  certificates: string;
  servicesProvided: string;
  yearsInFinancialIndustry: string;
  occupation: string;

  maritalStatus: string;
  children: string;
  financialExperience: string;
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
  investmentAccounts: string;
  retirement: string;
  investmentRealEstate: string;

  additionalPhotosToBeRemoved: Array<string>;
  formUploadToBeRemoved: Array<string>;
};

export type GetUsersRequest = {
  category?: string;
  page?: number;
  limit?: number;
};
