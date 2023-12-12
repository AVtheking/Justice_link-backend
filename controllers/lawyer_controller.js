const { Lawyer } = require("../models");
const { profileSchema } = require("../utils/joi");

const lawyerCtrl = {
  updateProfile: async (req, res, next) => {
    try {
      const result = await profileSchema.validateAsync(req.body);
      const {
        id,
        name,
        email,
        lawyerId,
        skills,
        lawyerExperience,
        location,
        bio,
      } = result;
      const lawyer = await Lawyer.findById(id);
      if (!lawyer) {
        return next(new ErrorHandler(404, "Lawyer not found"));
      }
      lawyer.name = name;
      lawyer.email = email;
      lawyer.lawyerId = lawyerId;
      lawyer.skills = skills;
      lawyer.lawyerExperience = lawyerExperience;
      lawyer.location = location;
      lawyer.bio = bio;
      await lawyer.save();
      res.json({
        success: true,
        message: "Lawyer profile updated successfully",
        data: {
          lawyer,
        },
      });
    } catch (e) {
      next(e);
    }
  },
};
module.exports = lawyerCtrl;
