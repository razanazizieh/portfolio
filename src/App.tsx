/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useLocation, useNavigate } from "react-router-dom";

import OpeningExperience from "./components/OpeningExperience";
import SelectedWork from "./components/SelectedWork";
import StatementSection from "./components/StatementSection";
import Contact from "./components/Contact";
import ProjectCaseStudy from "./components/ProjectCaseStudy";
import NotFound from "./components/NotFound";
import { useSmoothScroll, getLenis } from "./hooks/useSmoothScroll";
import { PROJECTS_DATA } from "./data";
import { getResponsiveImageProps } from "./assets/imageManifest";
import TransitionOverlay from "./components/TransitionOverlay";
import { MOTION_CURVE_PREMIUM } from "./utils/motion";

import PageLoader from "./components/PageLoader";
import AboutSection from "./components/AboutSection";
import Header from "./components/Header";
import MobileMenu from "./components/MobileMenu";
import BackToTop from "./components/BackToTop";
import ContextualCursorPill from "./components/ContextualCursorPill";
import { useStickySection } from "./hooks/useStickySection";

export default function App() {
  const shouldReduceMotion = useReducedMotion();
  const location = useLocation();
  const navigate = useNavigate();

  const [theme, setTheme] = useState<"dark" | "light">(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "dark" || saved === "light") return saved;
    } catch (e) {
      // Ignore localStorage errors
    }
    return "light";
  });
  const [isFooterReached, setIsFooterReached] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [activeCaseStudy, setActiveCaseStudy] = useState<
    (typeof PROJECTS_DATA)[0] | null
  >(null);
  const [activeFilter, setActiveFilter] = useState<
    "ALL" | "FULL-STACK" | "CODE" | "UI"
  >("ALL");
  const [isNotFound, setIsNotFound] = useState(false);

  const isSectionTrackingDormant = activeCaseStudy !== null || isNotFound;

  // Manual scroll tracking refs to prevent state stutter and jumpy active states during click scrolls
  const isManualScrolling = useRef(false);
  const manualScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Transition overlay state
  const [transitionStep, setTransitionStep] = useState<0 | 1 | 2 | 3>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuToggleRef = useRef<HTMLButtonElement>(null);

  // Dynamic sticky offsets for editorial pull-up section transitions
  const heroSticky = useStickySection<HTMLElement>();
  const aboutSticky = useStickySection<HTMLElement>();
  const worksSticky = useStickySection<HTMLElement>();
  const statementSticky = useStickySection<HTMLElement>();
  const contactSticky = useStickySection<HTMLElement>();

  // Clean up manual scroll timeout on unmount
  useEffect(() => {
    return () => {
      if (manualScrollTimeoutRef.current) {
        clearTimeout(manualScrollTimeoutRef.current);
      }
    };
  }, []);

  // Precise IntersectionObserver with vertical threshold detection for active navigation states
  useEffect(() => {
    if (loading || isSectionTrackingDormant) return;

    let observer: IntersectionObserver | null = null;
    let timeoutId: NodeJS.Timeout | null = null;
    let frameId: number | null = null;

    const setupObserver = () => {
      const observerOptions = {
        root: null,
        rootMargin: "-20% 0px -45% 0px", // Calibrated active band for reliable triggering of compact and large sections
        threshold: [0.05, 0.1, 0.2],
      };

      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        // Prevent observer from overwriting the active state when manually scrolling/navigating via clicks
        if (isManualScrolling.current) return;

        // Filter intersecting entries to resolve the most prominent active section
        const intersecting = entries.filter((entry) => entry.isIntersecting);
        if (intersecting.length > 0) {
          // Find the section with the highest intersection ratio or best vertical alignment
          const bestEntry = intersecting.reduce((best, current) =>
            current.intersectionRatio > best.intersectionRatio ? current : best,
          );
          const id = bestEntry.target.id;
          const navId = id === "statement" ? "works" : id;
          setActiveSection((prev) => (prev === navId ? prev : navId));
        }
      };

      observer = new IntersectionObserver(observerCallback, observerOptions);

      const sections = ["hero", "about", "works", "statement", "contact"];
      let foundAll = true;

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          observer?.observe(el);
        } else {
          foundAll = false;
        }
      });

      // Perform a robust initial manual detection of the active section on mount/hydration
      // to guarantee it resolves correctly even before any scroll event occurs
      if (!isManualScrolling.current) {
        let bestSection = "hero";
        let maxVisibleHeight = 0;

        sections.forEach((id) => {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            // Calculate overlapping height with viewport
            const visibleTop = Math.max(0, rect.top);
            const visibleBottom = Math.min(window.innerHeight, rect.bottom);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);

            if (visibleHeight > maxVisibleHeight) {
              maxVisibleHeight = visibleHeight;
              bestSection = id;
            }
          }
        });

        if (maxVisibleHeight > 0) {
          setActiveSection(bestSection);
        }
      }

      // If hydration or rendering of some sections is delayed, retry observing them shortly
      if (!foundAll) {
        timeoutId = setTimeout(setupObserver, 100);
      }
    };

    // Use nested requestAnimationFrames to defer until the DOM is fully rendered/hydrated and stable
    frameId = requestAnimationFrame(() => {
      frameId = requestAnimationFrame(() => {
        setupObserver();
      });
    });

    return () => {
      if (observer) observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [loading, isSectionTrackingDormant]);

  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuToggleRef.current) {
      mobileMenuToggleRef.current.focus();
    }
  }, [isMobileMenuOpen]);

  const triggerTransition = (onHalfway: () => void) => {
    setTransitionStep(1);
    setTimeout(() => {
      setTransitionStep(2);
    }, 10);
    setTimeout(() => {
      onHalfway();
      setTransitionStep(3);
    }, 450);
    setTimeout(() => {
      setTransitionStep(0);
    }, 900);
  };

  const triggerTransitionOverlay = (show: boolean) => {
    if (show) {
      setTransitionStep(1);
      setTimeout(() => {
        setTransitionStep(2);
      }, 10);
    } else {
      setTransitionStep(3);
      setTimeout(() => {
        setTransitionStep(0);
      }, 450);
    }
  };

  const unlockScroll = () => {
    document.body.style.overflow = "unset";
    document.body.style.height = "";
    document.body.style.position = "";
    document.body.style.pointerEvents = "auto";
    document.documentElement.style.overflow = "unset";
    document.documentElement.style.height = "";
    document.documentElement.style.position = "";
    document.documentElement.style.pointerEvents = "auto";
    getLenis()?.start();
  };

  const handleNav = (
    e: React.SyntheticEvent | { preventDefault: () => void },
    targetId: string,
  ) => {
    e.preventDefault();

    // Unlock body scroll lock immediately for mobile navigation
    setIsMobileMenuOpen(false);
    unlockScroll();

    // If not on homepage or a case study or 404 is open, perform transition overlay to homepage
    if (location.pathname !== "/" || activeCaseStudy !== null || isNotFound) {
      triggerTransitionOverlay(true); // Initiate curtain cover
      setTimeout(() => {
        setActiveCaseStudy(null); // Sync state change to mount homepage instantly
        setIsNotFound(false);
        navigate("/");
        setTimeout(() => {
          unlockScroll();
          // Reposition scroll behind the curtain
          scrollSection(targetId, shouldReduceMotion ? "auto" : "smooth");
          triggerTransitionOverlay(false); // Retract curtain revealing content
        }, 50);
      }, 400);
    } else {
      // Direct smooth scroll & active section highlight when already on homepage
      setTimeout(() => {
        unlockScroll();
        scrollSection(targetId, shouldReduceMotion ? "auto" : "smooth");
      }, 20);
    }
  };

  // Ensure route changes forcefully reset mobile menu and unlock scrolling
  useEffect(() => {
    setIsMobileMenuOpen(false);
    unlockScroll();
  }, [location.pathname, activeCaseStudy, isNotFound]);

  // Body scroll lock during mobile menu open, with robust cleanup
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.pointerEvents = "auto";
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.pointerEvents = "auto";
      getLenis()?.stop();
    } else {
      unlockScroll();
    }
    return () => {
      unlockScroll();
    };
  }, [isMobileMenuOpen]);

  // Global layout keyboard scrolling enforcer to guarantee native keyboard scroll behavior
  useEffect(() => {
    const handleScrollKeysGlobal = (e: KeyboardEvent) => {
      // Allow default input behavior for interactive text fields
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        document.activeElement?.getAttribute("contenteditable") === "true"
      ) {
        return;
      }

      const standardScrollKeys = [
        "ArrowUp",
        "ArrowDown",
        " ",
        "PageUp",
        "PageDown",
        "Home",
        "End",
      ];
      if (standardScrollKeys.includes(e.key)) {
        // Stop keydown events from propagating to nested active focus elements
        // that might incorrectly intercept or run e.preventDefault() on them.
        e.stopPropagation();
      }
    };

    window.addEventListener("keydown", handleScrollKeysGlobal, {
      capture: true,
    });
    return () => {
      window.removeEventListener("keydown", handleScrollKeysGlobal, {
        capture: true,
      });
    };
  }, []);

  // Loader timer - fades in for 0.4s and delays for 0.8s, totaling 1.2s before sliding up
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    // Explicit fallback clean-up function to guarantee user can scroll normally under any circumstance
    const fallbackTimer = setTimeout(() => {
      document.body.style.overflow = "unset";
      document.body.style.position = "";
      document.documentElement.style.overflow = "unset";
      document.documentElement.style.position = "";
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Optimized image preloading: eager-load the modern WebP cover for the first above-the-fold project
  useEffect(() => {
    const firstProject = PROJECTS_DATA[0];
    if (firstProject && firstProject.image) {
      const responsive = getResponsiveImageProps(
        firstProject.image,
        "cinematic-anchor",
        true,
      );
      const img = new Image();
      if (responsive.webpSrcSet) {
        img.srcset = responsive.webpSrcSet;
        img.sizes = responsive.sizes;
      }
      img.src = responsive.src;
    }
  }, []);

  // Instatate Lenis-inspired premium motion scrolling
  useSmoothScroll(true);

  // Monitor scheme toggles
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      console.warn("Unable to write to localStorage.", e);
    }
  }, [theme]);

  // Dynamic SEO JSON-LD structured data and Document Title / Meta tags update
  useEffect(() => {
    // Remove existing dynamic script if present
    const existingScript = document.getElementById("dynamic-jsonld-seo");
    if (existingScript) {
      existingScript.remove();
    }

    let schemaData: any = null;

    if (activeCaseStudy) {
      schemaData = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "@id": `${window.location.origin}/work/${activeCaseStudy.id}`,
        name: activeCaseStudy.title,
        description: activeCaseStudy.overview,
        genre: activeCaseStudy.category,
        datePublished: activeCaseStudy.year,
        creator: {
          "@type": "Person",
          name: "Razan Azizieh",
          jobTitle: "Interactive Systems & Interfaces",
        },
        keywords: activeCaseStudy.technology.join(", "),
        url:
          activeCaseStudy.live ||
          `${window.location.origin}/work/${activeCaseStudy.id}`,
      };

      document.title = `${activeCaseStudy.title} — Razan Azizieh`;

      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          "content",
          `${activeCaseStudy.overview} An interactive case study by Razan Azizieh.`,
        );
      }
    } else if (isNotFound) {
      document.title = "404 Page Not Found — Razan Azizieh";
    } else {
      schemaData = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${window.location.origin}/#profile`,
        name: "Razan Azizieh — Interactive Systems & Computational Logic",
        description:
          "Portfolio of Razan Azizieh, focusing on system formation, computational logic, interactive interfaces, and dynamic digital experiences.",
        mainEntity: {
          "@type": "Person",
          name: "Razan Azizieh",
          jobTitle: "Interactive Interfaces & Systems Logic",
          url: window.location.origin,
          sameAs: [
            "https://github.com/razanazizieh",
            "https://www.linkedin.com/in/razan-azizieh",
          ],
          knowsAbout: [
            "Computational Logic",
            "Informatics",
            "Interactive Interface Systems",
            "Distributed Systems Logic",
            "Python",
            "TypeScript & React Ecosystem",
            "Interactive 3D Web Graphics & Spline Viewer Integration",
            "Custom React CMS & Live REST API CRUD Systems",
            "Bilingual Localization Systems & Static Local Translation Toggles",
            "HTML5 Canvas 2D Graphics Scripting & High-Performance Particle Simulations",
            "Framer Motion Micro-Animations & Dynamic Layout Transitions",
            "Swiss Minimalist Typography & Grid Layout Systems",
            "Responsive Design Optimization & Core Web Vitals Performance",
            "Performance-Decoupled Cursor Inertia Tracking & Input Handlers",
            "Modern Interface Styling: Tailwind CSS, CSS Modules, Stitches, & Bootstrap 5",
            "Build Optimization & Frontend Bundlers (Vite, Esbuild, Webpack)",
            "Touch-Responsive Interactive Sliders & Swiper.js Integrations",
            "Visual Grid Composition & Multi-Breakpoint Responsive Alignments",
          ],
          hasCredential: [
            {
              "@type": "EducationalOccupationalCredential",
              name: "Advanced React & Frontend Systems Certification",
              credentialCategory: "Professional Certification",
              recognizedBy: {
                "@type": "Organization",
                name: "Frontend Masters",
              },
            },
            {
              "@type": "EducationalOccupationalCredential",
              name: "Meta Front-End Systems Professional Certificate",
              credentialCategory: "Professional Certification",
              recognizedBy: {
                "@type": "Organization",
                name: "Meta",
              },
            },
            {
              "@type": "EducationalOccupationalCredential",
              name: "3D Interaction & Creative Systems Practitioner",
              credentialCategory: "Professional Certification",
              recognizedBy: {
                "@type": "Organization",
                name: "Three.js Journey",
              },
            },
            {
              "@type": "EducationalOccupationalCredential",
              name: "React & TypeScript Full-Stack Systems Specialist",
              credentialCategory: "Professional Certification",
              recognizedBy: {
                "@type": "Organization",
                name: "Udemy & React Training",
              },
            },
            {
              "@type": "EducationalOccupationalCredential",
              name: "Tailwind CSS & Responsive Interface Formation Certification",
              credentialCategory: "Professional Certification",
              recognizedBy: {
                "@type": "Organization",
                name: "CSS Design Systems Academy",
              },
            },
            {
              "@type": "EducationalOccupationalCredential",
              name: "RESTful API Integration & Client-Side CRUD Specialist",
              credentialCategory: "Professional Certification",
              recognizedBy: {
                "@type": "Organization",
                name: "Web Development Association",
              },
            },
          ],
        },
      };

      document.title = "Razan Azizieh";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          "content",
          "Portfolio of Razan Azizieh, showcasing system formation, interactive interfaces, 3D experiences, and dynamic digital systems.",
        );
      }
    }

    if (schemaData) {
      const script = document.createElement("script");
      script.id = "dynamic-jsonld-seo";
      script.type = "application/ld+json";
      script.text = JSON.stringify(schemaData);
      document.head.appendChild(script);
    }
  }, [activeCaseStudy, isNotFound]);

  const isSectionTrackingDormantRef = useRef(isSectionTrackingDormant);
  useEffect(() => {
    isSectionTrackingDormantRef.current = isSectionTrackingDormant;
  }, [isSectionTrackingDormant]);

  // Monitor scroll depth past thresholds to handle background transitions, reveal back-to-top control, and footer detection.
  // Consolidated into a single unified stable throttled handler using requestAnimationFrame to prevent multiple concurrent DOM reads
  // and dispatching state updates only upon transition to avoid excessive re-renders.
  useEffect(() => {
    if (loading) return;

    let ticking = false;
    let rafId: number | null = null;
    let isUnmounted = false;

    const handleScrollMonitor = () => {
      if (!ticking && !isUnmounted) {
        rafId = window.requestAnimationFrame(() => {
          if (isUnmounted) return;

          // Single cohesive DOM read phase
          const scrollY = window.scrollY;
          const winHeight = window.innerHeight;
          const docHeight = document.documentElement.scrollHeight;
          const scrollableHeight = docHeight - winHeight;

          setScrolledPastHero((prev) => {
            const next = scrollY > 200;
            return next === prev ? prev : next;
          });

          if (
            !isSectionTrackingDormantRef.current &&
            !isManualScrolling.current
          ) {
            const sectionEntries = [
              { id: "contact", el: contactSticky.ref.current },
              { id: "statement", el: statementSticky.ref.current },
              { id: "works", el: worksSticky.ref.current },
              { id: "about", el: aboutSticky.ref.current },
              { id: "hero", el: heroSticky.ref.current },
            ] as const;

            for (const { id: sId, el } of sectionEntries) {
              if (el && scrollY >= el.offsetTop - winHeight * 0.35) {
                const navId = sId === "statement" ? "works" : sId;
                setActiveSection((prev) => (prev === navId ? prev : navId));
                break;
              }
            }
          }

          setShowBackToTop((prev) => {
            const next = scrollY > winHeight * 0.5;
            return next === prev ? prev : next;
          });

          setIsFooterReached((prev) => {
            const next =
              scrollableHeight > 0 && scrollY >= scrollableHeight - 160;
            return next === prev ? prev : next;
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScrollMonitor, { passive: true });
    handleScrollMonitor(); // Run initially to guarantee sync on refresh/load

    return () => {
      isUnmounted = true;
      window.removeEventListener("scroll", handleScrollMonitor);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [loading]);

  useEffect(() => {
    const isProjectRoute =
      location.pathname.startsWith("/work/") ||
      location.pathname.startsWith("/project/");
    if (isProjectRoute) {
      const match = location.pathname.match(/\/(?:work|project)\/([^/]+)/);
      if (match) {
        const pId = match[1];
        const project = PROJECTS_DATA.find((p) => p.id === pId);
        if (project) {
          setActiveCaseStudy(project);
          setIsNotFound(false);
        } else {
          setActiveCaseStudy(null);
          setIsNotFound(true);
        }
      } else {
        setActiveCaseStudy(null);
        setIsNotFound(true);
      }
    } else if (location.pathname === "/") {
      setActiveCaseStudy(null);
      setIsNotFound(false);
    } else {
      setActiveCaseStudy(null);
      setIsNotFound(true);
    }
    setIsMobileMenuOpen(false);
    unlockScroll();
  }, [location.pathname]);

  const homepageScrollY = useRef(0);

  const handleActiveCaseStudyChange = (
    project: (typeof PROJECTS_DATA)[0] | null,
  ) => {
    if (project) {
      homepageScrollY.current = window.scrollY;
      navigate(`/work/${project.id}`);
    } else {
      setActiveCaseStudy(null); // Sync state change to mount homepage instantly
      navigate("/");
    }
  };

  useEffect(() => {
    // If we transitioned from a case study page back to the homepage
    if (!activeCaseStudy && location.pathname === "/") {
      // Restore scroll position after a layout reflow
      const restoreScroll = () => {
        window.scrollTo(0, homepageScrollY.current);
      };
      requestAnimationFrame(() => {
        requestAnimationFrame(restoreScroll);
      });
    }
  }, [activeCaseStudy, location.pathname]);

  const scrollSection = (id: string, behavior: ScrollBehavior = "smooth") => {
    let targetId = id;

    if (id === "selected-projects" || id === "works") {
      targetId = "works";
    } else if (id === "contact-gate" || id === "contact" || id === "connect") {
      targetId = "contact";
    } else if (id === "top" || id === "hero") {
      targetId = "hero";
    } else if (id === "about") {
      targetId = "about";
    } else if (id === "statement") {
      targetId = "statement";
    }

    // Set manual scrolling mode to true to prevent IntersectionObserver state stutter
    isManualScrolling.current = true;
    if (manualScrollTimeoutRef.current) {
      clearTimeout(manualScrollTimeoutRef.current);
    }
    manualScrollTimeoutRef.current = setTimeout(() => {
      isManualScrolling.current = false;
    }, 700);

    const lenis = getLenis();
    const effectiveDuration = shouldReduceMotion ? 0.01 : 0.75;
    const effectiveBehavior = shouldReduceMotion ? "auto" : behavior;

    let targetEl: HTMLElement | null = null;
    if (targetId === "hero") {
      targetEl = heroSticky.ref.current || document.getElementById("hero");
    } else if (targetId === "about") {
      targetEl = aboutSticky.ref.current || document.getElementById("about");
    } else if (targetId === "works") {
      targetEl = worksSticky.ref.current || document.getElementById("works");
    } else if (targetId === "statement") {
      targetEl =
        statementSticky.ref.current || document.getElementById("statement");
    } else if (targetId === "contact") {
      targetEl =
        contactSticky.ref.current || document.getElementById("contact");
    } else {
      targetEl = document.getElementById(targetId);
    }

    if (targetId === "hero") {
      setActiveSection("hero");
      if (lenis && !shouldReduceMotion) {
        lenis.scrollTo(0, { duration: effectiveDuration });
      } else {
        window.scrollTo({ top: 0, behavior: effectiveBehavior });
      }
    } else if (targetEl) {
      const navId = targetId === "statement" ? "works" : targetId;
      setActiveSection(navId);
      if (lenis && !shouldReduceMotion) {
        lenis.scrollTo(targetEl, { duration: effectiveDuration, offset: 0 });
      } else {
        targetEl.scrollIntoView({
          behavior: effectiveBehavior,
          block: "start",
        });
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] selection:bg-[var(--text-color)] selection:text-[var(--bg-color)] theme-transition overflow-x-clip">
      {/* Top sentinel for high-performance scroll/header-bg threshold tracking */}
      <div
        id="top-sentinel"
        className="absolute top-0 left-0 w-full h-[15px] pointer-events-none z-0"
      />

      {/* Premium Minimalist Page Preloader Transition Overlay */}
      <PageLoader loading={loading} />

      {/* Persistent Global Editorial Header with flat high-contrast matte background past hero */}
      {!isNotFound && (
        <>
          <Header
            theme={theme}
            setTheme={setTheme}
            activeSection={activeSection}
            scrolledPastHero={scrolledPastHero}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            handleNav={handleNav}
            activeCaseStudy={activeCaseStudy}
            mobileMenuToggleRef={mobileMenuToggleRef}
            forceShowLogo={!!activeCaseStudy || isNotFound}
            isNotFound={isNotFound}
          />

          {/* Mobile Menu Overlay */}
          <MobileMenu
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            activeSection={activeSection}
            activeCaseStudy={activeCaseStudy}
            handleNav={handleNav}
          />
        </>
      )}
      {/* Immersive Pages Routing with Framer Motion transitions */}
      {isNotFound ? (
        <AnimatePresence mode="wait">
          <motion.div
            key="not-found-page"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
            transition={{ duration: 0.45, ease: MOTION_CURVE_PREMIUM }}
            className="w-full relative overflow-x-hidden"
          >
            <NotFound handleNav={handleNav} />
          </motion.div>
        </AnimatePresence>
      ) : (
        <>
          {/* Main Home Page remains persistently mounted for instantaneous, low-latency entry/return and scroll position retention */}
          <main
            id="main-content"
            className="w-full relative"
            style={{ display: activeCaseStudy ? "none" : "block" }}
          >
            {/* 1. Immersive Opening Fold (Sticky Top Layer) */}
            <section
              id="hero"
              ref={heroSticky.ref}
              aria-labelledby="hero-heading"
              data-section="hero"
              data-hero-section="true"
              data-hero-canvas="true"
              onClick={() => scrollSection("contact", "smooth")}
              style={{
                position: heroSticky.isStickyEnabled ? "sticky" : "relative",
                top: heroSticky.stickyTop,
                zIndex: 10,
              }}
              className="w-full min-h-[100dvh] flex flex-col justify-center bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300 cursor-default"
            >
              <h2 id="hero-heading" className="sr-only">
                Razan Azizieh — Overview
              </h2>
              <OpeningExperience
                onCtaClick={() => scrollSection("contact", "smooth")}
                loading={loading}
              />
            </section>

            {/* 2. About Narrative Layer - Pulls up smoothly over Hero */}
            <section
              id="about-layer"
              ref={aboutSticky.ref}
              aria-labelledby="about-heading"
              data-section="about"
              style={{
                position: aboutSticky.isStickyEnabled ? "sticky" : "relative",
                top: aboutSticky.stickyTop,
                zIndex: 20,
              }}
              className="w-full min-h-[100dvh] flex flex-col justify-between bg-[var(--bg-color)] transition-colors duration-300"
            >
              <h2 id="about-heading" className="sr-only">
                About — Perspective and Inquiry
              </h2>
              <AboutSection key="about-section" />
            </section>

            {/* 3. Selected Works Layer - Pulls up smoothly over About */}
            <section
              id="works-container"
              ref={worksSticky.ref}
              aria-labelledby="works-heading"
              data-section="works"
              style={{
                position: worksSticky.isStickyEnabled ? "sticky" : "relative",
                top: worksSticky.stickyTop,
                zIndex: 30,
              }}
              className="w-full min-h-[100dvh] bg-[var(--bg-color)] transition-colors duration-300"
            >
              <h2 id="works-heading" className="sr-only">
                Portfolio — Selected Work
              </h2>
              <SelectedWork
                activeProject={activeCaseStudy}
                onActiveProjectChange={handleActiveCaseStudyChange}
                triggerWipe={triggerTransition}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
              />
            </section>

            {/* 4. Philosophy Statement Layer - Pulls up smoothly over Works */}
            <section
              id="statement"
              ref={statementSticky.ref}
              aria-labelledby="statement-heading"
              data-section="statement"
              style={{
                position: statementSticky.isStickyEnabled
                  ? "sticky"
                  : "relative",
                top: statementSticky.stickyTop,
                zIndex: 40,
              }}
              className="w-full min-h-[85vh] sm:min-h-[100dvh] flex flex-col justify-center bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300"
            >
              <h2 id="statement-heading" className="sr-only">
                Statement
              </h2>
              <StatementSection />
            </section>

            {/* 5. Contact & Footer Layer - Pulls up smoothly over Statement */}
            <section
              id="contact-section-container"
              ref={contactSticky.ref}
              aria-labelledby="contact-heading"
              data-section="contact"
              style={{
                position: contactSticky.isStickyEnabled ? "sticky" : "relative",
                top: contactSticky.stickyTop,
                zIndex: 50,
              }}
              className="w-full min-h-[100dvh] flex flex-col justify-between bg-[var(--bg-color)] transition-colors duration-300"
            >
              <h2 id="contact-heading" className="sr-only">
                Contact
              </h2>
              <Contact key="contact-section" />
            </section>
          </main>

          <AnimatePresence mode="wait">
            {activeCaseStudy && (
              <motion.div
                key={`case-study-page-${activeCaseStudy.id}`}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
                transition={{ duration: 0.45, ease: MOTION_CURVE_PREMIUM }}
                className="w-full relative bg-[var(--bg-color)] min-h-screen z-[80] overflow-x-hidden"
              >
                <ProjectCaseStudy
                  project={activeCaseStudy}
                  activeFilter={activeFilter}
                  onClose={() => handleActiveCaseStudyChange(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Contextual cursor-following pill interaction system */}
      <ContextualCursorPill
        disabled={loading || transitionStep !== 0 || activeCaseStudy !== null}
      />

      {/* Floating context-aware Back to Top Button */}
      {!isNotFound && (
        <BackToTop
          showBackToTop={showBackToTop}
          isFooterReached={isFooterReached}
          isMobileMenuOpen={isMobileMenuOpen}
          handleNav={handleNav}
        />
      )}

      {/* Solid Minimalist Block Transition Overlay Layer */}
      <TransitionOverlay step={transitionStep} theme={theme} />
    </div>
  );
}
