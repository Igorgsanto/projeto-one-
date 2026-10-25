import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'framer-motion';
import { processSteps } from '../../data/content';
import { RevealHeading, SectionLabel } from '../ui/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const root = useRef(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (reducedMotion) return undefined;
    const ctx = gsap.context(() => {
      // The timeline spine fills against scroll while each step floats at its own depth.
      gsap.fromTo('.process__line-fill', { scaleY: 0 }, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.process__timeline', start: 'top 55%', end: 'bottom 55%', scrub: 0.6 },
      });
      gsap.utils.toArray('.process-step').forEach((step, index) => {
        gsap.fromTo(step.querySelector('.process-step__inner'), { y: 90 + index * 12 }, {
          y: -20,
          ease: 'none',
          scrollTrigger: { trigger: step, start: 'top 92%', end: 'center 52%', scrub: 1 },
        });
      });
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="processo" ref={root} className="process" data-bg="#090b10" aria-labelledby="process-title">
      <div className="section-shell process__layout">
        <div className="process__intro">
          <div className="process__intro-sticky">
            <SectionLabel number="04">Como acontece</SectionLabel>
            <RevealHeading id="process-title" lines={['DO BRIEFING', 'AO INFINITO.']} />
            <p>Um processo claro para chegar<br />a lugares ainda não explorados.</p>
            <span className="process__badge"><i /> Colaboração em cada etapa</span>
          </div>
        </div>
        <div className="process__timeline">
          <div className="process__line" aria-hidden="true"><div className="process__line-fill" /></div>
          {processSteps.map((step) => (
            <article className="process-step" key={step.number}>
              <div className="process-step__dot" aria-hidden="true" />
              <div className="process-step__inner">
                <div className="process-step__meta"><span>FASE / {step.number}</span><span>{step.duration}</span></div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
