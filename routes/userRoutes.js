const express = require("express");
const router = express.Router();
const Controller = require("../controllers");

router.get("/", (req, res) => {
  Controller.userController.getUsers(res);
});
router.post("/create", (req, res) => {
  Controller.userController.createUser(req.body, res);
});
router.get("/:id", Controller.userController.getUserById);

router.put("/:id", Controller.userController.updateUser);

router.delete("/:id", Controller.userController.deleteUser);

module.exports = router;
