import { useState } from "react";
import axios from "axios";

const SearchVerse = () => {
  const [reference, setReference] = useState("");
  const [verse, setVerse] = useState("");

  const fetchVerse = async () => {
    if (!reference) return;
    try {
      const response = await axios.get(
        `https://labs.bible.org/api/?passage=${reference}&type=json`
      );
      const data = response.data[0]; // API returns an array
      setVerse(`${data.bookname} ${data.chapter}:${data.verse} - "${data.text}"`);
    } catch (error) {
      console.error("Error fetching verse:", error);
      setVerse("Verse not found. Check the reference.");
    }
  };

  return (
    <div className="card">
      <h2>Search for a Specific Verse</h2>
      <input
        type="text"
        placeholder="Enter reference (e.g., John 3:16)"
        value={reference}
        onChange={(e) => setReference(e.target.value)}
      />
      <button onClick={fetchVerse}>Search</button>
      <p>{verse}</p>
    </div>
  );
};

export default SearchVerse;
