import { NextFunction, Request, Response } from "express";
import { SUCCESS, TryCatch, getFiles } from "../utils/helper";
import Advertise from "../model/advertise.model";
import { SubmitAdRequest } from "../../types/API/Ads/types";

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

export default {
  submitRequestForAd,
};
