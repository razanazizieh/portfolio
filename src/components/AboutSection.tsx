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


// /**
//  * @license
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import React, { useRef } from 'react';
// import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
// import { MOTION_CURVE_PREMIUM, VIEWPORT_EDITORIAL_CONFIG } from '../utils/motion';

// interface Pillar {
//   id: string;
//   title: string;
//   tagline: string;
//   detail: string;
// }

// const PILLARS: Pillar[] = [
//   {
//     id: 'user-experience',
//     title: 'USER INTUITION',
//     tagline: 'Flow & Cognitive Ergonomics',
//     detail: 'Designing digital journeys that feel instinctive and friction-free, prioritizing human clarity and meaningful feedback at every interaction point.',
//   },
//   {
//     id: 'interface-craft',
//     title: 'INTERFACE CRAFT',
//     tagline: 'Swiss Rigor & Visual Pacing',
//     detail: 'Composing structured web layouts with deliberate spatial tension, refined typographic hierarchy, and purposeful motion physics.',
//   },
//   {
//     id: 'accessibility',
//     title: 'ACCESSIBILITY & A11Y',
//     tagline: 'Universal Usability',
//     detail: 'Adhering to strict web accessibility standards, robust semantic HTML, and full keyboard navigation so experiences remain universally accessible.',
//   },
//   {
//     id: 'systems-logic',
//     title: 'SOFTWARE LOGIC',
//     tagline: 'Engineering & Problem Solving',
//     detail: 'Structuring scalable React and TypeScript codebases while actively exploring Python scripting, data structures, and algorithmic solutions.',
//   },
// ];

// const CAPABILITIES = [
//   {
//     area: 'UI/UX & EXPERIENCE DESIGN',
//     items: [
//       'UX Flow Architecture',
//       'Design Systems & Tokens',
//       'Interactive Prototyping',
//       'Spatial Hierarchy & Layouts',
//       'Accessibility (WCAG AA)',
//     ],
//   },
//   {
//     area: 'FRONT-END DEVELOPMENT',
//     items: [
//       'React & TypeScript Ecosystem',
//       'Tailwind CSS & Motion Physics',
//       'Accessible UI Components',
//       'State Management & Data Flow',
//       'Performance Optimization',
//     ],
//   },
//   {
//     area: 'ENGINEERING & PYTHON STUDIES',
//     items: [
//       'Python Scripting & Automation',
//       'Algorithmic Problem Solving',
//       'Data Structures & Logic',
//       'Git & Collaborative Workflows',
//       'Continuous Technical Studies',
//     ],
//   },
// ];

// export default function AboutSection() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const shouldReduceMotion = useReducedMotion();

//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ['start end', 'end start'],
//   });

//   const headerY = useTransform(
//     scrollYProgress,
//     [0, 0.25, 0.75, 1],
//     [shouldReduceMotion ? 0 : 20, 0, 0, shouldReduceMotion ? 0 : -20]
//   );
//   const headerOpacity = useTransform(
//     scrollYProgress,
//     [0, 0.2, 0.8, 1],
//     [shouldReduceMotion ? 1 : 0.2, 1, 1, shouldReduceMotion ? 1 : 0.2]
//   );

//   const bioY = useTransform(
//     scrollYProgress,
//     [0.05, 0.3, 0.75, 1],
//     [shouldReduceMotion ? 0 : 25, 0, 0, shouldReduceMotion ? 0 : -15]
//   );

//   const containerVariants = {
//     hidden: { opacity: shouldReduceMotion ? 1 : 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: shouldReduceMotion ? 0 : 0.09,
//         delayChildren: shouldReduceMotion ? 0 : 0.05,
//       },
//     },
//   };

//   const itemFadeUpVariants = {
//     hidden: {
//       opacity: shouldReduceMotion ? 1 : 0,
//       y: shouldReduceMotion ? 0 : 28,
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: shouldReduceMotion ? 0.01 : 0.75,
//         ease: MOTION_CURVE_PREMIUM,
//       },
//     },
//   };

//   return (
//     <section
//       ref={sectionRef}
//       id="about"
//       aria-label="About Razan Azizieh"
//       style={{
//         paddingLeft: 'max(20px, 4vw)',
//         paddingRight: 'max(20px, 4vw)',
//       }}
//       className="relative z-20 flex flex-col justify-center py-24 sm:py-32 md:py-40 lg:py-48 scroll-mt-20 md:scroll-mt-24 select-text bg-[var(--bg-color)]"
//     >
//       <div className="w-full relative flex flex-col max-w-7xl mx-auto px-0 sm:px-10 lg:px-16">
        
//         {/* 1. Asymmetrical Headline & Biographical Spread */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={VIEWPORT_EDITORIAL_CONFIG}
//           className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start pb-20 sm:pb-28 md:pb-32"
//         >
//           {/* Top-Left Pinned Minimal Anchor */}
//           <motion.div
//             variants={itemFadeUpVariants}
//             style={{ y: headerY, opacity: headerOpacity }}
//             className="md:col-span-4 lg:col-span-5 flex flex-col items-start text-left select-text md:sticky md:top-28 will-change-transform"
//           >
//             <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400 select-text block mb-3 font-medium">
//               01 &mdash; PERSPECTIVE
//             </span>

//             <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 uppercase leading-[0.95] select-text mb-6 sm:mb-8">
//               ABOUT &amp;
//               <br />
//               PRACTICE
//             </h2>

//             {/* Left Typographic Colophon (Clean typographic contrast, no borders) */}
//             <div className="hidden md:flex flex-col gap-5 pt-4 w-full max-w-[260px]">
//               <div className="flex flex-col">
//                 <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-400 dark:text-neutral-500 mb-1">
//                   DISCIPLINE
//                 </span>
//                 <span className="font-sans text-xs uppercase tracking-[0.06em] text-neutral-900 dark:text-neutral-100 font-medium">
//                   UI/UX Architecture &amp; Digital Craft
//                 </span>
//               </div>
//               <div className="flex flex-col">
//                 <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-400 dark:text-neutral-500 mb-1">
//                   TECHNICAL STACK
//                 </span>
//                 <span className="font-sans text-xs uppercase tracking-[0.06em] text-neutral-900 dark:text-neutral-100 font-medium">
//                   React, TypeScript, Tailwind &amp; Python
//                 </span>
//               </div>
//             </div>
//           </motion.div>

//           {/* Right Half: Expanded Biographical Narrative with Generous Line-heights */}
//           <motion.div
//             style={{ y: bioY }}
//             variants={itemFadeUpVariants}
//             className="md:col-span-8 lg:col-span-7 md:col-start-5 lg:col-start-6 flex flex-col items-start text-left space-y-10 sm:space-y-12 select-text will-change-transform md:pt-2"
//           >
//             {/* Primary Editorial Premise */}
//             <p className="font-sans text-xl sm:text-2xl md:text-3xl lg:text-[2.15rem] font-normal text-neutral-950 dark:text-neutral-100 leading-[1.38] tracking-tight select-text max-w-[54ch]">
//               Building digital experiences where human intuition, disciplined design systems, and software engineering converge.
//             </p>

//             {/* Narrative Blocks (Pure Typographic Hierarchy, No Box Containers) */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 w-full">
//               {/* User Experience & Accessibility */}
//               <div className="flex flex-col gap-2.5 text-left">
//                 <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400 font-medium">
//                   EXPERIENCE &amp; ERGONOMICS
//                 </span>
//                 <p className="font-sans text-sm sm:text-base font-normal text-neutral-700 dark:text-neutral-300 leading-[1.78] select-text">
//                   Crafting web spaces where navigation is instinctive and interaction is effortless. Great interfaces balance cognitive ergonomics, responsive spatial pacing, and universal accessibility (a11y)&mdash;ensuring every screen feels cohesive, clear, and human-centered.
//                 </p>
//               </div>

//               {/* Front-End & Python Engineering */}
//               <div className="flex flex-col gap-2.5 text-left">
//                 <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400 font-medium">
//                   ENGINEERING &amp; ALGORITHMS
//                 </span>
//                 <p className="font-sans text-sm sm:text-base font-normal text-neutral-600 dark:text-neutral-400 leading-[1.78] select-text">
//                   Translating creative visions into production-grade React and TypeScript codebases. Passionate about performant component architectures, state management, and algorithmic problem-solving&mdash;actively expanding technical depth through Python engineering studies.
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>

//         {/* 2. Practice Pillars: Pure Open Typography */}
//         <motion.div
//           initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 35 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={VIEWPORT_EDITORIAL_CONFIG}
//           transition={{ duration: shouldReduceMotion ? 0.01 : 0.8, ease: MOTION_CURVE_PREMIUM }}
//           className="pt-16 sm:pt-24 pb-20 sm:pb-28 will-change-transform"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
            
//             {/* Left Sub-Heading Label */}
//             <div className="md:col-span-4 lg:col-span-5 flex flex-col items-start text-left">
//               <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400 mb-2 font-medium">
//                 PRACTICE
//               </span>
//               <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 uppercase leading-tight mb-3">
//                 HOW I THINK &amp; BUILD
//               </h3>
//               <p className="font-sans text-sm text-neutral-500 dark:text-neutral-400 max-w-[34ch] leading-relaxed hidden md:block">
//                 A holistic approach uniting intuitive user experience, accessibility standards, and versatile software engineering.
//               </p>
//             </div>

//             {/* Right Open Typographic Stack with Stagger */}
//             <motion.div
//               variants={containerVariants}
//               initial="hidden"
//               whileInView="visible"
//               viewport={VIEWPORT_EDITORIAL_CONFIG}
//               className="md:col-span-8 lg:col-span-7 md:col-start-5 lg:col-start-6 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10"
//             >
//               {PILLARS.map((pillar) => (
//                 <motion.div
//                   key={pillar.id}
//                   variants={itemFadeUpVariants}
//                   className="flex flex-col text-left group will-change-transform"
//                 >
//                   <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.14em] uppercase text-neutral-400 dark:text-neutral-500 mb-2 font-medium">
//                     {pillar.tagline}
//                   </span>

//                   <h4 className="font-display text-base sm:text-lg font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 uppercase leading-snug mb-2 group-hover:text-[#FF4500] dark:group-hover:text-[#FF4500] transition-colors duration-200">
//                     {pillar.title}
//                   </h4>

//                   <p className="font-sans text-xs sm:text-sm font-normal text-neutral-600 dark:text-neutral-400 leading-[1.72]">
//                     {pillar.detail}
//                   </p>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>
//         </motion.div>

//         {/* 3. Capabilities: Open Typographic Ledger */}
//         <motion.div
//           initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 35 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={VIEWPORT_EDITORIAL_CONFIG}
//           transition={{ duration: shouldReduceMotion ? 0.01 : 0.8, ease: MOTION_CURVE_PREMIUM }}
//           className="pt-16 sm:pt-24 will-change-transform"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
            
//             {/* Left Sub-Heading Label */}
//             <div className="md:col-span-4 lg:col-span-5 flex flex-col items-start text-left">
//               <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400 mb-2 font-medium">
//                 DOMAINS
//               </span>
//               <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 uppercase leading-tight mb-3">
//                 CORE CAPABILITIES
//               </h3>
//               <p className="font-sans text-sm text-neutral-500 dark:text-neutral-400 max-w-[34ch] leading-relaxed hidden md:block">
//                 Practices across user research, interface architecture, modern web development, and backend logic exploration.
//               </p>
//             </div>

//             {/* Right Open 3-Column Ledger */}
//             <motion.div
//               variants={containerVariants}
//               initial="hidden"
//               whileInView="visible"
//               viewport={VIEWPORT_EDITORIAL_CONFIG}
//               className="md:col-span-8 lg:col-span-7 md:col-start-5 lg:col-start-6 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-8 text-left"
//             >
//               {CAPABILITIES.map((group) => (
//                 <motion.div
//                   key={group.area}
//                   variants={itemFadeUpVariants}
//                   className="flex flex-col gap-3 will-change-transform"
//                 >
//                   <span className="font-mono text-[11px] uppercase tracking-[0.14em] font-medium text-neutral-950 dark:text-neutral-50 pb-1">
//                     {group.area}
//                   </span>
//                   <div className="flex flex-col gap-2">
//                     {group.items.map((item) => (
//                       <span
//                         key={item}
//                         className="font-sans text-xs sm:text-sm font-normal text-neutral-600 dark:text-neutral-400 leading-normal"
//                       >
//                         {item}
//                       </span>
//                     ))}
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>
//         </motion.div>

//       </div>
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

export default function AboutSection() {
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
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.04,
      },
    },
  };

  const itemFadeUpVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 24,
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
      id="about"
      ref={(node) => {
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = node;
        (revealRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }}
      className={`about-section ${isVisible ? 'is-visible' : ''} bg-[var(--bg-color)] text-[var(--text-color)] relative z-10 flex flex-col justify-between py-24 sm:py-32 md:py-40 lg:py-48 scroll-mt-20 md:scroll-mt-24`}
      style={{ paddingLeft: "max(20px, 4vw)", paddingRight: "max(20px, 4vw)" }}
    >
      <div className="w-full h-full bg-[var(--bg-color)] relative flex flex-col justify-between max-w-7xl mx-auto px-0 sm:px-12 lg:px-16">
        
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_EDITORIAL_CONFIG}
          className="w-full pb-10 sm:pb-14 select-text"
        >
          <motion.span
            variants={itemFadeUpVariants}
            className="font-mono text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400 font-medium tracking-[0.16em] leading-none uppercase block select-text"
          >
            ABOUT
          </motion.span>
        </motion.div>

        {/* Distinctive Asymmetrical Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-16 items-start w-full select-text">
          
          {/* Main Statement */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_EDITORIAL_CONFIG}
            className="lg:col-span-7 flex flex-col items-start text-left select-text"
          >
            <motion.h2
              variants={itemFadeUpVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.75rem] font-display font-semibold tracking-tight uppercase leading-[0.98] text-neutral-950 dark:text-neutral-50 select-text"
            >
              OBSERVING SYSTEMS.
              <span className="block font-normal text-neutral-500 dark:text-neutral-400 mt-2">
                SHAPING INTENTION.
              </span>
            </motion.h2>

            <motion.p
              variants={itemFadeUpVariants}
              className="mt-8 sm:mt-10 text-lg sm:text-xl md:text-2xl text-neutral-900 dark:text-neutral-100 font-normal leading-[1.6] tracking-tight max-w-[34ch] select-text"
            >
              A background in Mathematics and Computer Science formed the way I observe systems: understanding relationships, discovering patterns, and distilling complexity into intuitive, quiet forms.
            </motion.p>
          </motion.div>

          {/* Secondary Thought & Exploration Track */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_EDITORIAL_CONFIG}
            className="lg:col-span-5 flex flex-col items-start lg:pt-4 select-text"
          >
            <motion.p
              variants={itemFadeUpVariants}
              className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal leading-[1.7] max-w-[38ch] select-text"
            >
              Over time, that curiosity has guided what I build and explore. I am drawn to the space between an abstract concept and the experience it creates—bringing craft, restraint, and deliberate engineering to digital tools and interactive software.
            </motion.p>

            <motion.div
              variants={itemFadeUpVariants}
              className="mt-10 sm:mt-12 pt-6 w-full border-t border-neutral-200/50 dark:border-neutral-800/50 flex flex-col gap-2 select-text"
            >
              <span className="font-mono text-[11px] sm:text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.14em]">
                DISCIPLINES &amp; EXPLORATION
              </span>
              <span className="font-mono text-xs sm:text-[13px] text-neutral-800 dark:text-neutral-200 uppercase tracking-[0.1em] leading-relaxed">
                INTERACTION ARCHITECTURE &bull; COMPUTATIONAL LOGIC &bull; EXPERIMENTAL INTERFACES
              </span>
            </motion.div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
