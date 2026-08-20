import { NavLink } from 'react-router-dom';
import './App.css';
export default function NavBar() {
  function openContact() {
    if (window.location.pathname.replace(/\/$/, '') === import.meta.env.BASE_URL.replace(/\/$/, '')) {
      window.dispatchEvent(new Event('open-contact'));
      return;
    }
    window.location.href = `${import.meta.env.BASE_URL}?contact=open`;
  }

  return <nav className="navbar" aria-label="Primary navigation">
    <NavLink to="/" className="brand" aria-label="Sean Grant home"><span className="brand-text">SEAN GRANT</span></NavLink>
    <div className="nav-links"><NavLink to="/" end className={({isActive}) => `navLink ${isActive ? 'active' : ''}`}>Home</NavLink><NavLink to="/projects" className={({isActive}) => `navLink ${isActive ? 'active' : ''}`}>Work</NavLink><NavLink to="/about" className={({isActive}) => `navLink ${isActive ? 'active' : ''}`}>About</NavLink><button className="nav-contact" type="button" onClick={openContact}>Contact</button></div>
  </nav>;
}
