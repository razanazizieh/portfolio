import React, { useState, useCallback, useMemo, memo } from 'react';
import { motion, Variants, useReducedMotion } from 'motion/react';
import { PROJECTS_DATA } from '../data';
import { ProjectReveal } from './ProjectReveal';
import { useProjectReveal } from '../hooks/useProjectReveal';
import { MOTION_CURVE_PREMIUM, REVEAL_VIEWPORT_CONFIG } from '../utils/motion';

export type EditorialArchetype =
  | 'cinematic-anchor'       // Family A: Large visual anchor (Full width of grid with wide aspect & 100vw cover)
  | 'compact-staggered-left' // Family B: Small offset project (7 cols left with typography above image)
  | 'tall-staggered-right'   // Family C: Right-side project with large negative space (5 cols right)
  | 'split-editorial'        // Family D: Wide horizontal composition (Text left 5 cols, Image right 7 cols)
  | 'full-bleed-moment'      // Family E: Unexpected full-bleed visual moment breaking container
  | 'narrative-offset-left'  // Family B-variant: Left-aligned 5 cols with large right negative space
  | 'staggered-offset-right';// Family C-variant: Right-aligned 6 cols with asymmetric offset

export interface ProjectCardProps {
  project: typeof PROJECTS_DATA[0];
  onOpen: (project: typeof PROJECTS_DATA[0]) => void;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  archetype: EditorialArchetype;
  isPriority?: boolean;
  isHeroFeatured?: boolean;
  index: number;
  activeFilter?: string;
}

const NOOP = () => {};

export const getCardParentVariants = (shouldReduceMotion: boolean): Variants => {
  if (shouldReduceMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.01 } },
    };
  }
  return {
    hidden: {
      opacity: 0,
      y: 18,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: MOTION_CURVE_PREMIUM,
      },
    },
  };
};

export const cardParentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: MOTION_CURVE_PREMIUM,
    },
  },
};

export const getContainerGridClass = (_archetype: EditorialArchetype) => {
  return 'col-span-12 w-full';
};

export const ProjectCard = memo<ProjectCardProps>(({
  project,
  onOpen,
  onHoverStart = NOOP,
  onHoverEnd = NOOP,
  archetype,
  isPriority = false,
  isHeroFeatured = false,
  index,
  activeFilter,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });

  const frames = useMemo(
    () => (project.images && project.images.length > 0 ? project.images : [project.image]),
    [project.images, project.image]
  );

  const projectNumber = String(index + 1).padStart(2, '0');

  // Unified hook handles deterministic variant choreography, motion configs, observer lifecycle,
  // and guarantees strict state resets when filters or indexes change
  const {
    ref: itemRef,
    isRevealed,
    revealVariant,
    motionConfig,
    lifecycleKey,
    scrollProgress,
    sceneStyles,
  } = useProjectReveal({
    index,
    projectId: project.id,
    archetype,
    activeFilter,
  });

  const handleTrigger = useCallback(() => {
    onOpen(project);
  }, [onOpen, project]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    setMouseParallax({ x, y });
  }, [shouldReduceMotion]);

  const handleMouseEnter = useCallback(() => {
    onHoverStart();
  }, [onHoverStart]);

  const handleMouseLeave = useCallback(() => {
    setMouseParallax({ x: 0, y: 0 });
    onHoverEnd();
  }, [onHoverEnd]);

  const resolvedCardVariants = useMemo(
    () => getCardParentVariants(Boolean(shouldReduceMotion)),
    [shouldReduceMotion]
  );

  return (
    <motion.article
      ref={itemRef as any}
      id={`project-chapter-${project.id}`}
      data-project-card="true"
      data-cursor="VIEW"
      tabIndex={0}
      role="button"
      aria-label={`View case study: ${project.title}`}
      onClick={handleTrigger}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleTrigger();
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      variants={resolvedCardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={REVEAL_VIEWPORT_CONFIG}
      data-reveal-state={isRevealed ? 'resolved' : 'unresolved'}
      data-reveal-variant={revealVariant}
      data-project-index={index}
      data-lifecycle-key={lifecycleKey}
      className={`group project-card ${
        project.id === '3d-fluid' || archetype === 'cinematic-anchor' ? 'vortex-project-card' : ''
      } cursor-pointer select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 rounded-none w-full`}
    >
      <ProjectReveal
        key={lifecycleKey}
        index={index}
        project={project}
        archetype={archetype}
        frames={frames}
        isPriority={isPriority}
        isHeroFeatured={isHeroFeatured}
        mouseParallax={mouseParallax}
        activeFilter={activeFilter}
        projectNumber={projectNumber}
        isRevealed={isRevealed}
        revealVariant={revealVariant}
        motionConfig={motionConfig}
        scrollProgress={scrollProgress}
        sceneStyles={sceneStyles}
      />
    </motion.article>
  );
});

ProjectCard.displayName = 'ProjectCard';
