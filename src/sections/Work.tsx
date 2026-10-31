/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { projects } from "../data/projects";
import { WorkDesktop } from "../components/WorkDesktop";
import { WorkMobile } from "../components/WorkMobile";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * Work Section Orchestrator
 * Desktop: pinned stage with STEP=80 svh of scroll per project.
 * Mobile / prefers-reduced-motion: normal-flow vertical list.
 */
export function Work() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const shouldReduceMotion = useReducedMotion();

  const showDesktop = isDesktop && !shouldReduceMotion;

  if (showDesktop) {
    return <WorkDesktop />;
  }

  return (
    <section
      id="work"
      aria-label="Selected work"
      className="w-full relative bg-[#F5F4F0]"
      style={{ paddingBlock: "var(--pad-y, clamp(64px, 10svh, 120px))" }}
    >
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 min-w-0">
        <WorkMobile projects={projects} />
      </div>
    </section>
  );
}

export default Work;
