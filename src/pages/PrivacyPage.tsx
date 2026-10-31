/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { TS } from "../components/TS";
import { Words } from "../components/Words";

interface PrivacySection {
  label: string;
  content: React.ReactNode;
}

const SECTIONS: PrivacySection[] = [
  {
    label: "Summary",
    content: "This site has no forms, cookies, analytics or tracking.",
  },
  {
    label: "What is stored",
    content:
      "The site stores one value in your browser's session storage so the intro animation does not replay. It stays on your device and is deleted when you close the tab.",
  },
  {
    label: "Fonts",
    content: "Fonts are served from this site. No request is sent to a font provider.",
  },
  {
    label: "Hosting",
    content:
      "This site is hosted on GitHub Pages. As the host, GitHub may log technical data such as your IP address when you visit. How GitHub handles it is described in GitHub's privacy statement.",
  },
  {
    label: "Email",
    content: "If you email me, I use your address only to reply.",
  },
  {
    label: "External links",
    content:
      "Links to LinkedIn, GitHub and project demos lead to sites with their own privacy policies.",
  },
  {
    label: "Contact",
    content: (
      <a
        href="mailto:razan_az@outlook.com"
        aria-label="Send email to razan_az@outlook.com"
        className="text-[var(--ink)] inline-block no-underline cursor-pointer"
      >
        <TS>razan_az@outlook.com</TS>
      </a>
    ),
  },
  {
    label: "Last updated",
    content: "October 2026.",
  },
];

/**
 * Privacy Page (/privacy)
 * - Matching layout, title token, and reveal structure of the Journal page.
 * - Title "Privacy", t-body, max 62ch, cols 5-12, sections with t-meta labels.
 * - Back link "Home", links to "/".
 * - No underline classes anywhere; links use type swap only.
 */
export function PrivacyPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen pt-32 pb-32 max-w-[1600px] mx-auto px-6 md:px-12">
      <div data-reveal-group data-reveal-id="privacy" className="w-full">
        <Helmet>
          <title>Privacy — Razan Azizieh</title>
          <meta
            name="description"
            content="Privacy policy for Razan Azizieh's portfolio site. This site has no forms, cookies, analytics or tracking."
          />
          <meta property="og:title" content="Privacy — Razan Azizieh" />
          <meta
            property="og:description"
            content="Privacy policy for Razan Azizieh's portfolio site. This site has no forms, cookies, analytics or tracking."
          />
        </Helmet>

        {/* Top back link: Home */}
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
              text="Privacy"
              delay={0}
              isChild={true}
              className="title-section text-[var(--ink)]"
            />
          </div>
        </header>

        <section aria-label="Privacy Policy Details" className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-start-5 lg:col-span-8 flex flex-col gap-12 max-w-[62ch]">
            {SECTIONS.map((section, idx) => {
              const delayMs = 150 + idx * 80;

              return (
                <div
                  key={section.label}
                  data-reveal-child
                  style={{ "--d": `${delayMs}ms` } as React.CSSProperties}
                  className="flex flex-col gap-2"
                >
                  <h2 className="t-meta text-[var(--ink-2)]">
                    {section.label}
                  </h2>
                  <div className="t-body text-[var(--ink)]">
                    {section.content}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPage;
