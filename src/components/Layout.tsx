/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";
import PerfOverlay from "./PerfOverlay";

export interface LayoutProps {
  children: ReactNode;
  chrome?: boolean;
  showFooter?: boolean;
}

import { ReactNode } from "react";

/**
 * Unified Layout Component
 * - Accessibility: Skip link to #main, semantic <main id="main">, <nav aria-label="Primary">
 * - Chrome switch: controls visibility of Nav and ScrollProgress (chrome=false on 404)
 * - Footer: rendered inside a data-reveal-group wrapper on project, journal, and privacy pages
 */
export function Layout({
  children,
  chrome = true,
  showFooter = false,
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#F5F4F0] text-[var(--ink)] font-sans antialiased selection:bg-[var(--ink)] selection:text-[#F5F4F0]">
      {/* Accessible Skip Link to #main */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[var(--ink)] focus:text-[#F5F4F0] focus:text-xs focus:outline-2 focus:outline-[#F5F4F0] focus:shadow-lg"
      >
        Skip to content
      </a>

      {chrome && (
        <>
          <ScrollProgress />
          <Nav />
        </>
      )}

      <main
        id="main"
        tabIndex={-1}
        className={`focus:outline-none ${!chrome ? "h-[100dvh] max-h-[100dvh] overflow-hidden m-0 p-0" : "min-h-screen"}`}
      >
        {children}
      </main>

      {showFooter && (
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 pb-12 pt-16">
          <Footer />
        </div>
      )}

      <PerfOverlay />
    </div>
  );
}

export default Layout;
