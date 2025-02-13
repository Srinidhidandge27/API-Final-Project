// Create the database and collection
use cricket_team_db
db.createCollection("team")

// Insert sample player data
db.team.insertMany([
  { "name": "Virat Kohli", "role": "Batsman", "batting_average": 53.0, "bowling_average": null, "matches_played": 250, "team": "India", "is_captain": false },
  { "name": "MS Dhoni", "role": "Wicketkeeper", "batting_average": 50.6, "bowling_average": null, "matches_played": 350, "team": "India", "is_captain": true },
  { "name": "Jasprit Bumrah", "role": "Bowler", "batting_average": 12.3, "bowling_average": 24.5, "matches_played": 120, "team": "India", "is_captain": false },
  { "name": "Rohit Sharma", "role": "Batsman", "batting_average": 49.8, "bowling_average": null, "matches_played": 230, "team": "India", "is_captain": true },
  { "name": "Hardik Pandya", "role": "All-Rounder", "batting_average": 29.7, "bowling_average": 34.1, "matches_played": 120, "team": "India", "is_captain": false }
])

// Query to Find All Batsmen
db.team.find({"role":"Batsman" })

// Query to Find Players with a Batting Average Greater Than 50 
db.team.find({"batting_average": {$gt: 50} })

// Query to Find the Player Who is Captain
db.team.find({"is_captain": true })

//Query to Find Players with More Than 200 Matches Played
 db.team.find({"matches_played": {$gt: 200} })

// Query to Sort Players by Batting Average in Descending Order 
db.team.find().sort({"batting_average": -1})