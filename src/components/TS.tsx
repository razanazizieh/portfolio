/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ReactNode } from "react";

export interface TSProps {
  children: ReactNode;
  active?: boolean;
  className?: string;
  caps?: boolean;
  reverse?: boolean;
}

/**
 * Type Swap Interaction Component
 * Renders two layers: .ts-a (normal text in Inter Tight) and .ts-b (Instrument Serif italic).
 * Hover/focus/active transitions clip-path to sweep from .ts-a to .ts-b.
 * When reverse is true, .ts-a is Instrument Serif italic at rest and sweeps to sans on hover.
 */
export function TS({
  children,
  active = false,
  className = "",
  caps = false,
  reverse = false,
}: TSProps) {
  const capsClass = caps ? "ts--caps" : "";
  const reverseClass = reverse ? "ts--reverse" : "";
  const combinedClassName = `ts ${capsClass} ${reverseClass} ${className}`.trim();

  return (
    <span className={combinedClassName} data-active={active ? "true" : undefined}>
      <span className="ts-a">{children}</span>
      <span className="ts-b" aria-hidden="true">
        {children}
      </span>
    </span>
  );
}

export default TS;
