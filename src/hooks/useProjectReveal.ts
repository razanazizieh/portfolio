import React, { useRef, useState, useEffect, useCallback, useMemo, RefObject } from 'react';
import { useReducedMotion } from 'motion/react';
import { EditorialArchetype } from '../components/ProjectCard';
import { getLenis } from './useSmoothScroll';

export type RevealVariant =
  | 'aperture'           // VARIANT A: Constrained visual field expanding into full visual field
  | 'depth-settle'       // VARIANT B: Spatially displaced in depth/y and settling into position
  | 'focal-expansion'    // VARIANT C: Controlled focal crop settling into final crop
  | 'split-convergence' // VARIANT D: Image and info establish from opposite spatial vectors
  | 'quiet-reveal';      // VARIANT E: Very restrained image establishment followed by subtle typography

export interface ElementMotionVariant {
  initial: {
    clipPath?: string;
    scale?: number;
    x?: number;
    y?: number;
    opacity?: number;
  };
  animate: {
    clipPath?: string;
    scale?: number;
    x?: number;
    y?: number;
    opacity?: number;
    transition?: {
      delay?: number;
      duration?: number;
      ease?: number[] | string;
    };
  };
}

export interface ProjectMotionConfig {
  image: ElementMotionVariant;
  meta: ElementMotionVariant;
  title: ElementMotionVariant;
  overview: ElementMotionVariant;
  splitWrapper: ElementMotionVariant;
}

export interface UseProjectRevealOptions {
  index: number;
  projectId: string;
  archetype: EditorialArchetype;
  activeFilter?: string;
  threshold?: number;
  rootMargin?: string;
  externalRef?: React.RefObject<HTMLElement | null>;
}

export interface ProjectSceneStyles {
  image: React.CSSProperties;
  title: React.CSSProperties;
  meta: React.CSSProperties;
  overview: React.CSSProperties;
}

export interface UseProjectRevealReturn {
  ref: React.RefObject<HTMLElement>;
  isRevealed: boolean;
  revealVariant: RevealVariant;
  motionConfig: ProjectMotionConfig;
  lifecycleKey: string;
  resetReveal: () => void;
  shouldReduceMotion: boolean;
  isMobile: boolean;
  scrollProgress: number;
  sceneStyles: ProjectSceneStyles;
}

/**
 * Deterministic choreography selector based on project sequence index.
 * Follows the authored system sequence specified by Art Direction:
 * Project 01 (index 0) — strong       ('aperture')
 * Project 02 (index 1) — restrained   ('quiet-reveal')
 * Project 03 (index 2) — spatial      ('depth-settle')
 * Project 04 (index 3) — quiet        ('quiet-reveal')
 * Project 05 (index 4) — unexpected   ('split-convergence')
 * Project 06 (index 5) — restrained   ('focal-expansion')
 * Future projects inherit deterministic variants via index cycle.
 */
export function getRevealVariant(index: number, _archetype?: EditorialArchetype): RevealVariant {
  const authoredSequence: RevealVariant[] = [
    'aperture',          // Project 01 — strong
    'quiet-reveal',      // Project 02 — restrained
    'depth-settle',      // Project 03 — spatial
    'quiet-reveal',      // Project 04 — quiet
    'split-convergence', // Project 05 — unexpected
    'focal-expansion',   // Project 06 — restrained
  ];
  return authoredSequence[index % authoredSequence.length];
}

/**
 * Computes the unified motion configurations for the project composition
 * (Image, Identity/Meta, Title, Description, and Split Containers).
 * Refined for authored rhythm, compositor friendliness, and mobile amplitude moderation.
 */
export function computeProjectMotionConfig({
  variant,
  index = 0,
  isMobile,
  shouldReduceMotion,
}: {
  variant: RevealVariant;
  index?: number;
  isMobile: boolean;
  shouldReduceMotion: boolean;
}): ProjectMotionConfig {
  if (shouldReduceMotion) {
    return {
      image: {
        initial: { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, x: 0, y: 0, opacity: 1 },
        animate: { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, x: 0, y: 0, opacity: 1, transition: { duration: 0 } },
      },
      meta: {
        initial: { clipPath: 'inset(0% 0% 0% 0%)', y: 0, opacity: 1 },
        animate: { clipPath: 'inset(0% 0% 0% 0%)', y: 0, opacity: 1, transition: { duration: 0 } },
      },
      title: {
        initial: { clipPath: 'inset(0% 0% 0% 0%)', y: 0, opacity: 1 },
        animate: { clipPath: 'inset(0% 0% 0% 0%)', y: 0, opacity: 1, transition: { duration: 0 } },
      },
      overview: {
        initial: { clipPath: 'inset(0% 0% 0% 0%)', y: 0, opacity: 1 },
        animate: { clipPath: 'inset(0% 0% 0% 0%)', y: 0, opacity: 1, transition: { duration: 0 } },
      },
      splitWrapper: {
        initial: { x: 0, opacity: 1 },
        animate: { x: 0, opacity: 1, transition: { duration: 0 } },
      },
    };
  }

  const easeCurve = [0.16, 1, 0.3, 1]; // Editorial cubic bezier

  switch (variant) {
    // -----------------------------------------------------------------------
    // PROJECT 01 — Strong ('aperture')
    // Authoritative visual anchor opening into full viewport presence
    // IMAGE FIRST (0.0s -> 1.05s), TITLE AT ~65% (0.68s), META (0.80s), OVERVIEW (0.92s)
    // -----------------------------------------------------------------------
    case 'aperture': {
      const topInset = isMobile ? '4%' : '8%';
      const sideInset = isMobile ? '3%' : '6%';
      const startY = isMobile ? 14 : 26;
      const imgDuration = isMobile ? 0.85 : 1.05;
      const titleDelay = isMobile ? 0.48 : 0.59;
      const metaDelay = isMobile ? 0.58 : 0.70;
      const overviewDelay = isMobile ? 0.67 : 0.81;

      return {
        image: {
          initial: {
            clipPath: `inset(${topInset} ${sideInset} ${topInset} ${sideInset})`,
            scale: isMobile ? 1.02 : 1.04,
            x: 0,
            y: startY,
            opacity: 0,
          },
          animate: {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1,
            x: 0,
            y: 0,
            opacity: 1,
            transition: { duration: imgDuration, ease: easeCurve },
          },
        },
        title: {
          initial: { clipPath: 'inset(0% 0% 100% 0%)', y: 10, opacity: 0 },
          animate: {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            opacity: 1,
            transition: { delay: titleDelay, duration: 0.46, ease: easeCurve },
          },
        },
        meta: {
          initial: { clipPath: 'inset(0% 0% 100% 0%)', y: 8, opacity: 0 },
          animate: {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            opacity: 1,
            transition: { delay: metaDelay, duration: 0.42, ease: easeCurve },
          },
        },
        overview: {
          initial: { clipPath: 'inset(0% 0% 100% 0%)', y: 8, opacity: 0 },
          animate: {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            opacity: 1,
            transition: { delay: overviewDelay, duration: 0.50, ease: easeCurve },
          },
        },
        splitWrapper: {
          initial: { x: 0, opacity: 1 },
          animate: { x: 0, opacity: 1 },
        },
      };
    }

    // -----------------------------------------------------------------------
    // PROJECT 03 — Spatial ('depth-settle')
    // Lands with structural clarity into its asymmetric right-side space
    // IMAGE FIRST (0.0s -> 0.92s), TITLE AT ~58% (0.54s), META (0.65s), OVERVIEW (0.75s)
    // -----------------------------------------------------------------------
    case 'depth-settle': {
      const startY = isMobile ? 14 : 30;
      const imgDuration = isMobile ? 0.80 : 0.92;
      const titleDelay = isMobile ? 0.45 : 0.54;
      const metaDelay = isMobile ? 0.54 : 0.65;
      const overviewDelay = isMobile ? 0.63 : 0.75;

      return {
        image: {
          initial: {
            clipPath: 'inset(8% 0% 0% 0%)',
            scale: isMobile ? 1.018 : 1.035,
            x: 0,
            y: startY,
            opacity: 0,
          },
          animate: {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1,
            x: 0,
            y: 0,
            opacity: 1,
            transition: { duration: imgDuration, ease: easeCurve },
          },
        },
        title: {
          initial: { clipPath: 'inset(0% 0% 100% 0%)', y: 10, opacity: 0 },
          animate: {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            opacity: 1,
            transition: { delay: titleDelay, duration: 0.44, ease: easeCurve },
          },
        },
        meta: {
          initial: { clipPath: 'inset(0% 0% 100% 0%)', y: 8, opacity: 0 },
          animate: {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            opacity: 1,
            transition: { delay: metaDelay, duration: 0.40, ease: easeCurve },
          },
        },
        overview: {
          initial: { clipPath: 'inset(0% 0% 100% 0%)', y: 8, opacity: 0 },
          animate: {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            opacity: 1,
            transition: { delay: overviewDelay, duration: 0.48, ease: easeCurve },
          },
        },
        splitWrapper: {
          initial: { x: 0, opacity: 1 },
          animate: { x: 0, opacity: 1 },
        },
      };
    }

    // -----------------------------------------------------------------------
    // PROJECT 06 — Restrained ('focal-expansion')
    // Calibrated corner framing settling quietly as works conclusion
    // IMAGE FIRST (0.0s -> 0.82s), TITLE AT ~58% (0.49s), META (0.59s), OVERVIEW (0.70s)
    // -----------------------------------------------------------------------
    case 'focal-expansion': {
      const startY = isMobile ? 8 : 14;
      const imgDuration = isMobile ? 0.70 : 0.82;
      const titleDelay = isMobile ? 0.40 : 0.49;
      const metaDelay = isMobile ? 0.49 : 0.59;
      const overviewDelay = isMobile ? 0.58 : 0.70;

      return {
        image: {
          initial: {
            clipPath: 'inset(6% 0% 0% 4%)',
            scale: isMobile ? 1.012 : 1.02,
            x: 0,
            y: startY,
            opacity: 0,
          },
          animate: {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1,
            x: 0,
            y: 0,
            opacity: 1,
            transition: { duration: imgDuration, ease: [0.2, 1, 0.35, 1] },
          },
        },
        title: {
          initial: { clipPath: 'inset(0% 0% 100% 0%)', y: 10, opacity: 0 },
          animate: {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            opacity: 1,
            transition: { delay: titleDelay, duration: 0.42, ease: easeCurve },
          },
        },
        meta: {
          initial: { clipPath: 'inset(0% 0% 100% 0%)', y: 8, opacity: 0 },
          animate: {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            opacity: 1,
            transition: { delay: metaDelay, duration: 0.38, ease: easeCurve },
          },
        },
        overview: {
          initial: { clipPath: 'inset(0% 0% 100% 0%)', y: 8, opacity: 0 },
          animate: {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            opacity: 1,
            transition: { delay: overviewDelay, duration: 0.46, ease: easeCurve },
          },
        },
        splitWrapper: {
          initial: { x: 0, opacity: 1 },
          animate: { x: 0, opacity: 1 },
        },
      };
    }

    // -----------------------------------------------------------------------
    // PROJECT 05 — Unexpected ('split-convergence')
    // Bilateral convergence meeting from opposite vectors after Statement
    // IMAGE FIRST (0.0s -> 0.95s), TEXT CONVERGES: WRAPPER (0.52s), TITLE (0.57s), META (0.67s), OVERVIEW (0.78s)
    // -----------------------------------------------------------------------
    case 'split-convergence': {
      const startImgX = isMobile ? 0 : 28;
      const startTextX = isMobile ? 0 : -20;
      const startY = isMobile ? 12 : 6;
      const imgDuration = isMobile ? 0.80 : 0.95;
      const wrapDelay = isMobile ? 0.44 : 0.52;
      const titleDelay = isMobile ? 0.47 : 0.57;
      const metaDelay = isMobile ? 0.56 : 0.67;
      const overviewDelay = isMobile ? 0.65 : 0.78;

      return {
        image: {
          initial: {
            clipPath: isMobile ? 'inset(6% 0% 0% 0%)' : 'inset(0% 0% 0% 16%)',
            scale: isMobile ? 1.015 : 1.03,
            x: startImgX,
            y: startY,
            opacity: 0,
          },
          animate: {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1,
            x: 0,
            y: 0,
            opacity: 1,
            transition: { duration: imgDuration, ease: easeCurve },
          },
        },
        splitWrapper: {
          initial: { x: startTextX, opacity: 0 },
          animate: {
            x: 0,
            opacity: 1,
            transition: { delay: wrapDelay, duration: 0.55, ease: easeCurve },
          },
        },
        title: {
          initial: { clipPath: 'inset(0% 0% 100% 0%)', y: 10, opacity: 0 },
          animate: {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            opacity: 1,
            transition: { delay: titleDelay, duration: 0.44, ease: easeCurve },
          },
        },
        meta: {
          initial: { clipPath: 'inset(0% 0% 100% 0%)', y: 8, opacity: 0 },
          animate: {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            opacity: 1,
            transition: { delay: metaDelay, duration: 0.40, ease: easeCurve },
          },
        },
        overview: {
          initial: { clipPath: 'inset(0% 0% 100% 0%)', y: 8, opacity: 0 },
          animate: {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            opacity: 1,
            transition: { delay: overviewDelay, duration: 0.48, ease: easeCurve },
          },
        },
      };
    }

    // -----------------------------------------------------------------------
    // PROJECT 02 & PROJECT 04 — Restrained & Quiet ('quiet-reveal')
    // Project 02: Understated, restrained arrival (index % 6 === 1)
    // Project 04: Almost completely still, tranquil reading pause (index % 6 === 3)
    // IMAGE FIRST, TITLE AT ~58%, THEN META, THEN OVERVIEW
    // -----------------------------------------------------------------------
    case 'quiet-reveal':
    default: {
      const isQuietPause = (index % 6) === 3;

      if (isQuietPause) {
        // Project 04 — quiet: almost still reading moment after Statement
        const startY = isMobile ? 3 : 6;
        const imgDuration = isMobile ? 0.60 : 0.70;
        const titleDelay = isMobile ? 0.35 : 0.42;
        const metaDelay = isMobile ? 0.42 : 0.51;
        const overviewDelay = isMobile ? 0.49 : 0.60;

        return {
          image: {
            initial: {
              clipPath: 'inset(0% 0% 0% 0%)',
              scale: 1,
              x: 0,
              y: startY,
              opacity: 0,
            },
            animate: {
              clipPath: 'inset(0% 0% 0% 0%)',
              scale: 1,
              x: 0,
              y: 0,
              opacity: 1,
              transition: { duration: imgDuration, ease: [0.25, 1, 0.35, 1] },
            },
          },
          title: {
            initial: { clipPath: 'inset(0% 0% 100% 0%)', y: 8, opacity: 0 },
            animate: {
              clipPath: 'inset(0% 0% 0% 0%)',
              y: 0,
              opacity: 1,
              transition: { delay: titleDelay, duration: 0.40, ease: easeCurve },
            },
          },
          meta: {
            initial: { clipPath: 'inset(0% 0% 100% 0%)', y: 6, opacity: 0 },
            animate: {
              clipPath: 'inset(0% 0% 0% 0%)',
              y: 0,
              opacity: 1,
              transition: { delay: metaDelay, duration: 0.36, ease: easeCurve },
            },
          },
          overview: {
            initial: { clipPath: 'inset(0% 0% 100% 0%)', y: 6, opacity: 0 },
            animate: {
              clipPath: 'inset(0% 0% 0% 0%)',
              y: 0,
              opacity: 1,
              transition: { delay: overviewDelay, duration: 0.44, ease: easeCurve },
            },
          },
          splitWrapper: {
            initial: { x: 0, opacity: 1 },
            animate: { x: 0, opacity: 1 },
          },
        };
      }

      // Project 02 — restrained: subtle, disciplined arrival following Project 01
      const startY = isMobile ? 6 : 12;
      const imgDuration = isMobile ? 0.70 : 0.80;
      const titleDelay = isMobile ? 0.40 : 0.49;
      const metaDelay = isMobile ? 0.49 : 0.60;
      const overviewDelay = isMobile ? 0.58 : 0.70;

      return {
        image: {
          initial: {
            clipPath: 'inset(4% 0% 0% 0%)',
            scale: isMobile ? 1.01 : 1.018,
            x: 0,
            y: startY,
            opacity: 0,
          },
          animate: {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1,
            x: 0,
            y: 0,
            opacity: 1,
            transition: { duration: imgDuration, ease: [0.22, 1, 0.36, 1] },
          },
        },
        title: {
          initial: { clipPath: 'inset(0% 0% 100% 0%)', y: 8, opacity: 0 },
          animate: {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            opacity: 1,
            transition: { delay: titleDelay, duration: 0.42, ease: easeCurve },
          },
        },
        meta: {
          initial: { clipPath: 'inset(0% 0% 100% 0%)', y: 6, opacity: 0 },
          animate: {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            opacity: 1,
            transition: { delay: metaDelay, duration: 0.38, ease: easeCurve },
          },
        },
        overview: {
          initial: { clipPath: 'inset(0% 0% 100% 0%)', y: 6, opacity: 0 },
          animate: {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            opacity: 1,
            transition: { delay: overviewDelay, duration: 0.46, ease: easeCurve },
          },
        },
        splitWrapper: {
          initial: { x: 0, opacity: 1 },
          animate: { x: 0, opacity: 1 },
        },
      };
    }
  }
}

/**
 * Unified hook managing the full reveal choreography lifecycle for a project card.
 * Computes deterministic reveal choreography variants based on project index and archetype,
 * generates tailored motion configurations for all project elements,
 * and guarantees clean reveal state resets whenever activeFilter changes.
 */
export function useProjectReveal({
  index,
  projectId,
  archetype,
  activeFilter,
  threshold = 0.1,
  rootMargin = '0px 0px -100px 0px',
  externalRef,
}: UseProjectRevealOptions): UseProjectRevealReturn {
  const internalRef = useRef<HTMLElement>(null);
  const targetRef = (externalRef || internalRef) as React.RefObject<HTMLElement>;
  const shouldReduceMotion = !!useReducedMotion();

  // Screen-width awareness for responsive spatial translation vectors
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(max-width: 767px)');
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    if (mql.addEventListener) {
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    }
  }, []);

  // Unique lifecycle key strictly mapping this project card to its active filter, ID, and position
  const lifecycleKey = `${activeFilter || 'all'}-${projectId}-${index}`;
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isResolved, setIsResolved] = useState(false);

  // Compute choreography variant deterministically from index and archetype
  const revealVariant = useMemo(
    () => getRevealVariant(index, archetype),
    [index, archetype]
  );

  // Compute motion config including initial/animate states, durations, delays, and ease curves
  const motionConfig = useMemo(
    () => computeProjectMotionConfig({ variant: revealVariant, index, isMobile, shouldReduceMotion }),
    [revealVariant, index, isMobile, shouldReduceMotion]
  );

  const resetReveal = useCallback(() => {
    setScrollProgress(0);
    setIsResolved(false);
  }, []);

  // Scroll awareness: calculate position relative to viewport
  useEffect(() => {
    setScrollProgress(0);
    setIsResolved(false);

    const el = targetRef.current;
    if (!el || typeof window === 'undefined') return;

    if (shouldReduceMotion) {
      setScrollProgress(1);
      setIsResolved(true);
      return;
    }

    let rafId: number | null = null;
    let isDisposed = false;

    const checkPosition = () => {
      if (isDisposed || !targetRef.current) return;
      const rect = targetRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      // Card enters into scene when its top reaches 96% of viewport height
      const enterThreshold = vh * 0.96;
      // Card achieves complete compositional resolution when its top reaches 32% of viewport height
      const resolveThreshold = vh * 0.32;
      const totalDist = enterThreshold - resolveThreshold;

      if (rect.top > enterThreshold) {
        // Still below viewport
        setScrollProgress((prev) => (prev === 0 ? prev : 0));
        setIsResolved(false);
      } else if (rect.top <= resolveThreshold || rect.bottom <= vh * 0.5) {
        // Reached prime reading zone: lock into RESOLVE & HOLD
        setScrollProgress(1);
        setIsResolved(true);
      } else {
        const raw = (enterThreshold - rect.top) / totalDist;
        const p = Math.max(0, Math.min(1, raw));
        setScrollProgress(p);
        if (p >= 0.95) {
          setIsResolved(true);
        }
      }
    };

    const scheduleCheck = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        checkPosition();
      });
    };

    checkPosition();

    window.addEventListener('scroll', scheduleCheck, { passive: true });
    window.addEventListener('resize', scheduleCheck, { passive: true });

    const lenis = getLenis();
    if (lenis) {
      lenis.on('scroll', scheduleCheck);
    }

    return () => {
      isDisposed = true;
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', scheduleCheck);
      window.removeEventListener('resize', scheduleCheck);
      if (lenis) {
        lenis.off('scroll', scheduleCheck);
      }
    };
  }, [lifecycleKey, shouldReduceMotion, targetRef]);

  // Compute exact scene styles enforcing:
  // IMAGE ARRIVES FIRST (0.04 - 0.50) -> ESTABLISHES POSITION
  // TITLE APPEARS (0.50 - 0.70)
  // META APPEARS (0.68 - 0.84)
  // DESCRIPTION APPEARS (0.80 - 0.95)
  // FULL RESOLVE & HOLD (>= 0.95)
  const sceneStyles = useMemo<ProjectSceneStyles>(() => {
    if (shouldReduceMotion || isResolved) {
      return {
        image: { opacity: 1, transform: 'none', clipPath: 'none' },
        title: { opacity: 1, transform: 'none', clipPath: 'none' },
        meta: { opacity: 1, transform: 'none', clipPath: 'none' },
        overview: { opacity: 1, transform: 'none', clipPath: 'none' },
      };
    }

    const p = scrollProgress;
    const isAnchor = archetype === 'cinematic-anchor';

    // 1. Image Styles (Arrives and establishes first at p < 0.44)
    let imageStyle: React.CSSProperties;
    if (p < 0.04) {
      const insetTop = isAnchor ? 14 : 10;
      const insetSide = isAnchor ? 10 : 8;
      imageStyle = {
        opacity: 0,
        transform: `scale(${isMobile ? 1.04 : 1.08}) translate3d(0, ${isMobile ? 20 : 40}px, 0)`,
        clipPath: `inset(${insetTop}% ${insetSide}% ${insetTop}% ${insetSide}%)`,
        transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-out, clip-path 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
      };
    } else if (p < 0.44) {
      const t = (p - 0.04) / 0.40;
      const ease = 1 - Math.pow(1 - t, 2.5);
      const top = ((isAnchor ? 14 : 10) * (1 - ease)).toFixed(2);
      const side = ((isAnchor ? 10 : 8) * (1 - ease)).toFixed(2);
      const scale = (1 + (isMobile ? 0.04 : 0.08) * (1 - ease)).toFixed(4);
      const y = ((isMobile ? 20 : 40) * (1 - ease)).toFixed(1);
      imageStyle = {
        opacity: Math.min(1, ease * 1.3),
        transform: `scale(${scale}) translate3d(0, ${y}px, 0)`,
        clipPath: `inset(${top}% ${side}% ${top}% ${side}%)`,
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease-out, clip-path 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      };
    } else {
      imageStyle = {
        opacity: 1,
        transform: 'scale(1) translate3d(0, 0, 0)',
        clipPath: 'inset(0% 0% 0% 0%)',
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease-out, clip-path 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      };
    }

    // 2. Title Styles (Absent and compositionally displaced until image establishes at p >= 0.44)
    let titleStyle: React.CSSProperties;
    if (p < 0.44) {
      titleStyle = {
        opacity: 0,
        transform: `translate3d(0, ${isMobile ? 22 : 36}px, 0)`,
        clipPath: 'inset(0% 0% 100% 0%)',
        transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-out, clip-path 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
      };
    } else if (p < 0.62) {
      const t = (p - 0.44) / 0.18;
      const ease = 1 - Math.pow(1 - t, 2.5);
      const y = ((isMobile ? 22 : 36) * (1 - ease)).toFixed(1);
      const bottom = ((1 - ease) * 100).toFixed(1);
      titleStyle = {
        opacity: Math.min(1, ease * 1.25),
        transform: `translate3d(0, ${y}px, 0)`,
        clipPath: `inset(0% 0% ${bottom}% 0%)`,
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease-out, clip-path 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      };
    } else {
      titleStyle = {
        opacity: 1,
        transform: 'translate3d(0, 0, 0)',
        clipPath: 'inset(0% 0% 0% 0%)',
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease-out, clip-path 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      };
    }

    // 3. Metadata Styles (Absent and displaced until p >= 0.60)
    let metaStyle: React.CSSProperties;
    if (p < 0.60) {
      metaStyle = {
        opacity: 0,
        transform: `translate3d(0, ${isMobile ? 16 : 26}px, 0)`,
        clipPath: 'inset(0% 0% 100% 0%)',
        transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-out, clip-path 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
      };
    } else if (p < 0.74) {
      const t = (p - 0.60) / 0.14;
      const ease = 1 - Math.pow(1 - t, 2.5);
      const y = ((isMobile ? 16 : 26) * (1 - ease)).toFixed(1);
      const bottom = ((1 - ease) * 100).toFixed(1);
      metaStyle = {
        opacity: Math.min(1, ease * 1.25),
        transform: `translate3d(0, ${y}px, 0)`,
        clipPath: `inset(0% 0% ${bottom}% 0%)`,
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease-out, clip-path 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      };
    } else {
      metaStyle = {
        opacity: 1,
        transform: 'translate3d(0, 0, 0)',
        clipPath: 'inset(0% 0% 0% 0%)',
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease-out, clip-path 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      };
    }

    // 4. Overview Styles (Absent and displaced until p >= 0.70)
    let overviewStyle: React.CSSProperties;
    if (p < 0.70) {
      overviewStyle = {
        opacity: 0,
        transform: `translate3d(0, ${isMobile ? 18 : 30}px, 0)`,
        clipPath: 'inset(0% 0% 100% 0%)',
        transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-out, clip-path 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
      };
    } else if (p < 0.84) {
      const t = (p - 0.70) / 0.14;
      const ease = 1 - Math.pow(1 - t, 2.5);
      const y = ((isMobile ? 18 : 30) * (1 - ease)).toFixed(1);
      const bottom = ((1 - ease) * 100).toFixed(1);
      overviewStyle = {
        opacity: Math.min(1, ease * 1.25),
        transform: `translate3d(0, ${y}px, 0)`,
        clipPath: `inset(0% 0% ${bottom}% 0%)`,
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease-out, clip-path 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      };
    } else {
      overviewStyle = {
        opacity: 1,
        transform: 'translate3d(0, 0, 0)',
        clipPath: 'inset(0% 0% 0% 0%)',
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease-out, clip-path 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      };
    }

    return {
      image: imageStyle,
      title: titleStyle,
      meta: metaStyle,
      overview: overviewStyle,
    };
  }, [scrollProgress, isResolved, shouldReduceMotion, archetype, isMobile]);

  return {
    ref: targetRef,
    isRevealed: isResolved || scrollProgress > 0.05,
    revealVariant,
    motionConfig,
    lifecycleKey,
    resetReveal,
    shouldReduceMotion,
    isMobile,
    scrollProgress,
    sceneStyles,
  };
}
