/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

interface PageLoaderProps {
  loading: boolean;
}

export default function PageLoader({ loading }: PageLoaderProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="page-loader"
          aria-hidden="true"
          className="page-loader bg-[var(--bg-color)]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100vh',
            background: 'var(--bg-color)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pointerEvents: 'none',
          }}
        >
          <motion.div
            id="loader-logo-name"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex justify-center items-center select-none px-4 sm:px-12 text-center"
          >
            <span className="text-[clamp(2.5rem,8.2vw,8.5rem)] font-display font-semibold uppercase text-neutral-950 dark:text-neutral-50 leading-[0.88] whitespace-nowrap tracking-[-0.035em] select-none">
              RAZAN AZIZIEH
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
