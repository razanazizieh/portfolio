import React, { memo, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { MOTION_CURVE_PREMIUM } from '../utils/motion';

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'clip' | 'aperture';

interface ApertureRevealProps {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  as?: 'div' | 'span' | 'section' | 'article' | 'h1' | 'h2' | 'h3' | 'p';
}

export const ApertureReveal = memo<ApertureRevealProps>(({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.65,
  threshold = 0.05,
  once = true,
  as = 'div',
}) => {
  const shouldReduceMotion = useReducedMotion();

  const getYOffset = () => {
    if (shouldReduceMotion) return 0;
    switch (direction) {
      case 'up':
        return 20;
      case 'down':
        return -20;
      default:
        return 16;
    }
  };

  const getXOffset = () => {
    if (shouldReduceMotion) return 0;
    switch (direction) {
      case 'left':
        return 20;
      case 'right':
        return -20;
      default:
        return 0;
    }
  };

  const MotionComponent = motion.create(as);

  return (
    <MotionComponent
      initial={shouldReduceMotion ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: getYOffset(), x: getXOffset() }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount: threshold }}
      transition={{
        duration: shouldReduceMotion ? 0.01 : duration,
        ease: MOTION_CURVE_PREMIUM,
        delay: shouldReduceMotion ? 0 : delay,
      }}
      className={`select-text pointer-events-auto will-change-[transform,opacity] ${className}`}
    >
      {children}
    </MotionComponent>
  );
});

ApertureReveal.displayName = 'ApertureReveal';

interface SplitLineRevealProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  threshold?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
}

export const SplitLineReveal = memo<SplitLineRevealProps>(({
  lines,
  className = '',
  lineClassName = '',
  delay = 0,
  stagger = 0.06,
  threshold = 0.05,
  as = 'div',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const MotionComponent = motion.create(as);

  return (
    <MotionComponent className={`flex flex-col select-text pointer-events-auto ${className}`}>
      {lines.map((line, idx) => (
        <span key={idx} className="block select-text pointer-events-auto">
          <motion.span
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: threshold }}
            transition={{
              duration: shouldReduceMotion ? 0.01 : 0.6,
              ease: MOTION_CURVE_PREMIUM,
              delay: shouldReduceMotion ? 0 : delay + idx * stagger,
            }}
            className={`block select-text pointer-events-auto will-change-[transform,opacity] ${lineClassName}`}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionComponent>
  );
});

SplitLineReveal.displayName = 'SplitLineReveal';
export default ApertureReveal;

