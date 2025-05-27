import { NextFunction, Request, Response } from "express";
import { SUCCESS, TryCatch, stripe } from "../utils/helper";
import ErrorHandler from "../utils/ErrorHandler";
import Subscription from "../model/subscription.model";

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
    const prices = await stripe.prices.list({
      active: true,
      expand: ["data.product"],
    });
    const finalPlans = prices.data.map((price: any) => ({
      id: price.product.id,
      priceId: price.id,
      name: price.product.name,
      currency: price.currency,
      price: price.unit_amount,
    }));

    return SUCCESS(res, 200, "Subscription plans fetched successfully", {
      data: { plans: finalPlans },
    });
  }
);

const buySubscription = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user, userId } = req;
    const { priceId, paymentMethodId } = req.body;

    if (!user.stripeCustomerId)
      return next(new ErrorHandler("Customer not found", 404));

    if (user.subscriptionId)
      return next(new ErrorHandler("You already have the subscription", 400));

    const subscription = await stripe.subscriptions.create({
      customer: user.stripeCustomerId,
      items: [
        {
          price: priceId,
        },
      ],
      default_payment_method: paymentMethodId,
    });

    const newSubscription = await Subscription.create({
      userId,
      stripeSubscriptionId: subscription.id,
      status: subscription.status,
    });

    user.subscriptionId = newSubscription._id;
    await user.save();

    return SUCCESS(res, 200, "Subscription created successfully", {
      data: { subscription },
    });
  }
);

const getPaymentMethods = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;

    if (!user.stripeCustomerId)
      return next(new ErrorHandler("Customer not found", 404));

    const paymentMethods = await stripe.customers.listPaymentMethods(
      user.stripeCustomerId
    );

    const finalPaymentMethods = paymentMethods.data.map((method: any) => ({
      id: method.id,
      type: method.type,
      card: {
        brand: method.card.brand,
        last4: method.card.last4,
        expMonth: method.card.exp_month,
        expYear: method.card.exp_year,
      },
    }));

    return SUCCESS(res, 200, "Payment methods fetched successfully", {
      data: { paymentMethods: finalPaymentMethods },
    });
  }
);

const removePaymentMethod = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    const { paymentMethodId } = req.body;

    if (!user.stripeCustomerId)
      return next(new ErrorHandler("Customer not found", 404));

    await stripe.paymentMethods.detach(paymentMethodId);

    return SUCCESS(res, 200, "Payment method detached successfully");
  }
);

export default {
  attachPaymentMethod,
  getSubscriptionPlans,
  buySubscription,
  getPaymentMethods,
  removePaymentMethod,
};
