const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const JWT = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

const EXPIRE_TIME = 3000;

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

router.post("/fb", async (req, res) => {
  const fbToken = req.body.accessToken;

  const fbData = await FB.api("/me", "GET", {
    fields: ["id", "name", "email"],
    access_token: fbToken,
  }).then((response_data) => {
    return response_data;
  });
  console.log(fbData);

  // TERAZ TO SAMO CO PRZY LOGOWANIU, z tym że jeżeli nie ma takiego usera to go tworzymy
  try {
    const user = await User.findOne({ email: fbData.email });
    if (user) {
      const token = JWT.sign(
        { userID: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: EXPIRE_TIME,
        }
      );
      return res.status(200).json({ token: token });
    } else {
      // Tutaj zabawa
      // musimy zwrócić info że nie jest jeszcze zarejestrowany
      // email mamy z facebooka, hasło niepotrzebne, ale trzeba dodać że jest to user z OAuth, bo Ci userzy nie bedą mieli hasła
      //(albo pomyślałem że każdy z oauth może mić to samo hasło jakieś losowe zapisane w .env)
      // client musi wysłać info z nową nazwą użytkownika, która musi być niepowtarzalna.
    }
  } catch (err) {}

  /*  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = JWT.sign(
        { userID: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: EXPIRE_TIME,
        }
      );
      return res.status(200).json({ token: token });
    }
  } catch (err) {
    return res.status(500).json({ title: "Server error :(", error: err });
  } */
});

module.exports = router;
