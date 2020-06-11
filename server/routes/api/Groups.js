const express = require("express");
const bcrypt = require("bcrypt");
const Group = require("../../models/Group");
const groupController = require("../../controllers/groupController")
//const { catchAsync } = require("../../middlewares/errors")

const router = express.Router();

router.get("/", groupController.getAll);
router.get("/:groupid", groupController.getGroup);

router.post("/", groupController.addGroup);

router.delete("/:groupid", groupController.deleteGroup);

router.patch("/leave", async (req, res) => {
  try {
    await Group.updateOne(
      { name: req.body.name },
      { $pull: { members: req.body.member } }
      );
      
      return res.status(200).json({ title: "You have left the group!" });
    } catch (err) {
      return res.status(500).json({ title: "Server error", error: err });
    }
  });
  
  
  module.exports = router;
  