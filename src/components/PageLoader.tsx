import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

interface PageLoaderProps {
  loading: boolean;
}

export default function PageLoader({ loading }: PageLoaderProps) {
  const shouldReduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!loading) {
      setCount(100);
      return;
    }

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Smooth editorial progression to 100%
        const increment = Math.floor(Math.random() * 12) + 8;
        return Math.min(100, prev + increment);
      });
    }, 80);

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="page-loader"
          aria-hidden="true"
          data-no-cursor="true"
          className="page-loader bg-[var(--bg-color)]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            width: "100vw",
            height: "100vh",
            background: "var(--bg-color)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pointerEvents: "auto",
          }}
        >
          <motion.div
            id="loader-logo-name"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center gap-4 select-none px-6 text-center"
          >
            <span className="font-display font-light text-2xl sm:text-3xl tracking-[-0.035em] uppercase text-neutral-950 dark:text-neutral-50 leading-none whitespace-nowrap">
              RAZAN AZIZIEH
            </span>
            <span className="font-mono text-[11px] sm:text-xs text-neutral-400 dark:text-neutral-500 tracking-[0.2em] font-light">
              {String(count).padStart(2, "0")}%
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
