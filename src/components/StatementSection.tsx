import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";

export default function StatementSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll tracking for Scene 4: Kinetic Typographic Machine
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Scene 4 Choreography: Opposing horizontal axes that converge and decompress with scroll
  const line1X = useTransform(
    scrollYProgress,
    [0.1, 0.45, 0.75, 1],
    [shouldReduceMotion ? 0 : -55, 0, 0, shouldReduceMotion ? 0 : 35],
  );
  const line2X = useTransform(
    scrollYProgress,
    [0.1, 0.45, 0.75, 1],
    [shouldReduceMotion ? 0 : 65, 0, 0, shouldReduceMotion ? 0 : -45],
  );
  const line3X = useTransform(
    scrollYProgress,
    [0.1, 0.45, 0.75, 1],
    [shouldReduceMotion ? 0 : -25, 0, 0, shouldReduceMotion ? 0 : 20],
  );

  const statementY = useTransform(
    scrollYProgress,
    [0.1, 0.45, 0.75, 1],
    [shouldReduceMotion ? 0 : 35, 0, 0, shouldReduceMotion ? 0 : -25],
  );

  const statementOpacity = useTransform(
    scrollYProgress,
    [0.08, 0.35, 0.75, 0.98],
    [shouldReduceMotion ? 1 : 0.2, 1, 1, shouldReduceMotion ? 1 : 0.25],
  );

  return (
    <div
      ref={containerRef}
      id="statement"
      aria-label="Statement"
      style={{
        paddingLeft: "max(20px, 4vw)",
        paddingRight: "max(20px, 4vw)",
      }}
      className="relative z-10 w-full select-text py-28 sm:py-36 md:py-48 lg:py-56 scroll-mt-20 md:scroll-mt-24 overflow-visible"
    >
      <div className="w-full relative max-w-7xl mx-auto px-0 sm:px-10 lg:px-16">
        <motion.div
          style={{ y: statementY, opacity: statementOpacity }}
          className="w-full grid grid-cols-1 md:grid-cols-12 gap-y-3 sm:gap-y-4 md:gap-y-5 select-text will-change-transform"
        >
          {/* Line 1: Drifts from Left Axis into Optical Balance */}
          <motion.div
            style={{ x: line1X }}
            className="md:col-span-10 lg:col-span-9 md:col-start-1 will-change-transform"
          >
            <span className="block font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.85rem] xl:text-[3.35rem] font-medium tracking-tight text-neutral-950 dark:text-neutral-50 uppercase leading-[1.12] sm:leading-[1.1] select-text">
              Precision and scale
            </span>
          </motion.div>

          {/* Line 2: Opposing Lateral Drift from Right Axis */}
          <motion.div
            style={{ x: line2X }}
            className="md:col-span-10 lg:col-span-9 md:col-start-2 lg:col-start-3 will-change-transform"
          >
            <span className="block font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.85rem] xl:text-[3.35rem] font-normal tracking-tight text-neutral-600 dark:text-neutral-400 uppercase leading-[1.12] sm:leading-[1.1] select-text">
              define the boundaries of
            </span>
          </motion.div>

          {/* Line 3: Resolves Rightward with Centered Weight */}
          <motion.div
            style={{ x: line3X }}
            className="md:col-span-9 lg:col-span-8 md:col-start-3 lg:col-start-5 will-change-transform"
          >
            <span className="block font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.85rem] xl:text-[3.35rem] font-medium tracking-tight text-neutral-950 dark:text-neutral-100 uppercase leading-[1.12] sm:leading-[1.1] select-text">
              modern digital systems
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
