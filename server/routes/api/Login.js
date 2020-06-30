const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const JWT = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

const EXPIRE_TIME = 15;

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = JWT.sign(
          { userID: user._id },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: EXPIRE_TIME,
          }
        );
        return res.status(200).json({ token: token });
      } else {
        return res.status(401).json({ title: "Incorrect password!" });
      }
    } else {
      return res.status(401).json({ title: "Incorrect email!" });
    }
  } catch (err) {
    return res.status(500).json({ title: "Server error :(", error: err });
  }
});

module.exports = router;
