/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Editorial Motion Curves & Shared Constants
 */
export const MOTION_CURVE_PREMIUM = [0.16, 1, 0.3, 1] as const;
export const MOTION_CURVE_CINEMATIC = [0.16, 1, 0.3, 1] as const;
export const MOTION_CURVE_EDITORIAL = [0.16, 1, 0.3, 1] as const;
export const MOTION_CURVE_PREMIUM_STRING = "cubic-bezier(0.16, 1, 0.3, 1)";
export const MOTION_DURATION_DEFAULT = 0.7;

export const REVEAL_VIEWPORT_CONFIG = {
  once: true,
  amount: 0.14,
  margin: "0px 0px -30px 0px",
} as const;
