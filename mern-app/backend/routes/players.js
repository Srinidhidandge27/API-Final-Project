const express = require("express");
const Player = require("../models/Player");
const router = express.Router();

// Get all players
router.get("/", async (req, res) => {
  const players = await Player.find();
  res.json(players);
});

// Add a new player
router.post("/", async (req, res) => {
  const newPlayer = new Player(req.body);
  await newPlayer.save();
  res.json(newPlayer);
});

// Update a player
router.patch("/:id", async (req, res) => {
  const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedPlayer);
});

// Delete a player
router.delete("/:id", async (req, res) => {
  await Player.findByIdAndDelete(req.params.id);
  res.json({ message: "Player deleted" });
});

module.exports = router;
