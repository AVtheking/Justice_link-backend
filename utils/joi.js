const Joi = require("joi");
const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
const profileSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  lawyerId: Joi.string().required(),
  // lawyerType: Joi.string().required(),
  skills: Joi.string().required(),
  lawyerExperience: Joi.string().required(),
  location: Joi.string().required(),
  bio: Joi.string().required(),
});
const   meetingSchema = Joi.object({
  lawyerId: Joi.string().required(),
  userId: Joi.string().required(),
  receiverName: Joi.string().required(),
  senderName: Joi.string().required(),
  accusedName: Joi.string().required(),
  applicantName: Joi.string().required(),
  caseType: Joi.string().required(),
  opposingLawyerName: Joi.string().required(),
  caseNo: Joi.string().required(),
  courtName: Joi.string().required(),
  caseDetails: Joi.string().required(),
});
module.exports = {
  registerSchema,
  loginSchema,
  profileSchema,
  meetingSchema,
};
