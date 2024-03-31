const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, "This email already exists"],
    
  },
  name: {
    type: String,
    required: [true, "Your name is required, mate!"],
  },
  agno: {
    type: String,
    required: [true, "Your Registration number is required"],
    unique: [true, "Your registration number is already exists"],
  },
  password: {
    type: String,
    required: [true, "Your password is required for your safety "],
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password Invalid, It should contain at least 8 characters, 1 Capital, 1 Smaller, 1 Special characters and 1 number",
    ],
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;