const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  name: String,
  position: String,
  team: String,
  age: Number,
});

module.exports = mongoose.model("Player", PlayerSchema);
