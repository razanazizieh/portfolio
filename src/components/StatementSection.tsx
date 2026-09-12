/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, memo } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { MOTION_CURVE_PREMIUM, REVEAL_VIEWPORT_CONFIG } from '../utils/motion';

export interface StatementSectionProps {
  className?: string;
}

export const StatementSection = memo<StatementSectionProps>(function StatementSection({
  className = '',
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Continuous spatial release as user progresses toward Contact
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Release presence gracefully on exit (does not affect entrance)
  const exitOpacity = useTransform(scrollYProgress, [0.55, 0.85], [1, 0.45]);
  const exitY = useTransform(scrollYProgress, [0.55, 0.85], [0, -20]);

  return (
    <div
      ref={sectionRef}
      aria-label="Core Philosophy Statement"
      className={`relative w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col justify-center select-text pt-24 sm:pt-32 md:pt-40 pb-28 sm:pb-40 md:pb-52 overflow-x-hidden ${className}`}
    >
      {/* Primary Statement Typography: Asymmetric Editorial Pause with Individual-Element Reveal */}
      <div
        style={{
          opacity: shouldReduceMotion ? 1 : exitOpacity,
          y: shouldReduceMotion ? 0 : exitY,
        }}
        className="w-full text-left select-text flex flex-col justify-center relative pointer-events-auto will-change-[transform,opacity]"
      >
        {/* Line 1: Primary Grand Display Thought */}
        <div className="overflow-hidden py-1">
          <motion.h2
            initial={
              shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={REVEAL_VIEWPORT_CONFIG}
            transition={{
              duration: shouldReduceMotion ? 0.01 : 0.75,
              ease: MOTION_CURVE_PREMIUM,
              delay: shouldReduceMotion ? 0 : 0.06,
            }}
            className="font-display text-[clamp(2rem,6.2vw,5.5rem)] font-light uppercase leading-[0.96] tracking-tighter text-[var(--text-color)] select-text will-change-[transform,opacity]"
          >
            LOGIC IS NOT JUST HOW CODE RUNS —
          </motion.h2>
        </div>

        {/* Line 2: Asymmetric Offset Resolution Line with tonal & spatial contrast */}
        <div className="overflow-hidden mt-4 sm:mt-5 md:mt-6 py-1">
          <motion.p
            initial={
              shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={REVEAL_VIEWPORT_CONFIG}
            transition={{
              duration: shouldReduceMotion ? 0.01 : 0.75,
              ease: MOTION_CURVE_PREMIUM,
              delay: shouldReduceMotion ? 0 : 0.20,
            }}
            className="font-display text-[clamp(1.45rem,4.4vw,3.85rem)] font-light uppercase leading-[1.04] tracking-tighter text-neutral-500 dark:text-neutral-400 select-text pl-3 sm:pl-8 md:pl-[6vw] lg:pl-[10vw] will-change-[transform,opacity]"
          >
            IT IS HOW THE INTERFACE FEELS
          </motion.p>
        </div>
      </div>

      {/* Quiet Editorial Closing Field: 3 coordinates emerge progressively */}
      <div
        id="focus-index"
        aria-label="Editorial Focus Coordinates"
        className="w-full mt-24 sm:mt-32 md:mt-40 select-text"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-8 lg:gap-x-12 items-start text-left">
          {/* 1. First emerges: FRONT-END ARCHITECTURE */}
          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={REVEAL_VIEWPORT_CONFIG}
            transition={{
              duration: shouldReduceMotion ? 0.01 : 0.72,
              ease: MOTION_CURVE_PREMIUM,
              delay: shouldReduceMotion ? 0 : 0.34,
            }}
            className="col-span-12 md:col-span-4 select-text will-change-[transform,opacity]"
          >
            <h3 className="font-display text-[15px] sm:text-base md:text-xl font-light uppercase tracking-tight text-neutral-900 dark:text-neutral-100 select-text leading-snug">
              FRONT-END ARCHITECTURE
            </h3>
            <p className="font-sans text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-normal leading-relaxed mt-2 max-w-[28ch] select-text">
              Modular structure, clean patterns, and scalable foundations
            </p>
          </motion.div>

          {/* 2. Then the second: INTERACTIVE INTERFACES (Asymmetrically stepped in spatial rhythm) */}
          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={REVEAL_VIEWPORT_CONFIG}
            transition={{
              duration: shouldReduceMotion ? 0.01 : 0.72,
              ease: MOTION_CURVE_PREMIUM,
              delay: shouldReduceMotion ? 0 : 0.46,
            }}
            className="col-span-12 md:col-span-4 md:col-start-5 md:pt-12 lg:pt-16 select-text will-change-[transform,opacity]"
          >
            <h3 className="font-display text-[15px] sm:text-base md:text-xl font-light uppercase tracking-tight text-neutral-900 dark:text-neutral-100 select-text leading-snug">
              INTERACTIVE INTERFACES
            </h3>
            <p className="font-sans text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-normal leading-relaxed mt-2 max-w-[28ch] select-text">
              Purposeful motion, tactile feedback, and responsive nuance
            </p>
          </motion.div>

          {/* 3. Then the third: WEB APPLICATION LOGIC (Subtly anchored right) */}
          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={REVEAL_VIEWPORT_CONFIG}
            transition={{
              duration: shouldReduceMotion ? 0.01 : 0.72,
              ease: MOTION_CURVE_PREMIUM,
              delay: shouldReduceMotion ? 0 : 0.58,
            }}
            className="col-span-12 md:col-span-4 md:col-start-9 md:pt-5 lg:pt-7 select-text will-change-[transform,opacity]"
          >
            <h3 className="font-display text-[15px] sm:text-base md:text-xl font-light uppercase tracking-tight text-neutral-900 dark:text-neutral-100 select-text leading-snug">
              WEB APPLICATION LOGIC
            </h3>
            <p className="font-sans text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-normal leading-relaxed mt-2 max-w-[28ch] select-text">
              Predictable state, robust architecture, and system integrity
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
});

StatementSection.displayName = 'StatementSection';

export default StatementSection;
