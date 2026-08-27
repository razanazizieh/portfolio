// /**
//  * @license
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
// import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'motion/react';
// import { PROJECTS_DATA } from '../data';
// import { MOTION_CURVE_PREMIUM, motionRoles, VIEWPORT_ONCE_CONFIG } from '../utils/motion';


// interface ProjectChapterProps {
//   project: typeof PROJECTS_DATA[0];
//   index: number;
//   onOpen: (project: typeof PROJECTS_DATA[0]) => void;
//   hoveredProjectId: string | null;
//   setHoveredProjectId: (id: string | null) => void;
//   focusedProjectId: string | null;
//   setFocusedProjectId: (id: string | null) => void;
//   onNavigate: (currentIndex: number, direction: 'next' | 'prev') => void;
// }

// function ScrollLitNarrative({ children, className }: { children: React.ReactNode; className?: string }) {
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

// const ProjectChapter = React.memo<ProjectChapterProps>(({
//   project,
//   index,
//   onOpen,
//   hoveredProjectId,
//   setHoveredProjectId,
//   focusedProjectId,
//   setFocusedProjectId,
//   onNavigate
// }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const shouldReduceMotion = useReducedMotion();
//   const isEven = index % 2 === 0;

//   const [isMobileViewport, setIsMobileViewport] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobileViewport(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   const isAnyProjectActive = hoveredProjectId !== null || focusedProjectId !== null;
//   const isThisProjectActive = hoveredProjectId === project.id || focusedProjectId === project.id;
//   const showFaded = !isMobileViewport && isAnyProjectActive && !isThisProjectActive;

//   const [shouldEagerLoad, setShouldEagerLoad] = useState(index < 3);
//   const [isImageLoaded, setIsImageLoaded] = useState(false);
//   const imageRef = useRef<HTMLDivElement>(null);

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end start"]
//   });

//   const y = useTransform(
//     scrollYProgress,
//     [0, 1],
//     shouldReduceMotion ? ["0%", "0%"] : ["-5%", "5%"]
//   );

//   // Swiss-style subtle scroll-driven exit/fading motion as elements leave viewport (Deactivated)
//   const exitImageY = 0;
//   const exitTextY = 0;
//   const exitScale = 1;
//   const exitOpacity = 1;

//   const getHoverConfig = () => {
//     if (shouldReduceMotion) return undefined;
//     return "hover";
//   };

//   useEffect(() => {
//     if (index === 0) return;

//     const el = imageRef.current;
//     if (!el) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         const [entry] = entries;
//         if (entry.isIntersecting) {
//           setShouldEagerLoad(true);
//           observer.disconnect();
//         }
//       },
//       {
//         rootMargin: '400px 0px 400px 0px', // Target images immediately adjacent to the current viewport
//         threshold: 0,
//       }
//     );

//     observer.observe(el);
//     return () => {
//       observer.disconnect();
//     };
//   }, [index]);

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       onOpen(project);
//       return;
//     }

//     const key = e.key.toLowerCase();
//     if (key === 'arrowdown' || key === 'j') {
//       e.preventDefault();
//       onNavigate(index, 'next');
//     } else if (key === 'arrowup' || key === 'k') {
//       e.preventDefault();
//       onNavigate(index, 'prev');
//     }
//   };

//   const getNarrative = () => {
//     return project.overview;
//   };

//   // Dynamic per-card reveal animations:
//   // 1. Horizontally unfolds (index 0)
//   // 2. Appears through masking (index 1)
//   // 3. Enters diagonally (index 2)
//   // 4. Reveals image first then text (index 3)
//   // 5. Reveals text first then image (index 4)

//   const getEditorialContentBlockVariants = () => motionRoles.supportingText(isMobileViewport ? 0 : 0.08, shouldReduceMotion);

//   const getImageVariants = () => motionRoles.editorialImage(isMobileViewport ? 0 : 0.05, shouldReduceMotion);

//   const editorialContentModule = (
//     <motion.div
//       variants={getEditorialContentBlockVariants()}
//       initial="hidden"
//       whileInView="visible"
//       viewport={VIEWPORT_ONCE_CONFIG}
//       className="flex flex-col gap-6 md:gap-8 justify-start w-full text-[var(--text-color)]"
//     >

//       <div className="w-full text-left">
//         <div className="overflow-hidden block py-0.5">
//           <motion.div
//             initial={{ y: "100%", opacity: 0 }}
//             whileInView={{ y: 0, opacity: 1 }}
//             viewport={VIEWPORT_ONCE_CONFIG}
//             transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//             className="flex flex-wrap items-center typo-mono-label mb-4 text-[var(--text-dim)] group-hover:text-[var(--text-color)] transition-colors duration-300 font-medium"
//           >
//             <span>{project.category}</span>
//             <span className="mx-2 opacity-60">|</span>
//             <span>{project.year}</span>
//           </motion.div>
//         </div>
//         <div className="overflow-hidden block py-1">
//           <motion.h3
//             initial={{ y: "100%", opacity: 0 }}
//             whileInView={{ y: 0, opacity: 1 }}
//             viewport={VIEWPORT_ONCE_CONFIG}
//             transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
//             className="typo-display-sm font-extrabold tracking-tight text-[var(--text-color)] uppercase transition-all duration-350"
//           >
//             {project.title}
//           </motion.h3>
//         </div>
//       </div>

//       <div className="flex flex-col items-start gap-6 text-left w-full">
//         <ScrollLitNarrative className="typo-body-regular-dim select-text text-[var(--text-dim)] group-hover:text-[var(--text-color)] transition-all duration-300">
//           {getNarrative()}
//         </ScrollLitNarrative>

//         <div className="pt-2 flex items-center gap-8 flex-wrap">
//           <motion.button
//             type="button"
//             onClick={(e) => {
//               e.stopPropagation();
//               onOpen(project);
//             }}
//             aria-label={`Open case study for ${project.title}`}
//             className="typo-mono-btn text-[var(--text-dim)] hover:text-[var(--text-color)] opacity-50 hover:opacity-100 transition-all duration-300 ease-out focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-color)] focus-visible:px-2 focus-visible:py-1 rounded font-semibold select-none min-h-[44px] px-2 py-1 -mx-2 -my-1 cursor-pointer flex items-center gap-1.5"
//             whileHover={{ x: 3 }}
//             transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
//           >
//             OPEN CASE STUDY
//           </motion.button>

//           {project.live && (
//             <motion.a
//               href={project.live}
//               target="_blank"
//               rel="noopener noreferrer"
//               onClick={(e) => e.stopPropagation()}
//               aria-label={`View live site for ${project.title}`}
//               className="typo-mono-btn text-[var(--text-dim)] hover:text-[var(--text-color)] opacity-50 hover:opacity-100 transition-all duration-300 ease-out focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-color)] focus-visible:px-2 focus-visible:py-1 rounded font-semibold select-none min-h-[44px] px-2 py-1 -mx-2 -my-1 cursor-pointer flex items-center gap-1.5"
//               whileHover={{ x: 3 }}
//               transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
//             >
//               VIEW LIVE
//             </motion.a>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );

//   const imageContainer = (
//     <motion.div
//       ref={imageRef}
//       initial="hidden"
//       whileInView="visible"
//       viewport={VIEWPORT_ONCE_CONFIG}
//       className="relative w-full bg-transparent select-none opacity-100"
//     >

//       <motion.div
//         variants={getImageVariants()}
//         className="relative w-full h-auto bg-transparent opacity-100 flex items-center justify-center overflow-hidden"
//       >
//         {project.image ? (
//           <>
//             <AnimatePresence>
//               {!isImageLoaded && (
//                 <motion.div
//                   initial={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.35 }}
//                   className="absolute inset-0 bg-transparent flex flex-col items-center justify-center min-h-[220px]"
//                 >
//                   <div className="flex flex-col items-center gap-1.5">
//                     <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--text-dim)] opacity-60">
//                       RESOLVING PREVIEW
//                     </span>
//                     <span className="font-mono text-[8px] text-[var(--text-dim)] opacity-40">
//                       INDEX_{index + 1}
//                     </span>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//             <motion.img
//               src={project.image}
//               alt={project.title}
//               onLoad={() => setIsImageLoaded(true)}
//               loading={shouldEagerLoad ? "eager" : "lazy"}
//               className={`w-full h-auto max-h-full object-contain object-top transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-100 !opacity-100 ${
//                 isThisProjectActive ? 'scale-[1.018]' : 'scale-100'
//               }`}
//               style={{ opacity: 1, filter: 'none' }}
//               referrerPolicy="no-referrer"
//             />
//           </>
//         ) : (
//           <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-transparent select-none overflow-hidden pb-4">
//             <svg className="w-1/2 h-1/2 opacity-[0.08] text-[var(--text-dim)] group-hover:opacity-[0.15] transition-opacity duration-500" viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <circle cx="200" cy="125" r="85" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 8" />
//               <circle cx="200" cy="125" r="45" stroke="currentColor" strokeWidth="0.5" />
//               <line x1="40" y1="125" x2="360" y2="125" stroke="currentColor" strokeWidth="0.6" strokeDasharray="10 6" />
//               <line x1="200" y1="15" x2="200" y2="235" stroke="currentColor" strokeWidth="0.6" strokeDasharray="10 6" />
//             </svg>
//             <div className="absolute inset-0 flex items-center justify-center">
//               <span className="typo-mono-sub text-[var(--text-dim)] opacity-60">
//                 [UI_IMAGE_PLACEHOLDER: ASPECT_RATIO_PRESERVED]
//               </span>
//             </div>
//           </div>
//         )}
//       </motion.div>
//     </motion.div>
//   );

//   const renderLayout = () => {
//     const layoutVariant = index % 4;

//     if (layoutVariant === 0) {
//       // Index 0: Dominant Featured Showcase (8-col Image, 4-col Text)
//       return (
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 lg:gap-16 items-center w-full">
//           <motion.div
//             style={{
//               y: exitImageY,
//               scale: exitScale,
//               opacity: exitOpacity
//             }}
//             className="w-full lg:col-span-8 order-1"
//           >
//             {imageContainer}
//           </motion.div>
//           <motion.div
//             style={{
//               y: exitTextY,
//               opacity: exitOpacity
//             }}
//             className="w-full lg:col-span-4 flex flex-col justify-start order-2"
//           >
//             {editorialContentModule}
//           </motion.div>
//         </div>
//       );
//     }

//     if (layoutVariant === 1) {
//       // Index 1: Offset Narrative Spread (5-col Text Left, 7-col Image Right)
//       return (
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 lg:gap-16 items-center w-full">
//           <motion.div
//             style={{
//               y: exitTextY,
//               opacity: exitOpacity
//             }}
//             className="w-full lg:col-span-5 flex flex-col justify-start order-2 lg:order-1"
//           >
//             {editorialContentModule}
//           </motion.div>
//           <motion.div
//             style={{
//               y: exitImageY,
//               scale: exitScale,
//               opacity: exitOpacity
//             }}
//             className="w-full lg:col-span-7 order-1 lg:order-2"
//           >
//             {imageContainer}
//           </motion.div>
//         </div>
//       );
//     }

//     if (layoutVariant === 2) {
//       // Index 2: Asymmetric Left Feature (7-col Image Left, 5-col Text Right)
//       return (
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 lg:gap-16 items-center w-full">
//           <motion.div
//             style={{
//               y: exitImageY,
//               scale: exitScale,
//               opacity: exitOpacity
//             }}
//             className="w-full lg:col-span-7 order-1"
//           >
//             {imageContainer}
//           </motion.div>
//           <motion.div
//             style={{
//               y: exitTextY,
//               opacity: exitOpacity
//             }}
//             className="w-full lg:col-span-5 flex flex-col justify-start order-2"
//           >
//             {editorialContentModule}
//           </motion.div>
//         </div>
//       );
//     }

//     // Index 3: Monograph Balanced Spread (6-col Text Left, 6-col Image Right)
//     return (
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 lg:gap-16 items-center w-full">
//         <motion.div
//           style={{
//             y: exitTextY,
//             opacity: exitOpacity
//           }}
//           className="w-full lg:col-span-6 flex flex-col justify-start order-2 lg:order-1"
//         >
//           {editorialContentModule}
//         </motion.div>
//         <motion.div
//           style={{
//             y: exitImageY,
//             scale: exitScale,
//             opacity: exitOpacity
//           }}
//           className="w-full lg:col-span-6 order-1 lg:order-2"
//         >
//           {imageContainer}
//         </motion.div>
//       </div>
//     );
//   };

//   const rhythmPadding = useMemo(() => {
//     const mod = index % 4;
//     if (mod === 0) return "py-14 sm:py-20 md:py-28 lg:py-32";
//     if (mod === 1) return "pt-8 pb-16 sm:pt-12 sm:pb-22 md:pt-14 md:pb-28";
//     if (mod === 2) return "py-16 sm:py-24 md:py-32 lg:py-36";
//     return "pt-10 pb-16 sm:pt-14 sm:pb-20 md:pt-16 md:pb-24";
//   }, [index]);

//   return (
//     <motion.div
//       ref={containerRef}
//       id={`project-chapter-${project.id}`}
//       role="button"
//       tabIndex={0}
//       aria-label={`Open case study for ${project.title}`}
//       onKeyDown={handleKeyDown}
//       onClick={() => onOpen(project)}
//       onMouseEnter={() => setHoveredProjectId(project.id)}
//       onMouseLeave={() => setHoveredProjectId(null)}
//       onFocus={() => setFocusedProjectId(project.id)}
//       onBlur={() => setFocusedProjectId(null)}
//       whileHover={getHoverConfig()}
//       className={`group relative w-full cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[var(--text-color)] focus-visible:bg-[var(--card-bg-subtle)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-100 ${rhythmPadding}`}
//     >
//       <div className="w-full max-w-7xl mx-auto px-0 sm:px-12 lg:px-16">
//         {renderLayout()}
//       </div>
//     </motion.div>
//   );
// });

// ProjectChapter.displayName = 'ProjectChapter';

// interface SelectedWorkProps {
//   activeProject?: typeof PROJECTS_DATA[0] | null;
//   onActiveProjectChange?: (project: typeof PROJECTS_DATA[0] | null) => void;
//   triggerWipe?: (onHalfway: () => void) => void;
//   activeFilter?: 'ALL' | 'FULL-STACK' | 'CODE' | 'UI';
//   setActiveFilter?: (filter: 'ALL' | 'FULL-STACK' | 'CODE' | 'UI') => void;
// }

// export default function SelectedWork({
//   activeProject,
//   onActiveProjectChange,
//   triggerWipe,
//   activeFilter: propsActiveFilter,
//   setActiveFilter: propsSetActiveFilter
// }: SelectedWorkProps = {}) {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const [localSelectedProject, setLocalSelectedProject] = useState<typeof PROJECTS_DATA[0] | null>(null);
//   const [localActiveFilter, setLocalActiveFilter] = useState<'ALL' | 'FULL-STACK' | 'CODE' | 'UI'>('ALL');
//   const activeFilter = propsActiveFilter !== undefined ? propsActiveFilter : localActiveFilter;
//   const setActiveFilter = propsSetActiveFilter !== undefined ? propsSetActiveFilter : setLocalActiveFilter;
//   const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
//   const [focusedProjectId, setFocusedProjectId] = useState<string | null>(null);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 1024);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   const { scrollYProgress: worksScrollProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start end", "end start"]
//   });

//   const shouldReduceMotion = useReducedMotion();
//   const [ambientTime, setAmbientTime] = useState(0);

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

//   // Slow horizontal scroll-linked movement creating visual tension
//   const worksHeadlineDriftX = useTransform(worksScrollProgress, [0, 1], [-30, 35]);

//   // Combined with slow wave breathing to feel alive when idle
//   const combinedWorksHeadlineX = useTransform(worksHeadlineDriftX, (val) => {
//     if (shouldReduceMotion || isMobile) return 0;
//     return val + Math.sin(ambientTime * 0.4) * 6;
//   });

//   // Scroll-linked continuous exit animation (Deactivated)
//   const exitOpacity = 1;
//   const exitY = 0;

//   const selectedProject = activeProject !== undefined ? activeProject : localSelectedProject;
//   const setSelectedProject = activeProject !== undefined && onActiveProjectChange ? onActiveProjectChange : setLocalSelectedProject;

//   const handleOpenModal = useCallback((project: typeof PROJECTS_DATA[0]) => {
//     setSelectedProject(project);
//   }, [setSelectedProject]);

//   const handleCloseModal = useCallback(() => {
//     setSelectedProject(null);
//   }, [setSelectedProject]);

//   const filteredProjects = useMemo(() => {
//     if (activeFilter === 'ALL') return PROJECTS_DATA;
//     return PROJECTS_DATA.filter((p) => p.category === activeFilter);
//   }, [activeFilter]);

//   // Preload project images for instantaneous appearance during scroll
//   useEffect(() => {
//     filteredProjects.forEach((p) => {
//       if (p.image) {
//         const img = new Image();
//         img.src = p.image;
//       }
//     });
//   }, [filteredProjects]);

//   const handleProjectNavigation = useCallback((currentIndex: number, direction: 'next' | 'prev') => {
//     const targetIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
//     if (targetIndex >= 0 && targetIndex < filteredProjects.length) {
//       const targetProject = filteredProjects[targetIndex];
//       const targetElement = document.getElementById(`project-chapter-${targetProject.id}`);
//       if (targetElement) {
//         targetElement.focus();
//         targetElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
//       }
//     }
//   }, [filteredProjects]);

//   const filterCounts = useMemo(() => {
//     return {
//       ALL: PROJECTS_DATA.length,
//       'FULL-STACK': PROJECTS_DATA.filter((p) => p.category === 'FULL-STACK').length,
//       CODE: PROJECTS_DATA.filter((p) => p.category === 'CODE').length,
//       UI: PROJECTS_DATA.filter((p) => p.category === 'UI').length,
//     };
//   }, []);

//   // Natural keyboard navigation and focus flow are handled via standard DOM tabIndex and sequential focus.

//   return (
//     <section
//       ref={sectionRef}
//       id="works"
//       className="relative w-full bg-[var(--bg-color)] z-20 text-[var(--text-color)] overflow-hidden pt-12 sm:pt-16 md:pt-20 pb-16 md:pb-24 scroll-mt-20 md:scroll-mt-24"
//       style={{ paddingLeft: "max(20px, 4vw)", paddingRight: "max(20px, 4vw)" }}
//     >
//       <motion.div
//         style={{
//           opacity: shouldReduceMotion ? 1 : exitOpacity,
//           y: shouldReduceMotion ? 0 : exitY
//         }}
//         className="w-full bg-[var(--bg-color)] relative flex flex-col max-w-7xl mx-auto"
//       >
//         {/* Works Intro & Structural category filters */}
//         <div
//           className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-20 items-start relative z-10 w-full px-0 sm:px-12 lg:px-16 pt-4 pb-0"
//         >
//           <div className="col-span-1 lg:col-span-6 flex flex-col items-start justify-start text-left">
//             <div className="overflow-hidden block py-1">
//               <motion.h2
//                 initial={{ y: "100%", opacity: 0 }}
//                 whileInView={{ y: 0, opacity: 1 }}
//                 viewport={VIEWPORT_ONCE_CONFIG}
//                 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
//                 className="typo-display-lg select-text text-[var(--text-color)] font-black"
//               >
//                 SELECTED WORKS
//               </motion.h2>
//             </div>
//           </div>

//           {/* Typographic Filter Controls */}
//           <motion.div
//             role="group"
//             aria-label="Project filter categories"
//             initial="hidden"
//             whileInView="visible"
//             viewport={VIEWPORT_ONCE_CONFIG}
//             variants={motionRoles.metaLabel(0.1)}
//             className="col-span-1 lg:col-span-6 flex flex-nowrap items-center justify-between sm:justify-start lg:justify-end gap-x-1.5 sm:gap-x-4 lg:gap-x-8 typo-mono-filter lg:pl-6 lg:pt-3 w-full max-w-full whitespace-nowrap overflow-x-visible pb-1 lg:pb-0"
//           >

//             {(['ALL', 'FULL-STACK', 'CODE', 'UI'] as const).map((filterValue) => {
//                const count = filterCounts[filterValue];
//                const isActive = activeFilter === filterValue;
//                const displayName = {
//                  ALL: 'ALL',
//                  'FULL-STACK': 'FULL-STACK',
//                  CODE: 'CODE',
//                  UI: 'UI'
//                }[filterValue];

//                const customFilterVariants = {
//                  hidden: {
//                    opacity: 0,
//                    y: shouldReduceMotion ? 0 : 12,
                   
//                  },
//                  visible: {
//                    opacity: 1,
//                    y: 0,
                   
//                    transition: {
//                      duration: 0.35,
//                      ease: [0.16, 1, 0.3, 1]
//                    }
//                  }
//                };

//                return (
//                  <motion.button
//                    key={filterValue}
//                    variants={customFilterVariants}
//                    onPointerDown={(e) => {
//                      if (e.button === 0) {
//                        e.preventDefault();
//                        setActiveFilter(filterValue);
//                      }
//                    }}
//                    onClick={(e) => {
//                      if (e.clientX === 0 && e.clientY === 0) {
//                        setActiveFilter(filterValue);
//                      }
//                    }}
//                    aria-label={`Filter projects by ${displayName}`}
//                    aria-pressed={isActive}
//                   className={`relative cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-color)] rounded filter-tab-button shrink-0 py-2 lg:py-1 px-1 sm:px-2 lg:px-0 inline-flex items-center text-[10px] sm:text-xs lg:text-xs ${
//                     isActive ? 'active' : ''
//                   }`}
//                 >
//                   <span className="inline-flex items-center gap-1 sm:gap-1.5">
//                     <span>{displayName}</span>
//                     <span className="typo-mono-sub text-[9px] sm:text-xs font-normal tracking-normal filter-tab-count">
//                       ({count})
//                     </span>
//                   </span>
//                 </motion.button>
//               );
//             })}
//           </motion.div>
//         </div>

//         <motion.div layout className="w-full flex flex-col works-sections-container mt-[10px]">
//           <AnimatePresence mode="popLayout">
//             {filteredProjects.map((project, index) => (
//               <motion.div
//                 key={`${project.id}-${selectedProject ? 'active' : 'inactive'}`}
//                 layout={shouldReduceMotion ? undefined : "position"}
//                 initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{
//                   layout: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
//                   opacity: { duration: 0.25 },
//                   y: { duration: 0.35, ease: MOTION_CURVE_PREMIUM }
//                 }}
//                 style={{ display: "block" }}
//               >
//                 <ProjectChapter
//                   project={project}
//                   index={index}
//                   onOpen={handleOpenModal}
//                   hoveredProjectId={hoveredProjectId}
//                   setHoveredProjectId={setHoveredProjectId}
//                   focusedProjectId={focusedProjectId}
//                   setFocusedProjectId={setFocusedProjectId}
//                   onNavigate={handleProjectNavigation}
//                 />
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </motion.div>
//       </motion.div>
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
                            [{String(count).padStart(2, '0')}]
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
