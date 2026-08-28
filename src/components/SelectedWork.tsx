import React, { useRef, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { PROJECTS_DATA } from '../data';
import { MOTION_CURVE_PREMIUM, VIEWPORT_EDITORIAL_CONFIG } from '../utils/motion';
import { ProjectCard, EditorialArchetype } from './ProjectCard';

interface SelectedWorkProps {
  activeProject?: typeof PROJECTS_DATA[0] | null;
  onActiveProjectChange?: (project: typeof PROJECTS_DATA[0] | null) => void;
  activeFilter?: 'ALL' | 'FULL-STACK' | 'CODE' | 'UI';
  setActiveFilter?: (filter: 'ALL' | 'FULL-STACK' | 'CODE' | 'UI') => void;
  triggerWipe?: (onHalfway: () => void) => void;
}

export default function SelectedWork({
  activeProject,
  onActiveProjectChange,
  activeFilter: propsActiveFilter,
  setActiveFilter: propsSetActiveFilter,
}: SelectedWorkProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [localSelectedProject, setLocalSelectedProject] = useState<typeof PROJECTS_DATA[0] | null>(null);
  const [localActiveFilter, setLocalActiveFilter] = useState<'ALL' | 'FULL-STACK' | 'CODE' | 'UI'>('ALL');
  const activeFilter = propsActiveFilter !== undefined ? propsActiveFilter : localActiveFilter;
  const setActiveFilter = propsSetActiveFilter !== undefined ? propsSetActiveFilter : setLocalActiveFilter;

  // Header scroll progress tracking for subtle spatial grounding
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start center'],
  });

  const headerY = useTransform(
    scrollYProgress,
    [0, 1],
    [shouldReduceMotion ? 0 : 30, 0]
  );
  const headerOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    [shouldReduceMotion ? 1 : 0.2, 1]
  );

  const setSelectedProject = activeProject !== undefined && onActiveProjectChange ? onActiveProjectChange : setLocalSelectedProject;

  const handleOpenModal = useCallback((project: typeof PROJECTS_DATA[0]) => {
    setSelectedProject(project);
  }, [setSelectedProject]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'ALL') return PROJECTS_DATA;
    return PROJECTS_DATA.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const filterCounts = useMemo(() => {
    return {
      ALL: PROJECTS_DATA.length,
      'FULL-STACK': PROJECTS_DATA.filter((p) => p.category === 'FULL-STACK').length,
      CODE: PROJECTS_DATA.filter((p) => p.category === 'CODE').length,
      UI: PROJECTS_DATA.filter((p) => p.category === 'UI').length,
    };
  }, []);

  // Map each project to its deliberate editorial archetype and grid behavior
  const getDynamicArchetype = useCallback((project: typeof PROJECTS_DATA[0], index: number, totalCount: number): EditorialArchetype => {
    if (totalCount === 1) return 'cinematic-anchor';
    if (totalCount === 2) {
      return index === 0 ? 'compact-staggered-left' : 'tall-staggered-right';
    }
    if (totalCount === 3) {
      const trio: EditorialArchetype[] = ['cinematic-anchor', 'compact-staggered-left', 'tall-staggered-right'];
      return trio[index];
    }

    const archetypeMap: Record<string, EditorialArchetype> = {
      '3d-fluid': 'cinematic-anchor',
      'bilingual-engine': 'compact-staggered-left',
      'custom-cms': 'tall-staggered-right',
      'dwello': 'split-editorial',
      'minimalist-portfolio': 'narrative-offset-left',
      'interaction-specimen': 'staggered-offset-right',
    };

    return archetypeMap[project.id] || (['cinematic-anchor', 'compact-staggered-left', 'tall-staggered-right', 'split-editorial', 'narrative-offset-left', 'staggered-offset-right'][index % 6] as EditorialArchetype);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="works"
      aria-label="Selected Works"
      style={{
        paddingLeft: 'max(16px, 4vw)',
        paddingRight: 'max(16px, 4vw)',
      }}
      className="relative w-full z-20 py-24 sm:py-32 md:py-44 lg:py-52 scroll-mt-20 md:scroll-mt-24 select-text"
    >
      <div className="w-full relative flex flex-col max-w-7xl mx-auto px-0 sm:px-8 lg:px-12">
        
        {/* Editorial Section Header & Classification Index */}
        <motion.div
          variants={{
            hidden: { opacity: shouldReduceMotion ? 1 : 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.08,
                delayChildren: shouldReduceMotion ? 0 : 0.04,
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_EDITORIAL_CONFIG}
          style={{ y: headerY, opacity: headerOpacity }}
          className="w-full mb-20 sm:mb-24 md:mb-32 will-change-transform select-text"
        >
          {/* Asymmetric 12-Column Editorial Index Composition */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-8 items-start w-full">
            
            {/* Primary Section Anchor: Section Label & Dominant Title */}
            <div className="col-span-12 md:col-span-6 lg:col-span-6 flex flex-col items-start text-left">
              <motion.span
                variants={{
                  hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 15 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: shouldReduceMotion ? 0.01 : 0.75, ease: MOTION_CURVE_PREMIUM },
                  },
                }}
                className="font-mono text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400 font-medium tracking-[0.16em] leading-none uppercase block mb-3 sm:mb-4 select-text"
              >
                PORTFOLIO
              </motion.span>

              <motion.h2
                variants={{
                  hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: shouldReduceMotion ? 0.01 : 0.75, ease: MOTION_CURVE_PREMIUM },
                  },
                }}
                className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 uppercase leading-[0.92] select-text"
              >
                SELECTED WORKS
              </motion.h2>
            </div>

            {/* Asymmetric Offset Classification Field (Tucked into negative space on Right Axis) */}
            <motion.div
              variants={{
                hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 15 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: shouldReduceMotion ? 0.01 : 0.7, ease: MOTION_CURVE_PREMIUM },
                },
              }}
              className="col-span-12 md:col-span-6 lg:col-span-6 md:col-start-7 lg:col-start-7 flex flex-col items-start md:items-end justify-between pt-1 md:pt-2 text-left md:text-right"
            >
              <div className="w-full flex flex-col items-start md:items-end gap-2 sm:gap-3">
                {/* Editorial Index Filter List */}
                <div
                  role="tablist"
                  aria-label="Filter works by discipline"
                  className="flex flex-wrap md:flex-nowrap items-center gap-x-5 sm:gap-x-7 gap-y-2.5 w-full md:w-auto justify-start md:justify-end"
                >
                  {(['ALL', 'FULL-STACK', 'CODE', 'UI'] as const).map((filterValue) => {
                    const count = filterCounts[filterValue];
                    const isActive = activeFilter === filterValue;

                    return (
                      <button
                        key={filterValue}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-controls="works-gallery-grid"
                        onClick={() => setActiveFilter(filterValue)}
                        className={`group relative py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500 cursor-pointer select-none transition-all duration-200 text-left shrink-0 ${
                          isActive
                            ? 'text-neutral-950 dark:text-neutral-50'
                            : 'text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
                        }`}
                      >
                        <div className="flex items-baseline gap-1.5 font-mono text-xs sm:text-[13px] tracking-[0.12em] uppercase leading-none">
                          <span
                            aria-hidden="true"
                            className={`inline-block transition-opacity duration-200 ${
                              isActive ? 'text-neutral-950 dark:text-neutral-50 opacity-100' : 'opacity-0'
                            }`}
                          >
                            &bull;
                          </span>
                          <span className={isActive ? 'font-medium tracking-[0.12em]' : 'font-normal tracking-[0.12em]'}>
                            {filterValue}
                          </span>
                          <span
                            className={`text-[10px] tracking-wider transition-opacity duration-200 ${
                              isActive
                                ? 'opacity-85 font-medium text-neutral-950 dark:text-neutral-50'
                                : 'opacity-40 group-hover:opacity-75 font-normal'
                            }`}
                          >
                            [{String(count).padStart(2, '0')}]
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Editorial Archive Composition: Asymmetrical 12-Column Grid */}
        <motion.div
          id="works-gallery-grid"
          layout="position"
          className="grid grid-cols-1 md:grid-cols-12 gap-x-6 md:gap-x-8 lg:gap-x-12 gap-y-24 sm:gap-y-32 md:gap-y-36 lg:gap-y-48 w-full items-start"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredProjects.map((project, index) => {
              const archetype = getDynamicArchetype(project, index, filteredProjects.length);

              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpen={handleOpenModal}
                  archetype={archetype}
                  isPriority={index === 0}
                  index={index}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
