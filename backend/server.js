const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

// WebSocket logic
io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  socket.on("userMessage", (msg) => {
    console.log("User:", msg);
    socket.emit("botReply", `Bot says: ${msg}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(4000, () => console.log("🚀 Backend running on http://localhost:4000"));
