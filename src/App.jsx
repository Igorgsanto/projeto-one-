import { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SmoothScroll, useScrollLock } from './components/layout/SmoothScroll';
import Navigation from './components/layout/Navigation';
import Loader from './components/layout/Loader';
import Footer from './components/layout/Footer';
import CustomCursor from './components/ui/CustomCursor';
import ScrollProgress from './components/ui/ScrollProgress';
import Marquee from './components/ui/Marquee';
import Hero from './components/hero/Hero';
import Manifesto from './components/sections/Manifesto';
import Projects from './components/projects/Projects';
import Services from './components/sections/Services';
import Process from './components/sections/Process';
import Testimonials from './components/sections/Testimonials';
import Contact from './components/sections/Contact';
import { useNarrative } from './hooks/useNarrative';

function Experience() {
  const [loading, setLoading] = useState(true);
  const root = useRef(null);
  const background = useRef(null);
  const finishLoading = useCallback(() => setLoading(false), []);
  useScrollLock(loading);
  useNarrative(root, background, !loading);

  useEffect(() => {
    if (loading) return undefined;
    // Font metrics and lazy artwork can affect pinned distances; refresh once they settle.
    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 250);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => window.clearTimeout(timer);
  }, [loading]);

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div ref={background} className="page-background" aria-hidden="true"><div className="ambient-light" /></div>
      <div className="noise" aria-hidden="true" />
      {loading && <Loader onComplete={finishLoading} />}
      <ScrollProgress />
      <CustomCursor />
      <Navigation />
      <main id="conteudo" ref={root} inert={loading} aria-busy={loading}>
        <Hero active={!loading} />
        <Manifesto />
        <Marquee />
        <Projects />
        <Services />
        <Marquee items={['Ideias raras', 'Formas vivas', 'Código com alma']} inverted />
        <Process />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export default function App() {
  return <SmoothScroll><Experience /></SmoothScroll>;
}
