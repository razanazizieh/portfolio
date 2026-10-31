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
      "My background is in mathematics and computer science, with a master's focused on distributed systems. My thesis explored fault tolerance—how systems preserve continuity when parts fail. I bring that structured mindset to web engineering, crafting fluid, dependable interfaces while continuously expanding my technical reach across the system.",
    capabilities: [
      {
        title: "Interface",
        items: ["React", "JavaScript", "HTML and CSS"],
      },
      {
        title: "Working with",
        items: ["REST APIs", "Postman", "Git and GitHub", "Figma"],
      },
      {
        title: "Foundations",
        items: ["Mathematics", "Distributed systems", "Fault tolerance"],
      },
      {
        title: "Learning",
        items: ["Back end", "NestJS", "TypeScript"],
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
