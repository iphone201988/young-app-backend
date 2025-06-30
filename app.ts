import express, { Request, Response } from "express";
import "dotenv/config";
import morgan from "morgan";
import { errorMiddleware } from "./src/middleware/error.middleware";
import router from "./src/routes/index";
import path from "path";
import cors from "cors";
import User from "./src/model/user.model";
import { documentVerificationStatus } from "./src/utils/enums";
import { transportProduceAPI } from "./src/socket/mediasaoup";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.use("/api/didit-webhook", async (req: any, res: any) => {
  try {
    const payload = req.body;
    const { status } = payload;
    // const { vendor_data } = payload.decision;

    if (!status) {
      return res.status(400).send("Status is required");
    }
    if (!payload.decision?.vendor_data) {
      return res.status(400).send("Vendor data is required");
    }

    console.log(
      "Received webhook payload:",
      status,
      payload.decision.vendor_data
    );

    const user = await User.findById(payload.decision.vendor_data);

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

app.post("/transport-produce", async (req: Request, res: Response) => {
  console.log("req.body::::", req.body);
  const producerId = await transportProduceAPI(req.body);
  console.log("producerId:::", producerId);

  res.status(200).send(producerId);
});

app.use("/api/v1", router);

app.use(
  "/uploads",
  express.static(path.resolve(path.join(__dirname, "../src/uploads")))
);

app.use(errorMiddleware);

export default app;
