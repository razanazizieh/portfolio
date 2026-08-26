// /**
//  * @license
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import React from 'react';
// import { motion } from 'motion/react';

// interface NotFoundProps {
//   handleNav: (e: React.SyntheticEvent | { preventDefault: () => void }, targetId: string) => void;
// }

// export default function NotFound({ handleNav }: NotFoundProps) {
//   const handleReturnHome = (e: React.MouseEvent) => {
//     e.preventDefault();
//     handleNav(e, 'hero');
//   };

//   return (
//     <div className="min-h-screen w-full bg-[var(--bg-color)] text-[var(--text-color)] relative flex flex-col justify-center items-center p-6 selection:bg-[var(--text-color)] selection:text-[var(--bg-color)] antialiased">
      
//       {/* Absolute Void Core */}
//       <div className="max-w-xl text-center space-y-6 z-10">
        
//         {/* Swiss Style High-Contrast Typography */}
//         <div className="overflow-hidden block py-2">
//           <motion.h1 
//             initial={{ y: "100%", opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//             className="text-[10rem] md:text-[15rem] font-black tracking-[calc(-0.06em)] leading-[0.8] text-[var(--text-color)] select-none font-sans antialiased subpixel-antialiased"
//             style={{
//               transform: 'translateZ(0)',
//               backfaceVisibility: 'hidden',
//               WebkitFontSmoothing: 'subpixel-antialiased',
//               MozOsxFontSmoothing: 'grayscale'
//             }}
//           >
//             404
//           </motion.h1>
//         </div>

//         {/* Muted Functional Explanation with Staggered Mask Reveal */}
//         <div className="space-y-3 pt-4">
//           <div className="overflow-hidden block py-1">
//             <motion.h2
//               initial={{ y: "100%", opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
//               className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#525252] dark:text-[#A3A3A3] uppercase"
//             >
//               PAGE NOT FOUND
//             </motion.h2>
//           </div>
//           <div className="overflow-hidden block py-0.5">
//             <motion.p
//               initial={{ y: "100%", opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
//               className="font-mono text-xs sm:text-sm text-[#525252] dark:text-[#A3A3A3] max-w-sm mx-auto leading-relaxed"
//             >
//               The page you are looking for doesn't exist or has been moved.
//             </motion.p>
//           </div>
//         </div>

//         {/* Pure Color Interaction Link */}
//         <div className="overflow-hidden block py-1 pt-6">
//           <motion.div
//             initial={{ y: "100%", opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
//           >
//             <button
//               onClick={handleReturnHome}
//               aria-label="Return to homepage"
//               className="font-mono text-xs font-semibold tracking-wider uppercase text-[#0A0A0A] dark:text-white hover:text-[#FF4500] dark:hover:text-[#FF4500] focus:text-[#FF4500] dark:focus:text-[#FF4500] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4500] rounded-sm py-1.5 px-3 cursor-pointer select-none"
//             >
//               RETURN HOME
//             </button>
//           </motion.div>
//         </div>

//       </div>
//     </div>
//   );
// }
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { MOTION_CURVE_PREMIUM } from '../utils/motion';

interface NotFoundProps {
  handleNav: (e: React.SyntheticEvent | { preventDefault: () => void }, targetId: string) => void;
}

export default function NotFound({ handleNav }: NotFoundProps) {
  const shouldReduceMotion = useReducedMotion();

  const handleReturnHome = (e: React.MouseEvent) => {
    e.preventDefault();
    handleNav(e, 'hero');
  };

  return (
    <div
      aria-label="404 Page Not Found"
      style={{
        paddingLeft: 'max(20px, 4vw)',
        paddingRight: 'max(20px, 4vw)',
      }}
      className="min-h-screen w-full relative flex flex-col justify-center items-center py-24 select-text"
    >
      {/* Editorial Centered Thought Void */}
      <div className="max-w-xl text-center space-y-6 z-10 select-text">
        {/* Large Display Typographic Specimen */}
        <motion.h1 
          initial={{ y: shouldReduceMotion ? 0 : 20, opacity: shouldReduceMotion ? 1 : 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.6, ease: MOTION_CURVE_PREMIUM }}
          className="text-[6rem] sm:text-[8rem] md:text-[9.5rem] font-semibold tracking-tight leading-[0.9] text-neutral-950 dark:text-neutral-50 select-none font-display"
        >
          404
        </motion.h1>

        {/* Quiet Metadata & Explanation */}
        <div className="space-y-3 pt-2">
          <motion.div
            initial={{ y: shouldReduceMotion ? 0 : 20, opacity: shouldReduceMotion ? 1 : 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.6, ease: MOTION_CURVE_PREMIUM, delay: 0.08 }}
            className="font-mono text-[11px] sm:text-xs font-medium tracking-[0.14em] leading-none text-neutral-500 dark:text-neutral-400 uppercase"
          >
            NOT FOUND
          </motion.div>

          <motion.p
            initial={{ y: shouldReduceMotion ? 0 : 20, opacity: shouldReduceMotion ? 1 : 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.6, ease: MOTION_CURVE_PREMIUM, delay: 0.14 }}
            className="font-sans text-base sm:text-lg font-normal text-neutral-600 dark:text-neutral-400 max-w-[42ch] mx-auto leading-[1.65]"
          >
            The page you are looking for does not exist or has been relocated.
          </motion.p>
        </div>

        {/* Clear Return Route */}
        <motion.div
          initial={{ y: shouldReduceMotion ? 0 : 20, opacity: shouldReduceMotion ? 1 : 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.6, ease: MOTION_CURVE_PREMIUM, delay: 0.2 }}
          className="pt-6"
        >
          <button
            onClick={handleReturnHome}
            aria-label="Return to portfolio homepage"
            className="font-mono text-[11px] font-medium tracking-[0.14em] uppercase text-neutral-950 dark:text-neutral-50 hover:opacity-60 focus:opacity-60 transition-opacity duration-150 ease-out focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 py-1.5 px-3 cursor-pointer select-none bg-transparent border-none"
          >
            RETURN HOME
          </button>
        </motion.div>
      </div>
    </div>
  );
}

