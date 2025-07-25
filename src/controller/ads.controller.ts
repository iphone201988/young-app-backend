import { NextFunction, Request, Response } from "express";
import { SUCCESS, TryCatch, getFiles } from "../utils/helper";
import Advertise from "../model/advertise.model";
import { GetAdsRequest, SubmitAdRequest } from "../../types/API/Ads/types";
import User from "../model/user.model";

const submitRequestForAd = TryCatch(
  async (
    req: Request<{}, {}, SubmitAdRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { userId } = req;
    const { name, company, email, website } = req.body;

    const images = getFiles(req, ["file"]);

    await Advertise.create({
      userId,
      name,
      company,
      email,
      website,
      file: images?.file[0],
    });

    return SUCCESS(res, 201, "Ad submitted successfully");
  }
);

const getAds = TryCatch(
  async (
    req: Request<{}, {}, {}, GetAdsRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { user } = req;
    let { page = 1, limit = process.env.LIMIT } = req.query;
    page = Number(page);
    limit = Number(limit);
    const skip = (page - 1) * limit;

    const viewerLocation = user.location.coordinates;
    const viewerTopics = user.topicsOfInterest || [];
    const viewerServices = user.servicesInterested || "";
    const viewerInterestedIn = user.interestedIn || "";

    const locationQuery = [];

    if (
      viewerLocation &&
      Array.isArray(viewerLocation) &&
      viewerLocation.length === 2
    ) {
      locationQuery.push(
        {
          $geoNear: {
            near: { type: "Point", coordinates: viewerLocation },
            distanceField: "distance",
            spherical: true,
          },
        },
        {
          $match: {
            distance: { $lte: 50000 },
          },
        }
      );
    }

    // First, find nearby users using $geoNear at the top level
    const nearbyUsers = await User.aggregate([
      ...locationQuery,
      {
        $match: {
          $or: [
            { topicsOfInterest: { $in: viewerTopics } },
            { servicesInterested: viewerServices },
            { interestedIn: viewerInterestedIn },
          ],
        },
      },
      {
        $project: {
          _id: 1,
        },
      },
    ]);

    const nearbyUserIds = nearbyUsers.map((user) => user._id);

    // Fetch total count for matching ads
    const totalFiltered = await Advertise.aggregate([
      {
        $match: {
          userId: { $in: nearbyUserIds },
        },
      },
      { $count: "count" },
    ]);

    // Fetch paginated ads
    let ads = await Advertise.aggregate([
      {
        $match: {
          userId: { $in: nearbyUserIds },
        },
      },
      { $skip: skip },
      { $limit: limit },
    ]);

    // If no matching ads found, fallback to all ads
    let total = totalFiltered[0]?.count || 0;
    if (!ads.length) {
      total = await Advertise.countDocuments();
      ads = await Advertise.find({}).skip(skip).limit(limit).lean();
    }

    return SUCCESS(res, 200, "Ads fetched successfully", {
      data: { ads },
      pagination: {
        total,
        page,
        limit,
      },
    });
  }
);

export default {
  submitRequestForAd,
  getAds,
};
