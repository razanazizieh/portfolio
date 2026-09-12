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
      className="flex items-center gap-2 mt-2 mb-3.5 sm:mb-2.5 overflow-hidden will-change-[transform,clip-path,opacity]"
    >
      <ProjectMeta index={projectNumber} category={project.category} year={project.year} />
    </motion.div>
  );

  const renderOverview = (customClasses = '') => (
    <motion.div variants={descriptionVariants} className="w-full overflow-hidden will-change-[transform,clip-path,opacity]">
      <p
        className={`font-sans font-normal text-neutral-600 dark:text-neutral-300 ${customClasses}`}
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
  // Preserves exact desktop layout while giving mobile clear visual chapters,
  // prominent display typography, and deliberate asymmetric spacing.
  // =========================================================================
  const renderComposition = () => {
    switch (archetype) {
      // 1. Cinematic Anchor (Project 01): Full-Bleed 100vw Cover Image + Asymmetric 12-Col Modules Below
      case 'cinematic-anchor':
        return (
          <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 w-full">
            {/* Visual Anchor: Full-Bleed 100vw Cover Image establishes the chapter first */}
            {renderImageBlock(
              'aspect-[16/9] sm:aspect-[21/9] md:aspect-[2.35/1] lg:aspect-[2.4/1]',
              true
            )}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-x-8 items-start text-left w-full mt-2 sm:mt-0">
              <div className="col-span-12 md:col-span-5 lg:col-span-5 flex flex-col justify-start">
                {renderTitle('text-[1.5rem] sm:text-2xl md:text-3xl lg:text-[2.25rem] leading-[1.04]')}
                {renderIdentity()}
              </div>
              <div className="hidden md:block md:col-span-1" aria-hidden="true" />
              <div className="col-span-12 md:col-span-6 lg:col-span-6 flex flex-col justify-start mt-1 md:mt-0">
                {renderOverview('text-[15px] sm:text-base leading-[1.72] max-w-[42ch] md:max-w-[50ch]')}
              </div>
            </div>
          </div>
        );

      // 2. Compact Staggered Left (Project 02): Left-Anchored Image establishes project first
      case 'compact-staggered-left':
        return (
          <div className="flex flex-col md:grid md:grid-cols-12 gap-y-6 md:gap-y-8 md:gap-x-8 items-start w-full text-left">
            {/* Desktop Spacers */}
            <div className="hidden md:block md:col-span-3 md:order-1" aria-hidden="true" />

            {/* Visual Focus: Left-Anchored Image (Cols 1-8 on desktop, Order-1 92% width on mobile) */}
            <div className="order-1 md:order-4 col-span-12 md:col-span-8 w-full overflow-visible">
              <div className="w-[92%] sm:w-[88%] md:w-full mr-auto md:mr-0 overflow-visible">
                {renderImageBlock('aspect-[16/10] sm:aspect-[16/9]')}
              </div>
            </div>

            {/* Desktop spacer on right of image */}
            <div className="hidden md:block md:col-span-4 md:order-5" aria-hidden="true" />

            {/* Information Area: Title & Identity (Cols 4-8 on desktop, Order-2 on mobile) */}
            <div className="order-2 md:order-2 col-span-12 md:col-span-5 flex flex-col justify-start mt-5 sm:mt-6 md:mt-0">
              {renderTitle('text-[1.5rem] sm:text-2xl md:text-[1.85rem] leading-[1.06]')}
              {renderIdentity()}
            </div>

            {/* Information Area: Overview (Cols 9-12 on desktop, Order-3 on mobile) */}
            <div className="order-3 md:order-3 col-span-12 md:col-span-4 flex flex-col justify-start pl-0 md:pl-0 md:pt-1 mt-2 sm:mt-3 md:mt-0">
              {renderOverview('text-[15px] sm:text-[15px] md:text-base leading-[1.72] max-w-[38ch] md:max-w-[42ch]')}
            </div>
          </div>
        );

      // 3. Tall Staggered Right (Project 03): Primary Image establishes project, followed by info & secondary image coda
      case 'tall-staggered-right': {
        const secondaryImage = project.images && project.images.length > 1 ? project.images[1] : project.image;
        return (
          <div className="flex flex-col md:grid md:grid-cols-12 gap-y-6 sm:gap-y-8 md:gap-x-8 lg:gap-x-10 items-start w-full text-left">
            {/* Visual Focus: Primary Image (Left 6 cols on desktop; Order-1 on mobile, 94% right-anchored) */}
            <div className="order-1 md:order-1 w-full md:col-span-6 overflow-visible">
              <div className="w-[94%] sm:w-[90%] md:w-full ml-auto md:ml-0 overflow-visible">
                {renderImageBlock('aspect-[4/3] sm:aspect-[1/1] md:aspect-[4/3]')}
              </div>
            </div>

            <div className="hidden md:block md:col-span-1 md:order-2" aria-hidden="true" />

            {/* Right Column: Title + Overview + Secondary Image on desktop; unpacked into ordered hierarchy on mobile */}
            <div className="contents md:flex md:flex-col md:justify-between md:h-full md:gap-6 sm:md:gap-8 md:order-3 md:col-span-5">
              {/* Information Area: Title and Identity (Order-2 on mobile) */}
              <div className="order-2 md:order-none flex flex-col mt-5 sm:mt-6 md:mt-0">
                {renderTitle('text-[1.5rem] sm:text-2xl lg:text-[1.85rem] leading-[1.08]')}
                {renderIdentity()}
              </div>

              {/* Information Area: Overview (Order-3 on mobile) */}
              <div className="order-3 md:order-none flex flex-col mt-2 sm:mt-3 md:mt-0">
                {renderOverview('text-[15px] sm:text-[15px] md:text-base leading-[1.72] max-w-[38ch] md:max-w-[42ch]')}
              </div>

              {/* Ending: Secondary Detail Specimen (Order-4 on mobile with 82% asymmetric offset) */}
              <div className="order-4 md:order-none w-[82%] sm:w-[78%] md:w-full ml-auto md:ml-0 overflow-hidden mt-6 sm:mt-7 md:mt-4">
                {renderSecondaryImageBlock(secondaryImage, 'aspect-[16/10]')}
              </div>
            </div>
          </div>
        );
      }

      // 4. Split Editorial (Project 04): Wide Architectural Image establishes project first, followed by info block
      case 'split-editorial':
        return (
          <div className="flex flex-col md:grid md:grid-cols-12 gap-y-6 md:gap-x-8 lg:gap-x-12 items-start w-full text-left">
            {/* Visual Focus: Wide Architectural Image (Cols 6-12 on desktop, Order-1 on mobile) */}
            <div className="order-1 md:order-3 col-span-12 md:col-span-7 w-full overflow-visible">
              <div className="w-full overflow-visible">
                {renderImageBlock('aspect-[16/10] md:aspect-[16/10]')}
              </div>
            </div>

            <div className="hidden md:block md:col-span-1 md:order-2" aria-hidden="true" />

            {/* Information Area: Title, Identity, and Overview (Cols 1-4 on desktop, Order-2 on mobile) */}
            <div className="order-2 md:order-1 col-span-12 md:col-span-4 flex flex-col justify-start pt-1 md:pt-2 mt-5 sm:mt-6 md:mt-0">
              {renderTitle('text-[1.5rem] sm:text-2xl lg:text-[1.95rem] leading-[1.06]')}
              {renderIdentity()}
              {renderOverview('text-[15px] sm:text-[15px] md:text-base leading-[1.72] max-w-[36ch] mt-3 sm:mt-4')}
            </div>
          </div>
        );

      // 5. Full Bleed Moment: Secondary Break-Out Image
      case 'full-bleed-moment':
        return (
          <div className="w-full flex flex-col gap-6 sm:gap-8">
            {renderImageBlock('aspect-[16/9] sm:aspect-[21/9] md:aspect-[24/10]', true)}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-x-8 lg:gap-x-12 items-start text-left w-full mt-2 sm:mt-0">
              <div className="col-span-12 md:col-span-5 lg:col-span-5 flex flex-col">
                {renderTitle('text-[1.5rem] sm:text-2xl md:text-3xl lg:text-[2.15rem] leading-[1.08]')}
                {renderIdentity()}
              </div>
              <div className="hidden md:block md:col-span-1" aria-hidden="true" />
              <div className="col-span-12 md:col-span-6 lg:col-span-6 flex flex-col justify-start mt-1 md:mt-0">
                {renderOverview('text-[15px] sm:text-[15px] md:text-base leading-[1.72] max-w-[42ch] md:max-w-[50ch]')}
              </div>
            </div>
          </div>
        );

      // 6. Narrative Offset Left (Project 05): Asymmetric Left Image establishes project first, followed by info modules
      case 'narrative-offset-left':
        return (
          <div className="flex flex-col md:grid md:grid-cols-12 gap-y-6 md:gap-y-8 md:gap-x-6 lg:gap-x-8 items-start w-full text-left">
            <div className="hidden md:block md:col-span-2 md:order-1" aria-hidden="true" />

            {/* Visual Focus: Left-Offset Image (Cols 3-10 on desktop, Order-1 on mobile with 90% width) */}
            <div className="order-1 md:order-2 w-full md:col-span-8 overflow-visible">
              <div className="w-[90%] sm:w-[86%] md:w-full mr-auto md:mr-0 overflow-visible">
                {renderImageBlock('aspect-[16/9] md:aspect-[16/9]')}
              </div>
            </div>

            <div className="hidden md:block md:col-span-2 md:order-3" aria-hidden="true" />

            {/* Information Area: Title (Cols 3-5 on desktop, Order-2 on mobile) */}
            <div className="order-2 md:order-5 md:col-span-3 flex flex-col justify-start mt-5 sm:mt-6 md:mt-0">
              {renderTitle('text-[1.5rem] sm:text-xl md:text-[1.45rem] leading-[1.08]')}
            </div>

            {/* Information Area: Identity (Cols 6-8 on desktop, Order-3 on mobile) */}
            <div className="order-3 md:order-4 md:col-span-3 flex flex-col justify-start -mt-1 md:mt-0">
              {renderIdentity()}
            </div>

            {/* Information Area: Overview (Cols 9-12 on desktop, Order-4 on mobile) */}
            <div className="order-4 md:order-6 md:col-span-4 flex flex-col justify-start pl-0 md:pl-0 mt-2 sm:mt-3 md:mt-0">
              {renderOverview('text-[15px] sm:text-[15px] md:text-base leading-[1.72] max-w-[38ch] md:max-w-[40ch]')}
            </div>
          </div>
        );

      // 7. Staggered Offset Right (Project 06): Right-Anchored Main Image establishes project, followed by info & secondary coda
      case 'staggered-offset-right':
      default: {
        const secondaryImage = project.images && project.images.length > 1 ? project.images[1] : project.image;
        return (
          <div className="flex flex-col md:grid md:grid-cols-12 gap-y-6 sm:gap-y-8 md:gap-x-8 lg:gap-x-10 items-start w-full text-left">
            {/* Primary Visual & Identity Column on Desktop (Cols 7-12) */}
            <div className="contents md:flex md:flex-col md:gap-6 md:order-3 md:col-span-6 md:col-start-7 w-full">
              {/* Visual Focus: Main Image (Order-1 on mobile with 92% right-anchored width) */}
              <div className="order-1 md:order-2 w-full overflow-visible">
                <div className="w-[92%] sm:w-[88%] md:w-full ml-auto md:ml-0 overflow-visible">
                  {renderImageBlock('aspect-[4/3] md:aspect-[4/3]')}
                </div>
              </div>

              {/* Information Area: Title & Identity (Order-2 on mobile) */}
              <div className="order-2 md:order-1 mt-5 sm:mt-6 md:mt-0">
                {renderTitle('text-[1.5rem] sm:text-2xl lg:text-[1.85rem] leading-[1.08]')}
                {renderIdentity()}
              </div>
            </div>

            <div className="hidden md:block md:col-span-1 md:order-2" aria-hidden="true" />

            {/* Narrative & Detail Column on Desktop (Cols 1-5) */}
            <div className="contents md:flex md:flex-col md:justify-between md:gap-8 md:order-1 md:col-span-5 w-full">
              {/* Information Area: Overview (Order-3 on mobile) */}
              <div className="order-3 md:order-1 mt-3 sm:mt-4 md:mt-0">
                {renderOverview('text-[15px] sm:text-base leading-[1.72] max-w-[38ch] md:max-w-[40ch]')}
              </div>

              {/* Ending: Secondary Detail Specimen (Order-4 on mobile with alternating 82% left offset) */}
              <div className="order-4 md:order-2 w-[82%] sm:w-[78%] md:w-full mr-auto md:mr-0 overflow-hidden mt-6 sm:mt-7 md:mt-0">
                {renderSecondaryImageBlock(secondaryImage, 'aspect-[16/9]')}
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
