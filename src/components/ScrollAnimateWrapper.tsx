/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RefObject } from 'react';
import { useScroll, useTransform, useMotionValue } from 'motion/react';


/**
 * Standardized Motion Language Definitions
 * 
 * Provides unified durations, curves, offsets, and transition objects 
 * for consistent, controlled premium transition kinetics across the entire portfolio.
 * 
 * Timings are carefully partitioned by element hierarchy:
 * - Primary elements (Hero Titles, Letters, Core Actions): 450-650ms (Default: 550ms / 580ms / 620ms for offsets)
 * - Secondary elements (Card Blocks, Paragraph blocks): 300-450ms (Default: 380ms)
 * - Supporting elements (Mini Badges, Specifications, Tooltips): 200-300ms (Default: 250ms)
 * 
 * Easing incorporates an elegant decelerating cubic-bezier curve [0.22, 1, 0.36, 1] 
 * without any bounce, elastic, or exaggerated features to maintain a clean hand-discovered feel.
 */

// Shared premium decelerating cubic-bezier curve (Clean contrast-based motion)
export const MOTION_CURVE_PREMIUM = [0.16, 1, 0.3, 1] as const;
export const MOTION_CURVE_PREMIUM_STRING = "cubic-bezier(0.16, 1, 0.3, 1)";

// Premium Element Reveal System Stable Transition Config
export const SPRING_PREMIUM_CONFIG = {
  duration: 0.45,
  ease: MOTION_CURVE_PREMIUM,
};

export const getPremiumRevealVariants = (delay = 0, _shouldReduceMotion = false) => ({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: MOTION_CURVE_PREMIUM,
      delay,
    }
  }
});

// Timing Constants (In seconds)
export const DURATION_PRIMARY = 0.58;     // 580ms (Primary attention items)
export const DURATION_SECONDARY = 0.45;   // 450ms (Main body content and cards)
export const DURATION_SUPPORTING = 0.35;  // 350ms (Metadata and helper elements)

// Expose individual letter durations for sequential but offset/staggered letters in OpeningExperience
export const DURATION_LETTER_PRIMARY_1 = 0.35; // 350ms
export const DURATION_LETTER_PRIMARY_2 = 0.38; // 380ms

// Subtle Translation Offsets for controlled movement
export const OFFSET_PRIMARY = 16;
export const OFFSET_SECONDARY = 12;
export const OFFSET_SUPPORTING = 8;

export type ElementImportance = 'primary' | 'secondary' | 'supporting';

/**
 * Returns consistent duration based on the element's visual hierarchy rank.
 */
export const getDurationByImportance = (importance: ElementImportance): number => {
  switch (importance) {
    case 'primary':
      return DURATION_PRIMARY;
    case 'supporting':
      return DURATION_SUPPORTING;
    case 'secondary':
    default:
      return DURATION_SECONDARY;
  }
};

/**
 * Returns a standardized transition object with defined duration, ease curve, and optional delay.
 */
export const getTransitionByImportance = (importance: ElementImportance, delay = 0) => {
  return {
    duration: getDurationByImportance(importance),
    ease: MOTION_CURVE_PREMIUM,
    delay,
  };
};

/**
 * Returns standardized translation distance for entrance animations.
 */
export const getOffsetByImportance = (importance: ElementImportance): number => {
  switch (importance) {
    case 'primary':
      return OFFSET_PRIMARY;
    case 'supporting':
      return OFFSET_SUPPORTING;
    case 'secondary':
    default:
      return OFFSET_SECONDARY;
  }
};

// Centralized Motion Variants

export const getEditorialRevealVariants = (delay = 0, duration = 0.45, _shouldReduceMotion = false) => ({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration,
      ease: MOTION_CURVE_PREMIUM,
      delay,
    }
  }
});

export const getFadeOnlyVariants = (delay = 0, duration = 0.45) => ({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration,
      ease: MOTION_CURVE_PREMIUM,
      delay,
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.7, 0, 0.84, 0], // easeIn
    }
  }
});

export const manifestoLineVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: DURATION_PRIMARY, ease: MOTION_CURVE_PREMIUM } 
  }
};

export const getDynamicLineVariants = (_shouldReduceMotion: boolean) => ({
  hidden: { 
    opacity: 0, 
  },
  visible: { 
    opacity: 1, 
    transition: { duration: DURATION_PRIMARY, ease: MOTION_CURVE_PREMIUM } 
  }
});

export const getParagraphVariants = (_shouldReduceMotion: boolean) => ({
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: DURATION_SECONDARY, ease: MOTION_CURVE_PREMIUM } 
  }
});

export const getMenuVariants = () => ({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATION_SECONDARY,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: DURATION_SECONDARY,
      ease: "easeIn",
    },
  },
});

export const getLinksContainerVariants = () => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
});

export const getMenuLinkVariants = (_shouldReduceMotion: boolean) => ({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATION_PRIMARY,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: DURATION_SECONDARY,
      ease: "easeIn",
    },
  },
});

// Centralized Custom Transform and Scroll Hooks

export function useCredoScroll(targetRef: RefObject<HTMLDivElement | null>, _shouldReduceMotion: boolean) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  // Pure static positions to guarantee absolute physical stability
  const l1X = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const l2X = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const l3X = useTransform(scrollYProgress, [0, 1], [0, 0]);

  const exitOpacity = useTransform(scrollYProgress, [0.65, 0.95], [1, 1]);
  const exitScale = useTransform(scrollYProgress, [0.65, 0.95], [1, 1]);
  const exitY = useTransform(scrollYProgress, [0.65, 0.95], [0, 0]);

  const fallbackOpacity = useMotionValue(1);
  const fallbackScale = useMotionValue(1);
  const fallbackY = useMotionValue(0);

  return {
    credoL1X: l1X,
    credoL2X: l2X,
    credoL3X: l3X,
    credoExitOpacity: fallbackOpacity,
    credoExitScale: fallbackScale,
    credoExitY: fallbackY,
  };
}

export function useHeaderLogoScroll() {
  const { scrollY } = useScroll();
  const logoOpacity = useTransform(scrollY, [60, 240], [0, 1]);
  const logoY = useTransform(scrollY, [60, 240], [0, 0]);
  return { logoOpacity, logoY };
}

