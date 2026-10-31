/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * Global Scroll Progress Indicator
 * Fixed 2px progress bar along the very top edge.
 * Carries data-chrome and data-scroll-progress.
 * Hidden on 404 route and while the page is not scrollable.
 */
export function ScrollProgress() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const [isScrollable, setIsScrollable] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const checkState = () => {
      const scrollable =
        document.documentElement.scrollHeight > window.innerHeight + 4;
      setIsScrollable(scrollable);
      setIsMenuOpen(document.body.dataset.mobileMenu === "open");
    };

    checkState();
    window.addEventListener("resize", checkState, { passive: true });
    window.addEventListener("scroll", checkState, { passive: true });

    let observer: MutationObserver | null = null;
    if (document.body) {
      observer = new MutationObserver(checkState);
      observer.observe(document.body, { attributes: true, attributeFilter: ["data-mobile-menu"], childList: true, subtree: true });
    }

    return () => {
      window.removeEventListener("resize", checkState);
      window.removeEventListener("scroll", checkState);
      observer?.disconnect();
    };
  }, []);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 35,
    restDelta: 0.001,
  });

  if (shouldReduceMotion || !isScrollable || isMenuOpen) return null;

  return (
    <motion.div
      data-chrome
      data-scroll-progress
      aria-hidden="true"
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--ink)] z-[80] pointer-events-none"
    />
  );
}

export default ScrollProgress;
