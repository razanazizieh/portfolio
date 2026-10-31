/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { CSSProperties, ReactNode, useEffect, useRef } from "react";
import { parseInline, type InlineSegment } from "../lib/parseInline";

export interface WordsProps {
  text: string;
  as?: "p" | "h1" | "h2" | "h3" | "span" | "div" | "blockquote";
  className?: string;
  style?: CSSProperties;
  delay?: number;
  isChild?: boolean;
  children?: ReactNode;
}

/**
 * Helper to split text into words while preserving inline italic markdown status.
 */
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

/**
 * Words Component
 * Splits text into words, each rendered as <span class="w"><span style="--i:index">word</span></span>.
 * Word stagger cap at 24ms.
 * Once reveal finishes (transitionend, with a timeout fallback), marks wrappers data-revealed.
 */
export function Words({
  text,
  as: Component = "div",
  className = "",
  style,
  delay = 0,
  isChild,
}: WordsProps) {
  const containerRef = useRef<HTMLElement>(null);

  if (!text || typeof text !== "string") {
    return <Component data-reveal="words" className={className} style={style} />;
  }

  const parsedWords = getParsedWords(text.trim());
  const wordCount = parsedWords.length;
  // Word stagger cap at 24ms
  const s = Math.min(24, Math.round(600 / Math.max(1, wordCount)));

  const computedStyle: CSSProperties = {
    ...style,
    ["--s" as string]: `${s}ms`,
    ["--d" as string]: `${delay}ms`,
  };

  const isLargeHeading =
    Component === "h1" ||
    className.includes("t-display") ||
    className.includes("t-title") ||
    className.includes("t-statement") ||
    className.includes("title-section");

  const italicFontSize = isLargeHeading ? "1.06em" : "1.0em";

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Timeout fallback: after total duration, mark all masks data-revealed
    const totalDuration = delay + wordCount * s + 900;
    const timer = setTimeout(() => {
      const masks = el.querySelectorAll<HTMLElement>(".w");
      masks.forEach((m) => {
        m.setAttribute("data-revealed", "true");
        m.style.overflow = "visible";
        m.style.paddingBlock = "0";
        m.style.marginBlock = "0";
      });
      el.setAttribute("data-revealed", "true");
    }, totalDuration);

    return () => clearTimeout(timer);
  }, [delay, wordCount, s]);

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLSpanElement>) => {
    const mask = e.currentTarget.parentElement;
    if (mask) {
      mask.setAttribute("data-revealed", "true");
      mask.style.overflow = "visible";
      mask.style.paddingBlock = "0";
      mask.style.marginBlock = "0";
    }
  };

  return (
    <Component
      ref={containerRef as any}
      data-reveal="words"
      data-reveal-child={isChild ? "" : undefined}
      className={className}
      style={computedStyle}
    >
      {parsedWords.map((wordSegments, idx) => (
        <React.Fragment key={idx}>
          <span className="w" style={{ paddingBlock: "0.2em", marginBlock: "-0.2em" }}>
            <span
              onTransitionEnd={handleTransitionEnd}
              style={{
                "--i": idx,
              } as CSSProperties}
              className="inline-block"
            >
              {wordSegments.map((seg, sIdx) =>
                seg.italic ? (
                  <span
                    key={sIdx}
                    className="font-editorial-italic font-normal italic inline-block"
                    style={{ fontSize: italicFontSize, lineHeight: 1 }}
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
          </span>
          {idx < parsedWords.length - 1 ? " " : ""}
        </React.Fragment>
      ))}
    </Component>
  );
}

export default Words;
