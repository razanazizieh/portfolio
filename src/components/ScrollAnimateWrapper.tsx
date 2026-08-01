/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { 
  ElementImportance,
  ContentRole,
  motionRoles,
  MOTION_CURVE_PREMIUM,
  VIEWPORT_ONCE_CONFIG
} from '../utils/motion';

interface ScrollAnimateWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
  importance?: ElementImportance;
  role?: ContentRole;
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
  role,
  direction = 'fade',
  once = true,
  threshold = 0.08,
  variant,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Determine variant mapping based on role or fallback
  let selectedVariants;

  if (role && motionRoles[role]) {
    selectedVariants = motionRoles[role](delay, shouldReduceMotion);
  } else if (importance === 'primary') {
    selectedVariants = motionRoles.largeTypography(delay, shouldReduceMotion);
  } else if (importance === 'supporting') {
    selectedVariants = motionRoles.metaLabel(delay);
  } else {
    selectedVariants = motionRoles.supportingText(delay, shouldReduceMotion);
  }

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative w-full overflow-x-hidden ${className}`}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE_CONFIG}
        variants={selectedVariants}
        style={{ transform: "translate3d(0, 0, 0)", willChange: "transform, opacity" }}
      >
        {children}
      </motion.div>
    </div>
  );
};



