import './App.css';

const experience = [
  { dates: 'Jun — Aug 2026', role: 'Founding Software Engineer', organization: 'SignTime · Superconnected', location: 'Tokyo, Japan', copy: 'Led technical design, development, deployment, and documentation from concept to implementation. Built Python backend services with AI summarization, persistent contact data, Docker, REST APIs, SQLite, and AWS EC2.', tags: ['Python', 'Flask', 'Docker', 'AWS'] },
  { dates: 'Aug 2024 — Present', role: 'Applied Mathematics Learning Assistant', organization: 'University of California, Merced', location: 'Merced, CA', copy: 'Teach and mentor engineering students in Pre-Calculus, Calculus I, and Calculus II through individual and group instruction.', tags: ['Teaching', 'Mentorship'] },
  { dates: 'Jan — May 2026', role: 'Undergraduate Research Assistant', organization: 'University of California, Merced', location: 'Merced, CA', copy: 'Developed a Unity auto-battler, trained ML-Agents with Proximal Policy Optimization, and analyzed agent behavior to guide experimental design.', tags: ['Unity', 'ML-Agents', 'PPO'] },
  { dates: 'Aug — Dec 2025', role: 'Unity Developer', organization: 'Semcorel Inc.', location: 'California', copy: 'Integrated backend server and database functionality into a Unity cognitive-testing application using C#, FastAPI, MariaDB, and MySQL.', tags: ['C#', 'FastAPI', 'Databases'] },
];

const projects = [
  { title: 'Superconnected', type: 'Product engineering · Tokyo', copy: 'Python services, AI summarization, SQLite, Docker, and AWS EC2—from concept through deployment.', href: 'https://www.linkedin.com/in/seantegrant/', tags: ['Python', 'Flask', 'AWS'] },
  { title: 'ML Auto-battler', type: 'Undergraduate research', copy: 'A Unity research environment for training and analyzing ML-Agents with Proximal Policy Optimization.', href: 'https://github.com/Steg1118', tags: ['Unity', 'PPO', 'ML-Agents'] },
  { title: 'Multiplayer Mario', type: 'Online game systems', copy: 'A browser game with competitive and cooperative multiplayer mechanics.', href: 'https://github.com/Steg1118', tags: ['Web', 'Multiplayer'] },
];

const itchGames = [
  { number: '01', title: 'The Binding of Neil', type: 'Independent game · In development', copy: 'An original role-playing project combining game systems, visual direction, design, and mathematics.', href: 'https://steg1118.itch.io/the-binding-of-neil', image: 'binding-of-neil.png', alt: 'The Binding of Neil pixel art title image' },
  { number: '02', title: 'Project Horizon', type: '1st place · UCM GDC Game Jam', copy: 'A physics-driven space simulation built with the UC Merced Game Development Club.', href: 'https://richiejr.itch.io/testing', image: 'project-horizon.png', alt: 'Pixel art desk scene from Project Horizon' },
  { number: '03', title: 'Remediation', type: '1st place · Aqua Arcade Game Jam', copy: 'An educational aquifer-pollution game built by a four-person team with programming, visual assets, and UI.', href: 'https://richiejr.itch.io/remediation', image: 'remediation-game.png', alt: 'Green lizard character from Remediation' },
];

export default function Projects() {
  return (
    <>
      <main className="page portfolio-page">
        <header className="portfolio-intro">
          <div><p className="eyebrow">Portfolio · 2024—2026</p><h1>My Work</h1></div>
          <p>Professional experience first, followed by software, games, research, and illustration.</p>
        </header>

        <section className="work-experience" aria-labelledby="experience-title">
          <div className="work-section-heading"><div><p className="eyebrow">Professional background</p><h2 id="experience-title">Experience</h2></div><a className="text-link" href={`${import.meta.env.BASE_URL}Sean-Grant-Resume.pdf`} target="_blank" rel="noreferrer">View résumé <span>↗</span></a></div>
          <div className="work-experience-list">
            {experience.map((role, index) => (
              <article className="work-role" key={`${role.role}-${role.organization}`}>
                <span className="work-role-number">0{index + 1}</span>
                <div className="work-role-title"><p>{role.dates}</p><h3>{role.role}</h3><span>{role.organization}</span></div>
                <div className="work-role-copy"><p>{role.copy}</p><div>{role.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div></div>
                <span className="work-role-location">{role.location}</span>
              </article>
            ))}
          </div>
        </section>

        <div className="projects-heading"><div><p className="eyebrow">Play on itch.io</p><h2>Featured games</h2></div><p>Three playable projects spanning independent development, team collaboration, and award-winning game jams.</p></div>

        <section className="itch-project-grid" aria-label="Featured itch.io games">
          {itchGames.map(game => <a className="itch-project" href={game.href} target="_blank" rel="noreferrer" key={game.title}><div className="itch-project-visual"><img src={`${import.meta.env.BASE_URL}images/portfolio/${game.image}`} alt={game.alt} /><span>itch.io</span><strong>{game.number}</strong></div><div className="itch-project-copy"><p>{game.type}</p><h2>{game.title}</h2><span>{game.copy}</span><b>Play game ↗</b></div></a>)}
        </section>

        <div className="additional-heading"><p className="eyebrow">Additional technical work</p><h2>Software & research</h2></div>
        <section className="project-compact-grid" aria-label="More selected projects">
          {projects.map((project, index) => (
            <article className="compact-project" key={project.title}>
              <div className="compact-project-top"><span>0{index + 2}</span><p>{project.type}</p></div>
              <h2>{project.title}</h2>
              <p>{project.copy}</p>
              <div className="compact-project-bottom"><div>{project.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div><a href={project.href} target="_blank" rel="noreferrer" aria-label={`View ${project.title}`}>↗</a></div>
            </article>
          ))}
        </section>

      </main>
      <footer className="footer"><span>Sean Grant · Selected work</span><a href={`${import.meta.env.BASE_URL}?contact=open`}>Contact form ↗</a></footer>
    </>
  );
}
