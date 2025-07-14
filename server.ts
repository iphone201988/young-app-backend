import app from "./app";
import { connectToDB } from "./src/utils/helper";
import { Server } from "socket.io";
import { createServer } from "http";
import useSockets from "./src/socket/socket";
// import https from "httpolyglot";
import https from "https";
import http from "http";
import fs from "fs";

// const options = {
//   key: fs.readFileSync("./src/ssl/private.key"),
//   cert: fs.readFileSync("./src/ssl/certificate.crt"),
//   ca: fs.readFileSync("./src/ssl/ca_bundle.crt"),
// };

const httpServer = http.createServer(app);
// const httpServer = https.createServer(options, app);

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
