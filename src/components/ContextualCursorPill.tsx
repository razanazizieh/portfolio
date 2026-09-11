import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import gsap from "gsap";

interface ContextualCursorPillProps {
  disabled?: boolean;
}

const isTouchOrCoarseDevice = () => {
  if (typeof window === "undefined") return true;
  const isCoarse =
    window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
    window.matchMedia("(pointer: coarse)").matches;
  const isSmallScreen = window.innerWidth < 768;
  const hasTouchCapability =
    "ontouchstart" in window ||
    (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
  return isCoarse || isSmallScreen || Boolean(hasTouchCapability);
};

export default function ContextualCursorPill({
  disabled = false,
}: ContextualCursorPillProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [activeLabel, setActiveLabel] = useState<string>("");
  const [isTouchDevice, setIsTouchDevice] = useState(isTouchOrCoarseDevice);

  const cursorRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(false);
  const activeLabelRef = useRef("");
  const isNameHoveredRef = useRef(false);

  // GSAP quickTo setters for weight-based inertial physics
  const xTo = useRef<((value: number) => void) | null>(null);
  const yTo = useRef<((value: number) => void) | null>(null);

  useEffect(() => {
    const checkTouch = () => {
      const touch = isTouchOrCoarseDevice();
      setIsTouchDevice(touch);
      if (touch) {
        if (isVisibleRef.current) {
          isVisibleRef.current = false;
          setIsVisible(false);
        }
      }
      return touch;
    };

    if (disabled) {
      if (isVisibleRef.current) {
        isVisibleRef.current = false;
        setIsVisible(false);
      }
      return;
    }

    if (checkTouch() || shouldReduceMotion) {
      return;
    }

    // Detect touch / coarse pointer devices & responsive window resize
    const mediaQuery = window.matchMedia("(hover: none) and (pointer: coarse)");
    const handleMediaChange = () => {
      checkTouch();
    };

    window.addEventListener("resize", handleMediaChange, { passive: true });
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMediaChange);
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

    const showCursor = (label: string) => {
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
      if (activeLabelRef.current !== label) {
        activeLabelRef.current = label;
        setActiveLabel(label);
      }
    };

    const hideCursor = () => {
      if (isVisibleRef.current) {
        isVisibleRef.current = false;
        setIsVisible(false);
      }
    };

    const handleCustomPillUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{
        label?: string | null;
        active?: boolean;
      }>;
      if (customEvent.detail) {
        isNameHoveredRef.current = !!customEvent.detail.active;
        if (customEvent.detail.active && customEvent.detail.label) {
          showCursor(customEvent.detail.label);
        }
      }
    };

    window.addEventListener("cursor-pill-update", handleCustomPillUpdate);

    const handleMouseMove = (e: MouseEvent) => {
      if (disabled) {
        hideCursor();
        return;
      }

      if (xTo.current && yTo.current) {
        xTo.current(e.clientX);
        yTo.current(e.clientY);
      }

      const target = e.target as Element | null;
      if (!target) {
        hideCursor();
        return;
      }

      // Check if user has active text selection — if text is selected, never conflict with native text selection
      const selection = window.getSelection();
      if (
        selection &&
        !selection.isCollapsed &&
        selection.toString().trim().length > 0
      ) {
        hideCursor();
        return;
      }

      // Check for explicit suppressed zones (case study modal, navigation links, buttons, inputs)
      const caseStudy = target.closest(
        '[data-case-study="true"], [data-no-cursor="true"]',
      );
      const interactiveControl = target.closest(
        'header, nav, button, a, input, textarea, select, [role="link"], [data-suppress-cursor]',
      );

      if (caseStudy || interactiveControl) {
        hideCursor();
        return;
      }

      // 1. NAME HOVER STATE: Strictly over the title container "RAZAN AZIZIEH"
      const heroName = target.closest('[data-hero-name="true"]');
      if (heroName) {
        showCursor("HEY, WELCOME TO MY PORTFOLIO");
        return;
      }

      // 2. HERO CANVAS HOVER STATE: Anywhere else inside the Hero section canvas (outside the name)
      const heroCanvas = target.closest(
        '#hero, [data-hero-section="true"], [data-hero-canvas="true"], [data-hero-interaction-canvas="true"]',
      );
      if (heroCanvas) {
        showCursor("LET'S TALK");
        return;
      }

      // 3. PROJECT CARDS HOVER STATE: When hovering over any Project card
      const projectCard = target.closest(
        '[data-project-card="true"], .project-card',
      );
      if (projectCard) {
        showCursor("VIEW");
        return;
      }

      // 4. GLOBAL DEFAULT: Outside of these designated areas, hide completely and use OS pointer
      hideCursor();
    };

    const handleMouseLeave = () => {
      hideCursor();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave, {
      passive: true,
    });

    return () => {
      window.removeEventListener("resize", handleMediaChange);
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleMediaChange);
      }
      window.removeEventListener("cursor-pill-update", handleCustomPillUpdate);
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave,
      );
    };
  }, [shouldReduceMotion, disabled]);

  if (isTouchDevice || shouldReduceMotion || disabled) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      data-custom-cursor="true"
      className="hidden md:block fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform select-none custom-cursor-pill"
      aria-hidden="true"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center justify-center px-3 py-1.5 bg-[#FF4500] text-white font-mono text-[11px] font-normal tracking-[0.14em] uppercase leading-none rounded-none select-none text-center pointer-events-none"
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
