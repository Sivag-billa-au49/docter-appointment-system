const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  phone: String,
  appointments: [
    {
      name: String,
      phone: String,
      age: String,
      gender: String,
      specialization: String,
      date: String,
      time: String,
      text: String,
    },
  ],
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
