/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { getMenuVariants, getLinksContainerVariants, getMenuLinkVariants } from '../utils/motion';

import { Project } from '../types';

interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeSection: string;
  activeCaseStudy: Project | null;
  handleNav: (e: React.SyntheticEvent | { preventDefault: () => void }, targetId: string) => void;
}

export default function MobileMenu({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  activeSection,
  activeCaseStudy,
  handleNav,
}: MobileMenuProps) {
  const shouldReduceMotion = useReducedMotion();

  const menuVariants = getMenuVariants();
  const linksContainerVariants = getLinksContainerVariants();
  const menuLinkVariants = getMenuLinkVariants(shouldReduceMotion);

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          className="fixed inset-0 z-40 bg-[var(--bg-color)] flex flex-col justify-between pt-28 pb-10 md:hidden text-left"
        >
          {/* Nav targets with edge-to-edge dividers */}
          <motion.nav variants={linksContainerVariants} className="flex-1 flex flex-col justify-center w-full">
            {/* ABOUT Link Block with horizontal padding */}
            <motion.div variants={menuLinkVariants} className="py-4 px-[max(20px,4vw)] w-full">
              <a
                href="#about"
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  handleNav(e, 'about');
                }}
                aria-label="Navigate to about section"
                className={`typo-display-md tracking-tighter uppercase transition-all duration-300 block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-color)] focus-visible:px-2 rounded-md ${
                  activeSection === 'about' && !activeCaseStudy
                    ? 'text-[var(--text-color)] font-black opacity-100'
                    : 'text-[var(--text-color)] font-medium opacity-50 hover:opacity-100'
                }`}
              >
                ABOUT
              </a>
            </motion.div>

            {/* WORKS Link Block with horizontal padding */}
            <motion.div variants={menuLinkVariants} className="py-4 px-[max(20px,4vw)] w-full">
              <a
                href="#works"
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  handleNav(e, 'works');
                }}
                aria-label="Navigate to works section"
                className={`typo-display-md tracking-tighter uppercase transition-all duration-300 block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-color)] focus-visible:px-2 rounded-md ${
                  (activeSection === 'works' || !!activeCaseStudy)
                    ? 'text-[var(--text-color)] font-black opacity-100'
                    : 'text-[var(--text-color)] font-medium opacity-50 hover:opacity-100'
                }`}
              >
                WORKS
              </a>
            </motion.div>

            {/* CONNECT Link Block with horizontal padding */}
            <motion.div variants={menuLinkVariants} className="py-5 px-[max(20px,4vw)] w-full">
              <a
                href="#contact"
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  handleNav(e, 'contact');
                }}
                aria-label="Navigate to connect section"
                className={`typo-display-md tracking-tighter uppercase transition-all duration-300 block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-color)] focus-visible:px-2 rounded-md ${
                  activeSection === 'contact' && !activeCaseStudy
                    ? 'text-[var(--text-color)] font-black opacity-100'
                    : 'text-[var(--text-color)] font-medium opacity-50 hover:opacity-100'
                }`}
              >
                CONNECT
              </a>
            </motion.div>
          </motion.nav>

          {/* Footer block with horizontal padding and exact 10px spacing system alignment */}
          <motion.div 
            variants={menuLinkVariants} 
            className="w-full px-[max(16px,4vw)] pb-8 flex items-center"
          >
            <span className="typo-mono-sub text-[10px] tracking-widest uppercase opacity-40">
              2026 © — ALL RIGHTS RESERVED.
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
