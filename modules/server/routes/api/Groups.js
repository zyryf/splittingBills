const express = require("express");
const bcrypt = require("bcryptjs");
const Group = require("../../models/Group");
const groupController = require("../../controllers/groupController");
const authToken = require("../../middlewares/authToken");

const router = express.Router();

router.get("/", groupController.getAll);
router.get("/:groupname", groupController.getGroup);
router.get("/:groupname/:username/balance", groupController.getBalance)

router.post("/", authToken, groupController.createGroup);
router.post("/:groupname/expenses", authToken, groupController.addExpense);

router.patch("/:groupname/expenses", authToken, groupController.editExpense);

router.delete("/:groupname/expenses/:expenseid", authToken, groupController.deleteExpense);
router.delete("/:groupname", groupController.deleteGroup);

module.exports = router;
