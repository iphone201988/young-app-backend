import Joi from "joi";
import {
  ObjectIdValidation,
  numberValidation,
  specificStringValidation,
} from ".";
import { ratingsType } from "../utils/enums";

const giveRatingsSchema = {
  body: Joi.object({
    type: specificStringValidation("Type", ratingsType),
    ratings: numberValidation("Ratings"),
    id: ObjectIdValidation("ID"),
  }),
};
const getRatingsSchema = {
  query: Joi.object({
    id: ObjectIdValidation("Receiver ID"),
    type: specificStringValidation("Type", ratingsType),
  }),
};

export default {
  giveRatingsSchema,
  getRatingsSchema,
};
