/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function useSmoothScroll(enabled: boolean = true) {
  const location = useLocation();

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0.01 : 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisInstance = lenis;

    // Expose global scroll utilities mapped to Lenis
    (window as any).__lenis = lenis;
    (window as any).__instantScrollTo = (targetPos: number | HTMLElement | string) => {
      lenis.scrollTo(targetPos, { immediate: true });
    };
    (window as any).__smoothScrollTo = (targetPos: number | HTMLElement | string) => {
      lenis.scrollTo(targetPos, { duration: 1.2 });
    };

    // Synchronize Lenis with GSAP ScrollTrigger
    const handleLenisScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on('scroll', handleLenisScroll);

    // Integrate with GSAP ticker for frame-perfect animation pacing
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.off('scroll', handleLenisScroll);
      lenis.destroy();
      lenisInstance = null;
      delete (window as any).__lenis;
      delete (window as any).__instantScrollTo;
      delete (window as any).__smoothScrollTo;
    };
  }, [enabled]);

  // Instantly halt active smooth scrolling on route changes
  useEffect(() => {
    if (!enabled || !lenisInstance) return;
    try {
      lenisInstance.scrollTo(window.scrollY, { immediate: true });
    } catch (e) {
      console.warn('Failed to abort active scroll transition on route change', e);
    }
  }, [location.pathname, enabled]);
}
