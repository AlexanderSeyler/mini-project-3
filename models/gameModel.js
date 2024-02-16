const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  id: { type: String, trim: true, required: true, unique: true },
  title: { type: String, trim: true, required: true },
  thumbnail: { type: String, trim: true, required: true },
  short_description: { type: String, trim: true, required: true },
  game_url: { type: String, trim: true, required: true },
  genre: { type: String, trim: true, required: true },
  platform: { type: String, trim: true, required: true },
  publisher: { type: String, trim: true, required: true },
  developer: { type: String, trim: true, required: true },
  release_date: { type: String, trim: true, required: true },
  profile_url: { type: String, trim: true, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
