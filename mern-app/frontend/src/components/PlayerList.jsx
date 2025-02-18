import { useState, useEffect } from "react";
import axios from "axios";

const PlayerList = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/players").then((res) => setPlayers(res.data));
  }, []);

  return (
    <div>
      <h2>Sports Team</h2>
      <ul>
        {players.map((player) => (
          <li key={player._id}>{player.name} - {player.position}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
