import express from "express";
import userRoutes from "./user.routes";
import postRoutes from "./post.routes";
import vaultRoutes from "./vault.routes";
import commentRoutes from "./comments.routes";
import eventRoutes from "./events.routes";
import chatRoutes from "./chat.routes";
import ratingsRoutes from "./ratings.routes";
import paymentRoutes from "./payment.routes";
import reportRoutes from "./report.routes";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/vault", vaultRoutes);
router.use("/comment", commentRoutes);
router.use("/event", eventRoutes);
router.use("/chat", chatRoutes);
router.use("/rating", ratingsRoutes);
router.use("/payment", paymentRoutes);
router.use("/report", reportRoutes);

export default router;
