/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect, useCallback, useLayoutEffect } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { parseInline, type InlineSegment } from "../lib/parseInline";
import { getLenis } from "../lib/lenis";

const LINE_1_RAW = "Logic is not just how code";
const LINE_2_RAW = "runs, it's how the interface *feels.*";

function getParsedWords(text: string): InlineSegment[][] {
  const inlineSegments = parseInline(text);
  const words: InlineSegment[][] = [];
  let currentWord: InlineSegment[] = [];

  inlineSegments.forEach((segment) => {
    const parts = segment.text.split(/(\s+)/);
    parts.forEach((part) => {
      if (!part) return;
      if (/\s+/.test(part)) {
        if (currentWord.length > 0) {
          words.push(currentWord);
          currentWord = [];
        }
      } else {
        currentWord.push({ text: part, italic: segment.italic });
      }
    });
  });

  if (currentWord.length > 0) {
    words.push(currentWord);
  }

  return words;
}

const LINE_1_WORDS = getParsedWords(LINE_1_RAW);
const LINE_2_WORDS = getParsedWords(LINE_2_RAW);
const TOTAL_WORD_COUNT = LINE_1_WORDS.length + LINE_2_WORDS.length; // 12 words

/**
 * useFitLines
 * Measures two lines with a test font-size of 100px (weight 250, Inter Tight),
 * calculates fitted font-size so the wider line fits the content-box available width.
 * Caps at 12rem (192px).
 * Measured strictly at wght 250 so scroll-scrubbed reveals never cause reflows.
 */
export function useFitLines(
  containerRef: React.RefObject<HTMLDivElement | null>,
  measureLine1Ref: React.RefObject<HTMLSpanElement | null>,
  measureLine2Ref: React.RefObject<HTMLSpanElement | null>,
  liveLine1Ref: React.RefObject<HTMLSpanElement | null>,
  liveLine2Ref: React.RefObject<HTMLSpanElement | null>
) {
  const [fontSize, setFontSize] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  const calculateFit = useCallback(() => {
    if (typeof window === "undefined") return;
    const isDesk = window.innerWidth >= 900;
    setIsDesktop(isDesk);

    if (!isDesk) {
      setFontSize(null);
      return;
    }

    const container = containerRef.current;
    const m1 = measureLine1Ref.current;
    const m2 = measureLine2Ref.current;
    if (!container || !m1 || !m2) return;

    const cs = window.getComputedStyle(container);
    const padLeft = parseFloat(cs.paddingLeft) || 0;
    const padRight = parseFloat(cs.paddingRight) || 0;
    const available = container.clientWidth - padLeft - padRight;
    if (available <= 0) return;

    const w1 = m1.getBoundingClientRect().width;
    const w2 = m2.getBoundingClientRect().width;
    const maxTestWidth = Math.max(w1, w2);
    if (maxTestWidth <= 0) return;

    let size = Math.floor(((100 * available) / maxTestWidth) * 0.97 * 2) / 2;
    size = Math.min(192, Math.max(16, size));

    const l1 = liveLine1Ref.current;
    const l2 = liveLine2Ref.current;
    if (l1 && l2) {
      let iterations = 0;
      while (iterations < 6 && (l1.scrollWidth > available || l2.scrollWidth > available)) {
        size = Math.round(size * 0.97 * 10) / 10;
        iterations++;
      }
    }

    setFontSize(size);
  }, [containerRef, measureLine1Ref, measureLine2Ref, liveLine1Ref, liveLine2Ref]);

  useLayoutEffect(() => {
    calculateFit();
  }, [calculateFit]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    calculateFit();

    const r1 = requestAnimationFrame(() => {
      const r2 = requestAnimationFrame(() => {
        calculateFit();
      });
      return () => cancelAnimationFrame(r2);
    });

    let ro: ResizeObserver | null = null;
    if (containerRef.current && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(calculateFit);
      ro.observe(containerRef.current);
    }

    if (document.fonts) {
      if (document.fonts.ready) {
        document.fonts.ready.then(calculateFit).catch(() => {});
      }
      document.fonts.addEventListener("loadingdone", calculateFit);
    }

    window.addEventListener("resize", calculateFit, { passive: true });

    return () => {
      cancelAnimationFrame(r1);
      ro?.disconnect();
      if (document.fonts) {
        document.fonts.removeEventListener("loadingdone", calculateFit);
      }
      window.removeEventListener("resize", calculateFit);
    };
  }, [calculateFit, containerRef]);

  return { fontSize, isDesktop };
}

/**
 * Statement Section
 * - normal flow, background #F5F4F0, padding-block var(--pad-y)
 * - weight 250, line-height 1.02, letter-spacing -0.035em, font-synthesis: none
 * - Phrase-by-phrase / word wave scroll reveal:
 *   1. Initial state: Muted/dim opacity (0.15) with soft 8px downward offset.
 *   2. Gradual color & wave: As scroll progress advances, words progressively illuminate
 *      to full dark intensity (#0A0A0A) with a soft upward translate wave (8px to 0px).
 *   3. Fast-pass & velocity handling: When scrolling past quickly or when the trigger line
 *      is crossed, all words smoothly complete to 100% intensity without stalling.
 *   4. Esthetic integrity: Exactly retains weight 250, line-height 1.02, and Instrument Serif
 *      italic styling on the word "feels."
 */
export function Statement() {
  const blockRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const measureLine1Ref = useRef<HTMLSpanElement>(null);
  const measureLine2Ref = useRef<HTMLSpanElement>(null);
  const liveLine1Ref = useRef<HTMLSpanElement>(null);
  const liveLine2Ref = useRef<HTMLSpanElement>(null);

  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const shouldReduceMotion = useReducedMotion();
  const [isRevealed, setIsRevealed] = useState(false);

  // Velocity tracking
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(0);

  const { fontSize: desktopFontSize, isDesktop } = useFitLines(
    containerRef,
    measureLine1Ref,
    measureLine2Ref,
    liveLine1Ref,
    liveLine2Ref
  );

  const updateScrollProgress = useCallback(() => {
    if (!blockRef.current) return;
    const vh = window.innerHeight || 0;
    if (vh <= 0) return;

    if (shouldReduceMotion) {
      wordRefs.current.forEach((el) => {
        if (el) {
          el.style.opacity = "1";
          el.style.transform = "none";
          el.style.color = "#0A0A0A";
        }
      });
      setIsRevealed(true);
      blockRef.current.setAttribute("data-revealed", "true");
      return;
    }

    const rect = blockRef.current.getBoundingClientRect();
    const top = rect.top;

    // Velocity detection
    const now = performance.now();
    const dt = Math.max(1, now - lastScrollTime.current);
    const currentScrollY = window.scrollY;
    const dy = currentScrollY - lastScrollY.current;
    const velocity = Math.abs(dy / dt);
    lastScrollTime.current = now;
    lastScrollY.current = currentScrollY;

    // Entrance window: starts entering at vh * 0.88, fully revealed by vh * 0.35
    const enterPoint = vh * 0.88;
    const finishPoint = vh * 0.35;
    const span = enterPoint - finishPoint;

    let rawProgress = span > 0 ? (enterPoint - top) / span : 1;

    // Fast-pass / velocity handling:
    // If scrolling past quickly or past the finish threshold, complete fluidly
    const isFastDownward = velocity > 1.6 && dy > 0 && top < vh * 0.65;
    if (rawProgress >= 1 || isFastDownward || blockRef.current.classList.contains("is-in")) {
      rawProgress = 1;
    }

    const progress = Math.min(1, Math.max(0, rawProgress));

    if (progress >= 1 && !isRevealed) {
      setIsRevealed(true);
      blockRef.current.setAttribute("data-revealed", "true");
    }

    // Word-by-word wave calculation
    const staggerSpan = 0.52;
    const wordDuration = 0.48;

    wordRefs.current.forEach((el, i) => {
      if (!el) return;

      if (progress >= 1) {
        el.style.opacity = "1";
        el.style.transform = "translate3d(0, 0, 0)";
        return;
      }

      if (progress <= 0) {
        el.style.opacity = "0.15";
        el.style.transform = "translate3d(0, 8px, 0)";
        return;
      }

      const start = (i / TOTAL_WORD_COUNT) * staggerSpan;
      const wordProgress = Math.min(1, Math.max(0, (progress - start) / wordDuration));

      // Ease out curve for fluid organic float
      const eased = 1 - Math.pow(1 - wordProgress, 2.2);

      const opacity = (0.15 + 0.85 * eased).toFixed(3);
      const translateY = ((1 - eased) * 8).toFixed(2);

      el.style.opacity = opacity;
      el.style.transform = `translate3d(0, ${translateY}px, 0)`;
    });
  }, [isRevealed, shouldReduceMotion]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    lastScrollTime.current = performance.now();

    if (shouldReduceMotion) {
      updateScrollProgress();
      return;
    }

    updateScrollProgress();

    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        updateScrollProgress();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Connect to Lenis smooth scroll
    const lenis = getLenis();
    if (lenis) {
      lenis.on("scroll", onScroll);
    }

    const el = blockRef.current;
    let observer: MutationObserver | null = null;
    if (el) {
      observer = new MutationObserver(() => {
        if (el.classList.contains("is-in")) {
          updateScrollProgress();
        }
      });
      observer.observe(el, { attributes: true, attributeFilter: ["class"] });
    }

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (lenis) {
        lenis.off("scroll", onScroll);
      }
      observer?.disconnect();
    };
  }, [updateScrollProgress, shouldReduceMotion]);

  const renderWord = (wordSegments: InlineSegment[], globalIdx: number) => {
    return (
      <span
        key={globalIdx}
        ref={(node) => {
          wordRefs.current[globalIdx] = node;
        }}
        className="inline-block mr-[0.24em] align-top will-change-[transform,opacity]"
        style={{
          opacity: shouldReduceMotion ? 1 : 0.15,
          transform: shouldReduceMotion ? "none" : "translate3d(0, 8px, 0)",
          color: "#0A0A0A",
          transition: shouldReduceMotion
            ? "none"
            : "opacity 320ms cubic-bezier(0.22, 1, 0.36, 1), transform 320ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {wordSegments.map((seg, sIdx) =>
          seg.italic ? (
            <span
              key={sIdx}
              className="font-editorial-italic italic font-normal text-[1.06em] inline-block"
              style={{
                lineHeight: 1,
                paddingInlineEnd: "0.1em",
              }}
            >
              {seg.text}
            </span>
          ) : (
            <span key={sIdx} className="inline-block">
              {seg.text}
            </span>
          )
        )}
      </span>
    );
  };

  const dynamicHeadingStyle: React.CSSProperties = {
    fontSize: isDesktop && desktopFontSize ? `${desktopFontSize}px` : "clamp(2rem, 9vw, 3.5rem)",
    lineHeight: 1.02,
    letterSpacing: "-0.035em",
    fontWeight: 250,
    fontVariationSettings: "'wght' 250",
    fontSynthesis: "none",
  };

  return (
    <section
      aria-label="Statement"
      className="w-full bg-[#F5F4F0] flex items-center justify-center overflow-visible"
      style={{
        paddingBlock: "var(--pad-y, clamp(96px, 12vw, 176px))",
      }}
    >
      {/* Hidden offscreen reference measuring element - always measured at wght 250 */}
      <div
        aria-hidden="true"
        className="fixed -left-[9999px] -top-[9999px] pointer-events-none invisible whitespace-nowrap"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "100px",
          fontWeight: 250,
          fontVariationSettings: "'wght' 250",
          fontSynthesis: "none",
          letterSpacing: "-0.035em",
          lineHeight: 1.02,
        }}
      >
        <span ref={measureLine1Ref} className="inline-block whitespace-nowrap">
          Logic is not just how code
        </span>
        <span ref={measureLine2Ref} className="inline-block whitespace-nowrap">
          runs, it&apos;s how the interface{" "}
          <span
            className="font-editorial-italic italic font-normal text-[1.06em]"
            style={{ paddingInlineEnd: "0.1em", lineHeight: 1 }}
          >
            feels.
          </span>
        </span>
      </div>

      <div
        ref={containerRef}
        className="w-full max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col justify-center items-start overflow-visible"
      >
        <div
          ref={blockRef}
          data-reveal-group
          data-reveal-id="statement"
          data-reveal-at="0.75"
          className="w-full overflow-visible"
        >
          <blockquote
            aria-label="Design philosophy statement"
            className="w-full overflow-visible"
          >
            <h2
              className="w-full text-[#0A0A0A] text-left overflow-visible [text-wrap:balance] min-[900px]:[text-wrap:nowrap]"
              style={dynamicHeadingStyle}
            >
              {/* Line 1: Logic is not just how code */}
              <span
                data-revealed={isRevealed ? "true" : undefined}
                className="block min-[900px]:whitespace-nowrap overflow-visible"
              >
                <span
                  ref={liveLine1Ref}
                  className="inline-block min-[900px]:whitespace-nowrap overflow-visible"
                >
                  {LINE_1_WORDS.map((w, i) => renderWord(w, i))}
                </span>
              </span>

              {/* Line 2: runs, it's how the interface feels. */}
              <span
                data-revealed={isRevealed ? "true" : undefined}
                className="block min-[900px]:whitespace-nowrap overflow-visible"
              >
                <span
                  ref={liveLine2Ref}
                  className="inline-block min-[900px]:whitespace-nowrap overflow-visible"
                >
                  {LINE_2_WORDS.map((w, i) =>
                    renderWord(w, LINE_1_WORDS.length + i)
                  )}
                </span>
              </span>
            </h2>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

export default Statement;
