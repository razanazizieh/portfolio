/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';

export default function ScrollProgressBar() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX: shouldReduceMotion ? scrollYProgress : scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#FF4500] origin-left z-[90] pointer-events-none"
      aria-hidden="true"
    />
  );
}




// import React from 'react';

// export default function ScrollProgressBar() {
//   // Orange top border removed per minimal editorial specifications
//   return null;
// }


