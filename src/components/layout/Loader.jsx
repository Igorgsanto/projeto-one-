import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from 'framer-motion';
import { OrbitMark } from '../ui/Icons';
import { MOTION } from '../../lib/animation';

export default function Loader({ onComplete }) {
  const root = useRef(null);
  const counter = useRef(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (reducedMotion) {
      counter.current.textContent = '100';
      const timeout = window.setTimeout(onComplete, 120);
      return () => window.clearTimeout(timeout);
    }

    const ctx = gsap.context(() => {
      const value = { progress: 0 };
      const timeline = gsap.timeline({ onComplete });
      timeline
        .to(value, {
          progress: 100,
          duration: MOTION.loader.count,
          ease: 'power2.inOut',
          onUpdate: () => {
            counter.current.textContent = String(Math.round(value.progress)).padStart(3, '0');
          },
        })
        .to('.loader__line-fill', { scaleX: 1, duration: MOTION.loader.count, ease: 'power2.inOut' }, 0)
        .to('.loader__content', { y: -35, opacity: 0, duration: MOTION.loader.contentExit, ease: 'power2.in' })
        // The whole loader exits as a curtain rather than a simple fade.
        .to(root.current, {
          clipPath: 'inset(0 0 100% 0)',
          duration: MOTION.loader.curtain,
          ease: 'power4.inOut',
        }, '-=0.05');
    }, root);
    return () => ctx.revert();
  }, [onComplete, reducedMotion]);

  return (
    <div className="loader" ref={root} role="status" aria-label="Carregando experiência">
      <div className="loader__content">
        <div className="loader__top">
          <div className="loader__brand"><OrbitMark /> NØVA®</div>
          <span>Preparando a decolagem</span>
        </div>
        <div className="loader__center">
          <span>ESTÚDIO DIGITAL</span>
          <span>SÃO PAULO · BR</span>
        </div>
        <div className="loader__bottom">
          <span className="loader__hint">Uma experiência NØVA</span>
          <div className="loader__count"><span ref={counter}>000</span><sup>%</sup></div>
        </div>
        <div className="loader__line"><div className="loader__line-fill" /></div>
      </div>
    </div>
  );
}
