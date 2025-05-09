import Joi from "joi";
import {
  ObjectIdValidation,
  specificNumberValidation,
  stringValidation,
} from ".";

const addCommentsSchema = {
  body: Joi.object({
    id: ObjectIdValidation("ID"),
    comment: stringValidation("Comment"),
    type: specificNumberValidation("Type", { post: 1, vault: 2 }),
  }),
};

const getAllCommentsSchema = {
  query: Joi.object({
    id: ObjectIdValidation("ID"),
    type: specificNumberValidation("Type", { post: 1, vault: 2 }),
  }),
};

export default {
  addCommentsSchema,
  getAllCommentsSchema,
};
