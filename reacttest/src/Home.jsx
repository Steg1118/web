import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import './App.css'

export default function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="images/sonic.png" target="_blank">
          <img src={"images/sonic.png"} className="logo" alt="sonic logo" />
        </a>
      </div>
      <h1>Sean Grant</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="Introduction">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

