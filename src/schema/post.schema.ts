import Joi, { number } from "joi";
import {
  ObjectIdValidation,
  numberValidation,
  specificStringValidation,
  stringValidation,
} from ".";
import { postSymbol, postType, userRole } from "../utils/enums";

const createPostSchema = {
  body: Joi.object({
    title: stringValidation("Title"),
    description: stringValidation("Description"),
    topic: stringValidation("Topic"),
    type: specificStringValidation("Type", postType),
    symbol: Joi.string()
      .valid(...Object.values(postSymbol))
      .when("type", {
        is: "share",
        then: Joi.required().messages({
          "any.required": `Symbol is required when type is 'share'.`,
          "string.empty": `Symbol cannot be empty.`,
          "any.only": `Symbol must be one of: ${Object.values(postSymbol).join(
            ", "
          )}.`,
        }),
        otherwise: Joi.optional(),
      })
      .messages({
        "string.base": `Symbol must be a string.`,
      }),

    scheduleDate: Joi.date().greater("now").when("type", {
      is: "stream",
      then: Joi.required(),
      otherwise: Joi.optional(),
    }),
  }).messages({
    "date.greater": "Schedule Date must be a future date.",
  }),
};

const getPostsSchema = {
  query: Joi.object({
    type: specificStringValidation("Post type", postType),
    userType: specificStringValidation("User type", userRole),
    sort: numberValidation("Sort", false),
    page: numberValidation("Page", false),
    limit: numberValidation("Limit", false),
  }),
};

const addCommentsSchema = {
  body: Joi.object({
    postId: ObjectIdValidation("Post ID"),
    comment: stringValidation("Comment"),
  }),
};

const commonSchema = {
  params: Joi.object({
    postId: ObjectIdValidation("Post ID"),
  }),
};

export default {
  createPostSchema,
  getPostsSchema,
  addCommentsSchema,
  commonSchema
};
