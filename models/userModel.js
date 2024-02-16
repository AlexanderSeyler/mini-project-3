const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  userId: { type: String, trim: true, required: true, unique: true },
  username: { type: String, trim: true, required: true },
  userNickname: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true },
  password: { type: String, trim: true, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("user", userSchema);
