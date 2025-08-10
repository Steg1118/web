import { Link } from 'react-router-dom';
import './App.css'
import About from './About.jsx';
import Home from './Home.jsx';
import Project from './Projects.jsx';

export default function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" className='navLink'>Home</Link>
      <Link to="/projects" className='navLink'>Projects</Link>
      <Link to="/about" className='navLink'>About Me</Link>
    </nav>
  );
}