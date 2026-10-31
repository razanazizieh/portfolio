/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useLayoutEffect, useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import TS from "../components/TS";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * 404 Not Found View
 * Rendered strictly OUTSIDE Layout (no nav, no mobile menu, no scroll progress, no footer, no wordmark).
 * Perfectly centered both vertically and horizontally, no scrollbar.
 */
export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const shouldReduceMotion = useReducedMotion();
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const navigate = useNavigate();

  const digits = ["4", "0", "4"];

  useLayoutEffect(() => {
    const origHtmlOverflow = document.documentElement.style.overflow;
    const origBodyOverflow = document.body.style.overflow;
    const origHtmlHeight = document.documentElement.style.height;
    const origBodyHeight = document.body.style.height;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.documentElement.style.height = "100dvh";
    document.body.style.height = "100dvh";
    document.body.dataset.chrome = "off";

    return () => {
      document.documentElement.style.overflow = origHtmlOverflow;
      document.body.style.overflow = origBodyOverflow;
      document.documentElement.style.height = origHtmlHeight;
      document.body.style.height = origBodyHeight;
      delete document.body.dataset.chrome;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isCoarse);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (isTouchDevice || shouldReduceMotion) return;
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      letterRefs.current.forEach((span) => {
        if (!span) return;
        const rect = span.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        const charCenterY = rect.top + rect.height / 2;
        const distance = Math.hypot(mouseX - charCenterX, mouseY - charCenterY);

        const maxDist = 360;
        const influence = Math.max(0, 1 - distance / maxDist);
        const weight = Math.round(300 + influence * 450);

        span.style.fontWeight = weight.toString();
        span.style.fontVariationSettings = `'wght' ${weight}`;
      });
    },
    [isTouchDevice, shouldReduceMotion]
  );

  const handlePointerLeave = useCallback(() => {
    if (isTouchDevice || shouldReduceMotion) return;
    letterRefs.current.forEach((span) => {
      if (!span) return;
      span.style.fontWeight = "300";
      span.style.fontVariationSettings = "'wght' 300";
    });
  }, [isTouchDevice, shouldReduceMotion]);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="fixed inset-0 w-full h-[100dvh] max-h-[100dvh] m-0 p-0 flex flex-col items-center justify-center text-center bg-[var(--color-bg)] overflow-hidden z-[999]"
      style={{
        backgroundColor: "var(--color-bg, #F5F4F0)",
      }}
    >
      <Helmet>
        <title>404 — Razan Azizieh</title>
        <meta name="description" content="This page doesn't exist." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div data-reveal-group className="flex flex-col items-center justify-center px-6">
        {/* Giant "404" as h1 */}
        <div data-reveal-child style={{ '--d': '0ms' } as React.CSSProperties}>
          <h1
            className="leading-none tracking-[-0.04em] text-[var(--ink)] font-light flex items-baseline justify-center"
            style={{ fontSize: "min(26vw, 34svh)" }}
          >
            {digits.map((digit, idx) => (
              <span
                key={idx}
                ref={(el) => {
                  letterRefs.current[idx] = el;
                }}
                className={`inline-block transition-[font-weight] duration-75 ${
                  digit === "0"
                    ? "font-editorial-italic italic font-normal"
                    : ""
                }`}
                style={{ fontWeight: 300 }}
              >
                {digit}
              </span>
            ))}
          </h1>
        </div>

        {/* 32px gap */}
        <div className="h-8" />

        {/* Message: t-lead */}
        <div data-reveal-child style={{ '--d': '120ms' } as React.CSSProperties}>
          <p className="t-lead text-[var(--ink-2)]">
            This page doesn&apos;t exist.
          </p>
        </div>

        {/* 32px gap */}
        <div className="h-8" />

        {/* Links row with <TS>Back home</TS> and <TS>See my work</TS> in t-ui */}
        <div
          data-reveal-child
          style={{ '--d': '240ms' } as React.CSSProperties}
          className="flex items-center justify-center gap-8 t-ui"
        >
          <Link
            to="/"
            aria-label="Back home"
            className="t-ui text-[var(--ink)] min-h-[44px] inline-flex items-center no-underline"
          >
            <TS>Back home</TS>
          </Link>
          <Link
            to="/#work"
            onClick={(e) => {
              e.preventDefault();
              navigate("/", { state: { scrollTo: "work" } });
            }}
            aria-label="See my work"
            className="t-ui text-[var(--ink)] min-h-[44px] inline-flex items-center no-underline"
          >
            <TS>See my work</TS>
          </Link>
        </div>
      </div>
    </div>
  );
}

export { NotFound };
