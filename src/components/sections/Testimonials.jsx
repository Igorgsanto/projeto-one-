import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useReducedMotion } from 'framer-motion';
import { testimonials } from '../../data/content';
import { RevealHeading, SectionLabel } from '../ui/SectionHeading';
import { ArrowLeft, ArrowRight } from '../ui/Icons';

export default function Testimonials() {
  const viewport = useRef(null);
  const track = useRef(null);
  const x = useMotionValue(0);
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const measure = () => {
      const card = track.current?.children[0];
      if (!card) return;
      const gap = parseFloat(getComputedStyle(track.current).gap) || 0;
      setStep(card.getBoundingClientRect().width + gap);
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (viewport.current) observer.observe(viewport.current);
    return () => observer.disconnect();
  }, []);

  const goTo = (next) => {
    const safeIndex = Math.max(0, Math.min(testimonials.length - 1, next));
    setIndex(safeIndex);
    animate(x, -safeIndex * step, reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 160, damping: 24 });
  };

  const handleDragEnd = (_, info) => {
    if (!step) return;
    // Velocity extends the intended destination, then a spring supplies the inertial snap.
    const projected = x.get() + info.velocity.x * 0.18;
    goTo(Math.round(-projected / step));
  };

  return (
    <section className="testimonials" data-bg="#0e0c15" aria-labelledby="testimonials-title">
      <div className="section-shell">
        <div className="testimonials__header">
          <div><SectionLabel number="05">Sinais recebidos</SectionLabel><RevealHeading id="testimonials-title" lines={['VOZES EM', 'BOA COMPANHIA.']} /></div>
          <div className="testimonials__controls">
            <button type="button" onClick={() => goTo(index - 1)} disabled={index === 0} aria-label="Depoimento anterior" data-cursor="interactive"><ArrowLeft /></button>
            <span><b>{String(index + 1).padStart(2, '0')}</b> / {String(testimonials.length).padStart(2, '0')}</span>
            <button type="button" onClick={() => goTo(index + 1)} disabled={index === testimonials.length - 1} aria-label="Próximo depoimento" data-cursor="interactive"><ArrowRight /></button>
          </div>
        </div>
        <div className="testimonials__viewport" ref={viewport}>
          <motion.div
            ref={track}
            className="testimonials__track"
            style={{ x }}
            drag={reducedMotion ? false : 'x'}
            dragConstraints={{ left: -(testimonials.length - 1) * step, right: 0 }}
            dragElastic={0.08}
            dragMomentum
            onDragEnd={handleDragEnd}
          >
            {testimonials.map((testimonial, itemIndex) => (
              <article className="testimonial" key={testimonial.name} aria-hidden={Math.abs(itemIndex - index) > 1}>
                <span className="testimonial__mark" aria-hidden="true">“</span>
                <blockquote>{testimonial.quote}</blockquote>
                <div className="testimonial__author">
                  <span className="testimonial__avatar" aria-hidden="true">{testimonial.initials}</span>
                  <div><cite>{testimonial.name}</cite><span>{testimonial.role}</span></div>
                </div>
              </article>
            ))}
          </motion.div>
        </div>
        <div className="testimonials__hint"><span>←</span> ARRASTE PARA OUVIR <span>→</span></div>
      </div>
    </section>
  );
}
