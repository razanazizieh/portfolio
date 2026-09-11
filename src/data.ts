// /**
//  * @license
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import { Project, RhythmPreset, ImageRhythmProfile } from './types';

// export const RHYTHM_PRESETS: Record<RhythmPreset, ImageRhythmProfile> = {
//   RHYTHM_A: {
//     coverDwell: 2000,
//     interval: 2000,
//     transitionDuration: 600,
//     transitionStyle: 'soft-crossfade',
//   },
//   RHYTHM_B: {
//     coverDwell: 2000,
//     interval: 2000,
//     transitionDuration: 600,
//     transitionStyle: 'soft-crossfade',
//   },
//   RHYTHM_C: {
//     coverDwell: 2000,
//     interval: 2000,
//     transitionDuration: 600,
//     transitionStyle: 'soft-crossfade',
//   },
//   RHYTHM_D: {
//     coverDwell: 2000,
//     interval: 2000,
//     transitionDuration: 600,
//     transitionStyle: 'soft-crossfade',
//   },
// };

// // Import the high-fidelity asset image paths
// import vortexImage from './assets/images/vortex_editorial_1780400444831.png';
// import articulaImage from './assets/images/articula_editorial_1780400462531.png';
// import dwelloImage from './assets/images/dwello_editorial_1780400481416.png';

// // Import secondary & tertiary high-fidelity assets
// import vortexSec from './assets/images/vortex_sec_1780407415309.png';
// import vortexTert from './assets/images/vortex_tertiary_1787999055349.jpg';
// import articulaSec from './assets/images/articula_sec_1780407434279.png';
// import dwelloSec from './assets/images/dwello_sec_1780407449962.png';

// // Import newly generated high-fidelity editorial mockups
// import sarahPortfolioImage from './assets/images/sarah_portfolio_editorial_1782753433749.jpg';
// import bilingualSec from './assets/images/bilingual_sec_1787999042373.jpg';
// import razanLegacyImage from './assets/images/razan_legacy_editorial_1782753447417.jpg';
// import minimalistSec from './assets/images/minimalist_sec_1787999067928.jpg';
// import minimalistTert from './assets/images/minimalist_tert_1787999078582.jpg';
// import specimenImage from './assets/images/specimen_editorial_1782753464554.jpg';
// import specimenSec from './assets/images/specimen_sec_1787999092872.jpg';

// export const PROJECTS_DATA: Project[] = [
//   {
//     id: "3d-fluid",
//     title: "3D IMMERSIVE EXPERIENCE",
//     category: "FULL-STACK",
//     year: "2026",
//     projectType: "Full Stack",
//     overview: "An interactive web experience built to integrate a high-fidelity 3D core within a responsive, modern fluted glass layout.",
//     challenge: "Integrating heavy 3D scene elements natively on the web often incurs significant performance overhead, leading to layout stuttering, unresponsive mouse-tracking, and sub-optimal frame rates on mobile devices.",
//     solution: "Structured a decoupled canvas loading lifecycle utilizing an optimized Spline Viewer instance, combined with custom interaction logic and motion smoothing algorithms to ensure a responsive 60FPS fluid experience.",
//     myRole: "Developed the complete layout and code simultaneously, handling the front-end implementation, custom mouse-tracking lighting effects, and canvas optimization.",
//     technicalHighlights: [
//       "Direct code-driven visual layout execution",
//       "Custom mouse-tracking lighting hooks",
//       "Smooth 60FPS responsive canvas scaling"
//     ],
//     technology: ["React.js", "Spline Viewer", "Advanced CSS3", "Vite"],
//     image: vortexImage,
//     images: [vortexImage, vortexSec, vortexTert],
//     rhythm: 'RHYTHM_A',
//     gallery: [
//       { label: "High-Fidelity 3D Specimen", image: vortexImage },
//       { label: "Responsive Layout View", image: vortexSec },
//       { label: "Interactive Scene Controls", image: vortexTert }
//     ],
//     impact: "A tactile, highly interactive web space built from scratch that operates seamlessly across all target screens.",
//     live: "https://3d-fluid-specimen.designstudio.io",
//     repository: "https://github.com/razanazizieh/3d-fluid-immersive",
//     technicalSpecifications: [
//       { parameter: "Render Frame Budget", specification: "Hardware-accelerated WebGL compositing", metric: "60 FPS (16.6ms)", standard: "W3C Performance Timeline" },
//       { parameter: "Input Tracking Frequency", specification: "Pointer capture with lerp dampening", metric: "120Hz sample rate", standard: "W3C Pointer Events Level 3" },
//       { parameter: "Initial Bundle Footprint", specification: "Code-split dynamic canvas loader", metric: "42KB initial JS", standard: "Core Web Vitals Optimal" },
//       { parameter: "Memory Allocation", specification: "Reusable geometry buffer pools", metric: "< 16MB GPU Heap", standard: "Low-Power Device Profile" }
//     ],
//     faq: [
//       {
//         question: "How does the 3D fluid core sustain 60FPS on mobile devices?",
//         answer: "The engine utilizes offscreen canvas buffer sizing, worker-isolated geometry calculations, and requestAnimationFrame throttling aligned with hardware refresh rates, preventing mobile GPU thermal throttling."
//       },
//       {
//         question: "What mouse-tracking algorithm eliminates cursor lag in WebGL?",
//         answer: "Pointer events are captured at native 120Hz display intervals and processed through an exponential decay lerp formula, dampening erratic input jitter while preserving instant tactile response."
//       }
//     ]
//   },
//   {
//     id: "bilingual-engine",
//     title: "BILINGUAL PORTFOLIO ENGINE",
//     category: "FULL-STACK",
//     year: "2026",
//     projectType: "Full Stack",
//     overview: "A high-performance portfolio system structured to balance an editorial layout with dynamic system logic.",
//     challenge: "Fusing rich typography layout transitions with multi-language synchronization usually results in slow runtime content switching, broken inline alignments, or heavy cumulative layout shifts (CLS).",
//     solution: "Created an extremely lightweight, key-value translation infrastructure directly inside native React hooks, maintaining strict CSS baseline alignments across both languages while preserving premium clip-path and fade reveal animation states.",
//     myRole: "Orchestrated the initial layout framework using Stitches, then refactored the codebase, built clean interface pages, and formed the dynamic multi-language system logic.",
//     technicalHighlights: [
//       "Custom-built JavaScript translation system (EN/DE)",
//       "Fully integrated legal compliance utility pages",
//       "Manual code refinement"
//     ],
//     technology: ["HTML5", "CSS3", "Tailwind CSS", "Vanilla JavaScript", "Stitches"],
//     image: sarahPortfolioImage,
//     images: [sarahPortfolioImage, bilingualSec],
//     rhythm: 'RHYTHM_B',
//     gallery: [
//       { label: "Bilingual Landing Layout", image: sarahPortfolioImage },
//       { label: "German Locale Technical Overview", image: bilingualSec }
//     ],
//     impact: "A production-ready bilingual portfolio engine featuring high typography readability and smooth language toggling.",
//     live: "https://bilingual-engine.designstudio.io",
//     repository: "https://github.com/razanazizieh/bilingual-portfolio-engine",
//     technicalSpecifications: [
//       { parameter: "Cumulative Layout Shift", specification: "Pre-computed optical typographic bounding", metric: "0.00 CLS", standard: "Google Core Web Vitals" },
//       { parameter: "Locale Switching Latency", specification: "Synchronous key-value state tree swap", metric: "< 4ms latency", standard: "INP (Interaction to Next Paint)" },
//       { parameter: "Translation Dictionary", specification: "Minified localized JSON payload", metric: "3.2KB inlined", standard: "RFC 8259 Standard" },
//       { parameter: "Typographic Normalization", specification: "Bidirectional logical CSS properties", metric: "100% glyph parity", standard: "Unicode CLDR Specs" }
//     ],
//     faq: [
//       {
//         question: "How does the bilingual engine achieve 0.00 Cumulative Layout Shift during locale switches?",
//         answer: "The router applies pre-calculated bounding geometry and bidirectional logical CSS rules that reserve optical typographic bounding boxes, ensuring zero DOM reflow during synchronous language swaps."
//       },
//       {
//         question: "How are German compound nouns accommodated without visual truncation?",
//         answer: "The layout engine computes text container widths using dynamic character-unit bounds and optical letter tracking adjustments, ensuring lengthy German terms maintain baseline rhythm."
//       }
//     ]
//   },
//   {
//     id: "custom-cms",
//     title: "CUSTOM REACT CMS & DASHBOARD",
//     category: "CODE",
//     year: "2025",
//     projectType: "Coding Only",
//     overview: "A React-based administration application featuring a complete data dashboard designed to handle project entries via API data routing.",
//     challenge: "Structuring a real-time administrative console with fluid database state mutations frequently leads to visual layout flickering, excessive API re-fetching, and desynchronized local states.",
//     solution: "Developed a robust client-side caching wrapper with lazy API fetch handlers, ensuring CRUD mutations are applied to local states instantaneously before the server completes validation, creating a fluid, uninterrupted user workflow.",
//     myRole: "Programmed the core CRUD functionalities, wired the live API data communication, and built custom interface pages from scratch to complete the system's aesthetic consistency.",
//     technicalHighlights: [
//       "Direct database state modifications",
//       "Clean API data fetching",
//       "Entirely custom dashboard component layouts"
//     ],
//     technology: ["React.js", "Rest API", "CRUD Logic"],
//     image: articulaImage,
//     images: [articulaImage, articulaSec],
//     rhythm: 'RHYTHM_C',
//     gallery: [
//       { label: "Custom CMS Interface", image: articulaImage },
//       { label: "Dynamic Dashboard Responsive View", image: articulaSec }
//     ],
//     impact: "A fast, functional administrative data console rendering seamless live state updates with absolute visual unity.",
//     live: "https://react-cms-dashboard.designstudio.io",
//     repository: "https://github.com/razanazizieh/react-cms-dashboard",
//     technicalSpecifications: [
//       { parameter: "Optimistic State Latency", specification: "Instant local commit with rollback snapshot", metric: "< 14ms commit", standard: "ACID Client Reliability" },
//       { parameter: "Cache Synchronization", specification: "Stale-While-Revalidate event pipeline", metric: "88% call reduction", standard: "HTTP RFC 5861" },
//       { parameter: "Schema Validation", specification: "Type-safe client-side payload evaluation", metric: "< 5ms eval time", standard: "TypeScript Strict Mode" },
//       { parameter: "Layout Shift Prevention", specification: "Skeleton state geometry preservation", metric: "0.00 CLS", standard: "Google Core Web Vitals" }
//     ],
//     faq: [
//       {
//         question: "How does optimistic client-side caching prevent layout flickering in the CMS?",
//         answer: "Mutations are applied to local React state immediately with snapshot checkpoints, updating the UI before network validation completes and seamlessly rolling back if server rejection occurs."
//       },
//       {
//         question: "How does lazy API route pre-fetching reduce data retrieval latency?",
//         answer: "Route-level observers trigger asynchronous background pre-fetches when navigation controls enter viewport proximity, reducing perceived data latency to under 15ms."
//       }
//     ]
//   },
//   {
//     id: "dwello",
//     title: "DWELLO / REAL ESTATE LANDING PAGE",
//     category: "UI",
//     year: "2025",
//     projectType: "Frontend Implementation",
//     overview: "A modern real estate landing page developed to present structured property listings through high-fidelity interactive interface logic.",
//     challenge: "Presenting multiple heavy image mockups in responsive gallery grids without causing slow initial page paint times or degraded layout density on smaller screens.",
//     solution: "Structured a touch-responsive lazy-loaded masonry grid combined with dynamic interface transitions, maintaining consistent column spacing and rigid visual alignment across all breakpoints.",
//     myRole: "Executed the complete front-end programming and technical building of the landing page layout, establishing responsive grids, search sections, and interactive navigation elements.",
//     technicalHighlights: [
//       "Pure semantic front-end execution",
//       "High-resolution lightbox gallery integration",
//       "Touch-responsive slider adjustments"
//     ],
//     technology: ["HTML5", "CSS3", "Bootstrap 5.3", "Swiper.js", "Fancybox"],
//     image: dwelloImage,
//     images: [dwelloImage, dwelloSec],
//     rhythm: 'RHYTHM_D',
//     gallery: [
//       { label: "Dwello Desktop Overview", image: dwelloImage },
//       { label: "Property Grid Responsive Layout", image: dwelloSec }
//     ],
//     impact: "A stable, pixel-perfect frontend page built with rigid modular styling and preparation for dark/light mode logic.",
//     live: "https://dwello-landing.designstudio.io",
//     repository: "https://github.com/razanazizieh/dwello-landing",
//     technicalSpecifications: [
//       { parameter: "Largest Contentful Paint", specification: "Priority WebP decoding & responsive srcset", metric: "0.68s LCP", standard: "Core Web Vitals Fast" },
//       { parameter: "Grid Layout Reflow", specification: "CSS Grid track sizing with aspect-ratio", metric: "0ms reflow stall", standard: "W3C CSS Grid Level 2" },
//       { parameter: "Touch Drag Latency", specification: "Hardware-accelerated touch-action CSS", metric: "< 8ms response", standard: "Mobile Touch Interactivity" },
//       { parameter: "Accessibility Contrast", specification: "Strict WCAG AA typographic contrast", metric: "7.2:1 contrast ratio", standard: "WCAG 2.1 Level AA" }
//     ],
//     faq: [
//       {
//         question: "How does Dwello maintain sub-second Largest Contentful Paint with high-resolution imagery?",
//         answer: "Image assets use priority srcset attributes, responsive WebP compression, and asynchronous decoding attributes, prioritizing above-the-fold hero rendering in under 700ms."
//       },
//       {
//         question: "How are property grid listings stabilized across varying viewport densities?",
//         answer: "The responsive grid is governed by intrinsic CSS Grid track sizing and CSS aspect-ratio properties, preventing content recalculation during viewport resizing."
//       }
//     ]
//   },
//   {
//     id: "minimalist-portfolio",
//     title: "MINIMALIST CANVAS PORTFOLIO",
//     category: "FULL-STACK",
//     year: "2025",
//     projectType: "Full Stack",
//     overview: "A personal showcase portfolio built as an independent playground for raw browser scripting, dynamic graphics, and fluid theme handling.",
//     challenge: "Developing interactive canvas particle systems and custom cursor inertia behaviors that feel natural and highly responsive without consuming excessive CPU resources.",
//     solution: "Wrote an independent custom vector logic module inside an optimized requestAnimationFrame loop, relying on hardware-accelerated transforms and offscreen canvas caching to achieve pristine, low-latency micro-interactions.",
//     myRole: "Built the entire experience from scratch, executing the layout directly within the code editor while scripting all interaction layers.",
//     technicalHighlights: [
//       "Interactive HTML5 Canvas particle system",
//       "Standalone smooth-follow custom cursor logic",
//       "Native light/dark theme toggles"
//     ],
//     technology: ["HTML5 Canvas", "CSS3", "Vanilla JavaScript", "JetBrains Mono", "GitHub Pages"],
//     image: razanLegacyImage,
//     images: [razanLegacyImage, minimalistSec, minimalistTert],
//     rhythm: 'RHYTHM_B',
//     gallery: [
//       { label: "Minimalist Core Presentation", image: razanLegacyImage },
//       { label: "Generative Particle Mesh", image: minimalistSec },
//       { label: "Interactive Canvas Controls", image: minimalistTert }
//     ],
//     impact: "A lightweight, high-performance responsive portfolio built entirely through independent core programming without external layout tools.",
//     live: "https://minimalist-canvas.designstudio.io",
//     repository: "https://github.com/razanazizieh/minimalist-canvas-portfolio",
//     technicalSpecifications: [
//       { parameter: "Canvas Render Budget", specification: "Continuous requestAnimationFrame physics loop", metric: "60 FPS (16.6ms)", standard: "HTML5 Canvas 2D Context" },
//       { parameter: "Particle Node Capacity", specification: "Spatial hash grid collision detection", metric: "250 live nodes", standard: "Vector Math Performance" },
//       { parameter: "Heap Memory Usage", specification: "Zero-allocation object recycling", metric: "< 12MB total heap", standard: "V8 Engine Optimization" },
//       { parameter: "External Dependency Footprint", specification: "Pure vanilla JavaScript execution", metric: "0KB 3rd-party libs", standard: "Zero-Dependency Principle" }
//     ],
//     faq: [
//       {
//         question: "How is CPU consumption minimized during continuous canvas particle animation?",
//         answer: "The particle engine utilizes spatial partition grids and object pooling, avoiding dynamic garbage collection cycles and sustaining 60FPS on a single animation frame."
//       },
//       {
//         question: "How does the custom cursor inertia system maintain optical alignment?",
//         answer: "Cursor coordinates are sampled on raw pointermove events and blended using spring-mass physics equations, generating a physical sense of weight without disconnecting from the pointer point."
//       }
//     ]
//   },
//   {
//     id: "interaction-specimen",
//     title: "INTERACTIVE HERO INTERFACE",
//     category: "UI",
//     year: "2026",
//     projectType: "Interface Study",
//     overview: "A high-fidelity visual concept focused on micro-interactions, brutalist typography grid distribution, and dark-mode aesthetic spacing.",
//     challenge: "Prototyping advanced brutalist micro-interactions and grid tracking offsets that scale beautifully on ultra-wide screens without losing layout density.",
//     solution: "Structured a rigid typographic system utilizing precise viewport-relative grid coordinates (vw/vh), guarded by strict clamp constraints to ensure the interactive interface remains absolute and readable at any scale.",
//     myRole: "Crafted the complete functional interface logic, defining fluid scaling limits and premium spatial transitions across modular layouts.",
//     technicalHighlights: [
//       "Precision grid typography tracking",
//       "Spatial layout transition prototyping",
//       "Optimized interface component structures"
//     ],
//     technology: ["React.js", "CSS Modules", "Framer Motion", "Figma"],
//     image: specimenImage,
//     images: [specimenImage, specimenSec],
//     rhythm: 'RHYTHM_A',
//     gallery: [
//       { label: "Tactile Grid Interaction Map", image: specimenImage },
//       { label: "Brutalist Layout Structure", image: specimenSec }
//     ],
//     impact: "A polished interactive specimen demonstrating dynamic system formation, structural layout composition, and responsive interface behavior.",
//     live: "https://interaction-specimen.designstudio.io",
//     repository: "https://github.com/razanazizieh/interactive-hero-interface",
//     technicalSpecifications: [
//       { parameter: "Fluid Scaling Bounds", specification: "CSS clamp() viewport-relative vectors", metric: "320px to 2560px", standard: "W3C CSS Values Level 4" },
//       { parameter: "Interaction Response Time", specification: "Hardware-accelerated CSS compositor layers", metric: "< 8ms response", standard: "Real-Time Interaction" },
//       { parameter: "Spring Kinematics Easing", specification: "Cubic-bezier custom dampening curve", metric: "cubic-bezier(0.16, 1, 0.3, 1)", standard: "Kinetic UI Directives" },
//       { parameter: "Layout Shift Prevention", specification: "Pre-rendered SVG bounding boxes", metric: "0.00 CLS", standard: "Google Core Web Vitals" }
//     ],
//     faq: [
//       {
//         question: "How does viewport-relative typography preserve readability on ultra-wide displays?",
//         answer: "Typography utilizes CSS clamp functions bound to viewport width and height vectors with upper architectural limits, preventing extreme text stretching on 4K+ displays."
//       },
//       {
//         question: "How do brutalist interaction physics create tactile responsiveness?",
//         answer: "Kinematic transitions utilize asymmetric spring damping and micro-scale transformations, providing immediate optical feedback on hover and active touch states."
//       }
//     ]
//   }
// ];

// export const PROFILE_NARRATIVE = {
//   aboutTitle: 'Interfaces built with rigorous structural logic and high-performance physics.',
//   principles: [
//     {
//       question: 'Structure & System',
//       answer: 'Every spacing, weight, and layout transition is governed by strict programmatic layouts and system clarity.'
//     },
//     {
//       question: 'Intelligent Motion',
//       answer: 'Interactions respond with realistic inertia and natural elasticity, mimicking real-world dynamic systems.'
//     },
//     {
//       question: 'Functional Simplicity',
//       answer: 'Visual quietness is achieved by eliminating redundant elements, focusing entirely on performance and user interaction.'
//     }
//   ]
// };
// Types & Manifest Imports
import { Project, RhythmPreset, ImageRhythmProfile } from "./types";
import { IMAGE_MANIFEST } from "./imageManifest";

// High-fidelity primary asset image paths
import vortexImage from "./assets/images/vortex_editorial_1780400444831.png";
import articulaImage from "./assets/images/articula_editorial_1780400462531.png";
import dwelloImage from "./assets/images/dwello_editorial_1780400481416.png";

// Secondary & tertiary high-fidelity assets
import vortexSec from "./assets/images/vortex_sec_1780407415309.png";
import vortexTert from "./assets/images/vortex_tertiary_1787999055349.jpg";
import articulaSec from "./assets/images/articula_sec_1780407434279.png";
import dwelloSec from "./assets/images/dwello_sec_1780407449962.png";

// High-fidelity editorial mockups
import sarahPortfolioImage from "./assets/images/sarah_portfolio_editorial_1782753433749.jpg";
import bilingualSec from "./assets/images/bilingual_sec_1787999042373.jpg";
import razanLegacyImage from "./assets/images/razan_legacy_editorial_1782753447417.jpg";
import razanSecImage from "./assets/images/razan_sec_1782753447417.jpg";
import minimalistSec from "./assets/images/minimalist_sec_1787999067928.jpg";
import minimalistTert from "./assets/images/minimalist_tert_1787999078582.jpg";
import specimenImage from "./assets/images/specimen_editorial_1782753464554.jpg";
import specimenSec from "./assets/images/specimen_sec_1787999092872.jpg";

export const RHYTHM_PRESETS: Record<RhythmPreset, ImageRhythmProfile> = {
  RHYTHM_A: {
    coverDwell: 2000,
    interval: 2000,
    transitionDuration: 600,
    transitionStyle: "soft-crossfade",
  },
  RHYTHM_B: {
    coverDwell: 2000,
    interval: 2000,
    transitionDuration: 600,
    transitionStyle: "soft-crossfade",
  },
  RHYTHM_C: {
    coverDwell: 2000,
    interval: 2000,
    transitionDuration: 600,
    transitionStyle: "soft-crossfade",
  },
  RHYTHM_D: {
    coverDwell: 2000,
    interval: 2000,
    transitionDuration: 600,
    transitionStyle: "soft-crossfade",
  },
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "3d-fluid",
    title: "3D IMMERSIVE EXPERIENCE",
    category: "FRONT-END INTERFACE",
    year: "2026",
    projectType: "Interactive Web / 3D",
    overview:
      "An interactive web experience built to integrate a high-fidelity 3D core within a responsive, modern fluted glass layout.",
    challenge:
      "Integrating heavy 3D scene elements natively on the web often incurs performance overhead, leading to layout stuttering on mobile devices.",
    solution:
      "Optimized the layout lifecycle using a lightweight Spline Viewer instance, combined with custom CSS acceleration for smooth 60FPS fluid experience.",
    myRole:
      "Front-End Implementation, Spline Viewer Integration, and Responsive Layout Optimization.",
    technicalHighlights: [
      "Code-driven visual layout execution",
      "Interactive custom cursor tracking",
    ],
    technology: ["React.js", "Spline Viewer", "Advanced CSS3", "Vite"],
    image: vortexImage,
    gallery: [{ label: "Interactive Scene Controls", image: vortexTert }],
    impact:
      "A tactile, highly interactive web space built from scratch that operates seamlessly across all screens.",
    live: "https://razanazizieh.github.io/vortex/",
    repository: "https://github.com/razanazizieh/vortex",
  },
  {
    id: "bilingual-engine",
    title: "BILINGUAL PORTFOLIO ENGINE",
    category: "FRONT-END / CUSTOM ENGINE",
    year: "2026",
    projectType: "Interactive Web / Localization",
    overview:
      "A bespoke, high-performance portfolio engine built from scratch to replace rigid pre-made templates with custom editorial layouts and dynamic multi-language synchronization.",
    challenge:
      "Relying on off-the-shelf templates restricts layout control and bloats the codebase. The challenge was building an entirely bespoke, integrated system from scratch that merges custom editorial typography with seamless bilingual synchronization.",
    solution:
      "Engineered a lightweight, custom-built system architecture in Vanilla JavaScript, pairing bespoke CSS grid layouts with an in-house translation engine for instant locale swaps without code overhead.",
    myRole:
      "End-to-End System Architecture, Custom Layout & Engineering, and Vanilla JS Translation Engine.",
    technicalHighlights: [
      "100% custom-built architecture (zero template dependencies)",
      "Bespoke Vanilla JavaScript translation engine (EN/DE)",
      "Custom CSS baseline alignment for multi-language editorial typography",
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
      { label: "Integrated Localization Framework", image: bilingualSec },
    ],
    impact:
      "A fully integrated, production-ready portfolio engine built entirely from scratch with uncompromised typography and instant language toggling.",
    live: "https://razanazizieh.github.io/sarah-portfolio/",
    repository: "https://github.com/razanazizieh/sarah-portfolio",
  },
  // {
  //   id: "custom-cms",
  //   title: "CUSTOM REACT CMS & DASHBOARD",
  //   category: "CODE",
  //   year: "2025",
  //   projectType: "Coding Only",
  //   overview:
  //     "A React-based administration application featuring a complete data dashboard designed to handle project entries via API data routing.",
  //   challenge:
  //     "Structuring a real-time administrative console with fluid database state mutations frequently leads to visual layout flickering, excessive API re-fetching, and desynchronized local states.",
  //   solution:
  //     "Developed a robust client-side caching wrapper with lazy API fetch handlers, ensuring CRUD mutations are applied to local states instantaneously before the server completes validation, creating a fluid, uninterrupted user workflow.",
  //   myRole:
  //     "Programmed the core CRUD functionalities, wired the live API data communication, and built custom interface pages from scratch to complete the system's aesthetic consistency.",
  //   technicalHighlights: [
  //     "Direct database state modifications",
  //     "Clean API data fetching",
  //     "Entirely custom dashboard component layouts",
  //   ],
  //   technology: ["React.js", "Rest API", "CRUD Logic"],
  //   image: articulaImage,
  //   images: [articulaImage, articulaSec],
  //   rhythm: "RHYTHM_C",
  //   gallery: [
  //     { label: "Custom CMS Interface", image: articulaImage },
  //     { label: "Dynamic Dashboard Responsive View", image: articulaSec },
  //   ],
  //   impact:
  //     "A fast, functional administrative data console rendering seamless live state updates with absolute visual unity.",
  //   live: "https://react-cms-dashboard.designstudio.io",
  //   repository: "https://github.com/razanazizieh/react-cms-dashboard",
  //   technicalSpecifications: [
  //     {
  //       parameter: "Optimistic State Latency",
  //       specification: "Instant local commit with rollback snapshot",
  //       metric: "< 14ms commit",
  //       standard: "ACID Client Reliability",
  //     },
  //     {
  //       parameter: "Cache Synchronization",
  //       specification: "Stale-While-Revalidate event pipeline",
  //       metric: "88% call reduction",
  //       standard: "HTTP RFC 5861",
  //     },
  //     {
  //       parameter: "Schema Validation",
  //       specification: "Type-safe client-side payload evaluation",
  //       metric: "< 5ms eval time",
  //       standard: "TypeScript Strict Mode",
  //     },
  //     {
  //       parameter: "Layout Shift Prevention",
  //       specification: "Skeleton state geometry preservation",
  //       metric: "0.00 CLS",
  //       standard: "Google Core Web Vitals",
  //     },
  //   ],
  //   faq: [
  //     {
  //       question:
  //         "How does optimistic client-side caching prevent layout flickering in the CMS?",
  //       answer:
  //         "Mutations are applied to local React state immediately with snapshot checkpoints, updating the UI before network validation completes and seamlessly rolling back if server rejection occurs.",
  //     },
  //     {
  //       question:
  //         "How does lazy API route pre-fetching reduce data retrieval latency?",
  //       answer:
  //         "Route-level observers trigger asynchronous background pre-fetches when navigation controls enter viewport proximity, reducing perceived data latency to under 15ms.",
  //     },
  //   ],
  // },
  // {
  //   id: "dwello",
  //   title: "DWELLO / REAL ESTATE LANDING PAGE",
  //   category: "UI",
  //   year: "2025",
  //   projectType: "Frontend Implementation",
  //   overview:
  //     "A modern real estate landing page developed to present structured property listings through high-fidelity interactive interface logic.",
  //   challenge:
  //     "Presenting multiple heavy image mockups in responsive gallery grids without causing slow initial page paint times or degraded layout density on smaller screens.",
  //   solution:
  //     "Structured a touch-responsive lazy-loaded masonry grid combined with dynamic interface transitions, maintaining consistent column spacing and rigid visual alignment across all breakpoints.",
  //   myRole:
  //     "Executed the complete front-end programming and technical building of the landing page layout, establishing responsive grids, search sections, and interactive navigation elements.",
  //   technicalHighlights: [
  //     "Pure semantic front-end execution",
  //     "High-resolution lightbox gallery integration",
  //     "Touch-responsive slider adjustments",
  //   ],
  //   technology: ["HTML5", "CSS3", "Bootstrap 5.3", "Swiper.js", "Fancybox"],
  //   image: dwelloImage,
  //   images: [dwelloImage, dwelloSec],
  //   rhythm: "RHYTHM_D",
  //   gallery: [
  //     { label: "Dwello Desktop Overview", image: dwelloImage },
  //     { label: "Property Grid Responsive Layout", image: dwelloSec },
  //   ],
  //   impact:
  //     "A stable, pixel-perfect frontend page built with rigid modular styling and preparation for dark/light mode logic.",
  //   live: "https://dwello-landing.designstudio.io",
  //   repository: "https://github.com/razanazizieh/dwello-landing",
  //   technicalSpecifications: [
  //     {
  //       parameter: "Largest Contentful Paint",
  //       specification: "Priority WebP decoding & responsive srcset",
  //       metric: "0.68s LCP",
  //       standard: "Core Web Vitals Fast",
  //     },
  //     {
  //       parameter: "Grid Layout Reflow",
  //       specification: "CSS Grid track sizing with aspect-ratio",
  //       metric: "0ms reflow stall",
  //       standard: "W3C CSS Grid Level 2",
  //     },
  //     {
  //       parameter: "Touch Drag Latency",
  //       specification: "Hardware-accelerated touch-action CSS",
  //       metric: "< 8ms response",
  //       standard: "Mobile Touch Interactivity",
  //     },
  //     {
  //       parameter: "Accessibility Contrast",
  //       specification: "Strict WCAG AA typographic contrast",
  //       metric: "7.2:1 contrast ratio",
  //       standard: "WCAG 2.1 Level AA",
  //     },
  //   ],
  //   faq: [
  //     {
  //       question:
  //         "How does Dwello maintain sub-second Largest Contentful Paint with high-resolution imagery?",
  //       answer:
  //         "Image assets use priority srcset attributes, responsive WebP compression, and asynchronous decoding attributes, prioritizing above-the-fold hero rendering in under 700ms.",
  //     },
  //     {
  //       question:
  //         "How are property grid listings stabilized across varying viewport densities?",
  //       answer:
  //         "The responsive grid is governed by intrinsic CSS Grid track sizing and CSS aspect-ratio properties, preventing content recalculation during viewport resizing.",
  //     },
  //   ],
  // },
  {
    id: "minimalist-portfolio",
    title: "MINIMALIST CANVAS PORTFOLIO",
    category: "FRONT-END / INTERACTIVE",
    year: "2025",
    projectType: "Interactive Web / Playground",
    overview:
      "A minimalist personal showcase built using Vanilla JavaScript to experiment with custom cursor mechanics and light visual canvas effects.",
    challenge:
      "The primary focus was creating a fluid, interactive colored cursor that leaves a smooth trailing particle effect without cluttering the screen or impacting browser performance.",
    solution:
      "Scripted a lightweight canvas-based cursor trail using Vanilla JavaScript, dynamically rendering color particles following pointer movements with auto-fading opacity.",
    myRole:
      "Concept Design, Vanilla JavaScript Development, and Custom Cursor Effects.",
    technicalHighlights: [
      "Custom interactive colored cursor trail",
      "Lightweight Vanilla JavaScript implementation",
      "Clean, minimalist responsive layout",
    ],
    technology: ["HTML5 Canvas", "CSS3", "Vanilla JavaScript", "GitHub Pages"],
    image: razanLegacyImage,
    images: [razanLegacyImage, razanSecImage],
    rhythm: "RHYTHM_B",
    gallery: [
      { label: "Minimalist Core Presentation", image: razanLegacyImage },
      { label: "Cursor Effect Detail", image: razanSecImage },
    ],
    impact:
      "A simple and engaging creative showcase highlighting interactive browser scripting through a custom cursor trail.",
    live: "https://razanazizieh.github.io/portfoli0/",
    repository: "https://github.com/razanazizieh/portfoli0",
  },
  {
    id: "brutalist-architecture",
    title: "BRUTALIST INTERFACE ARCHITECTURE",
    category: "UI / AI CONCEPT",
    year: "2026",
    projectType: "Interface & AI Exploration",
    overview:
      "A full-page visual interface study created using Google AI Studio, exploring editorial brutalist grid structures, high-contrast typography hierarchy, and dynamic spatial composition.",
    challenge:
      "Leveraging AI visual tools to generate a cohesive, typography-focused layout that maintains structural hierarchy and visual balance without traditional design software.",
    solution:
      "Utilized targeted visual prompts in Google AI Studio to explore brutalist grid options, typography arrangements, and whitespace distribution.",
    myRole: "Visual Direction, AI Tool Experimentation, and Layout Curation.",
    technicalHighlights: [
      "AI-assisted brutalist grid layout exploration",
      "High-contrast typographic hierarchy direction",
      "Visual iteration and structural curation",
    ],
    technology: ["Google AI Studio", "UI/UX Visual Concept"],
    image: specimenImage,
    gallery: [
      { label: "AI-Generated Grid Layout Concept", image: specimenImage },
      { label: "High-Contrast Visual Composition", image: specimenSec },
    ],
    impact:
      "A refined visual concept demonstrating how AI tools can be guided to explore disciplined brutalist layouts and modern editorial aesthetics.",
  },
];

export const PROFILE_NARRATIVE = {
  aboutTitle:
    "Interfaces built with rigorous structural logic and high-performance physics.",
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