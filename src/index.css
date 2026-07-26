/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

interface FloatingThought {
  text: string;
  left: string;
  top: string;
  speed: number;
  opacity: number;
}

const THOUGHTS: FloatingThought[] = [
  { text: "proportional balance", left: "6vw", top: "115vh", speed: 0.18, opacity: 0.08 },
  { text: "the silence of light", left: "75vw", top: "140vh", speed: 0.28, opacity: 0.05 },
  { text: "friction of fluid layouts", left: "12vw", top: "180vh", speed: 0.12, opacity: 0.06 },
  { text: "natural gravity", left: "82vw", top: "210vh", speed: 0.35, opacity: 0.09 },
  { text: "geometry as poetic logic", left: "4vw", top: "260vh", speed: 0.15, opacity: 0.07 },
  { text: "lines in dialogue", left: "70vw", top: "290vh", speed: 0.22, opacity: 0.08 },
  { text: "layout is an emotional response", left: "8vw", top: "340vh", speed: 0.14, opacity: 0.05 },
  { text: "harmonic resonance", left: "80vw", top: "370vh", speed: 0.32, opacity: 0.07 },
  { text: "the quietness of mathematics", left: "14vw", top: "420vh", speed: 0.20, opacity: 0.08 },
  { text: "choreographed layers", left: "72vw", top: "460vh", speed: 0.25, opacity: 0.06 },
  { text: "physical memory of touch", left: "8vw", top: "510vh", speed: 0.11, opacity: 0.09 },
  { text: "a curve bends with gravity", left: "78vw", top: "540vh", speed: 0.30, opacity: 0.05 }
];

const ThoughtWord: React.FC<{ thought: FloatingThought; scrollY: any }> = ({ thought, scrollY }) => {
  const shouldReduceMotion = useReducedMotion();
  const y = useTransform(scrollY, (s: number) => shouldReduceMotion ? 0 : -s * thought.speed);
  
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: thought.left,
        top: thought.top,
        y,
        opacity: thought.opacity,
        willChange: 'transform, opacity',
      }}
      className="typo-mono-sub text-[var(--text-dim)] select-none pointer-events-none uppercase whitespace-nowrap z-0"
    >
      {thought.text}
    </motion.div>
  );
};

export default function AmbientMotionGrid() {
  const { scrollY } = useScroll();

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0 bg-transparent">
      {/* 1. Monospace floating thought traces drifting at individual speeds */}
      {THOUGHTS.map((thought, idx) => (
        <ThoughtWord key={`thought-${idx}`} thought={thought} scrollY={scrollY} />
      ))}
    </div>
  );
}
