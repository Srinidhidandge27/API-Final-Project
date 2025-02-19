Full-stack MERN-based application

This repository integrates all of the previous assignments.

To run backend,

 cd mern-app
 cd backend
 $env:MONGO_URI="mongodb+srv://srinidhi:nidhineha123@players.m5m7g.mongodb.net/?retryWrites=true&w=majority&appName=Players"
 node server.js

Server running on port 5000
Connect to Postman and check the output

GET: http://localhost:5000/players
POST: http://localhost:5000/players
PATCH: http://localhost:5000/players/id
DELETE: http://localhost:5000/players/id

To run frontend,

cd mern-app
cd frontend
npm run dev




