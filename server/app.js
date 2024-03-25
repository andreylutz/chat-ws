const { router } = require("./route");
const { Server } = require("socket.io");
const cors = require("cors");
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: "*" }));
app.use(router);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join", ({ userName, room }) => {
    socket.join(room);
    socket.emit("message", {
      data: { user: { name: "Admin" }, message: `Hello, ${userName}!` },
    });
  });

  io.on("disconnect", () => {
    console.log("Disconnect");
  });
});

const PORT = process.env.SERVER_PORT ?? 5000;

server.listen(PORT, () => {
  console.warn(`Server is listen port: ${PORT}`);
});
