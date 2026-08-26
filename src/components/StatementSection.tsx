// /**
//  * @license
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import React, { useEffect, useRef } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// if (typeof window !== 'undefined') {
//   gsap.registerPlugin(ScrollTrigger);
// }

// export default function StatementSection() {
//   const containerRef = useRef<HTMLElement>(null);
//   const charsRef = useRef<(HTMLSpanElement | null)[]>([]);

//   const statementText = 'EVERYTHINGTHATCANBETHOUGHTATALLCANBETHOUGHTCLEARLY.';
//   const characters = React.useMemo(() => statementText.split(''), [statementText]);

//   useEffect(() => {
//     const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
//     const containerEl = containerRef.current;
//     if (!containerEl) return;

//     const validChars = charsRef.current.filter((el): el is HTMLSpanElement => Boolean(el));

//     if (prefersReducedMotion || validChars.length === 0) {
//       if (validChars.length > 0) {
//         gsap.set(validChars, { yPercent: 0, opacity: 1 });
//       }
//       return;
//     }

//     // Set initial masked state
//     gsap.set(validChars, { yPercent: 110, opacity: 0 });

//     const ctx = gsap.context(() => {
//       ScrollTrigger.create({
//         trigger: containerEl,
//         start: 'top 80%',
//         once: true,
//         onEnter: () => {
//           gsap.to(validChars, {
//             yPercent: 0,
//             opacity: 1,
//             duration: 0.8,
//             ease: 'power4.out',
//             stagger: 0.015,
//           });
//         },
//       });
//     }, containerEl);

//     return () => {
//       ctx.revert();
//     };
//   }, []);

//   return (
//     <section
//       ref={containerRef}
//       id="statement"
//       aria-label="Editorial Manifesto Statement"
//       style={{
//         paddingLeft: "max(20px, 4vw)",
//         paddingRight: "max(20px, 4vw)",
//       }}
//       className="bg-[var(--bg-color)] text-[var(--text-color)] relative z-10 w-full select-text my-20 sm:my-28 md:my-36"
//     >
//       <div className="w-full max-w-7xl mx-auto px-0 sm:px-12 lg:px-16">
//         <div className="py-12 sm:py-16 md:py-24 w-full">
          
//           <div className="flex flex-col max-w-5xl">
//             <h2 className="font-sans font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight leading-[1.18] text-[#0D0D0D] dark:text-neutral-50 text-left break-all">
//               {characters.map((char, idx) => (
//                 <span key={`${char}-${idx}`} className="overflow-hidden inline-block leading-[inherit]">
//                   <span
//                     ref={(el) => {
//                       charsRef.current[idx] = el;
//                     }}
//                     className="inline-block will-change-transform"
//                   >
//                     {char}
//                   </span>
//                 </span>
//               ))}
//             </h2>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

export default function StatementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll Progress tracking for World 04: Contemplative Pause & Silence
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Hard clip-path reveal from bottom to top (105% -> 0%) without opacity blur
  const line1Y = useTransform(
    scrollYProgress,
    [0.1, 0.35, 0.72, 0.95],
    [shouldReduceMotion ? '0%' : '105%', '0%', '0%', shouldReduceMotion ? '0%' : '-105%']
  );

  const line2Y = useTransform(
    scrollYProgress,
    [0.18, 0.43, 0.72, 0.95],
    [shouldReduceMotion ? '0%' : '105%', '0%', '0%', shouldReduceMotion ? '0%' : '-105%']
  );

  const line3Y = useTransform(
    scrollYProgress,
    [0.26, 0.51, 0.72, 0.95],
    [shouldReduceMotion ? '0%' : '105%', '0%', '0%', shouldReduceMotion ? '0%' : '-105%']
  );

  return (
    <section
      ref={sectionRef}
      id="statement"
      aria-label="Editorial Statement"
      style={{
        paddingLeft: 'max(20px, 4vw)',
        paddingRight: 'max(20px, 4vw)',
      }}
      className="relative z-10 w-full select-text min-h-[85vh] sm:min-h-screen flex flex-col justify-center my-48 md:my-64 py-24 scroll-mt-20 md:scroll-mt-24"
    >
      <div className="w-full relative flex flex-col max-w-7xl mx-auto px-0 sm:px-10 lg:px-16">
        {/* Asymmetric Typographic Composition — A Contemplative Architectural Pause */}
        <div className="w-full max-w-5xl text-left select-text">
          {/* Index Colophon */}
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400 mb-6 block select-text">
            03 &mdash; CREDO
          </span>

          {/* Line 1 */}
          <div className="overflow-hidden py-1">
            <motion.div
              style={{ y: line1Y }}
              className="will-change-transform"
            >
              <span className="block font-display text-xl sm:text-2xl md:text-3xl lg:text-[2.5rem] font-normal tracking-tight text-neutral-500 dark:text-neutral-400 uppercase leading-[1.1]">
                EVERYTHING THAT CAN BE
              </span>
            </motion.div>
          </div>

          {/* Line 2 */}
          <div className="overflow-hidden py-1 mt-2 sm:mt-3 md:mt-4">
            <motion.div
              style={{ y: line2Y }}
              className="will-change-transform"
            >
              <span className="block font-display text-2xl sm:text-4xl md:text-5xl lg:text-[3.75rem] font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 uppercase leading-[1.02] pl-6 sm:pl-16 md:pl-24 lg:pl-32">
                THOUGHT AT ALL CAN BE
              </span>
            </motion.div>
          </div>

          {/* Line 3 */}
          <div className="overflow-hidden py-1 mt-2 sm:mt-3 md:mt-4">
            <motion.div
              style={{ y: line3Y }}
              className="will-change-transform"
            >
              <span className="block font-display text-3xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 uppercase leading-[0.98]">
                THOUGHT CLEARLY.
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}


