/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import Words from "../components/Words";
import siteContent from "../content/site";

/**
 * About Section
 * Normal flow, background #F5F4F0, padding-block var(--pad-y).
 * Replicates Contact block reveal structure:
 * - Single hugging group with data-reveal-at="0.8"
 * - Label "About" at 0ms
 * - Paragraph words at +120ms
 * - Four capability columns (+160ms apart; items +60ms apart)
 */
export function About() {
  const { title, paragraph, capabilities } = siteContent.about;

  return (
    <section
      aria-label="About"
      className="w-full bg-[#F5F4F0]"
      style={{
        paddingBlock: "var(--pad-y, clamp(96px, 12vw, 176px))",
      }}
    >
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col justify-between">
        {/* Single hugging group (trigger: 0.8) */}
        <div
          data-reveal-group
          data-reveal-id="about"
          data-reveal-at="0.8"
          className="w-full flex flex-col"
        >
          {/* Label "About" token (d 0ms) */}
          <div
            data-reveal-child
            style={{ "--d": "0ms" } as React.CSSProperties}
            className="pt-2"
          >
            <Words
              as="h2"
              text={title}
              delay={0}
              isChild={true}
              className="title-section text-[var(--ink)]"
            />
          </div>

          {/* Paragraph in cols 5-12 as words with d=120ms (uses var(--ink)) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 lg:mt-16">
            <div className="lg:col-start-5 lg:col-span-8 min-w-0">
              <div
                data-reveal-child
                style={{ "--d": "120ms" } as React.CSSProperties}
              >
                <Words
                  as="p"
                  text={paragraph}
                  delay={120}
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
          </div>

          {/* Capabilities block: 4 columns (+160ms apart; items +60ms apart) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16 lg:mt-24 pb-2">
            <div className="lg:col-start-5 lg:col-span-8 min-w-0">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 gap-y-12">
                {capabilities.map((col, cIdx) => {
                  const colBaseDelay = 280 + cIdx * 160;

                  return (
                    <div key={col.title}>
                      <h3
                        data-reveal-child
                        style={{ "--d": `${colBaseDelay}ms` } as React.CSSProperties}
                        className="font-editorial-italic font-normal italic text-[26px] leading-[1.1] text-[var(--ink)] mb-4"
                      >
                        {col.title}
                      </h3>
                      <ul className="list-none p-0 m-0 flex flex-col gap-2">
                        {col.items.map((item, iIdx) => {
                          const itemDelay = colBaseDelay + 60 + iIdx * 60;
                          return (
                            <li
                              key={item}
                              data-reveal-child
                              style={{ "--d": `${itemDelay}ms` } as React.CSSProperties}
                              className="t-body text-[var(--ink)]"
                            >
                              {item}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
