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

router.patch("/", async (req, res) => {
  try {
    const groupToUpdate = await Group.findOne({ name: req.body.name });
    if (groupToUpdate) {
      if (bcrypt.compareSync(req.body.password, groupToUpdate.password)) {
        // CHECK IF USERNAME EXISTS IN THAT GROUP

        if (groupToUpdate.members.indexOf(req.body.username) !== -1)
          return res
            .status(401)
            .json({ title: "User already exists in that group!" });

        try {
          const response = await Group.updateOne(
            { name: req.body.name },
            { $push: { members: req.body.username } }
          );
          console.log("group updated!");
          return res.status(200).json({ title: "You have joined the group!" });
        } catch (err) {
          return res.status(500).json({ title: "Server error", error: err });
        }
      } else {
        return res.status(401).json({ title: "Incorrect password!" });
      }
    } else {
      return res.status(500).json({ title: "Group not found in database!" });
    }
  } catch (err) {
    return res.status(500).json({ title: "Server error", error: err });
  }
});

module.exports = router;
