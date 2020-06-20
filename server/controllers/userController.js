const Group = require("../models/Group");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const JWT = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (err) {
      return res.json({ message: err });
    }
  },

  async getUser(req, res) {
    const user = await User.findById(req.decoded.userID);
    return res
      .status(200)
      .json({ email: user.email, name: user.name, groups: user.groups });
  },

  async addUser(req, res) {
    const user = new User({
      email: req.body.email,
      name: req.body.name,
      password: bcrypt.hashSync(req.body.password, 10),
    });

    try {
      await user.save();
      return res.status(201).send({ title: "User Created" });
    } catch (err) {
      return res.status(500).json({ title: "Server error!", error: err });
    }
  },
  async leaveGroup(req, res) {
    const userName = req.params.username;
    const groupName = req.params.groupname;
    console.log("leave group!");
    try {
      const user = await User.findOne({ name: userName });
      let group = await Group.findOne({ name: groupName });

      if (!group) return res.status(400).json({ title: "Group not found" });
      if (!user) return res.status(400).json({ title: "User not found" });

      await user.updateOne({
        $pull: { groups: group.name },
      });

      await group.updateOne({
        $pull: { members: user.name },
      });
      group = await Group.findOne({ name: groupName });

      let isEmpty = group.members.length === 0 ? true : false;

      return res.status(200).json({
        title: "You left the group",
        isEmpty: isEmpty,
      });
    } catch (err) {
      return res.status(500).json({ title: "Server error!", error: err });
    }
  },

  async joinGroup(req, res) {
    const userName = req.params.username;
    const groupName = req.params.groupname;

    try {
      const user = await User.findOne({ name: userName });
      const group = await Group.findOne({ name: groupName });

      if (!user) return res.status(400).json({ title: "User not found" });
      if (!group) return res.status(400).json({ title: "Group not found" });

      if (!bcrypt.compareSync(req.body.password, group.password))
        return res.status(400).json({ title: "Incorect password" });
      if (group.members.indexOf(user.name) !== -1)
        return res
          .status(400)
          .json({ title: "User already exists in that group" });

      await user.updateOne({
        $push: { groups: group.name },
      });

      await group.updateOne({
        $push: { members: user.name },
      });

      return res.status(200).json({ title: "You have joined the group" });
    } catch (err) {
      return res.status(500).json({ title: "Server error!", error: err });
    }
  },
};
