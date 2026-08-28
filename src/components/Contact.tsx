/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useIntersectionReveal } from "../hooks/useIntersectionReveal";
import {
  MOTION_CURVE_PREMIUM,
  VIEWPORT_EDITORIAL_CONFIG,
} from "../utils/motion";

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: revealRef, isVisible } = useIntersectionReveal<HTMLElement>({
    threshold: 0.15,
    rootMargin: "0px 0px -60px 0px",
  });

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.09,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemFadeUpVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 28,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.75,
        ease: MOTION_CURVE_PREMIUM,
      },
    },
  };

  return (
    <section
      id="contact"
      ref={(node) => {
        // combine refs
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current =
          node;
        (revealRef as React.MutableRefObject<HTMLElement | null>).current =
          node;
      }}
      className={`contact-section ${isVisible ? "is-visible" : ""} bg-[var(--bg-color)] text-[var(--text-color)] relative z-10 flex flex-col justify-between py-24 sm:py-32 md:py-40 lg:py-48 scroll-mt-20 md:scroll-mt-24`}
      style={{ paddingLeft: "max(16px, 4vw)", paddingRight: "max(16px, 4vw)" }}
    >
      <div className="w-full h-full bg-[var(--bg-color)] relative flex flex-col justify-between max-w-7xl mx-auto px-0 sm:px-8 lg:px-12">
        {/* Structural Editorial 2-Column Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 lg:gap-16 items-start relative z-10 w-full pt-2 md:pt-4 pb-0">
          {/* Left Column: Micro-label, Heading & Concise Human Context */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_EDITORIAL_CONFIG}
            className="md:col-span-7 lg:col-span-7 flex flex-col items-start justify-start text-left gap-4 will-change-transform"
          >
            <motion.div
              variants={itemFadeUpVariants}
              className="overflow-hidden"
            >
              <span className="font-mono text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400 font-medium tracking-[0.16em] leading-none uppercase block mb-3 sm:mb-4 select-text">
                CONTACT
              </span>
            </motion.div>

            <motion.div
              variants={itemFadeUpVariants}
              className="w-full max-w-2xl overflow-hidden"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-display font-semibold tracking-tight uppercase leading-[0.98] text-neutral-950 dark:text-neutral-50 select-text">
                LET&apos;S BUILD
                <span className="block font-normal text-neutral-500 dark:text-neutral-400 mt-1">
                  SOMETHING TOGETHER.
                </span>
              </h2>
            </motion.div>

            <motion.div
              variants={itemFadeUpVariants}
              className="mt-3 overflow-hidden"
            >
              <p className="max-w-[44ch] w-full whitespace-normal break-words font-sans text-base sm:text-lg font-normal text-neutral-700 dark:text-neutral-300 leading-[1.65] select-text">
                Always open to interesting ideas, thoughtful conversations, and
                things worth making.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column: Prominent Social Links with Staggered Slide-in */}
          <div className="md:col-span-5 lg:col-span-5 flex flex-col items-start md:items-end text-left md:text-right gap-4 md:pt-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_EDITORIAL_CONFIG}
              className="flex flex-col gap-3 sm:gap-4 w-full max-w-md"
            >
              {/* GitHub */}
              <motion.div
                variants={itemFadeUpVariants}
                className="overflow-hidden will-change-transform"
              >
                <a
                  href="https://github.com/razanazizieh"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Razan's GitHub profile in a new browser tab"
                  className="flex items-center justify-between md:justify-end py-2 text-neutral-950 dark:text-neutral-50 hover:text-[#FF4500] dark:hover:text-[#FF4500] focus:opacity-60 transition-colors duration-200 ease-out focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 rounded cursor-pointer select-none group"
                >
                  <span className="font-display text-xl sm:text-2xl lg:text-[1.75rem] font-medium leading-tight tracking-tight uppercase inline-block group-hover:translate-x-1 md:group-hover:-translate-x-1 transition-transform duration-300 ease-out">
                    GITHUB
                  </span>
                </a>
              </motion.div>

              {/* LinkedIn */}
              <motion.div
                variants={itemFadeUpVariants}
                className="overflow-hidden will-change-transform"
              >
                <a
                  href="https://www.linkedin.com/in/razan-azizieh"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Razan's LinkedIn profile in a new browser tab"
                  className="flex items-center justify-between md:justify-end py-2 text-neutral-950 dark:text-neutral-50 hover:text-[#FF4500] dark:hover:text-[#FF4500] focus:opacity-60 transition-colors duration-200 ease-out focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 rounded cursor-pointer select-none group"
                >
                  <span className="font-display text-xl sm:text-2xl lg:text-[1.75rem] font-medium leading-tight tracking-tight uppercase inline-block group-hover:translate-x-1 md:group-hover:-translate-x-1 transition-transform duration-300 ease-out">
                    LINKEDIN
                  </span>
                </a>
              </motion.div>

              {/* Email */}
              <motion.div
                variants={itemFadeUpVariants}
                className="overflow-hidden will-change-transform"
              >
                <a
                  href="mailto:razan_az@outlook.com"
                  aria-label="Send email to razan_az@outlook.com"
                  className="flex items-center justify-between md:justify-end py-2 text-neutral-950 dark:text-neutral-50 hover:text-[#FF4500] dark:hover:text-[#FF4500] focus:opacity-60 transition-colors duration-200 ease-out focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 rounded cursor-pointer select-none group"
                >
                  <span className="font-display text-xl sm:text-2xl lg:text-[1.75rem] font-medium leading-tight tracking-tight uppercase inline-block group-hover:translate-x-1 md:group-hover:-translate-x-1 transition-transform duration-300 ease-out">
                    EMAIL
                  </span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Minimal Swiss footer */}
        <footer className="pt-24 sm:pt-32 w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="w-full flex justify-between items-center text-left">
            <div className="font-mono text-xs sm:text-[13px] tracking-[0.12em] uppercase text-neutral-500 dark:text-neutral-400 text-left">
              &copy; 2026 RAZAN AZIZIEH &mdash; ALL RIGHTS RESERVED
            </div>
            <div className="font-mono text-xs sm:text-[13px] tracking-[0.12em] uppercase text-neutral-400 dark:text-neutral-500 hidden sm:block">
              SYRIA
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
