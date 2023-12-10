const express = require("express");
const { lawyerController } = require("../controllers/index,");
const lawyer = require("../middlewares/lawyer");
const lawyerRouter = express.Router();

lawyerRouter.post("/register", lawyerController.register);
lawyerRouter.post("/login", lawyerController.login);
lawyerRouter.get("/", lawyer, lawyerController.getlawyerData);

module.exports = lawyerRouter;
