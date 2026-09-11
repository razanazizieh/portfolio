import React, { useRef, useState, useCallback, memo, ReactNode } from 'react';
import { motion, useReducedMotion, useSpring } from 'motion/react';

interface MagneticElementProps {
  children: ReactNode;
  className?: string;
  strength?: number; // Distance pull multiplier (e.g. 0.35)
  activeScale?: number;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
}

export const MagneticElement = memo<MagneticElementProps>(({
  children,
  className = '',
  strength = 0.3,
  activeScale = 1.0,
  onClick,
  disabled = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { damping: 18, stiffness: 180, mass: 0.2 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion || disabled || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = (e.clientX - centerX) * strength;
      const distanceY = (e.clientY - centerY) * strength;
      x.set(distanceX);
      y.set(distanceY);
    },
    [shouldReduceMotion, disabled, strength, x, y]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        x: shouldReduceMotion ? 0 : x,
        y: shouldReduceMotion ? 0 : y,
      }}
      animate={{
        scale: isHovered && !shouldReduceMotion ? activeScale : 1,
      }}
      transition={{
        scale: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
      }}
      className={`inline-block select-text pointer-events-auto will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
});

MagneticElement.displayName = 'MagneticElement';
export default MagneticElement;
