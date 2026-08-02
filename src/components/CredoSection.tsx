/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { VIEWPORT_ONCE_CONFIG } from '../utils/motion';

function StaggeredHeaderLine({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className: string;
  delay?: number;
}) {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 92%", "start 50%"],
  });
  const scrollLightingOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 1.0]);

  return (
    <div ref={lineRef} className="overflow-hidden py-[0.1em] -my-[0.1em] w-full">
      <motion.h2
        className={`${className} select-text whitespace-normal break-words`}
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={VIEWPORT_ONCE_CONFIG}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
          delay,
        }}
        style={{ opacity: scrollLightingOpacity }}
      >
        {text}
      </motion.h2>
    </div>
  );
}

function DriftingWordsParagraph({ text, align }: { text: string; align?: 'left' | 'justify' | 'center' | 'right' }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "start 55%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1.0]);

  let alignClass = "md:whitespace-nowrap";
  if (align === "justify") {
    alignClass = "text-justify md:text-justify md:whitespace-normal max-w-2xl";
  } else if (align === "center") {
    alignClass = "text-center md:whitespace-normal";
  } else if (align === "right") {
    alignClass = "text-right md:whitespace-normal";
  } else if (align === "left") {
    alignClass = "text-left md:whitespace-normal";
  }

  return (
    <div className="overflow-hidden block py-1">
      <motion.p
        ref={ref}
        initial={{ y: 24, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={VIEWPORT_ONCE_CONFIG}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.36 }}
        style={{ opacity }}
        className={`font-sans font-light text-[clamp(1rem,1.2vw,1.125rem)] leading-relaxed select-text text-[var(--text-dim-high)] w-full whitespace-normal break-words ${alignClass}`}
      >
        {text}
      </motion.p>
    </div>
  );
}

export default function CredoSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id="statement"
      style={{
        paddingLeft: "max(20px, 4vw)",
        paddingRight: "max(20px, 4vw)",
      }}
      className="relative w-full bg-[var(--bg-color)] pt-24 pb-24 sm:pt-36 sm:pb-36 lg:pt-48 lg:pb-48 overflow-hidden select-none"
    >
      <div className="w-full max-w-7xl mx-auto text-left">
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-20 items-start relative z-10 w-full px-0 sm:px-12 lg:px-16"
        >
          <div className="col-span-1 lg:col-span-10 flex flex-col gap-0 select-text">
            <StaggeredHeaderLine
              text="STRUCTURE EARNS TRUST"
              className="typo-credo-l1"
              delay={0.0}
            />
            <StaggeredHeaderLine
              text="PRECISION ENABLES CLARITY"
              className="typo-credo-l2 mt-3"
              delay={0.12}
            />
            <StaggeredHeaderLine
              text="EVERY DETAIL HAS A PURPOSE"
              className="typo-credo-l3 mt-3"
              delay={0.24}
            />

            <div className="mt-4 sm:mt-5 max-w-xl">
              <DriftingWordsParagraph
                text="Every project begins differently. The process adapts. Careful thinking remains constant."
                align="left"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

