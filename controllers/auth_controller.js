const { ErrorHandler } = require("../middlewares/error_middleware");
const User = require("../models/user_model");
const { registerSchema, loginSchema } = require("../utils/joi");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const authCtrl = {
  register: async (req, res, next) => {
    try {
      console.log(req.body);
      const result = await registerSchema.validateAsync(req.body);
      const { name, email, password } = result;
      const hashedPassword = await bcryptjs.hash(password, 10);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      await user.save();
      const payload = {
        id: user._id,
      };
      const token = jwt.sign(payload, process.env.USER);
      res.json({
        success: true,
        message: "User registered successfully",
        data: {
          user,
          token,
        },
      });
    } catch (err) {
      next(err);
    }
  },
  login: async (req, res, next) => {
    try {
      const result = await loginSchema.validateAsync(req.body);
      const { email, password } = result;
      const user = await User.findOne({
        email,
      });
      if (!user) {
        return next(new ErrorHandler(404, "User not found"));
      }
      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        return next(new ErrorHandler(400, "Invalid password"));
      }
      const token = jwt.sign({ id: user._id }, process.env.USER);
      res.json({
        success: true,
        message: "User logged in successfully",
        data: {
          user,
          token,
        },
      });
    } catch (err) {
      next(err);
    }
  },
  getUser: async (req, res, next) => {
    try {
      const user = req.user;
      res.json({
        success: true,
        message: "User fetched successfully",
        data: {
          user,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};
module.exports = authCtrl;
