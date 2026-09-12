
import React, { useCallback, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ScrambleText } from "./InteractiveText";

interface OpeningExperienceProps {
  onCtaClick?: () => void;
  loading?: boolean;
}

export default function OpeningExperience({
  onCtaClick,
  loading = false,
}: OpeningExperienceProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [, setIsNameHovered] = useState(false);
  const [isReady, setIsReady] = useState(!loading);

  React.useEffect(() => {
    if (!loading) {
      // Allow PageLoader's exit wipe to begin clearing before staggering the entrance
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      setIsReady(false);
    }
  }, [loading]);

  const handleHeroCta = useCallback(
    (e?: React.MouseEvent | React.KeyboardEvent) => {
      const selection =
        typeof window !== "undefined" ? window.getSelection() : null;
      if (selection && selection.toString().trim().length > 0) {
        return;
      }
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (onCtaClick) {
        onCtaClick();
        return;
      }
      const target = document.getElementById("contact");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [onCtaClick],
  );

  // Explicit hover handlers for RAZAN AZIZIEH title container
  const handleNameMouseEnter = useCallback(() => {
    setIsNameHovered(true);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("cursor-pill-update", {
          detail: { label: "WELCOME TO MY PORTFOLIO", active: true },
        }),
      );
    }
  }, []);

  const handleNameMouseLeave = useCallback(() => {
    setIsNameHovered(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("cursor-pill-update", {
          detail: { label: "LET'S TALK", active: true },
        }),
      );
    }
  }, []);

  return (
    <div
      ref={sectionRef}
      id="html-opening-screen"
      data-hero-section="true"
      data-hero-canvas="true"
      onClick={handleHeroCta}
      aria-label="Editorial Opening"
      className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex-grow flex flex-col justify-center select-text cursor-default relative z-10 py-8 sm:py-12 md:py-16 overflow-x-hidden"
    >
      <div className="w-full flex-grow flex flex-col justify-center select-text">
        {/* Step 1: Main Title "RAZAN AZIZIEH" with ScrambleText on Mount & Hover */}
        <div className="w-full select-text my-auto py-6 sm:py-10 md:py-14">
          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
            }
            animate={
              isReady
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: shouldReduceMotion ? 0 : 18 }
            }
            transition={{
              duration: shouldReduceMotion ? 0.01 : 0.75,
              ease: [0.16, 1, 0.3, 1],
              delay: shouldReduceMotion ? 0 : 0.06,
            }}
            data-hero-name="true"
            data-hero-text="true"
            onMouseEnter={handleNameMouseEnter}
            onMouseLeave={handleNameMouseLeave}
            onClick={(e) => e.stopPropagation()}
            aria-label="Razan Azizieh"
            className="w-full block cursor-text select-text transition-opacity duration-300 hover:opacity-80"
          >
            <ScrambleText
              text="RAZAN AZIZIEH"
              as="h1"
              scrambleOnMount={true}
              scrambleOnHover={true}
              speed={24}
              cycles={2}
              delay={80}
              className="font-display font-light text-[clamp(2.5rem,10.2vw,10.5rem)] tracking-tighter leading-[0.88] block w-full uppercase text-neutral-900 dark:text-white select-text md:whitespace-nowrap break-words"
            />
          </motion.div>

          {/* Sub-Line Grid: Step 2 (Metadata) & Step 3 (Bio Statement) */}
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-12 pt-8 sm:pt-12 items-start select-text">
            {/* Step 2: Academic & Systems Metadata - independent staggered entries */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="col-span-12 md:col-span-5 select-text flex flex-col"
            >
              <motion.p
                initial={
                  shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
                }
                animate={
                  isReady
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: shouldReduceMotion ? 0 : 14 }
                }
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.72,
                  ease: [0.16, 1, 0.3, 1],
                  delay: shouldReduceMotion ? 0 : 0.18,
                }}
                className="font-mono text-xs sm:text-[13px] tracking-[0.16em] uppercase text-neutral-500 dark:text-neutral-400 font-normal select-text will-change-[transform,opacity]"
              >
                MSc Math &amp; CS 
              </motion.p>
              <motion.p
                initial={
                  shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
                }
                animate={
                  isReady
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: shouldReduceMotion ? 0 : 14 }
                }
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.72,
                  ease: [0.16, 1, 0.3, 1],
                  delay: shouldReduceMotion ? 0 : 0.28,
                }}
                className="font-mono text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-1 select-text font-normal will-change-[transform,opacity] leading-relaxed"
              >
                exploring front-end, systems, and what sits between them
              </motion.p>
            </div>

            {/* Step 3: Hero Bio paragraph - independent staggered entry */}
            <motion.div
              initial={
                shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
              }
              animate={
                isReady
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: shouldReduceMotion ? 0 : 16 }
              }
              transition={{
                duration: shouldReduceMotion ? 0.01 : 0.72,
                ease: [0.16, 1, 0.3, 1],
                delay: shouldReduceMotion ? 0 : 0.38,
              }}
              onClick={(e) => e.stopPropagation()}
              className="col-span-12 md:col-span-7 select-text will-change-[transform,opacity]"
            >
              <p className="font-display font-light text-[1.35rem] sm:text-2xl md:text-3xl lg:text-[2.15vw] tracking-[-0.025em] uppercase leading-[1.22] text-neutral-900 dark:text-white select-text max-w-[38ch]">
                FRONT-END DEVELOPER AND CREATIVE CODER WORKING AT THE INTERSECTION OF CODE, INTERACTION, AND DESIGN <span className="text-neutral-400 dark:text-neutral-500 font-normal">&mdash;</span> BUILDING DIGITAL EXPERIENCES WITH STRUCTURAL CLARITY AND TACTILE REFINEMENT.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Step 4: Minimalist Swiss Meta & Scroll Hint - independent entry */}
        <motion.div
          initial={
            shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
          }
          animate={
            isReady
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: shouldReduceMotion ? 0 : 12 }
          }
          transition={{
            duration: shouldReduceMotion ? 0.01 : 0.65,
            ease: [0.16, 1, 0.3, 1],
            delay: shouldReduceMotion ? 0 : 0.50,
          }}
          className="w-full flex items-center justify-between pt-8 font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 font-normal will-change-[transform,opacity]"
        >
          <span className="select-text" onClick={(e) => e.stopPropagation()}>
            PORTFOLIO ’26
          </span>

          {/* Mobile CTA: intentional touch-friendly equivalent using identical orange rectangular language */}
          <div className="md:hidden flex items-center justify-center">
            <button
              type="button"
              id="hero-mobile-cta"
              onClick={handleHeroCta}
              aria-label="Connect with Razan Azizieh"
              className="min-h-[44px] -my-2.5 flex items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF4500] cursor-pointer select-none"
            >
              <span className="inline-flex items-center justify-center px-3 py-1.5 bg-[#FF4500] text-white font-mono text-[11px] font-normal tracking-[0.14em] uppercase leading-none rounded-none active:opacity-80 transition-opacity">
                LET'S TALK
              </span>
            </button>
          </div>

          {/* Desktop CTA text: discoverable, click-enabled editorial instruction */}
          <button
            type="button"
            id="hero-desktop-cta"
            onClick={handleHeroCta}
            aria-label="Connect with Razan Azizieh"
            data-hero-canvas="true"
            className="hidden md:inline-flex items-center tracking-[0.2em] text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:text-[#FF4500]"
          >
            CLICK ANYWHERE TO CONNECT
          </button>

          <span className="tracking-[0.2em] select-text" onClick={(e) => e.stopPropagation()}>
            SCROLL
          </span>
        </motion.div>
      </div>
    </div>
  );
}
