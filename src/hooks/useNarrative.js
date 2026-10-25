import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'framer-motion';
import { MOTION } from '../lib/animation';

gsap.registerPlugin(ScrollTrigger);

export function useNarrative(rootRef, backgroundRef, ready) {
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (!ready) return undefined;
    const ctx = gsap.context(() => {
      const background = backgroundRef.current;
      const setBackground = (color) => gsap.to(background, { backgroundColor: color, duration: reducedMotion ? 0 : 1.1, ease: 'power2.out', overwrite: true });

      rootRef.current.querySelectorAll('[data-bg]').forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => setBackground(section.dataset.bg),
          onEnterBack: () => setBackground(section.dataset.bg),
        });
      });

      if (!reducedMotion) {
        // Section headlines share one reusable masked-line entrance.
        gsap.utils.toArray('[data-reveal-heading]').forEach((heading) => {
          gsap.from(heading.querySelectorAll('.reveal-line'), {
            yPercent: 115,
            rotate: 2,
            duration: MOTION.section.reveal,
            stagger: MOTION.section.stagger,
            ease: 'power4.out',
            scrollTrigger: { trigger: heading, start: 'top 86%', once: true },
          });
        });

        gsap.utils.toArray('[data-parallax]').forEach((element) => {
          const depth = Number(element.dataset.parallax) || 40;
          gsap.fromTo(element, { y: depth }, {
            y: -depth,
            ease: 'none',
            scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: 1 },
          });
        });
      }
    }, rootRef.current);

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
    };
  }, [ready, reducedMotion, rootRef, backgroundRef]);
}
