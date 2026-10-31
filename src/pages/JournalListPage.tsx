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
 * - Wrapped in one data-reveal-group per block
 * - Title as h1
 * - Rows staggered using data-reveal-child
 */
export function JournalListPage() {
  const currentEntries = getEntries();
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen pt-32 pb-32 max-w-[1600px] mx-auto px-6 md:px-12">
      <div data-reveal-group data-reveal-id="journal-list" className="w-full">
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
          <Words
            as="h1"
            text={currentEntries.length > 0 ? `Journal (${pad(currentEntries.length)})` : "Journal"}
            delay={0}
            className="t-title text-[var(--ink)]"
          />
        </header>

        <section aria-label="Entries" className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-start-5 lg:col-span-8 flex flex-col gap-16">
            {currentEntries.length === 0 ? (
              <p
                data-reveal-child
                style={{ "--d": "350ms" } as React.CSSProperties}
                className="t-lead text-[var(--ink)] max-w-[42ch]"
              >
                First entry coming soon. I&apos;ll write about what I learn while building.
              </p>
            ) : (
              currentEntries.map((entry, idx) => {
                const entryBase = 350 + idx * 150;
                return (
                  <article
                    key={entry.slug}
                    className="flex flex-col gap-3 group pb-8"
                  >
                    {/* date | reading time (+0ms) */}
                    <div
                      data-reveal-child
                      style={{ "--d": `${entryBase + 0}ms` } as React.CSSProperties}
                      className="flex items-center gap-4 t-meta text-[var(--ink-2)]"
                    >
                      <time dateTime={entry.date}>{entry.date}</time>
                      <span>&bull;</span>
                      <span>{entry.readingMinutes} min read</span>
                    </div>

                    {/* title (+90ms) */}
                    <h2
                      data-reveal-child
                      style={{ "--d": `${entryBase + 90}ms` } as React.CSSProperties}
                      className="t-item text-[var(--ink)]"
                    >
                      <HL to={`/journal/${entry.slug}`}>
                        {entry.title}
                      </HL>
                    </h2>

                    {/* summary (+180ms) */}
                    <p
                      data-reveal-child
                      style={{ "--d": `${entryBase + 180}ms` } as React.CSSProperties}
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
