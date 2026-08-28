import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import gsap from "gsap";

export default function ContextualCursorPill() {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [activeLabel, setActiveLabel] = useState<string>("");
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(false);
  const activeLabelRef = useRef("");

  // GSAP quickTo setters for weight-based inertial physics
  const xTo = useRef<((value: number) => void) | null>(null);
  const yTo = useRef<((value: number) => void) | null>(null);

  useEffect(() => {
    // Detect touch / coarse pointer devices
    const mediaQuery = window.matchMedia("(hover: none) or (pointer: coarse)");
    setIsTouchDevice(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsTouchDevice(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMediaChange);
    }

    if (mediaQuery.matches || shouldReduceMotion) {
      return;
    }

    if (cursorRef.current) {
      // Set initial centering transform via GSAP
      gsap.set(cursorRef.current, {
        xPercent: -50,
        yPercent: -50,
        x: -100,
        y: -100,
      });

      // Initialize quickTo setters with cinematic easing curve
      xTo.current = gsap.quickTo(cursorRef.current, "x", {
        duration: 0.35,
        ease: "power3.out",
      });
      yTo.current = gsap.quickTo(cursorRef.current, "y", {
        duration: 0.35,
        ease: "power3.out",
      });
    }

    const handlePointerMove = (e: PointerEvent) => {
      if (xTo.current && yTo.current) {
        xTo.current(e.clientX);
        yTo.current(e.clientY);
      }

      const target = e.target as Element | null;
      if (!target) {
        if (isVisibleRef.current) {
          isVisibleRef.current = false;
          setIsVisible(false);
        }
        return;
      }

      // Check if pointer is within a designated contextual zone
      const zone = target.closest("[data-cursor]");
      if (zone) {
        const label = zone.getAttribute("data-cursor");
        if (label) {
          if (!isVisibleRef.current) {
            isVisibleRef.current = true;
            setIsVisible(true);
          }
          if (activeLabelRef.current !== label) {
            activeLabelRef.current = label;
            setActiveLabel(label);
          }
          return;
        }
      }

      if (isVisibleRef.current) {
        isVisibleRef.current = false;
        setIsVisible(false);
      }
    };

    const handleMouseLeave = () => {
      if (isVisibleRef.current) {
        isVisibleRef.current = false;
        setIsVisible(false);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave, {
      passive: true,
    });

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleMediaChange);
      }
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave,
      );
    };
  }, [shouldReduceMotion]);

  if (isTouchDevice || shouldReduceMotion) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform select-none"
      aria-hidden="true"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
        }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center justify-center px-3 py-1.5 bg-[#FF4500] text-white font-mono text-[11px] font-semibold tracking-[0.14em] uppercase leading-none rounded-none select-none text-center pointer-events-none"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={activeLabel}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block whitespace-nowrap leading-none"
          >
            {activeLabel}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
