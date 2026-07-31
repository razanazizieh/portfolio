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
        height: '100vh',
        minHeight: '100vh',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 'max(20px, 4vw)',
        paddingRight: 'max(20px, 4vw)',
        opacity: heroOpacity,
      }}
      className="relative w-full h-screen min-h-[100vh] bg-[var(--bg-color)] font-sans overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto relative z-20 flex flex-col justify-center h-full">
        {/* Unified monolithic architectural block */}
        <div 
          className="flex flex-col items-start text-left max-w-6xl w-full justify-center translate-y-2 md:translate-y-[5vh]"
        >

          {/* Logo Title and Subtitle */}
          <div id="hero-logo-name" className="branding-container name logo-container w-full mb-6 md:mb-12 pl-[4vw] md:pl-[40px]">
            <motion.h1
              variants={typographyReveal(0.2)}
              initial="hidden"
              animate={shouldAnimate ? "visible" : "hidden"}
              className="typo-display-hero select-text whitespace-nowrap tracking-[0.11em]"
            >
              RΛZΛN ΛZIZIEH
            </motion.h1>

            <motion.div
              variants={opacityReveal(0.45)}
              initial="hidden"
              animate={shouldAnimate ? "visible" : "hidden"}
              className="typo-mono-sub select-text mt-3 whitespace-normal md:whitespace-nowrap text-[var(--text-dim)] uppercase tracking-widest text-[10px] sm:text-xs md:text-sm opacity-100"
            >
              MSc IN MATHEMATICS & COMPUTER SCIENCE
            </motion.div>
          </div>

          {/* Core Philosophy Statement */}
          <div className="flex flex-col items-start text-left select-text w-full gap-y-3 mt-0">

            {/* Line 1 */}
            <div className="w-full pl-[4vw] md:pl-[120px] lg:pl-[168px] whitespace-normal md:whitespace-nowrap">
              <motion.h2
                variants={typographyReveal(0.7)}
                initial="hidden"
                animate={shouldAnimate ? "visible" : "hidden"}
                className="typo-display-hero-l1 leading-[1.1] whitespace-normal md:whitespace-nowrap w-full block tracking-tight"
              >
                DIGITAL EXPERIENCES
              </motion.h2>
            </div>

            {/* Line 2 */}
            <div className="w-full pl-[2vw] md:pl-[64px] lg:pl-[88px] whitespace-normal md:whitespace-nowrap">
              <motion.h2
                variants={typographyReveal(0.82)}
                initial="hidden"
                animate={shouldAnimate ? "visible" : "hidden"}
                className="typo-display-hero-l2 leading-[1.1] whitespace-normal md:whitespace-nowrap w-full block tracking-tight"
              >
                SHAPED WITH
              </motion.h2>
            </div>

            {/* Line 3 */}
            <div className="w-full pl-[6vw] md:pl-[150px] lg:pl-[216px] whitespace-normal md:whitespace-nowrap">
              <motion.h2
                variants={typographyReveal(0.94)}
                initial="hidden"
                animate={shouldAnimate ? "visible" : "hidden"}
                className="typo-display-hero-l3 leading-[1.1] whitespace-normal md:whitespace-nowrap w-full block tracking-tight"
              >
                CAREFUL THINKING
              </motion.h2>
            </div>

            {/* Subtle Editorial Descriptor */}
            <div className="w-full mt-4 md:mt-8 max-w-[85vw] sm:max-w-[48vw] text-left select-text pl-[6vw] md:pl-[150px] lg:pl-[216px]">
              <motion.p
                variants={opacityReveal(1.2)}
                initial="hidden"
                animate={shouldAnimate ? "visible" : "hidden"}
                className="typo-body-sm leading-relaxed text-[var(--text-dim)] opacity-100 font-normal"
              >
                Building software that feels as intentional as it functions.
              </motion.p>
            </div>

            {/* Editorial CTA */}
            <div className="pl-[6vw] md:pl-[150px] lg:pl-[216px] mt-6 md:mt-12 flex flex-col items-start gap-4">
              <motion.button
                variants={opacityReveal(1.45)}
                initial="hidden"
                animate={shouldAnimate ? "visible" : "hidden"}
                onClick={onCtaClick}
                aria-label="Scroll down to contact section"
                className="typo-mono-btn text-[var(--text-dim)] hover:text-[var(--text-color)] transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-color)] focus-visible:px-2 focus-visible:py-1 rounded font-semibold select-none min-h-[44px] px-2 py-1 -mx-2 -my-1 cursor-pointer flex items-center gap-1.5 opacity-100"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
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
