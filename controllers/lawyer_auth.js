const { ErrorHandler } = require("../middlewares/error_middleware");
const { Lawyer } = require("../models");
const { registerSchema, loginSchema } = require("../utils/joi");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const lawyerAuthCtrl = {
  register: async (req, res, next) => {
    try {
      const result = await registerSchema.validateAsync(req.body);
      const { name, email, password } = result;
      const hashedPassword = await bcryptjs.hash(password, 10);
      const lawyer = await Lawyer.create({
        name,
        email,
        password: hashedPassword,
      });
      await lawyer.save();
      const payload = {
        id: lawyer._id,
      };
      const token = jwt.sign(payload, process.env.LAWYER);
      res.json({
        success: true,
        message: "Lawyer registered successfully",
        data: {
          lawyer,
          token,
        },
      });
    } catch (e) {
      next(e);
    }
  },
  login: async (req, res, next) => {
    try {
      const result = await loginSchema.validateAsync(req.body);
      const { email, password } = result;
      const lawyer = await Lawyer.findOne({
        email,
      });
      if (!lawyer) {
        return next(new ErrorHandler(404, "Lawyer not found"));
      }
      const isMatch = await bcryptjs.compare(password, lawyer.password);
      if (!isMatch) {
        return next(new ErrorHandler(400, "Invalid password"));
      }
      const token = jwt.sign({ id: lawyer._id }, process.env.LAWYER);
      res.json({
        success: true,
        message: "Lawyer logged in successfully",
        data: {
          lawyer,
          token,
        },
      });
    } catch (e) {
      next(e);
    }
  },
  getlawyerData: async (req, res, next) => {
    try {
      const lawyer = await Lawyer.findById(req.user._id);
      res.json({
        success: true,
        message: "Lawyer data fetched successfully",
        data: {
          lawyer,
        },
      });
    } catch (e) {
      next(e);
    }
  },
};
module.exports = lawyerAuthCtrl;
