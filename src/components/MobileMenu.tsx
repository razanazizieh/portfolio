import React, { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { MOTION_CURVE_PREMIUM } from "../utils/motion";
import { Project } from "../types";

interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeSection: string;
  activeCaseStudy: Project | null;
  handleNav: (
    e: React.SyntheticEvent | { preventDefault: () => void },
    targetId: string,
  ) => void;
}

const NAV_ITEMS = [
  { id: "about", label: "ABOUT" },
  { id: "works", label: "WORKS" },
  { id: "contact", label: "CONTACT" },
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
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  const handleLinkClick = (
    e: React.MouseEvent | React.TouchEvent,
    targetId: string,
  ) => {
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
            paddingLeft: "max(16px, 4vw)",
            paddingRight: "max(16px, 4vw)",
            touchAction: "manipulation",
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
                (item.id === "works" && !!activeCaseStudy) ||
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
                        ? "text-neutral-950 dark:text-neutral-50"
                        : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50"
                    }`}
                  >
                    <span
                      className={`font-display text-lg sm:text-xl font-medium tracking-tight uppercase leading-tight transition-transform duration-200 ease-out ${
                        isActive
                          ? "text-neutral-950 dark:text-neutral-50"
                          : "group-hover:translate-x-1"
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
