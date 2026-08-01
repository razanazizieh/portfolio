/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { MOTION_CURVE_PREMIUM, motionRoles, VIEWPORT_ONCE_CONFIG } from '../utils/motion';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const [ambientTime, setAmbientTime] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) return;
    let frameId: number;
    const start = Date.now();
    const update = () => {
      const elapsed = (Date.now() - start) / 1000;
      setAmbientTime(elapsed);
      frameId = requestAnimationFrame(update);
    };
    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [shouldReduceMotion]);

  // Editorial scroll-driven micro-fade focusing system
  const contentScale = useTransform(scrollYProgress, [0.15, 0.42, 0.68, 0.95], [1.0, 1.0, 1.0, 1.0]);
  const contentOpacity = 1.0;

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-[var(--bg-color)] text-[var(--text-color)] relative z-10 flex flex-col justify-between overflow-hidden pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-24 md:pb-32 scroll-mt-20 md:scroll-mt-24"
      style={{ paddingLeft: "max(20px, 4vw)", paddingRight: "max(20px, 4vw)" }}
    >
      <motion.div
        style={{
          scale: shouldReduceMotion ? 1 : contentScale,
          opacity: 1,
          transformOrigin: "center"
        }}
        className="w-full h-full pt-2 pb-6 bg-[var(--bg-color)] overflow-hidden relative flex flex-col justify-between max-w-7xl mx-auto"
      >

        {/* Structural Editorial Layout Grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 lg:gap-x-20 gap-y-3 lg:gap-y-20 items-start relative z-10 w-full px-0 sm:px-12 lg:px-16 pt-2 md:pt-4 pb-0"
        >

          {/* Left Column: Massive header text "LET'S CONNECT" */}
          <div className="col-span-1 lg:col-span-6 flex flex-col items-start justify-start text-left">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE_CONFIG}
              variants={motionRoles.largeTypography(0.05, shouldReduceMotion)}
              className="typo-display-lg select-text flex flex-wrap items-baseline gap-x-4"
            >
              LET'S CONNECT
            </motion.h2>
          </div>


          {/* Right Column: Availability & fully functional pure typography plain text links */}
          <motion.div className="col-span-1 lg:col-span-6 flex flex-col items-start text-left gap-[15px] lg:pl-6">

            {/* Context/Availability statement: Subtle downward settling */}
            <motion.div
              variants={{
                hidden: { 
                  opacity: 0, 
                },
                visible: { 
                  opacity: 1, 
                  transition: { 
                    duration: 0.7,
                    ease: "easeOut",
                    delay: 0.25 
                  }
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              className="w-full"
            >
              <p className="typo-body-regular-dim max-w-xl w-full whitespace-normal break-words">
                Whether you're starting something new, refining something existing, or simply exchanging ideas, you're welcome to reach out.
              </p>
            </motion.div>

            {/* Typography Social Links list */}
            <motion.div
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.05
                  }
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              className="flex flex-col gap-4 lg:gap-2 w-full max-w-lg lg:items-end lg:text-right mt-8 sm:mt-10"
            >
              {/* GitHub */}
              <motion.a
                variants={{
                  hidden: { 
                    opacity: 0, 
                    y: 8
                  },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.25
                    } 
                  }
                }}
                href="https://github.com/razanazizieh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Razan's GitHub profile in a new browser tab"
                className="flex justify-start lg:justify-end py-3 lg:py-1.5 touch-manipulation text-[#666666] hover:text-[var(--text-color)] opacity-40 hover:opacity-100 font-bold transition-opacity duration-200 ease-in-out focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-color)] focus-visible:px-2 rounded-sm cursor-pointer select-none"
              >
                <span className="typo-display-sm leading-tight tracking-tight uppercase inline-block">
                  GITHUB
                </span>
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                variants={{
                  hidden: { 
                    opacity: 0, 
                    y: 8
                  },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.30
                    } 
                  }
                }}
                href="https://www.linkedin.com/in/razan-azizieh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Razan's LinkedIn profile in a new browser tab"
                className="flex justify-start lg:justify-end py-3 lg:py-1.5 touch-manipulation text-[#666666] hover:text-[var(--text-color)] opacity-40 hover:opacity-100 font-bold transition-opacity duration-200 ease-in-out focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-color)] focus-visible:px-2 rounded-sm cursor-pointer select-none"
              >
                <span className="typo-display-sm leading-tight tracking-tight uppercase inline-block">
                  LINKEDIN
                </span>
              </motion.a>

              {/* Instagram */}
              <motion.a
                variants={{
                  hidden: { 
                    opacity: 0, 
                    y: 8
                  },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.35
                    } 
                  }
                }}
                href="https://instagram.com/_rraz.a"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Razan's Instagram profile in a new browser tab"
                className="flex justify-start lg:justify-end py-3 lg:py-1.5 touch-manipulation text-[#666666] hover:text-[var(--text-color)] opacity-40 hover:opacity-100 font-bold transition-opacity duration-200 ease-in-out focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-color)] focus-visible:px-2 rounded-sm cursor-pointer select-none"
              >
                <span className="typo-display-sm leading-tight tracking-tight uppercase inline-block">
                  INSTAGRAM
                </span>
              </motion.a>

            </motion.div>
          </motion.div>
        </div>

        {/* Minimal Swiss footer: Subtle upward settling */}
        <motion.footer
          variants={{
            hidden: { 
              opacity: 0, 
            },
            visible: { 
              opacity: 1, 
              transition: { 
                duration: 0.25,
                ease: "easeOut",
                delay: 0.35 
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          className="pt-16 w-full flex flex-col sm:flex-row justify-between items-start sm:items-center typo-mono-sub px-8 gap-4"
        >
          <div className="text-[10px] tracking-widest uppercase opacity-40 text-left">
            2026 © — ALL RIGHTS RESERVED.
          </div>
        </motion.footer>

      </motion.div>
    </section>
  );
}
