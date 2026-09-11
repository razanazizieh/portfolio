/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useScroll, useTransform } from 'motion/react';
import type { Variants } from 'motion/react';

/**
 * Editorial Motion Language & Choreography System
 * 
 * Core Philosophy:
 * - The homepage is a sequence of distinct visual chapters, not a single global animation preset.
 * - Each section embodies its own authored motion vocabulary:
 *   * HERO: Controlled typographic establishment & spatial tension
 *   * ABOUT: Editorial reconstruction / spatial emergence in layered visual hierarchies
 *   * WORKS: Visual discovery with project-specific aperture & crop transformations
 *   * STATEMENT: An intentional interruption and pause in page rhythm
 *   * CONTACT: A quiet, grounded resolution
 * - Enter -> Center -> Leave continuity across all section thresholds.
 * - Strict reduced motion compliance across all viewports.
 */

// Authored Easing Curves
export const MOTION_CURVE_PREMIUM = [0.16, 1, 0.3, 1] as const;
export const MOTION_CURVE_CINEMATIC = [0.16, 1, 0.3, 1] as const;
export const MOTION_CURVE_EDITORIAL = [0.16, 1, 0.3, 1] as const;
export const MOTION_CURVE_MONOLITHIC = [0.16, 1, 0.3, 1] as const;
export const MOTION_CURVE_PREMIUM_STRING = "cubic-bezier(0.16, 1, 0.3, 1)";
export const MOTION_DURATION_DEFAULT = 0.85;

// Viewport Configurations for Seamless Editorial Continuity
export const VIEWPORT_EDITORIAL_CONFIG = {
  once: false,
  amount: 0.12,
  margin: "0px 0px -8% 0px",
} as const;

export const VIEWPORT_REVERSIBLE_CONFIG = {
  once: false,
  amount: 0.08,
  margin: "0px 0px -10% 0px",
} as const;

// Viewport Configurations for One-Shot Individual-Element Entrance Choreography
export const REVEAL_VIEWPORT_CONFIG = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -40px 0px",
} as const;

/**
 * Creates container variants that stagger their meaningful child elements.
 */
export const createRevealContainerVariants = (
  stagger = 0.12,
  delay = 0.04,
  shouldReduceMotion = false
): Variants => ({
  hidden: { opacity: shouldReduceMotion ? 1 : 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: shouldReduceMotion ? 0 : stagger,
      delayChildren: shouldReduceMotion ? 0 : delay,
    },
  },
});

/**
 * Creates item variants with restrained, quiet vertical movement and editorial easing.
 */
export const createRevealItemVariants = (
  yOffset = 18,
  duration = 0.72,
  shouldReduceMotion = false
): Variants => ({
  hidden: {
    opacity: shouldReduceMotion ? 1 : 0,
    y: shouldReduceMotion ? 0 : yOffset,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: shouldReduceMotion ? 0.01 : duration,
      ease: MOTION_CURVE_PREMIUM,
    },
  },
});

// -------------------------------------------------------------
// CHAPTER 2: ABOUT CHOREOGRAPHY (Layered Editorial Reconstruction)
// -------------------------------------------------------------

export const aboutChoreography = {
  // Layer 1: Quiet metadata establishes first
  metadata: (shouldReduceMotion = false) => ({
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 8,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.5,
        ease: MOTION_CURVE_PREMIUM,
        delay: shouldReduceMotion ? 0 : 0.02,
      },
    },
  }),

  // Layer 2: Main typographic statement resolves through an optical aperture mask
  headingMask: (shouldReduceMotion = false) => ({
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      clipPath: shouldReduceMotion ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      clipPath: 'inset(0% 0% 0% 0%)',
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.9,
        ease: MOTION_CURVE_CINEMATIC,
        delay: shouldReduceMotion ? 0 : 0.08,
      },
    },
  }),

  // Layer 3: Primary body statement resolves after structural heading
  primaryBody: (shouldReduceMotion = false) => ({
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 18,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.8,
        ease: MOTION_CURVE_PREMIUM,
        delay: shouldReduceMotion ? 0 : 0.22,
      },
    },
  }),

  // Layer 4: Secondary narrative column resolves in parallel
  secondaryBody: (shouldReduceMotion = false) => ({
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.75,
        ease: MOTION_CURVE_PREMIUM,
        delay: shouldReduceMotion ? 0 : 0.32,
      },
    },
  }),

  // Layer 5: Technical disciplines line emerges quietly at the base
  disciplines: (shouldReduceMotion = false) => ({
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.7,
        ease: MOTION_CURVE_PREMIUM,
        delay: shouldReduceMotion ? 0 : 0.44,
      },
    },
  }),
};

// -------------------------------------------------------------
// CHAPTER 5: CONTACT CHOREOGRAPHY (Quiet Spatial Resolution)
// -------------------------------------------------------------

export const contactChoreography = {
  // Label & Header emerge with calm spatial grounding and optical curtain clip
  header: (shouldReduceMotion = false) => ({
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 18,
      clipPath: shouldReduceMotion ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
    },
    visible: {
      opacity: 1,
      y: 0,
      clipPath: 'inset(0% 0% 0% 0%)',
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.75,
        ease: MOTION_CURVE_CINEMATIC,
      },
    },
  }),

  // Body thought appears calmly with controlled clip-path reveal
  body: (shouldReduceMotion = false) => ({
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 14,
      clipPath: shouldReduceMotion ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
    },
    visible: {
      opacity: 1,
      y: 0,
      clipPath: 'inset(0% 0% 0% 0%)',
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.7,
        ease: MOTION_CURVE_PREMIUM,
        delay: shouldReduceMotion ? 0 : 0.12,
      },
    },
  }),

  // Social action anchors resolve with quiet presence and optical clip
  socialItem: (index = 0, shouldReduceMotion = false) => ({
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 14,
      clipPath: shouldReduceMotion ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
    },
    visible: {
      opacity: 1,
      y: 0,
      clipPath: 'inset(0% 0% 0% 0%)',
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.65,
        ease: MOTION_CURVE_EDITORIAL,
        delay: shouldReduceMotion ? 0 : 0.16 + index * 0.08,
      },
    },
  }),
};

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

// Legacy Fallback Helpers (for backward compatibility if needed)
export const SECTION_SCROLL_REVEAL_CONTAINER = (stagger = 0.08, delay = 0, shouldReduceMotion = false) => ({
  hidden: { opacity: shouldReduceMotion ? 1 : 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: shouldReduceMotion ? 0 : stagger,
      delayChildren: shouldReduceMotion ? 0 : delay,
    },
  },
});

export const SECTION_SLIDE_UP_VARIANTS = (offset = 36, delay = 0, shouldReduceMotion = false) => ({
  hidden: {
    opacity: shouldReduceMotion ? 1 : 0,
    y: shouldReduceMotion ? 0 : offset,
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

