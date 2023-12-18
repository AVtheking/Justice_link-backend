const express = require("express");
const { authController, lawyerController } = require("../controllers");
const auth = require("../middlewares/auth");
const authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/user", auth, authController.getUser);
authRouter.get("/getCaseDetails/:id", auth, lawyerController.getCaseDetails);

module.exports = authRouter;
