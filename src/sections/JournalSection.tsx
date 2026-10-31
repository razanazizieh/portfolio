/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Link } from "react-router-dom";
import { getEntries } from "../data/journal";
import HL from "../components/HL";
import TS from "../components/TS";
import Words from "../components/Words";

const pad = (v: number) => String(v).padStart(2, "0");

/**
 * Journal Section (Home panel)
 * Normal flow, background #F5F4F0, min-height 50svh, padding-block var(--pad-y).
 * id="journal" directly on the section element.
 */
export function JournalSection() {
  const currentEntries = getEntries();
  const totalCount = currentEntries.length;
  const latestEntries = currentEntries.slice(0, 3);

  return (
    <section
      aria-label="Journal"
      className="w-full bg-[#F5F4F0] min-h-[50svh] flex flex-col justify-between"
      style={{
        paddingBlock: "var(--pad-y, clamp(96px, 12vw, 176px))",
      }}
    >
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 flex-1 flex flex-col justify-center">
        {totalCount === 0 ? (
          <div
            data-reveal-group
            data-reveal-id="journal"
            data-reveal-at="0.82"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-baseline py-4 w-full"
          >
            <div
              data-reveal-child
              style={{ "--d": "0ms" } as React.CSSProperties}
              className="lg:col-span-4"
            >
              <Words
                as="h2"
                text="Journal"
                delay={0}
                isChild={true}
                className="title-section text-[var(--ink)]"
              />
            </div>

            <div
              data-reveal-child
              style={{ "--d": "250ms" } as React.CSSProperties}
              className="lg:col-start-5 lg:col-span-8"
            >
              <Words
                as="p"
                text="First entry coming soon. I'll write about what I learn while building."
                delay={250}
                isChild={true}
                className="t-lead max-w-[42ch]"
                style={{
                  color: "var(--ink)",
                  fontWeight: 340,
                  fontVariationSettings: "'wght' 340",
                }}
              />
            </div>
          </div>
        ) : (
          <div
            data-reveal-group
            data-reveal-id="journal"
            data-reveal-at="0.82"
            className="w-full py-4 flex flex-col justify-between"
          >
            <div
              data-reveal-child
              style={{ "--d": "0ms" } as React.CSSProperties}
              className="pt-2"
            >
              <Words
                as="h2"
                text={`Journal (${pad(totalCount)})`}
                delay={0}
                isChild={true}
                className="title-section text-[var(--ink)]"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 lg:mt-16 pb-2">
              <div className="lg:col-start-5 lg:col-span-8 flex flex-col min-w-0">
                <div className="flex flex-col gap-16 min-w-0">
                  {latestEntries.map((entry, idx) => {
                    const entryBase = 250 + idx * 120;

                    return (
                      <article key={entry.slug} className="min-w-0">
                        <Link
                          to={`/journal/${entry.slug}`}
                          className="group flex flex-col gap-2 no-underline min-w-0 cursor-pointer focus-visible:outline-none"
                        >
                          <div
                            data-reveal-child
                            style={{ "--d": `${entryBase + 0}ms` } as React.CSSProperties}
                            className="flex items-center gap-3 t-meta text-[var(--ink-2)]"
                          >
                            <time dateTime={entry.date}>{entry.date}</time>
                            <span>&bull;</span>
                            <span>{entry.readingMinutes} min read</span>
                          </div>

                          <h3
                            data-reveal-child
                            style={{ "--d": `${entryBase + 90}ms` } as React.CSSProperties}
                            className="t-item text-[var(--ink)] [text-wrap:balance] max-w-[28ch] min-w-0"
                          >
                            <TS>{entry.title}</TS>
                          </h3>

                          <p
                            data-reveal-child
                            style={{ "--d": `${entryBase + 180}ms` } as React.CSSProperties}
                            className="t-body text-[var(--ink-2)] max-w-2xl min-w-0"
                          >
                            {entry.summary}
                          </p>

                          <div
                            data-reveal-child
                            style={{ "--d": `${entryBase + 240}ms` } as React.CSSProperties}
                            className="mt-6"
                          >
                            <span className="t-ui text-[var(--ink)] inline-block">
                              <TS>Read entry</TS>
                            </span>
                          </div>
                        </Link>
                      </article>
                    );
                  })}
                </div>

                {totalCount > 3 && (
                  <div
                    data-reveal-child
                    style={{ "--d": `${250 + latestEntries.length * 120}ms` } as React.CSSProperties}
                    className="pt-12"
                  >
                    <HL
                      to="/journal"
                      ariaLabel="View all journal entries"
                      className="t-ui text-[var(--ink)] inline-flex items-center"
                    >
                      All entries
                    </HL>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default JournalSection;
