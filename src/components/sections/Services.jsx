import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { services } from '../../data/content';
import { RevealHeading, SectionLabel } from '../ui/SectionHeading';
import { Plus } from '../ui/Icons';

export default function Services() {
  const [open, setOpen] = useState(0);
  const reducedMotion = useReducedMotion();

  return (
    <section id="servicos" className="services" data-bg="#100d1b" aria-labelledby="services-title">
      <div className="section-shell">
        <div className="services__intro">
          <SectionLabel number="03">O que fazemos</SectionLabel>
          <RevealHeading id="services-title" lines={['DA IDEIA', 'AO IMPACTO.']} />
          <p data-parallax="25">Pensamento estratégico e execução obsessiva, reunidos em um time enxuto e sênior.</p>
        </div>
        <div className="services__list">
          {services.map((service, index) => {
            const expanded = open === index;
            const panelId = `service-panel-${index}`;
            return (
              <article className={`service ${expanded ? 'is-open' : ''}`} key={service.title}>
                <button
                  type="button"
                  className="service__trigger"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => setOpen(expanded ? -1 : index)}
                  data-cursor="interactive"
                >
                  <span className="service__number">/{service.number}</span>
                  <h3>{service.title}</h3>
                  <motion.span className="service__plus" animate={{ rotate: expanded ? 45 : 0 }} transition={{ duration: reducedMotion ? 0 : 0.4 }}><Plus /></motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      id={panelId}
                      className="service__panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ height: { duration: reducedMotion ? 0 : 0.55, ease: [0.76, 0, 0.24, 1] }, opacity: { duration: reducedMotion ? 0 : 0.35 } }}
                    >
                      <div className="service__panel-inner">
                        <p>{service.description}</p>
                        <ul>{service.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
