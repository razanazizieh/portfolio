/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import HL from "../components/HL";
import Words from "../components/Words";
import Wordmark from "../components/Wordmark";
import siteContent from "../content/site";

/**
 * Contact and Footer as ONE final screen (Order 6, z=6)
 * - Final panel: min-height 100svh (not sticky), display grid, grid-template-rows: auto 1fr auto auto
 * - padding-top: clamp(96px, 12svh, 144px)
 * - Contact block sizes:
 *   - headline clamp(2.75rem, min(7vw, 12svh), 7rem)
 *   - email clamp(1.75rem, min(4.2vw, 7svh), 3.75rem)
 *   - gaps clamp(24px, 4svh, 56px)
 * - Wordmark and bottom row visible in the same viewport as Contact headline across desktop and mobile.
 * - Single reveal group:
 *   headline 0, sentence +250, email +450, links +850, wordmark +1000 (1200ms), bottom row +1500.
 * - On the home route ("/"), row 4 shows only "© 2026" on the left and "Journal" and "Privacy" on the right.
 */
export default function Contact() {
  const [copied, setCopied] = useState(false);
  const { headline, sentence, email, location } = siteContent.contact;
  const { linkedin, github } = siteContent.socials;
  const { year } = siteContent.footer;

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = email;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const gapStyle = { height: "clamp(24px, 4svh, 56px)" };

  return (
    <section
      aria-label="Contact"
      data-reveal-group
      data-reveal-id="contact"
      data-reveal-at="0.82"
      className="min-h-[100svh] w-full flex flex-col justify-between bg-[#F5F4F0]"
      style={{
        minHeight: "100svh",
        paddingTop: "var(--pad-y, clamp(96px, 12vw, 176px))",
        paddingBottom: "clamp(24px, 3.5svh, 48px)",
      }}
    >
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 flex-1 grid grid-rows-[auto_1fr_auto_auto] gap-0">
        {/* Row 1: Contact block */}
        <div className="w-full">
          {/* Headline (d 0ms) */}
          <div data-reveal-child style={{ '--d': '0ms' } as React.CSSProperties}>
            <Words
              as="h2"
              text={headline}
              delay={0}
              isChild={true}
              className="text-[var(--ink)] pb-[0.12em] -mb-[0.12em] block font-light leading-none tracking-[-0.045em]"
              style={{
                fontSize: "clamp(2.75rem, min(7vw, 12svh), 7rem)",
                lineHeight: 1,
                letterSpacing: "-0.045em",
                fontWeight: 300,
                fontVariationSettings: "'wght' 300",
              }}
            />
          </div>

          <div style={gapStyle} aria-hidden="true" />

          {/* Sentence (d 250ms) - uses var(--ink) */}
          <div data-reveal-child style={{ '--d': '250ms' } as React.CSSProperties}>
            <Words
              as="p"
              text={sentence}
              delay={250}
              isChild={true}
              className="t-lead max-w-[44ch]"
              style={{
                color: "var(--ink)",
                fontWeight: 340,
                fontVariationSettings: "'wght' 340",
              }}
            />
          </div>

          <div style={gapStyle} aria-hidden="true" />

          {/* Email as ONE text node inside mask wrapper (d 450ms) */}
          <div
            data-reveal-child
            style={{ '--d': '450ms' } as React.CSSProperties}
            className="email-mask-wrapper"
          >
            <div className="email-slide-inner">
              <a
                href={`mailto:${email}`}
                aria-label={`Send email to ${email}`}
                className="email-link min-h-[44px] inline-flex items-center no-underline cursor-pointer"
                style={{
                  fontSize: "clamp(1.75rem, min(4.2vw, 7svh), 3.75rem)",
                }}
              >
                <span className="email-ts-wrap">
                  <span className="email-ts-rest">{email}</span>
                  <span className="email-ts-hover">{email}</span>
                </span>
              </a>
            </div>
          </div>

          <div style={gapStyle} aria-hidden="true" />

          {/* Links row (d 850ms) */}
          <div className="flex flex-wrap items-center gap-8 t-ui">
            <div
              data-reveal-child
              style={{ '--d': '850ms' } as React.CSSProperties}
            >
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label={copied ? "Email address copied to clipboard" : "Copy email address"}
                aria-live="polite"
                className="bg-transparent border-none p-0 text-left min-h-[44px] inline-flex items-center t-ui text-[var(--ink)] cursor-pointer focus-visible:outline"
              >
                <HL asSpan={true} className="t-ui text-[var(--ink)]">
                  {copied ? "Copied" : "Copy email"}
                </HL>
              </button>
            </div>

            <div
              data-reveal-child
              style={{ '--d': '940ms' } as React.CSSProperties}
            >
              <HL
                href={linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                ariaLabel="LinkedIn profile"
                className="t-ui text-[var(--ink)] min-h-[44px] inline-flex items-center"
              >
                {linkedin.label}
              </HL>
            </div>

            <div
              data-reveal-child
              style={{ '--d': '1030ms' } as React.CSSProperties}
            >
              <HL
                href={github.url}
                target="_blank"
                rel="noopener noreferrer"
                ariaLabel="GitHub profile"
                className="t-ui text-[var(--ink)] min-h-[44px] inline-flex items-center"
              >
                {github.label}
              </HL>
            </div>

            <div
              data-reveal-child
              style={{ '--d': '1120ms' } as React.CSSProperties}
            >
              <span className="t-ui text-[var(--ink-2)] min-h-[44px] inline-flex items-center">
                {location}
              </span>
            </div>
          </div>
        </div>

        {/* Row 2: Flexible space (at least clamp(56px, 8svh, 96px)) */}
        <div className="min-h-[clamp(56px,8svh,96px)]" aria-hidden="true" />

        {/* Row 3: Giant Edge-to-Edge Wordmark (d 1000ms, 1200ms clip slide) */}
        <div
          data-reveal-child
          style={{ '--d': '1000ms' } as React.CSSProperties}
          className="w-full overflow-hidden leading-none pb-4"
        >
          <div
            className="wordmark-reveal-content w-full overflow-hidden leading-none"
            style={{ '--d': '1000ms' } as React.CSSProperties}
          >
            <Wordmark />
          </div>
        </div>

        {/* Row 4: Bottom row: © 2026, Privacy (d 1500ms) on home route */}
        <div
          data-reveal-child
          style={{ '--d': '1500ms' } as React.CSSProperties}
          className="flex flex-wrap justify-between items-center gap-4 t-ui text-[var(--ink-2)] pt-2"
        >
          <span className="text-[var(--ink-2)]">&copy; {year}</span>
          <div className="flex items-center gap-6">
            <HL
              to="/privacy"
              ariaLabel="Privacy"
              className="text-[var(--ink-2)] min-h-[44px] inline-flex items-center"
            >
              Privacy
            </HL>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Contact };
