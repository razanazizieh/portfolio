/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface DriftingWordsParagraphProps {
  text: string;
  align?: 'left' | 'justify' | 'center' | 'right';
  variants?: any;
}

function StaggeredHeaderLine({
  text,
  className,
  variants
}: {
  text: string;
  className: string;
  variants?: any;
}) {
  return (
    <div className="overflow-hidden py-[0.1em] -my-[0.1em] w-full">
      <motion.h2
        className={`${className} select-text whitespace-normal break-words`}
        variants={variants}
      >
        {text}
      </motion.h2>
    </div>
  );
}

function DriftingWordsParagraph({ text, align, variants }: DriftingWordsParagraphProps) {
  // Determine alignment classes
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
    <motion.div
      variants={variants}
      className="relative mt-0 max-w-none select-text w-full"
      style={{
        willChange: "transform, opacity",
        contain: "layout style",
      }}
    >
      <p className={`font-sans font-light text-[clamp(1rem,1.2vw,1.125rem)] leading-relaxed select-text text-[var(--text-dim-high)] w-full whitespace-normal break-words ${alignClass}`}>
        {text}
      </p>
    </motion.div>
  );
}

export default function CredoSection() {
  const shouldReduceMotion = useReducedMotion();

  const typographyReveal = (delay: number) => ({
    hidden: {
      opacity: 0,
      clipPath: "inset(0% 0% 100% 0%)",
    },
    visible: {
      opacity: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
        delay
      }
    }
  });

  const paragraphVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        delay: 0.55
      }
    }
  };

  return (
    <motion.section
      id="statement"
      style={{
        paddingLeft: "max(20px, 4vw)",
        paddingRight: "max(20px, 4vw)",
      }}
      className="relative w-full bg-[var(--bg-color)] pt-16 pb-16 sm:pt-24 sm:pb-24 lg:pt-32 lg:pb-32 overflow-hidden select-none"
    >
      <div className="w-full max-w-7xl mx-auto text-left">
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-20 items-start relative z-10 w-full px-0 sm:px-12 lg:px-16"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="col-span-1 lg:col-span-10 flex flex-col gap-0 select-text"
          >
            <StaggeredHeaderLine
              text="STRUCTURE EARNS TRUST"
              className="typo-credo-l1"
              variants={typographyReveal(0.0)}
            />
            <StaggeredHeaderLine
              text="PRECISION ENABLES CLARITY"
              className="typo-credo-l2 mt-3"
              variants={typographyReveal(0.15)}
            />
            <StaggeredHeaderLine
              text="EVERY DETAIL HAS A PURPOSE"
              className="typo-credo-l3 mt-3"
              variants={typographyReveal(0.30)}
            />

            <div className="mt-4 sm:mt-5 max-w-xl">
              <DriftingWordsParagraph
                text="Every project begins differently. The process adapts. Careful thinking remains constant."
                align="left"
                variants={paragraphVariants}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
