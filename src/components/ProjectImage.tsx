import React, { useEffect, useState, useRef, useMemo, memo } from "react";
import { motion, MotionValue, useReducedMotion } from "motion/react";
import { EditorialArchetype } from "./ProjectCard";

interface ProjectImageSequenceProps {
  images: string[];
  title: string;
  aspectClass: string;
  archetype: EditorialArchetype;
  scrollYProgress?: MotionValue<number>;
  containerClipPath?: MotionValue<string>;
  mouseParallax?: { x: number; y: number };
  isPriority?: boolean;
  projectIndex?: number;
  isHovered?: boolean;
  className?: string;
}

export const ProjectImage = memo<ProjectImageSequenceProps>(
  ({
    images,
    title,
    aspectClass,
    archetype: _archetype,
    scrollYProgress: _scrollYProgress,
    containerClipPath,
    mouseParallax = { x: 0, y: 0 },
    isPriority = false,
    projectIndex = 0,
    isHovered: _isHovered = false,
    className = "",
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();
    const [activeFrameIndex, setActiveFrameIndex] = useState(0);
    const [isInView, setIsInView] = useState(false);

    // Deduplicate and filter valid image URLs (First frame is always the primary cover)
    const validFrames = useMemo(() => {
      const unique = Array.from(new Set(images.filter(Boolean)));
      return unique.length > 0 ? unique : [""];
    }, [images]);

    // Viewport intersection observer to ensure autonomous cycling runs ONLY when in or near viewport
    useEffect(() => {
      const el = containerRef.current;
      if (!el || typeof IntersectionObserver === "undefined") {
        setIsInView(true);
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting);
        },
        {
          rootMargin: "160px 0px 160px 0px",
          threshold: 0.05,
        },
      );

      observer.observe(el);
      return () => observer.disconnect();
    }, []);

    // Preload secondary and tertiary frames for flicker-free, instant transitions
    useEffect(() => {
      if (typeof window === "undefined" || validFrames.length <= 1) return;
      validFrames.slice(1).forEach((src) => {
        if (!src) return;
        const img = new Image();
        img.src = src;
      });
    }, [validFrames]);

    // Reset to cover frame whenever project or valid frames change
    useEffect(() => {
      setActiveFrameIndex(0);
    }, [validFrames]);

    // Dynamic Kinetic Slideshow Rotation Timer: 2.8s Interval
    useEffect(() => {
      if (shouldReduceMotion || validFrames.length <= 1 || !isInView) {
        return;
      }

      // Exact 2.8s interval for lively, responsive rotation
      const intervalDuration = 2800;
      // Stagger initial cycle start across projects so cards don't jump simultaneously
      const initialDelay = 500 + ((projectIndex * 350) % 1000);

      let intervalId: NodeJS.Timeout | null = null;

      const timeoutId = setTimeout(() => {
        setActiveFrameIndex((prev) => (prev + 1) % validFrames.length);
        intervalId = setInterval(() => {
          setActiveFrameIndex((prev) => (prev + 1) % validFrames.length);
        }, intervalDuration);
      }, initialDelay);

      return () => {
        clearTimeout(timeoutId);
        if (intervalId) clearInterval(intervalId);
      };
    }, [isInView, shouldReduceMotion, validFrames.length, projectIndex]);

    return (
      <motion.div
        ref={containerRef}
        style={containerClipPath ? { clipPath: containerClipPath } : undefined}
        className={`relative w-full ${aspectClass} bg-neutral-100 dark:bg-neutral-900/60 overflow-hidden select-none will-change-transform ${className}`}
      >
        {/* Slideshow image layers with smooth cross-fade easing and strict object-cover fit */}
        {validFrames.map((src, idx) => {
          const isActive = idx === activeFrameIndex;
          return (
            <div
              key={`${src}-${idx}`}
              className="w-full h-full absolute inset-0 overflow-hidden pointer-events-none"
              style={{
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 2 : 1,
                transform: `translate3d(${mouseParallax.x}px, ${mouseParallax.y}px, 0)`,
                transition:
                  "opacity 650ms cubic-bezier(0.16, 1, 0.3, 1), transform 280ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              aria-hidden={!isActive}
            >
              <img
                src={src}
                alt={
                  idx === 0
                    ? `${title} - Primary Frame`
                    : `${title} - Detail Specimen ${idx}`
                }
                loading={isPriority && idx === 0 ? "eager" : "lazy"}
                fetchPriority={isPriority && idx === 0 ? "high" : "auto"}
                decoding="async"
                className="w-full h-full object-cover object-center block select-none transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                referrerPolicy="no-referrer"
              />
            </div>
          );
        })}

        {/* Frame indicator dots when multiple images exist */}
        {validFrames.length > 1 && (
          <div className="absolute bottom-3 left-3.5 z-10 flex items-center gap-1.5 pointer-events-none">
            {validFrames.map((_, idx) => (
              <span
                key={idx}
                className={`h-1 transition-all duration-300 ease-out rounded-full ${
                  idx === activeFrameIndex
                    ? "w-4 bg-white shadow-sm"
                    : "w-1 bg-white/40"
                }`}
              />
            ))}
          </div>
        )}

        {/* Refined typography hover label: VIEW PROJECT ↗ */}
        <div className="absolute bottom-3.5 right-3.5 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300 ease-out">
          <span className="font-mono text-xs tracking-widest uppercase px-3 py-1.5 bg-neutral-950/85 dark:bg-neutral-900/90 text-white backdrop-blur-md border border-white/15 shadow-sm inline-flex items-center gap-1.5">
            VIEW
          </span>
        </div>
      </motion.div>
    );
  },
);

ProjectImage.displayName = "ProjectImage";
