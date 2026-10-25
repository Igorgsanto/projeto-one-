import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { contactEmail, navigation, socialLinks } from '../../data/content';
import { useSmoothScroll, useScrollLock } from './SmoothScroll';
import { ArrowUpRight, OrbitMark } from '../ui/Icons';

const menuVariants = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: { clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  exit: { clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] } },
};

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};

const itemVariants = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  exit: { y: '110%', transition: { duration: 0.35 } },
};

const instantVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
  exit: { opacity: 0, transition: { duration: 0 } },
};
const instantListVariants = { hidden: {}, visible: {}, exit: {} };

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const { scrollTo } = useSmoothScroll();
  useScrollLock(open);

  useEffect(() => {
    if (!open) return undefined;
    const previousFocus = document.activeElement;
    const timer = window.setTimeout(() => menuRef.current?.querySelector('a')?.focus(), 400);
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
      if (event.key !== 'Tab') return;
      const focusable = menuRef.current?.querySelectorAll('a, button:not([disabled])');
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
  }, [open]);

  const navigate = (event, href) => {
    event.preventDefault();
    setOpen(false);
    window.setTimeout(() => scrollTo(href), 120);
  };

  return (
    <>
      <header className="site-header">
        <a href="#inicio" className="site-logo" aria-label="NØVA — voltar ao início" onClick={(event) => navigate(event, '#inicio')} data-cursor="interactive">
          <OrbitMark size={30} />
          <span>NØVA<sup>®</sup></span>
        </a>
        <div className="site-header__status"><span className="status-dot" /> Disponível para projetos · Q1/27</div>
        <button ref={toggleRef} className={`menu-toggle ${open ? 'is-open' : ''}`} type="button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="fullscreen-menu" onClick={() => setOpen((value) => !value)} data-cursor="interactive">
          <span>{open ? 'Fechar' : 'Menu'}</span>
          <span className="menu-toggle__icon" aria-hidden="true"><i /><i /></span>
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="fullscreen-menu"
            ref={menuRef}
            className="fullscreen-menu"
            variants={reducedMotion ? instantVariants : menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Menu principal"
          >
            <div className="fullscreen-menu__inner">
              <div className="fullscreen-menu__eyebrow">Navegue pela experiência</div>
              <motion.nav className="fullscreen-menu__nav" variants={reducedMotion ? instantListVariants : listVariants} initial="hidden" animate="visible" exit="exit" aria-label="Navegação principal">
                {navigation.map((item) => (
                  <div className="menu-link-mask" key={item.href}>
                    <motion.a variants={reducedMotion ? instantListVariants : itemVariants} href={item.href} onClick={(event) => navigate(event, item.href)} data-cursor="interactive">
                      <sup>{item.number}</sup><span>{item.label}</span><ArrowUpRight />
                    </motion.a>
                  </div>
                ))}
              </motion.nav>
              <motion.div className="fullscreen-menu__footer" initial={reducedMotion ? false : { opacity: 0 }} animate={reducedMotion ? { opacity: 1 } : { opacity: 1, transition: { delay: 0.65 } }} exit={{ opacity: 0 }}>
                <div><span>Novos projetos</span><a href={`mailto:${contactEmail}`}>{contactEmail}</a></div>
                <div className="fullscreen-menu__socials">
                  {socialLinks.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label}</a>)}
                </div>
                <span>São Paulo · 23°33′S 46°38′W</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
