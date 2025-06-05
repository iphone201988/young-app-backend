import app from "./app";
import { connectToDB } from "./src/utils/helper";
import { Server } from "socket.io";
import { createServer } from "http";
import useSockets from "./src/socket/socket";
import https from "httpolyglot";
import http from "http";

const httpServer = http.createServer(app);
const io = new Server(httpServer);
useSockets(io);

connectToDB()
  .then(() => {
    console.log("Connected to DB successfully", process.env.MONGO_URI);
    httpServer.listen(process.env.PORT, () => {
      console.log(`Server is running on port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to DB", error);
  });
