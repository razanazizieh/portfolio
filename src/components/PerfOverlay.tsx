/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";

/**
 * Performance diagnostic overlay (?debug=perf)
 * Displays FPS, long-task count (>50ms), and max event duration (>40ms).
 */
export function PerfOverlay() {
  const [show, setShow] = useState(false);
  const [fps, setFps] = useState(60);
  const [longTaskCount, setLongTaskCount] = useState(0);
  const [maxEventDuration, setMaxEventDuration] = useState(0);

  const frameCount = useRef(0);
  const lastFpsTime = useRef(performance.now());

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (!params.has("debug") || !params.get("debug")?.includes("perf")) return;
    setShow(true);

    // FPS loop
    let rafId: number;
    const calcFps = (now: number) => {
      frameCount.current++;
      if (now - lastFpsTime.current >= 1000) {
        setFps(Math.round((frameCount.current * 1000) / (now - lastFpsTime.current)));
        frameCount.current = 0;
        lastFpsTime.current = now;
      }
      rafId = requestAnimationFrame(calcFps);
    };
    rafId = requestAnimationFrame(calcFps);

    // Longtask observer (> 50ms)
    let longTaskObserver: PerformanceObserver | null = null;
    try {
      if (typeof PerformanceObserver !== "undefined" && PerformanceObserver.supportedEntryTypes?.includes("longtask")) {
        longTaskObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 50) {
              setLongTaskCount((c) => c + 1);
            }
          }
        });
        longTaskObserver.observe({ entryTypes: ["longtask"] });
      }
    } catch {
      // not supported
    }

    // Event observer (durationThreshold 40)
    let eventObserver: PerformanceObserver | null = null;
    try {
      if (typeof PerformanceObserver !== "undefined" && PerformanceObserver.supportedEntryTypes?.includes("event")) {
        eventObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 40) {
              setMaxEventDuration((prev) => Math.max(prev, Math.round(entry.duration)));
            }
          }
        });
        (eventObserver as unknown as { observe: (opts: unknown) => void }).observe({
          type: "event",
          durationThreshold: 40,
          buffered: true,
        });
      }
    } catch {
      // not supported
    }

    return () => {
      cancelAnimationFrame(rafId);
      longTaskObserver?.disconnect();
      eventObserver?.disconnect();
    };
  }, []);

  if (!show) return null;

  return (
    <div
      role="status"
      aria-label="Performance diagnostic overlay"
      className="fixed bottom-4 left-4 z-[999] bg-[#141414] text-[#F5F4F0] px-3 py-2 text-xs font-mono shadow-md flex items-center gap-4 select-none pointer-events-none"
      style={{
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        fontSize: "12px",
        backgroundColor: "rgba(20, 20, 20, 0.92)",
        backdropFilter: "blur(6px)",
      }}
    >
      <span>FPS: <strong>{fps}</strong></span>
      <span>Long Tasks (&gt;50ms): <strong>{longTaskCount}</strong></span>
      <span>Max Event: <strong>{maxEventDuration}ms</strong></span>
    </div>
  );
}

export default PerfOverlay;
