/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { VIEWPORT_ONCE_CONFIG } from '../utils/motion';

function ScrollLitParagraph({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "start 55%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1.0]);

  return (
    <div className="overflow-hidden block py-1">
      <motion.p
        ref={ref}
        initial={{ y: 24, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={VIEWPORT_ONCE_CONFIG}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ opacity }}
        className={className}
      >
        {children}
      </motion.p>
    </div>
  );
}

export default function AboutSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      style={{
        paddingLeft: "max(20px, 4vw)",
        paddingRight: "max(20px, 4vw)",
      }}
      className="bg-[var(--bg-color)] text-[var(--text-color)] relative z-10 flex flex-col justify-between overflow-hidden pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-28 scroll-mt-20 md:scroll-mt-24"
    >
      <div className="w-full h-full bg-[var(--bg-color)] overflow-hidden relative flex flex-col justify-between max-w-7xl mx-auto px-0 sm:px-12 lg:px-16">
        
        {/* Structural Editorial Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 lg:gap-x-16 gap-y-6 lg:gap-y-16 items-start relative z-10 w-full pt-2 md:pt-4 pb-2">
          
          {/* Left Column: Massive display title "ABOUT" with Line Mask Reveal */}
          <div className="col-span-1 lg:col-span-4 flex flex-col items-start justify-start text-left">
            <div className="overflow-hidden block py-1">
              <motion.h2
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={VIEWPORT_ONCE_CONFIG}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                className="typo-display-lg select-text flex flex-wrap items-baseline gap-x-4"
              >
                ABOUT
              </motion.h2>
            </div>
          </div>

          {/* Right Column: Editorial Body Text Block with Scroll Lighting */}
          <div className="col-span-1 lg:col-span-8 flex flex-col items-start text-left pt-1 md:pt-2 gap-6 sm:gap-8">
            <div className="w-full flex flex-col gap-6">
              <ScrollLitParagraph className="text-xl sm:text-2xl md:text-3xl lg:text-[2rem] font-light text-[var(--text-color)] leading-[1.38] tracking-[-0.015em] select-text">
                Work sits at the intersection of mathematical logic, computational structures, and intentional software systems.
              </ScrollLitParagraph>
              <ScrollLitParagraph className="text-base sm:text-lg md:text-xl font-normal text-[var(--text-dim)] leading-relaxed max-w-3xl select-text">
                Rather than focusing purely on routine execution, the approach prioritizes deep analytical thinking, structural clarity, and rigorous problem-solving.
              </ScrollLitParagraph>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}




