/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PremiumImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string; // e.g., 'aspect-[16/10]'
  borderNone?: boolean;
}

export default function PremiumImage({
  src,
  alt,
  className = '',
  aspectRatio = '',
  borderNone = false,
}: PremiumImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.15 }}
      onViewportEnter={() => setIsInView(true)}
      className={`relative w-full overflow-hidden select-none cursor-default ${aspectRatio} ${
        borderNone
          ? 'border-none outline-none shadow-none bg-transparent'
          : 'bg-[var(--card-bg-subtle)] border border-white/[0.06]'
      }`}
    >
      <motion.div
        variants={{
          hidden: { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 },
          visible: { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }
        }}
        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full overflow-hidden"
      >
        {/* Premium Swiss skeleton loader with subtle pulse */}
        <AnimatePresence>
          {!isLoaded && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-neutral-200/40 dark:bg-zinc-900/40 animate-pulse flex items-center justify-center"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                loading asset
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Image with smooth fade-in */}
        {isInView && (
          <img
            src={src}
            alt={alt}
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full ${
              className.includes('object-') ? '' : 'object-cover'
            } transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${className}`}
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        )}
      </motion.div>
    </motion.div>
  );
}
