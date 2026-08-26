/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';

interface UseIntersectionRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  detectLeave?: boolean;
}

export function useIntersectionReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionRevealOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -18% 0px',
    once = true,
    detectLeave = false,
  } = options;

  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // If SSR or IntersectionObserver is not supported, reveal immediately
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          node.classList.add('reveal-on-scroll', 'is-inview', 'is-visible');
          node.classList.remove('is-leave', 'is-leaving', 'project-card-leave');
          if (once && !detectLeave) {
            observer.unobserve(node);
          }
        } else {
          if (detectLeave && entry.boundingClientRect.top < 0) {
            node.classList.add('is-leave', 'is-leaving', 'project-card-leave');
          } else {
            node.classList.remove('is-leave', 'is-leaving', 'project-card-leave');
          }
          if (!once) {
            setIsVisible(false);
            node.classList.remove('reveal-on-scroll', 'is-inview', 'is-visible');
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once, detectLeave]);

  return { ref, isVisible };
}
