import React, { useState, useEffect, useRef, useCallback, memo, forwardRef, useImperativeHandle } from 'react';
import { useReducedMotion } from 'motion/react';

const CIPHER_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export interface ScrambleTextHandle {
  trigger: () => void;
}

/**
 * Fisher-Yates array shuffle algorithm using ONLY the original string's array of characters.
 * Swaps original characters in place without generating or introducing new characters.
 */
const shuffleArray = (chars: string[]): string[] => {
  const arr = [...chars];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Swapping ORIGINAL characters only
  }
  return arr;
};

/**
 * Shuffles characters of a single word using Fisher-Yates shuffleArray.
 * If distinct characters exist, guarantees that the returned word is visually rearranged.
 */
const shuffleWord = (word: string): string => {
  const chars = word.split('');
  if (chars.length <= 1) return word;

  let arr = shuffleArray(chars);
  let attempts = 0;
  while (arr.join('') === word && attempts < 5) {
    arr = shuffleArray(chars);
    attempts++;
  }
  if (arr.join('') === word) {
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] !== arr[j]) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          return arr.join('');
        }
      }
    }
  }
  return arr.join('');
};

/**
 * Recomposes intermediate state: retains original characters for head portion,
 * while shuffling remaining tail characters with Fisher-Yates shuffleArray.
 */
const recomposeWord = (word: string): string => {
  const chars = word.split('');
  if (chars.length <= 2) return shuffleWord(word);

  const settleCount = Math.max(1, Math.floor(chars.length * 0.45));
  const head = chars.slice(0, settleCount);
  const tail = chars.slice(settleCount);
  const shuffledTail = shuffleWord(tail.join(''));
  return [...head, ...shuffledTail.split('')].join('');
};

/**
 * Character rearrangement generator for Case Study titles and 404.
 * Uses ONLY the existing characters from the original text.
 * Retains white spaces in their exact indices and preserves word boundaries.
 * 
 * Frame 1: Non-space characters in each word are shuffled using Fisher-Yates shuffleArray.
 * Frame 2: Intermediate recomposing state (head settles toward original, tail remains shuffled).
 * Final Frame: Strictly resolves back to the exact original text.
 */
function generateRearrangementStages(text: string): string[] {
  if (!text || text.length <= 1) return [text];

  // Preserve whitespace and delimiters in exact indices between words
  const tokens = text.split(/(\s+)/);

  // Stage 1: Full Fisher-Yates shuffle of original characters in each word
  const stage1 = tokens
    .map((token) => (/^\s+$/.test(token) ? token : shuffleWord(token)))
    .join('');

  // Stage 2: Second intermediate hover state (recomposing toward original)
  const stage2 = tokens
    .map((token) => (/^\s+$/.test(token) ? token : recomposeWord(token)))
    .join('');

  // Final Stage: Strictly original text
  return [stage1, stage2, text];
}

export interface ScrambleTextProps {
  text: string;
  className?: string;
  as?: 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'a';
  variant?: 'scramble' | 'reassembly';
  scrambleOnMount?: boolean;
  scrambleOnView?: boolean;
  scrambleOnHover?: boolean;
  speed?: number; // ms per tick
  cycles?: number; // how many cycles per character
  delay?: number; // initial delay in ms
  threshold?: number; // intersection threshold
  cursorData?: string;
  onMouseEnter?: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  ariaLabel?: string;
  [key: string]: any;
}

export const ScrambleText = memo(
  forwardRef<ScrambleTextHandle, ScrambleTextProps>(function ScrambleText(
    {
      text,
      className = '',
      as: Component = 'span',
      variant = 'scramble',
      scrambleOnMount = false,
      scrambleOnView = false,
      scrambleOnHover = true,
      speed = 24,
      cycles = 2,
      delay = 0,
      cursorData,
      onMouseEnter,
      onMouseLeave,
      onClick,
      ariaLabel,
      ...restProps
    },
    ref
  ) {
    const shouldReduceMotion = useReducedMotion();
    const elementRef = useRef<HTMLElement>(null);
    const [displayText, setDisplayText] = useState(text);
    const isScramblingRef = useRef(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const touchStartPosRef = useRef<{ x: number; y: number; time: number } | null>(null);
    const lastTouchTimeRef = useRef<number>(0);

    // Full cryptographic cipher scramble (used for Hero name & Contact links)
    const triggerScramble = useCallback(() => {
      if (shouldReduceMotion || isScramblingRef.current) return;
      isScramblingRef.current = true;

      const original = text;
      const length = original.length;
      let iteration = 0;
      const totalIterations = Math.max(14, length * cycles);

      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        iteration++;
        const progress = iteration / totalIterations;
        const currentResolvedIndex = Math.floor(progress * length);

        const scrambled = original
          .split('')
          .map((char, index) => {
            if (
              char === ' ' ||
              char === '•' ||
              char === '/' ||
              char === '&' ||
              char === '\'' ||
              char === '’' ||
              char === '.' ||
              char === '-' ||
              char === '—'
            ) {
              return char;
            }
            if (index < currentResolvedIndex) {
              return original[index];
            }
            return CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
          })
          .join('');

        setDisplayText(scrambled);

        if (iteration >= totalIterations) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setDisplayText(original);
          isScramblingRef.current = false;
        }
      }, speed);
    }, [text, speed, cycles, shouldReduceMotion]);

    // Restrained character rearrangement (used for Case Study project titles & 404)
    // Rearranges existing characters briefly within the same word, then settles into exact text
    const triggerReassembly = useCallback(() => {
      if (shouldReduceMotion || isScramblingRef.current) return;

      const stages = generateRearrangementStages(text);
      if (stages.length <= 1) return;

      isScramblingRef.current = true;

      if (intervalRef.current) clearInterval(intervalRef.current);

      let stageIndex = 0;
      const stageDuration = 80; // 80ms per stage (total ~160ms interaction)

      // Stage 1 (unsettled state) applies immediately on hover entry
      setDisplayText(stages[0]);

      intervalRef.current = setInterval(() => {
        stageIndex++;
        if (stageIndex >= stages.length - 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          intervalRef.current = null;
          setDisplayText(text);
          isScramblingRef.current = false;
          return;
        }
        setDisplayText(stages[stageIndex]);
      }, stageDuration);
    }, [text, shouldReduceMotion]);

    const triggerAction = useCallback(() => {
      if (variant === 'reassembly') {
        triggerReassembly();
      } else {
        triggerScramble();
      }
    }, [variant, triggerReassembly, triggerScramble]);

    useImperativeHandle(
      ref,
      () => ({
        trigger: triggerAction,
      }),
      [triggerAction]
    );

    useEffect(() => {
      setDisplayText(text);
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        isScramblingRef.current = false;
      };
    }, [text]);

    // Initial page mount entrance trigger
    useEffect(() => {
      if (scrambleOnMount && !shouldReduceMotion) {
        const timer = setTimeout(() => {
          triggerAction();
        }, delay);
        return () => clearTimeout(timer);
      }
    }, [scrambleOnMount, delay, shouldReduceMotion, triggerAction]);

    // On-view intersection trigger
    useEffect(() => {
      if (scrambleOnView && !shouldReduceMotion && !scrambleOnMount) {
        const timer = setTimeout(() => {
          triggerAction();
        }, delay);
        return () => clearTimeout(timer);
      }
    }, [scrambleOnView, scrambleOnMount, delay, shouldReduceMotion, triggerAction]);

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLElement>) => {
        const isRecentTouch = Date.now() - lastTouchTimeRef.current < 400;
        if (!isRecentTouch && scrambleOnHover && !isScramblingRef.current) {
          triggerAction();
        }
        if (onMouseEnter) {
          onMouseEnter(e);
        }
      },
      [scrambleOnHover, triggerAction, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLElement>) => {
        if (onMouseLeave) {
          onMouseLeave(e);
        }
      },
      [onMouseLeave]
    );

    const handleTouchStart = useCallback(
      (e: React.TouchEvent<HTMLElement>) => {
        if (e.touches.length === 1) {
          touchStartPosRef.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
            time: Date.now(),
          };
        }
        if (restProps.onTouchStart) {
          restProps.onTouchStart(e);
        }
      },
      [restProps]
    );

    const handleTouchEnd = useCallback(
      (e: React.TouchEvent<HTMLElement>) => {
        if (touchStartPosRef.current) {
          const touch = e.changedTouches[0];
          if (touch) {
            const dx = Math.abs(touch.clientX - touchStartPosRef.current.x);
            const dy = Math.abs(touch.clientY - touchStartPosRef.current.y);
            const duration = Date.now() - touchStartPosRef.current.time;

            // Intentional tap: finger displaced < 12px and touch was brief (< 500ms)
            if (dx < 12 && dy < 12 && duration < 500) {
              lastTouchTimeRef.current = Date.now();
              if (!isScramblingRef.current) {
                triggerAction();
              }
            }
          }
          touchStartPosRef.current = null;
        }
        if (restProps.onTouchEnd) {
          restProps.onTouchEnd(e);
        }
      },
      [triggerAction, restProps]
    );

    const handleTouchCancel = useCallback(
      (e: React.TouchEvent<HTMLElement>) => {
        touchStartPosRef.current = null;
        if (restProps.onTouchCancel) {
          restProps.onTouchCancel(e);
        }
      },
      [restProps]
    );

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLElement>) => {
        const isRecentTouch = Date.now() - lastTouchTimeRef.current < 400;
        if (!isRecentTouch && !isScramblingRef.current) {
          triggerAction();
        }
        if (onClick) {
          onClick(e);
        }
      },
      [triggerAction, onClick]
    );

    const attributes: Record<string, any> = {
      ...restProps,
      ref: elementRef,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
      onTouchCancel: handleTouchCancel,
      onClick: handleClick,
      'aria-label': ariaLabel || text,
      className: `select-text ${className}`,
    };

    if (cursorData) {
      attributes['data-cursor'] = cursorData;
    }

    return React.createElement(
      Component,
      attributes,
      displayText || text
    );
  })
);

ScrambleText.displayName = 'ScrambleText';

export const RestrainedReassemblyText = memo<Omit<ScrambleTextProps, 'variant'>>((props) => (
  <ScrambleText {...props} variant="reassembly" scrambleOnMount={false} scrambleOnHover={true} />
));
RestrainedReassemblyText.displayName = 'RestrainedReassemblyText';

export default ScrambleText;

