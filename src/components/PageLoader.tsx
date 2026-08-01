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
          className="page-loader bg-[var(--bg-color)]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'var(--bg-color)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <motion.div
            id="loader-logo-name"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="branding-container name logo-container typo-loader-text text-[var(--text-color)] select-none whitespace-nowrap"
          >
            RΛZΛN ΛZIZIEH
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
