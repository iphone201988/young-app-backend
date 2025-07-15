import { NextFunction, Request, Response } from "express";
import { SUCCESS, TryCatch, getFiles } from "../utils/helper";
import Report from "../model/report.model";
import { getUserById } from "../services/user.services";
import { getPostById } from "../services/post.services";
import { getVaultById } from "../services/vault.services";
import { ReportRequest } from "../../types/API/Report/types";
import Vault from "../model/vault.model";
import ErrorHandler from "../utils/ErrorHandler";

const report = TryCatch(
  async (
    req: Request<{}, {}, ReportRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { userId } = req;
    const { id, reason, additionalDetails, type } = req.body;

    const data: any = {};
    if (type == "user") {
      getUserById(id);
      data.userId = id;
    }
    if (type == "share" || type == "stream") {
      getPostById(id);
      data.postId = id;
    }
    if (type == "vault") {
      // const vault = await Vault.findOne({
      //   _id: id,
      //   members: { $in: [userId] },
      // });
      // if(!vault) return next(new ErrorHandler("You're not authorized to report this vault"))
      getVaultById(id);
      data.vaultId = id;
    }

    const files = getFiles(req, ["screenshots"]);

    await Report.create({
      reporterUserId: userId,
      reason,
      additionalDetails,
      screenshots: files.screenshots,
      type,
      ...data,
    });

    return SUCCESS(res, 200, "Reported successfully");
  }
);

export default {
  report,
};
