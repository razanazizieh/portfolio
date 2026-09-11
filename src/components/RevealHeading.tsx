import React from "react";

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
  cursorData,
}: RevealHeadingProps) {
  const Component = as;

  return (
    <div className="w-full">
      <Component data-cursor={cursorData} className={className}>
        {text}
      </Component>
    </div>
  );
}
