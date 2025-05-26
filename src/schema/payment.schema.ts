import Joi from "joi";
import { ObjectIdValidation, stringValidation } from ".";

const attachPaymentMethodSchema = {
  body: Joi.object({
    paymentMethodId: stringValidation("Payment Method ID"),
  }),
};

export default {
  attachPaymentMethodSchema,
};
