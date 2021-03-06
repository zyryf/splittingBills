const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const authToken = require("../../middlewares/authToken");

router.get("/", userController.getUsers);
router.get("/user", authToken, userController.getUser);

router.post("/", userController.addUser);

router.patch(
  "/leave/:groupname/:username",
  authToken,
  userController.leaveGroup
);

router.patch("/join/:groupname/:username", authToken, userController.joinGroup);

module.exports = router;
