import { NextFunction, Request, Response } from "express";
import { SUCCESS, TryCatch } from "../utils/helper";
import Ratings from "../model/ratings.model";
import {
  GetRatingsRequest,
  GiveRatingsRequest,
} from "../../types/API/Ratings/types";
import ErrorHandler from "../utils/ErrorHandler";
import { ratingsType } from "../utils/enums";

const giveRatings = TryCatch(
  async (
    req: Request<{}, {}, GiveRatingsRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { userId } = req;
    const { ratings, type, id } = req.body;

    const query: any = { senderId: userId, type };
    if (type == ratingsType.USER) query.receiverId = id;
    if (type == ratingsType.SHARE) query.postId = id;
    if (type == ratingsType.VAULT) query.vaultId = id;

    const rating = await Ratings.findOne(query);

    if (rating)
      return next(
        new ErrorHandler(
          `You have already given rating to this ${type.toUpperCase()}`,
          400
        )
      );

    await Ratings.create({ ratings, ...query });

    return SUCCESS(res, 201, "Ratings added successfully", {
      data: { ratings },
    });
  }
);

const getRatings = TryCatch(
  async (
    req: Request<{}, {}, {}, GetRatingsRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { id, type } = req.query;

    const query: any = {};
    if (type == ratingsType.USER) query.receiverId = id;
    if (type == ratingsType.SHARE) query.postId = id;
    if (type == ratingsType.VAULT) query.vaultId = id;

    const ratings = await Ratings.find(query).select("ratings");

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
