/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getEntries, getEntryBySlug } from "../data/journal";
import NotFound from "./NotFound";
import { HL } from "../components/HL";
import { Words } from "../components/Words";

/**
 * Journal Entry Detail View (/journal/:slug)
 * - Wrapped in data-reveal-group
 * - Title words (d 0ms)
 * - Meta child (d 100ms)
 * - Body paragraphs/blocks (children, +100ms each)
 * - Prev/next children
 */
export function JournalEntryPage() {
  const { slug } = useParams<{ slug: string }>();
  const entry = getEntryBySlug(slug);

  if (!entry) {
    return <NotFound />;
  }

  const allEntries = getEntries();
  const currentIndex = allEntries.findIndex((e) => e.slug === entry.slug);
  const prevEntry = currentIndex > 0 ? allEntries[currentIndex - 1] : null;
  const nextEntry = currentIndex >= 0 && currentIndex < allEntries.length - 1 ? allEntries[currentIndex + 1] : null;

  return (
    <article className="w-full min-h-screen pt-32 pb-32 max-w-[1600px] mx-auto px-6 md:px-12">
      <div data-reveal-group data-reveal-id="journal-entry" className="w-full">
        <Helmet>
          <title>{`${entry.title} — Journal — Razan Azizieh`}</title>
          <meta name="description" content={entry.summary} />
          <meta property="og:title" content={`${entry.title} — Razan Azizieh`} />
          <meta property="og:description" content={entry.summary} />
        </Helmet>

        {/* Top plain-text back link "Journal" */}
        <div
          data-reveal-child
          style={{ "--d": "0ms" } as React.CSSProperties}
          className="mb-16"
        >
          <HL
            to="/journal"
            ariaLabel="Return to journal list"
            className="t-ui text-[var(--ink)] inline-flex items-center min-h-[44px]"
          >
            Journal
          </HL>
        </div>

        {/* Entry Header: Title words (d 0) as h1, date + reading time (child, d 100ms) */}
        <header className="mb-24">
          <div
            data-reveal-child
            style={{ "--d": "100ms" } as React.CSSProperties}
            className="flex items-center gap-4 t-meta text-[var(--ink-2)] mb-6"
          >
            <time dateTime={entry.date}>{entry.date}</time>
            <span>&bull;</span>
            <span>{entry.readingMinutes} min read</span>
          </div>
          <Words
            as="h1"
            text={entry.title}
            delay={0}
            className="t-title text-[var(--ink)] max-w-5xl"
          />
        </header>

        {/* Body Column (Cols 5-12, max-width 62ch, t-body text, children +100ms each) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-36">
          <div className="lg:col-start-5 lg:col-span-8 max-w-[62ch] flex flex-col gap-10">
            {entry.body.map((block, idx) => {
              const blockDelay = 200 + idx * 100;

              switch (block.type) {
                case "h2":
                  return (
                    <div
                      key={`block-${idx}`}
                      data-reveal-child
                      style={{ "--d": `${blockDelay}ms` } as React.CSSProperties}
                    >
                      <h2 className="t-item text-[var(--ink)] mt-6">
                        {block.text}
                      </h2>
                    </div>
                  );

                case "quote":
                  return (
                    <div
                      key={`block-${idx}`}
                      data-reveal-child
                      style={{ "--d": `${blockDelay}ms` } as React.CSSProperties}
                    >
                      <blockquote className="t-lead text-[var(--ink)] my-6 pl-6 border-l-2 border-[var(--ink)]">
                        {block.text}
                      </blockquote>
                    </div>
                  );

                case "code":
                  return (
                    <div
                      key={`block-${idx}`}
                      data-reveal-child
                      style={{ "--d": `${blockDelay}ms` } as React.CSSProperties}
                    >
                      <div
                        tabIndex={0}
                        role="region"
                        aria-label="Code example"
                        className="bg-[#ECEAE4] p-6 leading-relaxed text-[var(--ink)] overflow-x-auto select-text my-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--ink)]"
                        style={{
                          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                          fontSize: "14px",
                          lineHeight: "1.6",
                        }}
                      >
                        <pre>
                          <code>{block.code || block.text}</code>
                        </pre>
                      </div>
                    </div>
                  );

                case "image":
                  return block.src ? (
                    <div
                      key={`block-${idx}`}
                      data-reveal-child
                      style={{ "--d": `${blockDelay}ms` } as React.CSSProperties}
                    >
                      <figure className="my-6">
                        <img
                          src={block.src}
                          alt={block.alt || entry.title}
                          width={1600}
                          height={900}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-auto"
                        />
                        {block.caption && (
                          <figcaption className="t-num text-[var(--ink-2)] mt-2">
                            {block.caption}
                          </figcaption>
                        )}
                      </figure>
                    </div>
                  ) : null;

                case "p":
                default:
                  return (
                    <div
                      key={`block-${idx}`}
                      data-reveal-child
                      style={{ "--d": `${blockDelay}ms` } as React.CSSProperties}
                    >
                      <p className="t-body max-w-[62ch] text-[var(--ink)]">
                        {block.text}
                      </p>
                    </div>
                  );
              }
            })}
          </div>
        </div>

        {/* Prev / Next Entries Navigation: children */}
        {(prevEntry || nextEntry) && (
          <footer
            data-reveal-child
            style={{ "--d": `${200 + entry.body.length * 100 + 100}ms` } as React.CSSProperties}
            className="pt-24 border-none grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            {prevEntry ? (
              <div className="flex flex-col gap-3">
                <span className="t-meta text-[var(--ink-2)]">
                  Previous entry
                </span>
                <div>
                  <HL
                    to={`/journal/${prevEntry.slug}`}
                    large={true}
                    ariaLabel={`Previous entry: ${prevEntry.title}`}
                    className="t-item text-[var(--ink)] min-h-[44px] inline-flex items-center"
                  >
                    {prevEntry.title}
                  </HL>
                </div>
              </div>
            ) : (
              <div />
            )}

            {nextEntry && (
              <div className="flex flex-col gap-3 md:text-right">
                <span className="t-meta text-[var(--ink-2)]">
                  Next entry
                </span>
                <div>
                  <HL
                    to={`/journal/${nextEntry.slug}`}
                    large={true}
                    ariaLabel={`Next entry: ${nextEntry.title}`}
                    className="t-item text-[var(--ink)] min-h-[44px] inline-flex items-center"
                  >
                    {nextEntry.title}
                  </HL>
                </div>
              </div>
            )}
          </footer>
        )}
      </div>
    </article>
  );
}

export default JournalEntryPage;
