const axios = require("axios");
const gameModel = require("../models/gameModel");

const getGames = (res) => {
  gameModel
    .find({})
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const fetchAndSaveGames = async (req, res) => {
  try {
    const response = await axios.get("https://www.mmobomb.com/api1/games");
    const games = response.data;

    const existingGames = await gameModel.find({
      gameId: { $in: games.map((game) => game.gameId) },
    });
    const newGames = games.filter(
      (game) =>
        !existingGames.some(
          (existingGame) => existingGame.gameId === game.gameId
        )
    );

    const savedGames = await gameModel.insertMany(newGames);
    console.log("Saved games:", savedGames);
    res.status(200).json({ result: 200, data: savedGames });
  } catch (error) {
    console.error(error);
    res.status(500).json({ result: 500, error: error.message });
  }
};

const createGame = (req, res) => {
  const gameData = req.body;

  gameModel
    .create(gameData)
    .then((createdGame) => {
      res.status(201).json({ result: 201, data: createdGame });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ result: 500, error: error.message });
    });
};

const getGameById = (req, res) => {
  const gameId = req.params.id;

  gameModel
    .findById(gameId)
    .then((game) => {
      if (!game) {
        return res.status(404).json({ result: 404, error: "Game not found" });
      }
      res.status(200).json({ result: 200, data: game });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ result: 500, error: error.message });
    });
};

const updateGame = (req, res) => {
  const gameId = req.params.id;
  const updateData = req.body;

  gameModel
    .findByIdAndUpdate(gameId, updateData, { new: true })
    .then((updatedGame) => {
      if (!updatedGame) {
        return res.status(404).json({ result: 404, error: "Game not found" });
      }
      res.status(200).json({ result: 200, data: updatedGame });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ result: 500, error: error.message });
    });
};

const deleteGame = (req, res) => {
  const gameId = req.params.id;

  gameModel
    .findByIdAndDelete(gameId)
    .then((deletedGame) => {
      if (!deletedGame) {
        return res.status(404).json({ result: 404, error: "Game not found" });
      }
      res.status(200).json({ result: 200, data: deletedGame });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ result: 500, error: error.message });
    });
};

module.exports = {
  fetchAndSaveGames,
  getGames,
  createGame,
  getGameById,
  updateGame,
  deleteGame,
};
