import Joi from "joi";
import { ObjectIdValidation, numberValidation } from ".";

const giveRatingsSchema = {
  body: Joi.object({
    receiverId: ObjectIdValidation("Receiver ID"),
    ratings: numberValidation("Ratings"),
  }),
};
const getRatingsSchema = {
  params: Joi.object({
    receiverId: ObjectIdValidation("Receiver ID"),
  }),
};

export default {
  giveRatingsSchema,
  getRatingsSchema,
};
