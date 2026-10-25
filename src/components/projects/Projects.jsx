import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../../data/content';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { RevealHeading, SectionLabel } from '../ui/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const root = useRef(null);
  const track = useRef(null);
  const progress = useRef(null);
  const [selected, setSelected] = useState(null);
  const closeProject = useCallback(() => setSelected(null), []);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
      const getDistance = () => Math.max(0, track.current.scrollWidth - window.innerWidth + window.innerWidth * 0.06);
      // Horizontal translation is tied to real vertical scroll; the section stays pinned.
      gsap.to(track.current, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${getDistance() * 1.15}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => gsap.set(progress.current, { scaleX: self.progress }),
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="projetos" ref={root} className="projects" data-bg="#0c0b12" aria-labelledby="projects-title">
      <div className="projects__pin">
        <header className="projects__header">
          <SectionLabel number="02">Projetos selecionados</SectionLabel>
          <RevealHeading id="projects-title" lines={['EM ÓRBITA']} />
          <span className="projects__count">( 04 )</span>
        </header>
        <div className="projects__viewport">
          <div className="projects__track" ref={track}>
            {projects.map((project) => <ProjectCard key={project.id} project={project} onOpen={setSelected} />)}
            <div className="projects__end" aria-hidden="true"><span>FIM DA<br />TRANSMISSÃO</span><i>✦</i></div>
          </div>
        </div>
        <div className="projects__progress-wrap">
          <span>SCROLL PARA NAVEGAR</span>
          <div className="projects__progress"><div ref={progress} /></div>
          <span>01 — 04</span>
        </div>
      </div>
      <ProjectModal project={selected} onClose={closeProject} />
    </section>
  );
}
