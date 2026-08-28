import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

interface ThemeToggleProps {
  theme: "dark" | "light";
  setTheme: React.Dispatch<React.SetStateAction<"dark" | "light">>;
  className?: string;
  onMouseEnter?: () => void;
  style?: React.CSSProperties;
}

export default function ThemeToggle({
  theme,
  setTheme,
  className = "",
  onMouseEnter,
  style,
}: ThemeToggleProps) {
  const shouldReduceMotion = useReducedMotion();

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button
      onClick={toggleTheme}
      onMouseEnter={onMouseEnter}
      aria-label="Switch visual theme scale"
      style={style}
      className={`relative pointer-events-auto cursor-pointer bg-transparent border-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4500] rounded flex items-center justify-center transition-all duration-200 ease-in-out text-neutral-900 dark:text-neutral-100 ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { rotate: -45, opacity: 0, scale: 0.82 }
          }
          animate={
            shouldReduceMotion
              ? { opacity: 1 }
              : { rotate: 0, opacity: 1, scale: 1 }
          }
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center font-sans text-sm leading-none select-none font-normal"
        >
          ◐
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
