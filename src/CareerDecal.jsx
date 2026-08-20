import { useEffect, useRef } from 'react';

export default function CareerDecal() {
  const decal = useRef(null);

  useEffect(() => {
    function reactToPointer(event) {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      decal.current?.style.setProperty('--rx', `${y * -12}deg`);
      decal.current?.style.setProperty('--ry', `${x * 16}deg`);
      decal.current?.style.setProperty('--gx', `${(x + 0.5) * 100}%`);
      decal.current?.style.setProperty('--gy', `${(y + 0.5) * 100}%`);
      decal.current?.style.setProperty('--shift-x', `${x * 18}px`);
      decal.current?.style.setProperty('--shift-y', `${y * 12}px`);
    }

    window.addEventListener('pointermove', reactToPointer, { passive: true });
    return () => window.removeEventListener('pointermove', reactToPointer);
  }, []);

  return (
    <>
      <div className="ambient-decal" ref={decal} aria-hidden="true">
        <span className="decal-depth depth-back" />
        <span className="decal-depth depth-mid" />
        <span className="backdrop-orbit orbit-a" />
        <span className="backdrop-orbit orbit-b" />
        <span className="backdrop-orbit orbit-c" />
        <div className="backdrop-plate"><small>SEAN GRANT</small><strong>SG</strong></div>
      </div>

      <div className="portrait-stage">
        <figure className="portrait-frame">
          <span className="portrait-index">SG / 2026</span>
          <img src={`${import.meta.env.BASE_URL}images/portfolio/sean-headshot-v2.png`} alt="Sean Grant in a black suit" />
        </figure>
      </div>
    </>
  );
}
