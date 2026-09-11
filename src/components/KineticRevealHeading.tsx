import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const CIPHER_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";

interface KineticRevealHeadingProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "div";
  className?: string;
  containerClassName?: string;
  duration?: number;
  delay?: number;
  ariaLabel?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: (e: React.MouseEvent) => void;
  dataHeroName?: boolean;
}

export default function KineticRevealHeading({
  text,
  as: Component = "h1",
  className = "",
  containerClassName = "w-full block select-text",
  duration = 800,
  delay = 0,
  ariaLabel,
  onMouseEnter,
  onMouseLeave,
  onClick,
  dataHeroName = false,
}: KineticRevealHeadingProps) {
  const [displayText, setDisplayText] = useState(text);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayText(text);
      return;
    }

    let frame = 0;
    const totalFrames = 24;
    const intervalTime = duration / totalFrames;

    let interval: NodeJS.Timeout | null = null;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const resolvedIndex = Math.floor(progress * text.length);

        const scrambled = text
          .split("")
          .map((char, index) => {
            if (char === " " || char === "/" || char === "-" || char === "—")
              return char;
            if (index < resolvedIndex) return char;
            return CIPHER_CHARS[
              Math.floor(Math.random() * CIPHER_CHARS.length)
            ];
          })
          .join("");

        setDisplayText(scrambled);

        if (frame >= totalFrames) {
          if (interval) clearInterval(interval);
          setDisplayText(text);
        }
      }, intervalTime);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, shouldReduceMotion, duration, delay]);

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? { opacity: 1, filter: "blur(0px)", y: 0 }
          : { opacity: 0.01, filter: "blur(10px)", y: 16 }
      }
      animate={{
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
      }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: delay / 1000,
      }}
      className={containerClassName}
    >
      <div
        data-hero-name={dataHeroName ? "true" : undefined}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        aria-label={ariaLabel || text}
        className="w-full block select-text transition-opacity duration-300"
      >
        <Component className={className}>{displayText}</Component>
      </div>
    </motion.div>
  );
}
