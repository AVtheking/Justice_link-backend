const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});
const Message = new mongoose.model("Message", messageSchema);  
module.exports = Message;
