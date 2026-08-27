// /**
//  * @license
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import React from 'react';
// import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
// import { Project } from '../types';

// interface HeaderProps {
//   theme: 'dark' | 'light';
//   setTheme: React.Dispatch<React.SetStateAction<'dark' | 'light'>>;
//   activeSection: string;
//   scrolledPastHero: boolean;
//   isMobileMenuOpen: boolean;
//   setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   handleNav: (e: React.SyntheticEvent | { preventDefault: () => void }, targetId: string) => void;
//   activeCaseStudy: Project | null;
//   mobileMenuToggleRef: React.RefObject<HTMLButtonElement | null>;
//   logoOpacity: any;
//   logoY: any;
//   forceShowLogo?: boolean;
//   isNotFound?: boolean;
// }

// export default function Header({
//   theme,
//   setTheme,
//   activeSection,
//   scrolledPastHero,
//   isMobileMenuOpen,
//   setIsMobileMenuOpen,
//   handleNav,
//   activeCaseStudy,
//   mobileMenuToggleRef,
//   logoOpacity,
//   logoY,
//   forceShowLogo = false,
//   isNotFound = false
// }: HeaderProps) {
//   if (isNotFound) {
//     return null;
//   }

//   const shouldReduceMotion = useReducedMotion();
//   const [hoveredNav, setHoveredNav] = React.useState<string | null>(null);

//   const getNavOpacity = (id: string, isActive?: boolean) => {
//     if (hoveredNav !== null) {
//       return hoveredNav === id ? 1 : 0.4;
//     }
//     if (isActive) return 1;
//     return 0.6;
//   };

//   const getNavFontWeight = (id: string, isActive?: boolean) => {
//     if (hoveredNav !== null) {
//       return hoveredNav === id ? 700 : 500;
//     }
//     return isActive ? 700 : 500;
//   };

//   return (
//     <header 
//       style={{
//         display: 'flex',
//         background: (scrolledPastHero || !!activeCaseStudy)
//           ? theme === 'light' ? 'rgba(255, 255, 255, 0.96)' : 'rgba(0, 0, 0, 0.96)'
//           : 'transparent',
//         paddingLeft: "max(16px, 4vw)",
//         paddingRight: "max(16px, 4vw)",
//       }}
//       className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-5 select-none transition-all duration-300 ${
//         (scrolledPastHero || !!activeCaseStudy)
//           ? 'border-b border-[var(--border-color)] text-[var(--text-color)]' 
//           : 'text-[var(--text-color)]'
//       }`}
//     >
//       {/* Top-left Logo 'RAZAN AZIZIEH' - Conditionally visible when scrolled past Hero */}
//       <div
//         id="logo-name"
//         role="button"
//         tabIndex={0}
//         aria-label="Razan Azizieh - Scroll back to top of the page"
//         onClick={(e) => handleNav(e, activeCaseStudy ? 'works' : 'top')}
//         onKeyDown={(e) => {
//           if (e.key === 'Enter') {
//             handleNav(e, activeCaseStudy ? 'works' : 'top');
//           }
//         }}
//         className={`branding-container name logo-container relative pointer-events-auto cursor-pointer interactive-hover focus:outline-none rounded px-2 py-1 transition-opacity duration-300 ease-in-out group ${
//           (scrolledPastHero || !!activeCaseStudy || forceShowLogo)
//             ? 'opacity-100 pointer-events-auto'
//             : 'opacity-0 pointer-events-none'
//         }`}
//       >
//         <span className="font-sans font-bold tracking-[0.1em] uppercase text-xs sm:text-sm md:text-base text-[var(--text-color)] group-hover:opacity-60 transition-opacity duration-300 inline-flex items-center">
//           RΛZΛN ΛZIZIEH
//         </span>
//       </div>

//       {/* Minimalist text links (About, Works, Connect, Theme) using semantic <nav> */}
//       <nav 
//         aria-label="Primary Navigation" 
//         onMouseLeave={() => setHoveredNav(null)}
//         className="hidden md:flex items-center gap-8 typo-mono-filter pointer-events-auto transition-all duration-300 ease-out"
//       >
//         {activeCaseStudy ? (
//           <a
//             href="#works"
//             onClick={(e) => handleNav(e, 'works')}
//             onMouseEnter={() => setHoveredNav('back')}
//             aria-label="Back to Works"
//             style={{ 
//               opacity: getNavOpacity('back', true),
//               fontWeight: getNavFontWeight('back', true),
//               color: 'var(--text-color)',
//             }}
//             className="relative pointer-events-auto cursor-pointer bg-transparent border-0 typo-mono-sub transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-color)] px-2 py-1 rounded block text-xs tracking-wider uppercase before:absolute before:content-[''] before:-inset-y-3 before:-inset-x-2 before:block"
//           >
//             Back to Works ✕
//           </a>
//         ) : (
//           <>
//             <a
//               href="#about"
//               onClick={(e) => handleNav(e, 'about')}
//               onMouseEnter={() => setHoveredNav('about')}
//               aria-label="Navigate to about section"
//               style={{ 
//                 opacity: getNavOpacity('about', activeSection === 'about' && !activeCaseStudy),
//                 fontWeight: getNavFontWeight('about', activeSection === 'about' && !activeCaseStudy),
//                 color: 'var(--text-color)',
//               }}
//               className="relative pointer-events-auto cursor-pointer bg-transparent border-0 typo-mono-sub focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-color)] px-2 py-1 rounded block transition-all duration-200 ease-in-out before:absolute before:content-[''] before:-inset-y-3 before:-inset-x-2 before:block"
//             >
//               About
//             </a>

//             <a
//               href="#works"
//               onClick={(e) => handleNav(e, 'works')}
//               onMouseEnter={() => setHoveredNav('works')}
//               aria-label="Navigate to works section"
//               style={{ 
//                 opacity: getNavOpacity('works', (activeSection === 'works' || !!activeCaseStudy) && !activeCaseStudy),
//                 fontWeight: getNavFontWeight('works', (activeSection === 'works' || !!activeCaseStudy) && !activeCaseStudy),
//                 color: 'var(--text-color)',
//               }}
//               className="relative pointer-events-auto cursor-pointer bg-transparent border-0 typo-mono-sub focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-color)] px-2 py-1 rounded block transition-all duration-200 ease-in-out before:absolute before:content-[''] before:-inset-y-3 before:-inset-x-2 before:block"
//             >
//               Works
//             </a>

//             <a
//               href="#contact"
//               onClick={(e) => handleNav(e, 'contact')}
//               onMouseEnter={() => setHoveredNav('contact')}
//               aria-label="Navigate to connect section"
//               style={{ 
//                 opacity: getNavOpacity('contact', activeSection === 'contact' && !activeCaseStudy),
//                 fontWeight: getNavFontWeight('contact', activeSection === 'contact' && !activeCaseStudy),
//                 color: 'var(--text-color)',
//               }}
//               className="relative pointer-events-auto cursor-pointer bg-transparent border-0 typo-mono-sub focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-color)] px-2 py-1 rounded block transition-all duration-200 ease-in-out before:absolute before:content-[''] before:-inset-y-3 before:-inset-x-2 before:block"
//             >
//               Connect
//             </a>
//           </>
//         )}

//         <button
//           onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
//           onMouseEnter={() => setHoveredNav('theme')}
//           aria-label="Switch visual theme scale"
//           style={{ 
//             opacity: getNavOpacity('theme', false),
//             fontWeight: getNavFontWeight('theme', false),
//             color: 'var(--text-color)',
//           }}
//           className="relative pointer-events-auto cursor-pointer bg-transparent border-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-color)] focus-visible:text-[var(--text-color)] px-2 py-1 rounded flex items-center justify-center transition-all duration-200 ease-in-out before:absolute before:content-[''] before:-inset-y-3 before:-inset-x-2 before:block"
//         >
//           <AnimatePresence mode="wait" initial={false}>
//             <motion.div
//               key={theme}
//               initial={shouldReduceMotion ? { opacity: 0 } : { rotate: -45, opacity: 0, scale: 0.82 }}
//               animate={shouldReduceMotion ? { opacity: 1 } : { rotate: 0, opacity: 1, scale: 1 }}
//               transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
//               className="flex items-center justify-center font-sans text-sm leading-none select-none font-normal"
//             >
//               ◐
//             </motion.div>
//           </AnimatePresence>
//         </button>
//       </nav>

//       {/* Compact Mobile Menu Trigger & Switch */}
//       <div className="md:hidden flex items-center gap-2 xs:gap-3 sm:gap-4 pointer-events-auto">
//         <button
//           onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
//           aria-label="Switch visual theme scale"
//           className="text-[var(--text-dim)] opacity-60 hover:opacity-100 hover:text-[var(--text-color)] w-11 h-11 transition-all duration-300 ease-out flex items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-color)] focus-visible:text-[var(--text-color)] rounded-md"
//         >
//           <AnimatePresence mode="wait" initial={false}>
//             <motion.div
//               key={theme}
//               initial={shouldReduceMotion ? { opacity: 0 } : { rotate: -45, opacity: 0, scale: 0.82 }}
//               animate={shouldReduceMotion ? { opacity: 1 } : { rotate: 0, opacity: 1, scale: 1 }}
//               transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
//               className="flex items-center justify-center font-sans text-sm leading-none select-none font-normal"
//             >
//               ◐
//             </motion.div>
//           </AnimatePresence>
//         </button>
//         {activeCaseStudy ? (
//           <button
//             onClick={(e) => handleNav(e, 'works')}
//             aria-label="Back to Works"
//             className="typo-mono-sub text-[var(--text-dim)] opacity-60 hover:opacity-100 hover:text-[var(--text-color)] transition-all duration-300 ease-out h-11 px-2 uppercase flex items-center justify-center gap-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-color)] rounded-md font-medium text-xs tracking-wider cursor-pointer"
//           >
//             Back ✕
//           </button>
//         ) : (
//           <button
//             ref={mobileMenuToggleRef}
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
//             aria-expanded={isMobileMenuOpen}
//             aria-controls="mobile-menu"
//             className="typo-mono-sub text-[var(--text-dim)] opacity-60 hover:opacity-100 hover:text-[var(--text-color)] h-11 min-w-[44px] px-2 uppercase flex items-center justify-center gap-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-color)] focus-visible:text-[var(--text-color)] rounded-md transition-all duration-300"
//           >
//             {isMobileMenuOpen ? 'CLOSE' : 'MENU'}
//           </button>
//         )}
//       </div>

//     </header>
//   );
// } 


/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useReducedMotion } from 'motion/react';
import { Project } from '../types';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  theme: 'dark' | 'light';
  setTheme: React.Dispatch<React.SetStateAction<'dark' | 'light'>>;
  activeSection: string;
  scrolledPastHero: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleNav: (e: React.SyntheticEvent | { preventDefault: () => void }, targetId: string) => void;
  activeCaseStudy: Project | null;
  mobileMenuToggleRef: React.RefObject<HTMLButtonElement | null>;
  forceShowLogo?: boolean;
  isNotFound?: boolean;
}

const navLinks = ["ABOUT", "WORKS", "CONTACT"] as const;

export default function Header({
  theme,
  setTheme,
  activeSection,
  scrolledPastHero,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  handleNav,
  activeCaseStudy,
  mobileMenuToggleRef,
  forceShowLogo = false,
  isNotFound = false
}: HeaderProps) {
  if (isNotFound) {
    return null;
  }

  const shouldReduceMotion = useReducedMotion();
  const [hoveredNav, setHoveredNav] = React.useState<string | null>(null);

  const getNavOpacity = (id: string, isActive?: boolean) => {
    if (hoveredNav !== null) {
      return hoveredNav === id ? 1 : 0.4;
    }
    if (isActive) return 1;
    return 0.6;
  };

  const getNavFontWeight = (id: string, isActive?: boolean) => {
    if (hoveredNav !== null) {
      return hoveredNav === id ? 700 : 500;
    }
    return isActive ? 700 : 500;
  };

  return (
    <header 
      style={{
        display: 'flex',
        background: (scrolledPastHero || !!activeCaseStudy)
          ? theme === 'light' ? 'rgba(255, 255, 255, 0.96)' : 'rgba(10, 10, 10, 0.96)'
          : 'transparent',
        paddingLeft: "max(16px, 4vw)",
        paddingRight: "max(16px, 4vw)",
      }}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-5 select-none transition-all duration-300 ${
        (scrolledPastHero || !!activeCaseStudy)
          ? 'text-[var(--text-color)] backdrop-blur-md' 
          : 'text-[var(--text-color)]'
      }`}
    >
      {/* Top-left Logo 'RAZAN AZIZIEH' - Pure Editorial Typographic Object */}
      <div
        id="logo-name"
        role="button"
        tabIndex={0}
        aria-label="Razan Azizieh - Scroll back to top of the page"
        onClick={(e) => handleNav(e, activeCaseStudy ? 'works' : 'top')}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleNav(e, activeCaseStudy ? 'works' : 'top');
          }
        }}
        className={`branding-container name logo-container relative pointer-events-auto cursor-pointer interactive-hover focus:outline-none rounded px-2 py-1 transition-opacity duration-300 ease-in-out group ${
          (scrolledPastHero || !!activeCaseStudy || forceShowLogo || isMobileMenuOpen)
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <span className="font-display font-semibold tracking-tight uppercase text-xs sm:text-sm md:text-base text-neutral-950 dark:text-neutral-50 group-hover:opacity-60 transition-opacity duration-200 inline-block select-none">
          RAZAN AZIZIEH
        </span>
      </div>

      {/* Minimalist text links (ABOUT, WORKS, CONTACT, Theme) using semantic <nav> */}
      <nav 
        aria-label="Primary Navigation" 
        onMouseLeave={() => setHoveredNav(null)}
        className="hidden md:flex items-center gap-7 lg:gap-8 font-mono text-[11px] tracking-[0.12em] uppercase pointer-events-auto transition-all duration-300 ease-out"
      >
        {activeCaseStudy ? (
          <a
            href="#works"
            onClick={(e) => handleNav(e, 'works')}
            onMouseEnter={() => setHoveredNav('back')}
            aria-label="Back to Works"
            style={{ 
              opacity: getNavOpacity('back', true),
              fontWeight: getNavFontWeight('back', true),
            }}
            className="relative pointer-events-auto cursor-pointer bg-transparent border-0 transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 px-2 py-1 rounded block text-[11px] tracking-[0.12em] uppercase text-neutral-950 dark:text-neutral-50 hover:opacity-100"
          >
            BACK TO WORKS
          </a>
        ) : (
          navLinks.map((label) => {
            const targetId = label.toLowerCase();
            const isActive = activeSection === targetId || (targetId === 'works' && !!activeCaseStudy);

            return (
              <a
                key={label}
                href={`#${targetId}`}
                onClick={(e) => handleNav(e, targetId)}
                onMouseEnter={() => setHoveredNav(targetId)}
                aria-label={`Navigate to ${targetId} section`}
                style={{ 
                  opacity: getNavOpacity(targetId, isActive),
                  fontWeight: getNavFontWeight(targetId, isActive),
                }}
                className={`relative pointer-events-auto bg-transparent border-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 px-2 py-1 rounded block transition-all duration-200 ease-in-out text-[11px] uppercase tracking-[0.12em] ${
                  isActive 
                    ? 'text-neutral-950 dark:text-neutral-50' 
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50'
                }`}
              >
                {label}
              </a>
            );
          })
        )}

        <ThemeToggle
          theme={theme}
          setTheme={setTheme}
          onMouseEnter={() => setHoveredNav('theme')}
          style={{ 
            opacity: getNavOpacity('theme', false),
            fontWeight: getNavFontWeight('theme', false),
          }}
          className="px-2 py-1 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50"
        />
      </nav>

      {/* Compact Mobile Menu Trigger & Switch */}
      <div className="md:hidden flex items-center gap-2 xs:gap-3 sm:gap-4 pointer-events-auto">
        <ThemeToggle
          theme={theme}
          setTheme={setTheme}
          className="w-11 h-11 opacity-60 hover:opacity-100 rounded-md text-neutral-950 dark:text-neutral-50"
        />
        {activeCaseStudy ? (
          <button
            onClick={(e) => handleNav(e, 'works')}
            aria-label="Back to Works"
            className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50 transition-colors duration-200 h-11 px-2 flex items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 rounded-md cursor-pointer select-none"
          >
            BACK
          </button>
        ) : (
          <button
            ref={mobileMenuToggleRef}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase transition-colors duration-200 h-11 min-w-[44px] px-2 flex items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 rounded-md cursor-pointer select-none text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50"
          >
            {isMobileMenuOpen ? 'CLOSE' : 'MENU'}
          </button>
        )}
      </div>

    </header>
  );
}
