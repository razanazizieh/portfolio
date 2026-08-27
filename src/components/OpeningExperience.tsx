// /**
//  * @license
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import React, { useState, useEffect } from 'react';
// import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
// import { MOTION_CURVE_PREMIUM } from '../utils/motion';

// interface OpeningExperienceProps {
//   onCtaClick: () => void;
//   key?: string;
//   loading?: boolean;
// }

// export default function OpeningExperience({ onCtaClick, loading = false }: OpeningExperienceProps) {
//   const { scrollY } = useScroll();
//   const shouldReduceMotion = useReducedMotion();

//   const [shouldAnimate, setShouldAnimate] = useState(false);

//   useEffect(() => {
//     if (!loading) {
//       const timer = setTimeout(() => {
//         setShouldAnimate(true);
//       }, 50);
//       return () => clearTimeout(timer);
//     } else {
//       setShouldAnimate(false);
//     }
//   }, [loading]);

//   // Subtle uniform scroll-driven fade out for the hero frame
//   const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

//   // Unified animation config: Brutalist Typography Reveal (with clipping/mask reveal)
//   const typographyReveal = (delay: number) => ({
//     hidden: {
//       opacity: 0,
//       clipPath: "inset(0% 0% 100% 0%)",
//     },
//     visible: {
//       opacity: 1,
//       clipPath: "inset(0% 0% 0% 0%)",
//       transition: {
//         duration: 0.85,
//         ease: [0.16, 1, 0.3, 1],
//         delay
//       }
//     }
//   });

//   // Supporting details config: pure premium opacity progression
//   const opacityReveal = (delay: number) => ({
//     hidden: {
//       opacity: 0,
//     },
//     visible: {
//       opacity: 1,
//       transition: {
//         duration: 0.7,
//         ease: "easeOut",
//         delay
//       }
//     }
//   });

//   return (
//     <motion.div
//       id="html-opening-screen"
//       style={{
//         position: 'relative',
//         zIndex: 1,
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         paddingLeft: 'max(20px, 4vw)',
//         paddingRight: 'max(20px, 4vw)',
//         opacity: heroOpacity,
//       }}
//       className="relative w-full min-h-[calc(100vh-80px)] sm:min-h-screen bg-[var(--bg-color)] font-sans overflow-hidden py-12 sm:py-16 md:py-20 flex flex-col justify-center"
//     >
//       <div className="w-full max-w-7xl mx-auto relative z-20 flex flex-col justify-center my-auto">
//         {/* Unified monolithic architectural block */}
//         <div
//           className="flex flex-col items-start text-left max-w-6xl w-full justify-center"
//         >

//           {/* Hero Name & Subtitle */}
//           <div id="hero-header-identity" className="w-full mb-3 md:mb-4 pl-[4vw] md:pl-[40px]">
//             <div className="overflow-hidden block py-1">
//               <motion.h1
//                 initial={{ y: "100%", opacity: 0 }}
//                 animate={shouldAnimate ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
//                 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
//                 className="typo-display-hero select-text whitespace-nowrap tracking-[0.11em] font-bold text-[var(--text-color)] mb-1 md:mb-1.5"
//               >
//                 RΛZΛN ΛZIZIEH
//               </motion.h1>
//             </div>
//             <div className="overflow-hidden block py-0.5">
//               <motion.div
//                 initial={{ y: "100%", opacity: 0 }}
//                 animate={shouldAnimate ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
//                 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
//                 className="typo-mono-sub select-text whitespace-normal md:whitespace-nowrap text-neutral-500 dark:text-neutral-400 uppercase tracking-widest text-[10px] sm:text-xs md:text-sm font-semibold"
//               >
//                 MSc IN MATHEMATICS & COMPUTER SCIENCE
//               </motion.div>
//             </div>
//           </div>

//           {/* Core Philosophy Statement */}
//           <div className="flex flex-col items-start text-left select-text w-full gap-y-3 mt-0">

//             {/* Line 1 */}
//             <div className="w-full pl-[4vw] md:pl-[120px] lg:pl-[168px] whitespace-normal md:whitespace-nowrap overflow-hidden py-1">
//               <motion.h2
//                 initial={{ y: "100%", opacity: 0 }}
//                 animate={shouldAnimate ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
//                 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
//                 className="typo-display-hero-l1 leading-[1.1] whitespace-normal md:whitespace-nowrap w-full block tracking-tight"
//               >
//                 DIGITAL EXPERIENCES
//               </motion.h2>
//             </div>

//             {/* Line 2 */}
//             <div className="w-full pl-[2vw] md:pl-[64px] lg:pl-[88px] whitespace-normal md:whitespace-nowrap overflow-hidden py-1">
//               <motion.h2
//                 initial={{ y: "100%", opacity: 0 }}
//                 animate={shouldAnimate ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
//                 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
//                 className="typo-display-hero-l2 leading-[1.1] whitespace-normal md:whitespace-nowrap w-full block tracking-tight"
//               >
//                 SHAPED WITH
//               </motion.h2>
//             </div>

//             {/* Line 3 */}
//             <div className="w-full pl-[6vw] md:pl-[150px] lg:pl-[216px] whitespace-normal md:whitespace-nowrap overflow-hidden py-1">
//               <motion.h2
//                 initial={{ y: "100%", opacity: 0 }}
//                 animate={shouldAnimate ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
//                 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
//                 className="typo-display-hero-l3 leading-[1.1] whitespace-normal md:whitespace-nowrap w-full block tracking-tight"
//               >
//                 CAREFUL THINKING
//               </motion.h2>
//             </div>

//             {/* Tagline / Supporting Paragraph */}
//             <div className="w-full mt-6 pl-[4vw] md:pl-[40px] text-left select-text overflow-hidden py-1">
//               <motion.p
//                 initial={{ y: "100%", opacity: 0 }}
//                 animate={shouldAnimate ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
//                 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.95 }}
//                 className="font-sans text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-normal tracking-normal leading-relaxed max-w-xl select-text"
//               >
//                 Building software that feels as intentional as it functions.
//               </motion.p>
//             </div>

//             {/* Completely Independent Editorial CTA Button (Styled like Contact Links, Bottom-Right Aligned) */}
//             <div className="w-full mt-8 sm:mt-12 flex justify-end items-end pr-0 sm:pr-[2vw] overflow-hidden py-1">
//               <motion.button
//                 initial={{ y: "100%", opacity: 0 }}
//                 animate={shouldAnimate ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
//                 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
//                 onClick={onCtaClick}
//                 aria-label="Scroll down to contact section"
//                 className="typo-display-sm leading-tight tracking-tight uppercase text-[#666666] hover:text-[var(--text-color)] opacity-40 hover:opacity-100 font-bold transition-opacity duration-200 ease-in-out focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-color)] focus-visible:px-2 rounded-sm select-none cursor-pointer block text-right m-0 p-0 bg-transparent border-0"
//               >
//                 LET'S BUILD TOGETHER
//               </motion.button>
//             </div>

//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

interface OpeningExperienceProps {
  onCtaClick?: () => void;
  loading?: boolean;
}

export default function OpeningExperience({ onCtaClick }: OpeningExperienceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll tracking across the entire hero scene lifecycle
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Scene 1 Kinetic Choreography: Scrolling directly shifts the physical state of the composition
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, shouldReduceMotion ? 1 : 0.96]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, shouldReduceMotion ? 1 : 0.25]);

  // Display Name: Masthead Identity Anchor upward elevation and tracking
  const nameY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -35]);
  const nameTracking = useTransform(
    scrollYProgress,
    [0, 0.85],
    ['0.06em', shouldReduceMotion ? '0.06em' : '0.12em']
  );

  // Metadata Row: Lateral separation on scroll
  const metaLeftX = useTransform(scrollYProgress, [0, 0.8], [0, shouldReduceMotion ? 0 : -20]);
  const metaRightX = useTransform(scrollYProgress, [0, 0.8], [0, shouldReduceMotion ? 0 : 20]);
  const metaOpacity = useTransform(scrollYProgress, [0, 0.65], [1, shouldReduceMotion ? 1 : 0.1]);

  // Editorial Thought (Dominant Expressive Typography): Kinetic opposing glide across lines
  const thoughtLine1X = useTransform(scrollYProgress, [0, 0.9], [0, shouldReduceMotion ? 0 : -25]);
  const thoughtLine2X = useTransform(scrollYProgress, [0, 0.9], [0, shouldReduceMotion ? 0 : 20]);
  const thoughtLine3X = useTransform(scrollYProgress, [0, 0.9], [0, shouldReduceMotion ? 0 : 45]);
  const thoughtOpacity = useTransform(scrollYProgress, [0, 0.85], [1, shouldReduceMotion ? 1 : 0.2]);

  const handleHeroCta = useCallback((e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (onCtaClick) {
      onCtaClick();
      return;
    }
    const target = document.getElementById('contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [onCtaClick]);

  return (
    <section
      ref={sectionRef}
      id="html-opening-screen"
      data-cursor="LET'S TALK"
      aria-label="Editorial Opening"
      onClick={handleHeroCta}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleHeroCta(e);
        }
      }}
      tabIndex={0}
      role="button"
      style={{
        paddingLeft: 'max(20px, 4vw)',
        paddingRight: 'max(20px, 4vw)',
      }}
      className="relative w-full min-h-[82vh] lg:min-h-[88vh] bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300 font-sans flex flex-col justify-between pt-28 sm:pt-36 md:pt-40 lg:pt-48 pb-20 sm:pb-24 md:pb-28 lg:pb-32 overflow-hidden cursor-default focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF4500]"
    >
      {/* Strict Swiss Editorial Grid Canvas with Continuous Spatial Parallax */}
      <motion.div
        style={{ scale: heroScale, y: heroY, opacity: heroOpacity }}
        className="w-full max-w-7xl mx-auto flex flex-col justify-between flex-grow px-0 sm:px-12 lg:px-16 will-change-transform"
      >

        {/* 1. Identity Anchor: Personal Masthead Mark */}
        <motion.div
          style={{ y: nameY }}
          className="w-full select-text will-change-transform"
        >
          <div
            data-cursor="HEY, YOU'RE HERE"
            aria-label="Razan Azizieh"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-full inline-block cursor-default select-text"
          >
            <div className="overflow-hidden block">
              <motion.h1
                style={{ letterSpacing: nameTracking }}
                className="hero-curtain-line hero-curtain-delay-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-display font-semibold uppercase text-neutral-950 dark:text-neutral-50 leading-[0.92] tracking-tight select-text will-change-transform"
              >
                RAZAN AZIZIEH
              </motion.h1>
            </div>
          </div>
        </motion.div>

        {/* 2. Quiet Secondary Colophon: Lateral Axis Separation on Scroll */}
        <motion.div
          style={{ opacity: metaOpacity }}
          className="w-full grid grid-cols-1 sm:grid-cols-12 gap-y-3 sm:gap-4 pt-4 sm:pt-5 md:pt-6 select-text items-start will-change-transform"
        >
          {/* Left Metadata: Drifts Leftward */}
          <motion.div
            style={{ x: metaLeftX }}
            className="sm:col-span-5 md:col-span-5 flex items-center overflow-hidden will-change-transform"
          >
            <div className="overflow-hidden inline-block">
              <span className="hero-curtain-line hero-curtain-delay-1 font-mono text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-medium uppercase tracking-[0.16em] leading-none select-text">
                DIGITAL CRAFT &amp; CODE
              </span>
            </div>
          </motion.div>

          {/* Right Metadata: Drifts Rightward */}
          <motion.div
            style={{ x: metaRightX }}
            className="sm:col-span-7 md:col-span-7 flex items-center sm:justify-end gap-6 sm:gap-8 overflow-hidden will-change-transform"
          >
            <div className="overflow-hidden inline-flex items-center">
              <span className="hero-curtain-line hero-curtain-delay-2 font-mono text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-medium uppercase tracking-[0.16em] leading-none select-text">
                OPEN FOR COLLABORATION
              </span>
            </div>
            <div className="overflow-hidden inline-block">
              <span className="hero-curtain-line hero-curtain-delay-2 font-mono text-[10px] sm:text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.16em] leading-none select-text">
                PORTFOLIO &lsquo;26
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* 3. Dominant Expressive Typographic Statement (Editorial Headline) */}
        <motion.div
          style={{ opacity: thoughtOpacity }}
          className="pt-14 sm:pt-18 md:pt-24 lg:pt-32 pb-2 w-full flex flex-col items-start select-text will-change-transform"
        >
          <div className="w-full max-w-6xl text-left select-text">
            <h2 className="text-[clamp(2.25rem,5.4vw,5.75rem)] font-display tracking-tight uppercase leading-[0.94] select-text">
              <motion.span 
                style={{ x: thoughtLine1X }}
                className="overflow-hidden block text-left will-change-transform"
              >
                <span className="hero-curtain-line hero-curtain-delay-3 block font-medium text-neutral-950 dark:text-neutral-50">
                  SOMEWHERE BETWEEN
                </span>
              </motion.span>

              <motion.span 
                style={{ x: thoughtLine2X }}
                className="overflow-hidden block mt-2 sm:mt-3 md:mt-4 text-left pl-3 sm:pl-10 md:pl-20 lg:pl-28 will-change-transform"
              >
                <span className="hero-curtain-line hero-curtain-delay-4 block font-normal text-neutral-500 dark:text-neutral-400 transition-colors duration-300">
                  AN IDEA AND WHAT IT
                </span>
              </motion.span>

              <motion.span 
                style={{ x: thoughtLine3X }}
                className="overflow-hidden block mt-2 sm:mt-3 md:mt-4 text-left pl-6 sm:pl-20 md:pl-36 lg:pl-56 will-change-transform"
              >
                <span className="hero-curtain-line hero-curtain-delay-4 block font-medium text-neutral-950 dark:text-neutral-50">
                  BECOMES.
                </span>
              </motion.span>
            </h2>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
