const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userReviewSchema = new Schema({
  reviewId: { type: String, trim: true, required: true, unique: true },
  rating: { type: Number, trim: true, required: true },
  title: { type: String, trim: true, required: true },
  review: { type: String, trim: true, required: true },
  favourite: { type: Boolean, trim: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("userReview", userReviewSchema);
