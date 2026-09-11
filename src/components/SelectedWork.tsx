import React, { useRef, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, LayoutGroup, useReducedMotion, Variants } from 'motion/react';
import { PROJECTS_DATA } from '../data';
import { ProjectCard, EditorialArchetype, getContainerGridClass } from './ProjectCard';
import { ApertureReveal } from './ApertureReveal';
import { MagneticElement } from './MagneticElement';
import { MOTION_CURVE_PREMIUM, REVEAL_VIEWPORT_CONFIG } from '../utils/motion';

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

  // Map each project to its authored editorial composition family without consecutive repeats
  const getDynamicArchetype = useCallback((project: typeof PROJECTS_DATA[0], index: number, totalCount: number): EditorialArchetype => {
    if (totalCount === 1) return 'cinematic-anchor';
    if (totalCount === 2) {
      return index === 0 ? 'compact-staggered-left' : 'tall-staggered-right';
    }
    if (totalCount === 3) {
      // 3 items: Family A (Large Anchor) -> Family B (Small Offset Left) -> Family C (Right-Side Large Space)
      const trio: EditorialArchetype[] = ['cinematic-anchor', 'compact-staggered-left', 'tall-staggered-right'];
      return trio[index];
    }

    // Authored sequence across the 6 core projects:
    // 0: 3d-fluid             -> Family A: Large visual anchor (Full-bleed cover image breaking container 100vw)
    // 1: bilingual-engine     -> Family B: Small offset project (compact left 7 cols)
    // 2: custom-cms           -> Family C: Right-side project with large negative space (5 cols right)
    // 3: dwello               -> Family D: Wide horizontal composition (split editorial 12 cols)
    // 4: minimalist-portfolio -> Family B-variant: Left-side specimen with right negative space (5 cols left)
    // 5: interaction-specimen -> Family C-variant: Right-side specimen with asymmetric continuity (6 cols right)
    const archetypeMap: Record<string, EditorialArchetype> = {
      '3d-fluid': 'cinematic-anchor',
      'bilingual-engine': 'compact-staggered-left',
      'custom-cms': 'tall-staggered-right',
      'dwello': 'split-editorial',
      'minimalist-portfolio': 'narrative-offset-left',
      'interaction-specimen': 'staggered-offset-right',
    };

    if (archetypeMap[project.id]) {
      return archetypeMap[project.id];
    }

    // Dynamic rotation ensuring no consecutive duplicate families for any future project set
    const dynamicSequence: EditorialArchetype[] = [
      'cinematic-anchor',
      'compact-staggered-left',
      'tall-staggered-right',
      'split-editorial',
      'narrative-offset-left',
      'staggered-offset-right',
    ];
    return dynamicSequence[index % dynamicSequence.length];
  }, []);

  return (
    <section
      ref={sectionRef}
      id="works"
      aria-label="Portfolio"
      className="relative w-full z-20 py-20 sm:py-32 select-text overflow-x-hidden"
    >
      <div className="w-full relative flex flex-col max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        
        <LayoutGroup id="selected-works-group">
          {/* Editorial Section Header & Classification Index */}
          <div className="w-full mb-14 sm:mb-18 md:mb-24 select-text">
            {/* Asymmetric 12-Column Editorial Index Composition */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-8 items-start w-full">
              
              {/* Primary Section Anchor: Dominant Title with line masking reveal */}
              <div className="col-span-12 md:col-span-6 lg:col-span-6 flex flex-col items-start text-left select-text">
                <div className="overflow-hidden py-0.5 select-text pointer-events-auto">
                  <motion.h2
                    initial={
                      shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
                    }
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={REVEAL_VIEWPORT_CONFIG}
                    transition={{
                      duration: shouldReduceMotion ? 0.01 : 0.75,
                      ease: MOTION_CURVE_PREMIUM,
                      delay: shouldReduceMotion ? 0 : 0.04,
                    }}
                    className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-light tracking-tighter text-neutral-900 dark:text-white uppercase leading-[1.05] select-text will-change-[transform,opacity]"
                  >
                    PORTFOLIO
                  </motion.h2>
                </div>
              </div>

              {/* Asymmetric Offset Classification Field (Tucked into negative space on Right Axis) */}
              <div
                className="col-span-12 md:col-span-6 lg:col-span-6 md:col-start-7 lg:col-start-7 flex flex-col items-start md:items-end justify-between pt-1 md:pt-2 text-left md:text-right"
              >
                <motion.div
                  initial={
                    shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={REVEAL_VIEWPORT_CONFIG}
                  transition={{
                    duration: shouldReduceMotion ? 0.01 : 0.72,
                    ease: MOTION_CURVE_PREMIUM,
                    delay: shouldReduceMotion ? 0 : 0.18,
                  }}
                  className="w-full md:w-auto"
                >
                  <div className="w-full flex flex-col items-start md:items-end gap-2 sm:gap-3">
                    {/* Editorial Index Filter List: Strict single line with no wrapping on mobile */}
                    <div
                      role="tablist"
                      aria-label="Filter works by discipline"
                      className="flex flex-nowrap overflow-x-auto scrollbar-none items-center gap-2 sm:gap-3 md:gap-4 w-full md:w-auto justify-start md:justify-end py-1 -mx-1 px-1 max-w-full whitespace-nowrap"
                    >
                      {(['ALL', 'FULL-STACK', 'CODE', 'UI'] as const).map((filterValue) => {
                        const count = filterCounts[filterValue];
                        const isActive = activeFilter === filterValue;

                        return (
                          <MagneticElement key={filterValue} strength={0.2} activeScale={1.02} className="shrink-0">
                            <button
                              type="button"
                              role="tab"
                              aria-selected={isActive}
                              aria-controls="works-gallery-grid"
                              onClick={() => setActiveFilter(filterValue)}
                              className={`group relative px-3 py-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500 cursor-pointer select-none transition-colors duration-200 text-left shrink-0 whitespace-nowrap ${
                                isActive
                                  ? 'text-neutral-900 dark:text-white'
                                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                              }`}
                            >
                              <div className="flex items-baseline gap-1.5 font-mono text-xs tracking-[0.14em] uppercase leading-none whitespace-nowrap">
                                <span className="font-normal">
                                  {filterValue}
                                </span>
                                <span
                                  className={`text-[11px] tracking-wider transition-opacity duration-200 ${
                                    isActive
                                      ? 'text-neutral-950 dark:text-neutral-50 font-normal'
                                      : 'text-neutral-500 dark:text-neutral-400 font-normal opacity-75 group-hover:opacity-100'
                                  }`}
                                >
                                  ({count})
                                </span>
                              </div>
                            </button>
                          </MagneticElement>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Editorial Archive Composition: Single Continuous Asymmetrical 12-Column Grid */}
          <div
            id="works-gallery-grid"
            key={activeFilter}
            className="grid grid-cols-1 md:grid-cols-12 gap-x-6 md:gap-x-8 lg:gap-x-12 gap-y-16 sm:gap-y-24 md:gap-y-32 lg:gap-y-36 w-full items-start"
          >
            {filteredProjects.map((project, index) => {
              const archetype = getDynamicArchetype(project, index, filteredProjects.length);
              return (
                <div
                  key={`${activeFilter}-${project.id}-${index}`}
                  className={`w-full overflow-visible ${getContainerGridClass(archetype)}`}
                >
                  <ProjectCard
                    project={project}
                    onOpen={handleOpenModal}
                    archetype={archetype}
                    isPriority={index === 0}
                    isHeroFeatured={index === 0}
                    index={index}
                    activeFilter={activeFilter}
                  />
                </div>
              );
            })}
          </div>
        </LayoutGroup>

      </div>
    </section>
  );
}
