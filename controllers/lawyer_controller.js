const { Lawyer, Case } = require("../models");
const { profileSchema, caseDetailSchema } = require("../utils/joi");

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
  uploadCaseDetails: async (req, res, next) => {
    try {
      const result = await caseDetailSchema.validateAsync(req.body);
      const {
        victimName,
        lawyerId,
        oppositionName,
        lastPresentedOn,
        petitioner,
        caseNo,
        respondent,
        petAdvocates,
        caseStatus,
        category,
        resAdvocates,
      } = result;
      const caseDetail = await Case.create({
        victimName,
        lawyerId,
        oppositionName,
        lastPresentedOn,
        petitioner,
        caseNo,
        respondent,
        petAdvocates,
        caseStatus,
        category,
        resAdvocates,
      });
      await caseDetail.save();
      res.json({
        success: true,
        message: "Case details updated successfully",
        data: {
          caseDetail,
        },
      });
    } catch (e) {
      next(e);
    }
  },
  updateCaseDetails: async (req, res, next) => {
    const result = await caseDetailSchema.validateAsync(req.body);
    const {
      victimName,
      lawyerId,
      oppositionName,
      lastPresentedOn,
      petitioner,
      caseNo,
      respondent,
      petAdvocates,
      caseStatus,
      category,
      resAdvocates,
    } = result;
    const caseDetail = await Case.findOneAndUpdate(
      { caseNo },
      {
        victimName,
        lawyerId,
        oppositionName,
        lastPresentedOn,
        petitioner,
        caseNo,
        respondent,
        petAdvocates,
        caseStatus,
        category,
        resAdvocates,
      },
      { new: true }
    );
    res.json({
      success: true,
      message: "Case details update successfully",
      data: {
        caseDetail,
      },
    });
  },
  getCaseDetails: async (req, res, next) => {
    try {
      const caseNo = req.params.id;
      const caseDetails = await Case.findOne({ caseNo });
      res.json({
        success: true,
        message: "Case details fetched successfully",
        data: {
          caseDetails,
        },
      });
    } catch (e) {
      next(e);
    }
  },
};
module.exports = lawyerCtrl;
