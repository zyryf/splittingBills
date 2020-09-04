const Group = require("../models/Group");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const uuid = require("uuid")
const calculateBalances = require("./calculateBalances")

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

  async createGroup(req, res) {
    const group = new Group({
      name: req.body.name,
      password: bcrypt.hashSync(req.body.password, 10),
      members: [req.body.members],
    });
    const user = await User.findOne({ name: req.body.members })

    const isRepeted = await Group.findOne({ name: group.name });
    if (isRepeted)
      return res.status(401).json({ title: "Group already exists!" });
    
    if (group.name == "")
      return res.status(401).json({ title: "Empty name!" });

    try {
      await user.updateOne({
        $push: { groups: group.name }
      });
      await group.save();
      return res.status(201).send({ title: "Group created!" });
    } catch (err) {
      return res.status(500).json({ title: "Server error!", error: err });
    }
  },

  async getGroup(req, res) {

    try {
      const group = await Group.findOne({
        name: req.params.groupname,
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

  async getBalance(req, res) {
    try {
      const group = await Group.findOne({
        name: req.params.groupname,
      });

      const userBalance = group.balances.filter((user) => user[0] === req.params.username )[0]

      if (group) {
        return res.status(200).json(userBalance[1]);

      } else {
        return res.status(500).json({ title: "Group not found in database!" });
      }
    } catch (err) {
      return res.status(500).json({ title: "Server error", error: err });
    }
  },

  async deleteGroup(req, res) {
    try {
      const groupToDelete = await Group.findOne({ name: req.params.groupname })

      if (groupToDelete === null) return res.status(400).json({ title: "Group not found" });

      groupToDelete.remove();
      return res.status(200).json({ title: "Group Deleted" });

    } catch (err) {
      return res.status(500).json({ title: "Server error", error: err });
    }
  },

  async addExpense(req, res) {
    try {
      let group = await Group.findOne({ name: req.params.groupname })
      if (group === null) return res.status(400).json({ title: "Group not found" });

      let expense = req.body
      expense.id = uuid.v4()
      
      await group.updateOne({
        $push: { expenses: expense }
      });
      
      group = await Group.findOne({ name: req.params.groupname })
      const balances = calculateBalances(group.expenses, group.members)
  
      await group.updateOne({
        $set: {balances: balances}
      })

      return res.status(200).json({ title: "Expense added!" });
    } catch (err) {
      return res.status(500).json({ title: "Server error", error: err });
    }
  },

  async deleteExpense(req, res) {
    try {
      let group = await Group.findOne({ name: req.params.groupname })

      await group.updateOne({
        $pull: { expenses: { id: req.params.expenseid } }
      })

      group = await Group.findOne({ name: req.params.groupname })
      const balances = calculateBalances(group.expenses, group.members)
      

      await group.updateOne({
        $set: {balances: balances}
      })

      
      
      return res.status(200).json({ title: "Expense deleted" });
    } catch (err) {
      return res.status(500).json({ title: "Server error", error: err });
    }
  },

  async editExpense(req, res) {
    try {
      let group = await Group.findOne({ name: req.params.groupname })
      let updatedExpense = req.body

      await group.updateOne({
        $pull: { expenses: { id: updatedExpense.id } }
      })

      await group.updateOne({
        $push: { expenses: updatedExpense }
      })

      group = await Group.findOne({ name: req.params.groupname })
      const balances = calculateBalances(group.expenses, group.members)

      await group.updateOne({
        $set: {balances: balances}
      })

      
      return res.status(200).json({ title: "Group Modified" })

    } catch (err) {
      return res.status(500).json({ title: "Server error", error: err });
    }
  }
}