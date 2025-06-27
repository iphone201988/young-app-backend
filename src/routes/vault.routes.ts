import express from "express";
import upload from "../middleware/multer.middleware";
import validate from "../middleware/validate.middleware";
import { authenticationMiddleware } from "../middleware/auth.middleware";
import vaultController from "../controller/vault.controller";
import vaultSchema from "../schema/vault.schema";
import validateFiles from "../middleware/validateFiles.middleware";
import uploadS3 from "../middleware/multerS3.middleware";

const vaultRoutes = express.Router();

vaultRoutes.put(
  "/joinLeaveVault/:vaultId",
  authenticationMiddleware,
  validate(vaultSchema.commonSchema),
  vaultController.joinLeaveVault
);

// vaultRoutes.post(
//   "/addComment",
//   authenticationMiddleware,
//   validate(vaultSchema.addCommentSchema),
//   vaultController.addComment
// );

vaultRoutes.put(
  "/saveUnsaveVault/:vaultId",
  authenticationMiddleware,
  validate(vaultSchema.commonSchema),
  vaultController.saveUnsaveVault
);

vaultRoutes.get(
  "/getSavedVaults",
  authenticationMiddleware,
  validate(vaultSchema.getVaultsSchema),
  vaultController.getSavedVaults
);

vaultRoutes.post(
  "/",
  authenticationMiddleware,
  uploadS3.fields([{ name: "image", maxCount: 1 }]),
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

vaultRoutes.delete(
  "/:vaultId",
  authenticationMiddleware,
  vaultController.deleteVault
);

export default vaultRoutes;
