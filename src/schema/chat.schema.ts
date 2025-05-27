import Joi from "joi";
import { ObjectIdValidation, stringValidation } from ".";

const getChatMessagesSchema = {
  params: Joi.object({
    chatId: ObjectIdValidation("ID"),
  }),
};

export default {
  getChatMessagesSchema,
};
