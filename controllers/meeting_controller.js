const { Meeting, Lawyer } = require("../models");

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
    const { lawyerId } = req.body;
    try {
     
    } catch (e) {
      next(e);
   }
  },
  getMeetings: async (req, res, next) => {
    try {
      const meetings = await Meeting.find({ lawyerId: req.user._id });
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
module.exports=meetingCtrl;