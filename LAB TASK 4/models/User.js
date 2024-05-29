// const mongoose = require("mongoose");

// let userSchema = mongoose.Schema({
//   email: String,
//   password: String,
//   name: String,
  
// });
// let User = mongoose.model("User", userSchema);
// module.exports = User;

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true } // Add username field
});

const User = mongoose.model('User', userSchema);

module.exports = User;
