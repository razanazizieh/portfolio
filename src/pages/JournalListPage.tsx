/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getEntries } from "../data/journal";
import { HL } from "../components/HL";
import { TS } from "../components/TS";
import { Words } from "../components/Words";

const pad = (v: number) => String(v).padStart(2, "0");

/**
 * Journal List Page (/journal)
 * - Heading words at 0ms
 * - Entry row as children: date & reading time +300ms, title +400ms, summary +500ms
 */
export function JournalListPage() {
  const currentEntries = getEntries();
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen pt-32 pb-32 max-w-[1600px] mx-auto px-6 md:px-12">
      <div data-reveal-group data-reveal-id="journal-list" data-reveal-at="0.8" className="w-full">
        <Helmet>
          <title>Journal — Razan Azizieh</title>
          <meta
            name="description"
            content="Writing and technical notes by Razan Azizieh on front-end systems, distributed fault tolerance, and calm interfaces."
          />
        </Helmet>

        {/* Top back link */}
        <div
          data-reveal-child
          style={{ "--d": "0ms" } as React.CSSProperties}
          className="mb-16"
        >
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            aria-label="Return to home"
            className="t-ui text-[var(--ink)] inline-flex items-center min-h-[44px] no-underline"
          >
            <TS>Home</TS>
          </Link>
        </div>

        <header className="mb-20">
          <div data-reveal-child style={{ "--d": "0ms" } as React.CSSProperties}>
            <Words
              as="h1"
              text={currentEntries.length > 0 ? `Journal (${pad(currentEntries.length)})` : "Journal"}
              delay={0}
              isChild={true}
              className="t-title text-[var(--ink)]"
            />
          </div>
        </header>

        <section aria-label="Entries" className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-start-5 lg:col-span-8 flex flex-col gap-16">
            {currentEntries.length === 0 ? (
              <p
                data-reveal-child
                style={{ "--d": "300ms" } as React.CSSProperties}
                className="t-lead text-[var(--ink)] max-w-[42ch]"
              >
                First entry coming soon. I&apos;ll write about what I learn while building.
              </p>
            ) : (
              currentEntries.map((entry, idx) => {
                const entryBase = idx * 150;
                return (
                  <article
                    key={entry.slug}
                    className="flex flex-col gap-3 group pb-8"
                  >
                    {/* date | reading time (+300ms) */}
                    <div
                      data-reveal-child
                      style={{ "--d": `${entryBase + 300}ms` } as React.CSSProperties}
                      className="flex items-center gap-4 t-meta text-[var(--ink-2)]"
                    >
                      <time dateTime={entry.date}>{entry.date}</time>
                      <span>&bull;</span>
                      <span>{entry.readingMinutes} min read</span>
                    </div>

                    {/* title (+400ms) */}
                    <h2
                      data-reveal-child
                      style={{ "--d": `${entryBase + 400}ms` } as React.CSSProperties}
                      className="t-item text-[var(--ink)]"
                    >
                      <HL to={`/journal/${entry.slug}`}>
                        {entry.title}
                      </HL>
                    </h2>

                    {/* summary (+500ms) */}
                    <p
                      data-reveal-child
                      style={{ "--d": `${entryBase + 500}ms` } as React.CSSProperties}
                      className="t-body text-[var(--ink-2)] max-w-2xl mt-1"
                    >
                      {entry.summary}
                    </p>
                  </article>
                );
              })
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default JournalListPage;
