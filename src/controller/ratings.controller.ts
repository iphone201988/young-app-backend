import { NextFunction, Request, Response } from "express";
import { SUCCESS, TryCatch } from "../utils/helper";
import Ratings from "../model/ratings.model";
import { GiveRatingsRequest } from "../../types/API/Ratings/types";
import ErrorHandler from "../utils/ErrorHandler";
import { ratingsType } from "../utils/enums";

const giveRatings = TryCatch(
  async (
    req: Request<{}, {}, GiveRatingsRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { userId } = req;
    const { ratings, receiverId, type, postId, vaultId } = req.body;

    const query: any = { senderId: userId, type };
    if (receiverId && type == ratingsType.USER) query.receiverId = receiverId;
    if (postId && type == ratingsType.SHARE) query.postId = postId;
    if (vaultId && type == ratingsType.VAULT) query.vaultId = vaultId;

    const rating = await Ratings.findOne(query);

    if (rating)
      return next(
        new ErrorHandler(
          `You have already given rating to this ${type.toUpperCase()}`,
          400
        )
      );

    await Ratings.create({ ratings, ...query });

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
