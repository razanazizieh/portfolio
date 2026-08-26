/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useScroll, useTransform } from 'motion/react';

/**
 * Editorial Motion Language & Choreography
 * 
 * Rules:
 * - Directed motion with intentional visual rhythm (arrival, discovery, continuity, hierarchy)
 * - Restrained typography reveals (full block masks, no letter/word splitting)
 * - Uncovered image exposures (clean clip/depth settle, no curtain/wipe clichés)
 * - Re-entry support via VIEWPORT_EDITORIAL_CONFIG (allows graceful re-discovery on scroll return)
 * - Zero layout shifts & reduced-motion accessibility compliance
 */

export const MOTION_CURVE_PREMIUM = [0.16, 1, 0.3, 1] as const;
export const MOTION_CURVE_SLOW = [0.16, 1, 0.3, 1] as const;
export const MOTION_CURVE_PREMIUM_STRING = "cubic-bezier(0.16, 1, 0.3, 1)";
export const MOTION_DURATION_DEFAULT = 0.85;

// Reversible viewport configurations: trigger early when element top hits 85% of screen height
export const VIEWPORT_REVERSIBLE_CONFIG = {
  once: false,
  amount: 0.05,
  margin: "0px 0px -15% 0px",
} as const;

export const VIEWPORT_EDITORIAL_CONFIG = {
  once: false,
  amount: 0.05,
  margin: "0px 0px -15% 0px",
} as const;

// Backward-compatibility alias routed to reversible choreography
export const VIEWPORT_ONCE_CONFIG = {
  once: false,
  amount: 0.05,
  margin: "0px 0px -15% 0px",
} as const;

export const FADE_UP_VARIANTS = (delay = 0, shouldReduceMotion = false) => ({
  hidden: {
    opacity: shouldReduceMotion ? 1 : 0,
    y: shouldReduceMotion ? 0 : 45,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: shouldReduceMotion ? 0.01 : 0.85,
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
  offset = 45,
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
      duration: shouldReduceMotion ? 0.01 : 0.85,
      ease: MOTION_CURVE_PREMIUM,
      delay: shouldReduceMotion ? 0 : delay,
    },
  },
});

export const lineMaskVariants = (delay = 0, shouldReduceMotion = false) => ({
  hidden: {
    y: shouldReduceMotion ? 0 : 45,
    opacity: shouldReduceMotion ? 1 : 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: shouldReduceMotion ? 0.01 : 0.85,
      ease: MOTION_CURVE_PREMIUM,
      delay: shouldReduceMotion ? 0 : delay,
    },
  },
});

export const motionRoles = {
  largeTypography: (delay = 0, shouldReduceMotion = false) => ({
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 45,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.85,
        ease: MOTION_CURVE_PREMIUM,
        delay: shouldReduceMotion ? 0 : delay,
      },
    },
  }),

  editorialImage: (delay = 0, shouldReduceMotion = false) => ({
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 45,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.85,
        ease: MOTION_CURVE_PREMIUM,
        delay: shouldReduceMotion ? 0 : delay,
      },
    },
    hover: {
      scale: shouldReduceMotion ? 1 : 1.015,
      transition: {
        duration: 0.4,
        ease: MOTION_CURVE_PREMIUM,
      },
    },
  }),

  supportingText: (delay = 0, shouldReduceMotion = false) => ({
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 45,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.85,
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

// Backward-compatible helpers map to the new role-based motion language
export const SPRING_PREMIUM_CONFIG = {
  duration: 0.45,
  ease: MOTION_CURVE_PREMIUM,
};

export const getPremiumRevealVariants = (delay = 0, shouldReduceMotion = false) =>
  motionRoles.supportingText(delay, shouldReduceMotion);

// Timing Constants
export const DURATION_PRIMARY = 0.6;     // Large typography
export const DURATION_SECONDARY = 0.5;   // Supporting text
export const DURATION_SUPPORTING = 0.35;  // Buttons & meta

export const DURATION_LETTER_PRIMARY_1 = 0.35;
export const DURATION_LETTER_PRIMARY_2 = 0.38;

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

export const getMenuVariants = () => motionRoles.navigation(0);

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
      ease: MOTION_CURVE_PREMIUM,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: DURATION_SUPPORTING,
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


