import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

interface BackToTopProps {
  showBackToTop: boolean;
  isFooterReached: boolean;
  isMobileMenuOpen: boolean;
  handleNav: (
    e: React.MouseEvent | React.KeyboardEvent | any,
    targetId: string,
  ) => void;
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
                delayChildren: 0.08,
              },
            },
          }}
          onClick={(e) => handleNav(e, "top")}
          aria-label="Scroll back to top of page"
          className="fixed bottom-8 md:bottom-10 right-4 md:right-8 z-[75] hidden md:flex items-center bg-transparent border-0 font-mono text-xs uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50 transition-colors duration-200 cursor-pointer pointer-events-auto select-none group focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 py-1.5 px-2"
        >
          <motion.span
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            TOP
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
