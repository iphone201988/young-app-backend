import express, { Request, Response } from "express";
import "dotenv/config";
import morgan from "morgan";
import { errorMiddleware } from "./src/middleware/error.middleware.js";
import router from "./src/routes/index.js";
import path from "path";
import cors from "cors";
import User from "./src/model/user.model.js";
import { documentVerificationStatus } from "./src/utils/enums.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.use("/api/didit-webhook", async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { status } = payload;
    const { vendor_data } = payload.decision;
    console.log("Received webhook payload:", status, vendor_data);

    const user = await User.findById(vendor_data);

    if (user) {
      let status: string;
      if (status == "Approved") {
        status = documentVerificationStatus.APPROVED;
      } else if (status == "Reject" || status == "Declined") {
        status = documentVerificationStatus.REJECT;
      } else {
        status = documentVerificationStatus.IN_REVIEW;
      }
      user.isDocumentVerified = status;
      await user.save();
    }

    // Process the payload as needed
    res.status(200).send("Webhook received successfully");
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.use("/api/v1", router);

app.use(
  "/uploads",
  express.static(path.resolve(path.join(__dirname, "../src/uploads")))
);

app.use(errorMiddleware);

export default app;
