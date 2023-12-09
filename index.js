const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { errorMiddleware } = require("./middlewares/error_middleware");
const { authRouter } = require("./routes");
const { User } = require("./models");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const DB = process.env.DB;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorMiddleware);
app.use(authRouter, errorMiddleware);

mongoose.connect(DB).then(() => {
  app.listen(PORT, () => {
    // User.deleteMany({}).then(() => {
    //   console.log("Users deleted");
    // });
    console.log(`Server is running on port ${PORT}`);
  });
});
