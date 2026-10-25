import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'framer-motion';
import { SectionLabel } from '../ui/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

const statement = 'Não criamos páginas. Criamos mundos digitais onde design, tecnologia e movimento transformam atenção em conexão.';
const accents = new Set(['mundos', 'conexão.']);

export default function Manifesto() {
  const root = useRef(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (reducedMotion) return undefined;
    const ctx = gsap.context(() => {
      // A single scrubbed timeline lights words progressively through the sticky chapter.
      gsap.to('.manifesto__word', {
        opacity: 1,
        color: (index, element) => element.dataset.accent === 'true' ? '#a993ff' : '#f5f5f0',
        stagger: 0.16,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      });
      gsap.to('.manifesto__orbit', {
        rotate: 160,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="manifesto" ref={root} className="manifesto" data-bg="#0e0c16" aria-labelledby="manifesto-title">
      <div className="manifesto__sticky">
        <div className="manifesto__top"><SectionLabel number="01">Manifesto</SectionLabel><span>UMA DECLARAÇÃO DE INTENÇÕES</span></div>
        <h2 id="manifesto-title" className="manifesto__statement">
          {statement.split(' ').map((word, index) => (
            <span className="manifesto__word" data-accent={accents.has(word)} key={`${word}-${index}`}>{word}{' '}</span>
          ))}
        </h2>
        <div className="manifesto__bottom">
          <p>Menos ruído. Mais significado.<br />Do primeiro insight ao último pixel.</p>
          <div className="manifesto__orbit" aria-hidden="true"><span>N</span><i /><b /></div>
          <span className="manifesto__index">NØVA / 001</span>
        </div>
      </div>
    </section>
  );
}
