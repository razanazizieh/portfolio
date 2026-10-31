/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import siteContent from "../content/site";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { getLenis } from "../lib/lenis";
import { findStickyBlockers } from "../lib/scroll";

interface PanelEntry {
  id: string;
  order: number;
  name: string;
  isFinal?: boolean;
  el: HTMLElement | null;
  innerEl: HTMLElement | null;
}

interface StackContextValue {
  isStacked: boolean;
  registerPanel: (entry: PanelEntry) => void;
  unregisterPanel: (id: string) => void;
}

const StackContext = createContext<StackContextValue>({
  isStacked: false,
  registerPanel: () => {},
  unregisterPanel: () => {},
});

export interface StackPanelsContainerProps {
  children: ReactNode;
}

/**
 * StackPanelsContainer:
 * Manages sticky stacking physics between sections on DESKTOP only (>= 1024px)
 * when site.stackedPanels is true and prefers-reduced-motion is false.
 *
 * Mechanisms:
 * 1. Measures each panel's height via ResizeObserver and document.fonts.ready.
 * 2. If panel height <= viewport height: top is 0px.
 *    If taller: top is min(0px, calc(100svh - var(--panel-h))) so it scrolls in normal flow
 *    until its bottom hits viewport bottom, then sticks.
 * 3. As the next panel enters, covered panel inner content gets:
 *    - opacity: calc(1 - 0.45 * var(--cover, 0))
 *    - transform: scale(calc(1 - 0.02 * var(--cover, 0)))
 *    - transform-origin: center top
 * 4. The sticky container itself has NO transform.
 * 5. Single rAF-throttled passive scroll listener with cached offsets; NO React state per frame.
 * 6. Debug: ?debug=stack prints small fixed label with height, sticky top, stuck status,
 *    and console.warns if a panel is taller than viewport and top is not negative.
 */
export function StackPanelsContainer({ children }: StackPanelsContainerProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const shouldReduceMotion = useReducedMotion();
  const isStacked = Boolean(siteContent.stackedPanels && isDesktop && !shouldReduceMotion);

  const panelsRef = useRef<Map<string, PanelEntry>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);
  const [showDebug, setShowDebug] = useState(false);
  const debugOverlayRef = useRef<HTMLDivElement>(null);

  // Check ?debug=stack on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setShowDebug(params.get("debug") === "stack");
    }
  }, []);

  const registerPanel = useCallback((entry: PanelEntry) => {
    panelsRef.current.set(entry.id, entry);
  }, []);

  const unregisterPanel = useCallback((id: string) => {
    panelsRef.current.delete(id);
  }, []);

  // Geometry measurements cached for 60fps/120fps scroll loop
  const cachedHeights = useRef<number[]>([]);
  const cachedStaticTops = useRef<number[]>([]);
  const cachedStickyTops = useRef<number[]>([]);
  const sortedPanelsRef = useRef<PanelEntry[]>([]);

  const measurePanels = useCallback(() => {
    if (typeof window === "undefined") return;

    const list: PanelEntry[] = (
      Array.from(panelsRef.current.values()) as PanelEntry[]
    ).sort((a, b) => a.order - b.order);
    sortedPanelsRef.current = list;

    const vh = window.innerHeight;
    const heights: number[] = [];
    const stickyTops: number[] = [];

    list.forEach((panel) => {
      const el = panel.el;
      if (!el) {
        heights.push(0);
        stickyTops.push(0);
        return;
      }

      if (!isStacked) {
        // Reset styles when stack is disabled
        el.style.position = "";
        el.style.top = "";
        el.style.zIndex = "";
        el.style.setProperty("--panel-h", "");
        el.style.setProperty("--cover", "0");
        return;
      }

      const h = el.offsetHeight;
      heights.push(h);

      // Verify sticky blockers in debug mode
      const blockers = findStickyBlockers(el);
      if (blockers.length > 0) {
        console.warn(`[StackPanel: ${panel.name}] Sticky blockers detected:`, blockers);
      }

      // If panel height <= viewport height: top is 0px.
      // If taller: top is min(0px, calc(100svh - var(--panel-h)))
      const computedStickyTop = Math.min(0, vh - h);
      stickyTops.push(computedStickyTop);

      // Console warning if panel is taller than viewport and top is not negative
      if (h > vh && computedStickyTop >= 0) {
        console.warn(
          `[StackPanel: ${panel.name}] Panel is taller than viewport (${h}px > ${vh}px) but computed sticky top is not negative (${computedStickyTop}px)`
        );
      }

      el.style.setProperty("--panel-h", `${h}px`);

      if (panel.isFinal) {
        // The final Contact screen is a normal-flow element that slides over the Journal panel
        el.style.position = "relative";
        el.style.top = "0px";
        el.style.zIndex = `${panel.order}`;
      } else {
        el.style.position = "sticky";
        el.style.top = "min(0px, calc(100svh - var(--panel-h)))";
        el.style.zIndex = `${panel.order}`;
      }

      el.style.backgroundColor = "var(--bg, #F5F4F0)";
    });

    cachedHeights.current = heights;
    cachedStickyTops.current = stickyTops;

    // Cache static document offsets of each panel in normal flow
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerTop = containerRect.top + window.scrollY;
      const staticTops: number[] = [];
      let currentTop = containerTop;

      list.forEach((_, idx) => {
        staticTops.push(currentTop);
        currentTop += heights[idx] || 0;
      });

      cachedStaticTops.current = staticTops;
    }
  }, [isStacked]);

  // Main scroll loop updating --cover with zero React state per frame
  const updateCovers = useCallback(() => {
    if (!isStacked || typeof window === "undefined") return;

    const list = sortedPanelsRef.current;
    if (list.length === 0) return;

    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const staticTops = cachedStaticTops.current;
    const stickyTops = cachedStickyTops.current;
    const heights = cachedHeights.current;

    const debugInfo: {
      name: string;
      order: number;
      h: number;
      top: number;
      stuck: string;
      cover: string;
    }[] = [];

    for (let i = 0; i < list.length; i++) {
      const panel = list[i];
      const el = panel.el;
      if (!el) continue;

      let cover = 0;

      // Final panel has no cover applied
      if (!panel.isFinal && i < list.length - 1) {
        const nextPanelStaticTop = staticTops[i + 1] ?? (staticTops[i] + (heights[i] || 0));
        const nextPanelTopInViewport = nextPanelStaticTop - scrollY;
        const stickyTop = stickyTops[i] ?? 0;
        const span = vh - stickyTop;

        if (nextPanelTopInViewport <= stickyTop) {
          cover = 1;
        } else if (nextPanelTopInViewport >= vh) {
          cover = 0;
        } else if (span > 0) {
          cover = (vh - nextPanelTopInViewport) / span;
        }

        cover = Math.min(1, Math.max(0, cover));
      }

      el.style.setProperty("--cover", cover.toFixed(4));

      if (showDebug) {
        const rect = el.getBoundingClientRect();
        const top = stickyTops[i] ?? 0;
        const isStuck = !panel.isFinal && rect.top <= top + 1;
        debugInfo.push({
          name: panel.name,
          order: panel.order,
          h: heights[i] || 0,
          top,
          stuck: panel.isFinal ? "normal-flow" : isStuck ? "STUCK" : "scrolling",
          cover: cover.toFixed(2),
        });
      }
    }

    if (showDebug && debugOverlayRef.current) {
      debugOverlayRef.current.innerHTML = `
        <div style="font-weight: 700; margin-bottom: 4px; border-bottom: 1px solid #444; padding-bottom: 2px;">
          STACK DEBUG (?debug=stack)
        </div>
        <div style="margin-bottom: 4px; color: #AAA;">
          Viewport: ${vh}px | scrollY: ${Math.round(scrollY)}px
        </div>
        ${debugInfo
          .map(
            (d) =>
              `<div style="font-family: monospace; white-space: nowrap;">
                [${d.order}] ${d.name.padEnd(9)}: h=${d.h}px top=${d.top}px <span style="color: ${
                d.stuck === "STUCK" ? "#4ADE80" : "#FACC15"
              }">${d.stuck}</span> cover=${d.cover}
              </div>`
          )
          .join("")}
      `;
    }
  }, [isStacked, showDebug]);

  // Setup ResizeObserver, fonts ready, and scroll listeners
  useEffect(() => {
    measurePanels();
    updateCovers();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        measurePanels();
        updateCovers();
      });

      if (containerRef.current) {
        ro.observe(containerRef.current);
      }

      sortedPanelsRef.current.forEach((p) => {
        if (p.el) ro?.observe(p.el);
      });
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready
        .then(() => {
          measurePanels();
          updateCovers();
        })
        .catch(() => {});
    }

    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        updateCovers();
      });
    };

    const onResize = () => {
      measurePanels();
      onScroll();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("tab:restore", onResize, { passive: true });

    const lenis = getLenis();
    if (lenis) {
      lenis.on("scroll", onScroll);
    }

    return () => {
      ro?.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("tab:restore", onResize);
      if (lenis) {
        lenis.off("scroll", onScroll);
      }
    };
  }, [measurePanels, updateCovers]);

  return (
    <StackContext.Provider value={{ isStacked, registerPanel, unregisterPanel }}>
      <div ref={containerRef} className="relative w-full">
        {children}
      </div>

      {showDebug && (
        <div
          ref={debugOverlayRef}
          className="fixed bottom-4 left-4 z-[9999] bg-[#141414]/90 text-[#F5F4F0] p-3 text-xs font-mono rounded shadow-lg pointer-events-none border border-neutral-700"
          style={{ minWidth: "260px" }}
        />
      )}
    </StackContext.Provider>
  );
}

export interface StackPanelProps {
  order: number;
  name: string;
  isFinal?: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * StackPanel:
 * Wraps an individual section.
 * - Outer container: position sticky; top min(0px, calc(100svh - var(--panel-h))); z-index: order.
 *   NO transform on outer container!
 * - Inner container: receives cover-driven opacity and scale transforms.
 */
export function StackPanel({
  order,
  name,
  isFinal = false,
  children,
  className = "",
}: StackPanelProps) {
  const { isStacked, registerPanel, unregisterPanel } = useContext(StackContext);
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = `stack-panel-${order}-${name.toLowerCase()}`;
    registerPanel({
      id,
      order,
      name,
      isFinal,
      el: outerRef.current,
      innerEl: innerRef.current,
    });

    return () => {
      unregisterPanel(id);
    };
  }, [order, name, isFinal, registerPanel, unregisterPanel]);

  const outerStyle: React.CSSProperties = isStacked
    ? {
        position: isFinal ? "relative" : "sticky",
        top: isFinal ? "0px" : "min(0px, calc(100svh - var(--panel-h, 100svh)))",
        zIndex: order,
        backgroundColor: "var(--bg, #F5F4F0)",
        width: "100%",
      }
    : {
        position: "relative",
        width: "100%",
        backgroundColor: "var(--bg, #F5F4F0)",
      };

  const innerStyle: React.CSSProperties = isStacked && !isFinal
    ? {
        width: "100%",
        opacity: "calc(1 - 0.45 * var(--cover, 0))",
        transform: "scale(calc(1 - 0.02 * var(--cover, 0)))",
        transformOrigin: "center top",
        willChange: "transform, opacity",
      }
    : {
        width: "100%",
      };

  return (
    <div
      ref={outerRef}
      data-stack-panel={name.toLowerCase()}
      data-stack-order={order}
      className={`stack-panel relative w-full ${className}`}
      style={outerStyle}
    >
      <div ref={innerRef} className="stack-panel-inner w-full" style={innerStyle}>
        {children}
      </div>
    </div>
  );
}

export default StackPanel;
