import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

export default function Magnetic({ children, className = '', href, onClick, strength = 0.22, ...props }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 16, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 180, damping: 16, mass: 0.35 });

  const handleMove = (event) => {
    if (reducedMotion || event.pointerType === 'touch') return;
    const bounds = ref.current.getBoundingClientRect();
    x.set((event.clientX - bounds.left - bounds.width / 2) * strength);
    y.set((event.clientY - bounds.top - bounds.height / 2) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const Component = href ? motion.a : motion.button;
  return (
    <Component
      ref={ref}
      href={href}
      onClick={onClick}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onBlur={reset}
      style={{ x: springX, y: springY }}
      className={`magnetic ${className}`}
      data-cursor="interactive"
      {...props}
    >
      {children}
    </Component>
  );
}
