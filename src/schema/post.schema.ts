import Joi from "joi";
import {
  ObjectIdValidation,
  booleanValidation,
  numberValidation,
  specificStringValidation,
  stringValidation,
} from ".";
import { postSymbol, postType, topics, userRole } from "../utils/enums";

const createPostSchema = {
  body: Joi.object({
    title: stringValidation("Title"),
    description: stringValidation("Description"),
    symbolValue: stringValidation("Symbol Value",false),
    topic: specificStringValidation("Topic", topics),
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

    scheduleDate: Joi.date().greater("now").optional().messages({
      "date.greater": "Schedule Date must be a future date.",
    }),
  }),
};

const getPostsSchema = {
  query: Joi.object({
    type: specificStringValidation("Post type", postType),
    userType: specificStringValidation("User type", userRole),
    sort: booleanValidation("Sort", false),
    page: numberValidation("Page", false),
    limit: numberValidation("Limit", false),
    byFollowers: booleanValidation("Followers", false),
    byBoom: booleanValidation("Booms", false),
    bySave: booleanValidation("Saved", false),
    rating: numberValidation("Rating", false),
    distance: booleanValidation("Distance", false),
    search: stringValidation("Search", false),
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

const saveUnsavePostSchema = {
  params: Joi.object({
    postId: ObjectIdValidation("Post ID"),
  }),
  query: Joi.object({ type: specificStringValidation("Type", postType) }),
};

export default {
  createPostSchema,
  getPostsSchema,
  addCommentsSchema,
  commonSchema,
  saveUnsavePostSchema,
};
