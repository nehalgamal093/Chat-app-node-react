const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes.js");
const messageRoute = require("./routes/messagesRoute.js");
const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoute);
mongoose
  .connect("mongodb://127.0.0.1:27017/chat", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("🐱 DB Connection successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(5000, () => {
  console.log(`🌻 Server started at port 5000`);
});

const io = socket(server, {
  cors: {
    origin: "http/localhost:5000",
    credentials: true,
  },
});
global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socketId);
  });
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.message);
    }
  });
});
