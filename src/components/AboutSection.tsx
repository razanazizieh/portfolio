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

import React, { useRef, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { PROJECTS_DATA } from '../data';
import { MOTION_CURVE_PREMIUM, VIEWPORT_EDITORIAL_CONFIG } from '../utils/motion';

const NOOP = () => {};

export type EditorialArchetype =
  | 'cinematic-anchor'      // Wide panoramic showcase with offset span (col 2 to 11)
  | 'split-editorial'       // Text-led split with substantial reading block + medium frame
  | 'compact-offset-right'  // Shifted across the canvas (col 5-12) with breathing left gutter
  | 'panoramic-landscape'   // Full-width architectural horizontal layout with split baseline text
  | 'narrative-left'        // Left-anchored intimate narrative column (col 1-7)
  | 'staggered-right';      // Asymmetric right-anchored closing specimen (col 4-12)

interface ProjectItemProps {
  project: typeof PROJECTS_DATA[0];
  onOpen: (project: typeof PROJECTS_DATA[0]) => void;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  archetype: EditorialArchetype;
  isPriority?: boolean;
  index: number;
}

const ProjectItem = React.memo<ProjectItemProps>(({
  project,
  onOpen,
  onHoverStart = NOOP,
  onHoverEnd = NOOP,
  archetype,
  isPriority = false,
  index,
}) => {
  const itemRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });

  // Scroll tracking for frame-level aperture exposure & inner image parallax
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ['start end', 'end start'],
  });

  // Vertical inner image parallax counter-movement
  const imageParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [shouldReduceMotion ? '0%' : '-5%', shouldReduceMotion ? '0%' : '5%']
  );

  // Archetype-specific scroll transformations:
  // 1. Cinematic Anchor: Symmetrical top/bottom aperture opening
  const cinematicClip = useTransform(
    scrollYProgress,
    [0, 0.28],
    [shouldReduceMotion ? 'inset(0% 0% 0% 0%)' : 'inset(9% 0% 9% 0%)', 'inset(0% 0% 0% 0%)']
  );

  // 2. Split Editorial: Bottom-up vertical aperture reveal
  const splitClip = useTransform(
    scrollYProgress,
    [0, 0.3],
    [shouldReduceMotion ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 12% 0%)', 'inset(0% 0% 0% 0%)']
  );
  const splitTextY = useTransform(
    scrollYProgress,
    [0, 0.45],
    [shouldReduceMotion ? 0 : 35, 0]
  );

  // 3. Compact Offset Right: Lateral slide & lift
  const compactClip = useTransform(
    scrollYProgress,
    [0, 0.26],
    [shouldReduceMotion ? 'inset(0% 0% 0% 0%)' : 'inset(6% 0% 6% 0%)', 'inset(0% 0% 0% 0%)']
  );
  const compactX = useTransform(
    scrollYProgress,
    [0, 0.35],
    [shouldReduceMotion ? 0 : 30, 0]
  );

  // 4. Panoramic Landscape: Horizontal de-compression aperture
  const panoramicClip = useTransform(
    scrollYProgress,
    [0, 0.32],
    [shouldReduceMotion ? 'inset(0% 0% 0% 0%)' : 'inset(0% 7% 0% 7%)', 'inset(0% 0% 0% 0%)']
  );

  // 5. Narrative Left: Focal scale zoom
  const narrativeClip = useTransform(
    scrollYProgress,
    [0, 0.25],
    [shouldReduceMotion ? 'inset(0% 0% 0% 0%)' : 'inset(7% 0% 7% 0%)', 'inset(0% 0% 0% 0%)']
  );
  const narrativeScale = useTransform(
    scrollYProgress,
    [0, 0.4],
    [shouldReduceMotion ? 1 : 1.08, 1.0]
  );

  // Subtle Mouse Parallax on Desktop
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseParallax({ x: x * 3.5, y: y * 3.5 });
  }, [shouldReduceMotion]);

  const handleMouseEnter = useCallback(() => {
    onHoverStart();
  }, [onHoverStart]);

  const handleMouseLeave = useCallback(() => {
    setMouseParallax({ x: 0, y: 0 });
    onHoverEnd();
  }, [onHoverEnd]);

  // Common interactive triggering for accessibility & clicks
  const handleTrigger = useCallback(() => {
    onOpen(project);
  }, [onOpen, project]);

  // Render variations tailored by editorial archetype
  const renderContent = () => {
    switch (archetype) {
      // 1. Cinematic Anchor: Wide panoramic canvas with offset column span
      case 'cinematic-anchor':
        return (
          <div className="col-span-12 lg:col-span-11 lg:col-start-2 xl:col-span-10 xl:col-start-2 flex flex-col gap-6 sm:gap-8">
            <motion.div
              style={{ clipPath: cinematicClip }}
              className="relative w-full aspect-[16/9] sm:aspect-[21/10] bg-neutral-100 dark:bg-neutral-900/60 overflow-hidden will-change-transform"
            >
              {project.image && (
                <motion.div
                  style={{
                    y: imageParallaxY,
                    scale: shouldReduceMotion ? 1 : 1.06,
                    transform: `translate3d(${mouseParallax.x}px, ${mouseParallax.y}px, 0)`,
                    transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="w-full h-full"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    loading={isPriority ? 'eager' : 'lazy'}
                    fetchPriority={isPriority ? 'high' : 'auto'}
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              )}

              {/* Contextual interactive corner indicator on hover */}
              <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <span className="inline-block px-2.5 py-1 bg-[#FF4500] text-white font-mono text-[11px] font-medium tracking-[0.1em] uppercase">
                  VIEW
                </span>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start text-left">
              <div className="md:col-span-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] leading-none text-neutral-600 dark:text-neutral-400">
                  <span className="text-neutral-950 dark:text-neutral-50 font-medium">{project.category}</span>
                  <span className="opacity-40">/</span>
                  <span>{project.year}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight leading-[1.05] text-neutral-950 dark:text-neutral-50 uppercase group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors duration-200">
                  {project.title}
                </h3>
              </div>
              <div className="md:col-span-8 flex flex-col justify-between gap-4">
                <p className="font-sans text-base sm:text-lg font-normal text-neutral-700 dark:text-neutral-300 leading-[1.65] max-w-[58ch]">
                  {project.overview}
                </p>
                <div className="flex items-center gap-2 font-mono text-xs tracking-[0.08em] uppercase text-neutral-500 dark:text-neutral-400 group-hover:text-[#FF4500] dark:group-hover:text-[#FF4500] transition-colors duration-200">
                  {/* <span>EXPLORE CASE STUDY</span> */}
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
                </div>
              </div>
            </div>
          </div>
        );

      // 2. Split Editorial: Text-led reading block on left, tall portrait/editorial image on right
      case 'split-editorial':
        return (
          <div className="col-span-12 flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-14 xl:gap-20">
            <motion.div 
              style={{ y: splitTextY }}
              className="w-full lg:w-5/12 flex flex-col justify-between gap-6 order-2 lg:order-1 text-left pt-2 will-change-transform"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] leading-none text-neutral-600 dark:text-neutral-400">
                  <span className="text-neutral-950 dark:text-neutral-50 font-medium">{project.category}</span>
                  <span className="opacity-40">/</span>
                  <span>{project.year}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-[2.5rem] font-medium tracking-tight leading-[1.05] text-neutral-950 dark:text-neutral-50 uppercase group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors duration-200">
                  {project.title}
                </h3>
              </div>

              <p className="font-sans text-base sm:text-lg font-normal text-neutral-700 dark:text-neutral-300 leading-[1.7] max-w-[50ch]">
                {project.overview}
              </p>

              <div className="pt-2 flex items-center gap-2 font-mono text-xs tracking-[0.08em] uppercase text-neutral-500 dark:text-neutral-400 group-hover:text-[#FF4500] dark:group-hover:text-[#FF4500] transition-colors duration-200">
                {/* <span>VIEW CASE STUDY</span> */}
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
              </div>
            </motion.div>

            <motion.div
              style={{ clipPath: splitClip }}
              className="relative w-full lg:w-7/12 aspect-[4/3] sm:aspect-[16/11] bg-neutral-100 dark:bg-neutral-900/60 overflow-hidden order-1 lg:order-2 will-change-transform"
            >
              {project.image && (
                <motion.div
                  style={{
                    y: imageParallaxY,
                    scale: shouldReduceMotion ? 1 : 1.06,
                    transform: `translate3d(${mouseParallax.x}px, ${mouseParallax.y}px, 0)`,
                    transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="w-full h-full"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    loading={isPriority ? 'eager' : 'lazy'}
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              )}

              <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <span className="inline-block px-2.5 py-1 bg-[#FF4500] text-white font-mono text-[11px] font-medium tracking-[0.1em] uppercase">
                  VIEW
                </span>
              </div>
            </motion.div>
          </div>
        );

      // 3. Compact Offset Right: Right-shifted layout leaving deliberate breathing room on left
      case 'compact-offset-right':
        return (
          <motion.div 
            style={{ x: compactX }}
            className="col-span-12 lg:col-span-8 lg:col-start-5 xl:col-span-7 xl:col-start-6 flex flex-col gap-5 sm:gap-6 will-change-transform"
          >
            <motion.div
              style={{ clipPath: compactClip }}
              className="relative w-full aspect-[16/10] bg-neutral-100 dark:bg-neutral-900/60 overflow-hidden will-change-transform"
            >
              {project.image && (
                <motion.div
                  style={{
                    y: imageParallaxY,
                    scale: shouldReduceMotion ? 1 : 1.06,
                    transform: `translate3d(${mouseParallax.x}px, ${mouseParallax.y}px, 0)`,
                    transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="w-full h-full"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              )}

              <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <span className="inline-block px-2.5 py-1 bg-[#FF4500] text-white font-mono text-[11px] font-medium tracking-[0.1em] uppercase">
                  VIEW
                </span>
              </div>
            </motion.div>

            <div className="flex flex-col gap-2.5 text-left">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] leading-none text-neutral-600 dark:text-neutral-400">
                <span className="text-neutral-950 dark:text-neutral-50 font-medium">{project.category}</span>
                <span className="opacity-40">/</span>
                <span>{project.year}</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight leading-[1.05] text-neutral-950 dark:text-neutral-50 uppercase group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors duration-200">
                {project.title}
              </h3>
              <p className="font-sans text-base sm:text-lg font-normal text-neutral-700 dark:text-neutral-300 leading-[1.65] max-w-[52ch]">
                {project.overview}
              </p>
              <div className="pt-1 flex items-center gap-2 font-mono text-xs tracking-[0.08em] uppercase text-neutral-500 dark:text-neutral-400 group-hover:text-[#FF4500] dark:group-hover:text-[#FF4500] transition-colors duration-200">
                {/* <span>VIEW CASE STUDY</span> */}
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
              </div>
            </div>
          </motion.div>
        );

      // 4. Panoramic Landscape: Full-width architectural format with dual-column baseline text
      case 'panoramic-landscape':
        return (
          <div className="col-span-12 xl:col-span-11 xl:col-start-1 flex flex-col gap-6 sm:gap-8">
            <motion.div
              style={{ clipPath: panoramicClip }}
              className="relative w-full aspect-[16/8] sm:aspect-[2/1] bg-neutral-100 dark:bg-neutral-900/60 overflow-hidden will-change-transform"
            >
              {project.image && (
                <motion.div
                  style={{
                    y: imageParallaxY,
                    scale: shouldReduceMotion ? 1 : 1.06,
                    transform: `translate3d(${mouseParallax.x}px, ${mouseParallax.y}px, 0)`,
                    transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="w-full h-full"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              )}

              <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <span className="inline-block px-2.5 py-1 bg-[#FF4500] text-white font-mono text-[11px] font-medium tracking-[0.1em] uppercase">
                  VIEW
                </span>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 items-start text-left">
              <div className="md:col-span-5 flex flex-col gap-2">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] leading-none text-neutral-600 dark:text-neutral-400">
                  <span className="text-neutral-950 dark:text-neutral-50 font-medium">{project.category}</span>
                  <span className="opacity-40">/</span>
                  <span>{project.year}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight leading-[1.05] text-neutral-950 dark:text-neutral-50 uppercase group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors duration-200">
                  {project.title}
                </h3>
              </div>
              <div className="md:col-span-7 flex flex-col justify-between gap-4">
                <p className="font-sans text-base sm:text-lg font-normal text-neutral-700 dark:text-neutral-300 leading-[1.65] max-w-[56ch]">
                  {project.overview}
                </p>
                <div className="flex items-center gap-2 font-mono text-xs tracking-[0.08em] uppercase text-neutral-500 dark:text-neutral-400 group-hover:text-[#FF4500] dark:group-hover:text-[#FF4500] transition-colors duration-200">
                  {/* <span>EXPLORE CASE STUDY</span> */}
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
                </div>
              </div>
            </div>
          </div>
        );

      // 5. Narrative Left: Intimate, focused specimen column on left
      case 'narrative-left':
        return (
          <div className="col-span-12 lg:col-span-7 lg:col-start-1 xl:col-span-6 xl:col-start-1 flex flex-col gap-5 sm:gap-6">
            <motion.div
              style={{ clipPath: narrativeClip }}
              className="relative w-full aspect-[4/3] bg-neutral-100 dark:bg-neutral-900/60 overflow-hidden will-change-transform"
            >
              {project.image && (
                <motion.div
                  style={{
                    y: imageParallaxY,
                    scale: narrativeScale,
                    transform: `translate3d(${mouseParallax.x}px, ${mouseParallax.y}px, 0)`,
                    transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="w-full h-full"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              )}

              <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <span className="inline-block px-2.5 py-1 bg-[#FF4500] text-white font-mono text-[11px] font-medium tracking-[0.1em] uppercase">
                  VIEW
                </span>
              </div>
            </motion.div>

            <div className="flex flex-col gap-2.5 text-left">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] leading-none text-neutral-600 dark:text-neutral-400">
                <span className="text-neutral-950 dark:text-neutral-50 font-medium">{project.category}</span>
                <span className="opacity-40">/</span>
                <span>{project.year}</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight leading-[1.05] text-neutral-950 dark:text-neutral-50 uppercase group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors duration-200">
                {project.title}
              </h3>
              <p className="font-sans text-base sm:text-lg font-normal text-neutral-700 dark:text-neutral-300 leading-[1.65] max-w-[50ch]">
                {project.overview}
              </p>
              <div className="pt-1 flex items-center gap-2 font-mono text-xs tracking-[0.08em] uppercase text-neutral-500 dark:text-neutral-400 group-hover:text-[#FF4500] dark:group-hover:text-[#FF4500] transition-colors duration-200">
                {/* <span>VIEW CASE STUDY</span> */}
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
              </div>
            </div>
          </div>
        );

      // 6. Staggered Right: Decisive closing specimen offset to the right
      case 'staggered-right':
      default:
        return (
          <div className="col-span-12 lg:col-span-9 lg:col-start-4 xl:col-span-8 xl:col-start-5 flex flex-col gap-5 sm:gap-6">
            <motion.div
              style={{ clipPath: compactClip }}
              className="relative w-full aspect-[16/9] bg-neutral-100 dark:bg-neutral-900/60 overflow-hidden will-change-transform"
            >
              {project.image && (
                <motion.div
                  style={{
                    y: imageParallaxY,
                    scale: shouldReduceMotion ? 1 : 1.06,
                    transform: `translate3d(${mouseParallax.x}px, ${mouseParallax.y}px, 0)`,
                    transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="w-full h-full"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              )}

              <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <span className="inline-block px-2.5 py-1 bg-[#FF4500] text-white font-mono text-[11px] font-medium tracking-[0.1em] uppercase">
                  VIEW
                </span>
              </div>
            </motion.div>

            <div className="flex flex-col gap-2.5 text-left">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] leading-none text-neutral-600 dark:text-neutral-400">
                <span className="text-neutral-950 dark:text-neutral-50 font-medium">{project.category}</span>
                <span className="opacity-40">/</span>
                <span>{project.year}</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight leading-[1.05] text-neutral-950 dark:text-neutral-50 uppercase group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors duration-200">
                {project.title}
              </h3>
              <p className="font-sans text-base sm:text-lg font-normal text-neutral-700 dark:text-neutral-300 leading-[1.65] max-w-[54ch]">
                {project.overview}
              </p>
              <div className="pt-1 flex items-center gap-2 font-mono text-xs tracking-[0.08em] uppercase text-neutral-500 dark:text-neutral-400 group-hover:text-[#FF4500] dark:group-hover:text-[#FF4500] transition-colors duration-200">
                {/* <span>VIEW CASE STUDY</span> */}
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <motion.article
      ref={itemRef}
      id={`project-chapter-${project.id}`}
      layout="position"
      data-project-card="true"
      data-cursor="VIEW"
      tabIndex={0}
      role="button"
      aria-label={`View case study: ${project.title}`}
      onClick={handleTrigger}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleTrigger();
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_EDITORIAL_CONFIG}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -20, scale: 0.98 }}
      transition={{
        duration: shouldReduceMotion ? 0.01 : 0.6,
        ease: [0.16, 1, 0.3, 1],
        layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        delay: shouldReduceMotion ? 0 : Math.min(index * 0.04, 0.16),
      }}
      className="group project-card cursor-pointer select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 rounded-none w-full col-span-12 mb-24 sm:mb-32 md:mb-40 lg:mb-48 last:mb-0 will-change-transform"
    >
      {renderContent()}
    </motion.article>
  );
});

ProjectItem.displayName = 'ProjectItem';

interface SelectedWorkProps {
  activeProject?: typeof PROJECTS_DATA[0] | null;
  onActiveProjectChange?: (project: typeof PROJECTS_DATA[0] | null) => void;
  activeFilter?: 'ALL' | 'FULL-STACK' | 'CODE' | 'UI';
  setActiveFilter?: (filter: 'ALL' | 'FULL-STACK' | 'CODE' | 'UI') => void;
  triggerWipe?: (onHalfway: () => void) => void;
}

export default function SelectedWork({
  activeProject,
  onActiveProjectChange,
  activeFilter: propsActiveFilter,
  setActiveFilter: propsSetActiveFilter,
}: SelectedWorkProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [localSelectedProject, setLocalSelectedProject] = useState<typeof PROJECTS_DATA[0] | null>(null);
  const [localActiveFilter, setLocalActiveFilter] = useState<'ALL' | 'FULL-STACK' | 'CODE' | 'UI'>('ALL');
  const activeFilter = propsActiveFilter !== undefined ? propsActiveFilter : localActiveFilter;
  const setActiveFilter = propsSetActiveFilter !== undefined ? propsSetActiveFilter : setLocalActiveFilter;

  // Header scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start center'],
  });

  const headerY = useTransform(
    scrollYProgress,
    [0, 1],
    [shouldReduceMotion ? 0 : 30, 0]
  );
  const headerOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    [shouldReduceMotion ? 1 : 0.2, 1]
  );

  const setSelectedProject = activeProject !== undefined && onActiveProjectChange ? onActiveProjectChange : setLocalSelectedProject;

  const handleOpenModal = useCallback((project: typeof PROJECTS_DATA[0]) => {
    setSelectedProject(project);
  }, [setSelectedProject]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'ALL') return PROJECTS_DATA;
    return PROJECTS_DATA.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const filterCounts = useMemo(() => {
    return {
      ALL: PROJECTS_DATA.length,
      'FULL-STACK': PROJECTS_DATA.filter((p) => p.category === 'FULL-STACK').length,
      CODE: PROJECTS_DATA.filter((p) => p.category === 'CODE').length,
      UI: PROJECTS_DATA.filter((p) => p.category === 'UI').length,
    };
  }, []);

  // Map each project in the composition to its deliberate editorial archetype
  const getDynamicArchetype = useCallback((project: typeof PROJECTS_DATA[0], index: number, totalCount: number): EditorialArchetype => {
    if (totalCount === 1) return 'cinematic-anchor';
    if (totalCount === 2) {
      return index === 0 ? 'panoramic-landscape' : 'split-editorial';
    }
    if (totalCount === 3) {
      const trio: EditorialArchetype[] = ['cinematic-anchor', 'split-editorial', 'narrative-left'];
      return trio[index];
    }

    // Default full archive 6-piece choreography based on intentional project identity
    const archetypeMap: Record<string, EditorialArchetype> = {
      '3d-fluid': 'cinematic-anchor',
      'bilingual-engine': 'split-editorial',
      'custom-cms': 'compact-offset-right',
      'dwello': 'panoramic-landscape',
      'minimalist-portfolio': 'narrative-left',
      'interaction-specimen': 'staggered-right',
    };

    return archetypeMap[project.id] || (['cinematic-anchor', 'split-editorial', 'compact-offset-right', 'panoramic-landscape', 'narrative-left', 'staggered-right'][index % 6] as EditorialArchetype);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="works"
      aria-label="Selected Works"
      style={{
        paddingLeft: 'max(16px, 4vw)',
        paddingRight: 'max(16px, 4vw)',
      }}
      className="relative w-full z-20 py-24 sm:py-32 md:py-44 lg:py-52 scroll-mt-20 md:scroll-mt-24 select-text"
    >
      <div className="w-full relative flex flex-col max-w-7xl mx-auto px-0 sm:px-8 lg:px-12">
        
        {/* Editorial Section Header & Classification Index */}
        <motion.div
          variants={{
            hidden: { opacity: shouldReduceMotion ? 1 : 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.08,
                delayChildren: shouldReduceMotion ? 0 : 0.04,
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_EDITORIAL_CONFIG}
          style={{ y: headerY, opacity: headerOpacity }}
          className="w-full mb-16 sm:mb-20 md:mb-28 will-change-transform select-text"
        >
          {/* Asymmetric 12-Column Editorial Index Composition */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-8 items-start w-full">
            
            {/* Primary Section Anchor: Section Label & Dominant Title */}
            <div className="col-span-12 md:col-span-6 lg:col-span-6 flex flex-col items-start text-left">
              <motion.span
                variants={{
                  hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 15 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: shouldReduceMotion ? 0.01 : 0.75, ease: MOTION_CURVE_PREMIUM },
                  },
                }}
                className="font-mono text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400 font-medium tracking-[0.16em] leading-none uppercase block mb-3 sm:mb-4 select-text"
              >
                PORTFOLIO
              </motion.span>

              <motion.h2
                variants={{
                  hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: shouldReduceMotion ? 0.01 : 0.75, ease: MOTION_CURVE_PREMIUM },
                  },
                }}
                className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 uppercase leading-[0.92] select-text"
              >
                SELECTED WORKS
              </motion.h2>
            </div>

            {/* Asymmetric Offset Classification Field (Tucked into negative space on Right Axis) */}
            <motion.div
              variants={{
                hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 15 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: shouldReduceMotion ? 0.01 : 0.7, ease: MOTION_CURVE_PREMIUM },
                },
              }}
              className="col-span-12 md:col-span-6 lg:col-span-5 md:col-start-7 lg:col-start-8 flex flex-col items-start md:items-end justify-between pt-1 md:pt-2 text-left md:text-right"
            >
              <div className="w-full flex flex-col items-start md:items-end gap-2 sm:gap-3">
                {/* Editorial Index Filter List */}
                <div
                  role="tablist"
                  aria-label="Filter works by discipline"
                  className="flex flex-wrap md:flex-nowrap items-center gap-x-5 sm:gap-x-7 gap-y-2.5 w-full md:w-auto justify-start md:justify-end"
                >
                  {(['ALL', 'FULL-STACK', 'CODE', 'UI'] as const).map((filterValue) => {
                    const count = filterCounts[filterValue];
                    const isActive = activeFilter === filterValue;

                    return (
                      <button
                        key={filterValue}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-controls="works-gallery-grid"
                        onClick={() => setActiveFilter(filterValue)}
                        className={`group relative py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500 cursor-pointer select-none transition-all duration-200 text-left shrink-0 ${
                          isActive
                            ? 'text-neutral-950 dark:text-neutral-50'
                            : 'text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
                        }`}
                      >
                        <div className="flex items-baseline gap-1.5 font-mono text-xs sm:text-[13px] tracking-[0.12em] uppercase leading-none">
                          {/* Subtle Active Indicator */}
                          <span
                            aria-hidden="true"
                            className={`inline-block transition-opacity duration-200 ${
                              isActive ? 'text-neutral-950 dark:text-neutral-50 opacity-100' : 'opacity-0'
                            }`}
                          >
                            &bull;
                          </span>
                          <span className={isActive ? 'font-medium tracking-[0.12em]' : 'font-normal tracking-[0.12em]'}>
                            {filterValue}
                          </span>
                          <span
                            className={`text-[10px] tracking-wider transition-opacity duration-200 ${
                              isActive
                                ? 'opacity-85 font-medium text-neutral-950 dark:text-neutral-50'
                                : 'opacity-40 group-hover:opacity-75 font-normal'
                            }`}
                          >
                            {String(count).padStart(2, '0')}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Editorial Archive Composition with Asymmetric Spatial Pacing */}
        <motion.div
          id="works-gallery-grid"
          layout="position"
          className="grid grid-cols-1 md:grid-cols-12 w-full items-start"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredProjects.map((project, index) => {
              const archetype = getDynamicArchetype(project, index, filteredProjects.length);

              return (
                <ProjectItem
                  key={project.id}
                  project={project}
                  onOpen={handleOpenModal}
                  archetype={archetype}
                  isPriority={index === 0}
                  index={index}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
