const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const JWT = require("jsonwebtoken");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    return res.json({ message: err });
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     res.json(user);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

router.get("/getuser", async (req, res) => {
  const token = req.headers.token;
  JWT.verify(token, "secretkey", async (err, decoded) => {
    if (err)
      return res.json(401).json({ title: "Unauthorized user!", error: err });

    try {
      const user = await User.findById(decoded.userID);

      return res.status(200).json({ email: user.email, name: user.name });
    } catch (err) {
      return res.status(401).json({ title: "Unauthorized user!", error: err });
    }
  });
});
router.post("/", async (req, res) => {
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 10),
  });

  try {
    await user.save();
    return res.status(201).send();
  } catch (err) {
    return res.status(500).json({ title: "Server error!", error: err });
  }
});

module.exports = router;
