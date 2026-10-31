/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect, useState, useCallback } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import HL from "../components/HL";
import siteContent from "../content/site";
import { scrollToSection } from "../lib/scroll";
import { parseInline, type InlineSegment } from "../lib/parseInline";

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
 * Hero Section
 * - Intro delays x0.75
 * - Pointer weight effect starts 700ms after app:ready
 * - Spring physics rAF loop runs only while pointer inside and hero on screen
 * - Font-variation-settings applied only when weight target changes by >= 5
 * - Hero sentence: weight 340, color var(--ink)
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const shouldReduceMotion = useReducedMotion();
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [canHover, setCanHover] = useState(false);

  const [isIntroIn, setIsIntroIn] = useState(() => {
    if (typeof window === "undefined") return true;
    if (shouldReduceMotion) return true;
    return Boolean((window as unknown as { __appReady?: boolean }).__appReady);
  });

  const line1Text = siteContent.hero.line1;
  const line2Text = siteContent.hero.line2;
  const allLetters = [...line1Text.split(""), ...line2Text.split("")];
  const totalLetters = allLetters.length;
  const parsedSentenceWords = getParsedWords(siteContent.hero.sentence.trim());

  // Springs state
  const currentWeights = useRef<Float32Array>(new Float32Array(totalLetters).fill(100));
  const targetWeights = useRef<Float32Array>(new Float32Array(totalLetters).fill(250));
  const velocities = useRef<Float32Array>(new Float32Array(totalLetters).fill(0));
  const prevAppliedWeights = useRef<Float32Array>(new Float32Array(totalLetters).fill(-1));
  const lastTimeRef = useRef<number>(performance.now());
  const rafIdRef = useRef<number | null>(null);

  const isPointerInsideRef = useRef(false);
  const isHeroOnScreenRef = useRef(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isCoarse);

    // Track on-screen status with IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        isHeroOnScreenRef.current = entry.isIntersecting;
        if (!entry.isIntersecting && rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Set up spring physics loop: only runs when pointer is inside and hero on screen
  useEffect(() => {
    if (shouldReduceMotion) {
      letterRefs.current.forEach((span) => {
        if (!span) return;
        span.style.fontWeight = "300";
        span.style.fontVariationSettings = "'wght' 300";
      });
      return;
    }

    const stiffness = 140;
    const damping = 20;

    const animateSprings = (time: number) => {
      if (
        document.documentElement.hasAttribute("data-scrolling") ||
        !isHeroOnScreenRef.current ||
        (!isPointerInsideRef.current && !isTouchDevice)
      ) {
        rafIdRef.current = null;
        return;
      }

      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.032);
      lastTimeRef.current = time;

      let isMoving = false;

      // If touch device, compute targets based on scroll
      if (isTouchDevice) {
        const scrollY = window.scrollY;
        const heroHeight = sectionRef.current?.offsetHeight || window.innerHeight;
        const scrollProgress = Math.min(1, Math.max(0, scrollY / Math.max(1, heroHeight * 0.8)));
        const scrollWeight = 250 + (600 - 250) * scrollProgress;
        const elapsedSec = time / 1000;

        for (let i = 0; i < totalLetters; i++) {
          const phase = (i / totalLetters) * Math.PI;
          const wave = 120 * Math.sin((elapsedSec * 2 * Math.PI / 6) + phase);
          targetWeights.current[i] = Math.min(800, Math.max(250, scrollWeight + wave));
        }
        isMoving = true;
      }

      for (let i = 0; i < totalLetters; i++) {
        const cur = currentWeights.current[i];
        const tgt = targetWeights.current[i];
        const vel = velocities.current[i];

        const force = -stiffness * (cur - tgt) - damping * vel;
        const nextVel = vel + force * dt;
        const nextWeight = cur + nextVel * dt;

        velocities.current[i] = nextVel;
        currentWeights.current[i] = nextWeight;

        // Apply only when target changed by >= 5
        if (Math.abs(nextWeight - prevAppliedWeights.current[i]) >= 5) {
          const span = letterRefs.current[i];
          if (span) {
            span.style.fontVariationSettings = `'wght' ${Math.round(nextWeight)}`;
            span.style.fontWeight = Math.round(nextWeight).toString();
          }
          prevAppliedWeights.current[i] = nextWeight;
        }

        if (Math.abs(nextWeight - tgt) > 0.5 || Math.abs(nextVel) > 0.5) {
          isMoving = true;
        }
      }

      if (isMoving && (isPointerInsideRef.current || isTouchDevice) && isHeroOnScreenRef.current) {
        rafIdRef.current = requestAnimationFrame(animateSprings);
      } else {
        rafIdRef.current = null;
      }
    };

    const startSpringLoop = () => {
      if (document.documentElement.hasAttribute("data-scrolling")) return;
      if (rafIdRef.current === null && isHeroOnScreenRef.current && (isPointerInsideRef.current || isTouchDevice)) {
        lastTimeRef.current = performance.now();
        rafIdRef.current = requestAnimationFrame(animateSprings);
      }
    };

    const onScroll = () => {
      if (isTouchDevice && isHeroOnScreenRef.current) {
        startSpringLoop();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [shouldReduceMotion, isTouchDevice, totalLetters]);

  // Listen for app:ready and trigger intro
  useEffect(() => {
    if (shouldReduceMotion) {
      setIsIntroIn(true);
      setCanHover(true);
      return;
    }

    let hoverTimer: ReturnType<typeof setTimeout> | null = null;

    const startIntro = () => {
      setIsIntroIn(true);
      targetWeights.current.fill(250);

      // The pointer weight effect starts 700ms after app:ready
      hoverTimer = setTimeout(() => {
        setCanHover(true);
      }, 700);
    };

    const winReady = window as unknown as { __appReady?: boolean };
    if (winReady.__appReady) {
      startIntro();
    } else {
      const onAppReady = () => {
        startIntro();
      };
      window.addEventListener("app:ready", onAppReady, { once: true });
      return () => {
        window.removeEventListener("app:ready", onAppReady);
        if (hoverTimer) clearTimeout(hoverTimer);
      };
    }

    return () => {
      if (hoverTimer) clearTimeout(hoverTimer);
    };
  }, [shouldReduceMotion]);

  // Pointer move handler on the hero section
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (!canHover || isTouchDevice || shouldReduceMotion || !isHeroOnScreenRef.current) return;
      isPointerInsideRef.current = true;

      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const vw = window.innerWidth;
      const R = Math.min(320, Math.max(140, vw * 0.16));

      for (let i = 0; i < totalLetters; i++) {
        const span = letterRefs.current[i];
        if (!span) continue;
        const rect = span.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        const charCenterY = rect.top + rect.height / 2;
        const distance = Math.hypot(mouseX - charCenterX, mouseY - charCenterY);

        const target = 250 + (800 - 250) * Math.exp(-Math.pow(distance / R, 2));
        targetWeights.current[i] = target;
      }

      if (rafIdRef.current === null) {
        lastTimeRef.current = performance.now();
        const animate = (time: number) => {
          if (!isHeroOnScreenRef.current || !isPointerInsideRef.current) {
            rafIdRef.current = null;
            return;
          }

          const dt = Math.min((time - lastTimeRef.current) / 1000, 0.032);
          lastTimeRef.current = time;

          let moving = false;
          const stiffness = 140;
          const damping = 20;

          for (let i = 0; i < totalLetters; i++) {
            const cur = currentWeights.current[i];
            const tgt = targetWeights.current[i];
            const vel = velocities.current[i];

            const force = -stiffness * (cur - tgt) - damping * vel;
            const nextVel = vel + force * dt;
            const nextWeight = cur + nextVel * dt;

            velocities.current[i] = nextVel;
            currentWeights.current[i] = nextWeight;

            if (Math.abs(nextWeight - prevAppliedWeights.current[i]) >= 5) {
              const span = letterRefs.current[i];
              if (span) {
                span.style.fontVariationSettings = `'wght' ${Math.round(nextWeight)}`;
                span.style.fontWeight = Math.round(nextWeight).toString();
              }
              prevAppliedWeights.current[i] = nextWeight;
            }

            if (Math.abs(nextWeight - tgt) > 0.5 || Math.abs(nextVel) > 0.5) {
              moving = true;
            }
          }

          if (moving && isPointerInsideRef.current && isHeroOnScreenRef.current) {
            rafIdRef.current = requestAnimationFrame(animate);
          } else {
            rafIdRef.current = null;
          }
        };

        rafIdRef.current = requestAnimationFrame(animate);
      }
    },
    [canHover, isTouchDevice, shouldReduceMotion, totalLetters]
  );

  const handlePointerLeave = useCallback(() => {
    if (!canHover || isTouchDevice || shouldReduceMotion) return;
    isPointerInsideRef.current = false;
    targetWeights.current.fill(250);

    if (rafIdRef.current === null && isHeroOnScreenRef.current) {
      lastTimeRef.current = performance.now();
      const animate = (time: number) => {
        const dt = Math.min((time - lastTimeRef.current) / 1000, 0.032);
        lastTimeRef.current = time;

        let moving = false;
        const stiffness = 140;
        const damping = 20;

        for (let i = 0; i < totalLetters; i++) {
          const cur = currentWeights.current[i];
          const tgt = targetWeights.current[i];
          const vel = velocities.current[i];

          const force = -stiffness * (cur - tgt) - damping * vel;
          const nextVel = vel + force * dt;
          const nextWeight = cur + nextVel * dt;

          velocities.current[i] = nextVel;
          currentWeights.current[i] = nextWeight;

          if (Math.abs(nextWeight - prevAppliedWeights.current[i]) >= 5) {
            const span = letterRefs.current[i];
            if (span) {
              span.style.fontVariationSettings = `'wght' ${Math.round(nextWeight)}`;
              span.style.fontWeight = Math.round(nextWeight).toString();
            }
            prevAppliedWeights.current[i] = nextWeight;
          }

          if (Math.abs(nextWeight - tgt) > 0.5 || Math.abs(nextVel) > 0.5) {
            moving = true;
          }
        }

        if (moving && isHeroOnScreenRef.current) {
          rafIdRef.current = requestAnimationFrame(animate);
        } else {
          rafIdRef.current = null;
        }
      };

      rafIdRef.current = requestAnimationFrame(animate);
    }
  }, [canHover, isTouchDevice, shouldReduceMotion, totalLetters]);

  const handleScrollToContact = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    scrollToSection("contact");
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        height: "100svh",
        minHeight: "100svh",
        maxHeight: "100svh",
        paddingTop: "clamp(48px, 6svh, 80px)",
        paddingBottom: "clamp(24px, 3.5svh, 40px)",
        backgroundColor: "#F5F4F0",
      }}
      className="w-full bg-[#F5F4F0] h-[100svh] min-h-[100svh] max-h-[100svh] px-6 md:px-12 flex flex-col justify-between overflow-hidden"
    >
      <div
        ref={containerRef}
        className="relative w-full h-full flex-1 max-w-[1600px] mx-auto flex flex-col justify-between"
      >
        {/* Exactly ONE h1 on home route wrapping both the name and headline */}
        <h1 aria-label="Razan Azizieh — Front-end Developer" className="w-full contents">
          {/* Row 1: Name */}
          <div className="w-full text-left block">
            <span className="t-item block whitespace-nowrap text-[var(--ink)]">
              <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] mr-[0.25em]">
                <span
                  className="font-sans inline-block transition-transform duration-[var(--dur-name,550ms)]"
                  style={{
                    fontWeight: 350,
                    fontVariationSettings: "'wght' 350",
                    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                    transform:
                      shouldReduceMotion || isIntroIn
                        ? "translate3d(0, 0, 0)"
                        : "translate3d(0, 110%, 0)",
                  }}
                >
                  Razan
                </span>
              </span>
              <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em]">
                <span
                  className="font-editorial-italic font-normal text-[1.0em] inline-block transition-transform duration-[var(--dur-name,550ms)]"
                  style={{
                    lineHeight: 1,
                    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                    transform:
                      shouldReduceMotion || isIntroIn
                        ? "translate3d(0, 0, 0)"
                        : "translate3d(0, 110%, 0)",
                  }}
                >
                  Azizieh
                </span>
              </span>
            </span>
          </div>

          <div style={{ height: "clamp(20px, 3svh, 40px)" }} aria-hidden="true" className="flex-shrink-0" />

          {/* Row 2: Headline on two lines */}
          <div className="w-full block my-auto">
            <div
              aria-hidden="true"
              className="t-display text-[var(--ink)] block w-full"
            >
              {/* Line 1: Front-end (delay 112ms) */}
              <div className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
                <div
                  className="whitespace-nowrap inline-flex justify-start transition-transform duration-[var(--dur-headline,825ms)]"
                  style={{
                    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                    transitionDelay: "112ms",
                    transform:
                      shouldReduceMotion || isIntroIn
                        ? "translate3d(0, 0, 0)"
                        : "translate3d(0, 110%, 0)",
                  }}
                >
                  {line1Text.split("").map((char, index) => (
                    <span
                      key={`line1-${index}`}
                      ref={(el) => {
                        letterRefs.current[index] = el;
                      }}
                      className="inline-block"
                      style={{
                        fontWeight: shouldReduceMotion ? 300 : 250,
                        fontVariationSettings: shouldReduceMotion
                          ? "'wght' 300"
                          : "'wght' 250",
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>

              {/* Line 2: Developer (delay 218ms) */}
              <div className="block overflow-hidden pb-[0.12em] -mb-[0.12em] w-full text-right">
                <div
                  className="whitespace-nowrap inline-flex justify-end w-full transition-transform duration-[var(--dur-headline,825ms)]"
                  style={{
                    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                    transitionDelay: "218ms",
                    transform:
                      shouldReduceMotion || isIntroIn
                        ? "translate3d(0, 0, 0)"
                        : "translate3d(0, 110%, 0)",
                  }}
                >
                  {line2Text.split("").map((char, index) => {
                    const globalIndex = line1Text.length + index;
                    return (
                      <span
                        key={`line2-${index}`}
                        ref={(el) => {
                          letterRefs.current[globalIndex] = el;
                        }}
                        className="inline-block"
                        style={{
                          fontWeight: shouldReduceMotion ? 300 : 250,
                          fontVariationSettings: shouldReduceMotion
                            ? "'wght' 300"
                            : "'wght' 250",
                        }}
                      >
                        {char}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </h1>

        <div style={{ height: "max(48px, 5svh)" }} aria-hidden="true" className="flex-shrink-0" />

        {/* Row 3: bottom row */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-baseline flex-shrink-0">
          {/* Left (cols 1-6): sentence words, clamp(1.0625rem, 1.3vw, 1.25rem), weight 340, color var(--ink) */}
          <div className="md:col-span-6">
            <p
              className="text-[var(--ink)]"
              style={{
                fontSize: "clamp(1.0625rem, 1.3vw, 1.25rem)",
                fontWeight: 340,
                fontVariationSettings: "'wght' 340",
                lineHeight: 1.4,
                maxWidth: "30ch",
              }}
            >
              {parsedSentenceWords.map((wordSegments, idx) => {
                const s = Math.min(24, Math.round(500 / Math.max(1, parsedSentenceWords.length)));
                return (
                  <span
                    key={idx}
                    className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] mr-[0.25em] align-top"
                  >
                    <span
                      className="inline-block transition-transform duration-[var(--dur-child-transform,750ms)]"
                      style={{
                        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                        transitionDelay: `${525 + idx * s}ms`,
                        transform:
                          shouldReduceMotion || isIntroIn
                            ? "translate3d(0, 0, 0)"
                            : "translate3d(0, 110%, 0)",
                      }}
                    >
                      {wordSegments.map((seg, sIdx) =>
                        seg.italic ? (
                          <span
                            key={sIdx}
                            className="font-editorial-italic font-normal italic inline-block"
                            style={{ fontSize: "1.0em", lineHeight: 1 }}
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
                );
              })}
            </p>
          </div>

          {/* Right (cols 9-12, right aligned): "Let's talk" t-cta rising at +712ms */}
          <div className="md:col-start-9 md:col-span-4 flex items-baseline justify-start md:justify-end flex-shrink-0 overflow-hidden pb-[0.12em] -mb-[0.12em]">
            <div
              className="transition-transform duration-[var(--dur-child-transform,750ms)]"
              style={{
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                transitionDelay: "712ms",
                transform:
                  shouldReduceMotion || isIntroIn
                    ? "translate3d(0, 0, 0)"
                    : "translate3d(0, 110%, 0)",
              }}
            >
              <HL
                to="/#contact"
                onClick={handleScrollToContact}
                large={true}
                ariaLabel="Contact - Let's talk"
                className="t-cta text-[var(--ink)] min-h-[44px] min-w-[44px] inline-flex items-center"
              >
                {siteContent.hero.cta}
              </HL>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Hero };
