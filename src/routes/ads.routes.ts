import express from "express";
import validate from "../middleware/validate.middleware";
import { authenticationMiddleware } from "../middleware/auth.middleware";
import adsController from "../controller/ads.controller";
import adsSchema from "../schema/ads.schema";
import upload from "../middleware/multer.middleware";
import validateFiles from "../middleware/validateFiles.middleware";
import uploadS3 from "../middleware/multerS3.middleware";

const adsRoutes = express.Router();

adsRoutes.post(
  "/",
  authenticationMiddleware,
  uploadS3.fields([
    {
      name: "file",
      maxCount: 1,
    },
  ]),
  validateFiles(["file"]),
  validate(adsSchema.submitRequestForAdSchema),
  adsController.submitRequestForAd
);

adsRoutes.get("/", authenticationMiddleware, adsController.getAds);

export default adsRoutes;
