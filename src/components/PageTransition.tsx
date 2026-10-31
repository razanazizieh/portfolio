/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ReactNode } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "../hooks/useReducedMotion";

export interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Route Transition Wrapper:
 * The new page fades in over 180ms (opacity only);
 * the old page is not animated out and navigation never waits for any animation.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      style={{ transform: "none", willChange: "opacity" }}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;
