/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useScroll, useTransform } from 'motion/react';

/**
 * Editorial Motion Language & Choreography System
 * 
 * Core Philosophy:
 * - The page is a continuous visual sequence, not disconnected static sections.
 * - Each section is an authored "scene" with distinct motion behavior and visual rhythm.
 * - Scrolling directly drives physical state changes (aperture reveals, optical illumination,
 *   lateral typographic shear, counter-axis parallax, and gravitational convergence).
 * - High-precision reduced-motion support across all scenes.
 */

// Premium Easing Curves
export const MOTION_CURVE_PREMIUM = [0.16, 1, 0.3, 1] as const;
export const MOTION_CURVE_CINEMATIC = [0.19, 1, 0.22, 1] as const;
export const MOTION_CURVE_ORGANIC = [0.16, 1, 0.3, 1] as const;
export const MOTION_CURVE_SLOW = [0.16, 1, 0.3, 1] as const;
export const MOTION_CURVE_PREMIUM_STRING = "cubic-bezier(0.16, 1, 0.3, 1)";
export const MOTION_DURATION_DEFAULT = 0.85;

// Reversible Viewport Configurations for Editorial Continuity
export const VIEWPORT_REVERSIBLE_CONFIG = {
  once: false,
  amount: 0.05,
  margin: "0px 0px -12% 0px",
} as const;

export const VIEWPORT_EDITORIAL_CONFIG = {
  once: false,
  amount: 0.05,
  margin: "0px 0px -12% 0px",
} as const;

export const VIEWPORT_ONCE_CONFIG = {
  once: false,
  amount: 0.05,
  margin: "0px 0px -12% 0px",
} as const;

export const FADE_UP_VARIANTS = (delay = 0, shouldReduceMotion = false) => ({
  hidden: {
    opacity: shouldReduceMotion ? 1 : 0,
    y: shouldReduceMotion ? 0 : 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: shouldReduceMotion ? 0.01 : 0.8,
      ease: MOTION_CURVE_PREMIUM,
      delay: shouldReduceMotion ? 0 : delay,
    },
  },
});

export type ContentRole =
  | 'largeTypography'
  | 'editorialImage'
  | 'supportingText'
  | 'interactiveButton'
  | 'navigation'
  | 'metaLabel';

export const MASK_REVEAL_EASE = [0.16, 1, 0.3, 1] as const;

export const getDirectionalVariants = (
  direction: 'down' | 'up' = 'down',
  offset = 35,
  delay = 0,
  shouldReduceMotion = false
) => ({
  hidden: {
    opacity: shouldReduceMotion ? 1 : 0,
    y: shouldReduceMotion ? 0 : direction === 'down' ? offset : -offset,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: shouldReduceMotion ? 0.01 : 0.8,
      ease: MOTION_CURVE_PREMIUM,
      delay: shouldReduceMotion ? 0 : delay,
    },
  },
});

export const lineMaskVariants = (delay = 0, shouldReduceMotion = false) => ({
  hidden: {
    y: shouldReduceMotion ? 0 : 35,
    opacity: shouldReduceMotion ? 1 : 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: shouldReduceMotion ? 0.01 : 0.8,
      ease: MOTION_CURVE_PREMIUM,
      delay: shouldReduceMotion ? 0 : delay,
    },
  },
});

export const motionRoles = {
  largeTypography: (delay = 0, shouldReduceMotion = false) => ({
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 35,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.8,
        ease: MOTION_CURVE_PREMIUM,
        delay: shouldReduceMotion ? 0 : delay,
      },
    },
  }),

  editorialImage: (delay = 0, shouldReduceMotion = false) => ({
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 35,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.8,
        ease: MOTION_CURVE_PREMIUM,
        delay: shouldReduceMotion ? 0 : delay,
      },
    },
    hover: {
      scale: shouldReduceMotion ? 1 : 1.02,
      transition: {
        duration: 0.4,
        ease: MOTION_CURVE_PREMIUM,
      },
    },
  }),

  supportingText: (delay = 0, shouldReduceMotion = false) => ({
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.75,
        ease: MOTION_CURVE_PREMIUM,
        delay: shouldReduceMotion ? 0 : delay,
      },
    },
  }),

  interactiveButton: (delay = 0, shouldReduceMotion = false) => ({
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.4,
        ease: MOTION_CURVE_PREMIUM,
        delay: shouldReduceMotion ? 0 : delay,
      },
    },
    hover: {
      x: shouldReduceMotion ? 0 : 2,
      transition: {
        duration: 0.25,
        ease: MOTION_CURVE_PREMIUM,
      },
    },
  }),

  navigation: (delay = 0, shouldReduceMotion = false) => ({
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.4,
        ease: MOTION_CURVE_PREMIUM,
        delay: shouldReduceMotion ? 0 : delay,
      },
    },
  }),

  metaLabel: (delay = 0, shouldReduceMotion = false) => ({
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.4,
        ease: MOTION_CURVE_PREMIUM,
        delay: shouldReduceMotion ? 0 : delay,
      },
    },
  }),
};

export const SPRING_PREMIUM_CONFIG = {
  duration: 0.45,
  ease: MOTION_CURVE_PREMIUM,
};

export const getPremiumRevealVariants = (delay = 0, shouldReduceMotion = false) =>
  motionRoles.supportingText(delay, shouldReduceMotion);

// Timing Constants
export const DURATION_PRIMARY = 0.6;
export const DURATION_SECONDARY = 0.5;
export const DURATION_SUPPORTING = 0.35;

export const OFFSET_PRIMARY = 4;
export const OFFSET_SECONDARY = 3;
export const OFFSET_SUPPORTING = 0;

export type ElementImportance = 'primary' | 'secondary' | 'supporting';

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

export const getTransitionByImportance = (importance: ElementImportance, delay = 0) => {
  return {
    duration: getDurationByImportance(importance),
    ease: MOTION_CURVE_PREMIUM,
    delay,
  };
};

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

export const getEditorialRevealVariants = (delay = 0, _duration = 0.5, shouldReduceMotion = false) =>
  motionRoles.supportingText(delay, shouldReduceMotion);

export const getFadeOnlyVariants = (delay = 0) =>
  motionRoles.metaLabel(delay);

export const manifestoLineVariants = motionRoles.largeTypography(0);

export const getDynamicLineVariants = (shouldReduceMotion: boolean) =>
  motionRoles.largeTypography(0, shouldReduceMotion);

export const getParagraphVariants = (shouldReduceMotion: boolean) =>
  motionRoles.supportingText(0, shouldReduceMotion);

export const getMenuVariants = (shouldReduceMotion = false) => ({
  hidden: {
    opacity: 0,
    y: shouldReduceMotion ? 0 : -12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: shouldReduceMotion ? 0.01 : 0.35,
      ease: MOTION_CURVE_PREMIUM,
    },
  },
  exit: {
    opacity: 0,
    y: shouldReduceMotion ? 0 : -8,
    transition: {
      duration: shouldReduceMotion ? 0.01 : 0.25,
      ease: MOTION_CURVE_PREMIUM,
    },
  },
});

export const getLinksContainerVariants = (shouldReduceMotion = false) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: shouldReduceMotion ? 0 : 0.06,
      delayChildren: shouldReduceMotion ? 0 : 0.08,
    },
  },
  exit: {
    transition: {
      staggerChildren: shouldReduceMotion ? 0 : 0.03,
      staggerDirection: -1,
    },
  },
});

export const getMenuLinkVariants = (shouldReduceMotion = false) => ({
  hidden: {
    opacity: 0,
    y: shouldReduceMotion ? 0 : 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: shouldReduceMotion ? 0.01 : 0.45,
      ease: MOTION_CURVE_PREMIUM,
    },
  },
  exit: {
    opacity: 0,
    y: shouldReduceMotion ? 0 : 8,
    transition: {
      duration: shouldReduceMotion ? 0.01 : 0.2,
      ease: MOTION_CURVE_PREMIUM,
    },
  },
});

export function useHeaderLogoScroll() {
  const { scrollY } = useScroll();
  const logoOpacity = useTransform(scrollY, [60, 240], [0, 1]);
  const logoY = useTransform(scrollY, [60, 240], [0, 0]);
  return { logoOpacity, logoY };
}
