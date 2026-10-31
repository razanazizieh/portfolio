/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigationType, useParams } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";

import Layout from "./components/Layout";
import Hero from "./sections/Hero";
import Work from "./sections/Work";
import Statement from "./sections/Statement";
import About from "./sections/About";
import JournalSection from "./sections/JournalSection";
import Contact from "./sections/Contact";
import Preloader from "./components/Preloader";
import PerfDebug from "./components/PerfDebug";
import NavDebug from "./components/NavDebug";
import PageTransition from "./components/PageTransition";
import { StackPanelsContainer, StackPanel } from "./components/StackPanel";
import { useSmoothScroll, getLenis } from "./hooks/useSmoothScroll";
import { useRevealEngine, triggerRevealCheck } from "./hooks/useRevealEngine";
import { scrollToSection } from "./lib/scroll";
import { initGlobalPrefetch } from "./lib/prefetch";
import siteContent from "./content/site";
import { getProjectBySlug } from "./data/projects";
import { getEntryBySlug } from "./data/journal";

// Lazy-loaded pages
const ProjectPage = React.lazy(() => import("./pages/ProjectPage"));
const JournalListPage = React.lazy(() => import("./pages/JournalListPage"));
const JournalEntryPage = React.lazy(() => import("./pages/JournalEntryPage"));
const PrivacyPage = React.lazy(() => import("./pages/PrivacyPage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

/**
 * Normalizes trailing slashes (e.g. /journal/ -> /journal, /work/slug/ -> /work/slug)
 */
function TrailingSlashHandler() {
  const location = useLocation();
  if (location.pathname.length > 1 && location.pathname.endsWith("/")) {
    const cleanPath = location.pathname.slice(0, -1);
    return <Navigate to={cleanPath + location.search + location.hash} replace />;
  }
  return null;
}

/**
 * Scroll restoration and navigation handler
 */
function ScrollRestorationHandler() {
  const location = useLocation();
  const navType = useNavigationType();

  React.useEffect(() => {
    const saveScroll = () => {
      try {
        sessionStorage.setItem(`scroll_${location.key}`, String(window.scrollY));
      } catch {
        // Safe guard
      }
    };

    window.addEventListener("scroll", saveScroll, { passive: true });
    return () => {
      saveScroll();
      window.removeEventListener("scroll", saveScroll);
    };
  }, [location.key]);

  React.useEffect(() => {
    let t300: ReturnType<typeof setTimeout> | null = null;

    if (navType === "POP") {
      const saved = sessionStorage.getItem(`scroll_${location.key}`);
      if (saved !== null) {
        const y = parseFloat(saved);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const lenis = getLenis();
            if (lenis) {
              lenis.scrollTo(y, { immediate: true });
            } else {
              window.scrollTo({ top: y, left: 0, behavior: "instant" });
            }
          });
        });
        return;
      }
    }

    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      const targetId = state.scrollTo;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (document.fonts && document.fonts.ready) {
            document.fonts.ready
              .then(() => {
                scrollToSection(targetId);
              })
              .catch(() => {
                scrollToSection(targetId);
              });
          } else {
            scrollToSection(targetId);
          }
        });
      });
      return;
    }

    if (location.hash) {
      const hashId = location.hash.replace("#", "");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (document.fonts && document.fonts.ready) {
            document.fonts.ready
              .then(() => {
                scrollToSection(hashId);
              })
              .catch(() => {
                scrollToSection(hashId);
              });
          } else {
            scrollToSection(hashId);
          }
        });
      });
      return;
    }

    if (navType === "PUSH") {
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    }

    // Item 1(d): after every route change (two rAFs and again at 300ms)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        triggerRevealCheck();
      });
    });

    t300 = setTimeout(() => {
      triggerRevealCheck();
    }, 300);

    return () => {
      if (t300 !== null) clearTimeout(t300);
    };
  }, [location.pathname, location.hash, location.key, location.state, navType]);

  return null;
}

/**
 * Home View orchestrating stacking panels
 */
function HomePage() {
  return (
    <PageTransition>
      <Helmet>
        <title>{siteContent.meta.title}</title>
        <meta name="description" content={siteContent.meta.description} />
        <meta property="og:title" content={siteContent.meta.title} />
        <meta property="og:description" content={siteContent.meta.description} />
      </Helmet>

      <Hero />

      {/* Normal-flow anchor marker for #work placed before Work section */}
      <span
        id="work"
        className="block h-0 w-0 invisible pointer-events-none"
        aria-hidden="true"
      />
      <Work />

      <StackPanelsContainer>
        <StackPanel order={1} name="Statement">
          <Statement />
        </StackPanel>

        {/* Normal-flow anchor marker for #about placed before About panel */}
        <span
          id="about"
          className="block h-0 w-0 invisible pointer-events-none"
          aria-hidden="true"
        />
        <StackPanel order={2} name="About">
          <About />
        </StackPanel>

        {/* Normal-flow anchor marker for #journal placed before Journal panel */}
        <span
          id="journal"
          className="block h-0 w-0 invisible pointer-events-none"
          aria-hidden="true"
        />
        <StackPanel order={3} name="Journal">
          <JournalSection />
        </StackPanel>

        {/* Normal-flow anchor marker for #contact placed before Contact panel */}
        <span
          id="contact"
          className="block h-0 w-0 invisible pointer-events-none"
          aria-hidden="true"
        />
        <StackPanel order={4} isFinal={true} name="Contact">
          <Contact />
        </StackPanel>
      </StackPanelsContainer>
    </PageTransition>
  );
}

/**
 * Case Study Route Wrapper: renders NotFound OUTSIDE Layout if slug is unknown
 */
function ProjectRouteWrapper() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug);

  if (!project) {
    return <NotFound />;
  }

  return (
    <Layout chrome={true} showFooter={true}>
      <PageTransition>
        <ProjectPage />
      </PageTransition>
    </Layout>
  );
}

/**
 * Journal Entry Route Wrapper: renders NotFound OUTSIDE Layout if slug is unknown
 */
function JournalEntryRouteWrapper() {
  const { slug } = useParams<{ slug: string }>();
  const entry = getEntryBySlug(slug);

  if (!entry) {
    return <NotFound />;
  }

  return (
    <Layout chrome={true} showFooter={true}>
      <PageTransition>
        <JournalEntryPage />
      </PageTransition>
    </Layout>
  );
}

export default function App() {
  useSmoothScroll(true);
  useRevealEngine();

  // Prefetch routes and images on interaction and idle
  useEffect(() => {
    initGlobalPrefetch();
  }, []);

  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <HelmetProvider>
      {/* Global Preloader (Home route only, once per session, does not hide LCP) */}
      {isHome && <Preloader />}

      {/* Performance Diagnostic Overlay (?debug=perf) */}
      <PerfDebug />

      {/* Navigation Diagnostic Overlay (?debug=nav) */}
      <NavDebug />

      {/* Trailing slash redirection handler */}
      <TrailingSlashHandler />

      {/* Route Scroll & Restoration Handling */}
      <ScrollRestorationHandler />

      {/* Application Routes with Code Splitting & Transitions */}
      <Suspense fallback={null}>
        <Routes location={location}>
          <Route
            path="/"
            element={
              <Layout chrome={true} showFooter={false}>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/work"
            element={<Navigate to="/#work" replace />}
          />
          <Route
            path="/work/:slug"
            element={<ProjectRouteWrapper />}
          />
          <Route
            path="/journal"
            element={
              <Layout chrome={true} showFooter={true}>
                <PageTransition>
                  <JournalListPage />
                </PageTransition>
              </Layout>
            }
          />
          <Route
            path="/journal/:slug"
            element={<JournalEntryRouteWrapper />}
          />
          <Route
            path="/privacy"
            element={
              <Layout chrome={true} showFooter={true}>
                <PageTransition>
                  <PrivacyPage />
                </PageTransition>
              </Layout>
            }
          />
          <Route
            path="/index.html"
            element={<Navigate to="/" replace />}
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </Suspense>
    </HelmetProvider>
  );
}

export { App };
