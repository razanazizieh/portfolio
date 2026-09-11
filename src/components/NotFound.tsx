// import React from "react";
// import { motion, useReducedMotion } from "motion/react";
// import { MOTION_CURVE_PREMIUM } from "../utils/motion";

// interface NotFoundProps {
//   handleNav: (
//     e: React.SyntheticEvent | { preventDefault: () => void },
//     targetId: string,
//   ) => void;
// }

// export default function NotFound({ handleNav }: NotFoundProps) {
//   const shouldReduceMotion = useReducedMotion();

//   const handleReturnHome = (e: React.MouseEvent) => {
//     e.preventDefault();
//     handleNav(e, "hero");
//   };

//   return (
//     <div
//       aria-label="404 Page Not Found"
//       style={{
//         paddingLeft: "max(20px, 4vw)",
//         paddingRight: "max(20px, 4vw)",
//       }}
//       className="min-h-screen w-full relative flex flex-col justify-center items-center py-24 select-text"
//     >
//       {/* Editorial Centered Thought Void */}
//       <div className="max-w-xl text-center space-y-6 z-10 select-text">
//         {/* Large Display Typographic Specimen */}
//         <motion.h1
//           initial={{
//             y: shouldReduceMotion ? 0 : 20,
//             opacity: shouldReduceMotion ? 1 : 0,
//           }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{
//             duration: shouldReduceMotion ? 0.01 : 0.6,
//             ease: MOTION_CURVE_PREMIUM,
//           }}
//           className="text-[6rem] sm:text-[8rem] md:text-[9.5rem] font-semibold tracking-tight leading-[0.9] text-neutral-950 dark:text-neutral-50 select-none font-display"
//         >
//           404
//         </motion.h1>

//         {/* Quiet Metadata & Explanation */}
//         <div className="space-y-3 pt-2">
//           <motion.div
//             initial={{
//               y: shouldReduceMotion ? 0 : 20,
//               opacity: shouldReduceMotion ? 1 : 0,
//             }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{
//               duration: shouldReduceMotion ? 0.01 : 0.6,
//               ease: MOTION_CURVE_PREMIUM,
//               delay: 0.08,
//             }}
//             className="font-mono text-[11px] sm:text-xs font-medium tracking-[0.14em] leading-none text-neutral-500 dark:text-neutral-400 uppercase"
//           >
//             NOT FOUND
//           </motion.div>

//           {/* <motion.p
//             initial={{
//               y: shouldReduceMotion ? 0 : 20,
//               opacity: shouldReduceMotion ? 1 : 0,
//             }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{
//               duration: shouldReduceMotion ? 0.01 : 0.6,
//               ease: MOTION_CURVE_PREMIUM,
//               delay: 0.14,
//             }}
//             className="font-sans text-base sm:text-lg font-normal text-neutral-600 dark:text-neutral-400 max-w-[42ch] mx-auto leading-[1.65]"
//           >
//             The page you are looking for does not exist or has been relocated.
//           </motion.p> */}
//           <motion.p
//             initial={{
//               y: shouldReduceMotion ? 0 : 20,
//               opacity: shouldReduceMotion ? 1 : 0,
//             }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{
//               duration: shouldReduceMotion ? 0.01 : 0.6,
//               ease: MOTION_CURVE_PREMIUM,
//               delay: 0.14,
//             }}
//             className="font-sans text-base sm:text-lg font-normal text-neutral-600 dark:text-neutral-400 max-w-[42ch] mx-auto leading-[1.65]"
//           >
//             Work in progress. Great things take a little time (& coffee ;)
//             Back very soon!
//           </motion.p>
//         </div>

//         {/* Clear Return Route */}
//         {/* <motion.div
//           initial={{
//             y: shouldReduceMotion ? 0 : 20,
//             opacity: shouldReduceMotion ? 1 : 0,
//           }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{
//             duration: shouldReduceMotion ? 0.01 : 0.6,
//             ease: MOTION_CURVE_PREMIUM,
//             delay: 0.2,
//           }}
//           className="pt-6"
//         >
//           <button
//             onClick={handleReturnHome}
//             aria-label="Return to portfolio homepage"
//             className="font-mono text-[11px] font-medium tracking-[0.14em] uppercase text-neutral-950 dark:text-neutral-50 hover:opacity-60 focus:opacity-60 transition-opacity duration-150 ease-out focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 py-1.5 px-3 cursor-pointer select-none bg-transparent border-none"
//           >
//             RETURN HOME
//           </button>
//         </motion.div> */}
//       </div>
//     </div>
//   );
// }
import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { MOTION_CURVE_PREMIUM } from "../utils/motion";
import DeterministicShuffle from "./DeterministicShuffle";

interface NotFoundProps {
  handleNav: (
    e: React.SyntheticEvent | { preventDefault: () => void },
    targetId: string,
  ) => void;
}

export default function NotFound({ handleNav }: NotFoundProps) {
  const shouldReduceMotion = useReducedMotion();

  const handleReturnHome = (e: React.MouseEvent) => {
    e.preventDefault();
    handleNav(e, "hero");
  };

  return (
    <div
      id="not-found-page"
      aria-label="404 Page Not Found"
      className="min-h-screen w-full relative flex flex-col justify-between items-center py-20 sm:py-32 px-4 sm:px-8 lg:px-12 select-text bg-[var(--bg-color)] text-[var(--text-color)] overflow-x-hidden"
    >
      {/* Top spacing buffer */}
      <div className="w-full pt-12 sm:pt-20" />

      {/* Editorial Centered Thought Void with sequential staggered entrance */}
      <div className="w-full max-w-4xl mx-auto text-center space-y-8 z-10 select-text flex flex-col items-center justify-center">
        {/* 1. Large Display Typographic Specimen */}
        <motion.div
          initial={{
            y: shouldReduceMotion ? 0 : 18,
            opacity: shouldReduceMotion ? 1 : 0,
          }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: shouldReduceMotion ? 0.01 : 0.75,
            ease: MOTION_CURVE_PREMIUM,
            delay: shouldReduceMotion ? 0 : 0.05,
          }}
          className="w-full flex justify-center"
        >
          <DeterministicShuffle
            text="404"
            as="h1"
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-display font-light tracking-tighter leading-[0.92] text-neutral-900 dark:text-neutral-50 uppercase select-text text-center cursor-default inline-block"
          />
        </motion.div>

        {/* 2. Quiet Metadata & Explanation */}
        <motion.div
          initial={{
            y: shouldReduceMotion ? 0 : 16,
            opacity: shouldReduceMotion ? 1 : 0,
          }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: shouldReduceMotion ? 0.01 : 0.72,
            ease: MOTION_CURVE_PREMIUM,
            delay: shouldReduceMotion ? 0 : 0.18,
          }}
          className="space-y-4 max-w-xl mx-auto"
        >
          <p className="font-sans text-base sm:text-lg font-light text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-[46ch] mx-auto">
            The page you are looking for does not exist or has been relocated.
          </p>
        </motion.div>

        {/* 3. Return Home Route */}
        <motion.div
          initial={{
            y: shouldReduceMotion ? 0 : 14,
            opacity: shouldReduceMotion ? 1 : 0,
          }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: shouldReduceMotion ? 0.01 : 0.68,
            ease: MOTION_CURVE_PREMIUM,
            delay: shouldReduceMotion ? 0 : 0.30,
          }}
          className="pt-6"
        >
          <button
            onClick={handleReturnHome}
            aria-label="Return to portfolio homepage"
            className="font-mono text-xs uppercase tracking-widest text-neutral-900 dark:text-neutral-100 hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors duration-200 ease-out focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 py-2.5 px-4 cursor-pointer select-none bg-transparent border-0 font-normal"
          >
            RETURN HOME
          </button>
        </motion.div>
      </div>
    </div>
  );
}
