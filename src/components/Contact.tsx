

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { MagneticElement } from './MagneticElement';
import { ScrambleText } from './InteractiveText';
import { MOTION_CURVE_PREMIUM, REVEAL_VIEWPORT_CONFIG } from '../utils/motion';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="contact-section bg-[var(--bg-color)] text-[var(--text-color)] relative z-10 flex flex-col justify-between py-20 sm:py-32 select-text overflow-x-hidden"
    >
      <div className="w-full h-full bg-[var(--bg-color)] relative flex flex-col justify-between max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">

        {/* Structural Editorial 2-Column Layout Grid with Individual-Element Sequence */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 lg:gap-16 items-start relative z-10 w-full pt-2 md:pt-4 pb-0">

          {/* Left Column: Heading & Concise Human Context */}
          <div className="md:col-span-7 lg:col-span-7 flex flex-col items-start justify-start text-left gap-4">
            <div className="w-full">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-display font-light tracking-tighter uppercase leading-[0.98] text-neutral-900 dark:text-white select-text flex flex-col">
                <motion.span
                  initial={
                    shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={REVEAL_VIEWPORT_CONFIG}
                  transition={{
                    duration: shouldReduceMotion ? 0.01 : 0.75,
                    ease: MOTION_CURVE_PREMIUM,
                    delay: shouldReduceMotion ? 0 : 0.06,
                  }}
                  className="inline-block will-change-[transform,opacity]"
                >
                  LET&apos;S BUILD
                </motion.span>
                <motion.span
                  initial={
                    shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={REVEAL_VIEWPORT_CONFIG}
                  transition={{
                    duration: shouldReduceMotion ? 0.01 : 0.75,
                    ease: MOTION_CURVE_PREMIUM,
                    delay: shouldReduceMotion ? 0 : 0.16,
                  }}
                  className="inline-block font-light text-neutral-500 dark:text-neutral-400 mt-1 will-change-[transform,opacity]"
                >
                  SOMETHING TOGETHER.
                </motion.span>
              </h2>
            </div>

            <motion.div
              initial={
                shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={REVEAL_VIEWPORT_CONFIG}
              transition={{
                duration: shouldReduceMotion ? 0.01 : 0.72,
                ease: MOTION_CURVE_PREMIUM,
                delay: shouldReduceMotion ? 0 : 0.26,
              }}
              className="mt-3 w-full will-change-[transform,opacity]"
            >
              <p className="max-w-[44ch] w-full whitespace-normal break-words font-sans text-base sm:text-lg font-light text-neutral-700 dark:text-neutral-300 leading-[1.65] select-text">
                Always open to interesting ideas, thoughtful conversations, and things worth making.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Prominent Social Links with Magnetic Proximity & Scramble Hover */}
          <div className="md:col-span-5 lg:col-span-5 flex flex-col items-start md:items-end text-left md:text-right gap-4 md:pt-4">
            <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-md">
              {/* GitHub */}
              <motion.div
                initial={
                  shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={REVEAL_VIEWPORT_CONFIG}
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.68,
                  ease: MOTION_CURVE_PREMIUM,
                  delay: shouldReduceMotion ? 0 : 0.38,
                }}
                className="w-full will-change-[transform,opacity]"
              >
                <MagneticElement strength={0.25} activeScale={1.02} className="w-full">
                  <a
                    href="https://github.com/razanazizieh"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open Razan's GitHub profile in a new browser tab"
                    className="flex items-center justify-between md:justify-end py-2 text-neutral-900 dark:text-white hover:text-neutral-500 dark:hover:text-neutral-400 focus:opacity-60 transition-colors duration-200 ease-out focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 rounded cursor-pointer select-none group"
                  >
                    <span className="font-display text-xl sm:text-2xl lg:text-[1.75rem] font-light leading-tight tracking-tight uppercase inline-block">
                      <ScrambleText text="GITHUB" as="span" scrambleOnMount={false} scrambleOnHover={true} speed={24} cycles={2} className="inline-block" />
                    </span>
                  </a>
                </MagneticElement>
              </motion.div>

              {/* LinkedIn */}
              <motion.div
                initial={
                  shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={REVEAL_VIEWPORT_CONFIG}
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.68,
                  ease: MOTION_CURVE_PREMIUM,
                  delay: shouldReduceMotion ? 0 : 0.48,
                }}
                className="w-full will-change-[transform,opacity]"
              >
                <MagneticElement strength={0.25} activeScale={1.02} className="w-full">
                  <a
                    href="https://www.linkedin.com/in/razan-azizieh"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open Razan's LinkedIn profile in a new browser tab"
                    className="flex items-center justify-between md:justify-end py-2 text-neutral-900 dark:text-white hover:text-neutral-500 dark:hover:text-neutral-400 focus:opacity-60 transition-colors duration-200 ease-out focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 rounded cursor-pointer select-none group"
                  >
                    <span className="font-display text-xl sm:text-2xl lg:text-[1.75rem] font-light leading-tight tracking-tight uppercase inline-block">
                      <ScrambleText text="LINKEDIN" as="span" scrambleOnMount={false} scrambleOnHover={true} speed={24} cycles={2} className="inline-block" />
                    </span>
                  </a>
                </MagneticElement>
              </motion.div>

              {/* Email */}
              <motion.div
                initial={
                  shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={REVEAL_VIEWPORT_CONFIG}
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.68,
                  ease: MOTION_CURVE_PREMIUM,
                  delay: shouldReduceMotion ? 0 : 0.58,
                }}
                className="w-full will-change-[transform,opacity]"
              >
                <MagneticElement strength={0.25} activeScale={1.02} className="w-full">
                  <a
                    href="mailto:razan_az@outlook.com?subject=Portfolio%20inquiry"
                    aria-label="Send email to razan_az@outlook.com with subject Portfolio inquiry"
                    className="flex items-center justify-between md:justify-end py-2 text-neutral-900 dark:text-white hover:text-neutral-500 dark:hover:text-neutral-400 focus:opacity-60 transition-colors duration-200 ease-out focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 rounded cursor-pointer select-none group"
                  >
                    <span className="font-display text-xl sm:text-2xl lg:text-[1.75rem] font-light leading-tight tracking-tight uppercase inline-block">
                      <ScrambleText text="EMAIL" as="span" scrambleOnMount={false} scrambleOnHover={true} speed={24} cycles={2} className="inline-block" />
                    </span>
                  </a>
                </MagneticElement>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Minimal Swiss footer */}
        <motion.footer
          initial={
            shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL_VIEWPORT_CONFIG}
          transition={{
            duration: shouldReduceMotion ? 0.01 : 0.65,
            ease: MOTION_CURVE_PREMIUM,
            delay: shouldReduceMotion ? 0 : 0.76,
          }}
          data-no-cursor="true"
          className="pt-16 sm:pt-24 md:pt-32 w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 will-change-[transform,opacity]"
        >
          <div className="font-mono text-xs sm:text-[13px] tracking-[0.14em] uppercase text-neutral-500 dark:text-neutral-400 font-normal text-left">
            &copy; 2026 RAZAN AZIZIEH &mdash; ALL RIGHTS RESERVED
          </div>
          <div className="font-mono text-xs sm:text-[13px] tracking-[0.14em] uppercase text-neutral-500 dark:text-neutral-400 font-normal hidden sm:block">
            SYRIA
          </div>
        </motion.footer>

      </div>
    </section>
  );
}

