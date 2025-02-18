const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/random", async (req, res) => {
  const response = await axios.get(process.env.BIBLE_API + "?passage=random&type=json");
  res.json(response.data);
});

router.get("/:verse", async (req, res) => {
  const response = await axios.get(`${process.env.BIBLE_API}?passage=${req.params.verse}&type=json`);
  res.json(response.data);
});

module.exports = router;
