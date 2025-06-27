import Joi from "joi";
import {
  ObjectIdValidation,
  booleanValidation,
  emailValidation,
  numberValidation,
  passwordValidation,
} from ".";

const loginSchema = {
  body: Joi.object({
    email: emailValidation(),
    password: passwordValidation(),
  }),
};

const getAllUsersSchema = {
  query: Joi.object({
    page: numberValidation("Page", false),
    limit: numberValidation("Limit", false),
  }),
};

const paginationSchema = {
  query: Joi.object({
    page: numberValidation("Page", false),
    limit: numberValidation("Limit", false),
  }),
};

const IdSchema = {
  params: Joi.object({
    id: ObjectIdValidation("ID"),
  }),
};

const changePasswordSchema = {
  body: Joi.object({
    currentPassword: passwordValidation("Current Password"),
    newPassword: passwordValidation("New Password"),
  }),
};
const updateUserSchema = {
  params: Joi.object({
    id: ObjectIdValidation("ID"),
  }),
  query: Joi.object({
    isDeleted: booleanValidation("Is Delete", false),
    isDeactivated: booleanValidation("Is Deactivated", false),
  }),
};

export default {
  loginSchema,
  getAllUsersSchema,
  IdSchema,
  paginationSchema,
  changePasswordSchema,
  updateUserSchema,
};
