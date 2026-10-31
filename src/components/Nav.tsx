/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { scrollToSection, scrollToTop, useScrollSpy } from "../lib/scroll";
import { lockScroll, unlockScroll } from "../lib/scrollLock";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { TS } from "./TS";
import siteContent, { NavItem } from "../content/site";

/**
 * Editorial Fixed Nav (Fixed, top 0, height 64px, z-index 1000)
 * - The nav, the mobile menu button and the menu overlay: position fixed, z-index 1000
 * - Every section and the Work stage: z-index <= 10
 * - Uses centralized scrollLock("menu") module
 * - Name in nav links to "/" and calls scrollToTop when on "/"
 * - Nav links "Work", "About", "Journal", "Contact" are <a href="/#id"> with onClick preventDefault:
 *   on "/" calls scrollToSection(id); on any other route navigate('/', { state: { scrollTo: id } })
 * - Mobile menu: on link click close menu and restore scrolling, then call scrollToSection/navigate
 */
export function Nav() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const shouldReduceMotion = useReducedMotion();

  const [nameVisible, setNameVisible] = useState(() => !isHome);
  const [navLinksVisible, setNavLinksVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    if (!isHome || shouldReduceMotion) return true;
    return Boolean((window as unknown as { __appReady?: boolean }).__appReady);
  });
  const activeSection = useScrollSpy(isHome);

  useEffect(() => {
    if (!isHome || shouldReduceMotion) {
      setNavLinksVisible(true);
      return;
    }

    let timer: ReturnType<typeof setTimeout> | null = null;
    const onReady = () => {
      timer = setTimeout(() => {
        setNavLinksVisible(true);
      }, 600);
    };

    if ((window as unknown as { __appReady?: boolean }).__appReady) {
      onReady();
    } else {
      window.addEventListener("app:ready", onReady, { once: true });
      return () => {
        window.removeEventListener("app:ready", onReady);
        if (timer) clearTimeout(timer);
      };
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isHome, shouldReduceMotion]);

  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const navItems = siteContent.nav.items;
  const { email, linkedin, github } = siteContent.socials;

  // Set dataset.mobileMenu to hide scroll-progress bar while open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.dataset.mobileMenu = "open";
    } else {
      delete document.body.dataset.mobileMenu;
    }
    return () => {
      delete document.body.dataset.mobileMenu;
    };
  }, [isMobileOpen]);

  // Name visibility: true when scrollY > innerHeight * 0.6
  useEffect(() => {
    if (!isHome) {
      setNameVisible(true);
      return;
    }

    let rafId: number | null = null;

    const updateNameVisibility = () => {
      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      setNameVisible(scrollY > innerHeight * 0.6);
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        updateNameVisibility();
      });
    };

    updateNameVisibility();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isHome]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileOpen) {
        setIsMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileOpen]);

  // Lock scroll via centralized module and trap focus when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      lockScroll("menu");

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return;

        const focusable = [
          menuButtonRef.current,
          ...(overlayRef.current
            ? Array.from(
                overlayRef.current.querySelectorAll<HTMLElement>(
                  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                )
              )
            : []),
        ].filter(Boolean) as HTMLElement[];

        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      window.addEventListener("keydown", handleTabKey);
      return () => {
        window.removeEventListener("keydown", handleTabKey);
        unlockScroll("menu");
      };
    } else {
      unlockScroll("menu");
    }
  }, [isMobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
    unlockScroll("menu");
  }, [location.pathname]);

  // Close if resized to >=768px
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsMobileOpen(false);
        unlockScroll("menu");
      }
    };
    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  const handleDesktopSectionClick = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    if (isHome) {
      scrollToSection(id);
    } else {
      React.startTransition(() => {
        navigate("/", { state: { scrollTo: id } });
      });
    }
  };

  const handleMobileSectionClick = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    setIsMobileOpen(false);
    unlockScroll("menu");

    // Start scroll immediately in the same frame as click
    if (isHome) {
      scrollToSection(id);
    } else {
      React.startTransition(() => {
        navigate("/", { state: { scrollTo: id } });
      });
    }
  };

  const handleNameClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (isMobileOpen) {
      setIsMobileOpen(false);
      unlockScroll("menu");
    }
    if (isHome) {
      scrollToTop();
    } else {
      React.startTransition(() => {
        navigate("/");
      });
    }
  };

  const isItemActive = (item: NavItem) => {
    if (!isHome) {
      if (item.id === "journal") {
        return location.pathname.startsWith("/journal");
      }
      return false;
    }
    return activeSection === item.id;
  };

  const showName = isMobileOpen || !isHome || nameVisible;
  const isNavSolid = !isHome || nameVisible || isMobileOpen;

  return (
    <>
      {/* Mobile Full-Screen Overlay (<768px): fixed, z-index 1000 */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            id="mobile-navigation"
            ref={overlayRef}
            data-chrome
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            initial={shouldReduceMotion ? false : { clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : {
                    clipPath: "inset(0 0 100% 0)",
                    transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] },
                  }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.55, ease: [0.76, 0, 0.24, 1] }
            }
            className="fixed top-0 right-0 bottom-0 left-0 w-auto h-[100dvh] bg-[#F5F4F0] z-[1000] flex flex-col justify-between px-6 overflow-hidden border-none outline-none shadow-none m-0"
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              width: "auto",
              height: "100dvh",
              margin: 0,
              border: "none",
              outline: "none",
              boxShadow: "none",
              paddingTop: "64px",
              paddingBottom: "max(24px, env(safe-area-inset-bottom, 24px))",
            }}
          >
            {/* Middle Links: padding-top 6svh, 12px gap (gap-3), min row height 56px */}
            <div className="pt-[6svh] flex flex-col gap-3">
              {navItems.map((item, idx) => {
                const active = isItemActive(item);

                return (
                  <div key={`m-${item.id}`} className="overflow-hidden min-h-[56px] flex items-center">
                    <motion.div
                      initial={shouldReduceMotion ? false : { y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : {
                              duration: 0.7,
                              ease: [0.22, 1, 0.36, 1],
                              delay: 0.2 + idx * 0.06,
                            }
                      }
                      className="w-full"
                    >
                      <Link
                        to={`/#${item.id}`}
                        onClick={(e) => handleMobileSectionClick(e, item.id)}
                        className="w-full text-left flex items-center min-h-[56px] px-0 no-underline active:opacity-40 transition-opacity focus-visible:outline"
                      >
                        <span className="t-title text-[var(--ink)] block">
                          <TS active={active}>{item.label}</TS>
                        </span>
                      </Link>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* Bottom of Overlay: Email with type swap, LinkedIn & GitHub in Inter Tight 17px */}
            <div className="flex flex-col gap-4 text-left">
              <div>
                <a
                  href={`mailto:${email}`}
                  aria-label={`Send email to ${email}`}
                  className="mobile-email-link min-h-[44px] inline-flex items-center no-underline cursor-pointer"
                >
                  <span className="mobile-email-ts-wrap">
                    <span className="mobile-email-ts-rest">{email}</span>
                    <span className="mobile-email-ts-hover">{email}</span>
                  </span>
                </a>
              </div>

              <div className="flex items-center gap-6">
                <a
                  href={linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="t-body text-[var(--ink-2)] min-h-[44px] inline-flex items-center no-underline"
                >
                  {linkedin.label}
                </a>
                <a
                  href={github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="t-body text-[var(--ink-2)] min-h-[44px] inline-flex items-center no-underline"
                >
                  {github.label}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed Nav Bar (Fixed, top 0, height 64px, z-index 1000) */}
      <header
        data-chrome
        className={`fixed top-0 left-0 right-0 z-[1000] h-16 transition-colors duration-300 ${
          isNavSolid && !isMobileOpen ? "bg-[#F5F4F0]" : "bg-transparent"
        }`}
      >
        <div className="w-full max-w-[1600px] h-full mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Name Left: "Razan Azizieh" links to "/" and calls scrollToTop when already on "/" */}
          <div
            className={`transition-[opacity,transform] duration-300 ${
              showName
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2 pointer-events-none"
            }`}
          >
            <Link
              to="/"
              onClick={handleNameClick}
              aria-label="Razan Azizieh - Return to top"
              className="t-ui text-[var(--ink)] min-h-[44px] min-w-[44px] inline-flex items-center no-underline"
            >
              <TS>{siteContent.meta.name}</TS>
            </Link>
          </div>

          {/* Desktop Nav (>=768px): Work, About, Journal, Contact as <a href="/#id"> */}
          <nav
            aria-label="Primary"
            className={`hidden md:flex items-center gap-8 t-ui transition-opacity duration-[var(--d-fast,600ms)] ${
              navLinksVisible ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {navItems.map((item) => {
              const active = isItemActive(item);
              const colorClass = active ? "text-[var(--ink)]" : "text-[var(--ink-2)]";

              return (
                <Link
                  key={item.id}
                  to={`/#${item.id}`}
                  onClick={(e) => handleDesktopSectionClick(e, item.id)}
                  className={`${colorClass} min-h-[44px] inline-flex items-center no-underline cursor-pointer focus-visible:outline`}
                >
                  <TS active={active}>{item.label}</TS>
                </Link>
              );
            })}
          </nav>

          {/* Mobile "Menu" / "Close" Text Button (<768px): t-ui font, z-index 1000 */}
          <div className="md:hidden">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => {
                setIsMobileOpen((prev) => !prev);
              }}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-navigation"
              aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
              className="relative z-[1000] min-w-[44px] min-h-[44px] flex items-center justify-end bg-transparent border-none p-0 t-ui text-[var(--ink)] cursor-pointer focus-visible:outline select-none"
            >
              {isMobileOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Nav;
