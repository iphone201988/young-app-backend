import express from "express";
import validate from "../middleware/validate.middleware";
import adminController from "../controller/admin.controller";

const adminRoutes = express.Router();

adminRoutes.post("/", adminController.login);

export default adminRoutes;
