import './App.css';

const roles = [
  ['JUN — AUG 2026 · TOKYO, JAPAN', 'Founding Software Engineer', 'SignTime — Superconnected', 'Led technical design, development, cloud deployment, and documentation from concept to implementation. Built Python backend systems with email/contact data, AI summarization, Flask, SQLite, Docker, REST APIs, and AWS EC2.'],
  ['JAN — MAY 2026 · UC MERCED', 'Undergraduate Research Assistant', 'Machine Learning & Games', 'Developed a Unity auto-battler, trained ML-Agents with Proximal Policy Optimization, and analyzed agent behavior to guide gameplay and experimental design.'],
  ['AUG — DEC 2025 · CALIFORNIA', 'Unity Developer', 'Semcorel Inc.', 'Integrated backend services and databases into a Unity cognitive-testing application using C#, FastAPI, MariaDB, and MySQL.'],
  ['AUG 2024 — PRESENT · UC MERCED', 'Applied Mathematics Learning Assistant', 'University of California, Merced', 'Teach and mentor engineering students in Pre-Calculus, Calculus I, and Calculus II through individual and group instruction.'],
];

export default function About() {
  return (
    <>
      <main className="page about-page">
        <header className="about-hero">
          <div><p className="eyebrow">About Sean</p><h1>Building reliable software and <span className="gradient-text">interactive experiences</span></h1></div>
          <div className="about-intro"><p>I’m a Computer Science & Engineering student at UC Merced. I build full-stack software, backend systems, and games in Unity.</p><p>I enjoy understanding difficult problems, working with thoughtful teams, and turning early ideas into reliable products people can use.</p></div>
        </header>

        <section className="about-facts" aria-label="Education and skills">
          <div><span>Education</span><strong>B.S. Computer Science & Engineering</strong><p>UC Merced · Expected December 2026 · 3.83 GPA</p></div>
          <div><span>Languages</span><strong>C++ · C# · Java · Python</strong><p>Plus REST APIs, OpenGL, Git, and Linux</p></div>
          <div><span>Platforms</span><strong>Unity · Docker · AWS EC2</strong><p>Flask, FastAPI, SQLite, MariaDB, and MySQL</p></div>
        </section>

        <section className="section experience-layout">
          <div className="section-heading"><p className="eyebrow">Experience</p><h2>Building, leading, and learning.</h2></div>
          <div className="timeline">{roles.map(role => <article className="experience" key={role[1]}><p className="date">{role[0]}</p><h3>{role[1]}</h3><p className="organization">{role[2]}</p><p>{role[3]}</p></article>)}</div>
        </section>

        <section className="about-cta"><div><p className="eyebrow">Next chapter</p><h2>Open to software engineering opportunities.</h2></div><a className="text-link" href={`${import.meta.env.BASE_URL}?contact=open`}>Start a conversation <span>↗</span></a></section>

        <section className="art-section about-art">
          <div className="art-heading"><div><p className="eyebrow">Creative practice</p><h2>Illustration & visual storytelling</h2></div><a className="text-link" href="https://www.instagram.com/sean_superepicdraw/" target="_blank" rel="noreferrer">More art <span>↗</span></a></div>
          <div className="art-grid">
            <a className="art-piece art-piece-alien" href={`${import.meta.env.BASE_URL}images/portfolio/alien-man-cover.png`} target="_blank" rel="noreferrer"><img src={`${import.meta.env.BASE_URL}images/portfolio/alien-man-cover.png`} alt="Alien Man issue one cover, written and illustrated by Sean Grant" /></a>
            <a className="art-piece art-piece-gohan" href={`${import.meta.env.BASE_URL}images/portfolio/gohan-illustration.png`} target="_blank" rel="noreferrer"><img src={`${import.meta.env.BASE_URL}images/portfolio/gohan-illustration.png`} alt="Gohan-inspired character illustration by Sean Grant" /></a>
            <a className="art-piece art-piece-sonic" href={`${import.meta.env.BASE_URL}images/portfolio/sonic-illustration.png`} target="_blank" rel="noreferrer"><img src={`${import.meta.env.BASE_URL}images/portfolio/sonic-illustration.png`} alt="Sonic illustration by Sean Grant" /></a>
          </div>
        </section>
      </main>
      <footer className="footer"><span>Sean Grant · Software Engineer</span><a href={`${import.meta.env.BASE_URL}?contact=open`}>Contact form ↗</a></footer>
    </>
  );
}
