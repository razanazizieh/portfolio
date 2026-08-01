/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface TransitionOverlayProps {
  step: 0 | 1 | 2 | 3;
  theme: 'dark' | 'light';
}

export default function TransitionOverlay({ step, theme }: TransitionOverlayProps) {
  const shouldReduceMotion = useReducedMotion();

  if (step === 0) return null;

  // Exact background matching to block any layout paint glimpses
  const bgColor = 'var(--bg-color)';

  if (shouldReduceMotion) {
    let opacityValue = 0;
    if (step === 1) opacityValue = 0;
    else if (step === 2) opacityValue = 1;
    else if (step === 3) opacityValue = 0;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: opacityValue }}
        transition={{
          duration: 0.35,
          ease: 'easeInOut',
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000000,
          backgroundColor: bgColor,
        }}
        className="pointer-events-none"
      />
    );
  }

  // Cinematic editorial clipPath step mapping with unit-consistent strings for safe Framer Motion interpolation
  let clipPathValue = 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)';
  if (step === 1) {
    clipPathValue = 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)';
  } else if (step === 2) {
    clipPathValue = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
  } else if (step === 3) {
    clipPathValue = 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)';
  }

  return (
    <motion.div
      initial={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }}
      animate={{ clipPath: clipPathValue }}
      transition={{
        duration: 0.35, // Snappy response time
        ease: [0.16, 1, 0.3, 1], // Perfect editorial speed & slow deceleration curve
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000000,
        backgroundColor: bgColor,
      }}
      className="pointer-events-none"
    />
  );
}
