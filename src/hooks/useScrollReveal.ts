/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollRevealOptions {
  triggerStart?: string;
  duration?: number;
  stagger?: number;
  delay?: number;
  yPercent?: number;
  yOffset?: number;
  ease?: string;
  once?: boolean;
}

/**
 * Custom hook to apply reversible, direction-reactive scroll reveal animations
 * supporting full bidirectional enter/leave transitions whether scrolling up or down.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
): {
  containerRef: RefObject<T>;
} {
  const containerRef = useRef<T>(null);

  const {
    triggerStart = 'top 92%',
    duration = 0.5,
    stagger = 0.04,
    delay = 0,
    yPercent = 0,
    yOffset = 20,
    ease = 'power3.out',
    once = false,
  } = options;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const element = containerRef.current;
    if (!element) return;

    // Find all marked targets or animate the container itself
    const targets = element.querySelectorAll<HTMLElement>('[data-reveal-target]');
    const animationTargets = targets.length > 0 ? Array.from(targets) : [element];

    if (prefersReducedMotion) {
      gsap.set(animationTargets, { yPercent: 0, y: 0, opacity: 1 });
      return;
    }

    // Initialize initial hidden state
    gsap.set(animationTargets, {
      yPercent: yPercent,
      y: yOffset,
      opacity: 0,
    });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: element,
        start: triggerStart,
        once,
        onEnter: () => {
          gsap.to(animationTargets, {
            yPercent: 0,
            y: 0,
            opacity: 1,
            duration,
            ease,
            stagger,
            delay,
            overwrite: 'auto',
          });
        },
        onLeaveBack: () => {
          if (!once) {
            gsap.to(animationTargets, {
              yPercent: yPercent,
              y: yOffset,
              opacity: 0,
              duration: duration * 0.6,
              ease: 'power2.in',
              stagger,
              overwrite: 'auto',
            });
          }
        },
        onEnterBack: () => {
          if (!once) {
            gsap.to(animationTargets, {
              yPercent: 0,
              y: 0,
              opacity: 1,
              duration,
              ease,
              stagger,
              overwrite: 'auto',
            });
          }
        },
      });
    }, element);

    return () => {
      ctx.revert();
    };
  }, [triggerStart, duration, stagger, delay, yPercent, yOffset, ease, once]);

  return { containerRef };
}
