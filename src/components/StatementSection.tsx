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
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll tracking for Scene 4: Kinetic Typographic Machine
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Scene 4 Choreography: Opposing horizontal axes that converge and decompress with scroll
  const line1X = useTransform(
    scrollYProgress,
    [0.1, 0.45, 0.75, 1],
    [shouldReduceMotion ? 0 : -55, 0, 0, shouldReduceMotion ? 0 : 35]
  );
  const line2X = useTransform(
    scrollYProgress,
    [0.1, 0.45, 0.75, 1],
    [shouldReduceMotion ? 0 : 65, 0, 0, shouldReduceMotion ? 0 : -45]
  );
  const line3X = useTransform(
    scrollYProgress,
    [0.1, 0.45, 0.75, 1],
    [shouldReduceMotion ? 0 : -25, 0, 0, shouldReduceMotion ? 0 : 20]
  );

  const statementY = useTransform(
    scrollYProgress,
    [0.1, 0.45, 0.75, 1],
    [shouldReduceMotion ? 0 : 35, 0, 0, shouldReduceMotion ? 0 : -25]
  );

  const statementOpacity = useTransform(
    scrollYProgress,
    [0.08, 0.35, 0.75, 0.98],
    [shouldReduceMotion ? 1 : 0.2, 1, 1, shouldReduceMotion ? 1 : 0.25]
  );

  return (
    <div
      ref={containerRef}
      id="statement"
      aria-label="Statement"
      style={{
        paddingLeft: 'max(20px, 4vw)',
        paddingRight: 'max(20px, 4vw)',
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
              EVERYTHING THAT CAN BE
            </span>
          </motion.div>

          {/* Line 2: Opposing Lateral Drift from Right Axis */}
          <motion.div
            style={{ x: line2X }}
            className="md:col-span-10 lg:col-span-9 md:col-start-2 lg:col-start-3 will-change-transform"
          >
            <span className="block font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.85rem] xl:text-[3.35rem] font-normal tracking-tight text-neutral-600 dark:text-neutral-400 uppercase leading-[1.12] sm:leading-[1.1] select-text">
              THOUGHT AT ALL CAN BE
            </span>
          </motion.div>

          {/* Line 3: Resolves Rightward with Centered Weight */}
          <motion.div
            style={{ x: line3X }}
            className="md:col-span-9 lg:col-span-8 md:col-start-3 lg:col-start-5 will-change-transform"
          >
            <span className="block font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.85rem] xl:text-[3.35rem] font-medium tracking-tight text-neutral-950 dark:text-neutral-100 uppercase leading-[1.12] sm:leading-[1.1] select-text">
              THOUGHT CLEARLY
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
