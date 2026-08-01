/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

interface BackToTopProps {
  showBackToTop: boolean;
  isFooterReached: boolean;
  isMobileMenuOpen: boolean;
  handleNav: (e: React.MouseEvent | React.KeyboardEvent | any, targetId: string) => void;
}

export default function BackToTop({
  showBackToTop,
  isFooterReached,
  isMobileMenuOpen,
  handleNav,
}: BackToTopProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {showBackToTop && !isMobileMenuOpen && (
        <motion.button
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={{
            hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
                staggerChildren: 0.14,
                delayChildren: 0.08
              }
            }
          }}
          onClick={(e) => handleNav(e, 'top')}
          aria-label="Scroll back to top of page"
          className="fixed bottom-8 md:bottom-10 right-4 md:right-8 z-50 hidden md:flex items-center gap-3.5 bg-transparent border-0 typo-mono-sub font-semibold text-[var(--text-dim)] hover:text-[var(--text-color)] opacity-50 hover:opacity-100 transition-all duration-300 ease-out cursor-pointer pointer-events-auto select-none group focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-color)] rounded px-2 py-1"
        >
          <div className="relative flex items-center justify-center h-[32px] w-[6px]">
            {/* Ultra-fine vertical line with entrance fade/scale */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scaleY: shouldReduceMotion ? 1 : 0 },
                visible: { 
                  opacity: 0.9, 
                  scaleY: 1,
                  transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } 
                }
              }}
              style={{ width: '1px', height: '32px', backgroundColor: 'currentColor', transformOrigin: 'bottom' }}
              className="group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
          <motion.span
            variants={{
              hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -4 },
              visible: { 
                opacity: 1, 
                x: 0,
                transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] } 
              }
            }}
          >
            Top
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
