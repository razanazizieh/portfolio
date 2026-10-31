/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Project } from "../data/projects";
import GeometricPattern from "./GeometricPattern";
import TS from "./TS";

export interface WorkMobileProps {
  projects: Project[];
}

const pad = (v: number) => String(v).padStart(2, "0");

/**
 * Mobile & Reduced-Motion Work Section
 */
export default function WorkMobile({ projects }: WorkMobileProps) {
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const prefetchProjectPage = () => {
    import("../pages/ProjectPage").catch(() => {});
  };

  return (
    <section
      aria-label="Selected work"
      className="w-full pt-[96px] pb-[96px] min-w-0"
    >
      <div className="mb-12 min-w-0">
        <h2 className="title-section text-[var(--ink)]">
          Selected work ({pad(projects.length)})
        </h2>
      </div>

      <div className="flex flex-col gap-16 w-full min-w-0">
        {projects.map((proj, idx) => {
          const formattedNum = pad(idx + 1);

          return (
            <article
              key={proj.slug}
              className="w-full min-w-0"
            >
              <Link
                to={`/work/${proj.slug}`}
                onMouseEnter={prefetchProjectPage}
                onFocus={prefetchProjectPage}
                aria-label={`Project ${formattedNum}: ${proj.title}. ${proj.description}`}
                className="flex flex-col gap-4 no-underline cursor-pointer focus-visible:outline-none min-w-0 w-full min-h-[44px]"
              >
                {/* Image aspect-[4/3] with geometric fallback */}
                <div
                  className="w-full aspect-[4/3] overflow-hidden bg-[var(--color-surface)] min-w-0 relative isolate"
                >
                  <div className="absolute inset-0 z-0 bg-[var(--color-surface)]">
                    <GeometricPattern seed={proj.patternSeed || proj.slug} />
                  </div>

                  {proj.image && !imageError[proj.slug] ? (
                    <img
                      src={proj.image}
                      alt={proj.title}
                      width={1600}
                      height={900}
                      loading={idx === 0 ? "eager" : "lazy"}
                      fetchPriority={idx === 0 ? "high" : "auto"}
                      decoding="async"
                      onLoad={() =>
                        setLoadedImages((prev) => ({ ...prev, [proj.slug]: true }))
                      }
                      onError={() =>
                        setImageError((prev) => ({ ...prev, [proj.slug]: true }))
                      }
                      className={`relative z-10 w-full h-full object-cover object-center max-w-full transition-opacity duration-300 ${
                        loadedImages[proj.slug] ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ) : null}
                </div>

                {/* Row with number | title */}
                <div className="flex flex-col gap-3 min-w-0 w-full pt-1">
                  <div className="flex items-start justify-between gap-4 min-w-0 w-full">
                    <div className="flex items-start gap-3 min-w-0">
                      <span
                        aria-hidden="true"
                        className="t-num flex-shrink-0 pt-[0.15em]"
                      >
                        {formattedNum}
                      </span>
                      <h3
                        className="t-item text-[var(--ink)] min-w-0 line-clamp-2 [overflow-wrap:anywhere] [text-wrap:balance]"
                      >
                        <TS caps={false}>{proj.title}</TS>
                      </h3>
                    </div>
                  </div>

                  {/* One-sentence description in t-body */}
                  <p className="t-body text-[var(--ink-2)] min-w-0">
                    {proj.description}
                  </p>

                  {/* "View project" in t-ui */}
                  <div className="pt-1">
                    <span className="t-ui text-[var(--ink)] inline-block">
                      <TS>View project</TS>
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export { WorkMobile };
