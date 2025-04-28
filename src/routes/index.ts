import express from "express";
import userRoutes from "./user.routes";
import postRoutes from "./post.routes";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/post", postRoutes);

export default router;
