import { useState } from "react";
import axios from "axios";

const BibleVerse = () => {
  const [verse, setVerse] = useState("");

  const fetchRandomVerse = () => {
    axios.get("https://labs.bible.org/api/?passage=random&type=json").then((res) => setVerse(res.data[0].text));
    const data = response.data[0]; // API returns an array
      setVerse(`${data.bookname} ${data.chapter}:${data.verse} - "${data.text}"`);
  };

  return (
    <div>
      <h2>Bible Verse</h2>
      <p>{verse}</p>
      <button onClick={fetchRandomVerse}>Get Random Verse</button>
    </div>
  );
};

export default BibleVerse;
