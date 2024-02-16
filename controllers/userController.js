"use strict";
const Models = require("../models");

const getUsers = (res) => {
  Models.User.find({})
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const createUser = (data, res) => {
  console.log(data);
  new Models.User(data)
    .save()
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const getUserById = (req, res) => {
  const userId = req.params.id;
  Models.User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Server Error");
    });
};

const updateUser = (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;

  Models.User.findByIdAndUpdate(userId, updatedUser, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.json(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Server Error");
    });
};

const deleteUser = (req, res) => {
  const userId = req.params.id;

  Models.User.findByIdAndDelete(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Server Error");
    });
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
