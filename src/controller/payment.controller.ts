import { NextFunction, Request, Response } from "express";
import { SUCCESS, TryCatch, stripe } from "../utils/helper";

const attachPaymentMethod = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    const { paymentMethodId } = req.body;

    if (!user.stripeCustomerId) {
      const customer = await stripe.customers.create({
        name: user.firstName + " " + user.lastName,
        email: user.email,
      });

      user.stripeCustomerId = customer.id;
      await user.save();
    }

    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: user.stripeCustomerId,
    });

    return SUCCESS(res, 200, "Payment method attached successfully");
  }
);

const getSubscriptionPlans = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const prices = await stripe.prices.list({ expand: ["data.product"] });
    const finalPlans = prices.data.map((price: any) => ({
      id: price.product.id,
      name: price.product.name,
      currency: price.currency,
      price: price.unit_amount,
    }));

    return SUCCESS(res, 200, "Subscription plans fetched successfully", {
      data: { plans: finalPlans },
    });
  }
);



export default {
  attachPaymentMethod,
  getSubscriptionPlans,
};
