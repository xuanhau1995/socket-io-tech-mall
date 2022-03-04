const express = require("express");
const app = express();
const http = require("http");
const port = 3100;
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

/// when have user connect
io.on("connection", (socket) => {
  console.log("User Connected");
  socket.on("tech-mall-support", (data) => {
    io.emit("user-chat", data);
    console.log({ data });
  });
});
app.get("/", (req, res) => res.send("Hello World!"));

server.listen(3100, () => {
  console.log("listening on port 3100");
});
