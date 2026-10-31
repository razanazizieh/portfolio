/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { memo, useRef, useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { projects } from "../data/projects";
import TS from "./TS";
import { findStickyBlockers, getIsProgrammaticScroll } from "../lib/scroll";
import { getLenis } from "../lib/lenis";
import { asset } from "../lib/asset";

const pad = (v: number) => String(v).padStart(2, "0");

export const WorkDesktop = memo(function WorkDesktop() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const prevTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [hasChanged, setHasChanged] = useState(false);
  const [showDebug, setShowDebug] = useState(false);

  // Preload all project images on mount for zero-flash, instantaneous transitions
  useEffect(() => {
    projects.forEach((p) => {
      const img = new Image();
      img.src = asset(p.image);
    });

    return () => {
      if (prevTimerRef.current) clearTimeout(prevTimerRef.current);
    };
  }, []);

  // Cached geometry to avoid getBoundingClientRect in scroll handlers
  const cachedTrackTop = useRef(0);
  const cachedTrackHeight = useRef(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      setShowDebug(urlParams.get("debug") === "work");
    }
  }, []);

  const measureTrack = useCallback(() => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    cachedTrackTop.current = rect.top + window.scrollY;
    cachedTrackHeight.current = trackRef.current.offsetHeight;
  }, []);

  useEffect(() => {
    measureTrack();

    if (stageRef.current) {
      const blockers = findStickyBlockers(stageRef.current);
      if (blockers.length > 0) {
        console.warn("[WorkDesktop] Sticky blockers detected:", blockers);
      }
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measureTrack).catch(() => {});
    }

    let ro: ResizeObserver | null = null;
    if (trackRef.current && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(measureTrack);
      ro.observe(trackRef.current);
    }

    window.addEventListener("tab:restore", measureTrack);

    return () => {
      window.removeEventListener("tab:restore", measureTrack);
      ro?.disconnect();
    };
  }, [measureTrack]);

  const handleScroll = useCallback(() => {
    if (getIsProgrammaticScroll()) return;
    if (!trackRef.current) return;

    const trackTop = cachedTrackTop.current;
    const stepPx = window.innerHeight * 0.8;
    const scrolled = window.scrollY - trackTop;

    if (scrolled > 20) {
      setHasChanged(true);
    }

    const n = projects.length;
    let nextIndex = 0;
    if (scrolled <= 0) {
      nextIndex = 0;
    } else if (scrolled >= n * stepPx) {
      nextIndex = n - 1;
    } else {
      nextIndex = Math.min(n - 1, Math.max(0, Math.floor(scrolled / stepPx)));
    }

    setActiveIndex((prev) => {
      if (prev !== nextIndex) {
        setPrevIndex(prev);
        if (prevTimerRef.current) clearTimeout(prevTimerRef.current);
        prevTimerRef.current = setTimeout(() => {
          setPrevIndex(null);
        }, 550);
        setHasChanged(true);
        return nextIndex;
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        handleScroll();
        rafId = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener(
      "resize",
      () => {
        measureTrack();
        onScroll();
      },
      { passive: true }
    );

    measureTrack();
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [handleScroll, measureTrack]);

  const scrollToProject = (index: number) => {
    if (!trackRef.current) return;
    const trackTop = cachedTrackTop.current;
    const stepPx = window.innerHeight * 0.8;
    const targetY = trackTop + index * stepPx + 2;

    setActiveIndex((prev) => {
      if (prev !== index) {
        setPrevIndex(prev);
        if (prevTimerRef.current) clearTimeout(prevTimerRef.current);
        prevTimerRef.current = setTimeout(() => {
          setPrevIndex(null);
        }, 550);
        setHasChanged(true);
        return index;
      }
      return prev;
    });

    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(targetY, { duration: 0.6 });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  const handleTitleClick = (index: number, slug: string) => {
    if (index === activeIndex) {
      navigate(`/work/${slug}`);
    } else {
      scrollToProject(index);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (activeIndex < projects.length - 1) {
        scrollToProject(activeIndex + 1);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (activeIndex > 0) {
        scrollToProject(activeIndex - 1);
      }
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigate(`/work/${projects[activeIndex].slug}`);
    }
  };

  const activeProject = projects[activeIndex];
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === projects.length - 1;

  let cueText = "";
  let cueOpacity = 0;
  if (isFirst) {
    cueText = "Scroll to see the next project";
    cueOpacity = hasChanged ? 0 : 1;
  } else if (isLast) {
    cueText = "That's all of them. Keep scrolling.";
    cueOpacity = 1;
  }

  return (
    <section
      id="work"
      ref={trackRef}
      className="relative w-full bg-[#F5F4F0]"
      style={{
        height: `calc(100svh + ${projects.length * 80}svh)`,
      }}
    >
      <div
        ref={stageRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#F5F4F0] pt-[96px] z-[1] flex flex-col justify-between px-6 md:px-12 pb-8 outline-none"
      >
        {/* Top-left heading: "Selected work (03)" (--t-title, count from data) */}
        <div className="w-full flex-shrink-0">
          <h2
            className="t-title text-[var(--ink)]"
            style={{ marginBottom: "clamp(24px, 4svh, 48px)" }}
          >
            Selected work ({pad(projects.length)})
          </h2>
        </div>

        {/* 12-column grid: Image in cols 1-6, List in cols 8-12 */}
        <div className="grid grid-cols-12 gap-x-[24px] items-center my-auto w-full min-h-0">
          {/* Cols 1-6: Image panel (aspect-ratio 4/3, overflow hidden, width 100%, max-height calc(100svh - 300px)) */}
          <div
            className="col-span-6 w-full aspect-[4/3] max-h-[calc(100svh-300px)] overflow-hidden relative bg-[#ECEAE4]"
            style={{
              aspectRatio: "4/3",
              overflow: "hidden",
              width: "100%",
              maxHeight: "calc(100svh - 300px)",
            }}
          >
            <Link
              to={`/work/${activeProject.slug}`}
              aria-label={`View project: ${activeProject.title}`}
              className="block w-full h-full relative cursor-pointer"
            >
              {projects.map((p, idx) => {
                const isActive = idx === activeIndex;
                const isPrev = idx === prevIndex;

                return (
                  <img
                    key={p.slug}
                    src={p.image}
                    alt={p.title}
                    loading="eager"
                    fetchPriority={idx === 0 ? "high" : "auto"}
                    decoding="async"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center top",
                      filter: "none",
                      transform: "none",
                      opacity: isActive ? 1 : isPrev ? 1 : 0,
                      transition: isActive
                        ? "opacity 500ms cubic-bezier(0.22, 1, 0.36, 1)"
                        : isPrev
                        ? "none"
                        : "opacity 500ms cubic-bezier(0.22, 1, 0.36, 1)",
                      zIndex: isActive ? 2 : isPrev ? 1 : 0,
                      pointerEvents: isActive ? "auto" : "none",
                      willChange: "opacity",
                    }}
                    className="absolute inset-0 w-full h-full object-cover [object-position:center_top] [filter:none]"
                  />
                );
              })}
            </Link>
          </div>

          {/* Cols 8-12: List of projects (min-width 0) */}
          <div className="col-start-8 col-span-5 min-w-0 flex flex-col justify-center">
            <ul className="flex flex-col gap-6 list-none p-0 m-0 min-w-0">
              {projects.map((p, idx) => {
                const isActive = idx === activeIndex;

                return (
                  <li key={p.slug} className="flex flex-col min-w-0">
                    <div className="flex items-baseline gap-4 min-w-0">
                      <span className="t-num text-[var(--ink-2)] select-none flex-shrink-0">
                        {pad(idx + 1)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <button
                          type="button"
                          onClick={() => handleTitleClick(idx, p.slug)}
                          className={`text-left w-full cursor-pointer focus-visible:outline select-none transition-[transform,opacity] duration-[280ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isActive
                              ? "opacity-100 translate-x-4"
                              : "opacity-45 hover:opacity-75 translate-x-0"
                          }`}
                        >
                          <span
                            className={`t-item block text-[var(--ink)] ${
                              isActive
                                ? "font-editorial-italic italic font-normal text-[1.06em]"
                                : ""
                            }`}
                          >
                            {p.title}
                          </span>
                        </button>

                        {/* Details expand directly under active title (grid-template-rows: 0fr -> 1fr, 280ms) */}
                        <div
                          className="grid transition-[grid-template-rows] duration-[280ms] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden"
                          style={{
                            gridTemplateRows: isActive ? "1fr" : "0fr",
                          }}
                        >
                          <div
                            className="min-h-0 flex flex-col pt-4 transition-opacity duration-240"
                            style={{
                              opacity: isActive ? 1 : 0,
                              transition: "opacity 240ms cubic-bezier(0.16, 1, 0.3, 1) 40ms",
                            }}
                          >
                            <p className="t-body text-[var(--ink)] max-w-[40ch]">
                              {p.description}
                            </p>
                            <div className="mt-4">
                              <Link
                                to={`/work/${p.slug}`}
                                className="t-cta text-[var(--ink)] inline-flex items-center min-h-[44px] no-underline cursor-pointer"
                              >
                                <TS>View project</TS>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom-left cue (--t-meta) */}
        <div className="w-full flex justify-between items-end flex-shrink-0">
          <span
            className="t-meta text-[var(--ink-2)] transition-opacity duration-300"
            style={{ opacity: cueOpacity }}
          >
            {cueText}
          </span>
        </div>

        {/* Debug panel: visible only when ?debug=work is in URL, z-index <= 10 */}
        {showDebug && (
          <div className="absolute bottom-4 right-4 z-[10] bg-[#141414] text-[#F5F4F0] p-4 text-xs shadow-lg max-w-sm rounded">
            <p className="font-bold pb-1 mb-2">WORK STAGE DEBUG</p>
            <p>scrollY: {Math.round(window.scrollY)}px</p>
            <p>cachedTrackTop: {Math.round(cachedTrackTop.current)}px</p>
            <p>activeIndex: {activeIndex}</p>
            <p>projects count: {projects.length}</p>
          </div>
        )}
      </div>
    </section>
  );
});

export default WorkDesktop;
