const express = require("express");
const { lawyerController, lawyerAuthController } = require("../controllers");
const lawyer = require("../middlewares/lawyer");
const lawyerRouter = express.Router();

lawyerRouter.post("/register", lawyerAuthController.register);
lawyerRouter.post("/login", lawyerAuthController.login);
lawyerRouter.get("/", lawyer, lawyerAuthController.getlawyerData);
lawyerRouter.put("/updateProfile", lawyer, lawyerController.updateProfile);
lawyerRouter.post(
  "/uploadCaseStatus",
  lawyer,
  lawyerController.uploadCaseDetails
);
lawyerRouter.put(
  "/updateCaseDetails",
  lawyer,
  lawyerController.updateCaseDetails
);
lawyerRouter.get(
  "/getCaseDetails/:id",
  lawyer,
  lawyerController.getCaseDetails
);

module.exports = lawyerRouter;
