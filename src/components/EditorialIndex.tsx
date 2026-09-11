import React, { memo } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const FOCUS_COLUMNS = [
  { id: 'focus-col-01', text: '01. STRUCTURE & SYSTEMS' },
  { id: 'focus-col-02', text: '02. INTERACTION & MOVEMENT' },
  { id: 'focus-col-03', text: '03. LOGIC & CRAFT' },
];

export const EditorialIndex = memo(function EditorialIndex() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="editorial-focus-index"
      data-no-cursor="true"
      data-cursor="none"
      data-suppress-cursor="true"
      aria-label="Editorial Focus Index"
      className="relative z-20 w-full bg-[var(--bg-color)] py-16 sm:py-24 cursor-default select-text"
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: shouldReduceMotion ? 0.01 : 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 items-start"
        >
          {FOCUS_COLUMNS.map((col) => (
            <div
              key={col.id}
              id={col.id}
              data-no-cursor="true"
              data-cursor="none"
              className="flex items-center text-left py-2"
            >
              <span className="font-light text-sm sm:text-base tracking-wide uppercase text-neutral-900 dark:text-neutral-100 select-text">
                {col.text}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

export default EditorialIndex;
