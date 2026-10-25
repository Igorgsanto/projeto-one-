import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export default function CustomCursor() {
  const finePointer = useMediaQuery('(pointer: fine)');
  const reducedMotion = useReducedMotion();
  const [state, setState] = useState({ type: 'default', label: '' });
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 700, damping: 45, mass: 0.25 });
  const springY = useSpring(y, { stiffness: 700, damping: 45, mass: 0.25 });

  useEffect(() => {
    if (!finePointer || reducedMotion) return undefined;
    document.body.classList.add('custom-cursor-enabled');

    const move = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      const target = event.target.closest?.('[data-cursor], a, button');
      if (!target) setState({ type: 'default', label: '' });
      else {
        const type = target.dataset.cursor || 'interactive';
        setState({ type, label: target.dataset.cursorLabel || '' });
      }
    };
    const hide = () => setVisible(false);
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('mouseleave', hide);
    return () => {
      document.body.classList.remove('custom-cursor-enabled');
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('mouseleave', hide);
    };
  }, [finePointer, reducedMotion, x, y]);

  if (!finePointer || reducedMotion) return null;
  const isView = state.type === 'view';

  return (
    <motion.div
      className={`custom-cursor ${isView ? 'custom-cursor--view' : ''}`}
      style={{ x: springX, y: springY }}
      animate={{
        width: isView ? 84 : state.type === 'interactive' ? 52 : 30,
        height: isView ? 84 : state.type === 'interactive' ? 52 : 30,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <span>{state.label}</span>
    </motion.div>
  );
}
