// /**
//  * @license
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import React, { useRef, useState, useEffect } from 'react';
// import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
// import { MOTION_CURVE_PREMIUM, motionRoles, VIEWPORT_ONCE_CONFIG } from '../utils/motion';

// function ScrollLitAvailabilityText({ children, className }: { children: React.ReactNode; className?: string }) {
//   const ref = useRef<HTMLParagraphElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start 92%", "start 55%"],
//   });
//   const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1.0]);

//   return (
//     <motion.p
//       ref={ref}
//       style={{ opacity }}
//       className={className}
//     >
//       {children}
//     </motion.p>
//   );
// }

// export default function Contact() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const shouldReduceMotion = useReducedMotion();
//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start end", "end start"]
//   });

//   const [ambientTime, setAmbientTime] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 1024);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   useEffect(() => {
//     if (shouldReduceMotion) return;
//     let frameId: number;
//     const start = Date.now();
//     const update = () => {
//       const elapsed = (Date.now() - start) / 1000;
//       setAmbientTime(elapsed);
//       frameId = requestAnimationFrame(update);
//     };
//     frameId = requestAnimationFrame(update);
//     return () => cancelAnimationFrame(frameId);
//   }, [shouldReduceMotion]);

//   // Editorial scroll-driven micro-fade focusing system
//   const contentScale = useTransform(scrollYProgress, [0.15, 0.42, 0.68, 0.95], [1.0, 1.0, 1.0, 1.0]);
//   const contentOpacity = 1.0;

//   return (
//     <section
//       id="contact"
//       ref={sectionRef}
//       className="bg-[var(--bg-color)] text-[var(--text-color)] relative z-10 flex flex-col justify-between overflow-hidden pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-24 md:pb-32 scroll-mt-20 md:scroll-mt-24"
//       style={{ paddingLeft: "max(20px, 4vw)", paddingRight: "max(20px, 4vw)" }}
//     >
//       <motion.div
//         style={{
//           scale: shouldReduceMotion ? 1 : contentScale,
//           opacity: 1,
//           transformOrigin: "center"
//         }}
//         className="w-full h-full pt-2 pb-6 bg-[var(--bg-color)] overflow-hidden relative flex flex-col justify-between max-w-7xl mx-auto"
//       >

//         {/* Structural Editorial Layout Grid */}
//         <div
//           className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 lg:gap-x-20 gap-y-3 lg:gap-y-20 items-start relative z-10 w-full px-0 sm:px-12 lg:px-16 pt-2 md:pt-4 pb-0"
//         >

//           {/* Left Column: Massive header text "LET'S CONNECT" */}
//           <div className="col-span-1 lg:col-span-6 flex flex-col items-start justify-start text-left">
//             <div className="overflow-hidden block py-1">
//               <motion.h2
//                 initial={{ y: "100%", opacity: 0 }}
//                 whileInView={{ y: 0, opacity: 1 }}
//                 viewport={VIEWPORT_ONCE_CONFIG}
//                 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
//                 className="typo-display-lg select-text flex flex-wrap items-baseline gap-x-4"
//               >
//                 LET'S CONNECT
//               </motion.h2>
//             </div>
//           </div>


//           {/* Right Column: Availability & fully functional pure typography plain text links */}
//           <motion.div className="col-span-1 lg:col-span-6 flex flex-col items-start text-left gap-[15px] lg:pl-6">

//             {/* Context/Availability statement with Scroll Lighting */}
//             <ScrollLitAvailabilityText className="typo-body-regular-dim max-w-xl w-full whitespace-normal break-words">
//               Whether you're starting something new, refining something existing, or simply exchanging ideas, you're welcome to reach out.
//             </ScrollLitAvailabilityText>

//             {/* Typography Social Links list */}
//             <div className="flex flex-col gap-4 lg:gap-2 w-full max-w-lg lg:items-end lg:text-right mt-8 sm:mt-10">
//               {/* GitHub */}
//               <div className="overflow-hidden block py-0.5">
//                 <motion.a
//                   initial={{ y: "100%", opacity: 0 }}
//                   whileInView={{ y: 0, opacity: 1 }}
//                   viewport={VIEWPORT_ONCE_CONFIG}
//                   transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
//                   href="https://github.com/razanazizieh"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label="Open Razan's GitHub profile in a new browser tab"
//                   className="flex justify-start lg:justify-end py-3 lg:py-1.5 touch-manipulation text-[#666666] hover:text-[var(--text-color)] opacity-40 hover:opacity-100 font-bold transition-opacity duration-200 ease-in-out focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-color)] focus-visible:px-2 rounded-sm cursor-pointer select-none"
//                 >
//                   <span className="typo-display-sm leading-tight tracking-tight uppercase inline-block">
//                     GITHUB
//                   </span>
//                 </motion.a>
//               </div>

//               {/* LinkedIn */}
//               <div className="overflow-hidden block py-0.5">
//                 <motion.a
//                   initial={{ y: "100%", opacity: 0 }}
//                   whileInView={{ y: 0, opacity: 1 }}
//                   viewport={VIEWPORT_ONCE_CONFIG}
//                   transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
//                   href="https://www.linkedin.com/in/razan-azizieh"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label="Open Razan's LinkedIn profile in a new browser tab"
//                   className="flex justify-start lg:justify-end py-3 lg:py-1.5 touch-manipulation text-[#666666] hover:text-[var(--text-color)] opacity-40 hover:opacity-100 font-bold transition-opacity duration-200 ease-in-out focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-color)] focus-visible:px-2 rounded-sm cursor-pointer select-none"
//                 >
//                   <span className="typo-display-sm leading-tight tracking-tight uppercase inline-block">
//                     LINKEDIN
//                   </span>
//                 </motion.a>
//               </div>

//               {/* Instagram */}
//               <div className="overflow-hidden block py-0.5">
//                 <motion.a
//                   initial={{ y: "100%", opacity: 0 }}
//                   whileInView={{ y: 0, opacity: 1 }}
//                   viewport={VIEWPORT_ONCE_CONFIG}
//                   transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
//                   href="https://instagram.com/_rraz.a"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label="Open Razan's Instagram profile in a new browser tab"
//                   className="flex justify-start lg:justify-end py-3 lg:py-1.5 touch-manipulation text-[#666666] hover:text-[var(--text-color)] opacity-40 hover:opacity-100 font-bold transition-opacity duration-200 ease-in-out focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-color)] focus-visible:px-2 rounded-sm cursor-pointer select-none"
//                 >
//                   <span className="typo-display-sm leading-tight tracking-tight uppercase inline-block">
//                     INSTAGRAM
//                   </span>
//                 </motion.a>
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         {/* Minimal Swiss footer */}
//         <footer className="pt-16 w-full flex flex-col sm:flex-row justify-between items-start sm:items-center px-8 gap-4">
//           <div className="overflow-hidden block py-0.5">
//             <motion.div
//               initial={{ y: "100%", opacity: 0 }}
//               whileInView={{ y: 0, opacity: 1 }}
//               viewport={VIEWPORT_ONCE_CONFIG}
//               transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
//               className="font-mono text-[10px] tracking-widest uppercase text-neutral-400 dark:text-neutral-600 text-left"
//             >
//               2026 © — ALL RIGHTS RESERVED.
//             </motion.div>
//           </div>
//         </footer>

//       </motion.div>
//     </section>
//   );
// }





/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useIntersectionReveal } from '../hooks/useIntersectionReveal';
import { MOTION_CURVE_PREMIUM, VIEWPORT_EDITORIAL_CONFIG } from '../utils/motion';

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: revealRef, isVisible } = useIntersectionReveal<HTMLElement>({
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px',
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
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = node;
        (revealRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }}
      className={`contact-section ${isVisible ? 'is-visible' : ''} bg-[var(--bg-color)] text-[var(--text-color)] relative z-10 flex flex-col justify-between pt-24 sm:pt-36 md:pt-48 pb-20 sm:pb-28 md:pb-36 scroll-mt-20 md:scroll-mt-24`}
      style={{ paddingLeft: "max(20px, 4vw)", paddingRight: "max(20px, 4vw)" }}
    >
      <div className="w-full h-full pt-2 pb-6 bg-[var(--bg-color)] relative flex flex-col justify-between max-w-7xl mx-auto">

        {/* Structural Editorial 2-Column Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 lg:gap-16 items-start relative z-10 w-full px-0 sm:px-12 lg:px-16 pt-2 md:pt-4 pb-0">

          {/* Left Column: Micro-label, Heading & Concise Human Context */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_EDITORIAL_CONFIG}
            className="md:col-span-7 lg:col-span-7 flex flex-col items-start justify-start text-left gap-4 will-change-transform"
          >
            <motion.div variants={itemFadeUpVariants} className="overflow-hidden">
              <span className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400 font-medium tracking-[0.14em] leading-[1.2] uppercase block mb-3">
               CONTACT
              </span>
            </motion.div>

            <motion.div variants={itemFadeUpVariants} className="w-full max-w-2xl overflow-hidden">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] tracking-tight uppercase leading-[1.02]">
                <span className="block font-display text-neutral-950 dark:text-neutral-50 font-semibold">
                  LET&apos;S BUILD
                </span>
                <span className="block font-display text-neutral-500 dark:text-neutral-400 font-medium mt-1">
                  SOMETHING TOGETHER.
                </span>
              </h2>
            </motion.div>

            <motion.div variants={itemFadeUpVariants} className="mt-3 overflow-hidden">
              <p className="max-w-md w-full whitespace-normal break-words text-base sm:text-lg font-normal text-neutral-600 dark:text-neutral-400 leading-[1.65]">
                Always open to interesting ideas, thoughtful conversations, and things worth making.
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

              {/* Instagram */}
              <motion.div
                variants={itemFadeUpVariants}
                className="overflow-hidden will-change-transform"
              >
                <a
                  href="https://instagram.com/_rraz.a"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Razan's Instagram profile in a new browser tab"
                  className="flex items-center justify-between md:justify-end py-2 text-neutral-950 dark:text-neutral-50 hover:text-[#FF4500] dark:hover:text-[#FF4500] focus:opacity-60 transition-colors duration-200 ease-out focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 rounded cursor-pointer select-none group"
                >
                  <span className="font-display text-xl sm:text-2xl lg:text-[1.75rem] font-medium leading-tight tracking-tight uppercase inline-block group-hover:translate-x-1 md:group-hover:-translate-x-1 transition-transform duration-300 ease-out">
                    INSTAGRAM
                  </span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Minimal Swiss footer */}
        <footer className="pt-24 sm:pt-32 w-full flex flex-col sm:flex-row justify-between items-start sm:items-center px-0 sm:px-12 lg:px-16 gap-4">
          <div className="w-full flex justify-between items-center text-left">
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-neutral-500 dark:text-neutral-400 text-left">
              &copy; 2026 RAZAN AZIZIEH &mdash; ALL RIGHTS RESERVED
            </div>
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-neutral-400 dark:text-neutral-500 hidden sm:block">
              SYRIA
            </div>
          </div>
        </footer>

      </div>
    </section>
  );
}
