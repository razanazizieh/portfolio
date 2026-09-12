import React, { useEffect, useRef, useMemo, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Project } from "../types";
import { MOTION_CURVE_PREMIUM, REVEAL_VIEWPORT_CONFIG } from "../utils/motion";
import { PROJECTS_DATA } from "../data";
import { isProjectMatchingFilter, ProjectFilterCategory } from "../utils/projectFilter";
import PremiumImage from "./PremiumImage";
import MagneticElement from "./MagneticElement";
import DeterministicShuffle from "./DeterministicShuffle";

interface ProjectCaseStudyProps {
  project: Project;
  activeFilter?: ProjectFilterCategory;
  onClose: () => void;
}

export default function ProjectCaseStudy({
  project,
  activeFilter = "ALL",
  onClose,
}: ProjectCaseStudyProps) {
  const shouldReduceMotion = useReducedMotion();
  const navigate = useNavigate();

  // Collect all gallery images safely
  const galleryItems = useMemo(() => {
    if (project.gallery && project.gallery.length > 0) {
      return project.gallery;
    }
    if (project.images && project.images.length > 0) {
      return project.images.map((img, i) => ({
        image: img,
        label: i === 0 ? "Featured View" : `Detail View ${i + 1}`,
      }));
    }
    if (project.image) {
      return [{ image: project.image, label: "Featured View" }];
    }
    return [];
  }, [project]);

  const leadImage = galleryItems[0]?.image || project.image;
  const secondaryImages = galleryItems.slice(1);

  // Filter projects based on active matrix category for internal cycling
  const filteredNavProjects = useMemo(() => {
    if (activeFilter === "ALL") return PROJECTS_DATA;
    return PROJECTS_DATA.filter((p) => isProjectMatchingFilter(p, activeFilter));
  }, [activeFilter]);

  // Determine current active navigation parameters
  const activeIdx = useMemo(() => {
    const idx = filteredNavProjects.findIndex((p) => p.id === project.id);
    if (idx !== -1) return idx;
    return PROJECTS_DATA.findIndex((p) => p.id === project.id);
  }, [filteredNavProjects, project.id]);

  const activeList = useMemo(() => {
    const idx = filteredNavProjects.findIndex((p) => p.id === project.id);
    if (idx !== -1) return filteredNavProjects;
    return PROJECTS_DATA;
  }, [filteredNavProjects, project.id]);

  // Cycle strictly within activeFiltered list using standard modulo logic
  const prevIdx = useMemo(() => {
    const len = activeList.length;
    if (len === 0) return 0;
    return (activeIdx - 1 + len) % len;
  }, [activeList.length, activeIdx]);

  const nextIdx = useMemo(() => {
    const len = activeList.length;
    if (len === 0) return 0;
    return (activeIdx + 1) % len;
  }, [activeList.length, activeIdx]);

  const prevProject = useMemo(() => {
    return activeList[prevIdx] || project;
  }, [activeList, prevIdx, project]);

  const nextProject = useMemo(() => {
    return activeList[nextIdx] || project;
  }, [activeList, nextIdx, project]);

  const lastInteractionTime = useRef(0);

  const handlePrevClick = useCallback(() => {
    const now = Date.now();
    if (now - lastInteractionTime.current < 300) return;
    lastInteractionTime.current = now;

    window.scrollTo(0, 0);
    navigate(`/work/${prevProject.id}`);
  }, [navigate, prevProject.id]);

  const handleNextClick = useCallback(() => {
    const now = Date.now();
    if (now - lastInteractionTime.current < 300) return;
    lastInteractionTime.current = now;

    window.scrollTo(0, 0);
    navigate(`/work/${nextProject.id}`);
  }, [navigate, nextProject.id]);

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
        handlePrevClick();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNextClick();
      }
    };
    window.addEventListener("keydown", handleKeyDownGlobal);
    return () => {
      window.removeEventListener("keydown", handleKeyDownGlobal);
    };
  }, [onClose, handlePrevClick, handleNextClick]);

  return (
    <article
      data-case-study="true"
      data-no-cursor="true"
      itemScope
      itemType="https://schema.org/TechArticle"
      className="relative w-full min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] select-text focus:outline-none flex flex-col overflow-x-hidden font-sans"
    >
      <meta itemProp="author" content="Razan Azizieh" />
      <meta itemProp="datePublished" content="2024-01-15T08:00:00+00:00" />
      <meta itemProp="dateModified" content="2026-09-06T05:07:58+00:00" />
      <meta itemProp="inLanguage" content="en-US" />
      {/* 1. Top Sub-Nav Bar: Instant Return + Contextual Index */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-28 sm:pt-36 md:pt-40 pb-10 sm:pb-14 select-text">
        <motion.div
          initial={
            shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0.01 : 0.65,
            ease: MOTION_CURVE_PREMIUM,
            delay: shouldReduceMotion ? 0 : 0.02,
          }}
          className="flex items-center justify-between font-mono text-xs sm:text-[13px] tracking-[0.16em] uppercase text-neutral-500 dark:text-neutral-400 mb-8 sm:mb-12 select-none"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-neutral-700 dark:text-neutral-300 font-normal">
              {project.category}
            </span>
            <span className="opacity-40">·</span>
            <span>{project.year}</span>
          </div>
        </motion.div>

        {/* 12-Column Asymmetrical Composition matching AboutSection and Contact */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-8 lg:gap-x-12 items-start w-full">
          {/* Left Column (8 cols): Balanced Display Title and Subtitle */}
          <div className="col-span-12 md:col-span-8 lg:col-span-8 flex flex-col gap-5 text-left">
            <motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 18 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: shouldReduceMotion ? 0.01 : 0.75,
                ease: MOTION_CURVE_PREMIUM,
                delay: shouldReduceMotion ? 0 : 0.08,
              }}
              className="w-full"
            >
              <DeterministicShuffle
                text={project.title}
                as="h1"
                className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter uppercase leading-[0.98] text-neutral-900 dark:text-white cursor-pointer"
              />
            </motion.div>

            {project.subtitle && (
              <motion.p
                initial={
                  shouldReduceMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 16 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.75,
                  ease: MOTION_CURVE_PREMIUM,
                  delay: 0.18,
                }}
                className="font-sans text-base sm:text-lg md:text-xl font-light text-neutral-700 dark:text-neutral-300 leading-[1.65] max-w-[52ch]"
              >
                {project.subtitle}
              </motion.p>
            )}
          </div>

          {/* Right Column (4 cols): Restrained Metadata & Typographic Links with sequential staggered reveals */}
          <div className="col-span-12 md:col-span-4 lg:col-span-4 flex flex-col items-start md:items-end text-left md:text-right gap-5 pt-1">
            {/* Disciplines & Roles */}
            {project.myRole && (
              <motion.div
                initial={
                  shouldReduceMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 14 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.65,
                  ease: MOTION_CURVE_PREMIUM,
                  delay: 0.24,
                }}
                className="flex flex-col items-start md:items-end gap-1"
              >
                <span className="font-mono text-xs tracking-[0.14em] uppercase text-neutral-500 dark:text-neutral-400 font-normal">
                  ROLE & DISCIPLINES
                </span>
                <span className="font-sans text-sm sm:text-base text-neutral-800 dark:text-neutral-200">
                  {project.myRole}
                </span>
              </motion.div>
            )}

            {/* Stack & Technologies */}
            {project.technology && project.technology.length > 0 && (
              <motion.div
                initial={
                  shouldReduceMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 14 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.65,
                  ease: MOTION_CURVE_PREMIUM,
                  delay: 0.32,
                }}
                className="flex flex-col items-start md:items-end gap-1"
              >
                <span className="font-mono text-xs tracking-[0.14em] uppercase text-neutral-500 dark:text-neutral-400 font-normal">
                  TECHNOLOGIES
                </span>
                <span className="font-mono text-xs sm:text-[13px] tracking-[0.08em] uppercase text-neutral-700 dark:text-neutral-300">
                  {project.technology.join(" · ")}
                </span>
              </motion.div>
            )}

            {/* Editorial Typographic Links without text scramble */}
            {(project.live || project.repository) && (
              <motion.div
                initial={
                  shouldReduceMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 14 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.65,
                  ease: MOTION_CURVE_PREMIUM,
                  delay: 0.40,
                }}
                className="flex flex-col items-start md:items-end gap-1.5 pt-2"
              >
                <span className="font-mono text-xs tracking-[0.14em] uppercase text-neutral-500 dark:text-neutral-400 font-normal">
                  PROJECT LINKS
                </span>
                <div className="flex flex-col items-start md:items-end gap-1">
                  {project.live && (
                    <MagneticElement strength={0.2} activeScale={1.02}>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open live site for ${project.title} in a new tab`}
                        className="flex items-center py-1 text-neutral-900 dark:text-white hover:text-neutral-500 dark:hover:text-neutral-400 focus:opacity-60 transition-colors duration-200 ease-out focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 cursor-pointer select-none"
                      >
                        <span className="font-display text-base sm:text-lg md:text-xl font-light tracking-tight uppercase inline-block">
                          LIVE SITE
                        </span>
                      </a>
                    </MagneticElement>
                  )}
                  {project.repository && (
                    <MagneticElement strength={0.2} activeScale={1.02}>
                      <a
                        href={project.repository}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open source code repository for ${project.title} in a new tab`}
                        className="flex items-center py-1 text-neutral-900 dark:text-white hover:text-neutral-500 dark:hover:text-neutral-400 focus:opacity-60 transition-colors duration-200 ease-out focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 cursor-pointer select-none"
                      >
                        <span className="font-display text-base sm:text-lg md:text-xl font-light tracking-tight uppercase inline-block">
                          SOURCE CODE
                        </span>
                      </a>
                    </MagneticElement>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Hero Lead Showcase: Seamless Image Presentation */}
      {leadImage && (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 my-6 sm:my-10 md:my-14 text-left select-none">
          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0.01 : 0.85,
              ease: MOTION_CURVE_PREMIUM,
              delay: shouldReduceMotion ? 0 : 0.44,
            }}
            className="w-full"
          >
            <PremiumImage
              src={leadImage}
              alt={`${project.title} — Primary View`}
              borderNone={true}
              isPriority={true}
              className="w-full h-auto object-cover object-top"
            />
          </motion.div>
        </section>
      )}

      {/* 3. Editorial Narrative: 12-Column Asymmetrical Grid with standardized vertical spacing */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-20 sm:py-32 select-text">
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-y-12 sm:gap-y-16 md:gap-y-20 md:gap-x-8 lg:gap-x-12 items-start text-left">
          {/* Primary Statement: Overview with Direct Answer Architecture */}
          {project.overview && (
            <div className="col-span-12 md:col-span-11 lg:col-span-10">
              <motion.div
                initial={
                  shouldReduceMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 18 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={REVEAL_VIEWPORT_CONFIG}
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.75,
                  ease: MOTION_CURVE_PREMIUM,
                }}
                className="flex flex-col gap-4"
              >
                <span className="font-mono text-xs sm:text-[13px] tracking-[0.16em] uppercase text-neutral-500 dark:text-neutral-400 font-normal">
                  PROJECT OVERVIEW
                </span>
                <h2
                  className="font-display text-xl sm:text-2xl md:text-3xl font-light tracking-tighter uppercase leading-[1.2] text-neutral-900 dark:text-white"
                  itemProp="description"
                >
                  {project.overview}
                </h2>
                {/* Direct Answer First Paragraph */}
                <p className="font-sans text-base sm:text-lg text-neutral-700 dark:text-neutral-300 font-light leading-[1.7] max-w-[65ch]">
                  <strong className="font-normal text-neutral-900 dark:text-white">
                    {project.title}
                  </strong>{" "}
                  is an interactive{" "}
                  <strong className="font-normal text-neutral-900 dark:text-white">
                    {project.projectType || project.category}
                  </strong>{" "}
                  built using{" "}
                  <strong className="font-normal text-neutral-900 dark:text-white">
                    {project.technology?.join(", ")}
                  </strong>
                  . Engineered with attention to tactile feel, responsive interaction, and structural stability across devices.
                </p>
              </motion.div>
            </div>
          )}

          {/* Staggered Editorial Blocks: The Challenge and Solution with Query-Framed Headings */}
          {project.challenge && (
            <div className="col-span-12 md:col-span-7 lg:col-span-6">
              <motion.div
                initial={
                  shouldReduceMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 18 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={REVEAL_VIEWPORT_CONFIG}
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.75,
                  ease: MOTION_CURVE_PREMIUM,
                  delay: shouldReduceMotion ? 0 : 0.1,
                }}
                className="flex flex-col gap-3"
              >
                <span className="font-mono text-xs sm:text-[13px] tracking-[0.16em] uppercase text-neutral-500 dark:text-neutral-400 font-normal">
                  CHALLENGE
                </span>
                <h3 className="font-display text-lg sm:text-xl font-light tracking-tight uppercase text-neutral-900 dark:text-white leading-[1.2]">
                  THE CHALLENGE
                </h3>
                <p className="font-sans text-base sm:text-lg font-light text-neutral-700 dark:text-neutral-300 leading-[1.7] max-w-[48ch]">
                  <strong className="text-neutral-900 dark:text-white font-normal">
                    Challenge:{" "}
                  </strong>
                  {project.challenge}
                </p>
              </motion.div>
            </div>
          )}

          {project.solution && (
            <div className="col-span-12 md:col-span-5 lg:col-span-5 md:col-start-8 lg:col-start-8">
              <motion.div
                initial={
                  shouldReduceMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 18 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={REVEAL_VIEWPORT_CONFIG}
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.75,
                  ease: MOTION_CURVE_PREMIUM,
                  delay: shouldReduceMotion ? 0 : 0.18,
                }}
                className="flex flex-col gap-3"
              >
                <span className="font-mono text-xs sm:text-[13px] tracking-[0.16em] uppercase text-neutral-500 dark:text-neutral-400 font-normal">
                  APPROACH
                </span>
                <h3 className="font-display text-lg sm:text-xl font-light tracking-tight uppercase text-neutral-900 dark:text-white leading-[1.2]">
                  THE APPROACH
                </h3>
                <p className="font-sans text-base sm:text-lg font-light text-neutral-700 dark:text-neutral-300 leading-[1.7] max-w-[44ch]">
                  <strong className="text-neutral-900 dark:text-white font-normal">
                    Approach:{" "}
                  </strong>
                  {project.solution}
                </p>
              </motion.div>
            </div>
          )}

          {/* Technical Highlights: Clean Sequence with Ordered List */}
          {project.technicalHighlights &&
            project.technicalHighlights.length > 0 && (
              <div className="col-span-12 md:col-span-10 lg:col-span-9 pt-2 sm:pt-4">
                <motion.div
                  initial={
                    shouldReduceMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 18 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={REVEAL_VIEWPORT_CONFIG}
                  transition={{
                    duration: shouldReduceMotion ? 0.01 : 0.75,
                    ease: MOTION_CURVE_PREMIUM,
                  }}
                  className="flex flex-col gap-4"
                >
                  <span className="font-mono text-xs sm:text-[13px] tracking-[0.16em] uppercase text-neutral-500 dark:text-neutral-400 font-normal">
                    TECHNICAL HIGHLIGHTS
                  </span>
                  <h3 className="font-display text-lg sm:text-xl font-light tracking-tight uppercase text-neutral-900 dark:text-white leading-[1.2]">
                    KEY HIGHLIGHTS
                  </h3>
                  <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 sm:gap-y-6 list-none p-0">
                    {project.technicalHighlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3.5 text-left"
                      >
                        <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 mt-1 select-none font-normal min-w-[20px]">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <p className="font-sans text-base font-light text-neutral-700 dark:text-neutral-300 leading-[1.65]">
                          {highlight}
                        </p>
                      </li>
                    ))}
                  </ol>
                </motion.div>
              </div>
            )}

          {/* Impact & Outcome */}
          {project.impact && (
            <div className="col-span-12 md:col-span-8 lg:col-span-7 pt-2">
              <motion.div
                initial={
                  shouldReduceMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 18 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={REVEAL_VIEWPORT_CONFIG}
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.75,
                  ease: MOTION_CURVE_PREMIUM,
                }}
                className="flex flex-col gap-3"
              >
                <span className="font-mono text-xs sm:text-[13px] tracking-[0.16em] uppercase text-neutral-500 dark:text-neutral-400 font-normal">
                  OUTCOME
                </span>
                <h3 className="font-display text-lg sm:text-xl font-light tracking-tight uppercase text-neutral-900 dark:text-white leading-[1.2]">
                  OUTCOME
                </h3>
                <p className="font-sans text-base sm:text-lg font-light text-neutral-700 dark:text-neutral-300 leading-[1.7]">
                  <strong className="text-neutral-900 dark:text-white font-normal">
                    Outcome:{" "}
                  </strong>
                  {project.impact}
                </p>
              </motion.div>
            </div>
          )}

          {/* Empirical Technical Specifications Table: Clean Swiss borderless alignment */}
          {project.technicalSpecifications &&
            project.technicalSpecifications.length > 0 && (
              <div className="col-span-12 pt-8 sm:pt-14">
                <div className="flex items-center justify-between font-mono text-xs sm:text-[13px] tracking-[0.16em] uppercase text-neutral-500 dark:text-neutral-400 font-normal mb-6">
                  <span>TECHNICAL SPECIFICATIONS</span>
                  <span className="hidden sm:inline">STANDARDS</span>
                </div>
                <div className="overflow-x-auto w-full">
                  <table className="w-full text-left font-sans border-collapse">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3 pr-4 font-mono text-xs uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400 font-normal"
                        >
                          Parameter
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-4 font-mono text-xs uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400 font-normal"
                        >
                          Engineering Specification
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-4 font-mono text-xs uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400 font-normal"
                        >
                          Verified Metric
                        </th>
                        <th
                          scope="col"
                          className="py-3 pl-4 font-mono text-xs uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400 font-normal hidden md:table-cell"
                        >
                          Standard
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm sm:text-[15px]">
                      {project.technicalSpecifications.map((spec, idx) => (
                        <tr key={idx}>
                          <td className="py-3.5 pr-4 font-normal text-neutral-900 dark:text-neutral-100">
                            {spec.parameter}
                          </td>
                          <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400">
                            {spec.specification}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-xs sm:text-[13px] text-neutral-900 dark:text-neutral-100 font-normal">
                            {spec.metric}
                          </td>
                          <td className="py-3.5 pl-4 font-mono text-xs text-neutral-500 dark:text-neutral-400 hidden md:table-cell">
                            {spec.standard}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          {/* Technical FAQ Section for Google AI Overview (GEO/SGE) Scraper Extraction */}
          {project.faq && project.faq.length > 0 && (
            <div className="col-span-12 pt-6 sm:pt-10">
              <span className="font-mono text-xs sm:text-[13px] tracking-[0.16em] uppercase text-neutral-500 dark:text-neutral-400 font-normal block mb-6">
                FREQUENTLY ASKED ARCHITECTURAL QUESTIONS
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {project.faq.map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-2 text-left">
                    <h4 className="font-display text-base sm:text-lg font-light tracking-tight uppercase text-neutral-950 dark:text-neutral-50 leading-[1.3]">
                      {item.question}
                    </h4>
                    <p className="font-sans text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-[1.65]">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Secondary Artifact Gallery: Clean Visual Progression */}
      {secondaryImages.length > 0 && (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pb-20 sm:pb-32 text-left select-none">
          <div className="flex flex-col gap-16 sm:gap-24 md:gap-28">
            {secondaryImages.map((item, idx) => (
              <motion.div
                key={item.image || idx}
                initial={
                  shouldReduceMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 18 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={REVEAL_VIEWPORT_CONFIG}
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.75,
                  ease: MOTION_CURVE_PREMIUM,
                }}
                className={
                  secondaryImages.length > 1 && idx === 1
                    ? "w-full lg:max-w-5xl lg:mx-auto"
                    : "w-full"
                }
              >
                <PremiumImage
                  src={item.image}
                  alt={`${project.title} — ${item.label}`}
                  borderNone={true}
                  className="w-full h-auto object-cover object-top"
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Editorial Footer & Project Cycle Navigation */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pb-20 select-none">
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-16 sm:pt-24 pb-6">
          {/* Previous Project Trigger */}
          <MagneticElement strength={0.2} activeScale={1.02}>
            <button
              onClick={handlePrevClick}
              aria-label={`Navigate to previous project: ${prevProject.title}`}
              className="group py-2 bg-transparent border-none outline-none cursor-pointer text-left min-h-[44px] flex items-center"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-normal group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors duration-200 block select-none">
                PREV
              </span>
            </button>
          </MagneticElement>

          {/* Next Project Trigger */}
          <MagneticElement strength={0.2} activeScale={1.02}>
            <button
              onClick={handleNextClick}
              aria-label={`Navigate to next project: ${nextProject.title}`}
              className="group py-2 bg-transparent border-none outline-none cursor-pointer text-left sm:text-right min-h-[44px] flex items-center"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-normal group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors duration-200 block select-none">
                NEXT
              </span>
            </button>
          </MagneticElement>
        </div>
      </footer>
    </article>
  );
}
