import Joi from "joi";
import {
  ObjectIdValidation,
  numberValidation,
  specificStringValidation,
  stringValidation,
} from ".";
import { vaultAccess } from "../utils/enums";
import mongoose from "mongoose";
import { userRole } from "../utils/enums";

const createVaultSchema = {
  body: Joi.object({
    title: stringValidation("Title"),
    description: stringValidation("Description"),
    topic: stringValidation("Topic"),
    access: specificStringValidation("Access", vaultAccess),
    // members: stringValidation("Members"),
    // category: stringValidation("Category"),

    members: Joi.string()
      .optional()
      .custom((value, helpers) => {
        const ids = value.split(",");
        for (const id of ids) {
          if (!mongoose.Types.ObjectId.isValid(id)) {
            return helpers.error("any.invalid");
          }
        }
        return value;
      }, "ObjectId validation")
      .messages({
        "any.invalid": `Members must contain valid ObjectIds.`,
        "string.empty": `Members cannot be empty.`,
      }),

    category: Joi.string()
      .required()
      .custom((value, helpers) => {
        const categories = value.split(",");
        const validCategories = Object.values({ ALL: "all", ...userRole });
        for (const cat of categories) {
          if (!validCategories.includes(cat)) {
            return helpers.error("any.invalid");
          }
        }
        return value;
      }, "Category validation")
      .messages({
        "any.invalid": `Category must be one of: ${Object.values({
          ALL: "all",
          ...userRole,
        }).join(", ")}.`,
        "string.empty": `Category cannot be empty.`,
        "any.required": `Category is required.`,
      }),
  }),
};

const getVaultsSchema = {
  query: Joi.object({
    role: specificStringValidation("Role", { ALL: "all", userRole }),
    page: numberValidation("Page", false),
    limit: numberValidation("Limit", false),
  }),
};

const addRemoveMembersByAdminSchema = {
  params: Joi.object({
    vaultId: ObjectIdValidation("Vault ID"),
  }),
  query: Joi.object({
    memberId: ObjectIdValidation("Member ID"),
  }),
};

const commonSchema = {
  params: Joi.object({
    vaultId: ObjectIdValidation("Vault ID"),
  }),
};

const addCommentSchema = {
  body: Joi.object({
    vaultId: ObjectIdValidation("Vault ID"),
    comment: stringValidation("Comment"),
  }),
};

export default {
  createVaultSchema,
  getVaultsSchema,
  addRemoveMembersByAdminSchema,
  commonSchema,
  addCommentSchema
};
