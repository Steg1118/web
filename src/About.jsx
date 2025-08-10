
import './App.css';

export default function Home() {
  return (
  
    <div className="AboutMe">
      <section>
        <h1>About Me</h1>
        <p>
          Hello! My name is Sean. I’m a junior undergraduate student passionate about building games, learning full-stack web development, drawing, and exploring new creative projects. When I’m not coding, I enjoy traveling, gaming, and spending time with friends, family, and pets. My goal is to create engaging and interactive experiences through programming that bring joy to others, and to build a career doing what I love.
        </p>
      </section>

      <section>
        <h2>Me</h2>
        <div>
          <img src={`${process.env.PUBLIC_URL}images/seaninHK.jpg`} alt="Image" className="gallery-image" />
          <img src={`${process.env.PUBLIC_URL}images/mochasleep.jpg`} alt="Image 2" className="gallery-image" />
          <img src={`${process.env.PUBLIC_URL}images/headshot.jpg`} alt="Image 3" className="gallery-image" />

        </div>
      </section>
      <div className="spacer">
        <section>
        <h2 style={{ fontSize: '1.5rem' }}>Experience</h2>
        <h2>Learning Assistant at University of California, Merced</h2>
        <p><em>August 2024 – Present | Merced, CA</em></p>
        <p>
          I assist engineering students by teaching Introductory Calculus, Calculus 1, and Calculus 2, helping them build a strong foundation in mathematics.
        </p>
      </section>
      
      </div>
      <section>
        <h1>Learn More About Me</h1> 
        <p>
          My Top 9 Video Games:
        </p>
        <div>
          <img src={`${process.env.PUBLIC_URL}images/topgames/portal2-1638924084230-522655275.jpg`} alt="Image" className="gallery-image" />
          <img src={`${process.env.PUBLIC_URL}images/topgames/elden-ring-button-03-1623460560664-3999650182.jpg`} alt="Image 2" className="gallery-image" />
          <img src={`${process.env.PUBLIC_URL}images/topgames/QKJRzanGk86ezpx2pk5QqQaduoXGJV3u8vHIejSav4MYiHA3F7zNgxSOF9bJmt2T-814084814.jpg`} alt="Image 3" className="gallery-image" />
        </div>
        <div>
          <img src={`${process.env.PUBLIC_URL}images/topgames/image-2140392718-1.jpg`} alt="Image" className="gallery-image" />
          <img src={`${process.env.PUBLIC_URL}images/topgames/fallout-new-vegas-500540987.png`} alt="Image 2" className="gallery-image" />
          <img src={`${process.env.PUBLIC_URL}images/topgames/sonic-adventure-2---button-1547850392122-3838835479.jpg`} alt="Image 3" className="gallery-image" />
        </div>
        <div>
          <img src={`${process.env.PUBLIC_URL}images/topgames/Eyd39JI06dtAxZReqdhJHXN5-3633685964.jpg`} alt="Image" className="gallery-image" />
          <img src={`${process.env.PUBLIC_URL}images/topgames/283094-minecraft-xbox-360-edition-xbox-360-front-cover-2807904834.png`} alt="Image 2" className="gallery-image" />
          <img src={`${process.env.PUBLIC_URL}images/topgames/1006146_front-1885294038.jpg`} alt="Image 3" className="gallery-image" />
        </div>
        <p>
          Check out my Steam Profile:
        </p>
        <a href="https://steamcommunity.com/id/steg1118/" target="_blank" rel="noopener noreferrer">
           <img src={`${process.env.PUBLIC_URL}images/steam-logo-steam-icon-transparent-free-png-3595373590.png`} className="logolink" alt="My Steam Profile" style={{width: '100px', borderRadius: '10px'}} />
        </a>


      </section>


    </div>


  );
}