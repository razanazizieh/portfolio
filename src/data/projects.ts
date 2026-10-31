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
}

export const PROJECTS: Project[] = [
  {
    slug: "bilingual-portfolio-website",
    aliases: ["sarah-portfolio", "fluid-code"],
    title: "Bilingual portfolio website",
    description:
      "A multi-page portfolio for a data scientist, featuring instant English and German language switching and dedicated project pages.",
    summary:
      "A multi-page portfolio website for a data scientist, with instant English and German switching and a detailed page for each project.",
    longDescription:
      "Building upon an initial layout base, I architected and developed the entire application logic. I designed the visual identity, built the dynamic client-side language switching engine for instant English and German localization, and structured the dedicated project and privacy pages.",
    role: "Frontend Engineering & System Architecture",
    year: "2026",
    stack: ["HTML", "CSS", "Tailwind CSS", "JavaScript", "Stitch"],
    liveUrl: "https://razanazizieh.github.io/sarah-portfolio/",
    githubUrl: "https://github.com/razanazizieh/sarah-portfolio",
    image: asset("/projects/bilingual-portfolio-website.webp"),
    contentVerified: true,
    patternSeed: "bilingual-grid",
    overview:
      "A comprehensive multi-page portfolio presenting a data scientist's profile in two languages, featuring a custom-built language switching mechanism and structured case studies.",
    features: [
      {
        title: "Dynamic language switching engine",
        text: "Engineered a seamless client-side localization system to swap content instantly between English and German without page reloads.",
      },
      {
        title: "Structured case studies",
        text: "Designed and implemented dedicated views for data dashboards, analytical models, and project breakdowns.",
      },
      {
        title: "Complete site structure",
        text: "Developed essential application routes including privacy policy, legal notices, and custom error handlers.",
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
  },
  {
    slug: "interactive-3d-hero-section",
    aliases: ["vortex", "3d-fluid"],
    title: "Interactive 3D hero section",
    description:
      "A dynamic hero component integrating an interactive 3D Spline scene with custom React cursor-tracking.",
    summary:
      "An exploratory hero section combining React-driven interactive cursor tracking with a real-time 3D Spline scene.",
    longDescription:
      "Driven by curiosity about how interactive 3D elements are implemented programmatically rather than relying on automated no-code tools, I built VORTEX. I integrated an interactive 3D scene from Spline and developed a custom React hook to sync pointer movement with dynamic spotlight rendering.",
    role: "Frontend Development & 3D Integration",
    year: "2026",
    stack: ["React", "Spline", "Vite", "CSS"],
    liveUrl: "https://razanazizieh.github.io/vortex/",
    githubUrl: "https://github.com/razanazizieh/vortex",
    image: asset("/projects/interactive-3d-hero-section.webp"),
    contentVerified: true,
    patternSeed: "vortex-grid",
    overview:
      "A focused technical exploration into programmatically embedding dynamic 3D scenes within modern React component architectures.",
    features: [
      {
        title: "Interactive 3D scene",
        text: "Integrated a real-time Spline scene configured to respond seamlessly to user input.",
      },
      {
        title: "Custom cursor-tracking hook",
        text: "Engineered a custom React hook that calculates relative pointer coordinates to move a dynamic spotlight across the viewport.",
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
  },
  {
    slug: "article-management-app",
    aliases: ["articula", "cms"],
    title: "Article management app",
    description:
      "A React application for browsing, searching, filtering, and managing articles via a REST API, featuring a dedicated analytics dashboard and user profile management.",
    summary:
      "A feature-rich React app connected to a REST API, built from design references with a separate analytics dashboard and custom user account management.",
    longDescription:
      "ARTICULA was developed as a comprehensive front-end implementation project. Working from a provided design system and API documentation, I engineered the React application logic, handled asynchronous requests, and independently designed and built a separate analytics dashboard alongside dedicated profile and article management views.",
    role: "Frontend Development & Architecture",
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
    overview:
      "A complete platform featuring a dedicated analytics dashboard, robust asynchronous state handling, user profile management, and full article CRUD operations.",
    features: [
      {
        title: "REST API integration",
        text: "Tested endpoints via Postman and implemented seamless data fetching using JavaScript Promises and the Fetch API.",
      },
      {
        title: "Analytics dashboard",
        text: "Built a separate, custom dashboard view dedicated to displaying statistics and platform metrics.",
      },
      {
        title: "User profile management",
        text: "Designed dedicated profile views allowing users to update their personal details, manage their accounts, or delete them.",
      },
      {
        title: "Server-side search & filtering",
        text: "Synchronized user inputs with API parameters to fetch precisely filtered article lists with pagination support.",
      },
      {
        title: "Article management",
        text: "Built interactive features enabling users to create, edit, and delete their articles efficiently.",
      },
      {
        title: "Scoped styling architecture",
        text: "Utilized CSS Modules to maintain a modular and collision-free component style structure.",
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
  },
];

export const projects = PROJECTS;

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  if (!slug) return undefined;
  const normalized = slug.toLowerCase().trim();
  return PROJECTS.find(
    (p) =>
      p.slug === normalized ||
      (p.aliases && p.aliases.some((alias) => alias.toLowerCase() === normalized))
  );
}
