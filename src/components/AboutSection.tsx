/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useIntersectionReveal } from '../hooks/useIntersectionReveal';
import {
  MOTION_CURVE_PREMIUM,
  VIEWPORT_EDITORIAL_CONFIG,
  SECTION_SCROLL_REVEAL_CONTAINER,
  SECTION_SLIDE_UP_VARIANTS,
} from '../utils/motion';

export default function AboutSection() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: revealRef, isVisible } = useIntersectionReveal<HTMLElement>({
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px',
  });

  const containerVariants = SECTION_SCROLL_REVEAL_CONTAINER(0.09, 0.05, shouldReduceMotion);
  const itemFadeUpVariants = SECTION_SLIDE_UP_VARIANTS(36, 0, shouldReduceMotion);

  return (
    <section
      id="about"
      ref={(node) => {
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = node;
        (revealRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }}
      className={`about-section ${isVisible ? 'is-visible' : ''} bg-[var(--bg-color)] text-[var(--text-color)] relative z-10 flex flex-col justify-between py-24 sm:py-32 md:py-40 lg:py-48 scroll-mt-20 md:scroll-mt-24`}
      style={{ paddingLeft: "max(16px, 4vw)", paddingRight: "max(16px, 4vw)" }}
    >
      <div className="w-full h-full bg-[var(--bg-color)] relative flex flex-col justify-between max-w-7xl mx-auto px-0 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_EDITORIAL_CONFIG}
          className="w-full mb-3 sm:mb-4 select-text"
        >
          <motion.span
            variants={itemFadeUpVariants}
            className="font-mono text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400 font-medium tracking-[0.16em] leading-none uppercase block select-text"
          >
            ABOUT
          </motion.span>
        </motion.div>

        {/* Distinctive Asymmetrical Composition with Scroll Reveal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-16 items-start w-full select-text">
          
          {/* Main Statement */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_EDITORIAL_CONFIG}
            className="lg:col-span-7 flex flex-col items-start text-left select-text"
          >
            <motion.h2
              variants={itemFadeUpVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.75rem] font-display font-semibold tracking-tight uppercase leading-[0.98] text-neutral-950 dark:text-neutral-50 select-text"
            >
              OBSERVING SYSTEMS.
              <span className="block font-normal text-neutral-500 dark:text-neutral-400 mt-2">
                SHAPING INTENTION.
              </span>
            </motion.h2>

            <motion.p
              variants={itemFadeUpVariants}
              className="mt-8 sm:mt-10 text-lg sm:text-xl md:text-2xl text-neutral-900 dark:text-neutral-100 font-normal leading-[1.6] tracking-tight max-w-[34ch] select-text"
            >
              A background in Applied Mathematics and Informatics formed the way I observe systems: understanding relationships, discovering patterns, and distilling complexity into rigorous, intuitive software.
            </motion.p>
          </motion.div>

          {/* Secondary Thought & Exploration Track */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_EDITORIAL_CONFIG}
            className="lg:col-span-5 flex flex-col items-start lg:pt-4 select-text"
          >
            <motion.p
              variants={itemFadeUpVariants}
              className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal leading-[1.7] max-w-[38ch] select-text"
            >
              Over time, that curiosity has guided what I build and explore. Focused on Front-End Architecture (React, JavaScript), distributed systems logic, and ongoing engineering in Python—bringing mathematical clarity, restraint, and deliberate engineering to modern digital systems.
            </motion.p>

            <motion.div
              variants={itemFadeUpVariants}
              className="mt-10 sm:mt-12 pt-6 w-full border-t border-neutral-200/50 dark:border-neutral-800/50 flex flex-col gap-2 select-text"
            >
              <span className="font-mono text-[11px] sm:text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.14em]">
                DISCIPLINES &amp; EXPLORATION
              </span>
              <span className="font-mono text-xs sm:text-[13px] text-neutral-800 dark:text-neutral-200 uppercase tracking-[0.1em] leading-relaxed">
                SYSTEMS LOGIC &bull; REACT &amp; JAVASCRIPT ARCHITECTURE &bull; PYTHON &bull; DISTRIBUTED COMPUTING
              </span>
            </motion.div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
