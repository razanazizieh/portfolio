/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useLocation } from "react-router-dom";
import HL from "./HL";
import Wordmark from "./Wordmark";
import siteContent from "../content/site";

export interface FooterProps {
  wordmarkDelay?: number;
  rowDelay?: number;
}

/**
 * Editorial Footer
 * Standalone footer rendered on inner pages (case studies, journal, privacy).
 */
export default function Footer({
  wordmarkDelay = 0,
  rowDelay,
}: FooterProps) {
  const location = useLocation();
  const isPrivacyRoute = location.pathname === "/privacy";
  const { year } = siteContent.footer;
  const { linkedin, github } = siteContent.socials;

  const resolvedRowDelay = rowDelay !== undefined ? rowDelay : wordmarkDelay + 450;

  return (
    <footer
      data-reveal-group
      data-reveal-id="footer"
      data-reveal-at="0.9"
      className="w-full"
    >
      <div className="flex flex-col gap-8 w-full">
        {/* Giant Edge-to-Edge Wordmark button */}
        <div
          data-reveal-child
          style={{ '--d': `${wordmarkDelay}ms` } as React.CSSProperties}
          className="w-full overflow-hidden leading-none"
        >
          <div
            className="wordmark-reveal-content w-full overflow-hidden leading-none"
            style={{ '--d': `${wordmarkDelay}ms` } as React.CSSProperties}
          >
            <Wordmark />
          </div>
        </div>

        {/* Footer row: © 2026, LinkedIn, GitHub, Privacy */}
        <div
          data-reveal-child
          style={{ '--d': `${resolvedRowDelay}ms` } as React.CSSProperties}
          className="flex flex-wrap justify-between items-center gap-4 t-ui text-[var(--ink-2)]"
        >
          <span className="text-[var(--ink-2)]">&copy; {year}</span>
          <div className="flex items-center gap-6">
            <HL
              href={linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              ariaLabel="LinkedIn"
              className="text-[var(--ink-2)] min-h-[44px] inline-flex items-center"
            >
              {linkedin.label}
            </HL>
            <HL
              href={github.url}
              target="_blank"
              rel="noopener noreferrer"
              ariaLabel="GitHub"
              className="text-[var(--ink-2)] min-h-[44px] inline-flex items-center"
            >
              {github.label}
            </HL>
            {!isPrivacyRoute && (
              <HL
                to="/privacy"
                ariaLabel="Privacy"
                className="text-[var(--ink-2)] min-h-[44px] inline-flex items-center"
              >
                Privacy
              </HL>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
