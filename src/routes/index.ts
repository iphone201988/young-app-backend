import express from "express";
import userRoutes from "./user.routes";
import postRoutes from "./post.routes";
import vaultRoutes from "./vault.routes";
import commentRoutes from "./comments.routes";
import eventRoutes from "./events.routes";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/vault", vaultRoutes);
router.use("/comment", commentRoutes);
router.use("/event", eventRoutes);

export default router;
