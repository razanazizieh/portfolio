/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { TS } from "./TS";

export interface HLProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  large?: boolean;
  workTitle?: boolean;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
  ariaLive?: "off" | "polite" | "assertive";
  dataActive?: boolean;
  asSpan?: boolean;
  key?: React.Key;
}

/**
 * Reusable <HL> Interactive Component
 * Powered by the Type Swap (TS) system:
 * - Inter Tight -> Instrument Serif italic on hover / active / focus-visible
 * - Monochrome palette: var(--ink) and var(--ink-2)
 */
export function HL({
  children,
  to,
  href,
  onClick,
  className = "",
  target,
  rel,
  type = "button",
  ariaLabel,
  ariaLive,
  dataActive = false,
  asSpan = false,
}: HLProps) {
  const baseClasses = `inline-flex items-baseline no-underline cursor-pointer focus-visible:outline-none ${className}`;

  const content = <TS active={dataActive}>{children}</TS>;

  if (asSpan) {
    return (
      <span
        data-active={dataActive ? "true" : undefined}
        className={baseClasses}
      >
        {content}
      </span>
    );
  }

  if (to) {
    return (
      <Link
        to={to}
        onClick={onClick}
        aria-label={ariaLabel}
        data-active={dataActive ? "true" : undefined}
        className={baseClasses}
      >
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        target={target}
        rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
        aria-label={ariaLabel}
        data-active={dataActive ? "true" : undefined}
        className={baseClasses}
      >
        {content}
      </a>
    );
  }

  if (onClick) {
    return (
      <button
        type={type}
        onClick={onClick}
        aria-label={ariaLabel}
        aria-live={ariaLive}
        data-active={dataActive ? "true" : undefined}
        className={`bg-transparent border-none p-0 text-left ${baseClasses}`}
      >
        {content}
      </button>
    );
  }

  return (
    <span
      data-active={dataActive ? "true" : undefined}
      className={baseClasses}
    >
      {content}
    </span>
  );
}

export default HL;
