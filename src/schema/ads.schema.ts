import Joi from "joi";
import { emailValidation, stringValidation } from ".";

const submitRequestForAdSchema = {
  body: Joi.object({
    name: stringValidation("Name"),
    company: stringValidation("Company"),
    website: stringValidation("Website"),
    email: emailValidation(),
  }),
};

export default {
  submitRequestForAdSchema,
};
