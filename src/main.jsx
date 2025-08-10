import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './Home.jsx'
import NavBar from './navbar.jsx'
import About from './About.jsx';
import Project from './Projects.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Project />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
