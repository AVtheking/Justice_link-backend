const express = require("express");
const { meetingController } = require("../controllers");
// const lawyer = require("../middlewares/lawyer");
const auth = require("../middlewares/auth");
const lawyer = require("../middlewares/lawyer");
const meetingRouter = express.Router();

meetingRouter.get("/all-lawyers", auth, meetingController.getLawyers);
meetingRouter.post(
  "/meeting-request",
  auth,
  meetingController.sendMeetingRequest
);
meetingRouter.get(
  "/get-meeting-client/:lawyerId",
  auth,
  meetingController.getMeetingForClient
);
meetingRouter.get("/get-meeting-lawyer", lawyer, meetingController.getMeetings);
meetingRouter.put(
  "/accept-meeting-request/:id",
  lawyer,
  meetingController.acceptMeeting
);
meetingRouter.put(
  "/reject-meeting-request/:id",
  lawyer,
  meetingController.rejectMeeting
);
module.exports = meetingRouter;
