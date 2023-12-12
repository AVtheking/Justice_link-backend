const mongoose = require("mongoose");
const meetingDetailsSchema = require("./meeting_details");

const meetingSchema = new mongoose.Schema({
  lawyerId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  senderName: {
    type: String,
    // required: true,
  },
  receiverName: {
    type: String,
    // required: true,
  },

  accusedName: {
    type: String,
  },
  applicantName: {
    type: String,
    // required: true,
  },
  caseType: {
    type: String,
    // required: true,
  },
  opposingLawyerName: {
    type: String,
    // required: true,
  },
  caseNo: {
    type: String,
    // required: true,
  },
  courtName: {
    type: String,
    // required: true,
  },
  caseDetails: {
    type: String,
    // required: true,
  },
  meetingStatus: {
    type: String,
    default: "pending",
  },
});
const Meeting = new mongoose.model("Meeting", meetingSchema);
module.exports = Meeting;
