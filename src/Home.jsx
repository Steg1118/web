import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css'

export default function Home() {
  const [count, setCount] = useState(0);
  const [fade, setFade] = useState(true);
  const messages = ["Hello","你好","Hola","こんにちは","Привет","مرحبا","नमस्ते"];

  useEffect(() => {
      const interval = setInterval(() => {
        setFade(false);

        setTimeout(() => {
          setCount(prev => (prev + 1) % messages.length);
          setFade(true);
        }, 500);
      }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div>
        <h2 className={"nametitle"}>Steg1118</h2>
        <a href="https://github.com/Steg1118" target="_blank">
          <img src={`${process.env.PUBLIC_URL}images/snichead.png`} className="logo" alt="sonic logo" />
        </a>
      </div>
      <h1 className={"header " + (fade ? "fade-in" : "fade-out")}>{messages[count]}</h1>
        <h2>I'm Sean, Welcome to my website.</h2>
      <div className="card">  
        <p>
          I create games, websites, art and software.
        </p>
      </div>
      <p className="Introduction">
        Feel free to explore my projects and learn more about me.
      </p>
      <a href="https://github.com/Steg1118" target="_blank">
          <img src={`${process.env.PUBLIC_URL}images/GitHub-Simbolo-1555934127.png`} className="logolink" alt="githublogo" style={{ width: "100px", height: "50px" }} />
      </a>
      <a href="https://github.com/Steg1118" target="_blank">
          <img src={`${process.env.PUBLIC_URL}images/Linkedin-Logo-3802517563.png`} className="logolink" alt="LinkedInlogo" style={{ width: "100px", height: "50px" }} />
      </a>
    </>
  )
}

