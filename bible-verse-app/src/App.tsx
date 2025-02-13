import { useState } from 'react'
import RandomVerse from "./components/RandomVerse";
import SearchVerse from "./components/SearchVerse";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="container">
      <h1>Bible Verse App</h1>
      <RandomVerse />
      <SearchVerse />
    </div>
    </>
  )
}

export default App
