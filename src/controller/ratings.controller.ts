import { NextFunction, Request, Response } from "express";
import { SUCCESS, TryCatch } from "../utils/helper";
import Ratings from "../model/ratings.model";
import {
  GetRatingsRequest,
  GiveRatingsRequest,
} from "../../types/API/Ratings/types";
import { ratingsType } from "../utils/enums";
import mongoose from "mongoose";

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
    if (type == ratingsType.SHARE || type == ratingsType.STREAM) query.postId = id;
    if (type == ratingsType.VAULT) query.vaultId = id;

    const rating = await Ratings.findOne(query);

    if (rating) {
      rating.ratings = ratings;
      await rating.save();
    } else {
      await Ratings.create({ ratings, ...query });
    }
    
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

    const query: any = { type };
    if (type == ratingsType.USER)
      query.receiverId = new mongoose.Types.ObjectId(id);

    if (type == ratingsType.SHARE)
      query.postId = new mongoose.Types.ObjectId(id);

    if (type == ratingsType.VAULT)
      query.vaultId = new mongoose.Types.ObjectId(id);

    const count = await Ratings.countDocuments(query);

    const ratings = await Ratings.aggregate([
      { $match: query },
      {
        $group: {
          _id: "$ratings",
          count: { $sum: 1 },
        },
      },
    ]);

    const ratingsCount: Record<number, number> = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    let sum = 0;
    let totalCount = 0;

    console.log("ratings", ratings);

    ratings.forEach((item) => {
      const rating = item._id;
      const count = item.count;

      if (ratingsCount.hasOwnProperty(rating)) {
        ratingsCount[rating] = count;
        sum += rating * count;
        totalCount += count;
      }
    });

    // Calculate average and cap it at 5
    const averageRating =
      totalCount > 0 ? Math.min(5, +(sum / totalCount).toFixed(2)) : 0;

    return SUCCESS(res, 200, "Ratings fetched successfully", {
      data: { totalCount, ratingsCount, averageRating },
    });
  }
);

export default {
  giveRatings,
  getRatings,
};
