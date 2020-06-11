const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController")

router.get("/", userController.getUsers);
router.get("/:userid", userController.getUser);

router.post("/", userController.addUser);

router.patch("/leave/:groupid/:userid", userController.leaveGroup)

router.patch("/join/:groupid/:userid", userController.joinGroup)


module.exports = router;
