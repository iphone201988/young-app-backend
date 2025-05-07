import express from "express";
import userRoutes from "./user.routes";
import postRoutes from "./post.routes";
import vaultRoutes from "./vault.routes";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/vault", vaultRoutes);

export default router;
