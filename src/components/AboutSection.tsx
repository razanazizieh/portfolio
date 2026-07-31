/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{
        paddingLeft: "max(20px, 4vw)",
        paddingRight: "max(20px, 4vw)",
      }}
      className="bg-[var(--bg-color)] text-[var(--text-color)] relative z-10 flex flex-col justify-between overflow-hidden py-12 md:py-20 lg:py-28 scroll-mt-[100px]"
    >
      <div className="w-full h-full bg-[var(--bg-color)] overflow-hidden relative flex flex-col justify-between max-w-7xl mx-auto">
        
        {/* Structural Editorial Layout Grid matching Connect section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 lg:gap-x-20 gap-y-6 lg:gap-y-20 items-start relative z-10 w-full px-0 sm:px-12 lg:px-16 pt-6 md:pt-8 pb-0">
          
          {/* Left Column: Massive display title "ABOUT" */}
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
                  ABOUT
                </motion.span>
              </span>
            </motion.h2>
          </div>

          {/* Right Column: Editorial Body Text Block */}
          <motion.div className="col-span-1 lg:col-span-6 flex flex-col items-start text-left lg:pl-6 pt-2 lg:pt-3">
            <motion.div
              variants={{
                hidden: { 
                  opacity: 0, 
                  y: 12
                },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.2 
                  }
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              className="w-full"
            >
              <p className="typo-body-regular-dim max-w-xl w-full whitespace-normal break-words select-text">
                Building web software with a focus on visual intent, spatial layouts, and mathematical logic. I craft custom digital experiences where clean architecture and intentional design function as one seamless system—free from templates.
              </p>
            </motion.div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}


