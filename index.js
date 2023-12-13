const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { errorMiddleware } = require("./middlewares/error_middleware");
const { authRouter, lawyerRouter, meetingRouter } = require("./routes");
const { User, Message } = require("./models");
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const DB = process.env.DB;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorMiddleware);
app.use(authRouter, errorMiddleware);
app.use("/lawyer", lawyerRouter, errorMiddleware);
app.use(meetingRouter, errorMiddleware);

io.on("connection", async (socket) => {
  console.log("New connection");

  const messages = await Message.find({});
  socket.emit("messageHistory", messages);

  socket.on("message", async (message) => {
    const chatMessage = await Message.create({
      userId: message.userId,
      message: message.message,
    });
    console.log(message);
    io.emit("message", message);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

mongoose.connect(DB).then(() => {
  server.listen(PORT, () => {
    // User.deleteMany({}).then(() => {
    //   console.log("Users deleted");
    // });
    console.log(`Server is running on port ${PORT}`);
  });
});
