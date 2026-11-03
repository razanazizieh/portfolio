/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getLenis } from '../lib/lenis';
import { recoverScrollState } from '../lib/scrollLock';

interface GroupAuditInfo {
  name: string;
  tag: string;
  'height in px': number;
  'trigger line': string;
  state: 'pending' | 'in';
  'ms since app:ready': number | string;
}

// Module-level delegates for cross-module triggers
let globalCheckDelegate: (() => void) | null = null;
let globalPendingCountDelegate: (() => number) = () => 0;

/**
 * Triggers an immediate reveal check without waiting for any user pointer/wheel event.
 */
export function triggerRevealCheck(): void {
  if (globalCheckDelegate) {
    globalCheckDelegate();
  }
}

/**
 * Returns current count of pending reveal groups
 */
export function getPendingRevealCount(): number {
  return globalPendingCountDelegate();
}

/**
 * Dev Audit:
 * Runs when ?debug=reveal is in the URL query string.
 * console.table of every group on the current route and console.warn for any group taller than 0.8 * innerHeight.
 */
function runDevAudit(triggerTimes: Map<HTMLElement, number>) {
  if (typeof window === 'undefined') return;
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('debug') !== 'reveal') return;

  const innerHeight = window.innerHeight;
  const groups = document.querySelectorAll<HTMLElement>('[data-reveal-group]');
  const auditRows: GroupAuditInfo[] = [];
  const readyTime = (window as unknown as { __appReadyTime?: number }).__appReadyTime || 0;

  groups.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const name =
      el.getAttribute('data-reveal-id') || el.id || el.getAttribute('aria-label') || el.tagName.toLowerCase();
    const classes = el.className ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : '';
    const tagClass = `${el.tagName.toLowerCase()}${classes}`;
    const height = Math.round(rect.height);
    const triggerRule = el.getAttribute('data-reveal-at') || '0.8';
    const isIn = el.classList.contains('is-in');
    const firedAt = triggerTimes.get(el);
    const msSinceReady = firedAt && readyTime ? Math.round(firedAt - readyTime) : (isIn ? 'ready' : '-');

    auditRows.push({
      name,
      tag: tagClass,
      'height in px': height,
      'trigger line': triggerRule,
      state: isIn ? 'in' : 'pending',
      'ms since app:ready': msSinceReady,
    });

    if (height > 0.8 * innerHeight) {
      console.warn(
        `[reveal] Group "${name}" (${height}px) is taller than 0.8 * innerHeight (${Math.round(
          0.8 * innerHeight
        )}px). Groups must hug their content.`
      );
    }
  });

  if (auditRows.length > 0) {
    console.table(auditRows);
  }
}

/**
 * useRevealEngine
 */
export function useRevealEngine() {
  const location = useLocation();
  const pendingTargets = useRef<Set<HTMLElement>>(new Set());
  const halfCrossedTimers = useRef<Map<HTMLElement, ReturnType<typeof setTimeout>>>(new Map());
  const triggerTimes = useRef<Map<HTMLElement, number>>(new Map());

  useLayoutEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isHome = location.pathname === '/';

    const isHeroDone = () => document.documentElement.classList.contains('hero-done');

    const markHeroDone = () => {
      if (document.documentElement.classList.contains('hero-done')) return;
      document.documentElement.classList.add('hero-done');
      if (globalCheckDelegate) {
        globalCheckDelegate();
      }
    };

    if (prefersReducedMotion) {
      document.documentElement.classList.add('js-reveal');
      document.documentElement.classList.add('hero-done');
      document.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-group], [data-reveal-child]').forEach((el) => {
        el.classList.add('is-in');
        el.setAttribute('data-revealed', 'true');
      });
      return;
    }

    // Helper: mark an element as triggered ('is-in')
    const revealElement = (el: HTMLElement, _source = 'scroll') => {
      if (el.classList.contains('is-in')) return;
      el.classList.add('is-in');
      const now = performance.now();
      triggerTimes.current.set(el, now);

      // Cancel failsafe timer if pending
      const timer = halfCrossedTimers.current.get(el);
      if (timer) {
        clearTimeout(timer);
        halfCrossedTimers.current.delete(el);
      }

      // Mark wrapper data-revealed once animation completes to remove overflow, padding & margin
      // and clear every inline opacity, transform and will-change
      setTimeout(() => {
        if (el.isConnected) {
          el.setAttribute('data-revealed', 'true');
          const masks = el.querySelectorAll<HTMLElement>('.w, .statement-line-mask');
          masks.forEach((m) => {
            m.setAttribute('data-revealed', 'true');
            m.style.overflow = 'visible';
            m.style.paddingBlock = '0';
            m.style.marginBlock = '0';
          });

          // Clear every inline opacity, transform and will-change
          el.style.opacity = '';
          el.style.transform = '';
          el.style.willChange = '';
          const children = el.querySelectorAll<HTMLElement>(
            '[data-reveal-child], .statement-line, .statement-feels, .work-desktop-reveal-block, .work-desktop-reveal-fade, .work-mobile-item'
          );
          children.forEach((c) => {
            c.style.opacity = '';
            c.style.transform = '';
            c.style.willChange = '';
          });
        }
      }, 1250);
    };

    // Collect all targets
    const scanTargets = (): HTMLElement[] => {
      const all = document.querySelectorAll<HTMLElement>('[data-reveal-group], [data-reveal]');
      const targets: HTMLElement[] = [];
      all.forEach((el) => {
        const isNested = Boolean(el.parentElement?.closest('[data-reveal-group]'));
        if (!isNested) {
          targets.push(el);
        }
      });
      return targets;
    };

    let intervalId: ReturnType<typeof setInterval> | null = null;

    const syncInterval = () => {
      if (pendingTargets.current.size === 0) {
        if (intervalId !== null) {
          clearInterval(intervalId);
          intervalId = null;
        }
      } else if (intervalId === null) {
        intervalId = setInterval(() => {
          if (typeof document !== 'undefined' && document.visibilityState !== 'visible') return;
          if (pendingTargets.current.size === 0) {
            if (intervalId !== null) {
              clearInterval(intervalId);
              intervalId = null;
            }
            return;
          }
          check();
        }, 500);
      }
    };

    // Check routine evaluating each pending element's own getBoundingClientRect
    const check = () => {
      const innerHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const isAtBottom = (scrollY + innerHeight) >= (scrollHeight - 4);

      const toRemove: HTMLElement[] = [];

      pendingTargets.current.forEach((el) => {
        if (!el.isConnected || el.classList.contains('is-in')) {
          toRemove.push(el);
          return;
        }

        const isWorkTarget =
          el.getAttribute('data-reveal-id') === 'work-desktop' ||
          el.getAttribute('data-reveal') === 'work-mobile' ||
          Boolean(el.closest('#work'));

        // The Work section's own reveal groups fire only after "hero-done"
        if (isWorkTarget && isHome && !isHeroDone()) {
          return;
        }

        const rect = el.getBoundingClientRect();
        const revealAtAttr = el.getAttribute('data-reveal-at');
        const thresholdRatio = revealAtAttr ? parseFloat(revealAtAttr) : 0.8;

        // Failsafe: if top went above innerHeight * 0.6 and hasn't fired in 1500ms
        if (rect.top < innerHeight * 0.6) {
          if (!halfCrossedTimers.current.has(el)) {
            const timer = setTimeout(() => {
              if (el.isConnected && !el.classList.contains('is-in')) {
                // If it's a Work target, make sure hero-done is also satisfied
                if (isWorkTarget && isHome && !isHeroDone()) return;
                revealElement(el, 'failsafe (+1500ms after crossing 0.6 innerHeight)');
                pendingTargets.current.delete(el);
                syncInterval();
              }
              halfCrossedTimers.current.delete(el);
            }, 1500);
            halfCrossedTimers.current.set(el, timer);
          }
        }

        // Standard reveal trigger: own rect.top < innerHeight * thresholdRatio
        if (rect.top < innerHeight * thresholdRatio || (isAtBottom && rect.top < innerHeight)) {
          revealElement(el, 'scroll/threshold');
          toRemove.push(el);
        }
      });

      toRemove.forEach((el) => pendingTargets.current.delete(el));
      syncInterval();
    };

    // Wire up global delegates
    globalCheckDelegate = check;
    globalPendingCountDelegate = () => pendingTargets.current.size;

    // Setup targets and apply initial hidden states:
    // Hidden initial state is applied ONLY to groups whose top is >= innerHeight * 0.95;
    // everything else is visible immediately.
    const inViewTargets: HTMLElement[] = [];
    const targets = scanTargets();
    const innerHeight = window.innerHeight;

    targets.forEach((el) => {
      if (el.classList.contains('is-in')) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < innerHeight * 0.95) {
        inViewTargets.push(el);
      } else {
        pendingTargets.current.add(el);
      }
    });

    syncInterval();

    // Apply js-reveal to activate hidden states on pending elements
    document.documentElement.classList.add('js-reveal');

    // Trigger in-view targets right after app:ready
    const triggerInView = () => {
      if (!(window as unknown as { __appReadyTime?: number }).__appReadyTime) {
        (window as unknown as { __appReadyTime?: number }).__appReadyTime = performance.now();
      }
      inViewTargets.forEach((el) => {
        if (el.isConnected && !el.classList.contains('is-in')) {
          const isWorkTarget =
            el.getAttribute('data-reveal-id') === 'work-desktop' ||
            el.getAttribute('data-reveal') === 'work-mobile' ||
            Boolean(el.closest('#work'));
          if (isWorkTarget && isHome && !isHeroDone()) {
            pendingTargets.current.add(el);
            return;
          }
          revealElement(el, 'in-view-initial');
        }
      });
      check();
    };

    let appReadyCleanup: (() => void) | null = null;
    const isAppReady = (window as unknown as { __appReady?: boolean }).__appReady;

    if (isAppReady) {
      triggerInView();
    } else {
      const onAppReady = () => {
        window.removeEventListener('app:ready', onAppReady);
        triggerInView();
      };
      window.addEventListener('app:ready', onAppReady);

      const fallbackTimer = setTimeout(() => {
        triggerInView();
      }, 1500);

      appReadyCleanup = () => {
        window.removeEventListener('app:ready', onAppReady);
        clearTimeout(fallbackTimer);
      };
    }

    // Hero Done orchestration
    let heroTimer: ReturnType<typeof setTimeout> | null = null;
    let heroFailsafeTimer: ReturnType<typeof setTimeout> | null = null;
    let heroScrollHandler: (() => void) | null = null;

    if (!isHome) {
      markHeroDone();
    } else {
      // Check if loaded below hero: scrollY > 40, anchor in URL, or history state
      const isBelowHero = window.scrollY > 40 || Boolean(location.hash) || Boolean(window.history.state?.scrollTo);
      if (isBelowHero) {
        markHeroDone();
      } else {
        // 1300ms after "app:ready"
        const scheduleAppReadyHeroDone = () => {
          if (!heroTimer) {
            heroTimer = setTimeout(markHeroDone, 1300);
          }
        };

        if ((window as unknown as { __appReady?: boolean }).__appReady) {
          scheduleAppReadyHeroDone();
        } else {
          const onHeroAppReady = () => {
            window.removeEventListener('app:ready', onHeroAppReady);
            scheduleAppReadyHeroDone();
          };
          window.addEventListener('app:ready', onHeroAppReady);
        }

        // Immediately when scrollY > 40
        heroScrollHandler = () => {
          if (window.scrollY > 40) {
            markHeroDone();
            if (heroScrollHandler) {
              window.removeEventListener('scroll', heroScrollHandler);
            }
          }
        };
        window.addEventListener('scroll', heroScrollHandler, { passive: true });

        // Failsafe: add it at 3500ms regardless
        heroFailsafeTimer = setTimeout(markHeroDone, 3500);
      }
    }

    // Scroll listener (rAF-throttled, passive)
    let scrollRafId: number | null = null;
    const onScroll = () => {
      if (scrollRafId !== null) return;
      scrollRafId = requestAnimationFrame(() => {
        scrollRafId = null;
        check();
      });
    };

    // Position-stability watcher: scrollY unchanged for 120ms
    let stabilityTimer: ReturnType<typeof setTimeout> | null = null;
    let lastObservedScrollY = window.scrollY;

    const onScrollWithStability = () => {
      onScroll();
      lastObservedScrollY = window.scrollY;
      if (stabilityTimer !== null) clearTimeout(stabilityTimer);
      stabilityTimer = setTimeout(() => {
        if (window.scrollY === lastObservedScrollY) {
          check();
        }
      }, 120);
    };

    window.addEventListener('scroll', onScrollWithStability, { passive: true });
    window.addEventListener('resize', check, { passive: true });
    window.addEventListener('load', check, { passive: true });
    window.addEventListener('hashchange', check, { passive: true });
    window.addEventListener('scrollend', check, { passive: true });

    // Connect to Lenis if present
    let lenisUnsub: (() => void) | null = null;
    const tryConnectLenis = () => {
      const lenis = getLenis();
      if (lenis && !lenisUnsub) {
        lenis.on('scroll', onScrollWithStability);
        lenisUnsub = () => {
          lenis.off('scroll', onScrollWithStability);
        };
      }
    };
    tryConnectLenis();
    const lenisCheckTimer = setTimeout(tryConnectLenis, 300);

    // On visibilitychange (visible), focus and pageshow (also when persisted)
    const onTabActive = () => {
      if (document.visibilityState === 'visible') {
        recoverScrollState();
        check();
      }
    };

    const onPageShow = (e: PageTransitionEvent) => {
      recoverScrollState();
      check();
      if (e.persisted) {
        check();
      }
    };

    document.addEventListener('visibilitychange', onTabActive);
    window.addEventListener('focus', onTabActive);
    window.addEventListener('pageshow', onPageShow);

    // Check fonts.ready
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(check).catch(() => {});
    }

    // MutationObserver on document.body for dynamically mounted nodes
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;
    let mutationObserver: MutationObserver | null = null;
    if (document.body) {
      mutationObserver = new MutationObserver(() => {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          const freshTargets = scanTargets();
          const currentH = window.innerHeight;
          freshTargets.forEach((el) => {
            if (!el.classList.contains('is-in') && !pendingTargets.current.has(el)) {
              const r = el.getBoundingClientRect();
              const isWork =
                el.getAttribute('data-reveal-id') === 'work-desktop' ||
                el.getAttribute('data-reveal') === 'work-mobile' ||
                Boolean(el.closest('#work'));

              if (r.top < currentH * 0.95 && (window as unknown as { __appReady?: boolean }).__appReady) {
                if (isWork && isHome && !isHeroDone()) {
                  pendingTargets.current.add(el);
                } else {
                  revealElement(el, 'mutation-in-view');
                }
              } else {
                pendingTargets.current.add(el);
              }
            }
          });
          check();
        }, 100);
      });
      mutationObserver.observe(document.body, { childList: true, subtree: true });
    }

    // 6-second safety timer: reveal everything with rect.top < innerHeight
    const sixSecTimer = setTimeout(() => {
      const currentH = window.innerHeight;
      pendingTargets.current.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < currentH) {
          revealElement(el, '6s-safety-timer');
          pendingTargets.current.delete(el);
        }
      });
      syncInterval();
    }, 6000);

    // Dev audit after initial layout stabilization
    const auditTimer = setTimeout(() => {
      runDevAudit(triggerTimes.current);
    }, 600);

    return () => {
      if (appReadyCleanup) appReadyCleanup();
      if (heroTimer) clearTimeout(heroTimer);
      if (heroFailsafeTimer) clearTimeout(heroFailsafeTimer);
      if (heroScrollHandler) window.removeEventListener('scroll', heroScrollHandler);
      if (intervalId !== null) clearInterval(intervalId);
      if (stabilityTimer !== null) clearTimeout(stabilityTimer);
      clearTimeout(sixSecTimer);
      clearTimeout(auditTimer);
      clearTimeout(lenisCheckTimer);
      if (lenisUnsub) lenisUnsub();
      if (debounceTimer) clearTimeout(debounceTimer);
      if (scrollRafId !== null) cancelAnimationFrame(scrollRafId);
      window.removeEventListener('scroll', onScrollWithStability);
      window.removeEventListener('resize', check);
      window.removeEventListener('load', check);
      window.removeEventListener('hashchange', check);
      window.removeEventListener('scrollend', check);
      document.removeEventListener('visibilitychange', onTabActive);
      window.removeEventListener('focus', onTabActive);
      window.removeEventListener('pageshow', onPageShow);
      mutationObserver?.disconnect();
      halfCrossedTimers.current.forEach((t) => clearTimeout(t));
      halfCrossedTimers.current.clear();
      pendingTargets.current.clear();
      globalCheckDelegate = null;
    };
  }, []);

  // Run check after route and hash changes (immediate, two rAFs, and at 300ms)
  useLayoutEffect(() => {
    let r1: number | null = null;
    let r2: number | null = null;
    const timers: ReturnType<typeof setTimeout>[] = [];

    if (location.pathname !== '/') {
      document.documentElement.classList.add('hero-done');
    } else {
      if (window.scrollY > 40 || location.hash || window.history.state?.scrollTo) {
        document.documentElement.classList.add('hero-done');
      }
    }

    const evaluateRouteTargets = () => {
      if (typeof document === 'undefined') return;
      const all = document.querySelectorAll<HTMLElement>('[data-reveal-group], [data-reveal]');
      const innerHeight = window.innerHeight;
      const isHome = location.pathname === '/';
      const isHeroDone = document.documentElement.classList.contains('hero-done');

      all.forEach((el) => {
        const isNested = Boolean(el.parentElement?.closest('[data-reveal-group]'));
        if (!isNested && !el.classList.contains('is-in')) {
          const isWorkTarget =
            el.getAttribute('data-reveal-id') === 'work-desktop' ||
            el.getAttribute('data-reveal') === 'work-mobile' ||
            Boolean(el.closest('#work'));

          if (isWorkTarget && isHome && !isHeroDone) {
            pendingTargets.current.add(el);
            return;
          }

          const rect = el.getBoundingClientRect();
          const revealAtAttr = el.getAttribute('data-reveal-at');
          const thresholdRatio = revealAtAttr ? parseFloat(revealAtAttr) : 0.8;

          if (rect.top < innerHeight * thresholdRatio) {
            el.classList.add('is-in');
            triggerTimes.current.set(el, performance.now());
          } else {
            pendingTargets.current.add(el);
          }
        }
      });
    };

    // Immediate check
    evaluateRouteTargets();

    // Two rAFs
    r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => {
        evaluateRouteTargets();
      });
    });

    // Paced check at 300ms
    const t300 = setTimeout(() => {
      evaluateRouteTargets();
      runDevAudit(triggerTimes.current);
    }, 300);
    timers.push(t300);

    return () => {
      if (r1 !== null) cancelAnimationFrame(r1);
      if (r2 !== null) cancelAnimationFrame(r2);
      timers.forEach((t) => clearTimeout(t));
    };
  }, [location.pathname, location.hash]);
}

export const useReveal = useRevealEngine;
