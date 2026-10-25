import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Close } from '../ui/Icons';
import { useScrollLock, useSmoothScroll } from '../layout/SmoothScroll';

export default function ProjectModal({ project, onClose }) {
  const dialog = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollTo } = useSmoothScroll();
  useScrollLock(Boolean(project));

  useEffect(() => {
    if (!project) return undefined;
    const previousFocus = document.activeElement;
    const timer = window.setTimeout(() => dialog.current?.querySelector('button')?.focus(), 100);
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab') return;
      const focusable = dialog.current?.querySelectorAll('a, button:not([disabled])');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('keydown', onKeyDown);
      previousFocus?.focus();
    };
  }, [project, onClose]);

  const goToContact = () => {
    onClose();
    window.setTimeout(() => scrollTo('#contato'), 250);
  };

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          className="project-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.35 }}
          onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
        >
          <motion.article
            ref={dialog}
            className="project-modal__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={reducedMotion ? false : { y: '100%' }}
            animate={{ y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { y: '100%' }}
            transition={{ duration: reducedMotion ? 0 : 0.75, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="project-modal__bar">
              <span>PROJETO / {project.number}</span>
              <button type="button" onClick={onClose} aria-label="Fechar detalhes do projeto" data-cursor="interactive"><span>Fechar</span><Close /></button>
            </div>
            <div className="project-modal__hero">
              <img src={project.image} alt={project.alt} width="1264" height="848" />
            </div>
            <div className="project-modal__content">
              <div>
                <span className="project-modal__eyebrow">{project.category} · {project.year}</span>
                <h2 id="project-modal-title">{project.title}</h2>
                <p className="project-modal__subtitle">{project.subtitle}</p>
              </div>
              <div className="project-modal__description">
                <p>{project.description}</p>
                <ul aria-label="Serviços deste projeto">{project.services.map((service) => <li key={service}>{service}</li>)}</ul>
                <small>Projeto conceitual criado para demonstrar a experiência do estúdio.</small>
              </div>
            </div>
            <div className="project-modal__footer">
              <span>Tem um desafio parecido?</span>
              <button type="button" onClick={goToContact} data-cursor="interactive">Vamos conversar <ArrowRight /></button>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
