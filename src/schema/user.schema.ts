import Joi from "joi";
import {
  ObjectIdValidation,
  booleanValidation,
  emailValidation,
  numberValidation,
  passwordValidation,
  specificNumberValidation,
  specificStringValidation,
  stringValidation,
} from ".";
import { accountPackage, deviceType, userRole } from "../utils/enums";

const registerSchema = {
  body: Joi.object({
    firstName: stringValidation("First Name"),
    lastName: stringValidation("Last Name"),
    role: specificStringValidation("Role", userRole),
    company: stringValidation("Company", false),
    username: stringValidation("Username"),
    email: emailValidation(),
    countryCode: stringValidation("Country Code"),
    phone: stringValidation("Phone"),
    password: stringValidation("Password"),
    deviceToken: stringValidation("Device Token"),
    deviceType: specificNumberValidation("Device Type", deviceType),
  }),
};

const loginUserSchema = {
  body: Joi.object({
    username: stringValidation("Username", false),
    email: emailValidation(false),
    password: passwordValidation(),
    deviceToken: stringValidation("Device Token"),
    deviceType: specificNumberValidation("Device Type", deviceType),
  }).xor("username", "email"),
};

const verifyOTPSchema = {
  body: Joi.object({
    userId: ObjectIdValidation("UserID"),
    otp: numberValidation("OTP"),
    type: specificNumberValidation("Type", [1, 2, 3]),
  }),
};

const sendOTPSchema = {
  body: Joi.object({
    email: emailValidation(),
    type: specificNumberValidation("Type", [1, 2]),
  }),
};

const completeRegistrationSchema = {
  body: Joi.object({
    userId: ObjectIdValidation("User Id"),
    role: specificStringValidation("Role", userRole),
    crdNumber: stringValidation("CRD Number", false),
    age: stringValidation("Age", false),
    gender: stringValidation("Gender", false),
    maritalStatus: stringValidation("Martial Status", false),
    children: stringValidation("Children", false),
    homeOwnerShip: stringValidation("Home Ownership", false),
    objective: stringValidation("Objective", false),
    financialExperience: stringValidation("Financial Experience", false),
    investments: stringValidation("Investments", false),
    servicesInterested: stringValidation("Services Interested", false),
    productsOffered: stringValidation("Products Offered", false),
    areaOfExpertise: stringValidation("Area of Expertise", false),
    industry: stringValidation("Industry", false),
    interestedIn: stringValidation("Interested IN", false),
    stripeCustomerId: stringValidation("Stripe Customer ID", false),
    packageName: specificStringValidation("Package", accountPackage),
  }),
};

const verify2FASchema = {
  body: Joi.object({
    userId: ObjectIdValidation("User Id"),
    otp: stringValidation("OTP"),
  }),
};

const changePasswordSchema = {
  body: Joi.object({
    userId: ObjectIdValidation("User Id"),
    password: passwordValidation(),
  }),
};

const followUnfollowUserSchema = {
  params: Joi.object({
    userId: ObjectIdValidation("User Id"),
  }),
};

const getUserProfileSchema = {
  query: Joi.object({
    userId: ObjectIdValidation("User Id", false),
  }),
};

const updateUserSchema = {
  body: Joi.object({
    firstName: stringValidation("First Name", false),
    lastName: stringValidation("Last Name", false),
    company: stringValidation("Company", false),
    website: stringValidation("Website", false),
    city: stringValidation("City", false),
    state: stringValidation("State", false),
    race: stringValidation("Race", false),
    gender: stringValidation("Gender", false),
    ageRange: stringValidation("Age Range", false),
    yearFounded: stringValidation("Year Founded", false),
    about: stringValidation("About", false),
    fairnessForward: booleanValidation("Fairness Forward", false),
    productsOffered: stringValidation("Products Offered", false),
    areaOfExpertise: stringValidation("Area of Expertise", false),
    businessRevenue: stringValidation("Business Revenue", false),
    investors: booleanValidation("Investors", false),
    industriesSeeking: stringValidation("Industries Seeking", false),
    launchDate: stringValidation("Launch Date", false),
    seeking: stringValidation("Seeking", false),
    stageOfBusiness: stringValidation("Stage of Business", false),
    fundsRaised: stringValidation("Funds Raised", false),
    fundsRaising: stringValidation("Funds Raising", false),
    industry: stringValidation("Industry", false),
    educationLevel: stringValidation("Education Level", false),
    crdNumber: stringValidation("CRD Number", false),
    certificates: stringValidation("Certificates", false),
    servicesProvided: stringValidation("Services Provided", false),
    yearsInFinancialIndustry: stringValidation(
      "Years in Financial Industry",
      false
    ),
    occupation: stringValidation("Occupation", false),
    maritalStatus: stringValidation("Marital Status", false),
    children: stringValidation("Children", false),
    financialExperience: stringValidation("Financial Experience", false),
    residenceStatus: stringValidation("Residence Status", false),
    yearsEmployed: stringValidation("Years Employed", false),
    salaryRange: stringValidation("Salary Range", false),
    riskTolerance: stringValidation("Risk Tolerance", false),
    topicsOfInterest: stringValidation("Topics of Interest", false),
    goals: stringValidation("Goals", false),
    stockInvestments: stringValidation("Stock Investments", false),
    specificStockSymbols: stringValidation("Specific Stock Symbols", false),
    cryptoInvestments: stringValidation("Crypto Investments", false),
    specificCryptoSymbols: stringValidation("Specific Crypto Symbols", false),
    otherSecurityInvestments: stringValidation(
      "Other Security Investments",
      false
    ),
    realEstate: stringValidation("Real Estate", false),
    retirementAccount: stringValidation("Retirement Account", false),
    savings: stringValidation("Savings", false),
    startups: stringValidation("Startups", false),
    investmentAccounts: booleanValidation("Investment Accounts", false),
    retirement: booleanValidation("Retirement", false),
    investmentRealEstate: booleanValidation("Investment Real Estate", false),
    additionalPhotosToBeRemoved: Joi.array().items(Joi.string()).messages({
      "array.base": `"additionalPhotosToBeRemoved" should be an array`,
      "string.base": `"additionalPhotosToBeRemoved" items should be strings`,
    }),

    formUploadToBeRemoved: Joi.array().items(Joi.string()).messages({
      "array.base": `"formUploadToBeRemoved" should be an array`,
      "string.base": `"formUploadToBeRemoved" items should be strings`,
    }),
  }),
};

const updateCustomersSchema = {
  params: Joi.object({
    userId: ObjectIdValidation("User Id"),
  }),
};

const getUsersSchema = {
  query: Joi.object({
    page: numberValidation("Page", false),
    limit: numberValidation("Limit", false),
    category: stringValidation("Category", false),
  }),
};

export default {
  registerSchema,
  loginUserSchema,
  verifyOTPSchema,
  sendOTPSchema,
  completeRegistrationSchema,
  verify2FASchema,
  changePasswordSchema,
  updateUserSchema,
  followUnfollowUserSchema,
  getUserProfileSchema,
  updateCustomersSchema,
  getUsersSchema,
};
