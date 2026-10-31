/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";

/**
 * PerfDebug
 * Fixed debug label rendered ONLY when ?debug=perf is present in URL search query.
 * Displays:
 * - FPS (measured via requestAnimationFrame)
 * - Long-task count (> 50ms, PerformanceObserver "longtask")
 * - Longest event duration (PerformanceObserver "event", durationThreshold: 40)
 */
export function PerfDebug() {
  const [show, setShow] = useState(false);
  const [fps, setFps] = useState(60);
  const [longTaskCount, setLongTaskCount] = useState(0);
  const [longestEventDuration, setLongestEventDuration] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("debug") !== "perf") return;
    setShow(true);

    // 1. FPS counter
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const countFrames = (now: number) => {
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(countFrames);
    };
    animId = requestAnimationFrame(countFrames);

    // 2. Longtask PerformanceObserver (> 50ms)
    let longTaskObserver: PerformanceObserver | null = null;
    try {
      if (
        typeof PerformanceObserver !== "undefined" &&
        PerformanceObserver.supportedEntryTypes &&
        PerformanceObserver.supportedEntryTypes.includes("longtask")
      ) {
        longTaskObserver = new PerformanceObserver((list) => {
          setLongTaskCount((prev) => prev + list.getEntries().length);
        });
        longTaskObserver.observe({ entryTypes: ["longtask"] });
      }
    } catch {
      // Browser doesn't support longtask observer
    }

    // 3. Longest event duration PerformanceObserver ("event", durationThreshold 40)
    let eventObserver: PerformanceObserver | null = null;
    try {
      if (
        typeof PerformanceObserver !== "undefined" &&
        PerformanceObserver.supportedEntryTypes &&
        PerformanceObserver.supportedEntryTypes.includes("event")
      ) {
        eventObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.duration) {
              setLongestEventDuration((prev) => Math.max(prev, Math.round(entry.duration)));
            }
          });
        });
        // durationThreshold 40 is supported by Event Timing API
        eventObserver.observe({
          type: "event",
          durationThreshold: 40,
        } as PerformanceObserverInit);
      }
    } catch {
      // Browser doesn't support event observer with durationThreshold
    }

    return () => {
      cancelAnimationFrame(animId);
      longTaskObserver?.disconnect();
      eventObserver?.disconnect();
    };
  }, []);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "16px",
        left: "16px",
        zIndex: 9999,
        backgroundColor: "rgba(20, 20, 20, 0.92)",
        color: "#F5F4F0",
        padding: "6px 10px",
        fontFamily: "ui-monospace, SFMono-Regular, monospace",
        fontSize: "11px",
        lineHeight: 1.4,
        borderRadius: "4px",
        pointerEvents: "none",
        boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
      }}
    >
      <div>FPS: {fps}</div>
      <div>Long tasks (&gt;50ms): {longTaskCount}</div>
      <div>Longest event: {longestEventDuration}ms</div>
    </div>
  );
}

export default PerfDebug;
