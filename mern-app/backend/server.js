require("dotenv").config();  // Load environment variables first
console.log("MongoDB URI:", process.env.MONGO_URI); // Debugging output

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use("/players", require("./routes/players"));
app.use("/bible", require("./routes/bible"));
app.get("/", (req, res) => {
  res.send("Welcome to the MERN App API!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
