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
  stripeCustomerId: string;
};
