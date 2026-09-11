import React, { useState, useRef, useCallback, useEffect } from "react";
import { useReducedMotion } from "motion/react";

interface CaseStudyTitleProps {
  title: string;
  className?: string;
  delay?: number;
}

// Quiet architectural uppercase harmonic glyphs for subtle typesetting settling
const HARMONIC_GLYPHS = ["A", "C", "E", "H", "I", "L", "N", "O", "R", "S", "T"];

export default function CaseStudyTitle({
  title,
  className = "",
}: CaseStudyTitleProps) {
  const shouldReduceMotion = useReducedMotion();
  const [displayChars, setDisplayChars] = useState<string[]>(() =>
    title.split(""),
  );
  const isAnimatingRef = useRef(false);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const isTouchDeviceRef = useRef(false);

  // Sync state if project title prop changes
  useEffect(() => {
    setDisplayChars(title.split(""));
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    isAnimatingRef.current = false;
  }, [title]);

  // Touch device check
  useEffect(() => {
    if (typeof window !== "undefined") {
      isTouchDeviceRef.current =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;
    }
  }, []);

  const cleanup = useCallback(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    isAnimatingRef.current = false;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const triggerRecomposition = useCallback(() => {
    // Respect reduced motion or touch devices
    if (shouldReduceMotion || isTouchDeviceRef.current) {
      setDisplayChars(title.split(""));
      return;
    }

    // Do not interrupt active animation or loop continuously
    if (isAnimatingRef.current) {
      return;
    }
    isAnimatingRef.current = true;

    cleanup();

    const originalChars = title.split("");
    const totalLength = originalChars.length;
    const totalFrames = 10;
    const frameInterval = 30; // ~300ms total duration
    let currentFrame = 0;

    intervalIdRef.current = setInterval(() => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      const settledCount = Math.floor(progress * totalLength);

      const nextChars = originalChars.map((char, index) => {
        // Punctuation and whitespace remain strictly fixed
        if (
          char === " " ||
          char === "/" ||
          char === "-" ||
          char === "—" ||
          char === "•"
        ) {
          return char;
        }

        // Characters before current wave progress have permanently locked into place
        if (index < settledCount) {
          return char;
        }

        // Active transition window: characters briefly settle through a harmonic glyph
        if (index === settledCount || index === settledCount + 1) {
          const charCode = char.charCodeAt(0);
          const glyphIdx =
            (charCode + currentFrame + index) % HARMONIC_GLYPHS.length;
          return HARMONIC_GLYPHS[glyphIdx];
        }

        // Trailing characters remain visible until the wave reaches them
        return char;
      });

      setDisplayChars(nextChars);

      if (currentFrame >= totalFrames) {
        cleanup();
        setDisplayChars(originalChars);
      }
    }, frameInterval);
  }, [title, shouldReduceMotion, cleanup]);

  const handlePointerEnter = useCallback(() => {
    triggerRecomposition();
  }, [triggerRecomposition]);

  return (
    <h1
      aria-label={title}
      onMouseEnter={handlePointerEnter}
      className={`select-text inline-block cursor-default will-change-contents ${className}`}
    >
      <span className="inline-flex flex-wrap select-text">
        {displayChars.map((char, index) => (
          <span key={index} className="inline-block select-text">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </h1>
  );
}
