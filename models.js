const mongoose = require("mongoose");

const nameValidator = /^[A-Za-z]+$/; 

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, match: nameValidator },
});
const User = mongoose.model("User", UserSchema);
module.exports = User;