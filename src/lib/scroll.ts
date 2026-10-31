/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { getLenis } from "./lenis";
import { triggerRevealCheck, getPendingRevealCount } from "../hooks/useRevealEngine";
import { getActiveScrollLockReasons } from "./scrollLock";

export const SECTION_IDS = ["work", "about", "journal", "contact"] as const;
export type SectionId = (typeof SECTION_IDS)[number];

let isProgrammaticScroll = false;
let progRafId: number | null = null;
let progEndTimer: ReturnType<typeof setTimeout> | null = null;
let progFallback150: ReturnType<typeof setTimeout> | null = null;
let progFallback450: ReturnType<typeof setTimeout> | null = null;

export interface NavDebugData {
  lastAction: string;
  clickToStartMs: number;
  clickToEndMs: number;
  pendingRevealCount: number;
  activeScrollLocks: number;
}

let navDebugData: NavDebugData = {
  lastAction: "init",
  clickToStartMs: 0,
  clickToEndMs: 0,
  pendingRevealCount: 0,
  activeScrollLocks: 0,
};

const debugListeners = new Set<(data: NavDebugData) => void>();

function notifyNavDebug(partial: Partial<NavDebugData>) {
  navDebugData = { ...navDebugData, ...partial };
  debugListeners.forEach((fn) => fn(navDebugData));
}

export function getNavDebugData(): NavDebugData {
  return navDebugData;
}

export function subscribeNavDebug(listener: (data: NavDebugData) => void): () => void {
  debugListeners.add(listener);
  listener(navDebugData);
  return () => {
    debugListeners.delete(listener);
  };
}

export function getIsProgrammaticScroll(): boolean {
  return isProgrammaticScroll;
}

export function cancelProgrammaticScroll(): void {
  if (!isProgrammaticScroll) return;
  isProgrammaticScroll = false;

  if (typeof document !== "undefined") {
    document.documentElement.removeAttribute("data-scrolling");
  }

  if (progRafId !== null) {
    cancelAnimationFrame(progRafId);
    progRafId = null;
  }
  if (progEndTimer !== null) {
    clearTimeout(progEndTimer);
    progEndTimer = null;
  }
  if (progFallback150 !== null) {
    clearTimeout(progFallback150);
    progFallback150 = null;
  }
  if (progFallback450 !== null) {
    clearTimeout(progFallback450);
    progFallback450 = null;
  }

  triggerRevealCheck();
}

// User input cancels any active programmatic scroll immediately
if (typeof window !== "undefined") {
  const handleUserInput = () => {
    if (isProgrammaticScroll) {
      cancelProgrammaticScroll();
    }
  };

  window.addEventListener("wheel", handleUserInput, { passive: true });
  window.addEventListener("touchstart", handleUserInput, { passive: true });
  window.addEventListener("keydown", handleUserInput, { passive: true });
  window.addEventListener("scrollend", handleUserInput, { passive: true });

  // Immediate pressed feedback: on pointerdown tag [data-pressed="true"]
  document.addEventListener(
    "pointerdown",
    (e) => {
      const el = (e.target as Element | null)?.closest("a, button");
      if (el) el.setAttribute("data-pressed", "true");
    },
    { capture: true, passive: true }
  );

  const clearPressed = () => {
    document.querySelectorAll('[data-pressed="true"]').forEach((el) => {
      el.removeAttribute("data-pressed");
    });
  };

  document.addEventListener("pointerup", clearPressed, { capture: true, passive: true });
  document.addEventListener("pointercancel", clearPressed, { capture: true, passive: true });
}

/**
 * scrollToSection(id):
 * - start scroll in the same frame as click (no await, no timeout before it)
 * - compute target at click time
 * - duration = clamp(0.4, distance / (innerHeight * 10), 0.8) seconds with easeOutQuart
 * - user wheel, touch or key input cancels it
 * - while programmatic scroll runs, add data-scrolling to <html> to pause hero spring loop & work hover effects (JS only)
 * - reveal check runs inside rAF loop every frame while scrolling, plus 150ms/450ms fallbacks
 * - after it ends, run item 1(b) once (triggerRevealCheck) and remove data-scrolling
 */
export function scrollToSection(id: string): void {
  if (typeof window === "undefined") return;

  const clickTimestamp = performance.now();
  const el = document.getElementById(id);
  if (!el) return;

  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  let y = el.getBoundingClientRect().top + window.scrollY;
  if (id === "work") {
    y += 1; // +1 so work stage is pinned cleanly at the start
  }
  const targetY = Math.min(Math.max(0, y), maxScroll);
  const distance = Math.abs(targetY - window.scrollY);

  // clamp(0.4, distance / (innerHeight * 10), 0.8)
  const duration = Math.min(Math.max(0.4, distance / (window.innerHeight * 10)), 0.8);
  const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

  // Clean previous timers if any
  cancelProgrammaticScroll();

  isProgrammaticScroll = true;
  document.documentElement.setAttribute("data-scrolling", "true");

  const startTimestamp = performance.now();
  const clickToStartMs = Math.round(startTimestamp - clickTimestamp);

  notifyNavDebug({
    lastAction: `scrollToSection: ${id}`,
    clickToStartMs,
    activeScrollLocks: getActiveScrollLockReasons().length,
  });

  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(targetY, { duration, easing: easeOutQuart });
  } else {
    window.scrollTo({ top: targetY, behavior: "smooth" });
  }

  // (a) Inside rAF loop while programmatic scroll is running (every frame)
  const onProgrammaticFrame = () => {
    if (!isProgrammaticScroll) return;
    triggerRevealCheck();
    progRafId = requestAnimationFrame(onProgrammaticFrame);
  };
  progRafId = requestAnimationFrame(onProgrammaticFrame);

  // (c) 150ms and 450ms fallback timers
  progFallback150 = setTimeout(() => {
    if (isProgrammaticScroll) triggerRevealCheck();
  }, 150);

  progFallback450 = setTimeout(() => {
    if (isProgrammaticScroll) triggerRevealCheck();
  }, 450);

  const durationMs = duration * 1000;

  // Single verification at duration * 1000 + 100ms
  progEndTimer = setTimeout(() => {
    if (!isProgrammaticScroll) return;

    if (Math.abs(targetY - window.scrollY) > 4) {
      if (lenis) {
        lenis.scrollTo(targetY, { immediate: true });
      } else {
        window.scrollTo({ top: targetY, behavior: "instant" });
      }
    }

    isProgrammaticScroll = false;
    document.documentElement.removeAttribute("data-scrolling");
    if (progRafId !== null) cancelAnimationFrame(progRafId);

    // Run item 1(b) once
    triggerRevealCheck();

    const clickToEndMs = Math.round(performance.now() - clickTimestamp);
    const pendingRevealCount = getPendingRevealCount();
    notifyNavDebug({
      clickToEndMs,
      pendingRevealCount,
      activeScrollLocks: getActiveScrollLockReasons().length,
    });

    // Recheck pending reveals at +600ms (expected 0)
    setTimeout(() => {
      notifyNavDebug({
        pendingRevealCount: getPendingRevealCount(),
        activeScrollLocks: getActiveScrollLockReasons().length,
      });
    }, 600);
  }, durationMs + 100);
}

/**
 * scrollToTop(): scrolls to 0 with the same duration formula and programmatic scroll protection.
 */
export function scrollToTop(): void {
  if (typeof window === "undefined") return;

  const clickTimestamp = performance.now();
  const targetY = 0;
  const distance = Math.abs(targetY - window.scrollY);
  const duration = Math.min(Math.max(0.4, distance / (window.innerHeight * 10)), 0.8);
  const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

  cancelProgrammaticScroll();

  isProgrammaticScroll = true;
  document.documentElement.setAttribute("data-scrolling", "true");

  const startTimestamp = performance.now();
  const clickToStartMs = Math.round(startTimestamp - clickTimestamp);

  notifyNavDebug({
    lastAction: "scrollToTop",
    clickToStartMs,
    activeScrollLocks: getActiveScrollLockReasons().length,
  });

  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(targetY, { duration, easing: easeOutQuart });
  } else {
    window.scrollTo({ top: targetY, behavior: "smooth" });
  }

  const onProgrammaticFrame = () => {
    if (!isProgrammaticScroll) return;
    triggerRevealCheck();
    progRafId = requestAnimationFrame(onProgrammaticFrame);
  };
  progRafId = requestAnimationFrame(onProgrammaticFrame);

  progFallback150 = setTimeout(() => {
    if (isProgrammaticScroll) triggerRevealCheck();
  }, 150);

  progFallback450 = setTimeout(() => {
    if (isProgrammaticScroll) triggerRevealCheck();
  }, 450);

  const durationMs = duration * 1000;

  progEndTimer = setTimeout(() => {
    if (!isProgrammaticScroll) return;

    if (Math.abs(window.scrollY) > 4) {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    }

    isProgrammaticScroll = false;
    document.documentElement.removeAttribute("data-scrolling");
    if (progRafId !== null) cancelAnimationFrame(progRafId);

    triggerRevealCheck();

    const clickToEndMs = Math.round(performance.now() - clickTimestamp);
    notifyNavDebug({
      clickToEndMs,
      pendingRevealCount: getPendingRevealCount(),
      activeScrollLocks: getActiveScrollLockReasons().length,
    });
  }, durationMs + 100);
}

/**
 * Computes active section:
 * active = the last of work, about, journal, contact whose rect.top <= innerHeight * 0.4;
 * none while scrollY < innerHeight * 0.6;
 * contact when the page bottom is reached.
 */
export function getActiveSection(): string | null {
  if (typeof window === "undefined" || typeof document === "undefined") return null;

  const scrollY = window.scrollY;
  const innerHeight = window.innerHeight;

  if (scrollY < innerHeight * 0.6) {
    return null;
  }

  const scrollHeight = document.documentElement.scrollHeight;
  if (window.innerHeight + scrollY >= scrollHeight - 20) {
    return "contact";
  }

  const threshold = innerHeight * 0.4;
  let active: string | null = null;

  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= threshold) {
        active = id;
      }
    }
  }

  return active;
}

/**
 * useScrollSpy
 */
export function useScrollSpy(isHome: boolean = true): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!isHome || typeof window === "undefined" || typeof document === "undefined") {
      setActive(null);
      return;
    }

    let rafId: number | null = null;

    const recompute = () => {
      setActive(getActiveSection());
    };

    const scheduleRecompute = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        recompute();
      });
    };

    recompute();

    window.addEventListener("scroll", scheduleRecompute, { passive: true });
    window.addEventListener("resize", scheduleRecompute, { passive: true });

    let ro: ResizeObserver | null = null;
    if (document.body && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        scheduleRecompute();
      });
      ro.observe(document.body);
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready
        .then(() => {
          scheduleRecompute();
        })
        .catch(() => {});
    }

    return () => {
      window.removeEventListener("scroll", scheduleRecompute);
      window.removeEventListener("resize", scheduleRecompute);
      ro?.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isHome]);

  return active;
}

export function findStickyBlockers(element: HTMLElement): { element: HTMLElement; reason: string }[] {
  const blockers: { element: HTMLElement; reason: string }[] = [];
  let current: HTMLElement | null = element.parentElement;

  while (current && current !== document.documentElement) {
    const style = window.getComputedStyle(current);

    if (style.overflow !== "visible" && style.overflow !== "clip") {
      blockers.push({ element: current, reason: `overflow: ${style.overflow}` });
    }
    if (style.overflowX !== "visible" && style.overflowX !== "clip") {
      blockers.push({ element: current, reason: `overflowX: ${style.overflowX}` });
    }
    if (style.overflowY !== "visible" && style.overflowY !== "clip") {
      blockers.push({ element: current, reason: `overflowY: ${style.overflowY}` });
    }
    if (style.transform !== "none") {
      blockers.push({ element: current, reason: `transform: ${style.transform}` });
    }
    if (style.filter !== "none") {
      blockers.push({ element: current, reason: `filter: ${style.filter}` });
    }
    if (style.perspective !== "none") {
      blockers.push({ element: current, reason: `perspective: ${style.perspective}` });
    }
    if (style.contain !== "none" && style.contain !== "normal") {
      blockers.push({ element: current, reason: `contain: ${style.contain}` });
    }
    if (style.willChange.includes("transform") || style.willChange.includes("scroll-position")) {
      blockers.push({ element: current, reason: `will-change: ${style.willChange}` });
    }

    current = current.parentElement;
  }

  return blockers;
}
