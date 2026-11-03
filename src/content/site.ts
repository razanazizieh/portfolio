/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface NavItem {
  id: string;
  label: string;
  hash: string;
}

export interface CapabilityColumn {
  title: string;
  items: string[];
}

export type WordmarkVariant = "contained" | "bleed" | "hybrid";

export const siteContent = {
  stackedPanels: true,
  meta: {
    name: "Razan Azizieh",
    title: "Razan Azizieh, Front-end Developer",
    description:
      "Razan Azizieh is a Front-end Developer with a background in mathematics and informatics, building interfaces with React and distributed systems.",
    canonicalUrl: "https://razanazizieh.github.io/portfolio/",
    ogImage: "https://razanazizieh.github.io/portfolio/og.png",
  },

  socials: {
    email: "razan_az@outlook.com",
    linkedin: {
      label: "LinkedIn",
      url: "https://linkedin.com/in/razanazizieh",
    },
    github: {
      label: "GitHub",
      url: "https://github.com/razanazizieh",
    },
    location: "Based in Damascus",
  },

  nav: {
    items: [
      { id: "work", label: "Work", hash: "#work" },
      { id: "about", label: "About", hash: "#about" },
      { id: "journal", label: "Journal", hash: "#journal" },
      { id: "contact", label: "Contact", hash: "#contact" },
    ] as NavItem[],
  },

  hero: {
    name: "Razan Azizieh",
    line1: "Front-end",
    line2: "Developer",
    sentence: "I build React interfaces with an eye for *detail*. Full-stack is next.",
    availability: "Available for work",
    cta: "Let's talk",
  },

  statement: {
    sentence:
      "Interfaces should stay fast and *calm* under pressure. Built with clear structure, responsive feedback, and steady states.",
  },

  about: {
    title: "About",
    paragraph:
      // "My background is in mathematics and computer science, with a master's focused on distributed systems. My thesis was about fault tolerance: how a system keeps working when parts of it fail. I bring that mindset to the interfaces I build. Today I work with React and JavaScript, and I am learning the back end.",
      "I'm a front-end developer with a background in mathematics and computer science, and a master's focused on distributed systems. I like interfaces that feel clear and calm: careful typography, honest motion, and details that hold up when something goes wrong. I work with React and JavaScript, and I'm learning the back end so I can build both sides of what I build.",
    capabilities: [
      {
        title: "Interface",
        items: ["React", "JavaScript", "HTML & CSS", "Responsive design", "Accessibility & SEO"],
      },
      {
        title: "Working with",
        items: ["REST APIs", "Git & GitHub", "Figma", "AI tools", "VS Code"],
      },
      {
        title: "Foundations",
        items: ["Mathematics", "Computer Science", "Distributed systems"],
      },
      {
        title: "Learning",
        items: ["NestJS", "TypeScript"],
      },
    ] as CapabilityColumn[],
  },

  contact: {
    label: "Contact",
    headline: "Got something to build?",
    sentence: "A role, a project, a question or just a hello. I'd like to hear from you.",
    email: "razan_az@outlook.com",
    location: "Based in Damascus",
  },

  wordmark: {
    text: "RAZAN AZIZIEH",
    variant: "contained" as WordmarkVariant,
  },

  footer: {
    wordmark: "RAZAN AZIZIEH",
    year: "2026",
  },
} as const;

export default siteContent;
