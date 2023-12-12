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

  meetingDetail: meetingDetailsSchema,
  meetingStatus: {
    type: String,
    default: "pending",
  },
});
const Meeting = new mongoose.model("Meeting", meetingSchema);
module.exports = Meeting;
