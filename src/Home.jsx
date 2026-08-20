import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CareerDecal from './CareerDecal.jsx';
import ContactForm from './ContactForm.jsx';
import './App.css';

const greetings = [
  'Hello',
  '你好',
  'こんにちは',
  'Hola',
  'مرحباً',
];

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/Steg1118', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/seantegrant/', icon: 'linkedin' },
  { label: 'itch.io', href: 'https://Steg1118.itch.io', icon: 'gamepad' },
];

function SocialIcon({ name }) {
  if (name === 'github') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .8a11.4 11.4 0 0 0-3.6 22.2c.6.1.8-.2.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.6.1-3.1 0 0 1-.3 3.1 1.2A10.7 10.7 0 0 1 12 6.8c1 0 2.1.1 3.1.4 2.1-1.5 3.1-1.2 3.1-1.2.6 1.5.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.8 5.4-5.5 5.7.4.4.8 1.1.8 2.1v3.1c0 .4.2.7.8.6A11.4 11.4 0 0 0 12 .8Z" /></svg>;
  if (name === 'linkedin') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.3 7.9H1.7V22h3.6V7.9ZM3.5 2A2.1 2.1 0 1 0 3.5 6.2 2.1 2.1 0 0 0 3.5 2ZM22.3 13.9c0-4.2-2.2-6.2-5.2-6.2-2.4 0-3.5 1.3-4.1 2.2v-2h-3.6V22H13v-7c0-1.8.4-3.6 2.7-3.6 2.3 0 2.3 2.1 2.3 3.7V22h3.6l.7-8.1Z" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.1 6.3h9.8c2.4 0 4.4 1.7 4.8 4.1l.7 4.1a3.3 3.3 0 0 1-5.4 3l-1.5-1.3h-7L7 17.5a3.3 3.3 0 0 1-5.4-3l.7-4.1a4.9 4.9 0 0 1 4.8-4.1Zm.4 3.1H5.8v1.7H4.1v1.7h1.7v1.7h1.7v-1.7h1.7v-1.7H7.5V9.4Zm8.8 1.2a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2Zm2.3 2.2a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2Z" /></svg>;
}

export default function Home() {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [contactOpen, setContactOpen] = useState(() => {
    const explicitlyOpened = new URLSearchParams(window.location.search).get('contact') === 'open';
    try {
      return explicitlyOpened || !window.sessionStorage.getItem('sean-portfolio-contact-seen');
    } catch {
      return explicitlyOpened;
    }
  });

  useEffect(() => {
    const timer = window.setInterval(() => setGreetingIndex(index => (index + 1) % greetings.length), 2200);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const openContact = () => setContactOpen(true);
    const closeOnEscape = event => event.key === 'Escape' && setContactOpen(false);
    window.addEventListener('open-contact', openContact);
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      window.removeEventListener('open-contact', openContact);
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  useEffect(() => {
    if (!contactOpen) return;
    try {
      window.sessionStorage.setItem('sean-portfolio-contact-seen', 'true');
    } catch {
      // The contact card still works when session storage is unavailable.
    }
  }, [contactOpen]);

  return (
    <>
      <main className="page home-page">
        <section className="home-hero">
          <div className="home-copy">
            <div className="greeting-line" aria-live="polite">
              <span className="greeting-word" key={greetings[greetingIndex]}>{greetings[greetingIndex]}</span>
            </div>
            <p className="eyebrow">Software engineer · Game developer</p>
            <h1>Sean Grant</h1>
            <div className="global-name"><span lang="zh-Hant">尚華</span></div>
            <p className="hero-lede">I build reliable software and playful interactive systems—across full-stack products, cloud infrastructure, Unity, and machine learning.</p>
            <div className="hero-actions">
              <Link className="button primary" to="/projects">View my work <span>↗</span></Link>
              <button className="button quiet" type="button" onClick={() => setContactOpen(true)}>Contact me</button>
            </div>
            <div className="social-row" aria-label="Profile links">
              {socialLinks.map(link => <a className="social-link" href={link.href} target="_blank" rel="noreferrer" key={link.label}><SocialIcon name={link.icon} /><span>{link.label}</span><small>↗</small></a>)}
            </div>
          </div>
          <CareerDecal />
        </section>

        <section className="home-summary" aria-label="Professional summary">
          <article><span>01</span><div><h2>Engineer</h2><p>Python, C#, REST APIs, databases, Docker, and AWS.</p></div></article>
          <article><span>02</span><div><h2>Game developer</h2><p>Unity systems, multiplayer, ML-Agents, and two game-jam wins.</p></div></article>
          <article><span>03</span><div><h2>Global builder</h2><p>UC Merced CSE student with product experience in Tokyo.</p></div></article>
        </section>

        <section className="home-next">
          <div><p className="eyebrow">Currently</p><h2>Finishing my CSE degree and looking for the next team to build with.</h2></div>
          <div className="home-next-links"><Link className="text-link" to="/about">About me <span>↗</span></Link><Link className="text-link" to="/projects">Selected projects <span>↗</span></Link></div>
        </section>
      </main>

      {contactOpen && (
        <div className="contact-modal" role="presentation" onMouseDown={event => event.target === event.currentTarget && setContactOpen(false)}>
          <section className="contact-dialog" role="dialog" aria-modal="true" aria-labelledby="contact-title">
            <button className="modal-close" type="button" aria-label="Close contact form" onClick={() => setContactOpen(false)}>×</button>
            <p className="eyebrow">Say hello</p>
            <h2 id="contact-title">Let’s connect.</h2>
            <p className="modal-intro">A short note is all I need. Your message is saved securely and sent to my inbox.</p>
            <ContactForm />
          </section>
        </div>
      )}

      <footer className="footer"><span>Sean Grant · Software Engineer</span><a href={`${import.meta.env.BASE_URL}?contact=open`}>Contact form ↗</a></footer>
    </>
  );
}
