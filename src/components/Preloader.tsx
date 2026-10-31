/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { lockScroll, unlockScroll } from "../lib/scrollLock";
import siteContent from "../content/site";

export interface PreloaderProps {
  onComplete?: () => void;
}

const STORAGE_KEY = "preloader_seen";

/**
 * Editorial Preloader
 * - Total duration <= 1.1s
 * - name mask 550ms, hold 100ms, overlay lift 550ms starting at 650ms
 * - dispatch "app:ready" at 650ms
 * - Wait only for document.fonts.ready with 600ms cap
 * - Preloader sets Date.now() deadline (3000ms) and checks on visibilitychange & pageshow
 * - Uses lockScroll("preloader") & unlockScroll("preloader")
 * - Once per session, skipped for reduced motion, never on back/forward or bfcache restores
 */
export function Preloader({ onComplete }: PreloaderProps) {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const isHome = location.pathname === "/";

  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    if (!isHome || shouldReduceMotion) return false;

    // Check back/forward navigation
    try {
      const navEntry = performance.getEntriesByType("navigation")[0] as
        | PerformanceNavigationTiming
        | undefined;
      if (navEntry?.type === "back_forward") return false;
      if (
        (window.performance as unknown as { navigation?: { type: number } })
          ?.navigation?.type === 2
      )
        return false;
    } catch {
      // safe fallback
    }

    try {
      return sessionStorage.getItem(STORAGE_KEY) !== "true";
    } catch {
      return false;
    }
  });

  const [isLifting, setIsLifting] = useState(false);

  useEffect(() => {
    // Detect bfcache restore
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        setIsVisible(false);
        unlockScroll("preloader");
      }
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  useEffect(() => {
    if (!isVisible) {
      if (typeof window !== "undefined") {
        (window as unknown as { __appReady?: boolean; __appReadyTime?: number }).__appReady = true;
        (window as unknown as { __appReady?: boolean; __appReadyTime?: number }).__appReadyTime = performance.now();
        window.dispatchEvent(new CustomEvent("app:ready"));
      }
      unlockScroll("preloader");
      if (onComplete) onComplete();
      return;
    }

    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // safe fallback
    }

    // Lock scroll via centralized module
    lockScroll("preloader");

    // Preloader sets Date.now() deadline (3000ms)
    const deadline = Date.now() + 3000;

    let liftTimer: ReturnType<typeof setTimeout> | null = null;
    let completeTimer: ReturnType<typeof setTimeout> | null = null;

    const finishPreloader = () => {
      if (liftTimer) clearTimeout(liftTimer);
      if (completeTimer) clearTimeout(completeTimer);
      if (typeof window !== "undefined") {
        (window as unknown as { __appReady?: boolean; __appReadyTime?: number }).__appReady = true;
        (window as unknown as { __appReady?: boolean; __appReadyTime?: number }).__appReadyTime = performance.now();
        window.dispatchEvent(new CustomEvent("app:ready"));
      }
      setIsVisible(false);
      unlockScroll("preloader");
      if (onComplete) onComplete();
    };

    const checkDeadline = () => {
      if (Date.now() >= deadline) {
        finishPreloader();
      }
    };

    document.addEventListener("visibilitychange", checkDeadline);
    window.addEventListener("pageshow", checkDeadline);

    // Wait only for document.fonts.ready with a 600ms cap
    const fontsPromise = document.fonts ? document.fonts.ready : Promise.resolve();
    const fontsTimeout = new Promise((resolve) => setTimeout(resolve, 600));

    Promise.race([fontsPromise, fontsTimeout])
      .then(() => {
        if (Date.now() >= deadline) {
          finishPreloader();
          return;
        }

        // Name mask: 550ms, hold 100ms -> at 650ms start lift and dispatch app:ready
        liftTimer = setTimeout(() => {
          if (typeof window !== "undefined") {
            (window as unknown as { __appReady?: boolean; __appReadyTime?: number }).__appReady = true;
            (window as unknown as { __appReady?: boolean; __appReadyTime?: number }).__appReadyTime = performance.now();
            window.dispatchEvent(new CustomEvent("app:ready"));
          }
          setIsLifting(true);
        }, 650);

        // Total <= 1.1s: lift completes at 1100ms
        completeTimer = setTimeout(() => {
          setIsVisible(false);
          unlockScroll("preloader");
          if (onComplete) onComplete();
        }, 1100);
      })
      .catch(() => {
        finishPreloader();
      });

    return () => {
      if (liftTimer) clearTimeout(liftTimer);
      if (completeTimer) clearTimeout(completeTimer);
      document.removeEventListener("visibilitychange", checkDeadline);
      window.removeEventListener("pageshow", checkDeadline);
      unlockScroll("preloader");
    };
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  const [first, ...rest] = siteContent.hero.name.split(" ");
  const last = rest.join(" ");

  return (
    <div
      role="status"
      aria-label="Loading portfolio"
      aria-hidden={isLifting || !isVisible}
      className={`fixed inset-0 z-[100] bg-[#F5F4F0] text-[var(--ink)] select-none preloader-overlay pointer-events-none transition-transform duration-[550ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isLifting ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 pt-[112px]">
        <div className="t-item text-[var(--ink)] block whitespace-nowrap">
          {/* Word 1: First name */}
          <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] mr-[0.25em]">
            <span
              className="inline-block font-[350]"
              style={{
                animation:
                  "preloaderMaskReveal 550ms cubic-bezier(0.22, 1, 0.36, 1) 0ms both",
              }}
            >
              {first}
            </span>
          </span>

          {/* Word 2: Last name */}
          {last && (
            <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em]">
              <span
                className="font-editorial-italic font-normal text-[1.0em] inline-block"
                style={{
                  animation:
                    "preloaderMaskReveal 550ms cubic-bezier(0.22, 1, 0.36, 1) 60ms both",
                }}
              >
                {last}
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Preloader;
