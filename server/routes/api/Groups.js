const express = require("express");
const bcrypt = require("bcrypt");
const Group = require("../../models/Group");

const router = express.Router();

router.post("/", async (req, res) => {
  const group = new Group({
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 10),
    members: [req.body.members],
  });

  try {
    await group.save();
    return res.status(201).send();
  } catch (err) {
    return res.status(500).json({ title: "Server error!", error: err });
  }
});

router.get("/", (req, res) => {
  res.send("groups page!");
});

module.exports = router;
