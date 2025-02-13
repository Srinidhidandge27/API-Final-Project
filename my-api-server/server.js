const express = require("express");
const mongoose = require("mongoose");

// Import the routes
const playerRoutes = require("./routes/players");

// Create an instance of Express
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.path}`);
  next();
});

// Use the player routes
app.use("/api/players", playerRoutes);

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/sportsDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
