import React, { useState, useEffect, useRef, useMemo, memo } from 'react';
import { motion, AnimatePresence, useReducedMotion, MotionValue } from 'motion/react';
import { EditorialArchetype } from './ProjectCard';
import { RhythmPreset, ImageRhythmProfile } from '../types';
import { getResponsiveImageProps } from '../assets/imageManifest';

export type RhythmFamily = 'monumental' | 'detail' | 'interruption' | 'quiet';

interface ProjectImageSequenceProps {
  images: string[];
  title: string;
  aspectClass: string;
  archetype?: EditorialArchetype;
  scrollYProgress?: MotionValue<number>;
  containerClipPath?: MotionValue<string>;
  containerScale?: MotionValue<number>;
  containerOpacity?: MotionValue<number>;
  mouseParallax?: { x: number; y: number };
  isPriority?: boolean;
  isHeroFeatured?: boolean;
  projectIndex?: number;
  isHovered?: boolean;
  fit?: 'cover' | 'contain';
  rhythm?: RhythmPreset | Partial<ImageRhythmProfile>;
  rhythmFamily?: RhythmFamily;
  className?: string;
  id?: string;
  isInView?: boolean;
}

// Compute deterministic, authored intervals and phase delays for each project
function computeProjectRhythm(keySeed: string, index: number = 0) {
  let hash = 0;
  const str = keySeed || `project-${index}`;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);

  // Authored sequence intervals (between 2.8s and 3.8s) for a deliberate, cinematic pace
  const intervalPatterns = [3000, 3600, 3200, 3800, 2900, 3400, 3100];
  const interval = intervalPatterns[(absHash + index) % intervalPatterns.length];

  // Authored initial phase offset delays (between 700ms and 2300ms) so projects never cycle synchronously
  const phasePatterns = [700, 1600, 1000, 2300, 1300, 1900, 850];
  const initialPhaseDelay = phasePatterns[(absHash + index) % phasePatterns.length];

  return { interval, initialPhaseDelay };
}

export const ProjectImage = memo<ProjectImageSequenceProps>(({
  images,
  title,
  aspectClass,
  archetype,
  containerClipPath,
  containerScale,
  containerOpacity,
  mouseParallax = { x: 0, y: 0 },
  isPriority = false,
  isHeroFeatured = false,
  projectIndex = 0,
  fit = 'cover',
  className = '',
  id,
  isInView,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Self-contained intersection detection with generous root margin if parent doesn't provide isInView
  const [internalInView, setInternalInView] = useState(false);

  useEffect(() => {
    if (isInView !== undefined) return;
    const el = containerRef.current;
    if (!el || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setInternalInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInternalInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '240px 0px 240px 0px', // Pre-activate slightly before entering viewport
        threshold: 0.05,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isInView]);

  const activeInView = isInView !== undefined ? isInView : internalInView;

  // Canonical valid frames: images[0] is strictly ALWAYS the cover
  const frames = useMemo(() => {
    const list = (images || []).filter(Boolean);
    const unique = Array.from(new Set(list));
    return unique.length > 0 ? unique : [''];
  }, [images]);

  const [activeFrameIndex, setActiveFrameIndex] = useState<number>(0);
  const totalFrames = frames.length;

  // Compute project-specific authored timing parameters
  const { interval, initialPhaseDelay } = useMemo(() => {
    return computeProjectRhythm(id || title, projectIndex);
  }, [id, title, projectIndex]);

  // Track preloaded frames to avoid redundant network requests
  const preloadedFramesRef = useRef<Set<number>>(new Set([0]));

  // Preload the next sequence image JUST-IN-TIME (only when card is in view and has multiple frames)
  useEffect(() => {
    if (!activeInView || totalFrames <= 1 || shouldReduceMotion) return;

    const nextIndex = (activeFrameIndex + 1) % totalFrames;
    if (!preloadedFramesRef.current.has(nextIndex)) {
      preloadedFramesRef.current.add(nextIndex);
      const nextUrl = frames[nextIndex];
      if (nextUrl) {
        const responsive = getResponsiveImageProps(nextUrl, archetype, isHeroFeatured);
        const img = new Image();
        if (responsive.webpSrcSet) {
          img.srcset = responsive.webpSrcSet;
          img.sizes = responsive.sizes;
        } else if (responsive.srcSet) {
          img.srcset = responsive.srcSet;
          img.sizes = responsive.sizes;
        }
        img.src = responsive.src;
      }
    }
  }, [activeInView, activeFrameIndex, totalFrames, frames, archetype, isHeroFeatured, shouldReduceMotion]);

  // Reset to canonical cover whenever the frames array changes (e.g. on filter change)
  useEffect(() => {
    setActiveFrameIndex(0);
    preloadedFramesRef.current = new Set([0]);
  }, [frames]);

  // Autonomous continuous sequence progression ONLY while active in view
  useEffect(() => {
    // If only one frame, reduced motion, or card is off-screen: pause rotation
    if (totalFrames <= 1 || shouldReduceMotion || !activeInView) {
      return;
    }

    let intervalId: ReturnType<typeof setInterval> | null = null;
    let initialTimeoutId: ReturnType<typeof setTimeout> | null = null;

    // Start with authored phase delay so projects don't all cycle synchronously
    initialTimeoutId = setTimeout(() => {
      setActiveFrameIndex((prev) => (prev + 1) % totalFrames);

      // Subsequent transitions follow the project's distinct steady interval
      intervalId = setInterval(() => {
        setActiveFrameIndex((prev) => (prev + 1) % totalFrames);
      }, interval);
    }, initialPhaseDelay);

    return () => {
      if (initialTimeoutId) clearTimeout(initialTimeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [totalFrames, shouldReduceMotion, activeInView, interval, initialPhaseDelay]);

  // Render a responsive, modern WebP picture element with layout stability
  const renderResponsivePicture = (frameUrl: string, frameIndex: number) => {
    const isCover = frameIndex === 0;
    const isEager = isPriority && isCover;
    const responsive = getResponsiveImageProps(frameUrl, archetype, isHeroFeatured);

    return (
      <picture className="w-full h-full block pointer-events-none select-none">
        {responsive.webpSrcSet && (
          <source
            type="image/webp"
            srcSet={responsive.webpSrcSet}
            sizes={responsive.sizes}
          />
        )}
        {responsive.srcSet && (
          <source
            srcSet={responsive.srcSet}
            sizes={responsive.sizes}
          />
        )}
        <img
          src={responsive.src}
          alt={isCover ? `${title} - Specimen` : `${title} - Specimen Frame ${frameIndex + 1}`}
          loading={isEager ? 'eager' : 'lazy'}
          fetchPriority={isEager ? 'high' : 'auto'}
          decoding="async"
          className={`w-full h-full ${
            fit === 'contain' ? 'object-contain object-center' : 'object-cover object-top'
          } block select-none`}
          referrerPolicy="no-referrer"
        />
      </picture>
    );
  };

  return (
    <motion.div
      ref={containerRef}
      style={{
        ...(containerClipPath ? { clipPath: containerClipPath } : {}),
        ...(containerScale ? { scale: containerScale } : {}),
        ...(containerOpacity ? { opacity: containerOpacity } : {}),
      }}
      className={`relative w-full ${aspectClass} bg-neutral-100 dark:bg-neutral-900/60 overflow-hidden select-none will-change-[transform,clip-path,opacity] ${className}`}
    >
      {/* For single frame or reduced motion: Render static canonical cover */}
      {totalFrames <= 1 || shouldReduceMotion ? (
        <div className="w-full h-full absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div
            className="w-full h-full"
            style={{
              transform: `translate3d(${mouseParallax.x}px, ${mouseParallax.y}px, 0)`,
            }}
          >
            {renderResponsivePicture(frames[0], 0)}
          </div>
        </div>
      ) : (
        /* Autonomous continuous multi-frame sequence with calm, continuous crossfade dissolution */
        <div className="w-full h-full absolute inset-0 overflow-hidden pointer-events-none z-0">
          <AnimatePresence initial={false} mode="sync">
            <motion.div
              key={`${frames[activeFrameIndex]}-${activeFrameIndex}`}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] },
              }}
              transition={{
                duration: 1.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-0 w-full h-full will-change-[opacity]"
              style={{
                transform: `translate3d(${mouseParallax.x}px, ${mouseParallax.y}px, 0)`,
              }}
            >
              {renderResponsivePicture(frames[activeFrameIndex], activeFrameIndex)}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
});

ProjectImage.displayName = 'ProjectImage';
