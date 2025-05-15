import Joi, { number } from "joi";
import {
  ObjectIdValidation,
  numberValidation,
  specificNumberValidation,
  specificStringValidation,
  stringValidation,
} from ".";
import { postType } from "../utils/enums";

const addCommentsSchema = {
  body: Joi.object({
    id: ObjectIdValidation("ID"),
    comment: stringValidation("Comment"),
    type: specificStringValidation("Type", postType),
  }),
};

const getAllCommentsSchema = {
  query: Joi.object({
    id: ObjectIdValidation("ID"),
    type: specificStringValidation("Type", postType),
    page: numberValidation("Page", false),
    limit: numberValidation("Limit", false),
  }),
};

const likeDislikeCommentSchema = {
  params: Joi.object({
    id: ObjectIdValidation("ID"),
  }),
};

export default {
  addCommentsSchema,
  getAllCommentsSchema,
  likeDislikeCommentSchema,
};
