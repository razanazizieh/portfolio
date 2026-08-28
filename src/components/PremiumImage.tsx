import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  VIEWPORT_EDITORIAL_CONFIG,
  MOTION_CURVE_PREMIUM,
} from "../utils/motion";

interface PremiumImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string; // e.g., 'aspect-[16/10]'
  borderNone?: boolean;
  isPriority?: boolean;
}

export default function PremiumImage({
  src,
  alt,
  className = "",
  aspectRatio = "",
  isPriority = false,
}: PremiumImageProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      initial={{
        opacity: shouldReduceMotion ? 1 : 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      viewport={VIEWPORT_EDITORIAL_CONFIG}
      transition={{
        duration: shouldReduceMotion ? 0.01 : 0.9,
        ease: MOTION_CURVE_PREMIUM,
      }}
      className={`relative w-full select-none cursor-default ${aspectRatio} bg-transparent border-none outline-none shadow-none p-0 m-0 overflow-hidden will-change-[transform,opacity]`}
    >
      <div
        className={`relative w-full ${aspectRatio ? "h-full overflow-hidden" : "h-auto"} bg-transparent p-0 m-0 flex items-center justify-center overflow-hidden`}
      >
        {/* Skeleton placeholder during initial load */}
        <AnimatePresence>
          {!isLoaded && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-neutral-100/50 dark:bg-neutral-900/50 flex items-center justify-center min-h-[160px]"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-dim)] opacity-50">
                loading asset
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Image with scale settle */}
        <motion.img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          decoding="async"
          loading={isPriority ? "eager" : "lazy"}
          fetchPriority={isPriority ? "high" : "auto"}
          initial={{ scale: shouldReduceMotion ? 1 : 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={VIEWPORT_EDITORIAL_CONFIG}
          transition={{
            duration: shouldReduceMotion ? 0.01 : 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`w-full h-auto max-h-full ${
            className.includes("object-") ? "" : "object-contain object-top"
          } transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isLoaded ? "opacity-100" : "opacity-0"
          } ${className} will-change-transform`}
          referrerPolicy="no-referrer"
        />
      </div>
    </motion.div>
  );
}
