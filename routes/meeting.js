const express = require("express");
const { meetingController } = require("../controllers");
// const lawyer = require("../middlewares/lawyer");
const auth = require("../middlewares/auth");
const meetingRouter = express.Router();

meetingRouter.get("/all-lawyers", auth, meetingController.getLawyers);

module.exports = meetingRouter;
