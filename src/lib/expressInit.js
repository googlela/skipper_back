import { json, urlencoded } from "express";
require("dotenv").config({ path: "src/config/.env" });
import cors from "cors";
import ip from "ip";
import { greenBright, cyanBright } from "chalk";
import { INTERNAL_LINKS } from "../enum";
import Dbconnection from "../config/dbconfig";
import socketinit from "./socket";

const expressInit = (server) => {
  return new Promise((resolve, reject) => {
    /** Environments */
    const PORT = process.env.PORT || 3000;
    const HOST = process.env.HOST || "localhost";

    /** Parse Req.body */
    server.use(json());
    server.use(urlencoded({ extended: true }));
    /** CORS */
    server.use(
      cors({
        origin: "*",
        methods: ["GET", "POST"],
      })
    );

    const BASE_API_URL = `http://${HOST}:${PORT}${INTERNAL_LINKS.BASE_API_URL}`;
    const NETWORK_BASE_API_URL = `http://${ip.address()}:${PORT}${
      INTERNAL_LINKS.BASE_API_URL
    }`;

    const socketServer = server.listen(PORT, () => {
      console.info(cyanBright("API Running at"));
      console.info(
        cyanBright(`${greenBright("\tLocalhost:")} ${BASE_API_URL}`)
      );
      console.info(
        cyanBright(`${greenBright("\tLAN:")} ${NETWORK_BASE_API_URL}`)
      );
    });
    const io=socketinit(socketServer)
    // var io = require("socket.io")(socketServer, {
    //   cors: {
    //     origin: "http://localhost:3000",
    //     methods: ["GET", "POST"],
    //   },
    // });

    // io.sockets.on("connection", function (socket) {
    //   socket.emit("connection", null);

    //   // console.log("Client has connected",socket.id);
    //   socket.on("mouse", (data) => {
    //     socket.broadcast.emit("mouse", data);
    //   });
    // });
    // io.sockets.on("disconnect", function () {
    //   console.log("Client has disconnected");
    // });
    
    Dbconnection(io);
    resolve();
  });
};

export default expressInit;
