import Joi from "joi";
import {
  ObjectIdValidation,
  specificStringValidation,
  stringValidation,
} from ".";
import { postType } from "../utils/enums";

const reportSchema = {
  body: Joi.object({
    id: ObjectIdValidation("Reporter User Id"),
    reason: stringValidation("Reason"),
    additionalDetails: stringValidation("Additional Details"),
    type: specificStringValidation(
      "Type",
      Object.values({ USER: "user", ...postType })
    ),
  }),
};

export default {
  reportSchema,
};
