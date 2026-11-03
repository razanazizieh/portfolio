/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { asset } from "../lib/asset";

export interface ProjectFeature {
  title: string;
  text: string;
}

export interface ProjectVideo {
  src: string;
  poster?: string;
}

export interface ProjectApproachItem {
  title: string;
  text: string;
}

export interface ProjectTechnicalItem {
  text: string;
  code?: string;
  language?: string;
}

export interface ProjectGalleryItem {
  src: string;
  alt: string;
  caption?: string;
  verified?: boolean;
}

export interface Project {
  slug: string;
  aliases?: string[];
  title: string;
  description: string;
  summary: string;
  longDescription: string;
  role: string;
  year: string;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  image: string;
  video?: ProjectVideo;
  contentVerified: boolean;
  patternSeed?: string;
  overview?: string;
  features?: ProjectFeature[];
  challenge?: string;
  approach?: ProjectApproachItem[];
  technical?: ProjectTechnicalItem;
  outcome?: string;
  learnings?: string;
  gallery?: ProjectGalleryItem[];
  featured: boolean;
  tags?: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: "bilingual-portfolio-website",
    aliases: ["sarah-portfolio", "fluid-code"],
    title: "Bilingual portfolio website",
    description: "A multi-page portfolio for a data scientist, with instant English and German switching and detailed project pages.",
    summary: "A multi-page portfolio website for a data scientist, with instant English and German switching and a detailed page for each project.",
    longDescription: "I built this site for Sarah Sabouni, a data scientist. I set the style, the page structure and the user flow, and built it with AI tools from my own prompts. Visitors switch between English and German without reloading the page, and each project has its own detailed page.",
    role: "Design direction and development, AI-assisted",
    year: "2026",
    stack: ["HTML", "CSS", "Tailwind CSS", "JavaScript"],
    liveUrl: "https://razanazizieh.github.io/sarah-portfolio/",
    githubUrl: "https://github.com/razanazizieh/sarah-portfolio",
    image: asset("/projects/bilingual-portfolio-website.webp"),
    contentVerified: true,
    patternSeed: "bilingual-grid",
    overview: "The site presents a data scientist's background, skills and projects in two languages. It is built with plain HTML, CSS and JavaScript, without a framework.",
    features: [
      {
        title: "Instant language switching",
        text: "A small JavaScript dictionary swaps every text between English and German without reloading the page.",
      },
      {
        title: "Project pages",
        text: "Each project has its own page with a structured layout for dashboards and prediction models.",
      },
      {
        title: "Standard pages",
        text: "The site also includes a legal notice, a privacy policy and a custom 404 page.",
      },
    ],
    gallery: [
      {
        src: asset("/projects/bilingual-portfolio-website-2.webp"),
        alt: "The same home page switched to German",
        caption: "The same page after switching to German.",
      },
      {
        src: asset("/projects/bilingual-portfolio-website-3.webp"),
        alt: "A project page from the site",
        caption: "A project page.",
      },
    ],
    featured: true,
    tags: ["Portfolio", "Frontend"],
  },
  {
    slug: "interactive-3d-hero-section",
    aliases: ["vortex", "3d-fluid"],
    title: "Interactive 3D hero section",
    description: "A hero section built around a 3D scene that follows the pointer, with a frosted-glass layout on top.",
    summary: "A single hero section that explores a 3D element reacting to the mouse.",
    longDescription: "VORTEX is a single hero section. I wanted to apply a 3D element that moves with the mouse, so I researched it and built it with help from Gemini. The scene is made in Spline, and a custom React hook tracks the cursor to move a spotlight across a frosted-glass grid.",
    role: "Personal project, built with AI assistance",
    year: "2026",
    stack: ["React", "Spline", "Vite", "CSS"],
    liveUrl: "https://razanazizieh.github.io/vortex/",
    githubUrl: "https://github.com/razanazizieh/vortex",
    image: asset("/projects/interactive-3d-hero-section.webp"),
    contentVerified: true,
    patternSeed: "vortex-grid",
    overview: "A single hero section that explores a 3D element reacting to the mouse.",
    features: [
      {
        title: "3D scene",
        text: "An interactive Spline scene responds to the visitor's pointer.",
      },
      {
        title: "Spotlight",
        text: "A custom React hook follows the cursor and moves a light across the grid.",
      },
      {
        title: "Glass effect",
        text: "Layered CSS keyframes and blur create the fluted-glass look.",
      },
    ],
    gallery: [
      {
        src: asset("/projects/interactive-3d-hero-section-2.webp"),
        alt: "Close-up of the frosted-glass grid",
        caption: "The frosted-glass grid.",
      },
      {
        src: asset("/projects/interactive-3d-hero-section-3.webp"),
        alt: "The hero section on a phone",
        caption: "On a phone.",
      },
    ],
    featured: true,
    tags: ["3D", "Creative"],
  },
  {
    slug: "article-management-app",
    aliases: ["articula", "cms"],
    title: "Article management app",
    description: "An app for browsing, searching and filtering articles, and for creating, editing and deleting them, connected to a provided REST API.",
    summary: "A React app where users browse articles from all users, search and filter them through the API, and manage articles, built from provided Figma designs.",
    longDescription: "ARTICULA is the final project of a front-end course. I built the interface and connected it to a provided REST API, following Figma designs for the main pages.",
    role: "Course final project, front-end development",
    year: "2026",
    stack: ["React", "JavaScript", "CSS Modules", "REST API"],
    githubUrl: "https://github.com/razanazizieh/articula-app",
    image: asset("/projects/article-management-app.webp"),
    video: {
      src: asset("/projects/article-management-app.mp4"),
      poster: asset("/projects/article-management-app.webp"),
    },
    contentVerified: true,
    patternSeed: "article-grid",
    overview: "The app covers browsing articles from all users, searching and filtering them, and creating, editing and deleting articles.",
    features: [
      {
        title: "Browse articles",
        text: "The app fetches the articles of all users, with their images, from the API and shows them in a browsable list, loading a limited number at a time.",
      },
      {
        title: "Search and filter",
        text: "Searches and filters are sent to the API with each request, so the server returns only the matching articles.",
      },
      {
        title: "Create, edit, delete",
        text: "Users can create, edit and delete articles from one dashboard.",
      },
      {
        title: "Controlled forms",
        text: "The forms are controlled components managed with React state, without a form library.",
      },
      {
        title: "Asynchronous requests",
        text: "Every call to the API goes through the Fetch API, and promises handle the responses.",
      },
      {
        title: "API testing",
        text: "I checked each endpoint in the provided Postman collection before connecting it to the app.",
      },
      {
        title: "Scoped styles",
        text: "CSS Modules keep each component's styles separate, so nothing leaks between components.",
      },
      {
        title: "Accounts and fallback routes",
        text: "The app handles user accounts and shows a custom page for unknown routes.",
      },
    ],
    gallery: [
      {
        src: asset("/projects/article-management-app-2.webp"),
        alt: "Search and filter results",
        caption: "Search and filter results.",
      },
      {
        src: asset("/projects/article-management-app-3.webp"),
        alt: "The create article form",
        caption: "Creating an article.",
      },
    ],
    featured: true,
    tags: ["Web App", "Frontend"],
  },
];

export const projects = PROJECTS;
export const featuredProjects = PROJECTS.filter((p) => p.featured);
export const allWorkHref = "/work";

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  if (!slug) return undefined;
  const normalized = slug.toLowerCase().trim();
  return PROJECTS.find(
    (p) =>
      p.slug === normalized ||
      (p.aliases && p.aliases.some((alias) => alias.toLowerCase() === normalized))
  );
}
