const express = require("express");
const bcrypt = require("bcrypt");
const Group = require("../../models/Group");
const groupController = require("../../controllers/groupController");
const authToken = require("../../middlewares/authToken");

const router = express.Router();

router.get("/", groupController.getAll);
router.get("/:groupname", groupController.getGroup);
//router.get("/expensees/:groupname", groupController.getExpenses)
// można to zrobić z tym znakiem zapytania ?fields="expenses" - jakoś tak i nie bedzie potrzebny ten endpoint

router.post("/", authToken, groupController.createGroup);

router.post("/:groupname/expenses", authToken, groupController.addExpense);
router.patch("/:groupname/expenses", authToken, groupController.editExpense);
router.delete(
  "/:groupname/expenses/:expenseid",
  authToken,
  groupController.deleteExpense
);

router.delete("/:groupname", groupController.deleteGroup);

module.exports = router;
