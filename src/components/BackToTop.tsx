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
          className="fixed bottom-8 md:bottom-10 right-4 md:right-8 z-50 hidden md:flex items-center gap-3 bg-transparent border-0 font-mono text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 hover:text-[#FF4500] dark:hover:text-[#FF4500] focus:text-[#FF4500] dark:focus:text-[#FF4500] transition-colors duration-200 cursor-pointer pointer-events-auto select-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4500] rounded py-1 px-1.5"
        >
          <div className="relative flex items-center justify-center h-[28px] w-[4px]">
            {/* Ultra-fine vertical line with entrance fade/scale */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scaleY: shouldReduceMotion ? 1 : 0 },
                visible: {
                  opacity: 0.7,
                  scaleY: 1,
                  transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              style={{
                width: "1px",
                height: "28px",
                backgroundColor: "currentColor",
                transformOrigin: "bottom",
              }}
              className="transition-colors duration-200"
            />
          </div>
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
