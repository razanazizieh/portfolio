# Razan Azizieh — Portfolio

Personal portfolio and technical case studies of Razan Azizieh, Front-end Developer.

## Overview
A focused, editorial portfolio highlighting modern web applications, interactive projects, and front-end development. The interface emphasizes typographic tension, fluid kinetic responsiveness, strict monochrome values, and accessible structure.

## Stack
- Framework: React 19, TypeScript
- Bundler & Tooling: Vite 6, Tailwind CSS 4
- Animation & Kinetics: Motion (Framer Motion), Lenis (smooth scroll), GSAP (ticker synchronization)
- Routing & Head: React Router 7, React Helmet Async
- Typography: Self-hosted Inter Tight Variable and Instrument Serif via Fontsource

## Scripts
- **Start local development server:** `npm run dev`
- **Regenerate icon files from public/favicon.svg:** `npm run icons`
- **Regenerate favicon SVG from font sources and all icon variants:** `npm run favicon`
- **Typecheck and lint codebase:** `npm run typecheck` / `npm run lint`
- **Format check:** `npm run format`
- **Placeholder and copy quality scan:** `npm run check`
- **Security and secret pattern scanner:** `npm run check:secrets`
- **Production build:** `npm run build`
- **Comprehensive verification pipeline:** `npm run verify`

## Folder Structure
```text
├── public/               # Static assets, favicons, project media, robots.txt, sitemap.xml
├── scripts/              # Verification and security audit scripts
├── src/
│   ├── components/       # Reusable UI primitives
│   ├── sections/         # Home landing panels
│   ├── pages/            # Top-level view routes
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Core libraries and utility singletons
│   ├── data/             # Structured case studies and journal markdown blocks
│   ├── content/          # Global site metadata, biography, navigation, and contact configuration
│   └── styles/           # Design system tokens and global CSS
