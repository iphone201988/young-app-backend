import express from "express";
import "dotenv/config";
import morgan from "morgan";
import { connectToDB } from "./src/utils/helper.js";
import { errorMiddleware } from "./src/middleware/error.middleware.js";
import router from "./src/routes/index.js";

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use("/api/v1", router);

app.use(errorMiddleware);

export default app;
