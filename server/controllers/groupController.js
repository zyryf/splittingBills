const Group = require("../models/Group");
const bcrypt = require("bcrypt");

module.exports = {
  async getAll(req, res) {
    try {
      const groups = await Group.find();
      return res.status(200).json(groups);
    }
    catch (err) {
      return res.status(500).json({ title: "Server error!", error: err });
    }
  },

  async addGroup(req, res) {
    const group = new Group({
      name: req.body.name,
      password: bcrypt.hashSync(req.body.password, 10),
      members: [req.body.members],
    });

    const isRepeted = await Group.findOne({ name: group.name });
    if (isRepeted)
      return res.status(401).json({ title: "Group already exists!" });

    try {
      await group.save();
      return res.status(201).send();
    } catch (err) {
      return res.status(500).json({ title: "Server error!", error: err });
    }
  },

  async getGroup(req, res) {
    try {
      const group = await Group.findOne({
        _id: req.params.groupid,
      });
      if (group) {
        return res.status(200).json(group);
      } else {
        return res.status(500).json({ title: "Group not found in database!" });
      }
    } catch (err) {
      return res.status(500).json({ title: "Server error", error: err });
    }
  },

  async deleteGroup(req, res) {
    try {
      const groupToDelete = await Group.findOne({ _id: req.params.groupid })

      if(groupToDelete === null) return res.status(400).json({ title: "Group not found" });

      groupToDelete.remove();
      return res.status(200).json({ title: "Group Deleted" });
      
    } catch (err) {
      return res.status(500).json({ title: "Server error", error: err });
    }
  }
}