import { useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from '../ui/Icons';

export default function ProjectCard({ project, onOpen }) {
  const displacement = useRef(null);
  const image = useRef(null);
  const reducedMotion = useReducedMotion();
  const filterId = `displacement-${project.id}`;
  const responsiveImage = project.image.replace('.webp', '-768.webp');

  const distort = (entering) => {
    if (reducedMotion || !window.matchMedia('(hover: hover)').matches) return;
    // SVG displacement gives the artwork a liquid refractive hover without another WebGL context.
    gsap.to(displacement.current, { attr: { scale: entering ? 22 : 0 }, duration: entering ? 0.65 : 0.45, ease: 'power2.out' });
    gsap.to(image.current, { scale: entering ? 1.045 : 1, duration: 0.8, ease: 'power3.out' });
  };

  return (
    <article className="project-card">
      <button
        className="project-card__button"
        type="button"
        onClick={() => onOpen(project)}
        onPointerEnter={() => distort(true)}
        onPointerLeave={() => distort(false)}
        data-cursor="view"
        data-cursor-label="Ver"
      >
        <span className="sr-only">Ver detalhes do projeto</span>
        <div className="project-card__media">
          <img
            ref={image}
            src={project.image}
            srcSet={`${responsiveImage} 768w, ${project.image} 1264w`}
            sizes="(max-width: 768px) calc(100vw - 40px), 68vw"
            alt=""
            width="1264"
            height="848"
            loading="lazy"
            decoding="async"
            style={{ filter: `url(#${filterId})` }}
          />
          <div className="project-card__shade" />
          <span className="project-card__view">Explorar <ArrowUpRight /></span>
          <span className="project-card__number">/{project.number}</span>
          <svg className="project-card__filter" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <filter id={filterId} x="-8%" y="-8%" width="116%" height="116%" colorInterpolationFilters="sRGB">
                <feTurbulence type="fractalNoise" baseFrequency="0.009 0.028" numOctaves="2" seed="7" result="noise" />
                <feDisplacementMap ref={displacement} in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="B" />
              </filter>
            </defs>
          </svg>
        </div>
        <div className="project-card__info">
          <div><h3>{project.title}</h3><p>{project.subtitle}</p></div>
          <div className="project-card__meta"><span>{project.category}</span><span>{project.year}</span></div>
        </div>
      </button>
    </article>
  );
}
