import express from "express";
import { authenticationMiddleware } from "../middleware/auth.middleware";
import validate from "../middleware/validate.middleware";
import upload from "../middleware/multer.middleware";
import validateFiles from "../middleware/validateFiles.middleware";
import reportSchema from "../schema/report.schema";
import reportsController from "../controller/reports.controller";

const reportRoutes = express.Router();

reportRoutes.post(
  "/",
  authenticationMiddleware,
  upload.fields([
    {
      name: "screenshots",
      maxCount: 5,
    },
  ]),
  validateFiles(["screenshots"]),
  validate(reportSchema.reportUserSchema),
  reportsController.reportUser
);

export default reportRoutes;
