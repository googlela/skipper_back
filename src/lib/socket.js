const socketinit = (server) => {
  console.log('server', server)
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", function (socket) {
    socket.emit("connection", null);

    // console.log("Client has connected",socket.id);
    socket.on("mouse", (data) => {
      socket.broadcast.emit("mouse", data);
    });
  });
  io.on("disconnect", function () {
    console.log("Client has disconnected");
  });
  return io;
};
export default socketinit;
