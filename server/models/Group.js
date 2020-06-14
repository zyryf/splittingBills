const mongoose = require("mongoose");

const GroupSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  members: {
    type: Array,
    required: true,
  },
  expenses: {
    type: Array
  }
});

module.exports = mongoose.model("Groups", GroupSchema);
