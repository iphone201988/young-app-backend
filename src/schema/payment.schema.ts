import Joi from "joi";
import { ObjectIdValidation, stringValidation } from ".";

const paymentMethodSchema = {
  body: Joi.object({
    paymentMethodId: stringValidation("Payment Method ID"),
  }),
};

export default {
    paymentMethodSchema,
};
