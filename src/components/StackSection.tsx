/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ReactNode, CSSProperties } from "react";

export interface StackSectionProps {
  id?: string;
  z?: number;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  sticky?: boolean;
  onPointerMove?: React.PointerEventHandler<HTMLElement>;
  onPointerLeave?: React.PointerEventHandler<HTMLElement>;
}

/**
 * Plain section wrapper in normal flow (no sticky, no z-index stacking, no top calc).
 */
export const StackSection = React.forwardRef<HTMLElement, StackSectionProps>(function StackSection(
  {
    id,
    children,
    className = "",
    style,
    onPointerMove,
    onPointerLeave,
  }: StackSectionProps,
  ref
) {
  return (
    <section
      id={id}
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{
        backgroundColor: "#F5F4F0",
        paddingBlock: "var(--pad-y, clamp(64px, 10svh, 120px))",
        ...style,
      }}
      className={`w-full bg-[#F5F4F0] ${className}`}
    >
      {children}
    </section>
  );
});

export default StackSection;
