import React from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  MOTION_CURVE_PREMIUM,
  VIEWPORT_EDITORIAL_CONFIG,
} from "../utils/motion";

interface RevealHeadingProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  wordClassName?: string;
  stagger?: number;
  delay?: number;
  triggerStart?: string;
  cursorData?: string;
}

export default function RevealHeading({
  text,
  as = "h2",
  className = "",
  delay = 0,
  cursorData,
}: RevealHeadingProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionComponent = (motion as any)[as] || motion.h2;

  return (
    <div className="overflow-hidden w-full">
      <MotionComponent
        data-cursor={cursorData}
        initial={{
          opacity: shouldReduceMotion ? 1 : 0,
          y: shouldReduceMotion ? 0 : 45,
        }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_EDITORIAL_CONFIG}
        transition={{
          duration: shouldReduceMotion ? 0.01 : 0.85,
          ease: MOTION_CURVE_PREMIUM,
          delay: shouldReduceMotion ? 0 : delay,
        }}
        className={className}
      >
        {text}
      </MotionComponent>
    </div>
  );
}
