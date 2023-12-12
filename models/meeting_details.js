const mongoose = require("mongoose");

const meetingDetailsSchema = new mongoose.Schema({
  // meetingId: {
  //   type: String,
  //   // required: true,
  // },
  accusedName: {
    type: String,
   
  },
  familyMemberName: {
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
});
module.exports = meetingDetailsSchema;
