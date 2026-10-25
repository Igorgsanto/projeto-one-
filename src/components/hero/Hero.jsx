import { lazy, Suspense, useLayoutEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'framer-motion';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useSmoothScroll } from '../layout/SmoothScroll';
import Magnetic from '../ui/Magnetic';
import { ArrowRight } from '../ui/Icons';
import { MOTION } from '../../lib/animation';

const HeroScene = lazy(() => import('./HeroScene'));
gsap.registerPlugin(ScrollTrigger);

function SplitLine({ children, offset = false }) {
  return (
    <span className={`hero__title-line ${offset ? 'hero__title-line--offset' : ''}`} aria-hidden="true">
      {Array.from(children).map((character, index) => (
        <span className="hero__char-mask" key={`${character}-${index}`}>
          <span className="hero__char">{character === ' ' ? '\u00A0' : character}</span>
        </span>
      ))}
    </span>
  );
}

export default function Hero({ active }) {
  const root = useRef(null);
  const scrollProgress = useRef(0);
  const reducedMotion = useReducedMotion();
  const mobile = useMediaQuery('(max-width: 768px)');
  const supportsWebGL = useMemo(() => {
    try {
      const canvas = document.createElement('canvas');
      return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
    } catch {
      return false;
    }
  }, []);
  const { scrollTo } = useSmoothScroll();

  useLayoutEffect(() => {
    if (!active) return undefined;
    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set('.hero__char, .hero__meta, .hero__bottom > *, .hero__side', { clearProps: 'all' });
        return;
      }
      // Character masks create a staggered typographic reveal after the loader exits.
      const timeline = gsap.timeline({ defaults: { ease: 'power4.out' } });
      timeline
        .fromTo('.hero__char', { yPercent: 115, rotate: 4 }, { yPercent: 0, rotate: 0, duration: MOTION.hero.reveal, stagger: MOTION.hero.stagger })
        .fromTo('.hero__meta', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.8')
        .fromTo('.hero__bottom > *', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 }, '-=0.65')
        .fromTo('.hero__side', { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.5');
    }, root);
    return () => ctx.revert();
  }, [active, reducedMotion]);

  useLayoutEffect(() => {
    if (reducedMotion) return undefined;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => { scrollProgress.current = self.progress; },
      });
      gsap.to('.hero__content', {
        yPercent: 15,
        opacity: 0.08,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: '35% top', end: 'bottom top', scrub: true },
      });
      gsap.to('.hero__scene, .hero-orb-fallback', {
        scale: 1.12,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="inicio" ref={root} className="hero" data-bg="#0a0a0f" aria-labelledby="hero-title">
      <div className="hero__grid" aria-hidden="true" />
      {reducedMotion || mobile || !supportsWebGL ? (
        // Phones and unsupported GPUs keep the art direction with a lightweight CSS sculpture.
        <div className="hero-orb-fallback" aria-hidden="true"><span /><i /><b /></div>
      ) : (
        <Suspense fallback={<div className="hero-orb-fallback" aria-hidden="true"><span /><i /><b /></div>}>
          <HeroScene scrollProgress={scrollProgress} mobile={mobile} />
        </Suspense>
      )}

      <div className="hero__content">
        <div className="hero__meta">
          <span>ESTÚDIO INDEPENDENTE</span>
          <span>DESIGN · TECNOLOGIA · MOVIMENTO</span>
        </div>
        <h1 id="hero-title" className="hero__title" aria-label="Design sem gravidade">
          <SplitLine>DESIGN</SplitLine>
          <SplitLine offset>SEM GRAVIDADE</SplitLine>
        </h1>
        <div className="hero__side" aria-hidden="true">( 23°33′S — 46°38′W )</div>
        <div className="hero__bottom">
          <p>Criamos experiências digitais<br /> para marcas que não vieram<br className="mobile-only" /> ao mundo para ser comuns.</p>
          <Magnetic className="primary-cta" onClick={() => scrollTo('#projetos')} aria-label="Ver projetos selecionados">
            <span>Ver projetos</span><span className="primary-cta__icon"><ArrowRight /></span>
          </Magnetic>
          <div className="hero__scroll"><span>Scroll para explorar</span><i /></div>
        </div>
      </div>
    </section>
  );
}
