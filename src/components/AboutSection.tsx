
import React, { useRef, memo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { MOTION_CURVE_PREMIUM, REVEAL_VIEWPORT_CONFIG } from "../utils/motion";

export const AboutSection = memo(function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-label="About and Perspective"
      className="relative z-10 w-full select-text py-24 sm:py-32 overflow-x-hidden"
    >
      <div className="w-full">
        <article className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 select-text">
          {/* 12-Column Asymmetric Editorial Field */}
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-y-12 sm:gap-y-16 md:gap-y-20 md:gap-x-8 lg:gap-x-12 select-text items-start">
            
            {/* 1. Main Heading appears with independent staggered lines */}
            <div className="col-span-12 md:col-span-11 lg:col-span-10 text-left select-text">
              <h2 className="font-display text-[clamp(1.75rem,6vw,2.35rem)] sm:text-3xl md:text-4xl lg:text-[2.85rem] font-light tracking-tighter uppercase leading-[1.06] text-neutral-900 dark:text-white select-text flex flex-col gap-1 sm:gap-1.5">
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
                  className="block will-change-[transform,opacity]"
                >
                  STUDYING HOW SYSTEMS FORM,
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
                    delay: shouldReduceMotion ? 0 : 0.14,
                  }}
                  className="block will-change-[transform,opacity]"
                >
                  HOW CODE BECOMES AN EXPERIENCE,
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
                    delay: shouldReduceMotion ? 0 : 0.22,
                  }}
                  className="block will-change-[transform,opacity]"
                >
                  AND WHERE CURIOSITY LEADS.
                </motion.span>
              </h2>
            </div>

            {/* 2. First Column Text - Each Paragraph Enters Independently */}
            <div className="col-span-12 md:col-span-7 lg:col-span-6 text-left select-text flex flex-col gap-4">
              <motion.p
                initial={
                  shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={REVEAL_VIEWPORT_CONFIG}
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.72,
                  ease: MOTION_CURVE_PREMIUM,
                  delay: shouldReduceMotion ? 0 : 0.28,
                }}
                className="font-sans text-[15px] sm:text-base md:text-lg lg:text-xl font-normal text-neutral-600 dark:text-neutral-300 leading-[1.72] max-w-[44ch] select-text will-change-[transform,opacity]"
              >
                A background in Mathematics and Computer Science shaped how I
                look at problems—not just as lines of code, but as systems of
                relationships, patterns, and behavior.
              </motion.p>

              <motion.p
                initial={
                  shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={REVEAL_VIEWPORT_CONFIG}
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.72,
                  ease: MOTION_CURVE_PREMIUM,
                  delay: shouldReduceMotion ? 0 : 0.38,
                }}
                className="font-sans text-[15px] sm:text-base md:text-lg lg:text-xl font-normal text-neutral-600 dark:text-neutral-300 leading-[1.72] max-w-[44ch] select-text will-change-[transform,opacity]"
              >
                It begins with understanding things from first principles:
                breaking down complex structures, recognizing patterns, and exploring
                how simple rules give rise to rich, interactive systems.
              </motion.p>
            </div>

            {/* 3. Second Column Text - Each Thought Enters Independently */}
            <div className="col-span-12 md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8 text-left select-text flex flex-col gap-4">
              {/* 3. Second Text Block */}
              <motion.div
                initial={
                  shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={REVEAL_VIEWPORT_CONFIG}
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.72,
                  ease: MOTION_CURVE_PREMIUM,
                  delay: shouldReduceMotion ? 0 : 0.48,
                }}
                className="will-change-[transform,opacity]"
              >
                <p className="font-sans text-[15px] sm:text-base md:text-lg font-normal text-neutral-600 dark:text-neutral-300 leading-[1.72] max-w-[44ch] select-text">
                  The work is guided by curiosity—moving across front-end
                  engineering, creative coding, custom tools, and experimental
                  interfaces.
                </p>
              </motion.div>

              {/* 4. Supporting Content */}
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
                className="will-change-[transform,opacity]"
              >
                <p className="font-sans text-[15px] sm:text-base md:text-lg font-normal text-neutral-600 dark:text-neutral-300 leading-[1.72] max-w-[44ch] select-text">
                  The throughline is quiet rigor, intentional craft, and the patience to understand how something works before
                  deciding how it should look and feel.
                </p>
              </motion.div>
            </div>

          </div>
        </article>
      </div>
    </section>
  );
});

export default AboutSection;
