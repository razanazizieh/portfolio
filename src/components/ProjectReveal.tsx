import React, { useRef, useState, useEffect, useMemo, memo } from 'react';
import { motion, Variants, useInView, useReducedMotion } from 'motion/react';
import { PROJECTS_DATA } from '../data';
import { EditorialArchetype } from './ProjectCard';
import { ProjectImage } from './ProjectImage';
import { ProjectMeta } from './ProjectMeta';
import {
  RevealVariant,
  ProjectMotionConfig,
  ProjectSceneStyles,
  getRevealVariant,
  computeProjectMotionConfig,
} from '../hooks/useProjectReveal';

export type { RevealVariant, ProjectMotionConfig };
export { getRevealVariant };

// Structured Layout Reveal Variants
// Sequence logic:
// 1. IMAGE: Enters from outside with spatial trajectory (x/y/scale/clip-path), glides into position, and settles first (0.0s -> ~0.74s)
// 2. TITLE: Staggers into view strictly AFTER image has settled (delay ~0.74s), unmasking from behind a clean baseline clip-path
// 3. META: Staggers into view strictly AFTER title has unmasked (delay ~0.94s) with crisp typographic alignment
// 4. OVERVIEW: Staggers into position completing the composition (delay ~1.14s)
// Absolutely no element is visible before its predecessor in the timeline.

const getImageVariants = (
  shouldReduceMotion: boolean,
  isMobile: boolean,
  _archetype?: EditorialArchetype
): Variants => {
  if (shouldReduceMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.01 } },
    };
  }

  const startY = isMobile ? 12 : 18;
  const startScale = isMobile ? 1.02 : 1.03;
  const startClip = isMobile ? 'inset(4% 0% 0% 0%)' : 'inset(6% 0% 0% 0%)';

  return {
    hidden: {
      clipPath: startClip,
      scale: startScale,
      x: 0,
      y: startY,
      opacity: 0,
    },
    visible: {
      clipPath: 'inset(0% 0% 0% 0%)',
      scale: 1,
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: isMobile ? 0.65 : 0.72,
        ease: [0.16, 1, 0.3, 1], // Editorial luxury deceleration curve
      },
    },
  };
};

const getSecondaryImageVariants = (
  shouldReduceMotion: boolean,
  isMobile: boolean
): Variants => {
  if (shouldReduceMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.01 } },
    };
  }

  const startY = isMobile ? 12 : 18;
  const startScale = isMobile ? 1.02 : 1.03;
  const startClip = isMobile ? 'inset(4% 0% 0% 0%)' : 'inset(6% 0% 0% 0%)';
  const delay = isMobile ? 0.18 : 0.24;

  return {
    hidden: {
      clipPath: startClip,
      scale: startScale,
      x: 0,
      y: startY,
      opacity: 0,
    },
    visible: {
      clipPath: 'inset(0% 0% 0% 0%)',
      scale: 1,
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        delay,
        duration: isMobile ? 0.65 : 0.72,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };
};

const getTitleVariants = (shouldReduceMotion: boolean, isMobile: boolean): Variants => {
  if (shouldReduceMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.01 } },
    };
  }
  // Title resolves crisply and decisively after image begins establishing
  const delay = isMobile ? 0.14 : 0.18;

  return {
    hidden: {
      clipPath: 'inset(0% 0% 100% 0%)',
      y: isMobile ? 14 : 18,
      opacity: 0,
    },
    visible: {
      clipPath: 'inset(0% 0% 0% 0%)',
      y: 0,
      opacity: 1,
      transition: {
        delay,
        duration: 0.48,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };
};

const getMetaVariants = (shouldReduceMotion: boolean, isMobile: boolean): Variants => {
  if (shouldReduceMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.01 } },
    };
  }
  // Metadata starts strictly after the title
  const delay = isMobile ? 0.22 : 0.28;

  return {
    hidden: {
      clipPath: 'inset(0% 0% 100% 0%)',
      y: isMobile ? 10 : 14,
      opacity: 0,
    },
    visible: {
      clipPath: 'inset(0% 0% 0% 0%)',
      y: 0,
      opacity: 1,
      transition: {
        delay,
        duration: 0.44,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };
};

const getDescriptionVariants = (shouldReduceMotion: boolean, isMobile: boolean): Variants => {
  if (shouldReduceMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.01 } },
    };
  }
  // Description follows metadata smoothly
  const delay = isMobile ? 0.30 : 0.38;

  return {
    hidden: {
      clipPath: 'inset(0% 0% 100% 0%)',
      y: isMobile ? 12 : 16,
      opacity: 0,
    },
    visible: {
      clipPath: 'inset(0% 0% 0% 0%)',
      y: 0,
      opacity: 1,
      transition: {
        delay,
        duration: 0.48,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };
};

export interface ProjectRevealProps {
  index: number;
  project: typeof PROJECTS_DATA[0];
  archetype: EditorialArchetype;
  frames: string[];
  isPriority?: boolean;
  isHeroFeatured?: boolean;
  mouseParallax?: { x: number; y: number };
  activeFilter?: string;
  projectNumber: string;
  isRevealed?: boolean;
  revealVariant?: RevealVariant;
  motionConfig?: ProjectMotionConfig;
  scrollProgress?: number;
  sceneStyles?: ProjectSceneStyles;
}

export const ProjectReveal = memo<ProjectRevealProps>(({
  index,
  project,
  archetype,
  frames,
  isPriority = false,
  isHeroFeatured = false,
  mouseParallax = { x: 0, y: 0 },
  projectNumber,
  isRevealed: isRevealedProp,
  revealVariant: revealVariantProp,
  motionConfig: motionConfigProp,
  sceneStyles,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Device awareness to scale lateral spatial amplitude safely on touch devices
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(max-width: 767px)');
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    if (mql.addEventListener) {
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    }
  }, []);

  // Internal in-view fallback if isRevealed is not provided
  const internalInView = useInView(containerRef, {
    once: true,
    amount: 0.12,
    margin: '0px 0px -80px 0px',
  });

  // Isolated trigger mapped to parent card's lifecycle or internal fallback
  const isInView = isRevealedProp !== undefined ? isRevealedProp : internalInView;

  // Resolve reveal variant and unified motion configuration
  const resolvedVariant = revealVariantProp || getRevealVariant(index, archetype);

  // Resolved structured layout reveal variants
  const imageVariants = useMemo(
    () => getImageVariants(shouldReduceMotion, isMobile, archetype),
    [shouldReduceMotion, isMobile, archetype]
  );
  const secondaryImageVariants = useMemo(
    () => getSecondaryImageVariants(shouldReduceMotion, isMobile),
    [shouldReduceMotion, isMobile]
  );
  const titleVariants = useMemo(
    () => getTitleVariants(shouldReduceMotion, isMobile),
    [shouldReduceMotion, isMobile]
  );
  const metaVariants = useMemo(
    () => getMetaVariants(shouldReduceMotion, isMobile),
    [shouldReduceMotion, isMobile]
  );
  const descriptionVariants = useMemo(
    () => getDescriptionVariants(shouldReduceMotion, isMobile),
    [shouldReduceMotion, isMobile]
  );

  // Helper renderers for typography blocks enforcing strict choreography sequence:
  // 1. IMAGE ARRIVES & SETTLES INTO POSITION FIRST (from outside)
  // 2. TITLE APPEARS
  // 3. METADATA APPEARS
  // 4. OVERVIEW / DESCRIPTION APPEARS
  const renderTitle = (customClasses = '') => (
    <motion.div variants={titleVariants} className="w-full overflow-hidden will-change-[transform,clip-path,opacity]">
      <h3
        className={`font-display font-light tracking-tighter text-neutral-900 dark:text-white uppercase transition-opacity duration-300 group-hover:opacity-75 ${customClasses}`}
      >
        <span className="inline-block">
          {project.title}
        </span>
      </h3>
    </motion.div>
  );

  const renderIdentity = () => (
    <motion.div
      variants={metaVariants}
      className="flex items-center gap-2 mt-2 mb-2 sm:mb-2.5 overflow-hidden will-change-[transform,clip-path,opacity]"
    >
      <ProjectMeta index={projectNumber} category={project.category} year={project.year} />
    </motion.div>
  );

  const renderOverview = (customClasses = '') => (
    <motion.div variants={descriptionVariants} className="w-full overflow-hidden will-change-[transform,clip-path,opacity]">
      <p
        className={`font-sans font-light text-neutral-700 dark:text-neutral-300 ${customClasses}`}
      >
        {project.overview}
      </p>
    </motion.div>
  );

  // Helper renderer for image block
  const renderImageBlock = (aspectClass: string, isFullBleed = false) => {
    const imageElement = (
      <motion.div
        variants={imageVariants}
        className="w-full will-change-[transform,clip-path,opacity]"
      >
        <ProjectImage
          id={project.id}
          images={frames}
          title={project.title}
          aspectClass={aspectClass}
          archetype={archetype}
          mouseParallax={mouseParallax}
          isPriority={isPriority}
          isHeroFeatured={isHeroFeatured || (isPriority && index === 0)}
          projectIndex={index}
          fit={project.fit}
          rhythm={project.rhythm}
          isInView={isInView}
        />
      </motion.div>
    );

    if (isFullBleed) {
      return (
        <div className="w-screen max-w-[100vw] relative left-1/2 -translate-x-1/2 overflow-hidden">
          {imageElement}
        </div>
      );
    }

    return <div className="w-full overflow-visible">{imageElement}</div>;
  };

  // Helper renderer for secondary image module
  const renderSecondaryImageBlock = (imgSrc: string, aspectClass: string) => {
    return (
      <motion.div
        variants={secondaryImageVariants}
        className="w-full will-change-[transform,clip-path,opacity]"
      >
        <ProjectImage
          id={`${project.id}-sec`}
          images={[imgSrc]}
          title={`${project.title} Detail`}
          aspectClass={aspectClass}
          archetype={archetype}
          mouseParallax={mouseParallax}
          isPriority={false}
          isHeroFeatured={false}
          projectIndex={index + 10}
          fit={project.fit}
          rhythm={project.rhythm}
          isInView={isInView}
        />
      </motion.div>
    );
  };

  // =========================================================================
  // RENDER COMPOSITION BY ARCHETYPE (AUTHORED EDITORIAL MODULAR GRID)
  // No two consecutive projects share the same visual geometry.
  // Alternates between: Image Module, Title Module, Meta Module, Description Module, Empty Module
  // Sequence preserved: Image -> Title -> Meta -> Overview
  // =========================================================================
  const renderComposition = () => {
    switch (archetype) {
      // 1. Cinematic Anchor (Project 01): Full-Bleed 100vw Cover Image + Asymmetric 12-Col Modules Below
      case 'cinematic-anchor':
        return (
          <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 w-full">
            {renderImageBlock(
              'aspect-[16/9] sm:aspect-[21/9] md:aspect-[2.35/1] lg:aspect-[2.4/1]',
              true
            )}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-x-8 items-start text-left w-full">
              <div className="md:col-span-5 lg:col-span-5 flex flex-col justify-start">
                {renderTitle('text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] leading-[1.06]')}
                {renderIdentity()}
              </div>
              <div className="hidden md:block md:col-span-1" aria-hidden="true" />
              <div className="md:col-span-6 lg:col-span-6 flex flex-col justify-start">
                {renderOverview('text-sm sm:text-base leading-[1.7] max-w-[50ch]')}
              </div>
            </div>
          </div>
        );

      // 2. Compact Staggered Left (Project 02): Top Offset Text Bar (Cols 4-12) over Left-Anchored Image (Cols 1-8)
      case 'compact-staggered-left':
        return (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-y-8 md:gap-x-8 items-start w-full text-left">
            <div className="hidden md:block md:col-span-3" aria-hidden="true" />
            <div className="col-span-12 md:col-span-5 flex flex-col justify-start">
              {renderTitle('text-xl sm:text-2xl md:text-[1.85rem] leading-[1.1]')}
              {renderIdentity()}
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col justify-start md:pt-1">
              {renderOverview('text-sm sm:text-[15px] leading-[1.68] max-w-[42ch]')}
            </div>
            <div className="col-span-12 md:col-span-8 overflow-visible">
              {renderImageBlock('aspect-[16/10] sm:aspect-[16/9]')}
            </div>
            <div className="hidden md:block md:col-span-4" aria-hidden="true" />
          </div>
        );

      // 3. Tall Staggered Right (Project 03): Two Image Modules Paired with Compact Information Block
      case 'tall-staggered-right': {
        const secondaryImage = project.images && project.images.length > 1 ? project.images[1] : project.image;
        return (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-8 lg:gap-x-10 items-start w-full text-left">
            <div className="col-span-12 md:col-span-6 overflow-visible">
              {renderImageBlock('aspect-[4/3] sm:aspect-[1/1] md:aspect-[4/3]')}
            </div>
            <div className="hidden md:block md:col-span-1" aria-hidden="true" />
            <div className="col-span-12 md:col-span-5 flex flex-col justify-between h-full gap-6 sm:gap-8">
              <div className="flex flex-col">
                {renderTitle('text-xl sm:text-2xl lg:text-[1.85rem] leading-[1.08]')}
                {renderIdentity()}
                {renderOverview('text-sm sm:text-[15px] leading-[1.68] max-w-[42ch] mt-2')}
              </div>
              <div className="w-full mt-2 sm:mt-4 overflow-hidden">
                {renderSecondaryImageBlock(secondaryImage, 'aspect-[16/10]')}
              </div>
            </div>
          </div>
        );
      }

      // 4. Split Editorial (Project 04): Left Typography Block + Wide Right-Anchored Image (7 cols)
      case 'split-editorial':
        return (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-8 lg:gap-x-12 items-start w-full text-left">
            <div className="col-span-12 md:col-span-4 flex flex-col justify-start pt-1 md:pt-2">
              {renderTitle('text-xl sm:text-2xl lg:text-[1.95rem] leading-[1.08]')}
              {renderIdentity()}
              {renderOverview('text-sm sm:text-[15px] md:text-base leading-[1.68] max-w-[36ch] mt-3 sm:mt-4')}
            </div>
            <div className="hidden md:block md:col-span-1" aria-hidden="true" />
            <div className="col-span-12 md:col-span-7 overflow-visible">
              {renderImageBlock('aspect-[16/10] md:aspect-[16/10]')}
            </div>
          </div>
        );

      // 5. Full Bleed Moment: Secondary Break-Out Image
      case 'full-bleed-moment':
        return (
          <div className="w-full flex flex-col gap-6 sm:gap-8">
            {renderImageBlock('aspect-[24/10] sm:aspect-[21/9]', true)}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-x-8 lg:gap-x-12 items-start text-left w-full">
              <div className="md:col-span-5 lg:col-span-5 flex flex-col">
                {renderTitle('text-xl sm:text-2xl md:text-3xl lg:text-[2.15rem] leading-[1.08]')}
                {renderIdentity()}
              </div>
              <div className="hidden md:block md:col-span-1" aria-hidden="true" />
              <div className="md:col-span-6 lg:col-span-6 flex flex-col justify-start">
                {renderOverview('text-sm sm:text-[15px] md:text-base leading-[1.68] max-w-[50ch]')}
              </div>
            </div>
          </div>
        );

      // 6. Narrative Offset Left (Project 05): Centered-Offset Image (8 cols) + 3-Part Horizontal Modular Band
      case 'narrative-offset-left':
        return (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-y-8 md:gap-x-6 lg:gap-x-8 items-start w-full text-left">
            <div className="hidden md:block md:col-span-2" aria-hidden="true" />
            <div className="col-span-12 md:col-span-8 overflow-visible">
              {renderImageBlock('aspect-[16/9] md:aspect-[16/9]')}
            </div>
            <div className="hidden md:block md:col-span-2" aria-hidden="true" />

            <div className="hidden md:block md:col-span-2" aria-hidden="true" />
            <div className="col-span-12 md:col-span-3 flex flex-col justify-start">
              {renderIdentity()}
            </div>
            <div className="col-span-12 md:col-span-3 flex flex-col justify-start">
              {renderTitle('text-lg sm:text-xl md:text-[1.45rem] leading-[1.1]')}
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col justify-start">
              {renderOverview('text-sm sm:text-[15px] leading-[1.68] max-w-[40ch]')}
            </div>
          </div>
        );

      // 7. Staggered Offset Right (Project 06): Interlocking Modular Chessboard Exchange
      case 'staggered-offset-right':
      default: {
        const secondaryImage = project.images && project.images.length > 1 ? project.images[1] : project.image;
        return (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-8 lg:gap-x-10 items-start w-full text-left">
            <div className="col-span-12 md:col-span-5 flex flex-col justify-between gap-6 sm:gap-8">
              <div>
                {renderOverview('text-sm sm:text-base leading-[1.68] max-w-[40ch]')}
              </div>
              <div className="w-full overflow-hidden">
                {renderSecondaryImageBlock(secondaryImage, 'aspect-[16/9]')}
              </div>
            </div>
            <div className="hidden md:block md:col-span-1" aria-hidden="true" />
            <div className="col-span-12 md:col-span-6 flex flex-col gap-5 sm:gap-6">
              <div>
                {renderTitle('text-xl sm:text-2xl lg:text-[1.85rem] leading-[1.08]')}
                {renderIdentity()}
              </div>
              <div className="w-full overflow-visible">
                {renderImageBlock('aspect-[4/3] md:aspect-[4/3]')}
              </div>
            </div>
          </div>
        );
      }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      data-project-reveal={resolvedVariant}
      data-reveal-state={isInView ? 'resolved' : 'unresolved'}
      className="w-full relative overflow-visible select-none"
    >
      {renderComposition()}
    </motion.div>
  );
});

ProjectReveal.displayName = 'ProjectReveal';
