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
import { getMenuVariants, getLinksContainerVariants, getMenuLinkVariants } from '../utils/motion';
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

  const menuVariants = getMenuVariants(shouldReduceMotion);
  const linksContainerVariants = getLinksContainerVariants(shouldReduceMotion);
  const menuLinkVariants = getMenuLinkVariants(shouldReduceMotion);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isMobileMenuOpen]);

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

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-40 bg-[#FAFAFA] dark:bg-[#0A0A0A] flex flex-col justify-between pt-28 pb-10 md:hidden text-left select-none"
          style={{
            paddingLeft: 'max(20px, 4vw)',
            paddingRight: 'max(20px, 4vw)',
          }}
        >
          {/* Confident Editorial Mobile Navigation Stack */}
          <motion.nav
            variants={linksContainerVariants}
            className="flex-1 flex flex-col justify-center w-full space-y-6 sm:space-y-7 text-left"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = (item.id === 'works' && !!activeCaseStudy) || (activeSection === item.id && !activeCaseStudy);

              return (
                <motion.div
                  key={item.id}
                  variants={menuLinkVariants}
                  className="w-full text-left overflow-hidden"
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      setIsMobileMenuOpen(false);
                      handleNav(e, item.id);
                    }}
                    aria-label={`Navigate to ${item.label} section`}
                    className={`inline-block py-1 font-display text-2xl sm:text-3xl font-medium tracking-tight uppercase transition-colors duration-150 ease-out focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 cursor-pointer select-none ${
                      isActive
                        ? 'text-neutral-950 dark:text-neutral-50 font-semibold'
                        : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50'
                    }`}
                  >
                    {item.label}
                  </a>
                </motion.div>
              );
            })}
          </motion.nav>

          {/* Bottom Monospace Metadata (No decorative dividers or separators) */}
          <motion.div
            variants={menuLinkVariants}
            className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
          >
            <div className="font-mono text-[11px] sm:text-xs tracking-[0.12em] leading-normal uppercase text-neutral-500 dark:text-neutral-400 font-medium">
              M.SC. MATHEMATICS &amp; CS
            </div>
            <div className="font-mono text-[11px] sm:text-xs tracking-[0.12em] leading-normal uppercase text-neutral-400 dark:text-neutral-500">
              PORTFOLIO &lsquo;26
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
