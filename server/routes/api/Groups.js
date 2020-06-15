const express = require("express");
const bcrypt = require("bcrypt");
const Group = require("../../models/Group");
const groupController = require("../../controllers/groupController")
//const { catchAsync } = require("../../middlewares/errors")

const router = express.Router();

router.get("/", groupController.getAll);
router.get("/:groupname", groupController.getGroup);
//router.get("/expensees/:groupname", groupController.getExpenses) 
// można to zrobić z tym znakiem zapytania ?fields="expenses" - jakoś tak i nie bedzie potrzebny ten endpoint

router.post("/", groupController.createGroup);

router.post("/:groupname/expenses", groupController.addExpense)
router.delete("/:groupname/expenses/:expenseid", groupController.deleteExpense)

router.delete("/:groupname", groupController.deleteGroup);

module.exports = router;
  