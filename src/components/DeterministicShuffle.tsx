import React, { useState, useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "motion/react";

/**
 * In-place Fisher-Yates character rearrange function.
 * Swaps ONLY the non-space index positions of the exact original characters array.
 * Zero external characters, lookup tables, or string code conversions.
 */
const getInPlaceRearrangedText = (originalText: string, stage: number): string => {
  if (stage === 0) return originalText; // Default state

  const chars = originalText.split('');
  const nonSpaceIndices = chars
    .map((char, index) => (char !== ' ' ? index : -1))
    .filter((index) => index !== -1);

  if (nonSpaceIndices.length <= 1) return originalText;
  // Create a copy of indices to scramble
  const scrambledIndices = [...nonSpaceIndices];

  // Fisher-Yates swap ONLY on non-space index positions
  for (let i = scrambledIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [scrambledIndices[i], scrambledIndices[j]] = [scrambledIndices[j], scrambledIndices[i]];
  }

  // Reconstruct array strictly from original characters at new swapped positions
  const result = [...chars];
  nonSpaceIndices.forEach((originalIndex, i) => {
    result[originalIndex] = chars[scrambledIndices[i]];
  });

  return result.join('');
};

const isTouchDevice = (): boolean => {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(hover: none), (pointer: coarse)").matches
  );
};

export interface DeterministicShuffleProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

/**
 * Reusable DeterministicShuffle component
 * Rearranges only the original characters of a string on hover using in-place index swaps.
 * Strictly preserves all whitespace and resolves back to originalText.
 * Explicitly disables CSS font ligatures so fonts don't morph character combinations.
 */
export function DeterministicShuffle({
  text,
  as: Component = "span",
  className = "",
  style,
  id,
}: DeterministicShuffleProps) {
  const [displayText, setDisplayText] = useState(text);
  const isShufflingRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Keep displayText in sync if text prop updates
  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (shouldReduceMotion || isTouchDevice() || isShufflingRef.current) return;

    isShufflingRef.current = true;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Frame 1: In-place rearranged original characters
    setDisplayText(getInPlaceRearrangedText(text, 1));

    let frame = 1;
    const maxFrames = 2; // Frame 1, Frame 2, then Frame 0 (exact originalText)
    const frameInterval = 75; // 75ms per frame (~150ms total before settling)

    timerRef.current = setInterval(() => {
      frame++;
      if (frame > maxFrames) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        setDisplayText(getInPlaceRearrangedText(text, 0)); // strictly originalText
        isShufflingRef.current = false;
        return;
      }
      setDisplayText(getInPlaceRearrangedText(text, frame));
    }, frameInterval);
  }, [text, shouldReduceMotion]);

  return (
    <Component
      id={id}
      className={className}
      style={{
        fontVariantLigatures: "none",
        ...style,
      }}
      aria-label={text}
      onMouseEnter={handleMouseEnter}
    >
      {displayText}
    </Component>
  );
}

export default DeterministicShuffle;
