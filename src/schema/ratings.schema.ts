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
    receiverId: ObjectIdValidation("Receiver ID", false),
    postId: ObjectIdValidation("Post ID", false),
    vaultId: ObjectIdValidation("Vault ID", false),
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
