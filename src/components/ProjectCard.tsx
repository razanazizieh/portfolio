import React, { useRef, useState, useCallback, useMemo, memo } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { PROJECTS_DATA } from '../data';
import { VIEWPORT_EDITORIAL_CONFIG } from '../utils/motion';
import { ProjectImage } from './ProjectImage';
import { ProjectMeta } from './ProjectMeta';

export type EditorialArchetype =
  | 'cinematic-anchor'       // Family A: Full-width panoramic anchor (col-span-12) with dual-column baseline split text
  | 'compact-staggered-left' // Family B: Left-anchored 7-col specimen (col-span-12 md:col-span-7) with text-above-image & crop shift
  | 'tall-staggered-right'   // Family C: Right-offset 5-col specimen (col-span-12 md:col-span-5 md:col-start-8) with mask open
  | 'split-editorial'        // Family D: Full-width horizontal split (col-span-12) with text-left (5 cols) & image-right (7 cols) offset resolve
  | 'narrative-offset-left'  // Family E: Left-offset 5-col specimen (col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-1)
  | 'staggered-offset-right';// Family F: Right-offset 6-col specimen (col-span-12 md:col-span-6 md:col-start-7 lg:col-start-7)

export interface ProjectCardProps {
  project: typeof PROJECTS_DATA[0];
  onOpen: (project: typeof PROJECTS_DATA[0]) => void;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  archetype: EditorialArchetype;
  isPriority?: boolean;
  index: number;
}

const NOOP = () => {};

export const ProjectCard = memo<ProjectCardProps>(({
  project,
  onOpen,
  onHoverStart = NOOP,
  onHoverEnd = NOOP,
  archetype,
  isPriority = false,
  index,
}) => {
  const itemRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Extract unique frame list from project cover + gallery
  const frames = useMemo(() => {
    const list = [project.image];
    if (project.gallery && project.gallery.length > 0) {
      project.gallery.forEach((g) => {
        if (g.image && !list.includes(g.image)) {
          list.push(g.image);
        }
      });
    }
    return list.filter(Boolean);
  }, [project]);

  // Continuous viewport scroll tracking for seamless choreography
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ['start end', 'end start'],
  });

  // -------------------------------------------------------------
  // CHOREOGRAPHY FAMILIES: ENTER -> CENTER -> LEAVE
  // -------------------------------------------------------------

  // FAMILY A: IMAGE REVEAL (Cinematic Anchor)
  const cinematicClip = useTransform(
    scrollYProgress,
    [0, 0.28, 0.72, 1],
    [
      shouldReduceMotion ? 'inset(0% 0% 0% 0%)' : 'inset(10% 0% 10% 0%)',
      'inset(0% 0% 0% 0%)',
      'inset(0% 0% 0% 0%)',
      shouldReduceMotion ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 8% 0%)',
    ]
  );

  // FAMILY B: CROP SHIFT (Compact Staggered Left)
  const compactClip = useTransform(
    scrollYProgress,
    [0, 0.28, 0.75, 1],
    [
      shouldReduceMotion ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 12% 0%)',
      'inset(0% 0% 0% 0%)',
      'inset(0% 0% 0% 0%)',
      shouldReduceMotion ? 'inset(0% 0% 0% 0%)' : 'inset(8% 0% 0% 0%)',
    ]
  );

  // FAMILY C: MASK OPEN (Tall Staggered Right)
  const tallClip = useTransform(
    scrollYProgress,
    [0, 0.28, 0.75, 1],
    [
      shouldReduceMotion ? 'inset(0% 0% 0% 0%)' : 'inset(0% 10% 0% 10%)',
      'inset(0% 0% 0% 0%)',
      'inset(0% 0% 0% 0%)',
      shouldReduceMotion ? 'inset(0% 0% 0% 0%)' : 'inset(6% 6% 6% 6%)',
    ]
  );

  // FAMILY D: OFFSET RESOLVE (Split Editorial)
  const splitImageClip = useTransform(
    scrollYProgress,
    [0, 0.3, 0.75, 1],
    [
      shouldReduceMotion ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 0% 12%)',
      'inset(0% 0% 0% 0%)',
      'inset(0% 0% 0% 0%)',
      shouldReduceMotion ? 'inset(0% 0% 0% 0%)' : 'inset(0% 8% 0% 0%)',
    ]
  );

  // FAMILY E: NARRATIVE OFFSET LEFT
  const narrativeClip = useTransform(
    scrollYProgress,
    [0.08, 0.34, 0.76, 1],
    [
      shouldReduceMotion ? 'inset(0% 0% 0% 0%)' : 'inset(8% 8% 0% 0%)',
      'inset(0% 0% 0% 0%)',
      'inset(0% 0% 0% 0%)',
      shouldReduceMotion ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 8% 8%)',
    ]
  );

  // FAMILY F: STAGGERED OFFSET RIGHT
  const staggeredClip = useTransform(
    scrollYProgress,
    [0, 0.28, 0.75, 1],
    [
      shouldReduceMotion ? 'inset(0% 0% 0% 0%)' : 'inset(0% 10% 8% 0%)',
      'inset(0% 0% 0% 0%)',
      'inset(0% 0% 0% 0%)',
      shouldReduceMotion ? 'inset(0% 0% 0% 0%)' : 'inset(8% 0% 0% 8%)',
    ]
  );

  // Quiet stabilizing text motion
  const textY = useTransform(
    scrollYProgress,
    [0, 0.28],
    [shouldReduceMotion ? 0 : 16, 0]
  );

  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.14, 0.3],
    [shouldReduceMotion ? 1 : 0.3, shouldReduceMotion ? 1 : 0.7, 1]
  );

  const splitTextY = useTransform(
    scrollYProgress,
    [0, 0.32],
    [shouldReduceMotion ? 0 : 22, 0]
  );

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseParallax({ x: x * 3.5, y: y * 3.5 });
  }, [shouldReduceMotion]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    onHoverStart();
  }, [onHoverStart]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setMouseParallax({ x: 0, y: 0 });
    onHoverEnd();
  }, [onHoverEnd]);

  const handleTrigger = useCallback(() => {
    onOpen(project);
  }, [onOpen, project]);

  const getContainerGridClass = () => {
    switch (archetype) {
      case 'cinematic-anchor':
        return 'col-span-12';
      case 'compact-staggered-left':
        return 'col-span-12 md:col-span-7 lg:col-span-7';
      case 'tall-staggered-right':
        return 'col-span-12 md:col-span-5 lg:col-span-5 md:col-start-8 lg:col-start-8 md:mt-16 lg:mt-28';
      case 'split-editorial':
        return 'col-span-12';
      case 'narrative-offset-left':
        return 'col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-1';
      case 'staggered-offset-right':
        return 'col-span-12 md:col-span-6 lg:col-span-6 md:col-start-7 lg:col-start-7 md:mt-12 lg:mt-24';
      default:
        return 'col-span-12';
    }
  };

  const renderContent = () => {
    switch (archetype) {
      // 1. Cinematic Anchor: Full-width panoramic frame with asymmetric baseline split text below
      case 'cinematic-anchor':
        return (
          <div className="flex flex-col gap-6 sm:gap-8 w-full">
            <ProjectImage
              images={frames}
              title={project.title}
              aspectClass="aspect-[21/10]"
              archetype={archetype}
              scrollYProgress={scrollYProgress}
              containerClipPath={cinematicClip}
              mouseParallax={mouseParallax}
              isPriority={isPriority}
              projectIndex={index}
              isHovered={isHovered}
            />

            <motion.div
              style={{ y: textY, opacity: textOpacity }}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start text-left will-change-transform"
            >
              <div className="md:col-span-5 flex flex-col gap-2">
                <ProjectMeta category={project.category} year={project.year} />
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight leading-[1.05] text-neutral-950 dark:text-neutral-50 uppercase group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors duration-200">
                  {project.title}
                </h3>
              </div>
              <div className="md:col-span-7 flex flex-col justify-between gap-4">
                <p className="font-sans text-base sm:text-lg font-normal text-neutral-700 dark:text-neutral-300 leading-[1.65] max-w-[56ch]">
                  {project.overview}
                </p>
              </div>
            </motion.div>
          </div>
        );

      // 2. Compact Staggered Left: Text ABOVE image, 7-column span with Crop Shift
      case 'compact-staggered-left':
        return (
          <div className="flex flex-col gap-5 sm:gap-6 w-full">
            <motion.div
              style={{ y: textY, opacity: textOpacity }}
              className="flex flex-col gap-2.5 text-left will-change-transform"
            >
              <ProjectMeta category={project.category} year={project.year} />
              <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight leading-[1.05] text-neutral-950 dark:text-neutral-50 uppercase group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors duration-200">
                {project.title}
              </h3>
              <p className="font-sans text-base sm:text-lg font-normal text-neutral-700 dark:text-neutral-300 leading-[1.65] max-w-[50ch]">
                {project.overview}
              </p>
            </motion.div>

            <ProjectImage
              images={frames}
              title={project.title}
              aspectClass="aspect-[4/3]"
              archetype={archetype}
              scrollYProgress={scrollYProgress}
              containerClipPath={compactClip}
              mouseParallax={mouseParallax}
              isPriority={isPriority}
              projectIndex={index}
              isHovered={isHovered}
            />
          </div>
        );

      // 3. Tall Staggered Right: 1:1 framed image on top, text below, 5-column span with Mask Open
      case 'tall-staggered-right':
        return (
          <div className="flex flex-col gap-5 sm:gap-6 w-full">
            <ProjectImage
              images={frames}
              title={project.title}
              aspectClass="aspect-[1/1]"
              archetype={archetype}
              scrollYProgress={scrollYProgress}
              containerClipPath={tallClip}
              mouseParallax={mouseParallax}
              isPriority={isPriority}
              projectIndex={index}
              isHovered={isHovered}
            />

            <motion.div
              style={{ y: textY, opacity: textOpacity }}
              className="flex flex-col gap-2.5 text-left will-change-transform"
            >
              <ProjectMeta category={project.category} year={project.year} />
              <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight leading-[1.05] text-neutral-950 dark:text-neutral-50 uppercase group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors duration-200">
                {project.title}
              </h3>
              <p className="font-sans text-base sm:text-lg font-normal text-neutral-700 dark:text-neutral-300 leading-[1.65]">
                {project.overview}
              </p>
            </motion.div>
          </div>
        );

      // 4. Split Editorial: Horizontal Split with Text Left (5 cols) & Image Right (7 cols) Offset Resolve
      case 'split-editorial':
        return (
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-14 xl:gap-20 w-full">
            <motion.div
              style={{ y: splitTextY, opacity: textOpacity }}
              className="w-full lg:w-5/12 flex flex-col justify-between gap-6 order-2 lg:order-1 text-left pt-2 will-change-transform"
            >
              <div className="flex flex-col gap-3">
                <ProjectMeta category={project.category} year={project.year} />
                <h3 className="font-display text-2xl sm:text-3xl lg:text-[2.5rem] font-medium tracking-tight leading-[1.05] text-neutral-950 dark:text-neutral-50 uppercase group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors duration-200">
                  {project.title}
                </h3>
              </div>

              <p className="font-sans text-base sm:text-lg font-normal text-neutral-700 dark:text-neutral-300 leading-[1.7] max-w-[48ch]">
                {project.overview}
              </p>
            </motion.div>

            <ProjectImage
              images={frames}
              title={project.title}
              aspectClass="aspect-[4/3]"
              archetype={archetype}
              scrollYProgress={scrollYProgress}
              containerClipPath={splitImageClip}
              mouseParallax={mouseParallax}
              isPriority={isPriority}
              projectIndex={index}
              isHovered={isHovered}
              className="lg:w-7/12 order-1 lg:order-2"
            />
          </div>
        );

      // 5. Narrative Offset Left: 5-column left-anchored specimen with text-below sequence
      case 'narrative-offset-left':
        return (
          <div className="flex flex-col gap-5 sm:gap-6 w-full">
            <ProjectImage
              images={frames}
              title={project.title}
              aspectClass="aspect-[4/3]"
              archetype={archetype}
              scrollYProgress={scrollYProgress}
              containerClipPath={narrativeClip}
              mouseParallax={mouseParallax}
              isPriority={isPriority}
              projectIndex={index}
              isHovered={isHovered}
            />

            <motion.div
              style={{ y: textY, opacity: textOpacity }}
              className="flex flex-col gap-2.5 text-left will-change-transform"
            >
              <ProjectMeta category={project.category} year={project.year} />
              <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight leading-[1.05] text-neutral-950 dark:text-neutral-50 uppercase group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors duration-200">
                {project.title}
              </h3>
              <p className="font-sans text-base sm:text-lg font-normal text-neutral-700 dark:text-neutral-300 leading-[1.65] max-w-[48ch]">
                {project.overview}
              </p>
            </motion.div>
          </div>
        );

      // 6. Staggered Offset Right: 6-column right-anchored closing piece with vertical offset
      case 'staggered-offset-right':
      default:
        return (
          <div className="flex flex-col gap-5 sm:gap-6 w-full">
            <ProjectImage
              images={frames}
              title={project.title}
              aspectClass="aspect-[16/10]"
              archetype={archetype}
              scrollYProgress={scrollYProgress}
              containerClipPath={staggeredClip}
              mouseParallax={mouseParallax}
              isPriority={isPriority}
              projectIndex={index}
              isHovered={isHovered}
            />

            <motion.div
              style={{ y: textY, opacity: textOpacity }}
              className="flex flex-col gap-2.5 text-left will-change-transform"
            >
              <ProjectMeta category={project.category} year={project.year} />
              <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight leading-[1.05] text-neutral-950 dark:text-neutral-50 uppercase group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors duration-200">
                {project.title}
              </h3>
              <p className="font-sans text-base sm:text-lg font-normal text-neutral-700 dark:text-neutral-300 leading-[1.65] max-w-[54ch]">
                {project.overview}
              </p>
            </motion.div>
          </div>
        );
    }
  };

  return (
    <motion.article
      ref={itemRef}
      id={`project-chapter-${project.id}`}
      layout="position"
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
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_EDITORIAL_CONFIG}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
      transition={{
        duration: shouldReduceMotion ? 0.01 : 0.5,
        ease: [0.16, 1, 0.3, 1],
        layout: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
        delay: shouldReduceMotion ? 0 : Math.min(index * 0.04, 0.12),
      }}
      className={`group project-card cursor-pointer select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 rounded-none w-full will-change-transform ${getContainerGridClass()}`}
    >
      {renderContent()}
    </motion.article>
  );
});

ProjectCard.displayName = 'ProjectCard';
