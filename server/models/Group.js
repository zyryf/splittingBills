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
});

module.exports = mongoose.model("Groups", GroupSchema);
