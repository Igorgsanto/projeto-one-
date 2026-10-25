import { createContext, useCallback, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'framer-motion';
import { MOTION } from '../../lib/animation';

gsap.registerPlugin(ScrollTrigger);

const ScrollContext = createContext(null);

export function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return undefined;

    const lenis = new Lenis({
      duration: MOTION.scroll.smoothDuration,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.1,
      wheelMultiplier: 0.9,
    });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    // One shared GSAP ticker drives Lenis, avoiding competing RAF loops.
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  const scrollTo = useCallback((target, options = {}) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { duration: 1.4, ...options });
      return;
    }
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (element === 0 || target === 0) window.scrollTo({ top: 0, behavior: 'auto' });
    else element?.scrollIntoView({ behavior: 'auto', block: 'start' });
  }, []);

  const stop = useCallback(() => lenisRef.current?.stop(), []);
  const start = useCallback(() => lenisRef.current?.start(), []);

  return (
    <ScrollContext.Provider value={{ scrollTo, stop, start, lenisRef }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useSmoothScroll() {
  return useContext(ScrollContext);
}

export function useScrollLock(locked) {
  const { stop, start } = useSmoothScroll();

  useEffect(() => {
    if (!locked) return undefined;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    stop();
    return () => {
      document.documentElement.style.overflow = previousOverflow;
      start();
    };
  }, [locked, start, stop]);
}
