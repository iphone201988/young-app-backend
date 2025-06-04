import express, { Request, Response } from "express";
import "dotenv/config";
import morgan from "morgan";
import { errorMiddleware } from "./src/middleware/error.middleware.js";
import router from "./src/routes/index.js";
import path from "path";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.use("/api/didit-webhook", async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { status } = payload;
    console.log("Received webhook payload:", payload);
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
