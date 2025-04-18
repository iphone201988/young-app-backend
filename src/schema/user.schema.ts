import Joi from "joi";
import {
  ObjectIdValidation,
  emailValidation,
  numberValidation,
  specificNumberValidation,
  specificStringValidation,
  stringValidation,
} from ".";
import { deviceType, userRole } from "../utils/enums";

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

const verifyOTPSchema = {
  body: Joi.object({
    userId: ObjectIdValidation("UserID"),
    otp: numberValidation("OTP"),
    type: specificNumberValidation("Type", [1, 2]),
  }),
};

const sendOTPSchema = {
  body: Joi.object({
    email: emailValidation(),
    type: specificNumberValidation("Type", [1, 2]),
  }),
};

const completeRegistrationSchema = {
  userId: ObjectIdValidation("User Id"),
  role: specificStringValidation("Role", userRole),
  crdNumber: stringValidation("CRD Number", false),
  age: stringValidation("Age", false),
  gender: stringValidation("Gender", false),
  martialStatus: stringValidation("Martial Status", false),
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
};

export default {
  registerSchema,
  verifyOTPSchema,
  sendOTPSchema,
  completeRegistrationSchema,
};
