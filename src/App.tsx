// /**
//  * @license
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import NotFound from "./components/NotFound";

// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
// import { useLocation, useNavigate } from 'react-router-dom';

// import OpeningExperience from './components/OpeningExperience';
// import SelectedWork from './components/SelectedWork';
// import Contact from './components/Contact';
// import ProjectCaseStudy from './components/ProjectCaseStudy';
// import NotFound from './components/NotFound';
// import { useSmoothScroll, getLenis } from './hooks/useSmoothScroll';
// import { PROJECTS_DATA } from './data';
// import TransitionOverlay from './components/TransitionOverlay';
// import { MOTION_CURVE_PREMIUM } from './utils/motion';

// import PageLoader from './components/PageLoader';
// import AboutSection from './components/AboutSection';
// import StatementSection from './components/StatementSection';
// import Header from './components/Header';
// import MobileMenu from './components/MobileMenu';
// import BackToTop from './components/BackToTop';
// import ContextualCursorPill from './components/ContextualCursorPill';
// import ScrollProgressBar from './components/ScrollProgressBar';

// export default function App() {
//   const shouldReduceMotion = useReducedMotion();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [theme, setTheme] = useState<'dark' | 'light'>(() => {
//     try {
//       const saved = localStorage.getItem('theme');
//       if (saved === 'dark' || saved === 'light') return saved;
//     } catch (e) {
//       // Ignore localStorage errors
//     }
//     return 'light';
//   });
//   const [isFooterReached, setIsFooterReached] = useState(false);
//   const [scrolledPastHero, setScrolledPastHero] = useState(false);
//   const [showBackToTop, setShowBackToTop] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [activeSection, setActiveSection] = useState<string>('hero');
//   const [activeCaseStudy, setActiveCaseStudy] = useState<typeof PROJECTS_DATA[0] | null>(null);
//   const [activeFilter, setActiveFilter] = useState<'ALL' | 'FULL-STACK' | 'CODE' | 'UI'>('ALL');
//   const [isNotFound, setIsNotFound] = useState(false);

//   const isSectionTrackingDormant = activeCaseStudy !== null || isNotFound;

//   // Manual scroll tracking refs to prevent state stutter and jumpy active states during click scrolls
//   const isManualScrolling = useRef(false);
//   const manualScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   // Transition overlay state
//   const [transitionStep, setTransitionStep] = useState<0 | 1 | 2 | 3>(0);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const mobileMenuToggleRef = useRef<HTMLButtonElement>(null);

//   // Clean up manual scroll timeout on unmount
//   useEffect(() => {
//     return () => {
//       if (manualScrollTimeoutRef.current) {
//         clearTimeout(manualScrollTimeoutRef.current);
//       }
//     };
//   }, []);

//   // Precise IntersectionObserver with vertical threshold detection for active navigation states
//   useEffect(() => {
//     if (loading || isSectionTrackingDormant) return;

//     let observer: IntersectionObserver | null = null;
//     let timeoutId: NodeJS.Timeout | null = null;
//     let frameId: number | null = null;

//     const setupObserver = () => {
//       const observerOptions = {
//         root: null,
//         rootMargin: '-20% 0px -45% 0px', // Calibrated active band for reliable triggering of compact and large sections
//         threshold: [0.05, 0.1, 0.2]
//       };

//       const observerCallback = (entries: IntersectionObserverEntry[]) => {
//         // Prevent observer from overwriting the active state when manually scrolling/navigating via clicks
//         if (isManualScrolling.current) return;

//         // Filter intersecting entries to resolve the most prominent active section
//         const intersecting = entries.filter(entry => entry.isIntersecting);
//         if (intersecting.length > 0) {
//           // Find the section with the highest intersection ratio or best vertical alignment
//           const bestEntry = intersecting.reduce((best, current) =>
//             current.intersectionRatio > best.intersectionRatio ? current : best
//           );
//           const id = bestEntry.target.id;
//           setActiveSection(prev => prev === id ? prev : id);
//         }
//       };

//       observer = new IntersectionObserver(observerCallback, observerOptions);

//       const sections = ['hero', 'about', 'works', 'contact'];
//       let foundAll = true;

//       sections.forEach((id) => {
//         const el = document.getElementById(id);
//         if (el) {
//           observer?.observe(el);
//         } else {
//           foundAll = false;
//         }
//       });

//       // Perform a robust initial manual detection of the active section on mount/hydration
//       // to guarantee it resolves correctly even before any scroll event occurs
//       if (!isManualScrolling.current) {
//         let bestSection = 'hero';
//         let maxVisibleHeight = 0;

//         sections.forEach((id) => {
//           const el = document.getElementById(id);
//           if (el) {
//             const rect = el.getBoundingClientRect();
//             // Calculate overlapping height with viewport
//             const visibleTop = Math.max(0, rect.top);
//             const visibleBottom = Math.min(window.innerHeight, rect.bottom);
//             const visibleHeight = Math.max(0, visibleBottom - visibleTop);

//             if (visibleHeight > maxVisibleHeight) {
//               maxVisibleHeight = visibleHeight;
//               bestSection = id;
//             }
//           }
//         });

//         if (maxVisibleHeight > 0) {
//           setActiveSection(bestSection);
//         }
//       }

//       // If hydration or rendering of some sections is delayed, retry observing them shortly
//       if (!foundAll) {
//         timeoutId = setTimeout(setupObserver, 100);
//       }
//     };

//     // Use nested requestAnimationFrames to defer until the DOM is fully rendered/hydrated and stable
//     frameId = requestAnimationFrame(() => {
//       frameId = requestAnimationFrame(() => {
//         setupObserver();
//       });
//     });

//     return () => {
//       if (observer) observer.disconnect();
//       if (timeoutId) clearTimeout(timeoutId);
//       if (frameId) cancelAnimationFrame(frameId);
//     };
//   }, [loading, isSectionTrackingDormant]);

//   useEffect(() => {
//     if (isMobileMenuOpen && mobileMenuToggleRef.current) {
//       mobileMenuToggleRef.current.focus();
//     }
//   }, [isMobileMenuOpen]);

//   const triggerTransition = (onHalfway: () => void) => {
//     setTransitionStep(1);
//     setTimeout(() => {
//       setTransitionStep(2);
//     }, 10);
//     setTimeout(() => {
//       onHalfway();
//       setTransitionStep(3);
//     }, 450);
//     setTimeout(() => {
//       setTransitionStep(0);
//     }, 900);
//   };

//   const triggerTransitionOverlay = (show: boolean) => {
//     if (show) {
//       setTransitionStep(1);
//       setTimeout(() => {
//         setTransitionStep(2);
//       }, 10);
//     } else {
//       setTransitionStep(3);
//       setTimeout(() => {
//         setTransitionStep(0);
//       }, 450);
//     }
//   };

//   const unlockScroll = () => {
//     document.body.style.overflow = '';
//     document.body.style.height = '';
//     document.body.style.position = '';
//     document.body.style.pointerEvents = 'auto';
//     document.documentElement.style.overflow = '';
//     document.documentElement.style.height = '';
//     document.documentElement.style.position = '';
//     document.documentElement.style.pointerEvents = 'auto';
//     getLenis()?.start();
//   };

//   const handleNav = (e: React.SyntheticEvent | { preventDefault: () => void }, targetId: string) => {
//     e.preventDefault();

//     // Unlock body scroll lock immediately for mobile navigation
//     setIsMobileMenuOpen(false);
//     unlockScroll();

//     // If not on homepage or a case study or 404 is open, perform transition overlay to homepage
//     if (location.pathname !== '/' || activeCaseStudy !== null || isNotFound) {
//       triggerTransitionOverlay(true); // Initiate curtain cover
//       setTimeout(() => {
//         setActiveCaseStudy(null); // Sync state change to mount homepage instantly
//         setIsNotFound(false);
//         navigate('/');
//         setTimeout(() => {
//           unlockScroll();
//           // Reposition scroll behind the curtain
//           scrollSection(targetId, shouldReduceMotion ? 'auto' : 'smooth');
//           triggerTransitionOverlay(false); // Retract curtain revealing content
//         }, 50);
//       }, 400);
//     } else {
//       // Direct smooth scroll & active section highlight when already on homepage
//       setTimeout(() => {
//         unlockScroll();
//         scrollSection(targetId, shouldReduceMotion ? 'auto' : 'smooth');
//       }, 20);
//     }
//   };

//   // Body scroll lock during mobile menu open, with robust cleanup
//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = 'hidden';
//       document.documentElement.style.overflow = 'hidden';
//       getLenis()?.stop();
//     } else {
//       unlockScroll();
//     }
//     return () => {
//       unlockScroll();
//     };
//   }, [isMobileMenuOpen]);

//   // Global layout keyboard scrolling enforcer to guarantee native keyboard scroll behavior
//   useEffect(() => {
//     const handleScrollKeysGlobal = (e: KeyboardEvent) => {
//       // Allow default input behavior for interactive text fields
//       if (
//         document.activeElement?.tagName === 'INPUT' ||
//         document.activeElement?.tagName === 'TEXTAREA' ||
//         document.activeElement?.getAttribute('contenteditable') === 'true'
//       ) {
//         return;
//       }

//       const standardScrollKeys = ['ArrowUp', 'ArrowDown', ' ', 'PageUp', 'PageDown', 'Home', 'End'];
//       if (standardScrollKeys.includes(e.key)) {
//         // Stop keydown events from propagating to nested active focus elements
//         // that might incorrectly intercept or run e.preventDefault() on them.
//         e.stopPropagation();
//       }
//     };

//     window.addEventListener('keydown', handleScrollKeysGlobal, { capture: true });
//     return () => {
//       window.removeEventListener('keydown', handleScrollKeysGlobal, { capture: true });
//     };
//   }, []);

//   // Loader timer - fades in for 0.4s and delays for 0.8s, totaling 1.2s before sliding up
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 1200);

//     // Explicit fallback clean-up function to guarantee user can scroll normally under any circumstance
//     const fallbackTimer = setTimeout(() => {
//       document.body.style.overflow = "unset";
//       document.body.style.position = "";
//       document.documentElement.style.overflow = "unset";
//       document.documentElement.style.position = "";
//     }, 1500);

//     return () => {
//       clearTimeout(timer);
//       clearTimeout(fallbackTimer);
//     };
//   }, []);

//   // Dynamic image preloading to prevent rendering latency & layout pop-ins
//   useEffect(() => {
//     // 1. Immediately eager-load above-the-fold first project image
//     const firstProject = PROJECTS_DATA[0];
//     if (firstProject && firstProject.image) {
//       const img = new Image();
//       img.src = firstProject.image;
//     }

//     // 2. Preload other project images during browser idle periods
//     const preloadOtherImages = () => {
//       PROJECTS_DATA.forEach((proj, idx) => {
//         if (idx !== 0 && proj.image) {
//           const img = new Image();
//           img.src = proj.image;
//         }
//         if (proj.secondaryImage) {
//           const imgSec = new Image();
//           imgSec.src = proj.secondaryImage;
//         }
//       });
//     };

//     let idleCallbackId: number | null = null;
//     let timeoutId: NodeJS.Timeout | null = null;

//     if ('requestIdleCallback' in window) {
//       idleCallbackId = (window as any).requestIdleCallback(preloadOtherImages, { timeout: 2500 });
//     } else {
//       timeoutId = setTimeout(preloadOtherImages, 1500);
//     }

//     return () => {
//       if (idleCallbackId !== null && 'cancelIdleCallback' in window) {
//         (window as any).cancelIdleCallback(idleCallbackId);
//       }
//       if (timeoutId !== null) {
//         clearTimeout(timeoutId);
//       }
//     };
//   }, []);

//   // Instatate Lenis-inspired premium motion scrolling
//   useSmoothScroll(true);

//   // Monitor scheme toggles
//   useEffect(() => {
//     const root = window.document.documentElement;
//     root.classList.remove('dark', 'light');
//     root.classList.add(theme);
//     root.setAttribute('data-theme', theme);
//     try {
//       localStorage.setItem('theme', theme);
//     } catch (e) {
//       console.warn('Unable to write to localStorage.', e);
//     }
//   }, [theme]);

//   // Dynamic SEO JSON-LD structured data and Document Title / Meta tags update
//   useEffect(() => {
//     // Remove existing dynamic script if present
//     const existingScript = document.getElementById('dynamic-jsonld-seo');
//     if (existingScript) {
//       existingScript.remove();
//     }

//     let schemaData: any = null;

//     if (activeCaseStudy) {
//       schemaData = {
//         "@context": "https://schema.org",
//         "@type": "CreativeWork",
//         "@id": `${window.location.origin}/project/${activeCaseStudy.id}`,
//         "name": activeCaseStudy.title,
//         "description": activeCaseStudy.overview,
//         "genre": activeCaseStudy.category,
//         "datePublished": activeCaseStudy.year,
//         "creator": {
//           "@type": "Person",
//           "name": "Razan Azizieh",
//           "jobTitle": "Design Engineer"
//         },
//         "keywords": activeCaseStudy.technology.join(", "),
//         "url": activeCaseStudy.live || `${window.location.origin}/project/${activeCaseStudy.id}`
//       };

//       document.title = `${activeCaseStudy.title} — Razan Azizieh`;

//       const metaDesc = document.querySelector('meta[name="description"]');
//       if (metaDesc) {
//         metaDesc.setAttribute('content', `${activeCaseStudy.overview} An interactive case study by Razan Azizieh.`);
//       }
//     } else if (isNotFound) {
//       document.title = "404 Page Not Found — Razan Azizieh";
//     } else {
//       schemaData = {
//         "@context": "https://schema.org",
//         "@type": "ProfilePage",
//         "@id": `${window.location.origin}/#profile`,
//         "name": "Razan Azizieh — Frontend Engineer & Applied Mathematics",
//         "description": "Portfolio of Razan Azizieh, focusing on Applied Mathematics & Informatics, Front-End Development, Distributed Systems logic, and Python engineering.",
//         "mainEntity": {
//           "@type": "Person",
//           "name": "Razan Azizieh",
//           "jobTitle": "Frontend Engineer",
//           "url": window.location.origin,
//           "sameAs": [
//             "https://github.com/razanazizieh",
//             "https://www.linkedin.com/in/razan-azizieh"
//           ],
//           "knowsAbout": [
//             "Applied Mathematics",
//             "Informatics",
//             "Front-End Architecture",
//             "Distributed Systems Logic",
//             "Python",
//             "TypeScript & React Ecosystem",
//             "Interactive 3D Web Graphics & Spline Viewer Integration",
//             "Custom React CMS & Live REST API CRUD Architectures",
//             "Bilingual Localization Systems & Static Local Translation Toggles",
//             "HTML5 Canvas 2D Graphics Scripting & High-Performance Particle Simulations",
//             "Framer Motion Micro-Animations & Dynamic Layout Transitions",
//             "Swiss Minimalist Typography & Grid Layout Systems",
//             "Responsive Design Optimization & Core Web Vitals Performance",
//             "Performance-Decoupled Cursor Inertia Tracking & Input Handlers",
//             "Modern CSS Architecture: Tailwind CSS, CSS Modules, Stitches, & Bootstrap 5",
//             "Build Optimization & Frontend Bundlers (Vite, Esbuild, Webpack)",
//             "Touch-Responsive Interactive Sliders & Swiper.js Integrations",
//             "Visual Grid Composition & Multi-Breakpoint Responsive Alignments"
//           ],
//           "hasCredential": [
//             {
//               "@type": "EducationalOccupationalCredential",
//               "name": "Advanced React & Frontend Architecture Certification",
//               "credentialCategory": "Professional Certification",
//               "recognizedBy": {
//                 "@type": "Organization",
//                 "name": "Frontend Masters"
//               }
//             },
//             {
//               "@type": "EducationalOccupationalCredential",
//               "name": "Meta Front-End Developer Professional Certificate",
//               "credentialCategory": "Professional Certification",
//               "recognizedBy": {
//                 "@type": "Organization",
//                 "name": "Meta"
//               }
//             },
//             {
//               "@type": "EducationalOccupationalCredential",
//               "name": "3D Interaction Design & Creative Coding Practitioner",
//               "credentialCategory": "Professional Certification",
//               "recognizedBy": {
//                 "@type": "Organization",
//                 "name": "Three.js Journey"
//               }
//             },
//             {
//               "@type": "EducationalOccupationalCredential",
//               "name": "React & TypeScript Full-Stack Developer Specialist",
//               "credentialCategory": "Professional Certification",
//               "recognizedBy": {
//                 "@type": "Organization",
//                 "name": "Udemy & React Training"
//               }
//             },
//             {
//               "@type": "EducationalOccupationalCredential",
//               "name": "Tailwind CSS & Responsive Layout Architecture Certification",
//               "credentialCategory": "Professional Certification",
//               "recognizedBy": {
//                 "@type": "Organization",
//                 "name": "CSS Design Systems Academy"
//               }
//             },
//             {
//               "@type": "EducationalOccupationalCredential",
//               "name": "RESTful API Integration & Client-Side CRUD Specialist",
//               "credentialCategory": "Professional Certification",
//               "recognizedBy": {
//                 "@type": "Organization",
//                 "name": "Web Development Association"
//               }
//             }
//           ]
//         }
//       };

//       document.title = "Razan Azizieh";
//       const metaDesc = document.querySelector('meta[name="description"]');
//       if (metaDesc) {
//         metaDesc.setAttribute('content', "Interactive design engineering portfolio of Razan Azizieh, showcasing 3D experiences, bilingual portfolio engines, and custom React CMS & dashboards.");
//       }
//     }

//     if (schemaData) {
//       const script = document.createElement('script');
//       script.id = 'dynamic-jsonld-seo';
//       script.type = 'application/ld+json';
//       script.text = JSON.stringify(schemaData);
//       document.head.appendChild(script);
//     }
//   }, [activeCaseStudy, isNotFound]);

//   const isSectionTrackingDormantRef = useRef(isSectionTrackingDormant);
//   useEffect(() => {
//     isSectionTrackingDormantRef.current = isSectionTrackingDormant;
//   }, [isSectionTrackingDormant]);

//   // Monitor scroll depth past thresholds to handle background transitions, reveal back-to-top control, and footer detection.
//   // Consolidated into a single unified stable throttled handler using requestAnimationFrame to prevent multiple concurrent DOM reads
//   // and dispatching state updates only upon transition to avoid excessive re-renders.
//   useEffect(() => {
//     if (loading) return;

//     let ticking = false;
//     let rafId: number | null = null;
//     let isUnmounted = false;

//     const handleScrollMonitor = () => {
//       if (!ticking && !isUnmounted) {
//         rafId = window.requestAnimationFrame(() => {
//           if (isUnmounted) return;

//           // Single cohesive DOM read phase
//           const scrollY = window.scrollY;
//           const winHeight = window.innerHeight;
//           const docHeight = document.documentElement.scrollHeight;
//           const scrollableHeight = docHeight - winHeight;

//           setScrolledPastHero(prev => {
//             const next = scrollY > 200;
//             return next === prev ? prev : next;
//           });

//           if (!isSectionTrackingDormantRef.current && !isManualScrolling.current) {
//             if (scrollY < 120) {
//               setActiveSection('hero');
//             } else if (scrollableHeight > 0 && scrollY >= scrollableHeight - 140) {
//               setActiveSection('contact');
//             } else {
//               // Dynamic viewport reading check based on visible element bounding rects
//               let matchedSection = 'hero';

//               for (const sId of ['about', 'works', 'contact']) {
//                 const el = document.getElementById(sId);
//                 if (el) {
//                   const rect = el.getBoundingClientRect();
//                   if (rect.top <= winHeight * 0.45 && rect.bottom >= winHeight * 0.2) {
//                     matchedSection = sId;
//                     break;
//                   }
//                 }
//               }

//               if (matchedSection === 'hero' && scrollY >= 200) {
//                 const aboutEl = document.getElementById('about');
//                 if (aboutEl) {
//                   const aboutRect = aboutEl.getBoundingClientRect();
//                   if (aboutRect.top <= winHeight * 0.7 && aboutRect.bottom >= 0) {
//                     matchedSection = 'about';
//                   }
//                 }
//               }

//               setActiveSection(prev => prev === matchedSection ? prev : matchedSection);
//             }
//           }

//           setShowBackToTop(prev => {
//             const next = scrollY > winHeight * 0.5;
//             return next === prev ? prev : next;
//           });

//           setIsFooterReached(prev => {
//             const next = scrollableHeight > 0 && scrollY >= scrollableHeight - 160;
//             return next === prev ? prev : next;
//           });

//           ticking = false;
//         });
//         ticking = true;
//       }
//     };

//     window.addEventListener('scroll', handleScrollMonitor, { passive: true });
//     handleScrollMonitor(); // Run initially to guarantee sync on refresh/load

//     return () => {
//       isUnmounted = true;
//       window.removeEventListener('scroll', handleScrollMonitor);
//       if (rafId !== null) {
//         window.cancelAnimationFrame(rafId);
//       }
//     };
//   }, [loading]);

//   useEffect(() => {
//     const isProjectRoute = location.pathname.startsWith('/project/');
//     if (isProjectRoute) {
//       const match = location.pathname.match(/\/project\/([^/]+)/);
//       if (match) {
//         const pId = match[1];
//         const project = PROJECTS_DATA.find(p => p.id === pId);
//         if (project) {
//           setActiveCaseStudy(project);
//           setIsNotFound(false);
//         } else {
//           setActiveCaseStudy(null);
//           setIsNotFound(true);
//         }
//       } else {
//         setActiveCaseStudy(null);
//         setIsNotFound(true);
//       }
//     } else if (location.pathname === '/') {
//       setActiveCaseStudy(null);
//       setIsNotFound(false);
//     } else {
//       setActiveCaseStudy(null);
//       setIsNotFound(true);
//     }
//     setIsMobileMenuOpen(false);
//     unlockScroll();
//   }, [location.pathname]);

//   const homepageScrollY = useRef(0);

//   const handleActiveCaseStudyChange = (project: typeof PROJECTS_DATA[0] | null) => {
//     if (project) {
//       homepageScrollY.current = window.scrollY;
//       navigate(`/project/${project.id}`);
//     } else {
//       setActiveCaseStudy(null); // Sync state change to mount homepage instantly
//       navigate('/');
//     }
//   };

//   useEffect(() => {
//     // If we transitioned from a case study page back to the homepage
//     if (!activeCaseStudy && location.pathname === '/') {
//       // Restore scroll position after a layout reflow
//       const restoreScroll = () => {
//         window.scrollTo(0, homepageScrollY.current);
//       };
//       requestAnimationFrame(() => {
//         requestAnimationFrame(restoreScroll);
//       });
//     }
//   }, [activeCaseStudy, location.pathname]);

//   const scrollSection = (id: string, behavior: ScrollBehavior = 'smooth') => {
//     let targetId = id;

//     if (id === 'selected-projects' || id === 'works') {
//       targetId = 'works';
//     } else if (id === 'contact-gate' || id === 'contact' || id === 'connect') {
//       targetId = 'contact';
//     } else if (id === 'top' || id === 'hero') {
//       targetId = 'hero';
//     } else if (id === 'about') {
//       targetId = 'about';
//     }

//     // Set manual scrolling mode to true to prevent IntersectionObserver state stutter
//     isManualScrolling.current = true;
//     if (manualScrollTimeoutRef.current) {
//       clearTimeout(manualScrollTimeoutRef.current);
//     }
//     manualScrollTimeoutRef.current = setTimeout(() => {
//       isManualScrolling.current = false;
//     }, 700);

//     const lenis = getLenis();
//     const effectiveDuration = shouldReduceMotion ? 0.01 : 0.75;
//     const effectiveBehavior = shouldReduceMotion ? 'auto' : behavior;

//     if (targetId === 'hero') {
//       setActiveSection('hero');
//       if (lenis && !shouldReduceMotion) {
//         lenis.scrollTo(0, { duration: effectiveDuration });
//       } else {
//         window.scrollTo({ top: 0, behavior: effectiveBehavior });
//       }
//     } else {
//       const element = document.getElementById(targetId);
//       if (element) {
//         setActiveSection(targetId);
//         if (lenis && !shouldReduceMotion) {
//           lenis.scrollTo(element, { duration: effectiveDuration, offset: 0 });
//         } else {
//           element.scrollIntoView({ behavior: effectiveBehavior, block: 'start' });
//         }
//       }
//     }
//   };

//   return (
//     <div className="relative min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] selection:bg-[var(--text-color)] selection:text-[var(--bg-color)] theme-transition overflow-x-hidden">

//       {/* Top sentinel for high-performance scroll/header-bg threshold tracking */}
//       <div id="top-sentinel" className="absolute top-0 left-0 w-full h-[15px] pointer-events-none z-0" />

//       {/* Subtle Global Scroll Progress Indicator */}
//       <ScrollProgressBar />

//       {/* Premium Minimalist Page Preloader Transition Overlay */}
//       <PageLoader loading={loading} />

//       {/* Persistent Global Editorial Header with flat high-contrast matte background past hero */}
//       {!isNotFound && (
//         <Header
//           theme={theme}
//           setTheme={setTheme}
//           activeSection={activeSection}
//           scrolledPastHero={scrolledPastHero}
//           isMobileMenuOpen={isMobileMenuOpen}
//           setIsMobileMenuOpen={setIsMobileMenuOpen}
//           handleNav={handleNav}
//           activeCaseStudy={activeCaseStudy}
//           mobileMenuToggleRef={mobileMenuToggleRef}
//           forceShowLogo={!!activeCaseStudy}
//           isNotFound={isNotFound}
//         />
//       )}

//       {/* Mobile Menu Overlay */}
//       {!isNotFound && (
//         <MobileMenu
//           isMobileMenuOpen={isMobileMenuOpen}
//           setIsMobileMenuOpen={setIsMobileMenuOpen}
//           activeSection={activeSection}
//           activeCaseStudy={activeCaseStudy}
//           handleNav={handleNav}
//         />
//       )}

//       {/* Immersive Pages Routing with Framer Motion transitions */}
//       {isNotFound ? (
//         <AnimatePresence mode="wait">
//           <motion.div
//             key="not-found-page"
//             initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
//             transition={{ duration: 0.45, ease: MOTION_CURVE_PREMIUM }}
//             className="w-full relative"
//           >
//             <NotFound handleNav={handleNav} />
//           </motion.div>
//         </AnimatePresence>
//       ) : (
//         <>
//           {/* Main Home Page remains persistently mounted for instantaneous, low-latency entry/return and scroll position retention */}
//           <div className="w-full relative" style={{ display: activeCaseStudy ? 'none' : 'block' }}>
//             {/* 1. Immersive Opening Fold */}
//             <section id="hero" className="w-full bg-[var(--bg-color)] transition-colors duration-300">
//               <OpeningExperience
//                 onCtaClick={() => scrollSection('contact', 'smooth')}
//                 loading={loading}
//               />
//             </section>

//             {/* Main Narrative Blocks */}
//             <main className="relative z-10 bg-transparent">
//               {/* 2. Editorial About Section */}
//               <AboutSection key="about-section" />

//               {/* 3. Selected Projects */}
//               <SelectedWork
//                 activeProject={activeCaseStudy}
//                 onActiveProjectChange={handleActiveCaseStudyChange}
//                 triggerWipe={triggerTransition}
//                 activeFilter={activeFilter}
//                 setActiveFilter={setActiveFilter}
//               />

//               {/* Editorial Manifesto Statement Banner */}
//               <StatementSection key="statement-section" />

//               {/* 4. Contact Entrance */}
//               <div className="w-full">
//                 <Contact key="contact-section" />
//               </div>
//             </main>
//           </div>

//           <AnimatePresence mode="wait">
//             {activeCaseStudy && (
//               <motion.div
//                 key={`case-study-page-${activeCaseStudy.id}`}
//                 initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
//                 transition={{ duration: 0.45, ease: MOTION_CURVE_PREMIUM }}
//                 className="w-full relative bg-[var(--bg-color)] min-h-screen z-40"
//               >
//                 <ProjectCaseStudy
//                   project={activeCaseStudy}
//                   activeFilter={activeFilter}
//                   onClose={() => handleActiveCaseStudyChange(null)}
//                 />
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </>
//       )}

//       {/* Contextual cursor-following pill interaction system */}
//       <ContextualCursorPill />

//       {/* Floating context-aware Back to Top Button */}
//       {!isNotFound && (
//         <BackToTop
//           showBackToTop={showBackToTop}
//           isFooterReached={isFooterReached}
//           isMobileMenuOpen={isMobileMenuOpen}
//           handleNav={handleNav}
//         />
//       )}

//       {/* Solid Minimalist Block Transition Overlay Layer */}
//       <TransitionOverlay step={transitionStep} theme={theme} />

//     </div>
//   );
// }
import NotFound from "./components/NotFound";

export default function App() {
  return <NotFound />;
}
