import { useState } from "react";
import axios from "axios";

const RandomVerse = () => {
  const [verse, setVerse] = useState("");

  const fetchRandomVerse = async () => {
    try {
      const response = await axios.get(
        "https://labs.bible.org/api/?passage=random&type=json"
      );
      const data = response.data[0]; // API returns an array
      setVerse(`${data.bookname} ${data.chapter}:${data.verse} - "${data.text}"`);
    } catch (error) {
      console.error("Error fetching random verse:", error);
      setVerse("Failed to load verse. Try again.");
    }
  };

  return (
    <div className="card">
      <h2>Random Bible Verse</h2>
      <button onClick={fetchRandomVerse}>Get Random Verse</button>
      <p>{verse}</p>
    </div>
  );
};

export default RandomVerse;
