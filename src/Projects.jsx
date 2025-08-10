export default function Projects() {
  return (

    <div>
      <h1 className="AboutMe">My Projects</h1>
      
      <p>
        This is where you’ll find my game projects and code repositories.  
        Check out my games below, or visit my itch.io and GitHub profiles for more!
      </p>
      
      <section>
        <h2>Games</h2>
        
        <div>
          <iframe width="552"  height="167" frameborder="15" src="https://itch.io/embed/3762753"><a href="https://steg1118.itch.io/the-binding-of-neil">The Binding of Neil by Steg1118</a></iframe>
        </div>
        
        <div>
          <iframe width="552" height="167" frameborder="15" src="https://itch.io/embed/2630373"><a href="https://richiejr.itch.io/remediation">Remediation by Steg1118 and RichieFriedland</a></iframe>
        </div>
        
        <p>
          Visit my <a href="https://Steg1118.itch.io" target="_blank" rel="noopener noreferrer">itch.io profile</a> to play all my games.
        </p>
      </section>
      
      <section>
        <p>
          You can find the source code for my projects on <a href="https://github.com/Steg1118" target="_blank" rel="noopener noreferrer">GitHub</a>.
        </p>
      </section>
      <section>
        <h2>Art</h2>
        <p>
          I also create art on Instagram: <a href="https://www.instagram.com/sean_superepicdraw/" target="_blank" rel="noopener noreferrer">@sean_superepicdraw</a>
        </p>
        <div>
          <img src="/images/art1.png" alt="Art 1" className="gallery-image" />
          <img src="/images/art2.png" alt="Art 2" className="gallery-image" />
          <img src="/images/art3.png" alt="Art 3" className="gallery-image" /> 
        </div>
      </section>
    </div>


  );
}