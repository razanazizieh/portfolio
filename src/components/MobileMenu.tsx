// /**
//  * @license
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import React from 'react';
// import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
// import { getMenuVariants, getLinksContainerVariants, getMenuLinkVariants } from '../utils/motion';
// import { Project } from '../types';

// interface MobileMenuProps {
//   isMobileMenuOpen: boolean;
//   setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   activeSection: string;
//   activeCaseStudy: Project | null;
//   handleNav: (e: React.SyntheticEvent | { preventDefault: () => void }, targetId: string) => void;
// }

// const NAV_ITEMS = [
//   { id: 'about', label: 'ABOUT' },
//   { id: 'works', label: 'WORKS' },
//   { id: 'contact', label: 'CONTACT' },
// ] as const;

// export default function MobileMenu({
//   isMobileMenuOpen,
//   setIsMobileMenuOpen,
//   activeSection,
//   activeCaseStudy,
//   handleNav,
// }: MobileMenuProps) {
//   const shouldReduceMotion = useReducedMotion();

//   const menuVariants = getMenuVariants();
//   const linksContainerVariants = getLinksContainerVariants();
//   const menuLinkVariants = getMenuLinkVariants(shouldReduceMotion);

//   return (
//     <AnimatePresence>
//       {isMobileMenuOpen && (
//         <motion.div
//           id="mobile-menu"
//           role="dialog"
//           aria-modal="true"
//           aria-label="Navigation Menu"
//           variants={menuVariants}
//           initial="hidden"
//           animate="visible"
//           exit="exit"
//           className="fixed inset-0 z-40 bg-[var(--bg-color)] flex flex-col justify-between pt-28 pb-10 md:hidden text-left"
//         >
//           {/* Main Navigation Stack */}
//           <motion.nav 
//             variants={linksContainerVariants} 
//             className="flex-1 flex flex-col justify-center w-full px-[max(20px,4vw)] space-y-4 sm:space-y-6"
//           >
//             {NAV_ITEMS.map((item) => {
//               const isActive = (item.id === 'works' && !!activeCaseStudy) || (activeSection === item.id && !activeCaseStudy);

//               return (
//                 <motion.div 
//                   key={item.id}
//                   variants={menuLinkVariants} 
//                   className="overflow-hidden block py-1"
//                 >
//                   <a
//                     href={`#${item.id}`}
//                     onClick={(e) => {
//                       setIsMobileMenuOpen(false);
//                       handleNav(e, item.id);
//                     }}
//                     aria-label={`Navigate to ${item.id} section`}
//                     className={`group inline-flex items-center gap-3 py-1 text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight uppercase transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B00] rounded cursor-pointer select-none ${
//                       isActive
//                         ? 'text-[#FF3B00] dark:text-[#FF3B00] opacity-100'
//                         : 'text-[#0A0A0A] dark:text-white opacity-80 hover:opacity-100 hover:text-[#FF3B00] dark:hover:text-[#FF3B00]'
//                     }`}
//                   >
//                     <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
//                       {item.label}
//                     </span>
//                     {isActive && (
//                       <span className="w-2 h-2 rounded-full bg-[#FF3B00] inline-block shrink-0" aria-hidden="true" />
//                     )}
//                   </a>
//                 </motion.div>
//               );
//             })}
//           </motion.nav>

//           {/* Clean Swiss Footer */}
//           <motion.div 
//             variants={menuLinkVariants} 
//             className="w-full px-[max(20px,4vw)] pb-4 flex items-center"
//           >
//             <span className="font-mono text-[10px] tracking-widest uppercase text-neutral-400 dark:text-neutral-600">
//               2026 © — ALL RIGHTS RESERVED.
//             </span>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }







/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { MOTION_CURVE_PREMIUM } from '../utils/motion';
import { Project } from '../types';

interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeSection: string;
  activeCaseStudy: Project | null;
  handleNav: (e: React.SyntheticEvent | { preventDefault: () => void }, targetId: string) => void;
}

const NAV_ITEMS = [
  { id: 'about', label: 'ABOUT' },
  { id: 'works', label: 'WORKS' },
  { id: 'contact', label: 'CONTACT' },
] as const;

export default function MobileMenu({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  activeSection,
  activeCaseStudy,
  handleNav,
}: MobileMenuProps) {
  const shouldReduceMotion = useReducedMotion();

  // Restrained overlay transition - quiet fade without heavy movement
  const overlayVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.24,
        ease: MOTION_CURVE_PREMIUM,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.18,
        ease: MOTION_CURVE_PREMIUM,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.04,
        delayChildren: shouldReduceMotion ? 0 : 0.03,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 6,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.3,
        ease: MOTION_CURVE_PREMIUM,
      },
    },
  };

  // Close on Escape key
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent | React.TouchEvent, targetId: string) => {
    setIsMobileMenuOpen(false);
    handleNav(e, targetId);
  };

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-40 bg-[var(--bg-color)] text-[var(--text-color)] flex flex-col justify-start pt-24 sm:pt-28 pb-8 md:hidden text-left select-none overflow-y-auto"
          style={{
            paddingLeft: 'max(16px, 4vw)',
            paddingRight: 'max(16px, 4vw)',
            touchAction: 'manipulation',
          }}
        >
          {/* Refined Compact Editorial Navigation */}
          <motion.nav
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start gap-2 sm:gap-3 w-full py-4 text-left"
          >
            {NAV_ITEMS.map((item) => {
              const isActive =
                (item.id === 'works' && !!activeCaseStudy) ||
                (activeSection === item.id && !activeCaseStudy);

              return (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className="w-full text-left"
                >
                  <button
                    type="button"
                    onClick={(e) => handleLinkClick(e, item.id)}
                    aria-label={`Navigate to ${item.label} section`}
                    className={`min-h-[44px] py-1.5 px-2 -ml-2 flex items-center transition-colors duration-150 ease-out focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 cursor-pointer select-none text-left group ${
                      isActive
                        ? 'text-neutral-950 dark:text-neutral-50'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50'
                    }`}
                  >
                    <span
                      className={`font-display text-lg sm:text-xl font-medium tracking-tight uppercase leading-tight transition-transform duration-200 ease-out ${
                        isActive
                          ? 'text-neutral-950 dark:text-neutral-50'
                          : 'group-hover:translate-x-1'
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
