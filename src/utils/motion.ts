/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RefObject } from 'react';
import { useScroll, useTransform, useMotionValue } from 'motion/react';


/**
 * Standardized Motion Language Definitions
 * 
 * Defines cohesive motion roles according to editorial content hierarchy:
 * - Large Typography: Soft, quiet reveal with micro-clip or subtle 4px translation (600ms)
 * - Editorial Images: Soft opacity fade with subtle 1.015 -> 1.000 scale settle (750ms)
 * - Supporting Text: Micro-translation (3px) + soft opacity fade (500ms)
 * - Interactive Buttons: Instant, responsive opacity reveal (350ms) with 3px hover translation
 * - Navigation: Smooth frame fade (350ms)
 * - Meta Labels: Direct opacity reveal (400ms)
 */

export const MOTION_CURVE_PREMIUM = [0.16, 1, 0.3, 1] as const;
export const MOTION_CURVE_PREMIUM_STRING = "cubic-bezier(0.16, 1, 0.3, 1)";

export const VIEWPORT_ONCE_CONFIG = {
  once: true,
  margin: "-60px",
} as const;

export type ContentRole =
  | 'largeTypography'
  | 'editorialImage'
  | 'supportingText'
  | 'interactiveButton'
  | 'navigation'
  | 'metaLabel';

export const motionRoles = {
  largeTypography: (delay = 0, _shouldReduceMotion = false) => ({
    hidden: {
      opacity: 0,
      y: 4,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: MOTION_CURVE_PREMIUM,
        delay,
      },
    },
  }),

  editorialImage: (delay = 0, _shouldReduceMotion = false) => ({
    hidden: {
      opacity: 0,
      scale: 1.015,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.75,
        ease: MOTION_CURVE_PREMIUM,
        delay,
      },
    },
    hover: {
      scale: 1.012,
      transition: {
        duration: 0.6,
        ease: MOTION_CURVE_PREMIUM,
      },
    },
  }),

  supportingText: (delay = 0, _shouldReduceMotion = false) => ({
    hidden: {
      opacity: 0,
      y: 3,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: MOTION_CURVE_PREMIUM,
        delay,
      },
    },
  }),

  interactiveButton: (delay = 0) => ({
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.35,
        ease: MOTION_CURVE_PREMIUM,
        delay,
      },
    },
    hover: {
      x: 3,
      transition: {
        duration: 0.3,
        ease: MOTION_CURVE_PREMIUM,
      },
    },
  }),

  navigation: (delay = 0) => ({
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.35,
        ease: MOTION_CURVE_PREMIUM,
        delay,
      },
    },
  }),

  metaLabel: (delay = 0) => ({
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: MOTION_CURVE_PREMIUM,
        delay,
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

export function useCredoScroll(targetRef: RefObject<HTMLDivElement | null>, _shouldReduceMotion: boolean) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const l1X = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const l2X = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const l3X = useTransform(scrollYProgress, [0, 1], [0, 0]);

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


