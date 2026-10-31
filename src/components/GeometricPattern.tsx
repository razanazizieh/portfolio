/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export interface GeometricPatternProps {
  seed?: string;
  className?: string;
}

/**
 * Geometric CSS Pattern Fallback
 * Generates a structural monochrome (var(--ink) and #ECEAE4)
 * geometric pattern that perfectly conforms to its container.
 */
export function GeometricPattern({
  seed = "default",
  className = "",
}: GeometricPatternProps) {
  let patternStyle: React.CSSProperties = {};

  switch (seed) {
    case "vortex-grid":
      patternStyle = {
        backgroundColor: "#ECEAE4",
        backgroundImage: `
          radial-gradient(rgba(20, 20, 20, 0.08) 1.5px, transparent 1.5px),
          radial-gradient(rgba(20, 20, 20, 0.08) 1.5px, #ECEAE4 1.5px)
        `,
        backgroundSize: "32px 32px",
        backgroundPosition: "0 0, 16px 16px",
      };
      break;

    case "data-blocks":
      patternStyle = {
        backgroundColor: "#ECEAE4",
        backgroundImage: `
          linear-gradient(45deg, rgba(20, 20, 20, 0.08) 25%, transparent 25%),
          linear-gradient(-45deg, rgba(20, 20, 20, 0.08) 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, rgba(20, 20, 20, 0.08) 75%),
          linear-gradient(-45deg, transparent 75%, rgba(20, 20, 20, 0.08) 75%)
        `,
        backgroundSize: "48px 48px",
        backgroundPosition: "0 0, 0 24px, 24px -24px, -24px 0px",
      };
      break;

    case "fluid-columns":
      patternStyle = {
        backgroundColor: "#ECEAE4",
        backgroundImage: `
          repeating-linear-gradient(
            0deg,
            rgba(20, 20, 20, 0.08),
            rgba(20, 20, 20, 0.08) 1px,
            transparent 1px,
            transparent 28px
          )
        `,
      };
      break;

    case "lepoque-checker":
    default:
      patternStyle = {
        backgroundColor: "#ECEAE4",
        backgroundImage: `
          repeating-linear-gradient(
            45deg,
            rgba(20, 20, 20, 0.08),
            rgba(20, 20, 20, 0.08) 1px,
            transparent 1px,
            transparent 20px
          )
        `,
      };
      break;
  }

  return (
    <div
      aria-hidden="true"
      style={patternStyle}
      className={`w-full h-full select-none ${className}`}
    />
  );
}

export default GeometricPattern;
