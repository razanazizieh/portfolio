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
 * - Top row: "All work" (links to /#work), counter on same baseline
 * - Left meta column: Year, Role, Stack, then 32px gap, stacked links:
 *   "Visit live site" and "View source on GitHub" at --t-cta (22px, weight 500, min-h 48px, type swap)
 * - Repeated links row in cols 5-12 right after "What I built": 64px above, 48px between them
 * - Overview: render longDescription (fallback to overview). If identical to summary, hide Overview block.
 * - Label "What I built" (numbered 01, 02... from features) after Overview
 * - Hide Challenge, Approach, Technical details, Outcome and What I learned when empty
 * - No underlines, no arrows, no icons.
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
  const nextIndex = (currentIndex + 1) % totalProjects;
  const nextProject = PROJECTS[nextIndex];

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
      <div className="mt-8 flex flex-col gap-2">
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
      className="w-full min-h-screen max-w-[1600px] mx-auto px-6 md:px-12"
      style={{ paddingBlock: "clamp(96px, 12vw, 160px)" }}
    >
      <div data-reveal-group data-reveal-id="project-page" className="w-full flex flex-col gap-[clamp(48px,7vw,96px)]">
      <Helmet>
        <title>{`${project.title} — Case Study — Razan Azizieh`}</title>
        <meta name="description" content={cleanText(project.description)} />
        <meta property="og:title" content={`${project.title} — Razan Azizieh`} />
        <meta property="og:description" content={cleanText(project.description)} />
      </Helmet>

      {/* 1. Top row: "All work" on the left */}
      <div
        data-reveal-child
        style={{ '--d': '0ms' } as React.CSSProperties}
        className="w-full flex items-baseline justify-start"
      >
        <Link
          to="/#work"
          onClick={(e) => {
            e.preventDefault();
            navigate('/', { state: { scrollTo: 'work' } });
          }}
          aria-label="Return to Selected work"
          className="text-[17px] text-inherit inline-flex items-center min-h-[44px] no-underline cursor-pointer"
        >
          <TS>All work</TS>
        </Link>
      </div>

      {/* 2. Title: Exactly one h1 per route using --t-title */}
      <div className="w-full">
        <Words
          as="h1"
          text={project.title}
          delay={50}
          className="t-title text-[var(--ink)] [text-wrap:balance] [overflow-wrap:anywhere]"
        />
      </div>

      {/* 3. Mobile Meta + Summary (<1024px) */}
      <div className="flex flex-col gap-8 lg:hidden">
        {/* Meta in a 2-column mini grid */}
        <div
          data-reveal-child
          style={{ '--d': '120ms' } as React.CSSProperties}
          className="grid grid-cols-2 gap-6 t-ui"
        >
          <div className="flex flex-col gap-1">
            <span className="t-meta">Year</span>
            <span className="t-body font-normal text-[var(--ink)]">{project.year}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="t-meta">Role</span>
            <span className="t-body font-normal text-[var(--ink)]">{cleanText(project.role)}</span>
          </div>

          <div className="col-span-2 flex flex-col gap-1">
            <span className="t-meta">Stack</span>
            <span className="t-body font-normal text-[var(--ink)]">{project.stack.join(", ")}</span>
          </div>
        </div>

        {/* Summary: uses --t-lead */}
        <div
          data-reveal-child
          style={{ '--d': '180ms' } as React.CSSProperties}
        >
          <p className="t-lead text-[var(--ink)]">
            {summaryText}
          </p>
        </div>

        {/* Mobile Links */}
        {renderStackedLinks()}
      </div>

      {/* 3. Desktop Meta + Summary (>=1024px): 12-col grid */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-16 items-start">
        {/* Cols 1-4: Year, Role, Stack, then 32px gap, stacked links */}
        <div
          data-reveal-child
          style={{ '--d': '120ms' } as React.CSSProperties}
          className="lg:col-span-4 flex flex-col gap-6 t-ui"
        >
          <div className="flex flex-col gap-1">
            <span className="t-meta">Year</span>
            <span className="t-body font-normal text-[var(--ink)]">{project.year}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="t-meta">Role</span>
            <span className="t-body font-normal text-[var(--ink)]">{cleanText(project.role)}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="t-meta">Stack</span>
            <span className="t-body font-normal text-[var(--ink)]">{project.stack.join(", ")}</span>
          </div>

          {/* Stacked links after Year, Role, Stack (32px gap) */}
          {renderStackedLinks()}
        </div>

        {/* Cols 5-12: summary using --t-lead */}
        <div
          data-reveal-child
          style={{ '--d': '180ms' } as React.CSSProperties}
          className="lg:col-start-5 lg:col-span-8"
        >
          <p className="t-lead text-[var(--ink)] max-w-[40ch]">
            {summaryText}
          </p>
        </div>
      </div>

      {/* 4. Hero Media: ALWAYS aspect-[16/9], max-height 78svh, never blank, mount-time clip reveal */}
      <section
        aria-label="Project Hero Media"
        className="w-full aspect-[16/9] max-h-[78svh] overflow-hidden bg-[#ECEAE4] relative isolate mount-clip-reveal"
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

      {/* 5. Project Story: rendered ONLY when contentVerified is true */}
      {project.contentVerified && (
        <section aria-label="Project Story" className="flex flex-col gap-[clamp(48px,6vw,80px)]">
          {/* Overview: rendered if longDescription/overview is present and not identical to summary */}
          {shouldShowOverview && (
            <div
              data-reveal-child
              style={{ '--d': '100ms' } as React.CSSProperties}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-16 items-start"
            >
              <div className="lg:col-span-4">
                <span className="t-meta block font-normal">
                  Overview
                </span>
              </div>
              <div className="lg:col-start-5 lg:col-span-8">
                <p className="t-body max-w-[62ch] text-[var(--ink)]">
                  {overviewText}
                </p>
              </div>
            </div>
          )}

          {/* What I built: from features */}
          {project.features && project.features.length > 0 && (
            <div
              data-reveal-child
              style={{ '--d': '160ms' } as React.CSSProperties}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-16 items-start"
            >
              <div className="lg:col-span-4">
                <span className="t-meta block font-normal">
                  What I built
                </span>
              </div>
              <div className="lg:col-start-5 lg:col-span-8 flex flex-col gap-8">
                {project.features.map((feature, idx) => (
                  <div key={`feature-${idx}`} className="flex flex-col gap-2">
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
              data-reveal-child
              style={{ '--d': '200ms' } as React.CSSProperties}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-16 items-start"
            >
              <div className="lg:col-span-4">
                <span className="t-meta block font-normal">Challenge</span>
              </div>
              <div className="lg:col-start-5 lg:col-span-8">
                <p className="t-body max-w-[62ch] text-[var(--ink)]">
                  {cleanText(project.challenge)}
                </p>
              </div>
            </div>
          )}

          {/* Approach (hidden if empty) */}
          {project.approach && project.approach.length > 0 && (
            <div
              data-reveal-child
              style={{ '--d': '240ms' } as React.CSSProperties}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-16 items-start"
            >
              <div className="lg:col-span-4">
                <span className="t-meta block font-normal">Approach</span>
              </div>
              <div className="lg:col-start-5 lg:col-span-8 flex flex-col gap-8">
                {project.approach.map((item, idx) => (
                  <div key={`approach-${idx}`} className="flex flex-col gap-2">
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
              data-reveal-child
              style={{ '--d': '280ms' } as React.CSSProperties}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-16 items-start"
            >
              <div className="lg:col-span-4">
                <span className="t-meta block font-normal">Technical details</span>
              </div>
              <div className="lg:col-start-5 lg:col-span-8 flex flex-col gap-4">
                <p className="t-body max-w-[62ch] text-[var(--ink)]">
                  {cleanText(project.technical.text)}
                </p>
                {isFilled(project.technical.code) && (
                  <div
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
              data-reveal-child
              style={{ '--d': '320ms' } as React.CSSProperties}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-16 items-start"
            >
              <div className="lg:col-span-4">
                <span className="t-meta block font-normal">Outcome</span>
              </div>
              <div className="lg:col-start-5 lg:col-span-8">
                <p className="t-body max-w-[62ch] text-[var(--ink)]">
                  {cleanText(project.outcome)}
                </p>
              </div>
            </div>
          )}

          {/* What I learned (hidden if empty) */}
          {isFilled(project.learnings) && (
            <div
              data-reveal-child
              style={{ '--d': '360ms' } as React.CSSProperties}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-16 items-start"
            >
              <div className="lg:col-span-4">
                <span className="t-meta block font-normal">What I learned</span>
              </div>
              <div className="lg:col-start-5 lg:col-span-8">
                <p className="t-body max-w-[62ch] text-[var(--ink)]">
                  {cleanText(project.learnings)}
                </p>
              </div>
            </div>
          )}

          {/* Gallery: render only items with a verified real image */}
          {project.gallery && project.gallery.length > 0 && (
            <div
              data-reveal-child
              style={{ '--d': '380ms' } as React.CSSProperties}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8"
            >
              {project.gallery
                .filter((item) => item.verified && isFilled(item.src) && !item.src.includes("placeholder"))
                .map((item, idx) => (
                  <figure key={`gallery-${idx}`} className="flex flex-col gap-2">
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

      {/* 6. Case Study Bottom Navigation */}
      <footer
        data-reveal-child
        style={{ '--d': '250ms' } as React.CSSProperties}
        className="pt-16 border-none w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-start-5 lg:col-span-8 flex flex-col">
            <Link
              to={`/work/${nextProject.slug}`}
              aria-label={`Next project: ${nextProject.title}`}
              className="group flex flex-col justify-center min-h-[64px] no-underline w-full"
            >
              <span className="t-meta block mb-2">
                Next project
              </span>
              <span className="t-item text-[var(--ink)] line-clamp-2 [overflow-wrap:anywhere] [text-wrap:balance]">
                <TS>{nextProject.title}</TS>
              </span>
            </Link>
          </div>
        </div>
      </footer>
      </div>
    </article>
  );
}

export { ProjectPage };
