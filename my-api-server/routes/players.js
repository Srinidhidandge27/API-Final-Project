const express = require("express");
const router = express.Router();

// Sample Data (Replace with MongoDB later)
let players = [
  { id: 1, name: "Lionel Messi", position: "Forward", team: "Inter Miami" },
  { id: 2, name: "Cristiano Ronaldo", position: "Forward", team: "Al Nassr" }
];

// GET all players
router.get("/", (req, res) => {
  res.json(players);
});

// GET a single player by ID
router.get("/:id", (req, res) => {
  const player = players.find(p => p.id === parseInt(req.params.id));
  if (player) {
    res.json(player);
  } else {
    res.status(404).json({ message: "Player not found" });
  }
});

// POST (Add a new player)
router.post("/", (req, res) => {
  const newPlayer = {
    id: players.length + 1,
    name: req.body.name,
    position: req.body.position,
    team: req.body.team
  };
  players.push(newPlayer);
  res.status(201).json(newPlayer);
});

// PATCH (Update a player)
router.patch("/:id", (req, res) => {
  const player = players.find(p => p.id === parseInt(req.params.id));
  if (!player) return res.status(404).json({ message: "Player not found" });

  if (req.body.name) player.name = req.body.name;
  if (req.body.position) player.position = req.body.position;
  if (req.body.team) player.team = req.body.team;

  res.json(player);
});

// DELETE (Remove a player)
router.delete("/:id", (req, res) => {
  const index = players.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Player not found" });

  players.splice(index, 1);
  res.json({ message: "Player deleted successfully" });
});

// Export the router
module.exports = router;
