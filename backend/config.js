import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT || 5000,  // Port where the server will run
  MONGO_URI: process.env.MONGO_URI, // MongoDB Connection String
  API_BASE_URL: process.env.API_BASE_URL || "http://localhost:5000",
};
