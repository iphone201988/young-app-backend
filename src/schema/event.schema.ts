import Joi from "joi";
import {
  ObjectIdValidation,
  specificStringValidation,
  stringValidation,
} from ".";
import { eventType, topics } from "../utils/enums";
import moment from "moment";

const createEventSchema = {
  body: Joi.object({
    title: stringValidation("Title"),
    topic: specificStringValidation("Topic", topics),
    description: stringValidation("Description"),
    scheduledDate: Joi.date().min(moment.utc().toDate()).required().messages({
      "any.required": "Schedules Date is required.",
      "date.base": "Schedules Date must be a valid date.",
      "date.min": "Schedules Date must not be in the past",
    }),
    type: specificStringValidation("Type", eventType),
  }),
};

const getEventsSchema = {
  query: Joi.object({
    page: Joi.number().optional(),
    limit: Joi.number().optional(),
  }),
};

export default {
  createEventSchema,
  getEventsSchema,
};
