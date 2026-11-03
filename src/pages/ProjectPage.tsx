/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { PROJECTS, getProjectBySlug, type Project } from "../data/projects";
import NotFound from "./NotFound";
import GeometricPattern from "../components/GeometricPattern";
import TS from "../components/TS";
import Words from "../components/Words";
import { isFilled } from "../lib/isFilled";
import { useReducedMotion } from "../hooks/useReducedMotion";

const pad = (v: number) => String(v).padStart(2, "0");

function cleanText(str?: string): string {
  if (!str) return "";
  return str.trim();
}

/**
 * Case Study Detail Page (/work/:slug)
 * - Header group: "All work" 0; title words +100; meta items +300 (60 apart); summary words +450; links +700
 * - Hero media: clip reveal on mount (1100ms)
 * - Overview group: label +0, text +120
 * - What I built group: label +0, each item 120ms apart
 * - More work group: label +0, each title 120ms apart
 */
export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const project = getProjectBySlug(slug);

  useEffect(() => {
    if (!project?.video?.src || shouldReduceMotion || videoError) return;
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoEl.play().catch(() => {});
        } else {
          videoEl.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(videoEl);
    return () => observer.disconnect();
  }, [project, shouldReduceMotion, videoError]);

  if (!project) {
    return <NotFound />;
  }

  const currentIndex = PROJECTS.findIndex((p) => p.slug === project.slug);
  const totalProjects = PROJECTS.length;
  const otherProjects: Project[] = [];
  for (let i = 1; i < totalProjects; i++) {
    const idx = (currentIndex + i) % totalProjects;
    otherProjects.push(PROJECTS[idx]);
  }

  const hasVideo = Boolean(project.video?.src && isFilled(project.video.src));
  const summaryText = cleanText(
    isFilled(project.summary)
      ? project.summary
      : project.description
  );

  const rawOverview = isFilled(project.longDescription)
    ? project.longDescription
    : project.overview;
  const overviewText = cleanText(rawOverview);
  const isOverviewIdenticalToSummary =
    overviewText.trim().toLowerCase() === summaryText.trim().toLowerCase();
  const shouldShowOverview =
    isFilled(overviewText) && !isOverviewIdenticalToSummary;

  const isValidUrl = (url?: string) => {
    if (!url) return false;
    const trimmed = url.trim();
    return (
      trimmed.length > 0 &&
      !trimmed.toLowerCase().includes("to" + "do") &&
      trimmed !== "#"
    );
  };

  const hasLiveUrl = isValidUrl(project.liveUrl);
  const hasGithubUrl = isValidUrl(project.githubUrl);

  const renderStackedLinks = () => {
    if (!hasLiveUrl && !hasGithubUrl) return null;

    return (
      <div
        data-reveal-child
        style={{ '--d': '700ms' } as React.CSSProperties}
        className="mt-8 flex flex-col gap-2"
      >
        {hasLiveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit live site for ${project.title}`}
            className="t-cta text-[var(--ink)] inline-flex items-center min-h-[48px] no-underline cursor-pointer"
          >
            <TS reverse>Visit live site</TS>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
        {hasGithubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View source on GitHub for ${project.title}`}
            className="t-cta text-[var(--ink)] inline-flex items-center min-h-[48px] no-underline cursor-pointer"
          >
            <TS reverse>View source on GitHub</TS>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
      </div>
    );
  };

  return (
    <article
      className="w-full min-h-screen max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col gap-[clamp(48px,7vw,96px)]"
      style={{ paddingBlock: "clamp(96px, 12vw, 160px)" }}
    >
      <Helmet>
        <title>{`${project.title} — Case Study — Razan Azizieh`}</title>
        <meta name="description" content={cleanText(project.description)} />
        <meta property="og:title" content={`${project.title} — Razan Azizieh`} />
        <meta property="og:description" content={cleanText(project.description)} />
      </Helmet>

      {/* 1. Header Group: "All work" 0; title words +100; meta items +300 (60 apart); summary words +450; links +700 */}
      <div
        data-reveal-group
        data-reveal-id="project-header"
        data-reveal-at="0.8"
        className="w-full flex flex-col gap-8 lg:gap-12"
      >
        {/* Top row: "All work" on the left */}
        <div
          data-reveal-child
          style={{ '--d': '0ms' } as React.CSSProperties}
          className="w-full flex items-baseline justify-start"
        >
          <Link
            to="/work"
            aria-label="Return to all work"
            className="text-[17px] text-inherit inline-flex items-center min-h-[44px] no-underline cursor-pointer"
          >
            <TS>All work</TS>
          </Link>
        </div>

        {/* Title: Exactly one h1 per route using --t-title (+100ms) */}
        <div className="w-full">
          <Words
            as="h1"
            text={project.title}
            delay={100}
            className="t-title text-[var(--ink)] [text-wrap:balance] [overflow-wrap:anywhere]"
          />
        </div>

        {/* Mobile Meta + Summary (<1024px) */}
        <div className="flex flex-col gap-8 lg:hidden">
          {/* Meta in a 2-column mini grid (items 60ms apart starting at 300ms) */}
          <div className="grid grid-cols-2 gap-6 t-ui">
            <div data-reveal-child style={{ '--d': '300ms' } as React.CSSProperties} className="flex flex-col gap-1">
              <span className="t-meta">Year</span>
              <span className="t-body font-normal text-[var(--ink)]">{project.year}</span>
            </div>

            <div data-reveal-child style={{ '--d': '360ms' } as React.CSSProperties} className="flex flex-col gap-1">
              <span className="t-meta">Role</span>
              <span className="t-body font-normal text-[var(--ink)]">{cleanText(project.role)}</span>
            </div>

            <div data-reveal-child style={{ '--d': '420ms' } as React.CSSProperties} className="col-span-2 flex flex-col gap-1">
              <span className="t-meta">Stack</span>
              <span className="t-body font-normal text-[var(--ink)]">{project.stack.join(", ")}</span>
            </div>
          </div>

          {/* Summary words (+450ms) */}
          <div>
            <Words
              as="p"
              text={summaryText}
              delay={450}
              isChild={true}
              className="t-lead text-[var(--ink)]"
            />
          </div>

          {/* Mobile Links (+700ms) */}
          {renderStackedLinks()}
        </div>

        {/* Desktop Meta + Summary (>=1024px): 12-col grid */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-16 items-start">
          {/* Cols 1-4: Year, Role, Stack, then 32px gap, stacked links */}
          <div className="lg:col-span-4 flex flex-col gap-6 t-ui">
            <div data-reveal-child style={{ '--d': '300ms' } as React.CSSProperties} className="flex flex-col gap-1">
              <span className="t-meta">Year</span>
              <span className="t-body font-normal text-[var(--ink)]">{project.year}</span>
            </div>

            <div data-reveal-child style={{ '--d': '360ms' } as React.CSSProperties} className="flex flex-col gap-1">
              <span className="t-meta">Role</span>
              <span className="t-body font-normal text-[var(--ink)]">{cleanText(project.role)}</span>
            </div>

            <div data-reveal-child style={{ '--d': '420ms' } as React.CSSProperties} className="flex flex-col gap-1">
              <span className="t-meta">Stack</span>
              <span className="t-body font-normal text-[var(--ink)]">{project.stack.join(", ")}</span>
            </div>

            {/* Stacked links after Year, Role, Stack (32px gap, +700ms) */}
            {renderStackedLinks()}
          </div>

          {/* Cols 5-12: summary words (+450ms) */}
          <div className="lg:col-start-5 lg:col-span-8">
            <Words
              as="p"
              text={summaryText}
              delay={450}
              isChild={true}
              className="t-lead text-[var(--ink)] max-w-[40ch]"
            />
          </div>
        </div>
      </div>

      {/* 2. Hero Media: ALWAYS aspect-[16/9], clip reveal on mount (1100ms) */}
      <section
        aria-label="Project Hero Media"
        className="w-full aspect-[16/9] max-md:max-h-none md:max-h-[78svh] overflow-hidden bg-[#ECEAE4] relative isolate mount-clip-reveal"
        style={{
          width: "100%",
          aspectRatio: "16 / 9",
          overflow: "hidden",
        }}
      >
        {hasVideo && !videoError ? (
          <video
            ref={videoRef}
            src={project.video?.src}
            poster={project.video?.poster}
            muted
            loop
            playsInline
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover relative z-10"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              transform: "none",
              filter: "none",
            }}
          />
        ) : !imageError && project.image ? (
          <img
            src={project.image}
            alt={project.title}
            width={1600}
            height={900}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center relative z-10"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              transform: "none",
              filter: "none",
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col justify-end p-10 relative isolate bg-[#ECEAE4]">
            <div className="absolute inset-0 z-0">
              <GeometricPattern seed={project.patternSeed || project.slug} />
            </div>
            <div className="relative z-10">
              <h2 className="t-title text-[var(--ink)]">
                {project.title}
              </h2>
            </div>
          </div>
        )}
      </section>

      {/* 3. Project Story: rendered ONLY when contentVerified is true */}
      {project.contentVerified && (
        <section aria-label="Project Story" className="flex flex-col gap-[clamp(48px,6vw,80px)]">
          {/* Overview: label and text +0 / +120 */}
          {shouldShowOverview && (
            <div
              data-reveal-group
              data-reveal-id="project-overview"
              data-reveal-at="0.8"
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-16 items-start"
            >
              <div
                data-reveal-child
                style={{ '--d': '0ms' } as React.CSSProperties}
                className="lg:col-span-4"
              >
                <span className="t-meta block font-normal">
                  Overview
                </span>
              </div>
              <div
                data-reveal-child
                style={{ '--d': '120ms' } as React.CSSProperties}
                className="lg:col-start-5 lg:col-span-8"
              >
                <p className="t-body max-w-[62ch] text-[var(--ink)]">
                  {overviewText}
                </p>
              </div>
            </div>
          )}

          {/* What I built: label and each item 120ms apart */}
          {project.features && project.features.length > 0 && (
            <div
              data-reveal-group
              data-reveal-id="project-features"
              data-reveal-at="0.8"
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-16 items-start"
            >
              <div
                data-reveal-child
                style={{ '--d': '0ms' } as React.CSSProperties}
                className="lg:col-span-4"
              >
                <span className="t-meta block font-normal">
                  What I built
                </span>
              </div>
              <div className="lg:col-start-5 lg:col-span-8 flex flex-col gap-8">
                {project.features.map((feature, idx) => (
                  <div
                    key={`feature-${idx}`}
                    data-reveal-child
                    style={{ '--d': `${(idx + 1) * 120}ms` } as React.CSSProperties}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="t-num font-normal">
                        {pad(idx + 1)}
                      </span>
                      <h3 className="t-body font-normal text-[var(--ink)]">
                        {cleanText(feature.title)}
                      </h3>
                    </div>
                    <p className="t-body max-w-[62ch] text-[var(--ink)] pl-7">
                      {cleanText(feature.text)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Challenge (hidden if empty) */}
          {isFilled(project.challenge) && (
            <div
              data-reveal-group
              data-reveal-id="project-challenge"
              data-reveal-at="0.8"
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-16 items-start"
            >
              <div
                data-reveal-child
                style={{ '--d': '0ms' } as React.CSSProperties}
                className="lg:col-span-4"
              >
                <span className="t-meta block font-normal">Challenge</span>
              </div>
              <div
                data-reveal-child
                style={{ '--d': '120ms' } as React.CSSProperties}
                className="lg:col-start-5 lg:col-span-8"
              >
                <p className="t-body max-w-[62ch] text-[var(--ink)]">
                  {cleanText(project.challenge)}
                </p>
              </div>
            </div>
          )}

          {/* Approach (hidden if empty) */}
          {project.approach && project.approach.length > 0 && (
            <div
              data-reveal-group
              data-reveal-id="project-approach"
              data-reveal-at="0.8"
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-16 items-start"
            >
              <div
                data-reveal-child
                style={{ '--d': '0ms' } as React.CSSProperties}
                className="lg:col-span-4"
              >
                <span className="t-meta block font-normal">Approach</span>
              </div>
              <div className="lg:col-start-5 lg:col-span-8 flex flex-col gap-8">
                {project.approach.map((item, idx) => (
                  <div
                    key={`approach-${idx}`}
                    data-reveal-child
                    style={{ '--d': `${(idx + 1) * 120}ms` } as React.CSSProperties}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="t-num font-normal">
                        {pad(idx + 1)}
                      </span>
                      <h3 className="t-body font-normal text-[var(--ink)]">
                        {cleanText(item.title)}
                      </h3>
                    </div>
                    <p className="t-body max-w-[62ch] text-[var(--ink)] pl-7">
                      {cleanText(item.text)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical details (hidden if empty) */}
          {project.technical && isFilled(project.technical.text) && (
            <div
              data-reveal-group
              data-reveal-id="project-technical"
              data-reveal-at="0.8"
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-16 items-start"
            >
              <div
                data-reveal-child
                style={{ '--d': '0ms' } as React.CSSProperties}
                className="lg:col-span-4"
              >
                <span className="t-meta block font-normal">Technical details</span>
              </div>
              <div className="lg:col-start-5 lg:col-span-8 flex flex-col gap-4">
                <p
                  data-reveal-child
                  style={{ '--d': '120ms' } as React.CSSProperties}
                  className="t-body max-w-[62ch] text-[var(--ink)]"
                >
                  {cleanText(project.technical.text)}
                </p>
                {isFilled(project.technical.code) && (
                  <div
                    data-reveal-child
                    style={{ '--d': '240ms' } as React.CSSProperties}
                    tabIndex={0}
                    role="region"
                    aria-label="Code example"
                    className="bg-[var(--color-surface)] p-6 t-meta font-mono leading-relaxed text-[var(--ink)] overflow-x-auto select-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ink)]"
                  >
                    <pre>
                      <code>{project.technical.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Outcome (hidden if empty) */}
          {isFilled(project.outcome) && (
            <div
              data-reveal-group
              data-reveal-id="project-outcome"
              data-reveal-at="0.8"
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-16 items-start"
            >
              <div
                data-reveal-child
                style={{ '--d': '0ms' } as React.CSSProperties}
                className="lg:col-span-4"
              >
                <span className="t-meta block font-normal">Outcome</span>
              </div>
              <div
                data-reveal-child
                style={{ '--d': '120ms' } as React.CSSProperties}
                className="lg:col-start-5 lg:col-span-8"
              >
                <p className="t-body max-w-[62ch] text-[var(--ink)]">
                  {cleanText(project.outcome)}
                </p>
              </div>
            </div>
          )}

          {/* What I learned (hidden if empty) */}
          {isFilled(project.learnings) && (
            <div
              data-reveal-group
              data-reveal-id="project-learnings"
              data-reveal-at="0.8"
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-16 items-start"
            >
              <div
                data-reveal-child
                style={{ '--d': '0ms' } as React.CSSProperties}
                className="lg:col-span-4"
              >
                <span className="t-meta block font-normal">What I learned</span>
              </div>
              <div
                data-reveal-child
                style={{ '--d': '120ms' } as React.CSSProperties}
                className="lg:col-start-5 lg:col-span-8"
              >
                <p className="t-body max-w-[62ch] text-[var(--ink)]">
                  {cleanText(project.learnings)}
                </p>
              </div>
            </div>
          )}

          {/* Gallery: render only items with a verified real image */}
          {project.gallery && project.gallery.length > 0 && (
            <div
              data-reveal-group
              data-reveal-id="project-gallery"
              data-reveal-at="0.8"
              className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8"
            >
              {project.gallery
                .filter((item) => item.verified && isFilled(item.src) && !item.src.includes("placeholder"))
                .map((item, idx) => (
                  <figure
                    key={`gallery-${idx}`}
                    data-reveal-child
                    style={{ '--d': `${idx * 120}ms` } as React.CSSProperties}
                    className="flex flex-col gap-2"
                  >
                    <img
                      src={item.src}
                      alt={item.alt || project.title}
                      width={1600}
                      height={900}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto object-cover"
                    />
                    {isFilled(item.caption) && (
                      <figcaption className="t-num text-[var(--ink-2)]">
                        {cleanText(item.caption)}
                      </figcaption>
                    )}
                  </figure>
                ))}
            </div>
          )}
        </section>
      )}

      {/* 4. "More work" block: label and each title 120ms apart */}
      <footer className="pt-16 border-none w-full">
        <div
          data-reveal-group
          data-reveal-id="project-more-work"
          data-reveal-at="0.8"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
        >
          <div className="lg:col-start-5 lg:col-span-8 flex flex-col">
            <span
              data-reveal-child
              style={{ '--d': '0ms' } as React.CSSProperties}
              className="t-meta block mb-2"
            >
              More work
            </span>
            <div className="flex flex-col gap-[16px]">
              {otherProjects.map((other, idx) => (
                <Link
                  key={other.slug}
                  to={`/work/${other.slug}`}
                  data-reveal-child
                  style={{ '--d': `${(idx + 1) * 120}ms` } as React.CSSProperties}
                  aria-label={`View project: ${other.title}`}
                  className="group flex flex-col justify-center min-h-[64px] no-underline w-full cursor-pointer"
                >
                  <span className="t-item text-[var(--ink)] line-clamp-2 [overflow-wrap:anywhere] [text-wrap:balance]">
                    <TS>{other.title}</TS>
                  </span>
                </Link>
              ))}
              <Link
                to="/work"
                data-reveal-child
                style={{ '--d': `${(otherProjects.length + 1) * 120}ms` } as React.CSSProperties}
                aria-label="View all projects"
                className="group flex flex-col justify-center min-h-[64px] no-underline w-full cursor-pointer"
              >
                <span className="t-item text-[var(--ink)] line-clamp-2 [overflow-wrap:anywhere] [text-wrap:balance]">
                  <TS>All projects</TS>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </article>
  );
}

export { ProjectPage };
