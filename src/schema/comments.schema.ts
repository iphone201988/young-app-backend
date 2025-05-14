import Joi from "joi";
import {
  ObjectIdValidation,
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
