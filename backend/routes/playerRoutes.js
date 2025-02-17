import express from 'express';
import Player from '../models/Player.js';

const router = express.Router();

router.get('/players', async (req, res) => {
   const players = await Player.find();
   res.json(players);
});

router.post('/players', async (req, res) => {
   const newPlayer = new Player(req.body);
   await newPlayer.save();
   res.json(newPlayer);
   res.status(201).json(newPlayer);
});

router.patch('/players/:id', async (req, res) => {
   const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
   res.json(updatedPlayer);
});

router.delete('/players/:id', async (req, res) => {
   await Player.findByIdAndDelete(req.params.id);
   res.json({ message: 'Player deleted' });
});

export default router;
