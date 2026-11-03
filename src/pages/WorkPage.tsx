/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { PROJECTS, type Project } from "../data/projects";
import GeometricPattern from "../components/GeometricPattern";
import TS from "../components/TS";
import Words from "../components/Words";

/**
 * Scalable Work (Projects) Page (/work)
 * - Heading: "Work (n)" at --t-title; 64px below it the grid
 * - First project: full width (12 cols), 16:9 image, title on left, year on right
 * - Other projects: 2 columns (cols 1-6 & 7-12 from 768px; 1 col below)
 * - 64px between rows, 24px gap-x, 16px between image and title
 * - Text block min-height 64px with <TS> on title
 * - Images clip reveal, text blocks rising, 100ms between consecutive cards
 * - Filter: shown only when total projects >= 8
 */
export default function WorkPage() {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const allProjects = PROJECTS;
  const showFilters = allProjects.length >= 8;

  // Distinct tags collected from all projects
  const distinctTags = useMemo(() => {
    if (!showFilters) return [];
    const tagsSet = new Set<string>();
    allProjects.forEach((proj) => {
      proj.tags?.forEach((tag) => {
        if (tag.trim()) tagsSet.add(tag.trim());
      });
    });
    return Array.from(tagsSet);
  }, [allProjects, showFilters]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (!showFilters || selectedTag === "All") {
      return allProjects;
    }
    return allProjects.filter((p) => p.tags?.includes(selectedTag));
  }, [allProjects, showFilters, selectedTag]);

  const handleImageError = (slug: string) => {
    setImageErrors((prev) => ({ ...prev, [slug]: true }));
  };

  const firstProject: Project | undefined = filteredProjects[0];
  const otherProjects: Project[] = filteredProjects.slice(1);

  return (
    <div className="w-full min-h-screen max-w-[1600px] mx-auto px-6 md:px-12 pt-32 pb-24">
      <Helmet>
        <title>Work, Razan Azizieh</title>
        <meta
          name="description"
          content="Selected and complete front-end engineering projects, interfaces, and web systems by Razan Azizieh."
        />
        <meta property="og:title" content="Work, Razan Azizieh" />
        <meta
          property="og:description"
          content="Selected and complete front-end engineering projects, interfaces, and web systems by Razan Azizieh."
        />
      </Helmet>

      {/* Header with Words reveal: "Work (n)" at --t-title */}
      <header
        data-reveal-group
        data-reveal-id="work-page-heading"
        data-reveal-at="0.8"
        className={showFilters ? "mb-8" : "mb-16"}
      >
        <Words
          as="h1"
          text={`Work (${filteredProjects.length})`}
          delay={0}
          className="t-title text-[var(--ink)]"
        />
      </header>

      {/* Filter Row: rendered ONLY when total projects >= 8 */}
      {showFilters && (
        <nav
          aria-label="Filter projects by tag"
          data-reveal-group
          data-reveal-id="work-page-filters"
          data-reveal-at="0.8"
          className="flex flex-wrap items-center gap-[24px] mb-16 t-ui text-[var(--ink)]"
        >
          <button
            type="button"
            onClick={() => setSelectedTag("All")}
            className="bg-transparent border-none p-0 cursor-pointer text-inherit"
          >
            <TS active={selectedTag === "All"}>All</TS>
          </button>
          {distinctTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag)}
              className="bg-transparent border-none p-0 cursor-pointer text-inherit"
            >
              <TS active={selectedTag === tag}>{tag}</TS>
            </button>
          ))}
        </nav>
      )}

      {/* 12-column Grid: 24px gap-x, 64px gap-y */}
      <section aria-label="Projects list" className="grid grid-cols-12 gap-x-[24px] gap-y-[64px] w-full">
        {/* First Project: full width (12 cols) */}
        {firstProject && (
          <article
            key={firstProject.slug}
            data-reveal-group
            data-reveal-id={`work-card-${firstProject.slug}`}
            data-reveal-at="0.85"
            className="col-span-12"
          >
            <Link
              to={`/work/${firstProject.slug}`}
              aria-label={`View project: ${firstProject.title}`}
              className="group block w-full no-underline cursor-pointer"
            >
              {/* 16:9 Image container */}
              <div
                className="w-full aspect-[16/9] overflow-hidden bg-[#ECEAE4] relative isolate work-card-media"
                style={{
                  width: "100%",
                  aspectRatio: "16 / 9",
                  overflow: "hidden",
                  "--d": "0ms",
                } as React.CSSProperties}
              >
                <div className="absolute inset-0 z-0 bg-[#ECEAE4]">
                  <GeometricPattern seed={firstProject.patternSeed || firstProject.slug} />
                </div>
                {firstProject.image && !imageErrors[firstProject.slug] ? (
                  <img
                    src={firstProject.image}
                    alt={firstProject.title}
                    width={1600}
                    height={900}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    onError={() => handleImageError(firstProject.slug)}
                    className="relative z-10 w-full h-full object-cover object-center"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      transform: "none",
                      filter: "none",
                    }}
                  />
                ) : null}
              </div>

              {/* Text block: 16px below image, min-height 64px, title on left, year on right */}
              <div
                data-reveal-child
                style={{ "--d": "80ms" } as React.CSSProperties}
                className="pt-4 flex items-baseline justify-between gap-4 min-h-[64px]"
              >
                <h2 className="t-item text-[var(--ink)]">
                  <TS>{firstProject.title}</TS>
                </h2>
                <span className="t-meta text-[var(--ink-2)] flex-shrink-0">
                  {firstProject.year}
                </span>
              </div>
            </Link>
          </article>
        )}

        {/* Other Projects: 2 columns (cols 1-6 and 7-12 from 768px; 1 col below) */}
        {otherProjects.map((proj, idx) => {
          const cardIndex = idx + 1;
          const cardDelay = cardIndex * 100;

          return (
            <article
              key={proj.slug}
              data-reveal-group
              data-reveal-id={`work-card-${proj.slug}`}
              data-reveal-at="0.85"
              className="col-span-12 md:col-span-6"
            >
              <Link
                to={`/work/${proj.slug}`}
                aria-label={`View project: ${proj.title}`}
                className="group block w-full no-underline cursor-pointer"
              >
                {/* 16:9 Image container */}
                <div
                  className="w-full aspect-[16/9] overflow-hidden bg-[#ECEAE4] relative isolate work-card-media"
                  style={{
                    width: "100%",
                    aspectRatio: "16 / 9",
                    overflow: "hidden",
                    "--d": `${cardDelay}ms`,
                  } as React.CSSProperties}
                >
                  <div className="absolute inset-0 z-0 bg-[#ECEAE4]">
                    <GeometricPattern seed={proj.patternSeed || proj.slug} />
                  </div>
                  {proj.image && !imageErrors[proj.slug] ? (
                    <img
                      src={proj.image}
                      alt={proj.title}
                      width={1600}
                      height={900}
                      loading="lazy"
                      decoding="async"
                      onError={() => handleImageError(proj.slug)}
                      className="relative z-10 w-full h-full object-cover object-center"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        transform: "none",
                        filter: "none",
                      }}
                    />
                  ) : null}
                </div>

                {/* Text block: 16px below image, min-height 64px */}
                <div
                  data-reveal-child
                  style={{ "--d": `${cardDelay + 80}ms` } as React.CSSProperties}
                  className="pt-4 flex flex-col gap-2 min-h-[64px]"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h2
                      className="t-item text-[var(--ink)]"
                      style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)" }}
                    >
                      <TS>{proj.title}</TS>
                    </h2>
                    <span className="t-meta text-[var(--ink-2)] flex-shrink-0">
                      {proj.year}
                    </span>
                  </div>
                  <p className="t-body text-[var(--ink-2)] max-w-[40ch]">
                    {proj.description}
                  </p>
                  <div className="t-meta text-[var(--ink-2)]">
                    {proj.stack.join(", ")}
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </section>
    </div>
  );
}

export { WorkPage };
