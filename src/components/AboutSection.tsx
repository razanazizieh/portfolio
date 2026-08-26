// /**
//  * @license
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import React, { useRef } from 'react';
// import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
// import { VIEWPORT_ONCE_CONFIG, MOTION_CURVE_PREMIUM } from '../utils/motion';

// export default function AboutSection() {
//   const shouldReduceMotion = useReducedMotion();

//   return (
//     <section
//       id="about"
//       style={{
//         paddingLeft: "max(20px, 4vw)",
//         paddingRight: "max(20px, 4vw)",
//       }}
//       className="bg-[var(--bg-color)] text-[var(--text-color)] relative z-10 flex flex-col justify-between py-20 sm:py-28 md:py-36 scroll-mt-20 md:scroll-mt-24"
//     >
//       <div className="w-full bg-[var(--bg-color)] relative flex flex-col justify-between max-w-7xl mx-auto px-0 sm:px-12 lg:px-16">

//         {/* Asymmetric 2-Column Layout (35% Left Header, 65% Right Content) */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start relative z-10 w-full">

//           {/* Left Column: Header */}
//           <div className="lg:col-span-4 flex flex-col items-start justify-start text-left">
//             <div>
//               <motion.span
//                 initial={{ y: shouldReduceMotion ? 0 : 16, opacity: 0 }}
//                 whileInView={{ y: 0, opacity: 1 }}
//                 viewport={VIEWPORT_ONCE_CONFIG}
//                 transition={{ duration: shouldReduceMotion ? 0.01 : 0.7, ease: MOTION_CURVE_PREMIUM }}
//                 className="font-mono text-[11px] font-semibold tracking-[0.2em] uppercase text-[#525252] dark:text-[#A3A3A3] block mb-3"
//               >
//                 TRAJECTORY &amp; BACKGROUND
//               </motion.span>
//             </div>

//             <div>
//               <motion.h2
//                 initial={{ y: shouldReduceMotion ? 0 : 24, opacity: 0 }}
//                 whileInView={{ y: 0, opacity: 1 }}
//                 viewport={VIEWPORT_ONCE_CONFIG}
//                 transition={{ duration: shouldReduceMotion ? 0.01 : 0.8, ease: MOTION_CURVE_PREMIUM, delay: shouldReduceMotion ? 0 : 0.05 }}
//                 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[#0A0A0A] dark:text-white select-text uppercase leading-none"
//               >
//                 ABOUT
//               </motion.h2>
//             </div>
//           </div>

//           {/* Right Column: Editorial Narrative & Integrated Academic Foundation */}
//           <div className="lg:col-span-8 flex flex-col items-start text-left pt-1 md:pt-2 gap-8 sm:gap-10">
//             {/* Primary Opening Hook */}
//             <motion.p
//               initial={{ y: shouldReduceMotion ? 0 : 24, opacity: 0 }}
//               whileInView={{ y: 0, opacity: 1 }}
//               viewport={VIEWPORT_ONCE_CONFIG}
//               transition={{ duration: shouldReduceMotion ? 0.01 : 0.7, ease: MOTION_CURVE_PREMIUM }}
//               className="text-xl sm:text-2xl md:text-3xl font-light text-[#171717] dark:text-[#E5E5E5] leading-[1.45] tracking-[-0.015em] select-text"
//             >
//               My foundation in Mathematics and Computer Science shapes how I break down complex problems — approaching systems, interfaces, and software with analytical clarity.
//             </motion.p>

//             {/* Path & Open Trajectory */}
//             <motion.p
//               initial={{ y: shouldReduceMotion ? 0 : 20, opacity: 0 }}
//               whileInView={{ y: 0, opacity: 1 }}
//               viewport={VIEWPORT_ONCE_CONFIG}
//               transition={{ duration: shouldReduceMotion ? 0.01 : 0.7, ease: MOTION_CURVE_PREMIUM, delay: shouldReduceMotion ? 0 : 0.08 }}
//               className="text-base sm:text-lg font-light text-[#525252] dark:text-[#D4D4D4] leading-relaxed max-w-2xl select-text"
//             >
//               Moving from formal proofs and algorithms into software gave me an appreciation for structured thinking and clear interaction. Driven by continuous curiosity, I explore the intersection of logic and responsive digital tools — staying open to research, intelligent systems, and evolving technical directions.
//             </motion.p>

//             {/* Integrated Academic Foundation (Education inside ABOUT) */}
//             <motion.div
//               initial={{ y: shouldReduceMotion ? 0 : 20, opacity: 0 }}
//               whileInView={{ y: 0, opacity: 1 }}
//               viewport={VIEWPORT_ONCE_CONFIG}
//               transition={{ duration: shouldReduceMotion ? 0.01 : 0.75, ease: MOTION_CURVE_PREMIUM, delay: shouldReduceMotion ? 0 : 0.14 }}
//               className="w-full flex flex-col gap-2 pt-6 border-t border-black/10 dark:border-white/10"
//             >
//               <div className="flex items-center gap-2">
//                 <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500]" />
//                 <span className="font-mono text-xs tracking-widest uppercase text-[#0A0A0A] dark:text-white font-bold">
//                   MSc · MATHEMATICS &amp; COMPUTER SCIENCE
//                 </span>
//               </div>
//               <p className="text-sm font-light text-[#525252] dark:text-[#A3A3A3] leading-relaxed max-w-xl pl-3.5">
//                 Graduate foundation in discrete structures, algorithmic analysis, and computational modeling — grounding software development, interface systems, and ongoing technical inquiry.
//               </p>
//             </motion.div>
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

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

interface Principle {
  id: string;
  num: string;
  title: string;
  tagline: string;
  detail: string;
}

const PRINCIPLES: Principle[] = [
  {
    id: 'user-experience',
    num: '01',
    title: 'USER EXPERIENCE & FLOW',
    tagline: 'Seamless, intuitive interactions',
    detail: 'Crafting digital journeys that feel natural and effortless, prioritizing user intent and fluid navigation across every touchpoint.',
  },
  {
    id: 'ui-craft',
    num: '02',
    title: 'INTERFACE CRAFT',
    tagline: 'Clean & modern visual structure',
    detail: 'Building polished web layouts with clear visual spatial balance, modern aesthetics, and subtle motion interactions.',
  },
  {
    id: 'accessibility',
    num: '03',
    title: 'ACCESSIBILITY & INCLUSIVITY',
    tagline: 'Web experiences for everyone',
    detail: 'Ensuring web standards, proper contrast, and full keyboard navigation so interfaces remain inclusive and usable for all.',
  },
  {
    id: 'architecture',
    num: '04',
    title: 'FRONT-END ARCHITECTURE',
    tagline: 'Scalable & responsive code',
    detail: 'Developing clean, modular React components built for performance, responsiveness, and long-term maintainability.',
  },
];

const CAPABILITIES = [
  {
    area: 'INTERFACE & EXPERIENCE',
    items: ['UX Flow Architecture', 'Responsive Layouts', 'Interactive Prototypes', 'Component Systems'],
  },
  {
    area: 'FRONT-END DEVELOPMENT',
    items: ['React & JavaScript (ES6+)', 'HTML5 & CSS3 / Tailwind', 'Accessibility (a11y) Standards', 'State & Hook Management'],
  },
  {
    area: 'PRACTICE & WORKFLOW',
    items: ['User-Centric Architecture', 'Git & Version Control', 'Cross-Browser Optimization', 'Clean Code Structure'],
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activePrinciple, setActivePrinciple] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headerY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [shouldReduceMotion ? 0 : 25, 0, 0, shouldReduceMotion ? 0 : -25]
  );
  const headerOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [shouldReduceMotion ? 1 : 0.1, 1, 1, shouldReduceMotion ? 1 : 0.15]
  );

  const bioY = useTransform(
    scrollYProgress,
    [0.05, 0.3, 0.75, 1],
    [shouldReduceMotion ? 0 : 35, 0, 0, shouldReduceMotion ? 0 : -20]
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="About Razan Azizieh"
      style={{
        paddingLeft: 'max(20px, 4vw)',
        paddingRight: 'max(20px, 4vw)',
      }}
      className="relative z-20 flex flex-col justify-center min-h-[90vh] py-36 sm:py-48 md:py-56 lg:py-64 scroll-mt-20 md:scroll-mt-24 select-text bg-[var(--bg-color)] "
    >
      <div className="w-full relative flex flex-col max-w-7xl mx-auto px-0 sm:px-10 lg:px-16">
        
        {/* 1. Asymmetric Anchor & Biographical Hero Spread */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start pb-24 sm:pb-32 md:pb-40 border-b border-[var(--border-color)]">
          
          {/* Top-Left Fixed / Static Label Anchor */}
          <motion.div
            style={{ y: headerY, opacity: headerOpacity }}
            className="md:col-span-4 lg:col-span-5 flex flex-col items-start text-left select-text md:sticky md:top-28 will-change-transform"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400 select-text">
                01 &mdash; PERSPECTIVE
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 uppercase leading-[0.95] select-text mb-6 sm:mb-8">
              ABOUT &amp;
              <br />
              PRACTICE
            </h2>

            {/* Left Spatial Metadata Colophon */}
            <div className="hidden md:flex flex-col gap-3 pt-6 border-t border-[var(--border-color)] w-full max-w-[240px]">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-400 dark:text-neutral-500">
                  CREATIVE FOCUS
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-neutral-900 dark:text-neutral-100 font-medium">
                  UI/UX &amp; INTERFACE ARCHITECTURE
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-400 dark:text-neutral-500">
                  DEVELOPMENT
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-neutral-900 dark:text-neutral-100 font-medium">
                  FRONT-END &amp; REACT
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Half: Biographical Narrative & Large Typographic Premise */}
          <motion.div
            style={{ y: bioY }}
            className="md:col-span-8 lg:col-span-7 md:col-start-5 lg:col-start-6 flex flex-col items-start text-left space-y-10 sm:space-y-12 md:space-y-14 select-text will-change-transform md:pt-2"
          >
            {/* Primary Editorial Premise */}
            <p className="font-sans text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] font-normal text-neutral-950 dark:text-neutral-100 leading-[1.35] tracking-[-0.01em] select-text max-w-[54ch]">
              Building modern web applications—where user clarity, accessibility, and clean front-end architecture come together.
            </p>

            {/* Two-Column Micro Narrative in the Right Half */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 pt-6 border-t border-[var(--border-color)] w-full">
              {/* Pillar 1: User Experience */}
              <div className="flex flex-col gap-3 text-left">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-400 dark:text-neutral-500">
                  [ USER EXPERIENCE ]
                </span>
                <p className="font-sans text-sm sm:text-base font-normal text-neutral-800 dark:text-neutral-200 leading-[1.7] select-text">
                  Focused on crafting web layouts and interaction flows that make digital navigation intuitive, engaging, and memorable for people.
                </p>
              </div>

              {/* Pillar 2: Front-End Craft */}
              <div className="flex flex-col gap-3 text-left">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-400 dark:text-neutral-500">
                  [ FRONT-END CRAFT ]
                </span>
                <p className="font-sans text-sm sm:text-base font-normal text-neutral-600 dark:text-neutral-400 leading-[1.7] select-text">
                  Bringing ideas to life using React and modern CSS, with emphasis on clean component systems, accessibility (a11y), and responsive performance.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 2. Asymmetrical Section: Core Working Disciplines */}
        <div className="pt-20 sm:pt-28 md:pt-32 pb-24 sm:pb-32 border-b border-[var(--border-color)]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
            
            {/* Left Sub-Anchor */}
            <div className="md:col-span-4 lg:col-span-5 flex flex-col items-start text-left">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400 mb-2">
                01.1 &mdash; DISCIPLINES
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 uppercase leading-tight mb-4">
                HOW I THINK &amp; BUILD
              </h3>
              <p className="font-sans text-sm text-neutral-500 dark:text-neutral-400 max-w-[34ch] leading-relaxed hidden md:block">
                A holistic approach combining intuitive user experience, accessibility standards, and robust front-end development.
              </p>
            </div>

            {/* Right Sub-Container: 2x2 Matrix Pushed to Right Columns */}
            <div className="md:col-span-8 lg:col-span-7 md:col-start-5 lg:col-start-6 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {PRINCIPLES.map((principle) => {
                const isHovered = activePrinciple === principle.id;
                return (
                  <div
                    key={principle.id}
                    onMouseEnter={() => setActivePrinciple(principle.id)}
                    onMouseLeave={() => setActivePrinciple(null)}
                    className={`group relative p-6 sm:p-7 flex flex-col justify-between text-left transition-all duration-300 rounded-none border ${
                      isHovered
                        ? 'border-neutral-950 dark:border-neutral-100 bg-neutral-50/50 dark:bg-neutral-900/30'
                        : 'border-[var(--border-color)] bg-transparent'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between font-mono text-xs text-neutral-400 dark:text-neutral-500 mb-5">
                        <span className="tracking-[0.14em]">{principle.num}</span>
                        <span className="text-[10px] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                          DISCIPLINE
                        </span>
                      </div>

                      <h4 className="font-display text-base sm:text-lg font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 uppercase leading-snug mb-1.5">
                        {principle.title}
                      </h4>

                      <p className="font-sans text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4">
                        {principle.tagline}
                      </p>
                    </div>

                    <p className="font-sans text-xs sm:text-sm font-normal text-neutral-600 dark:text-neutral-400 leading-relaxed pt-3 border-t border-[var(--border-color)]">
                      {principle.detail}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. Asymmetrical Section: Domain Ledger & Technical Stack */}
        <div className="pt-20 sm:pt-28 md:pt-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
            
            {/* Left Sub-Anchor */}
            <div className="md:col-span-4 lg:col-span-5 flex flex-col items-start text-left">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400 mb-2">
                01.2 &mdash; DOMAIN LEDGER
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 uppercase leading-tight mb-4">
                CAPABILITIES &amp; TOOLS
              </h3>
              <p className="font-sans text-sm text-neutral-500 dark:text-neutral-400 max-w-[34ch] leading-relaxed hidden md:block">
                Core technical abilities across user experience, interface building, and modern web engineering.
              </p>
            </div>

            {/* Right Sub-Container: 3-column ledger pushed to Right Columns */}
            <div className="md:col-span-8 lg:col-span-7 md:col-start-5 lg:col-start-6 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-8 text-left">
              {CAPABILITIES.map((group) => (
                <div key={group.area} className="flex flex-col gap-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] font-medium text-neutral-950 dark:text-neutral-50 pb-2 border-b border-[var(--border-color)]">
                    {group.area}
                  </span>
                  <ul className="flex flex-col gap-2.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="font-sans text-xs sm:text-sm font-normal text-neutral-700 dark:text-neutral-300"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}