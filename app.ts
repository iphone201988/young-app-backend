import express from "express";
import "dotenv/config";
import morgan from "morgan";
import { errorMiddleware } from "./src/middleware/error.middleware.js";
import router from "./src/routes/index.js";
import path from "path";

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use("/api/v1", router);

app.use(
  "/uploads",
  express.static(path.resolve(path.join(__dirname, "../src/uploads")))
);

app.use(errorMiddleware);

export default app;
