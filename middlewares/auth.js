const jwt = require("jsonwebtoken");

const { User } = require("../models");
const { ErrorHandler } = require("./error_middleware");

const auth = async (req, res, next) => {
  try {
    let token;
    if (req.headers["authorization"]) {
      token = req.headers["authorization"];
    }

    if (!token && req.query.token) {
      token = req.query.token;
    }

    if (!token) {
      return next(new ErrorHandler(401, "No Token"));
    }

    token = token.replace(/^Bearer\s+/, "");

    jwt.verify(token, process.env.USER, async (err, payload) => {
      if (err) {
        return next(new ErrorHandler(401, "Invalid Token"));
      }

      const id = payload.id;

      const user = await User.findById({ _id: id });

      if (!user) {
        return next(new ErrorHandler(400, "Failed to find user from token"));
      }

      req.user = user;

      next();
    });
  } catch (err) {
    next(err);
  }
};
module.exports = auth;
