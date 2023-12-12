const mongoose = require("mongoose");
const lawyerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  lawyerId: {
    type: String,

    // unique: true,
  },
  lawyerType: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
  },
  lawyerExperience: {
    type: String,
  },
  bio: {
    type: String,
  },
});
const Lawyer = new mongoose.model("Lawyer", lawyerSchema);
module.exports = Lawyer;
