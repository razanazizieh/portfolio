/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { getLenis } from "./lenis";
import { cancelProgrammaticScroll } from "./scroll";
import { triggerRevealCheck } from "../hooks/useRevealEngine";

const activeReasons = new Set<string>();
let isInitialized = false;

function applyLockState() {
  if (typeof document === "undefined") return;
  const lenis = getLenis();

  if (activeReasons.size > 0) {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    if (lenis) {
      try {
        lenis.stop();
      } catch {
        // safe fallback
      }
    }
  } else {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.documentElement.classList.remove("lenis-stopped");
    document.body.classList.remove("lenis-stopped");
    if (lenis) {
      try {
        lenis.start();
        lenis.resize();
      } catch {
        // safe fallback
      }
    }
  }
}

export function lockScroll(reason: string): void {
  activeReasons.add(reason);
  applyLockState();
}

export function unlockScroll(reason: string): void {
  activeReasons.delete(reason);
  applyLockState();
}

export function isScrollLocked(): boolean {
  return activeReasons.size > 0;
}

export function getActiveScrollLockReasons(): string[] {
  return Array.from(activeReasons);
}

export function releaseAllScrollLocks(): void {
  activeReasons.clear();
  applyLockState();
}

/**
 * Checks whether menu or preloader are active in the DOM
 */
export function isMenuOrPreloaderActive(): boolean {
  if (typeof document === "undefined") return false;
  const isMenuOpen = document.body.dataset.mobileMenu === "open";
  const preloaderEl = document.querySelector(".preloader-overlay");
  const isPreloaderActive = Boolean(
    preloaderEl && !preloaderEl.classList.contains("-translate-y-full")
  );
  return isMenuOpen || isPreloaderActive;
}

/**
 * Handle recovery on tab restore, focus, visibilitychange, pageshow:
 * - clear programmatic-scroll flag
 * - lenis.resize()
 * - restart the single rAF loop if it was cancelled
 * - call lenis.raf(performance.now()) once (guard against huge delta)
 * - run reveal check and scroll-spy update
 * - remove any stale inline overflow style
 * - release any scroll lock whose owner is no longer active
 */
export function recoverScrollState(): void {
  cancelProgrammaticScroll();

  const isMenuOpen =
    typeof document !== "undefined" && document.body.dataset.mobileMenu === "open";
  const isPreloaderDone =
    typeof window !== "undefined" &&
    (Boolean((window as unknown as { __appReady?: boolean }).__appReady) ||
      !document.querySelector(".preloader-overlay"));

  if (!isMenuOpen && isPreloaderDone) {
    releaseAllScrollLocks();
  }

  // Remove any stale inline overflow styles
  if (typeof document !== "undefined" && !isMenuOpen) {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.documentElement.classList.remove("lenis-stopped");
    document.body.classList.remove("lenis-stopped");
  }

  const lenis = getLenis();
  if (lenis) {
    try {
      lenis.start();
      lenis.resize();
      // Guard against large delta after tab backgrounding
      lenis.raf(performance.now());
    } catch {
      // safe fallback
    }
  }

  // Re-cache offsets and trigger handlers
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("tab:restore"));
    window.dispatchEvent(new Event("resize"));
    window.dispatchEvent(new Event("scroll"));
  }

  triggerRevealCheck();
}

export function initScrollLockWatchdog(): void {
  if (isInitialized || typeof window === "undefined") return;
  isInitialized = true;

  const onVisibleOrFocus = () => {
    if (document.visibilityState === "visible") {
      recoverScrollState();
    }
  };

  document.addEventListener("visibilitychange", onVisibleOrFocus);
  window.addEventListener("focus", onVisibleOrFocus);
  window.addEventListener("pageshow", () => {
    recoverScrollState();
  });

  // Watchdog: interval every 1000ms while visible, if locked but neither menu nor preloader open, unlock and console.warn
  setInterval(() => {
    if (typeof document === "undefined") return;
    if (document.visibilityState !== "visible") return;

    if (
      activeReasons.size > 0 ||
      document.body.style.overflow === "hidden" ||
      document.documentElement.classList.contains("lenis-stopped")
    ) {
      if (!isMenuOrPreloaderActive()) {
        releaseAllScrollLocks();
        console.warn(
          "[scrollLock] Watchdog detected stuck scroll lock without active menu or preloader; unlocked."
        );
      }
    }
  }, 1000);
}

// Auto-run initialization in browser environment
if (typeof window !== "undefined") {
  initScrollLockWatchdog();
}
