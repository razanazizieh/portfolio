/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * useStickySection Hook
 * 
 * Provides dynamic sticky offset calculation for editorial pull-up section transitions.
 * 
 * Logic:
 * - When section height <= viewport height (vh), the section sticks at `top: 0`.
 * - When section height > viewport height (vh), the section sticks at `top: vh - height`.
 *   This ensures the user scrolls naturally through 100% of the section content,
 *   and the section sticks precisely when its bottom aligns with the viewport bottom.
 * - The next section (with higher z-index) immediately moves UP over it without ANY dead zone.
 */
export function useStickySection<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  const [stickyTop, setStickyTop] = useState<number>(0);
  const [isStickyEnabled, setIsStickyEnabled] = useState<boolean>(true);

  const calculateOffset = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsStickyEnabled(false);
      setStickyTop(0);
      return;
    }

    // On mobile screens (< 768px), keep standard touch composition natural
    if (window.innerWidth < 768) {
      setIsStickyEnabled(false);
      setStickyTop(0);
      return;
    }

    setIsStickyEnabled(true);
    const vh = window.innerHeight;
    const height = el.offsetHeight;
    
    // Calculate top offset: 0 for compact sections, (vh - height) for tall sections
    const offset = Math.min(0, vh - height);
    setStickyTop(offset);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    calculateOffset();

    const resizeObserver = new ResizeObserver(() => {
      calculateOffset();
    });
    resizeObserver.observe(el);

    window.addEventListener('resize', calculateOffset, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', calculateOffset);
    };
  }, [calculateOffset]);

  return { ref, stickyTop, isStickyEnabled };
}
