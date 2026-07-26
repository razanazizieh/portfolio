/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { MOTION_CURVE_PREMIUM } from '../utils/motion';

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

  // Art director scroll-driven micro-fade focusing system
  const contentScale = useTransform(scrollYProgress, [0.15, 0.42, 0.68, 0.95], [1.0, 1.0, 1.0, 1.0]);
  const contentOpacity = useTransform(scrollYProgress, [0.15, 0.42, 0.68, 0.95], [0.4, 1.0, 1.0, 0.4]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-[var(--bg-color)] text-[var(--text-color)] relative z-10 flex flex-col justify-between min-h-[75vh] md:min-h-[85vh] overflow-hidden py-10 md:py-16 scroll-mt-[100px]"
      style={{ paddingLeft: "max(20px, 4vw)", paddingRight: "max(20px, 4vw)" }}
    >
      <motion.div
        style={{
          scale: shouldReduceMotion ? 1 : contentScale,
          opacity: shouldReduceMotion ? 1 : contentOpacity,
          transformOrigin: "center"
        }}
        className="w-full h-full pt-6 pb-6 bg-[var(--bg-color)] overflow-hidden relative flex flex-col justify-between max-w-7xl mx-auto"
      >

        {/* Structural Editorial Layout Grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 lg:gap-x-20 gap-y-3 lg:gap-y-20 items-start relative z-10 w-full px-0 sm:px-12 lg:px-16 pt-6 md:pt-8 pb-0"
        >

          {/* Left Column: Massive header text "LET'S BUILD" or "CONNECT" */}
          <div className="col-span-1 lg:col-span-6 flex flex-col items-start justify-start text-left">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              className="typo-display-lg select-text flex flex-wrap items-baseline gap-x-4"
            >
              <span className="inline-block overflow-hidden py-[0.05em] -my-[0.05em]">
                <motion.span
                  variants={{
                    hidden: { 
                      opacity: 0, 
                      clipPath: "inset(0% 0% 100% 0%)"
                    },
                    visible: { 
                      opacity: 1, 
                      clipPath: "inset(0% 0% 0% 0%)",
                      transition: { 
                        duration: 0.85,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.05 
                      } 
                    }
                  }}
                  className="inline-block"
                >
                  LET'S
                </motion.span>
              </span>
              <span className="inline-block overflow-hidden py-[0.05em] -my-[0.05em]">
                <motion.span
                  variants={{
                    hidden: { 
                      opacity: 0, 
                      clipPath: "inset(0% 0% 100% 0%)"
                    },
                    visible: { 
                      opacity: 1, 
                      clipPath: "inset(0% 0% 0% 0%)",
                      transition: { 
                        duration: 0.85,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.15 
                      } 
                    }
                  }}
                  className="inline-block"
                >
                  CONNECT
                </motion.span>
              </span>
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
                className="flex justify-start lg:justify-end py-3 lg:py-1.5 touch-manipulation text-neutral-400 hover:text-[var(--text-color)] transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-color)] focus-visible:px-2 rounded-sm cursor-pointer select-none"
                whileHover={{ x: 3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
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
                className="flex justify-start lg:justify-end py-3 lg:py-1.5 touch-manipulation text-neutral-400 hover:text-[var(--text-color)] transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-color)] focus-visible:px-2 rounded-sm cursor-pointer select-none"
                whileHover={{ x: 3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
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
                className="flex justify-start lg:justify-end py-3 lg:py-1.5 touch-manipulation text-neutral-400 hover:text-[var(--text-color)] transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-color)] focus-visible:px-2 rounded-sm cursor-pointer select-none"
                whileHover={{ x: 3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
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
