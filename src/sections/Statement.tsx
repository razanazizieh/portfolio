/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect, useCallback, useLayoutEffect } from "react";

/**
 * useFitLines
 * Measures two lines with a test font-size of 100px (weight 250, Inter Tight),
 * calculates fitted font-size so the wider line fits the content-box available width.
 * Caps at 12rem (192px).
 * Measured strictly at wght 250.
 * The fit calculation is not re-run during scroll or reveal.
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
 * - reveal group trigger: top < 80% of viewport, once
 * - two lines slide up through masks (translateY 105% to 0, 1000ms, line 2 +140ms)
 * - italic "feels." fades in with 6px upward drift at +700ms
 * - no font-weight animation, fit calculation not re-run during scroll/reveal
 * - mask clipping removed when reveal finishes
 */
export function Statement() {
  const containerRef = useRef<HTMLDivElement>(null);

  const measureLine1Ref = useRef<HTMLSpanElement>(null);
  const measureLine2Ref = useRef<HTMLSpanElement>(null);
  const liveLine1Ref = useRef<HTMLSpanElement>(null);
  const liveLine2Ref = useRef<HTMLSpanElement>(null);

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { fontSize: desktopFontSize, isDesktop } = useFitLines(
    containerRef,
    measureLine1Ref,
    measureLine2Ref,
    liveLine1Ref,
    liveLine2Ref
  );

  const dynamicHeadingStyle: React.CSSProperties = isMobile
    ? {
        fontSize: "clamp(1.5rem, 7.4vw, 2.25rem)",
        lineHeight: 1.12,
        letterSpacing: "-0.03em",
        fontWeight: 250,
        fontVariationSettings: "'wght' 250",
        fontSynthesis: "none",
        width: "100%",
        maxWidth: "none",
        textWrap: "balance",
      }
    : {
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
          data-reveal-group
          data-reveal-id="statement"
          data-reveal-at="0.8"
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
              <span className="statement-line-mask block min-[900px]:whitespace-nowrap overflow-hidden">
                <span
                  ref={liveLine1Ref}
                  className="statement-line statement-line-1 inline-block min-[900px]:whitespace-nowrap"
                >
                  Logic is not just how code
                </span>
              </span>

              {/* Line 2: runs, it's how the interface feels. */}
              <span className="statement-line-mask block min-[900px]:whitespace-nowrap overflow-hidden">
                <span
                  ref={liveLine2Ref}
                  className="statement-line statement-line-2 inline-block min-[900px]:whitespace-nowrap"
                >
                  runs, it&apos;s how the interface{" "}
                  <span
                    className="font-editorial-italic italic font-normal text-[1.06em] statement-feels inline-block"
                    style={{ paddingInlineEnd: "0.1em", lineHeight: 1 }}
                  >
                    feels.
                  </span>
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
