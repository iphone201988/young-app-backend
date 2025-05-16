import { NextFunction, Request, Response } from "express";
import { SUCCESS, TryCatch } from "../utils/helper";
import Ratings from "../model/ratings.model";
import { GiveRatingsRequest } from "../../types/API/Ratings/types";
import ErrorHandler from "../utils/ErrorHandler";

const giveRatings = TryCatch(
  async (
    req: Request<{}, {}, GiveRatingsRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { userId } = req;
    const { ratings, receiverId } = req.body;

    const rating = await Ratings.findOne({
      senderId: userId,
      receiverId,
    });

    if (rating)
      return next(
        new ErrorHandler("You have already given rating to this profile", 400)
      );

    await Ratings.create({
      senderId: userId,
      receiverId,
      ratings,
    });

    return SUCCESS(res, 201, "Ratings added successfully");
  }
);

const getRatings = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { receiverId } = req.params;

    const ratings = await Ratings.find({ receiverId }).select("ratings");

    return SUCCESS(res, 200, "Ratings fetched successfully", {
      data: {
        ratings,
      },
    });
  }
);

export default {
  giveRatings,
  getRatings,
};
