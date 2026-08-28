import React, { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useNavigate } from "react-router-dom";
import { Project } from "../types";
import {
  MOTION_CURVE_PREMIUM,
  motionRoles,
  VIEWPORT_EDITORIAL_CONFIG,
} from "../utils/motion";
import { PROJECTS_DATA } from "../data";
import PremiumImage from "./PremiumImage";
import RevealHeading from "./RevealHeading";

function ScrollLitCaseStudyParagraph({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={className}>{children}</p>;
}

interface ProjectCaseStudyProps {
  project: Project;
  activeFilter?: "ALL" | "FULL-STACK" | "CODE" | "UI";
  onClose: () => void;
}

export default function ProjectCaseStudy({
  project,
  activeFilter = "ALL",
  onClose,
}: ProjectCaseStudyProps) {
  const shouldReduceMotion = useReducedMotion();
  const navigate = useNavigate();

  // Conditional check to identify projects categorized as "code-centric" or "back-end"
  const isCodeCentric = project.category === "CODE";

  // Collect all images safely for lightbox viewing, handling both string paths and object configurations
  const allImages = React.useMemo(() => {
    const list: { image: string; label: string }[] = [];
    if (project.image) {
      list.push({ image: project.image, label: "Featured Hero Specimen" });
    } /*
    if (project.gallery) {
      project.gallery.forEach((g, idx) => {
        if (!g) return;
        const imgUrl = typeof g === 'string' ? g : g.image;
        const imgLabel = typeof g === 'string' ? `Specimen View ${idx + 1}` : g.label;

        if (imgUrl && imgUrl !== project.image) {
          list.push({ image: imgUrl, label: imgLabel });
        }
      });
    }*/
    return list;
  }, [project]);

  // Filter projects based on active matrix category for internal cycling
  const filteredNavProjects = React.useMemo(() => {
    if (activeFilter === "ALL") return PROJECTS_DATA;
    return PROJECTS_DATA.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  // Determine current active navigation parameters
  const activeIdx = React.useMemo(() => {
    const idx = filteredNavProjects.findIndex((p) => p.id === project.id);
    if (idx !== -1) return idx;
    return PROJECTS_DATA.findIndex((p) => p.id === project.id);
  }, [filteredNavProjects, project.id]);

  const activeList = React.useMemo(() => {
    const idx = filteredNavProjects.findIndex((p) => p.id === project.id);
    if (idx !== -1) return filteredNavProjects;
    return PROJECTS_DATA;
  }, [filteredNavProjects, project.id]);

  // Cycle strictly and internally within activeFiltered list using standard mathematical modulo
  const prevProject = React.useMemo(() => {
    const len = activeList.length;
    if (len === 0) return project;
    const prevIdx = (activeIdx - 1 + len) % len;
    return activeList[prevIdx];
  }, [activeList, activeIdx, project]);

  const nextProject = React.useMemo(() => {
    const len = activeList.length;
    if (len === 0) return project;
    const nextIdx = (activeIdx + 1) % len;
    return activeList[nextIdx];
  }, [activeList, activeIdx, project]);

  const lastInteractionTime = useRef(0);

  const handlePrevClick = () => {
    const now = Date.now();
    if (now - lastInteractionTime.current < 300) return;
    lastInteractionTime.current = now;

    window.scrollTo(0, 0);
    navigate(`/project/${prevProject.id}`);
  };

  const handleNextClick = () => {
    const now = Date.now();
    if (now - lastInteractionTime.current < 300) return;
    lastInteractionTime.current = now;

    window.scrollTo(0, 0);
    navigate(`/project/${nextProject.id}`);
  };

  // Scroll to top on mount or when project changes and manage dynamic document titles
  useEffect(() => {
    window.scrollTo(0, 0);
    const originalTitle = document.title;
    document.title = `${project.title.toUpperCase()} — RAZAN AZIZIEH`;
    return () => {
      document.title = originalTitle;
    };
  }, [project.id, project.title]);

  // Keyboard navigation mapping
  useEffect(() => {
    const handleKeyDownGlobal = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        window.scrollTo(0, 0);
        navigate(`/project/${prevProject.id}`);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        window.scrollTo(0, 0);
        navigate(`/project/${nextProject.id}`);
      }
    };
    window.addEventListener("keydown", handleKeyDownGlobal);
    return () => {
      window.removeEventListener("keydown", handleKeyDownGlobal);
    };
  }, [onClose, navigate, prevProject.id, nextProject.id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
      transition={{ duration: 0.55, ease: MOTION_CURVE_PREMIUM }}
      className="relative w-full min-h-screen bg-[var(--bg-color)] select-text focus:outline-none flex flex-col overflow-x-hidden"
    >
      {/* Editorial Page Container */}
      <div
        style={{
          paddingLeft: "max(20px, 4vw)",
          paddingRight: "max(20px, 4vw)",
        }}
        className="w-full max-w-4xl mx-auto px-0 sm:px-4 md:px-8 pb-32 pt-24 sm:pt-32 flex-1 flex flex-col gap-16 md:gap-24"
      >
        {/* • HERO HEADER SECTION */}
        <section className="flex flex-col gap-6 text-left">
          <motion.div
            variants={motionRoles.metaLabel(0.05)}
            initial="hidden"
            animate="visible"
            className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.12em] leading-none text-neutral-500 dark:text-neutral-400 flex items-center gap-2 font-medium"
          >
            <span>{project.category}</span>
            <span className="opacity-40">/</span>
            <span>{project.year}</span>
          </motion.div>

          <div className="flex flex-col gap-4">
            <div className="w-full">
              <RevealHeading
                text={project.title}
                as="h1"
                className="font-display text-3xl sm:text-4xl md:text-[3rem] font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 uppercase leading-[1.05]"
                triggerStart="top 95%"
              />
            </div>

            {project.subtitle && (
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: MOTION_CURVE_PREMIUM,
                  delay: 0.15,
                }}
                className="font-sans text-base sm:text-lg font-normal text-neutral-600 dark:text-neutral-400 leading-[1.65] max-w-[62ch]"
              >
                {project.subtitle}
              </motion.p>
            )}

            {(project.live || project.repository) && (
              <motion.div
                variants={motionRoles.interactiveButton(0.24)}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-6 flex-wrap mt-4 pt-1"
              >
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open live site for ${project.title}`}
                    className="font-mono text-[11px] tracking-[0.14em] uppercase font-medium text-neutral-950 dark:text-neutral-50 hover:opacity-60 focus:opacity-60 transition-opacity duration-150 ease-out focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 py-1 cursor-pointer select-none"
                  >
                    LIVE SITE
                  </a>
                )}

                {project.repository && (
                  <a
                    href={project.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open GitHub repository for ${project.title}`}
                    className="font-mono text-[11px] tracking-[0.14em] uppercase font-medium text-neutral-950 dark:text-neutral-50 hover:opacity-60 focus:opacity-60 transition-opacity duration-150 ease-out focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 py-1 cursor-pointer select-none"
                  >
                    SOURCE CODE
                  </a>
                )}
              </motion.div>
            )}
          </div>

          {/* Main Visual Showcase: Vertical Image Stack */}
          {!isCodeCentric && allImages.length > 0 && (
            <div className="w-full flex flex-col gap-16 sm:gap-24 my-8 sm:my-12">
              {allImages.map((item, idx) => (
                <motion.figure
                  key={item.image || idx}
                  variants={motionRoles.editorialImage(0, shouldReduceMotion)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT_EDITORIAL_CONFIG}
                  className="w-full flex flex-col gap-3 group/editorial rounded-none cursor-default select-none"
                >
                  <div className="w-full rounded-none overflow-hidden border-none outline-none shadow-none bg-transparent">
                    <PremiumImage
                      src={item.image}
                      alt={`${project.title} — ${item.label}`}
                      borderNone={true}
                      isPriority={idx === 0}
                      className="rounded-none transition-transform duration-700 ease-out group-hover/editorial:scale-[1.012] object-contain object-top w-full h-auto"
                    />
                  </div>
                  <figcaption className="flex items-center mt-1 px-0 font-mono text-[10px] sm:text-[11px] tracking-[0.12em] uppercase text-neutral-400 dark:text-neutral-500 font-medium">
                    FIG. {String(idx + 1).padStart(2, "0")} —{" "}
                    {item.label.toUpperCase()}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          )}
        </section>

        {/* • OVERVIEW */}
        {project.overview && (
          <section className="flex flex-col gap-3 text-left">
            <div>
              <motion.h2
                initial={{
                  opacity: shouldReduceMotion ? 1 : 0,
                  y: shouldReduceMotion ? 0 : 20,
                }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_EDITORIAL_CONFIG}
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.6,
                  ease: MOTION_CURVE_PREMIUM,
                }}
                className="font-mono text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-medium tracking-[0.12em] leading-none uppercase block mb-1"
              >
                OVERVIEW
              </motion.h2>
            </div>
            <ScrollLitCaseStudyParagraph className="font-sans text-base sm:text-lg font-normal text-neutral-700 dark:text-neutral-300 leading-[1.72] max-w-[62ch]">
              {project.overview}
            </ScrollLitCaseStudyParagraph>
          </section>
        )}

        {/* • CHALLENGE */}
        {project.challenge && (
          <section className="flex flex-col gap-3 text-left">
            <div>
              <motion.h2
                initial={{
                  opacity: shouldReduceMotion ? 1 : 0,
                  y: shouldReduceMotion ? 0 : 20,
                }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_EDITORIAL_CONFIG}
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.6,
                  ease: MOTION_CURVE_PREMIUM,
                }}
                className="font-mono text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-medium tracking-[0.12em] leading-none uppercase block mb-1"
              >
                CHALLENGE
              </motion.h2>
            </div>
            <ScrollLitCaseStudyParagraph className="font-sans text-base sm:text-lg font-normal text-neutral-700 dark:text-neutral-300 leading-[1.72] max-w-[62ch]">
              {project.challenge}
            </ScrollLitCaseStudyParagraph>
          </section>
        )}

        {/* • SOLUTION */}
        {project.solution && (
          <section className="flex flex-col gap-3 text-left">
            <div>
              <motion.h2
                initial={{
                  opacity: shouldReduceMotion ? 1 : 0,
                  y: shouldReduceMotion ? 0 : 20,
                }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_EDITORIAL_CONFIG}
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.6,
                  ease: MOTION_CURVE_PREMIUM,
                }}
                className="font-mono text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-medium tracking-[0.12em] leading-none uppercase block mb-1"
              >
                SOLUTION
              </motion.h2>
            </div>
            <ScrollLitCaseStudyParagraph className="font-sans text-base sm:text-lg font-normal text-neutral-700 dark:text-neutral-300 leading-[1.72] max-w-[62ch]">
              {project.solution}
            </ScrollLitCaseStudyParagraph>
          </section>
        )}

        {/* • MY ROLE */}
        {project.myRole && (
          <section className="flex flex-col gap-3 text-left">
            <div>
              <motion.h2
                initial={{
                  opacity: shouldReduceMotion ? 1 : 0,
                  y: shouldReduceMotion ? 0 : 20,
                }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_EDITORIAL_CONFIG}
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.6,
                  ease: MOTION_CURVE_PREMIUM,
                }}
                className="font-mono text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-medium tracking-[0.12em] leading-none uppercase block mb-1"
              >
                MY ROLE
              </motion.h2>
            </div>
            <ScrollLitCaseStudyParagraph className="font-sans text-base sm:text-lg font-normal text-neutral-700 dark:text-neutral-300 leading-[1.72] max-w-[62ch]">
              {project.myRole}
            </ScrollLitCaseStudyParagraph>
          </section>
        )}

        {/* • TECHNICAL HIGHLIGHTS */}
        {project.technicalHighlights &&
          project.technicalHighlights.length > 0 && (
            <section className="flex flex-col gap-3 text-left">
              <div>
                <motion.h2
                  initial={{
                    opacity: shouldReduceMotion ? 1 : 0,
                    y: shouldReduceMotion ? 0 : 20,
                  }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_EDITORIAL_CONFIG}
                  transition={{
                    duration: shouldReduceMotion ? 0.01 : 0.6,
                    ease: MOTION_CURVE_PREMIUM,
                  }}
                  className="font-mono text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-medium tracking-[0.12em] leading-none uppercase block mb-1"
                >
                  TECHNICAL HIGHLIGHTS
                </motion.h2>
              </div>
              <ul className="flex flex-col gap-2.5 max-w-[62ch] pl-4 list-disc text-neutral-700 dark:text-neutral-300">
                {project.technicalHighlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    className="font-sans text-base sm:text-lg font-normal leading-[1.72]"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            </section>
          )}

        {/* • TECHNOLOGY */}
        {project.technology && project.technology.length > 0 && (
          <section className="flex flex-col gap-3 text-left">
            <div>
              <motion.h2
                initial={{
                  opacity: shouldReduceMotion ? 1 : 0,
                  y: shouldReduceMotion ? 0 : 20,
                }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_EDITORIAL_CONFIG}
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.6,
                  ease: MOTION_CURVE_PREMIUM,
                }}
                className="font-mono text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-medium tracking-[0.12em] leading-none uppercase block mb-1"
              >
                TECHNOLOGY
              </motion.h2>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2.5 max-w-[62ch]">
              {project.technology.map((tech, idx) => (
                <motion.span
                  key={idx}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: shouldReduceMotion ? 0 : 15,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.55,
                        ease: MOTION_CURVE_PREMIUM,
                        delay: idx * 0.02,
                      },
                    },
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT_EDITORIAL_CONFIG}
                  className="font-mono text-xs sm:text-sm font-normal flex items-center text-neutral-950 dark:text-neutral-50 tracking-[0.08em]"
                >
                  {tech}
                  {idx < project.technology.length - 1 && (
                    <span className="ml-6 text-neutral-400 dark:text-neutral-600 font-normal">
                      /
                    </span>
                  )}
                </motion.span>
              ))}
            </div>
          </section>
        )}

        {/* • IMPACT */}
        {project.impact && (
          <section className="flex flex-col gap-3 text-left">
            <div>
              <motion.h2
                initial={{
                  opacity: shouldReduceMotion ? 1 : 0,
                  y: shouldReduceMotion ? 0 : 20,
                }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_EDITORIAL_CONFIG}
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.6,
                  ease: MOTION_CURVE_PREMIUM,
                }}
                className="font-mono text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-medium tracking-[0.12em] leading-none uppercase block mb-1"
              >
                IMPACT
              </motion.h2>
            </div>
            <ScrollLitCaseStudyParagraph className="font-sans text-base sm:text-lg font-normal text-neutral-700 dark:text-neutral-300 leading-[1.72] max-w-[62ch]">
              {project.impact}
            </ScrollLitCaseStudyParagraph>
          </section>
        )}

        {/* Editorial Bottom Navigation */}
        <div className="mt-16 sm:mt-24 select-none pt-8 border-t border-neutral-200/40 dark:border-neutral-800/40">
          <div className="flex items-center justify-between gap-4 sm:gap-6 w-full">
            {/* Previous Project Link */}
            <button
              onPointerDown={(e) => {
                if (e.button === 0) {
                  e.preventDefault();
                  handlePrevClick();
                }
              }}
              onClick={(e) => {
                if (e.clientX === 0 && e.clientY === 0) {
                  handlePrevClick();
                }
              }}
              aria-label={`Go to previous project: ${prevProject.title}`}
              className="font-mono font-medium text-xs tracking-[0.14em] uppercase text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50 focus:text-neutral-950 dark:focus:text-neutral-50 transition-colors duration-150 ease-out focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 cursor-pointer flex items-center gap-2 bg-transparent border-none outline-none py-1 select-none whitespace-nowrap group"
            >
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 group-hover:-translate-x-1"
              >
                &larr;
              </span>
              <span>PREVIOUS</span>
            </button>

            {/* Next Project Link */}
            <button
              onPointerDown={(e) => {
                if (e.button === 0) {
                  e.preventDefault();
                  handleNextClick();
                }
              }}
              onClick={(e) => {
                if (e.clientX === 0 && e.clientY === 0) {
                  handleNextClick();
                }
              }}
              aria-label={`Go to next project: ${nextProject.title}`}
              className="font-mono font-medium text-xs tracking-[0.14em] uppercase text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50 focus:text-neutral-950 dark:focus:text-neutral-50 transition-colors duration-150 ease-out focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 cursor-pointer flex items-center gap-2 bg-transparent border-none outline-none py-1 select-none whitespace-nowrap group"
            >
              <span>NEXT</span>
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
