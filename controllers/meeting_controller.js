const { Meeting, Lawyer, User } = require("../models");
const { meetingSchema } = require("../utils/joi");

const meetingCtrl = {
  getLawyers: async (req, res, next) => {
    try {
      const lawyers = await Lawyer.find();
      res.json({
        success: true,
        message: "Lawyers fetched successfully",
        data: {
          lawyers,
        },
      });
    } catch (e) {
      next(e);
    }
  },
  sendMeetingRequest: async (req, res, next) => {
    try {
      const result = await meetingSchema.validateAsync(req.body);
      const {
        lawyerId,
        userId,
        accusedName,
        senderName,
        receiverName,
        applicantName,
        caseType,
        opposingLawyerName,
        caseNo,
        courtName,
        caseDetails,
      } = result;
      const meeting = await Meeting.create({
        lawyerId,
        userId,
        senderName,
        receiverName,
        accusedName,
        applicantName,
        caseType,
        opposingLawyerName,
        caseNo,
        courtName,
        caseDetails,
      });
      // console.log(recevierName);
      await meeting.save();
      res.json({
        success: true,
        message: "Meeting request sent successfully",
        data: {
          meeting,
        },
      });
    } catch (e) {
      next(e);
    }
  },
  getMeetingForClient: async (req, res, next) => {
    try {
      const meetings = await Meeting.find({ userId: req.user._id });
      // const lawyer = await Lawyer.findById(meetings.lawyerId);
      res.json({
        success: true,
        message: "Meetings request fetched successfully",
        data: {
          meetings,
        },
      });
    } catch (e) {
      next(e);
    }
  },
  getMeetings: async (req, res, next) => {
    try {
      const meetings = await Meeting.find({ lawyerId: req.user._id });
      // const user = await User.findById(meetings.userId);

      res.json({
        success: true,
        message: "Meetings request fetched successfully",
        data: {
          meetings,
        },
      });
    } catch (e) {
      next(e);
    }
  },
  acceptMeeting: async (req, res, next) => {
    try {
      const meeting = await Meeting.findById(req.params.id);
      meeting.status = "accepted";
      await meeting.save();
      res.json({
        success: true,
        message: "Meeting request accepted successfully",
        data: {
          meeting,
        },
      });
    } catch (e) {
      next(e);
    }
  },
};
module.exports = meetingCtrl;
