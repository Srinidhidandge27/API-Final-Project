Full-stack MERN-based application

This repository integrates all of the previous assignments.

A MongoDB database storing a collection of players.
A REST API built with Node.js and Express.js to perform CRUD operations on the players.
A React + Vite frontend that displays the list of players and interacts with the backend.
An additional feature where the frontend fetches random Bible verses using a public API.

 cd mern-app
 cd backend
 $env:MONGO_URI="mongodb+srv://srinidhi:nidhineha123@players.m5m7g.mongodb.net/?retryWrites=true&w=majority&appName=Players"
node server.js

Server running on port 5000
Connect to Postman and check the output at at http://localhost:5000

GET: http://localhost:5000/players
POST: http://localhost:5000/players
PATCH: http://localhost:5000/players/67b3c475650e1976f8893231
DELETE: http://localhost:5000/players/67b3c475650e1976f8893231


cd mern-app
cd frontend
npm run dev

The frontend will be available at  http://localhost:5173/
