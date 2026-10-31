/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from "react";
import siteContent, { WordmarkVariant } from "../content/site";
import { scrollToTop } from "../lib/scroll";

export interface WordmarkProps {
  className?: string;
}

/**
 * Wordmark Component supporting three variants:
 * - 'contained' (default): exactly current look, contained within layout padding.
 * - 'bleed': spans full viewport width edge to edge (cancels page padding with negative inline margins, 4px safety inset, wrapper overflow clipped), same weight and font, letter-spacing 0, same reveal and "Back to top" role.
 * - 'hybrid': "RAZAN" in Inter Tight variable at wordmark weight (600), followed by "Azizieh" in Instrument Serif italic (mixed case), on one line, fitted edge to edge with same fit logic, scaled so capital A of Azizieh matches capital R of RAZAN, same baseline, same reveal and "Back to top" role.
 * Fits without clipping from 320px to 2560px.
 */
export function Wordmark({ className = "" }: WordmarkProps) {
  const variant: WordmarkVariant = siteContent.wordmark?.variant || "contained";
  const textRef = useRef<SVGTextElement>(null);
  const [viewBox, setViewBox] = useState("0 22 985 88");

  useEffect(() => {
    const measureFit = () => {
      if (textRef.current) {
        try {
          const bbox = textRef.current.getBBox();
          if (bbox.width > 0 && bbox.height > 0) {
            if (variant === "bleed") {
              // 4px safety inset so glyphs never clip
              setViewBox(`${bbox.x - 4} ${bbox.y} ${bbox.width + 8} ${bbox.height}`);
            } else {
              setViewBox(`${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
            }
          }
        } catch {
          // Fallback bbox
        }
      }
    };

    measureFit();

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measureFit).catch(() => {});
    }

    window.addEventListener("resize", measureFit);
    return () => window.removeEventListener("resize", measureFit);
  }, [variant]);

  const isBleed = variant === "bleed";
  const isHybrid = variant === "hybrid";

  // For 'bleed', cancel the page padding with negative inline margins and clip overflow
  const bleedStyle: React.CSSProperties = isBleed
    ? {
        marginLeft: "calc(-1 * var(--pad-x, clamp(24px, 4vw, 48px)))",
        marginRight: "calc(-1 * var(--pad-x, clamp(24px, 4vw, 48px)))",
        width: "calc(100% + 2 * var(--pad-x, clamp(24px, 4vw, 48px)))",
        overflow: "hidden",
      }
    : {};

  return (
    <div
      data-wordmark
      className={`wordmark-container w-full overflow-hidden leading-none select-text ${className}`}
      style={bleedStyle}
    >
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className="wordmark-button w-full block bg-transparent border-none p-0 text-left cursor-pointer overflow-hidden leading-none select-text focus-visible:outline"
      >
        <svg
          viewBox={viewBox}
          className="w-full h-auto block overflow-visible select-text"
          preserveAspectRatio="xMinYMid meet"
          aria-hidden="true"
        >
          {isHybrid ? (
            <text
              ref={textRef}
              x="0"
              y="108"
              fill="currentColor"
              className="t-wordmark select-text"
              style={{
                fill: "currentColor",
                color: "var(--ink)",
              }}
            >
              <tspan
                fontFamily="var(--font-sans)"
                fontSize="120"
                fontWeight="var(--wordmark-wght, 600)"
                fill="currentColor"
                style={{
                  fontWeight: "var(--wordmark-wght, 600)",
                  fontVariationSettings: "'wght' var(--wordmark-wght, 600)",
                  fontSynthesis: "none",
                  letterSpacing: "-0.005em",
                  fill: "currentColor",
                }}
              >
                RAZAN{" "}
              </tspan>
              <tspan
                fontFamily="var(--font-serif)"
                fontStyle="italic"
                fontSize="127"
                fontWeight="400"
                fill="currentColor"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  letterSpacing: "0",
                  fill: "currentColor",
                }}
              >
                Azizieh
              </tspan>
            </text>
          ) : (
            <text
              ref={textRef}
              x="0"
              y="108"
              fontSize="120"
              fontFamily="var(--font-sans)"
              fontWeight="var(--wordmark-wght, 600)"
              letterSpacing={isBleed ? "0" : "-0.005em"}
              fill="currentColor"
              className="t-wordmark select-text"
              style={{
                fontWeight: "var(--wordmark-wght, 600)",
                fontVariationSettings: "'wght' var(--wordmark-wght, 600)",
                fontSynthesis: "none",
                letterSpacing: isBleed ? "0" : "-0.005em",
                lineHeight: 0.86,
                fill: "currentColor",
                color: "var(--ink)",
              }}
            >
              {siteContent.wordmark?.text || siteContent.footer.wordmark}
            </text>
          )}
        </svg>
      </button>
    </div>
  );
}

export default Wordmark;
