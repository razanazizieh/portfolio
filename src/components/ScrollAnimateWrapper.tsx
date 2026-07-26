/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { 
  getTransitionByImportance, 
  getOffsetByImportance, 
  ElementImportance,
  MOTION_CURVE_PREMIUM
} from '../utils/motion';

interface ScrollAnimateWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number; // Delay in seconds (e.g. 0.05, 0.15)
  importance?: ElementImportance;
  direction?: 'left' | 'right' | 'up' | 'down' | 'fade' | 'zoom' | 'diagonal-left' | 'diagonal-right' | 'mask';
  once?: boolean;
  threshold?: number;
  customEase?: number[] | string;
  
  // Backward compatibility
  variant?: 'slit' | 'optical-opacity' | 'diagonal-slashed' | 'staggered-disappearance';
}

export const ScrollAnimateWrapper: React.FC<ScrollAnimateWrapperProps> = ({
  children,
  id,
  className = '',
  delay = 0,
  importance = 'secondary',
  direction = 'up',
  once = true, // Force true to prevent scroll-driven exit/re-entrance animations
  threshold = 0.08,
  customEase,
  variant,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Map backward compatibility variants to the refined system
  let finalDirection = (direction || 'up') as 'left' | 'right' | 'up' | 'down' | 'fade' | 'zoom' | 'diagonal-left' | 'diagonal-right' | 'mask';
  let finalImportance = (importance || 'secondary') as ElementImportance;

  if (variant === 'optical-opacity') {
    finalDirection = 'fade';
    finalImportance = 'secondary';
  } else if (variant === 'staggered-disappearance') {
    finalDirection = 'up';
    finalImportance = 'supporting';
  }

  // Obtain standardized transition and offset configurations
  const subtleOffset = getOffsetByImportance(finalImportance);

  // Diverse easing curves based on direction to create natural orchestration contrast
  const getEasingCurve = () => {
    return MOTION_CURVE_PREMIUM;
  };

  const getScrollDuration = (imp: ElementImportance): number => {
    switch (imp) {
      case 'primary':
        return 0.58; // 580ms
      case 'supporting':
        return 0.35; // 350ms
      case 'secondary':
      default:
        return 0.45; // 450ms
    }
  };

  const finalTransition = {
    duration: getScrollDuration(finalImportance),
    ease: MOTION_CURVE_PREMIUM,
    delay,
  };

  const getInitialState = () => {
    if (shouldReduceMotion || isMobile) {
      return { x: 0, y: 0, scale: 1, clipPath: "none" };
    }
    switch (finalDirection) {
      case 'up':
        return { x: 0, y: subtleOffset, scale: 1, clipPath: "none" };
      case 'down':
        return { x: 0, y: -subtleOffset, scale: 1, clipPath: "none" };
      case 'left':
        return { x: subtleOffset, y: 0, scale: 1, clipPath: "none" };
      case 'right':
        return { x: -subtleOffset, y: 0, scale: 1, clipPath: "none" };
      case 'zoom':
        return { x: 0, y: 0, scale: 0.96, clipPath: "none" };
      case 'diagonal-left':
        return { x: subtleOffset, y: subtleOffset, scale: 1, clipPath: "none" };
      case 'diagonal-right':
        return { x: -subtleOffset, y: subtleOffset, scale: 1, clipPath: "none" };
      case 'fade':
      case 'mask':
      default:
        return { x: 0, y: 0, scale: 1, clipPath: "none" };
    }
  };

  const initialState = getInitialState();

  const animateVariants = {
    hidden: {
      opacity: isMobile ? 1 : 0,
      ...initialState,
      scale: initialState.scale,
      transition: {
        duration: getScrollDuration(finalImportance),
        ease: MOTION_CURVE_PREMIUM,
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      clipPath: "none",
      transition: finalTransition,
    },
  };

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative w-full overflow-x-hidden ${className}`}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: threshold }}
        variants={animateVariants}
        style={{ transform: "translate3d(0, 0, 0)", willChange: "transform" }} // Ensure hardware acceleration
      >
        {children}
      </motion.div>
    </div>
  );
};


