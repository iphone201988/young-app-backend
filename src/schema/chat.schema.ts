import Joi from "joi";
import { ObjectIdValidation, stringValidation } from ".";

const getChatMessagesSchema = {
  params: Joi.object({
    chatId: ObjectIdValidation("ID"),
  }),
};

const reportUserSchema = {
  body: Joi.object({
    reporterUserId: ObjectIdValidation("Reporter User Id"),
    reason: stringValidation("Reason"),
    additionalDetails: stringValidation("Additional Details"),
  }),
};

export default {
  getChatMessagesSchema,
  reportUserSchema
};
