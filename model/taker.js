const mongoose = require("mongoose");

const Taker = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  random: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("taker", Taker);
