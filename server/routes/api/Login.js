const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../../models/User");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(200).json({ title: "User login succesful" });
      } else {
        return res.status(401).json({ title: "Incorrect password!" });
      }
    } else {
      return res.status(401).json({ title: "User not found!" });
    }
  } catch (err) {
    return res.status(500).json({ title: "Server error :(", error: err });
  }
});

module.exports = router;
