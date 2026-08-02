/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { MOTION_CURVE_PREMIUM } from '../utils/motion';

interface OpeningExperienceProps {
  onCtaClick: () => void;
  key?: string;
  loading?: boolean;
}

export default function OpeningExperience({ onCtaClick, loading = false }: OpeningExperienceProps) {
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShouldAnimate(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setShouldAnimate(false);
    }
  }, [loading]);

  // Subtle uniform scroll-driven fade out for the hero frame
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Unified animation config: Brutalist Typography Reveal (with clipping/mask reveal)
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

  // Supporting details config: pure premium opacity progression
  const opacityReveal = (delay: number) => ({
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        delay
      }
    }
  });

  return (
    <motion.div
      id="html-opening-screen"
      style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 'max(20px, 4vw)',
        paddingRight: 'max(20px, 4vw)',
        opacity: heroOpacity,
      }}
      className="relative w-full min-h-[calc(100vh-80px)] sm:min-h-screen bg-[var(--bg-color)] font-sans overflow-hidden py-12 sm:py-16 md:py-20 flex flex-col justify-center"
    >
      <div className="w-full max-w-7xl mx-auto relative z-20 flex flex-col justify-center my-auto">
        {/* Unified monolithic architectural block */}
        <div 
          className="flex flex-col items-start text-left max-w-6xl w-full justify-center"
        >

          {/* Hero Name & Subtitle */}
          <div id="hero-header-identity" className="w-full mb-3 md:mb-4 pl-[4vw] md:pl-[40px]">
            <div className="overflow-hidden block py-1">
              <motion.h1
                initial={{ y: "100%", opacity: 0 }}
                animate={shouldAnimate ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="typo-display-hero select-text whitespace-nowrap tracking-[0.11em] font-bold text-[var(--text-color)] mb-1 md:mb-1.5"
              >
                RΛZΛN ΛZIZIEH
              </motion.h1>
            </div>
            <div className="overflow-hidden block py-0.5">
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={shouldAnimate ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
                className="typo-mono-sub select-text whitespace-normal md:whitespace-nowrap text-[var(--text-dim)] uppercase tracking-widest text-[10px] sm:text-xs md:text-sm font-semibold opacity-100"
              >
                MSc IN MATHEMATICS & COMPUTER SCIENCE
              </motion.div>
            </div>
          </div>

          {/* Core Philosophy Statement */}
          <div className="flex flex-col items-start text-left select-text w-full gap-y-3 mt-0">

            {/* Line 1 */}
            <div className="w-full pl-[4vw] md:pl-[120px] lg:pl-[168px] whitespace-normal md:whitespace-nowrap overflow-hidden py-1">
              <motion.h2
                initial={{ y: "100%", opacity: 0 }}
                animate={shouldAnimate ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                className="typo-display-hero-l1 leading-[1.1] whitespace-normal md:whitespace-nowrap w-full block tracking-tight"
              >
                DIGITAL EXPERIENCES
              </motion.h2>
            </div>

            {/* Line 2 */}
            <div className="w-full pl-[2vw] md:pl-[64px] lg:pl-[88px] whitespace-normal md:whitespace-nowrap overflow-hidden py-1">
              <motion.h2
                initial={{ y: "100%", opacity: 0 }}
                animate={shouldAnimate ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
                className="typo-display-hero-l2 leading-[1.1] whitespace-normal md:whitespace-nowrap w-full block tracking-tight"
              >
                SHAPED WITH
              </motion.h2>
            </div>

            {/* Line 3 */}
            <div className="w-full pl-[6vw] md:pl-[150px] lg:pl-[216px] whitespace-normal md:whitespace-nowrap overflow-hidden py-1">
              <motion.h2
                initial={{ y: "100%", opacity: 0 }}
                animate={shouldAnimate ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
                className="typo-display-hero-l3 leading-[1.1] whitespace-normal md:whitespace-nowrap w-full block tracking-tight"
              >
                CAREFUL THINKING
              </motion.h2>
            </div>

            {/* Tagline / Supporting Paragraph */}
            <div className="w-full mt-6 pl-[4vw] md:pl-[40px] text-left select-text overflow-hidden py-1">
              <motion.p
                initial={{ y: "100%", opacity: 0 }}
                animate={shouldAnimate ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.95 }}
                className="font-sans text-sm sm:text-base text-[var(--text-dim)] font-normal tracking-normal leading-relaxed max-w-xl select-text"
              >
                Building software that feels as intentional as it functions.
              </motion.p>
            </div>

            {/* Completely Independent Editorial CTA Button (Styled like Contact Links, Bottom-Right Aligned) */}
            <div className="w-full mt-8 sm:mt-12 flex justify-end items-end pr-0 sm:pr-[2vw] overflow-hidden py-1">
              <motion.button
                initial={{ y: "100%", opacity: 0 }}
                animate={shouldAnimate ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
                onClick={onCtaClick}
                aria-label="Scroll down to contact section"
                className="typo-display-sm leading-tight tracking-tight uppercase text-[#666666] hover:text-[var(--text-color)] opacity-40 hover:opacity-100 font-bold transition-opacity duration-200 ease-in-out focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-color)] focus-visible:px-2 rounded-sm select-none cursor-pointer block text-right m-0 p-0 bg-transparent border-0"
              >
                LET'S BUILD TOGETHER
              </motion.button>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}
