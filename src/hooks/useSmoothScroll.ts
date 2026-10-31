/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { setLenis, getLenis } from '../lib/lenis';

export { getLenis };

interface WindowScrollGlobals {
  __lenis?: Lenis;
  __instantScrollTo?: (target: number | HTMLElement | string) => void;
  __smoothScrollTo?: (target: number | HTMLElement | string) => void;
}

/**
 * useSmoothScroll
 * Lenis: lerp 0.16, wheelMultiplier 1, smoothWheel true, syncTouch false.
 * Exactly ONE requestAnimationFrame loop drives lenis.raf.
 */
export function useSmoothScroll(enabled: boolean = true) {
  const location = useLocation();

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenis = new Lenis({
      lerp: prefersReducedMotion ? 1 : 0.16,
      wheelMultiplier: 1,
      smoothWheel: !prefersReducedMotion,
      syncTouch: false,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      infinite: false,
    });

    setLenis(lenis);

    const win = window as unknown as WindowScrollGlobals;
    win.__lenis = lenis;
    win.__instantScrollTo = (targetPos: number | HTMLElement | string) => {
      lenis.scrollTo(targetPos, { immediate: true });
    };
    win.__smoothScrollTo = (targetPos: number | HTMLElement | string) => {
      lenis.scrollTo(targetPos);
    };

    // Exactly ONE requestAnimationFrame loop drives lenis.raf
    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      setLenis(null);
      delete win.__lenis;
      delete win.__instantScrollTo;
      delete win.__smoothScrollTo;
    };
  }, [enabled]);

  // Instantly halt active smooth scrolling on route changes
  useEffect(() => {
    const curLenis = getLenis();
    if (!enabled || !curLenis) return;
    try {
      curLenis.scrollTo(window.scrollY, { immediate: true });
    } catch {
      // Safe catch
    }
  }, [location.pathname, enabled]);
}
