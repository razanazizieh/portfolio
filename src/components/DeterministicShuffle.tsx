import React, { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from "react";
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

  // Verify if there are at least two distinct non-space characters
  const distinctChars = new Set(nonSpaceIndices.map((idx) => chars[idx]));
  if (distinctChars.size <= 1) return originalText;

  const scrambledIndices = [...nonSpaceIndices];
  let attempts = 0;
  let rearranged = originalText;

  // Fisher-Yates swap ONLY on non-space index positions
  while (attempts < 8) {
    for (let i = scrambledIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [scrambledIndices[i], scrambledIndices[j]] = [scrambledIndices[j], scrambledIndices[i]];
    }

    // Reconstruct array strictly from original characters at new swapped positions
    const result = [...chars];
    nonSpaceIndices.forEach((originalIndex, i) => {
      result[originalIndex] = chars[scrambledIndices[i]];
    });
    rearranged = result.join('');

    if (rearranged !== originalText) {
      return rearranged;
    }
    attempts++;
  }

  // Guaranteed fallback for short strings (e.g. "404"): swap two distinct characters
  for (let i = 0; i < nonSpaceIndices.length - 1; i++) {
    for (let j = i + 1; j < nonSpaceIndices.length; j++) {
      const idxA = nonSpaceIndices[i];
      const idxB = nonSpaceIndices[j];
      if (chars[idxA] !== chars[idxB]) {
        const result = [...chars];
        result[idxA] = chars[idxB];
        result[idxB] = chars[idxA];
        return result.join('');
      }
    }
  }

  return rearranged;
};

export interface DeterministicShuffleHandle {
  trigger: () => void;
}

export interface DeterministicShuffleProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

/**
 * Reusable DeterministicShuffle component
 * Rearranges only the original characters of a string on hover or intentional touch
 * using in-place index swaps. Strictly preserves all whitespace and resolves back to originalText.
 * Explicitly disables CSS font ligatures so fonts don't morph character combinations.
 */
export const DeterministicShuffle = forwardRef<DeterministicShuffleHandle, DeterministicShuffleProps>(
  function DeterministicShuffle(
    {
      text,
      as: Component = "span",
      className = "",
      style,
      id,
      onClick,
    }: DeterministicShuffleProps,
    ref
  ) {
    const [displayText, setDisplayText] = useState(text);
    const isShufflingRef = useRef(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const shouldReduceMotion = useReducedMotion();
    const touchStartPosRef = useRef<{ x: number; y: number; time: number } | null>(null);
    const lastTouchTimeRef = useRef<number>(0);

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
        isShufflingRef.current = false;
      };
    }, []);

    const triggerShuffle = useCallback(() => {
      if (shouldReduceMotion || isShufflingRef.current) return;

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

    useImperativeHandle(
      ref,
      () => ({
        trigger: triggerShuffle,
      }),
      [triggerShuffle]
    );

    const handleMouseEnter = useCallback(() => {
      // Prevent double-firing if synthetic mouseenter immediately follows touch
      const isRecentTouch = Date.now() - lastTouchTimeRef.current < 400;
      if (!isRecentTouch) {
        triggerShuffle();
      }
    }, [triggerShuffle]);

    const handleTouchStart = useCallback((e: React.TouchEvent<HTMLElement>) => {
      if (e.touches.length === 1) {
        touchStartPosRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          time: Date.now(),
        };
      }
    }, []);

    const handleTouchEnd = useCallback(
      (e: React.TouchEvent<HTMLElement>) => {
        if (touchStartPosRef.current) {
          const touch = e.changedTouches[0];
          if (touch) {
            const dx = Math.abs(touch.clientX - touchStartPosRef.current.x);
            const dy = Math.abs(touch.clientY - touchStartPosRef.current.y);
            const duration = Date.now() - touchStartPosRef.current.time;

            // Intentional tap: finger displaced < 12px and touch under 500ms
            if (dx < 12 && dy < 12 && duration < 500) {
              lastTouchTimeRef.current = Date.now();
              triggerShuffle();
            }
          }
          touchStartPosRef.current = null;
        }
      },
      [triggerShuffle]
    );

    const handleTouchCancel = useCallback(() => {
      touchStartPosRef.current = null;
    }, []);

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLElement>) => {
        const isRecentTouch = Date.now() - lastTouchTimeRef.current < 400;
        if (!isRecentTouch) {
          triggerShuffle();
        }
        if (onClick) {
          onClick(e);
        }
      },
      [triggerShuffle, onClick]
    );

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
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
        onClick={handleClick}
      >
        {displayText}
      </Component>
    );
  }
);

export default DeterministicShuffle;
