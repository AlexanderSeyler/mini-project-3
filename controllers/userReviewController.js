"use strict";
const Models = require("../models");

const getReviews = (res) => {
  Models.Review.find({})
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const createReview = (data, res) => {
  console.log(data);
  new Models.Review(data)
    .save()
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const getReviewById = (req, res) => {
  const reviewId = req.params.reviewId;
  Models.Review.findById(reviewId)
    .then((review) => {
      if (!review) {
        return res.status(404).send("Review not found");
      }
      res.json(review);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Server Error");
    });
};

const updateReview = (req, res) => {
  const reviewId = req.params.reviewId;
  const updatedReview = req.body;

  Models.Review.findByIdAndUpdate(reviewId, updatedReview, { new: true })
    .then((review) => {
      if (!review) {
        return res.status(404).send("Review not found");
      }
      res.json(review);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Server Error");
    });
};

const deleteReview = (req, res) => {
  const reviewId = req.params.reviewId;

  Models.Review.findByIdAndDelete(reviewId)
    .then((review) => {
      if (!review) {
        return res.status(404).send("Review not found");
      }
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Server Error");
    });
};

module.exports = {
  getReviews,
  createReview,
  getReviewById,
  updateReview,
  deleteReview,
};
