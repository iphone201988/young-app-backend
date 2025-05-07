import express from "express";
import upload from "../middleware/multer.middleware";
import validate from "../middleware/validate.middleware";
import { authenticationMiddleware } from "../middleware/auth.middleware";
import vaultController from "../controller/vault.controller";
import vaultSchema from "../schema/vault.schema";
import validateFiles from "../middleware/validateFiles.middleware";

const vaultRoutes = express.Router();

vaultRoutes.post(
  "/",
  authenticationMiddleware,
  upload.fields([{ name: "image", maxCount: 1 }]),
  validateFiles(["image"]),
  validate(vaultSchema.createVaultSchema),
  vaultController.createVault
);

vaultRoutes.get(
  "/",
  authenticationMiddleware,
  validate(vaultSchema.getVaultsSchema),
  vaultController.getVaults
);

vaultRoutes.put(
  "/:vaultId",
  authenticationMiddleware,
  validate(vaultSchema.addRemoveMembersByAdminSchema),
  vaultController.addRemoveMembersByAdmin
);

vaultRoutes.get(
  "/:vaultId",
  authenticationMiddleware,
  validate(vaultSchema.commonSchema),
  vaultController.getVaultDetailById
);

vaultRoutes.put(
  "/joinLeaveVault/:vaultId",
  authenticationMiddleware,
  validate(vaultSchema.commonSchema),
  vaultController.joinLeaveVault
);

vaultRoutes.post(
  "/addComment",
  authenticationMiddleware,
  validate(vaultSchema.addCommentSchema),
  vaultController.addComment
);

export default vaultRoutes;
