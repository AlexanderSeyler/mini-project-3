const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");
const UserReviewController = require("../controllers");

router.get("/", (req, res) => {
  gameController.getGames(res);
});
router.post("/", gameController.fetchAndSaveGames);

router.post("/create", gameController.createGame);

router.get("/:id", gameController.getGameById);

router.put("/:id", gameController.updateGame);

router.delete("/:id", gameController.deleteGame);

router.get("/:id/reviews/", (req, res) => {
  UserReviewController.userReviewController.getReviews(res);
});
router.post("/:id/reviews/create", (req, res) => {
  UserReviewController.userReviewController.createReview(req.body, res);
});
router.get(
  "/:id/reviews/:reviewId",
  UserReviewController.userReviewController.getReviewById
);

router.put(
  "/:id/reviews/:reviewId",
  UserReviewController.userReviewController.updateReview
);

router.delete(
  "/:id/reviews/:reviewId",
  UserReviewController.userReviewController.deleteReview
);

module.exports = router;
