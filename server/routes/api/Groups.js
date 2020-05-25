const express = require("express");
const bcrypt = require("bcrypt");
const Group = require("../../models/Group");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const groups = await Group.find();
    return res.status(200).json(groups);
  } catch (err) {
    return res.status(500).json({ title: "Server error!", error: err });
  }
});

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

router.get("/usergroups", async (req, res) => {
  const userName = req.headers.username;

  try {
    const groups = await Group.find({ members: userName });
    return res.status(200).json(groups);
  } catch (err) {
    return res.status(500).json({ title: "Server error", error: err });
  }
});

module.exports = router;
