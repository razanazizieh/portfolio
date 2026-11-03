Live site: https://razanazizieh.github.io/portfolio/

# Razan Azizieh — Portfolio

Personal portfolio and technical case studies of Razan Azizieh, Front-end Developer.

## Overview

A focused, editorial portfolio highlighting modern web applications, interactive projects, and front-end development. The interface emphasizes typographic tension, fluid kinetic responsiveness, strict monochrome values, and accessible structure.

## Stack

- **Framework**: React 19, TypeScript
- **Bundler & Tooling**: Vite 6, Tailwind CSS 4
- **Animation & Kinetics**: Motion (Framer Motion), Lenis (smooth scroll), GSAP (ticker synchronization)
- **Routing & Head**: React Router 7, React Helmet Async
- **Typography**: Self-hosted Inter Tight Variable and Instrument Serif via Fontsource

## Scripts

```bash
# Start local development server
npm run dev

# Regenerate icon files from public/favicon.svg
npm run icons

# Regenerate favicon SVG from font sources and all icon variants
npm run favicon

# Typecheck and lint codebase
npm run typecheck
npm run lint

# Format check
npm run format

# Placeholder and copy quality scan
npm run check

# Security and secret pattern scanner
npm run check:secrets

# Production build
npm run build

# Comprehensive verification pipeline (typecheck + lint + check + build + check:secrets)
npm run verify
```

`npm run favicon regenerates all icon files`.

## Folder Structure

```
├── public/               # Static assets, favicons, project media, robots.txt, sitemap.xml
├── scripts/              # Verification and security audit scripts
├── src/
│   ├── components/       # Reusable UI primitives (Nav, Footer, TS, HL, Words, Layout)
│   ├── sections/         # Home landing panels (Hero, Work, Statement, About, Journal, Contact)
│   ├── pages/            # Top-level view routes (ProjectPage, JournalListPage, JournalEntryPage, PrivacyPage, NotFound)
│   ├── hooks/            # Custom React hooks (smooth scroll, reduced motion, reveal engine)
│   ├── lib/              # Core libraries and utility singletons (Lenis instance, scroll logic)
│   ├── data/             # Structured case studies and journal markdown blocks
│   ├── content/          # Global site metadata, biography, navigation, and contact configuration
│   └── styles/           # Design system tokens and global CSS
```

## Where to Edit Content

- **Site copy & metadata**: `src/content/site.ts`
- **Projects & case studies**: `src/data/projects.ts`
- **Journal entries**: `src/data/journal.ts`
- **Project images & video assets**: `public/projects/`

## Deployment

GitHub Pages via GitHub Actions for repository `razanazizieh/portfolio`: Settings, Pages, Source: GitHub Actions.
Live site: https://razanazizieh.github.io/portfolio/
Run `npm run build` to generate the production-ready distribution in `dist/`.

## Font Credits

- **Inter Tight**: Designed by Rasmus Andersson. Licensed under SIL Open Font License (OFL), distributed via `@fontsource-variable/inter-tight`.
- **Instrument Serif**: Designed by Instrument. Licensed under SIL Open Font License (OFL), distributed via `@fontsource/instrument-serif`.

## Process

Developed and designed by Razan Azizieh. Built with AI-assisted development.
