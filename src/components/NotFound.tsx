/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

interface NotFoundProps {
  handleNav: (e: React.SyntheticEvent | { preventDefault: () => void }, targetId: string) => void;
}

export default function NotFound({ handleNav }: NotFoundProps) {
  const handleReturnHome = (e: React.MouseEvent) => {
    e.preventDefault();
    handleNav(e, 'hero');
  };

  return (
    <div className="min-h-screen w-full bg-[var(--bg-color)] text-[var(--text-color)] relative flex flex-col justify-center items-center p-6 selection:bg-[var(--text-color)] selection:text-[var(--bg-color)] antialiased">
      
      {/* Absolute Void Core */}
      <div className="max-w-xl text-center space-y-6 z-10">
        
        {/* Swiss Style High-Contrast Typography */}
        <div className="overflow-hidden block py-2">
          <motion.h1 
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10rem] md:text-[15rem] font-black tracking-[calc(-0.06em)] leading-[0.8] text-[var(--text-color)] select-none font-sans antialiased subpixel-antialiased"
            style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              WebkitFontSmoothing: 'subpixel-antialiased',
              MozOsxFontSmoothing: 'grayscale'
            }}
          >
            404
          </motion.h1>
        </div>

        {/* Muted Functional Explanation with Staggered Mask Reveal */}
        <div className="space-y-4 pt-4">
          <div className="overflow-hidden block py-1">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="text-xs md:text-sm font-semibold tracking-[0.2em] text-[var(--text-dim)] uppercase font-sans"
            >
              PAGE NOT FOUND
            </motion.h2>
          </div>
          <div className="overflow-hidden block py-0.5">
            <motion.p
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
              className="text-xs text-[var(--text-dim-high)] max-w-xs mx-auto leading-relaxed font-mono opacity-80"
            >
              The page you are looking for doesn't exist or has been moved.
            </motion.p>
          </div>
        </div>

        {/* Pure Color Interaction Link */}
        <div className="overflow-hidden block py-1 pt-6">
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          >
            <button
              onClick={handleReturnHome}
              className="text-xs font-mono tracking-[0.25em] text-[var(--text-dim)] hover:text-[var(--text-color)] transition-colors duration-300 uppercase cursor-pointer focus:outline-none focus-visible:underline"
            >
              RETURN HOME
            </button>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
