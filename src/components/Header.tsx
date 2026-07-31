/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Project } from '../types';

interface HeaderProps {
  theme: 'dark' | 'light';
  setTheme: React.Dispatch<React.SetStateAction<'dark' | 'light'>>;
  activeSection: string;
  scrolledPastHero: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleNav: (e: React.SyntheticEvent | { preventDefault: () => void }, targetId: string) => void;
  activeCaseStudy: Project | null;
  mobileMenuToggleRef: React.RefObject<HTMLButtonElement | null>;
  logoOpacity: any;
  logoY: any;
  forceShowLogo?: boolean;
}

export default function Header({
  theme,
  setTheme,
  activeSection,
  scrolledPastHero,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  handleNav,
  activeCaseStudy,
  mobileMenuToggleRef,
  logoOpacity,
  logoY,
  forceShowLogo = false
}: HeaderProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <header 
      style={{
        display: 'flex',
        background: (scrolledPastHero || !!activeCaseStudy)
          ? theme === 'light' ? 'rgba(255, 255, 255, 0.96)' : 'rgba(0, 0, 0, 0.96)'
          : 'transparent',
        paddingLeft: "max(16px, 4vw)",
        paddingRight: "max(16px, 4vw)",
      }}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-5 select-none transition-all duration-300 ${
        (scrolledPastHero || !!activeCaseStudy)
          ? 'border-b border-[var(--border-color)] text-[var(--text-color)]' 
          : 'text-[var(--text-color)]'
      }`}
    >
      {/* Central Logo 'RAZAN AZIZIEH' that morphs into top-left via scroll trigger */}
      <motion.div
        id="logo-name"
        role="button"
        tabIndex={0}
        aria-label="Razan Azizieh - Scroll back to top of the page"
        style={{
          opacity: forceShowLogo ? 1 : logoOpacity,
          scale: 1,
          y: forceShowLogo ? 0 : (shouldReduceMotion ? 0 : logoY),
          x: 0,
        }}
        onClick={(e) => handleNav(e, activeCaseStudy ? 'works' : 'top')}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleNav(e, activeCaseStudy ? 'works' : 'top');
          }
        }}
        className="branding-container name logo-container relative pointer-events-auto cursor-pointer interactive-hover focus:outline-none rounded px-2 py-1 before:absolute before:content-[''] before:-inset-y-4 before:-inset-x-3 before:block"
      >
        <span className="font-sans font-bold tracking-[0.1em] uppercase text-xs sm:text-sm md:text-base text-[var(--text-color)] opacity-100 transition-colors duration-200 inline-flex items-center">
          RAZAN AZIZIEH
        </span>
      </motion.div>

      {/* Minimalist text links (About, Works, Connect, Theme) using semantic <nav> */}
      <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-8 typo-mono-filter pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
        {activeCaseStudy ? (
          <a
            href="#works"
            onClick={(e) => handleNav(e, 'works')}
            aria-label="Back to Works"
            className="relative pointer-events-auto interactive-hover cursor-pointer bg-transparent border-0 typo-mono-sub text-[var(--text-dim)] hover:text-[var(--text-color)] transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-color)] px-2 py-1 rounded block font-semibold text-xs tracking-wider uppercase before:absolute before:content-[''] before:-inset-y-3 before:-inset-x-2 before:block"
          >
            Back to Works ✕
          </a>
        ) : (
          <>
            <a
              href="#about"
              onClick={(e) => handleNav(e, 'about')}
              aria-label="Navigate to about section"
              className={`relative pointer-events-auto interactive-hover cursor-pointer bg-transparent border-0 typo-mono-sub focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-color)] px-2 py-1 rounded block transition-all duration-300 ease-out before:absolute before:content-[''] before:-inset-y-3 before:-inset-x-2 before:block ${
                activeSection === 'about' && !activeCaseStudy
                  ? 'text-neutral-950 dark:text-white font-bold opacity-100'
                  : 'text-neutral-500 dark:text-zinc-400 font-medium opacity-60 hover:opacity-100 hover:text-neutral-950 dark:hover:text-white'
              }`}
            >
              About
            </a>

            <a
              href="#works"
              onClick={(e) => handleNav(e, 'works')}
              aria-label="Navigate to works section"
              className={`relative pointer-events-auto interactive-hover cursor-pointer bg-transparent border-0 typo-mono-sub focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-color)] px-2 py-1 rounded block transition-all duration-300 ease-out before:absolute before:content-[''] before:-inset-y-3 before:-inset-x-2 before:block ${
                (activeSection === 'works' || !!activeCaseStudy)
                  ? 'text-neutral-950 dark:text-white font-bold opacity-100'
                  : 'text-neutral-500 dark:text-zinc-400 font-medium opacity-60 hover:opacity-100 hover:text-neutral-950 dark:hover:text-white'
              }`}
            >
              Works
            </a>

            <a
              href="#contact"
              onClick={(e) => handleNav(e, 'contact')}
              aria-label="Navigate to connect section"
              className={`relative pointer-events-auto interactive-hover cursor-pointer bg-transparent border-0 typo-mono-sub focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-color)] px-2 py-1 rounded block transition-all duration-300 ease-out before:absolute before:content-[''] before:-inset-y-3 before:-inset-x-2 before:block ${
                activeSection === 'contact' && !activeCaseStudy
                  ? 'text-neutral-950 dark:text-white font-bold opacity-100'
                  : 'text-neutral-500 dark:text-zinc-400 font-medium opacity-60 hover:opacity-100 hover:text-neutral-950 dark:hover:text-white'
              }`}
            >
              Connect
            </a>
          </>
        )}

        <button
          onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
          aria-label="Switch visual theme scale"
          className="relative pointer-events-auto interactive-hover cursor-pointer bg-transparent border-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-color)] focus-visible:text-[var(--text-color)] px-2 py-1 rounded flex items-center justify-center text-[var(--text-dim)] hover:text-[var(--text-color)] transition-colors duration-200 ease-out before:absolute before:content-[''] before:-inset-y-3 before:-inset-x-2 before:block"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={theme}
              initial={shouldReduceMotion ? { opacity: 0 } : { rotate: -45, opacity: 0, scale: 0.82 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { rotate: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center font-sans text-sm leading-none select-none font-normal"
            >
              ◐
            </motion.div>
          </AnimatePresence>
        </button>
      </nav>

      {/* Compact Mobile Menu Trigger & Switch */}
      <div className="md:hidden flex items-center gap-2 xs:gap-3 sm:gap-4 pointer-events-auto">
        <button
          onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
          aria-label="Switch visual theme scale"
          className="text-zinc-500 hover:text-[var(--text-color)] w-11 h-11 transition-colors duration-[250ms] flex items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-color)] focus-visible:text-[var(--text-color)] rounded-md"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={theme}
              initial={shouldReduceMotion ? { opacity: 0 } : { rotate: -45, opacity: 0, scale: 0.82 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { rotate: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center font-sans text-sm leading-none select-none font-normal"
            >
              ◐
            </motion.div>
          </AnimatePresence>
        </button>
        {activeCaseStudy ? (
          <button
            onClick={(e) => handleNav(e, 'works')}
            aria-label="Back to Works"
            className="typo-mono-sub text-zinc-500 hover:text-[var(--text-color)] transition-colors duration-0 h-11 px-2 uppercase flex items-center justify-center gap-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-color)] rounded-md font-medium text-xs tracking-wider cursor-pointer"
          >
            Back ✕
          </button>
        ) : (
          <button
            ref={mobileMenuToggleRef}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            className="typo-mono-sub text-zinc-500 hover:text-[var(--text-color)] h-11 min-w-[44px] px-2 uppercase flex items-center justify-center gap-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-color)] focus-visible:text-[var(--text-color)] rounded-md"
          >
            {isMobileMenuOpen ? 'CLOSE' : 'MENU'}
          </button>
        )}
      </div>

    </header>
  );
}
