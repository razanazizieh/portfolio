/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect, useState, useCallback, useLayoutEffect } from "react";
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
 * - Desktop pointer weight effect starts 700ms after app:ready
 * - Touch devices (hover: none and pointer: coarse): traveling weight wave (450 + 200 * sin(2π*(t/5.5s) - i*0.42))
 *   starts 700ms after app:ready, capped at 30 fps, updates font-variation-settings when delta > 4.
 *   Touch interaction on top: letters within 120px receive up to +180 weight (smoothed), then ease back.
 * - Headline fit: computed so widest line fits container at wght 650; re-measured on resize and fonts.ready.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const measureLine1Ref = useRef<HTMLSpanElement>(null);
  const measureLine2Ref = useRef<HTMLSpanElement>(null);

  const shouldReduceMotion = useReducedMotion();
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [touchWaveStarted, setTouchWaveStarted] = useState(false);
  const [headlineFontSize, setHeadlineFontSize] = useState<number | null>(null);

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

  // Desktop springs state
  const currentWeights = useRef<Float32Array>(new Float32Array(totalLetters).fill(100));
  const targetWeights = useRef<Float32Array>(new Float32Array(totalLetters).fill(250));
  const velocities = useRef<Float32Array>(new Float32Array(totalLetters).fill(0));
  const prevAppliedWeights = useRef<Float32Array>(new Float32Array(totalLetters).fill(-1));
  const lastTimeRef = useRef<number>(performance.now());
  const rafIdRef = useRef<number | null>(null);

  // Touch device wave & interaction state
  const touchBoostsRef = useRef<Float32Array>(new Float32Array(totalLetters).fill(0));
  const touchPointRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  const isPointerInsideRef = useRef(false);
  const isHeroOnScreenRef = useRef(true);

  // Detect touch devices via media query (hover: none) and (pointer: coarse)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: none) and (pointer: coarse)");
    setIsTouchDevice(mq.matches);

    const onMqChange = (e: MediaQueryListEvent) => {
      setIsTouchDevice(e.matches);
    };
    mq.addEventListener("change", onMqChange);

    // Track on-screen status with IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        isHeroOnScreenRef.current = entry.isIntersecting;
        if (!entry.isIntersecting) {
          if (rafIdRef.current !== null) {
            cancelAnimationFrame(rafIdRef.current);
            rafIdRef.current = null;
          }
        }
        window.dispatchEvent(new CustomEvent("hero:screen-visibility"));
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      mq.removeEventListener("change", onMqChange);
      observer.disconnect();
    };
  }, []);

  // Compute headline font-size so widest line fits container at wght 650
  const calculateHeadlineFit = useCallback(() => {
    if (typeof window === "undefined") return;
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

    // m1 and m2 are measured at font-size 100px and wght 650
    // Ideal font-size for widest line to fit available width at wght 650:
    let fitSize = Math.floor(((100 * available) / maxTestWidth) * 0.98 * 10) / 10;

    // On desktop, cap at default display clamp values so resting desktop layout is identical
    const isDesktopView = window.innerWidth >= 768;
    if (isDesktopView) {
      const maxVw = (17.5 / 100) * window.innerWidth;
      const maxSvh = (31 / 100) * (window.innerHeight || 800);
      const maxRem = 21 * 16;
      const desktopCap = Math.min(maxVw, maxSvh, maxRem);
      fitSize = Math.min(fitSize, desktopCap);
    }

    setHeadlineFontSize(fitSize);
  }, []);

  useLayoutEffect(() => {
    calculateHeadlineFit();
  }, [calculateHeadlineFit]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    calculateHeadlineFit();

    const r1 = requestAnimationFrame(() => {
      const r2 = requestAnimationFrame(() => {
        calculateHeadlineFit();
      });
      return () => cancelAnimationFrame(r2);
    });

    let ro: ResizeObserver | null = null;
    if (containerRef.current && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(calculateHeadlineFit);
      ro.observe(containerRef.current);
    }

    if (document.fonts) {
      if (document.fonts.ready) {
        document.fonts.ready.then(calculateHeadlineFit).catch(() => {});
      }
      document.fonts.addEventListener("loadingdone", calculateHeadlineFit);
    }

    window.addEventListener("resize", calculateHeadlineFit, { passive: true });

    return () => {
      cancelAnimationFrame(r1);
      ro?.disconnect();
      if (document.fonts) {
        document.fonts.removeEventListener("loadingdone", calculateHeadlineFit);
      }
      window.removeEventListener("resize", calculateHeadlineFit);
    };
  }, [calculateHeadlineFit]);

  // Reduced motion handling
  useEffect(() => {
    if (shouldReduceMotion) {
      letterRefs.current.forEach((span) => {
        if (!span) return;
        span.style.fontWeight = "300";
        span.style.fontVariationSettings = "'wght' 300";
      });
    }
  }, [shouldReduceMotion]);

  // App ready listener: starts effects 700ms after app:ready
  useEffect(() => {
    if (shouldReduceMotion) {
      setIsIntroIn(true);
      setCanHover(true);
      return;
    }

    let readyTimer: ReturnType<typeof setTimeout> | null = null;

    const startReadySequences = () => {
      setIsIntroIn(true);
      targetWeights.current.fill(250);

      readyTimer = setTimeout(() => {
        setCanHover(true);
        setTouchWaveStarted(true);
      }, 700);
    };

    const winReady = window as unknown as { __appReady?: boolean };
    if (winReady.__appReady) {
      startReadySequences();
    } else {
      const onAppReady = () => {
        startReadySequences();
      };
      window.addEventListener("app:ready", onAppReady, { once: true });
      return () => {
        window.removeEventListener("app:ready", onAppReady);
        if (readyTimer) clearTimeout(readyTimer);
      };
    }

    return () => {
      if (readyTimer) clearTimeout(readyTimer);
    };
  }, [shouldReduceMotion]);

  // 1. TOUCH DEVICES: Continuous traveling weight wave + touch interaction on top
  useEffect(() => {
    if (!isTouchDevice || shouldReduceMotion || !touchWaveStarted) return;

    let touchRafId: number | null = null;
    let lastFrameTime = 0;

    const animateWave = (time: number) => {
      if (!isHeroOnScreenRef.current || document.visibilityState !== "visible") {
        touchRafId = null;
        return;
      }

      // Capped at 30 fps (~32ms)
      const elapsed = time - lastFrameTime;
      if (elapsed < 32) {
        touchRafId = requestAnimationFrame(animateWave);
        return;
      }
      lastFrameTime = time;

      const tSec = time / 1000;
      const touch = touchPointRef.current;

      for (let i = 0; i < totalLetters; i++) {
        // Continuous traveling weight wave: wght = 450 + 200 * sin(2π * (t / 5.5s) - i * 0.42)
        const waveWght = 450 + 200 * Math.sin((2 * Math.PI * tSec) / 5.5 - i * 0.42);

        // Touch interaction on top of wave: letters within 120px receive up to +180 weight
        let targetBoost = 0;
        if (touch.active) {
          const span = letterRefs.current[i];
          if (span) {
            const rect = span.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dist = Math.hypot(touch.x - cx, touch.y - cy);
            if (dist < 120) {
              targetBoost = 180 * (1 - dist / 120);
            }
          }
        }

        // Smoothed touch boost, easing back when finger lifts
        touchBoostsRef.current[i] += (targetBoost - touchBoostsRef.current[i]) * 0.22;
        if (Math.abs(touchBoostsRef.current[i] - targetBoost) < 0.2) {
          touchBoostsRef.current[i] = targetBoost;
        }

        const totalWght = Math.round(waveWght + touchBoostsRef.current[i]);

        // Update font-variation-settings only for letters whose value changed by more than 4
        if (Math.abs(totalWght - prevAppliedWeights.current[i]) > 4) {
          const span = letterRefs.current[i];
          if (span) {
            span.style.fontVariationSettings = `'wght' ${totalWght}`;
            span.style.fontWeight = totalWght.toString();
          }
          prevAppliedWeights.current[i] = totalWght;
        }
      }

      touchRafId = requestAnimationFrame(animateWave);
    };

    const startWaveLoop = () => {
      if (touchRafId === null && isHeroOnScreenRef.current && document.visibilityState === "visible") {
        lastFrameTime = performance.now();
        touchRafId = requestAnimationFrame(animateWave);
      }
    };

    const stopWaveLoop = () => {
      if (touchRafId !== null) {
        cancelAnimationFrame(touchRafId);
        touchRafId = null;
      }
    };

    startWaveLoop();

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        startWaveLoop();
      } else {
        stopWaveLoop();
      }
    };

    const handleScreenVisibility = () => {
      if (isHeroOnScreenRef.current) {
        startWaveLoop();
      } else {
        stopWaveLoop();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("hero:screen-visibility", handleScreenVisibility);

    return () => {
      stopWaveLoop();
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("hero:screen-visibility", handleScreenVisibility);
    };
  }, [isTouchDevice, shouldReduceMotion, touchWaveStarted, totalLetters]);

  // Touch event listeners for touch interaction on top of wave
  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    if (!isTouchDevice || shouldReduceMotion) return;
    const touch = e.touches[0];
    if (touch) {
      touchPointRef.current = { x: touch.clientX, y: touch.clientY, active: true };
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLElement>) => {
    if (!isTouchDevice || shouldReduceMotion) return;
    const touch = e.touches[0];
    if (touch) {
      touchPointRef.current = { x: touch.clientX, y: touch.clientY, active: true };
    }
  };

  const handleTouchEnd = () => {
    touchPointRef.current.active = false;
  };

  // 2. DESKTOP AND MOUSE DEVICES: Existing spring physics pointer weight effect (UNCHANGED)
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
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      style={{
        backgroundColor: "#F5F4F0",
        touchAction: "pan-y",
        ...(isMobile
          ? {
              height: "auto",
              minHeight: "auto",
              maxHeight: "none",
              paddingTop: "96px",
              paddingBottom: "56px",
            }
          : {
              height: "100svh",
              minHeight: "100svh",
              maxHeight: "100svh",
              paddingTop: "clamp(48px, 6svh, 80px)",
              paddingBottom: "clamp(24px, 3.5svh, 40px)",
            }),
      }}
      className="w-full bg-[#F5F4F0] px-6 md:px-12 flex flex-col justify-between overflow-hidden"
    >
      {/* Hidden offscreen reference measuring element for headline fit at wght 650 */}
      <div
        aria-hidden="true"
        className="fixed -left-[9999px] -top-[9999px] pointer-events-none invisible whitespace-nowrap"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "100px",
          fontWeight: 650,
          fontVariationSettings: "'wght' 650",
          letterSpacing: "-0.05em",
          lineHeight: 0.86,
        }}
      >
        <span ref={measureLine1Ref} className="inline-block whitespace-nowrap">
          {line1Text}
        </span>
        <span ref={measureLine2Ref} className="inline-block whitespace-nowrap">
          {line2Text}
        </span>
      </div>

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

          <div style={{ height: isMobile ? "24px" : "clamp(20px, 3svh, 40px)" }} aria-hidden="true" className="flex-shrink-0" />

          {/* Row 2: Headline on two lines */}
          <div className="w-full block my-auto">
            <div
              aria-hidden="true"
              className="t-display text-[var(--ink)] block w-full"
              style={{
                fontSize: headlineFontSize ? `${headlineFontSize}px` : undefined,
                lineHeight: 0.86,
                letterSpacing: "-0.05em",
              }}
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
                      className="inline-block select-none"
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
                        className="inline-block select-none"
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

        <div style={{ height: isMobile ? "32px" : "max(48px, 5svh)" }} aria-hidden="true" className="flex-shrink-0" />

        {/* Row 3: bottom row */}
        <div
          className="w-full grid grid-cols-1 md:grid-cols-12 items-baseline flex-shrink-0"
          style={{ gap: isMobile ? "24px" : "32px" }}
        >
          {/* Left (cols 1-6): sentence words, clamp(1.0625rem, 1.3vw, 1.25rem), weight 340, color var(--ink) */}
          <div className="md:col-span-6">
            <p
              className="text-[var(--ink)] [text-wrap:balance]"
              style={{
                fontSize: "clamp(1.0625rem, 1.3vw, 1.25rem)",
                fontWeight: 340,
                fontVariationSettings: "'wght' 340",
                lineHeight: 1.4,
                maxWidth: "30ch",
                textWrap: "balance",
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
