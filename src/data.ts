/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project } from "./types";

// Import the high-fidelity asset image paths
import vortexImage from "./assets/images/vortex_editorial_1780400444831.png";
import articulaImage from "./assets/images/articula_editorial_1780400462531.png";
import dwelloImage from "./assets/images/dwello_editorial_1780400481416.png";

// Import secondary assets
import vortexSec from "./assets/images/vortex_sec_1780407415309.png";
import articulaSec from "./assets/images/articula_sec_1780407434279.png";
import dwelloSec from "./assets/images/dwello_sec_1780407449962.png";

// Import newly generated high-fidelity editorial mockups
import sarahPortfolioImage from "./assets/images/sarah_portfolio_editorial_1782753433749.jpg";
import razanLegacyImage from "./assets/images/razan_legacy_editorial_1782753447417.jpg";
import specimenImage from "./assets/images/specimen_editorial_1782753464554.jpg";
export const PROJECTS_DATA: Project[] = [
  {
    id: "3d-fluid",
    title: "3D IMMERSIVE EXPERIENCE",
    category: "FULL-STACK",
    year: "2026",
    projectType: "Full Stack",
    overview:
      "An interactive web experience built to integrate a high-fidelity 3D core within a responsive, modern fluted glass layout.",
    challenge:
      "Integrating heavy 3D scene elements natively on the web often incurs significant performance overhead, leading to layout stuttering and sub-optimal frame rates on mobile devices.",
    solution:
      "Optimized the layout lifecycle using a lightweight Spline Viewer instance, combined with custom CSS acceleration to guarantee a smooth, responsive 60FPS fluid experience across all devices.",
    myRole:
      "Developed the complete layout and code simultaneously, handling the front-end implementation, custom Spline viewer integration, and interactive hero section layout optimization.",
    technicalHighlights: [
      "Direct code-driven visual layout execution",
      "Interactive customized cursor tracking logic",
    ],
    technology: ["React.js", "Spline Viewer", "Advanced CSS3", "Vite"],
    image: vortexImage,
    gallery: [
      { label: "High-Fidelity 3D Specimen", image: vortexImage },
      { label: "Responsive Layout View", image: vortexSec },
      { label: "Dynamic Physics Interaction Map", image: razanLegacyImage },
    ],
    impact:
      "A tactile, highly interactive web space built from scratch that operates seamlessly across all target screens.",
    live: "https://razanazizieh.github.io/vortex/",
    githubUrl: "https://github.com/razanazizieh/vortex",
  },
  {
    id: "bilingual-engine",
    title: "BILINGUAL PORTFOLIO ENGINE",
    category: "FULL-STACK",
    year: "2026",
    projectType: "Full Stack",
    overview:
      "A premium dark-mode portfolio system engineered to balance a high-end editorial structural layout with deep technical presentation.",
    challenge:
      "Using rich typography layout transitions with multi-language synchronization usually results in slow runtime content switching, broken inline alignments, or heavy cumulative layout shifts (CLS).",
    solution:
      "Created an extremely lightweight, key-value translation infrastructure in Vanilla JavaScript, maintaining strict CSS baseline alignments across both languages while preserving premium clip-path and fade reveal animation states.",
    myRole:
      "Leveraged Stitches for the initial UI orchestration, then manually refactored the entire codebase in VS Code. Designed additional clean utility pages, engineered the bilingual translation infrastructure, and fully optimized the site for SEO, Accessibility (A11y), and fluid responsiveness.",
    technicalHighlights: [
      "Bespoke manual code refinement and refactoring in VS Code",
      "Custom-built JavaScript translation architecture (EN/DE)",
      "Fully integrated legal compliance utility pages",
    ],
    technology: [
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Vanilla JavaScript",
      "Stitches",
    ],
    image: sarahPortfolioImage,
    gallery: [
      { label: "Bilingual Landing Layout", image: sarahPortfolioImage },
      { label: "Integrated Localization Framework", image: specimenImage },
      { label: "System Layout & Interface Detail", image: razanLegacyImage },
    ],
    impact:
      "A production-ready bilingual portfolio engine featuring high typography readability and smooth language toggling.",
    live: "https://razanazizieh.github.io/sarah-portfolio/",
    githubUrl: "https://github.com/razanazizieh/sarah-portfolio",
  },
  {
    id: "minimalist-portfolio",
    title: "MINIMALIST CANVAS PORTFOLIO",
    category: "FULL-STACK",
    year: "2025",
    projectType: "Full Stack",
    overview:
      "A minimalist personal showcase built as an independent creative playground to experiment with raw browser scripting, dynamic canvas graphics, and seamless theme toggling.",
    challenge:
      "Developing interactive canvas particle systems and custom cursor inertia behaviors that feel natural and highly responsive without consuming excessive CPU resources.",
    solution:
      "Wrote an independent custom vector mathematics module inside an optimized requestAnimationFrame loop, relying on hardware-accelerated transforms and offscreen canvas caching to achieve pristine, low-latency micro-interactions.",
    myRole:
      "Engineered the entire experience from scratch, executing the layout directly within the code editor while scripting all interaction layers.",
    technicalHighlights: [
      "Interactive HTML5 Canvas particle system",
      "Standalone smooth-follow custom cursor logic",
      "Native light/dark theme toggles",
    ],
    technology: ["HTML5 Canvas", "CSS3", "Vanilla JavaScript", "GitHub Pages"],
    image: razanLegacyImage,
    gallery: [
      { label: "Minimalist Core Presentation", image: razanLegacyImage },
      { label: "Vector Math & Canvas Simulations", image: vortexImage },
      { label: "Fluid UI Spatial Transition States", image: vortexSec },
    ],
    impact:
      "A lightweight, high-performance responsive portfolio built entirely through independent core programming without external layout tools.",
    live: "https://razanazizieh.github.io/portfoli0/",
    githubUrl: "https://github.com/razanazizieh/portfoli0",
  },
  {
    id: "brutalist-architecture",
    title: "BRUTALIST INTERFACE ARCHITECTURE",
    category: "UI",
    year: "2026",
    projectType: "Interface Study",
    overview:
      "A high-fidelity, full-page visual interface study designed using Google AI Studio, exploring brutalist grid structures and dynamic spatial interactions.",
    challenge:
      "Designing a dense, typography-focused full-page layout that maintains strong structural hierarchy, visual balance, and fluid scaling across various display sizes.",
    solution:
      "Leveraged Google AI Studio to prototype and validate responsive grid coordinates and viewport-relative scaling limits in real time.",
    myRole:
      "Designed the complete visual concept and layout architecture, utilizing Google AI Studio to prototype fluid spatial transitions, micro-interactions, and typographic systems.",
    technicalHighlights: [
      "Full-page brutalist grid layout design",
      "AI-assisted interactive UI/UX prototyping",
      "Precision typography alignment and spatial scale rules",
    ],
    technology: ["Google AI Studio", "UI/UX Design"],
    image: specimenImage,
    gallery: [
      { label: "Tactile Grid Interaction Map", image: specimenImage },
      {
        label: "Typography System Scale Specifications",
        image: sarahPortfolioImage,
      },
      { label: "High-Contrast Visual Space Layout", image: dwelloImage },
    ],
    impact:
      "A polished visual prototype demonstrating advanced full-page layout composition and modern UI design aesthetics.",
    // live: "#",
  },
];
// export const PROJECTS_DATA: Project[] = [
//   {
//     id: "3d-fluid",
//     title: "3D IMMERSIVE EXPERIENCE",
//     category: "FULL-STACK",
//     year: "2026",
//     projectType: "Full Stack",
//     overview:
//       "An interactive web experience built to integrate a high-fidelity 3D core within a responsive, modern fluted glass layout.",
//     challenge:
//       "Integrating heavy 3D scene elements natively on the web often incurs significant performance overhead, leading to layout stuttering, unresponsive mouse-tracking, and sub-optimal frame rates on mobile devices.",
//     solution:
//       "Engineered a decoupled canvas loading lifecycle utilizing an optimized Spline Viewer instance, combined with custom mouse-tracking deceleration algorithms that run within separate animation frames to guarantee a smooth, responsive 60FPS fluid experience.",
//     myRole:
//       "Developed the complete layout and code simultaneously, handling the front-end implementation, custom Spline viewer integration, and interactive hero section layout optimization.",
//     technicalHighlights: [
//       "Direct code-driven visual layout execution",
//       "Interactive customized cursor tracking logic",
//       // "Programmatic removal of Spline watermarks and branding",
//     ],
//     technology: ["React.js", "Spline Viewer", "Advanced CSS3", "Vite"],
//     image: vortexImage,
//     gallery: [
//       { label: "High-Fidelity 3D Specimen", image: vortexImage },
//       { label: "Responsive Layout View", image: vortexSec },
//       { label: "Dynamic Physics Interaction Map", image: razanLegacyImage },
//     ],
//     impact:
//       "A tactile, highly interactive web space built from scratch that operates seamlessly across all target screens.",
//     live: "https://razanazizieh.github.io/vortex/",
//     githubUrl: "https://github.com/razanazizieh/vortex",
//   },
//   {
//     id: "bilingual-engine",
//     title: "BILINGUAL PORTFOLIO ENGINE",
//     category: "FULL-STACK",
//     year: "2026",
//     projectType: "Full Stack",
//     overview:
//       "A premium dark-mode portfolio system engineered to balance a high-end editorial structural layout with deep technical presentation.",
//     challenge:
//       "Fusing rich typography layout transitions with multi-language synchronization usually results in slow runtime content switching, broken inline alignments, or heavy cumulative layout shifts (CLS).",
//     solution:
//       "Created an extremely lightweight, key-value translation infrastructure directly inside native React hooks, maintaining strict CSS baseline alignments across both languages while preserving premium clip-path and fade reveal animation states.",
//     myRole:
//       "Leveraged Stitches for the initial UI orchestration, then manually refactored the entire codebase in VS Code. Designed additional clean utility pages, engineered the bilingual translation infrastructure, and fully optimized the site for SEO, Accessibility (A11y), and fluid responsiveness.",

//     technicalHighlights: [
//       "Bespoke manual code refinement and refactoring in VS Code",
//       "Custom-built JavaScript translation architecture (EN/DE)",
//       "Fully integrated legal compliance utility pages",
//     ],
//     technology: [
//       "HTML5",
//       "CSS3",
//       "Tailwind CSS",
//       "Vanilla JavaScript",
//       "Stitches",
//     ],
//     image: sarahPortfolioImage,
//     gallery: [
//       { label: "Bilingual Landing Layout", image: sarahPortfolioImage },
//       { label: "Integrated Localization Framework", image: specimenImage },
//       { label: "System Layout & Interface Detail", image: razanLegacyImage },
//     ],
//     impact:
//       "A production-ready bilingual portfolio engine featuring high typography readability and smooth language toggling.",
//     live: "https://razanazizieh.github.io/sarah-portfolio/",
//     githubUrl: "https://github.com/razanazizieh/sarah-portfolio",
//   },
//   // {
//   //   id: "custom-cms",
//   //   title: "CUSTOM REACT CMS & DASHBOARD",
//   //   category: "CODE",
//   //   year: "2025",
//   //   projectType: "Coding Only",
//   //   overview: "A React-based administration application featuring a complete data dashboard designed to handle project entries via API data routing.",
//   //   challenge: "Structuring a real-time administrative console with fluid database state mutations frequently leads to visual layout flickering, excessive API re-fetching, and desynchronized local states.",
//   //   solution: "Developed a robust client-side caching wrapper with lazy API fetch handlers, ensuring CRUD mutations are applied to local states instantaneously before the server completes validation, creating a fluid, uninterrupted user workflow.",
//   //   myRole: "Programmed the core CRUD functionalities, wired the live API data communication, and built custom interface pages from scratch to complete the system's aesthetic consistency.",
//   //   technicalHighlights: [
//   //     "Direct database state modifications",
//   //     "Clean API data fetching",
//   //     "Entirely custom dashboard component layouts"
//   //   ],
//   //   technology: ["React.js", "Rest API", "CRUD Architecture"],
//   //   image: articulaImage,
//   //   gallery: [
//   //     { label: "Custom CMS Interface", image: articulaImage },
//   //     { label: "Dynamic Dashboard Responsive View", image: articulaSec }
//   //   ],
//   //   impact: "A fast, functional administrative data console rendering seamless live state updates with absolute visual unity.",
//   //   live: "#",
//   //   githubUrl: "#",
//   // },
//   // {
//   //   id: "dwello",
//   //   title: "DWELLO / ARCHITECTURAL LANDING PAGE",
//   //   category: "UI",
//   //   year: "2025",
//   //   projectType: "Frontend Implementation",
//   //   overview: "A modern architectural real estate landing page developed to implement pre-designed property listings through high-fidelity, clean code structures.",
//   //   challenge: "Presenting multiple heavy architectural image mockups in responsive gallery grids without causing slow initial page paint times or degraded layout density on smaller screens.",
//   //   solution: "Engineered a touch-responsive lazy-loaded masonry grid combined with high-resolution lightbox transitions, maintaining consistent column spacing and rigid visual alignment across all breakpoints.",
//   //   myRole: "Executed the complete front-end programming and technical building of the landing page layout, establishing responsive grids, search sections, and interactive navigation elements.",
//   //   technicalHighlights: [
//   //     "Pure semantic front-end execution",
//   //     "High-resolution lightbox gallery integration",
//   //     "Touch-responsive slider adjustments"
//   //   ],
//   //   technology: ["HTML5", "CSS3", "Bootstrap 5.3", "Swiper.js", "Fancybox"],
//   //   image: dwelloImage,
//   //   gallery: [
//   //     { label: "Dwello Desktop Overview", image: dwelloImage },
//   //     { label: "Property Grid Responsive Layout", image: dwelloSec },
//   //     { label: "Interactive Spatial Typography Distribution", image: specimenImage }
//   //   ],
//   //   impact: "A stable, pixel-perfect frontend architectural page built with rigid modular styling and preparation for dark/light mode logic.",
//   //   live: "#",
//   //   githubUrl: "#"

//   // },
//   {
//     id: "minimalist-portfolio",
//     title: "MINIMALIST CANVAS PORTFOLIO",
//     category: "FULL-STACK",
//     year: "2025",
//     projectType: "Full Stack",
//     overview:
//       "A minimalist personal showcase built as an independent creative playground to experiment with raw browser scripting, dynamic canvas graphics, and seamless theme toggling.",
//     challenge:
//       "Developing interactive canvas particle systems and custom cursor inertia behaviors that feel natural and highly responsive without consuming excessive CPU resources.",
//     solution:
//       "Wrote an independent custom vector mathematics module inside an optimized requestAnimationFrame loop, relying on hardware-accelerated transforms and offscreen canvas caching to achieve pristine, low-latency micro-interactions.",
//     myRole:
//       "Engineered the entire experience from scratch, executing the layout directly within the code editor while scripting all interaction layers.",
//     technicalHighlights: [
//       "Interactive HTML5 Canvas particle system",
//       "Standalone smooth-follow custom cursor logic",
//       "Native light/dark theme toggles",
//     ],
//     technology: [
//       "HTML5 Canvas",
//       "CSS3",
//       "Vanilla JavaScript",
//       // "JetBrains Mono",
//       "GitHub Pages",
//     ],
//     image: razanLegacyImage,
//     gallery: [
//       { label: "Minimalist Core Presentation", image: razanLegacyImage },
//       { label: "Vector Math & Canvas Simulations", image: vortexImage },
//       { label: "Fluid UI Spatial Transition States", image: vortexSec },
//     ],
//     impact:
//       "A lightweight, high-performance responsive portfolio built entirely through independent core programming without external layout tools.",
//     live: "https://razanazizieh.github.io/portfoli0/",
//     githubUrl: "https://github.com/razanazizieh/portfoli0",
//   },
//   {
//     id: "interaction-specimen",
//     title: "INTERACTIVE HERO ARCHITECTURE",
//     category: "UI",
//     year: "2026",
//     projectType: "Interface Study",
//     overview:
//       "A high-fidelity visual concept focused on micro-interactions, brutalist typography grid distribution.",
//     //  and dark-mode aesthetic spacing.",
//     // challenge:
//     //   "Prototyping advanced brutalist micro-interactions and grid tracking offsets that scale beautifully on ultra-wide screens without losing layout density.",
//     //
//     // solution:
//     // "Designed a rigid typographic layout system utilizing precise viewport-relative grid coordinates (vw/vh), guarded by strict clamp constraints to ensure the visual composition remains absolute and readable at any scale.",
//     myRole:
//       "Crafted the complete functional interface logic, defining fluid scaling limits and premium spatial transitions across modular layouts.",
//     technicalHighlights: [
//       "Precision grid typography tracking",
//       "Spatial layout transition prototyping",
//       "Optimized aesthetic system architectures",
//     ],
//     // technology: ["Figma"],
//     image: specimenImage,
//     gallery: [
//       { label: "Tactile Grid Interaction Map", image: specimenImage },
//       {
//         label: "Typography System Scale Specifications",
//         image: sarahPortfolioImage,
//       },
//       { label: "High-Contrast Visual Space Layout", image: dwelloImage },
//     ],
//     impact:
//       "A polished visual spec demonstrating advanced structural layout composition and fluid user interface aesthetics.",
//     live: "#",
//     // githubUrl: "#",
//   },
// ];

export const PROFILE_NARRATIVE = {
  aboutTitle:
    "Interfaces built with rigorous structural design and high-performance physics.",
  principles: [
    {
      question: "Structure & System",
      answer:
        "Every spacing, weight, and layout transition is governed by strict programmatic layouts and system clarity.",
    },
    {
      question: "Intelligent Motion",
      answer:
        "Interactions respond with realistic inertia and natural elasticity, mimicking real-world dynamic systems.",
    },
    {
      question: "Functional Simplicity",
      answer:
        "Visual quietness is achieved by eliminating redundant elements, focusing entirely on performance and user interaction.",
    },
  ],
};
