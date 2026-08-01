/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../types';
import { MOTION_CURVE_PREMIUM, motionRoles, VIEWPORT_ONCE_CONFIG } from '../utils/motion';
import { PROJECTS_DATA } from '../data';
import PremiumImage from './PremiumImage';

// ==========================================
// • TYPE A: LIVE INTERACTIVE COMPONENTS
// ==========================================

const FluidInteractionCanvas = () => {
  const project = PROJECTS_DATA.find(p => p.id === '3d-fluid');

  return (
    <div className="w-full relative bg-transparent overflow-hidden group">
      {project?.image && (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-auto max-h-full object-contain object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.015]"
          referrerPolicy="no-referrer"
        />
      )}
      <div className="absolute bottom-4 right-4 bg-black/80 dark:bg-black/90 text-white/70 font-mono text-[9px] tracking-widest uppercase px-2 py-1 select-none border border-white/10">
        VISUAL SPECIMEN PREVIEW
      </div>
    </div>
  );
};

const BilingualInteractionWidget = () => {
  const [lang, setLang] = React.useState<'EN' | 'DE'>('EN');

  const translations = {
    EN: {
      heading: "Bilingual Portfolio Engine",
      sub: "A pristine high-fidelity localized architecture designed for international design engineers.",
      sample: "Design engineering is the synthesis of systematic code and aesthetic restraint."
    },
    DE: {
      heading: "Zweisprachige Portfolio-Engine",
      sub: "Eine makellose, hochpräzise lokalisierte Architektur für internationale Design-Ingenieure.",
      sample: "Design-Engineering ist die Synthese aus systematischem Code und ästhetischer Zurückhaltung."
    }
  };

  return (
    <div className="w-full p-6 sm:p-8 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800/40 font-sans flex flex-col gap-6 relative select-none">
      <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800/50 pb-4">
        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">LIVE LOCALIZATION GATEWAY</span>
        <div className="flex bg-neutral-200 dark:bg-neutral-800 p-0.5 rounded-none border border-neutral-300 dark:border-neutral-700/50">
          <button
            onClick={() => setLang('EN')}
            className={`px-3 py-1 font-mono text-[10px] tracking-wider uppercase transition-all duration-200 ${lang === 'EN' ? 'bg-black text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'}`}
          >
            EN
          </button>
          <button
            onClick={() => setLang('DE')}
            className={`px-3 py-1 font-mono text-[10px] tracking-wider uppercase transition-all duration-200 ${lang === 'DE' ? 'bg-black text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'}`}
          >
            DE
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 min-h-[140px] justify-center text-left">
        <motion.h3
          key={`heading-${lang}`}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50"
        >
          {translations[lang].heading}
        </motion.h3>
        <motion.p
          key={`sub-${lang}`}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }}
          className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400"
        >
          {translations[lang].sub}
        </motion.p>

        <div className="mt-4 p-4 border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-950/40 rounded-none">
          <span className="font-mono text-[9px] tracking-widest text-zinc-500 dark:text-zinc-400 block mb-2 uppercase">SYNCHRONIZED TRANSCRIPTION SPECIMEN</span>
          <p className="text-sm italic font-serif text-neutral-800 dark:text-neutral-200">
            "{translations[lang].sample}"
          </p>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 bg-black/80 dark:bg-black/90 text-white/70 font-mono text-[9px] tracking-widest uppercase px-2 py-1 border border-white/10">
        SUB-CENTIMILLISECOND STATE SYNC
      </div>
    </div>
  );
};

const MinimalistInteractionWidget = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [gravity, setGravity] = React.useState<number>(0.1);
  const [particleCountState, setParticleCountState] = React.useState<number>(40);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = 600;
    let height = canvas.height = 300;

    const resize = () => {
      if (containerRef.current) {
        width = canvas.width = containerRef.current.clientWidth;
        height = canvas.height = containerRef.current.clientHeight || 300;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      hue: number;
    }

    const nodes: Node[] = [];

    const initNodes = (count: number) => {
      nodes.length = 0;
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * (height - 50) + 10,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          radius: Math.random() * 4 + 2,
          hue: Math.random() * 60 + 190
        });
      }
    };

    initNodes(particleCountState);

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      nodes.forEach(n => {
        const dx = n.x - clickX;
        const dy = n.y - clickY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const pushForce = ((150 - dist) / 150) * 8;
          n.vx += (dx / dist) * pushForce;
          n.vy += (dy / dist) * pushForce;
        }
      });
    };

    canvas.addEventListener('click', handleCanvasClick);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark');

      nodes.forEach(n => {
        n.vy += gravity;
        n.x += n.vx;
        n.y += n.vy;

        n.vx *= 0.99;
        n.vy *= 0.99;

        if (n.x < n.radius) {
          n.x = n.radius;
          n.vx *= -0.8;
        } else if (n.x > width - n.radius) {
          n.x = width - n.radius;
          n.vx *= -0.8;
        }

        if (n.y < n.radius) {
          n.y = n.radius;
          n.vy *= -0.8;
        } else if (n.y > height - n.radius) {
          n.y = height - n.radius;
          n.vy *= -0.7;
          n.vx *= 0.9;
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${n.hue}, 80%, ${isDark ? '60%' : '40%'}, 0.85)`;
        ctx.fill();

        nodes.forEach(n2 => {
          if (n === n2) return;
          const dx = n.x - n2.x;
          const dy = n.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = isDark ? `hsla(${n.hue}, 80%, 60%, ${(0.1 * (60 - dist)) / 60})` : `hsla(${n.hue}, 80%, 40%, ${(0.12 * (60 - dist)) / 60})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gravity, particleCountState]);

  return (
    <div ref={containerRef} className="w-full p-6 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800/40 font-sans flex flex-col gap-4 relative select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800/50 pb-4">
        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">ORBITAL VECTOR SANDBOX — CLICK CANVAS TO DISRUPT</span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] text-zinc-500">GRAVITY:</span>
            <input
              type="range"
              min="0"
              max="0.5"
              step="0.05"
              value={gravity}
              onChange={(e) => setGravity(parseFloat(e.target.value))}
              className="w-16 h-1 bg-neutral-200 dark:bg-neutral-800 accent-neutral-900 dark:accent-neutral-100 cursor-ew-resize appearance-none"
              aria-label="Gravity slider"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] text-zinc-500">COUNT:</span>
            <input
              type="range"
              min="10"
              max="70"
              step="10"
              value={particleCountState}
              onChange={(e) => setParticleCountState(parseInt(e.target.value))}
              className="w-16 h-1 bg-neutral-200 dark:bg-neutral-800 accent-neutral-900 dark:accent-neutral-100 cursor-ew-resize appearance-none"
              aria-label="Particle count slider"
            />
          </div>
        </div>
      </div>

      <div className="w-full h-[220px] bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-none overflow-hidden relative">
        <canvas ref={canvasRef} className="block w-full h-full cursor-crosshair" />
      </div>

      <div className="absolute bottom-10 right-10 bg-black/80 dark:bg-black/90 text-white/70 font-mono text-[9px] tracking-widest uppercase px-2 py-1 border border-white/10 pointer-events-none">
        REAL-TIME PHYSICS ENGINE
      </div>
    </div>
  );
};

const HeroArchitectureWidget = () => {
  const [tracking, setTracking] = React.useState<number>(4);
  const [weight, setWeight] = React.useState<number>(500);
  const [density, setDensity] = React.useState<'dense' | 'comfortable' | 'loose'>('comfortable');
  const [activePreset, setActivePreset] = React.useState<number>(1);

  const applyPreset = (id: number) => {
    setActivePreset(id);
    if (id === 1) {
      setTracking(4);
      setWeight(500);
      setDensity('comfortable');
    } else if (id === 2) {
      setTracking(12);
      setWeight(300);
      setDensity('loose');
    } else if (id === 3) {
      setTracking(0);
      setWeight(800);
      setDensity('dense');
    }
  };

  return (
    <div className="w-full p-6 sm:p-8 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800/40 font-sans flex flex-col gap-6 relative select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800/50 pb-4">
        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">TYPOGRAPHIC SYSTEM TESTING DECK</span>

        <div className="flex bg-neutral-200 dark:bg-neutral-800 p-0.5 rounded-none border border-neutral-300 dark:border-neutral-700/50">
          {[1, 2, 3].map(presetId => (
            <button
              key={presetId}
              onClick={() => applyPreset(presetId)}
              className={`px-3 py-1 font-mono text-[9px] tracking-wider uppercase transition-all duration-200 ${activePreset === presetId ? 'bg-black text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'}`}
            >
              P-0{presetId}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase flex justify-between">
            <span>LETTER SPACING:</span>
            <span className="font-semibold text-[var(--text-color)]">{tracking}PX</span>
          </span>
          <input
            type="range"
            min="-2"
            max="18"
            step="1"
            value={tracking}
            onChange={(e) => {
              setTracking(parseInt(e.target.value));
              setActivePreset(0);
            }}
            className="w-full h-1 bg-neutral-200 dark:bg-neutral-800 accent-neutral-900 dark:accent-neutral-100 cursor-ew-resize appearance-none"
            aria-label="Letter spacing slider"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase flex justify-between">
            <span>FONT WEIGHT:</span>
            <span className="font-semibold text-[var(--text-color)]">{weight}</span>
          </span>
          <input
            type="range"
            min="300"
            max="900"
            step="100"
            value={weight}
            onChange={(e) => {
              setWeight(parseInt(e.target.value));
              setActivePreset(0);
            }}
            className="w-full h-1 bg-neutral-200 dark:bg-neutral-800 accent-neutral-900 dark:accent-neutral-100 cursor-ew-resize appearance-none"
            aria-label="Font weight slider"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase">GRID DENSITY:</span>
          <div className="flex bg-neutral-200 dark:bg-neutral-800 p-0.5 rounded-none border border-neutral-300 dark:border-neutral-700/50 w-full">
            {(['dense', 'comfortable', 'loose'] as const).map(d => (
              <button
                key={d}
                onClick={() => {
                  setDensity(d);
                  setActivePreset(0);
                }}
                className={`flex-1 px-2 py-1 font-mono text-[8px] tracking-wider uppercase transition-all duration-200 ${density === d ? 'bg-black text-white dark:bg-white dark:text-black font-semibold' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full min-h-[160px] bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-none p-6 flex flex-col justify-between transition-all duration-300 select-all relative overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-3 pointer-events-none opacity-[0.03]">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="border-r border-b border-white" />
          ))}
        </div>

        <div className="z-10 flex flex-col gap-4 text-left">
          <span className="font-mono text-[9px] tracking-widest text-zinc-400">RASTER REVEAL GRID v.01</span>
          <h4
            style={{
              letterSpacing: `${tracking}px`,
              fontWeight: weight,
              lineHeight: density === 'dense' ? '1.1' : density === 'comfortable' ? '1.4' : '1.7'
            }}
            className="text-2xl sm:text-3xl tracking-tight transition-all duration-150 uppercase font-sans text-neutral-950 dark:text-neutral-50"
          >
            INTERACTIVE SYSTEM COMPONENT
          </h4>
        </div>

        <div className="z-10 flex items-center justify-between font-mono text-[8px] tracking-widest text-zinc-500 mt-4 uppercase">
          <span>COORDINATES: X.9482 / Y.0294</span>
          <span>SYSTEM.LIVE_FEED.READY</span>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 bg-black/80 dark:bg-black/90 text-white/70 font-mono text-[9px] tracking-widest uppercase px-2 py-1 border border-white/10 pointer-events-none">
        AESTHETIC SHIFT ENGINE v.26
      </div>
    </div>
  );
};

interface LiveInteractiveContainerProps {
  projectId: string;
}

const LiveInteractiveContainer = ({ projectId }: LiveInteractiveContainerProps) => {
  if (projectId === '3d-fluid') {
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-3 mt-8">
      <div className="rounded-none overflow-hidden border border-neutral-200 dark:border-neutral-800/40">
        {projectId === 'bilingual-engine' && <BilingualInteractionWidget />}
        {projectId === 'minimalist-portfolio' && <MinimalistInteractionWidget />}
        {projectId === 'interaction-specimen' && <HeroArchitectureWidget />}
      </div>
      <div className="flex items-center pl-1 pr-1 font-mono text-[11px] tracking-widest uppercase text-zinc-500 dark:text-zinc-400">
        FIG. 01 — LIVE FULLY-INTERACTIVE SPECIMEN PREVIEW (60FPS CAPABLE)
      </div>
    </div>
  );
};

interface ProjectCaseStudyProps {
  project: Project;
  activeFilter?: 'ALL' | 'FULL-STACK' | 'CODE' | 'UI';
  onClose: () => void;
}

export default function ProjectCaseStudy({ project, activeFilter = 'ALL', onClose }: ProjectCaseStudyProps) {
  const shouldReduceMotion = useReducedMotion();
  const navigate = useNavigate();

  // Conditional check to identify projects categorized as "code-centric" or "back-end"
  const isCodeCentric = project.category === 'CODE';

  // Collect all images safely for lightbox viewing, handling both string paths and object configurations
  const allImages = React.useMemo(() => {
    const list: { image: string; label: string }[] = [];
    if (project.image) {
      list.push({ image: project.image, label: "Featured Hero Specimen" });
    }/*
    if (project.gallery) {
      project.gallery.forEach((g, idx) => {
        if (!g) return;
        const imgUrl = typeof g === 'string' ? g : g.image;
        const imgLabel = typeof g === 'string' ? `Specimen View ${idx + 1}` : g.label;

        if (imgUrl && imgUrl !== project.image) {
          list.push({ image: imgUrl, label: imgLabel });
        }
      });
    }*/
    return list;
  }, [project]);

  // Filter projects based on active matrix category for internal cycling
  const filteredNavProjects = React.useMemo(() => {
    if (activeFilter === 'ALL') return PROJECTS_DATA;
    return PROJECTS_DATA.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  // Determine current active navigation parameters
  const activeIdx = React.useMemo(() => {
    const idx = filteredNavProjects.findIndex(p => p.id === project.id);
    if (idx !== -1) return idx;
    return PROJECTS_DATA.findIndex(p => p.id === project.id);
  }, [filteredNavProjects, project.id]);

  const activeList = React.useMemo(() => {
    const idx = filteredNavProjects.findIndex(p => p.id === project.id);
    if (idx !== -1) return filteredNavProjects;
    return PROJECTS_DATA;
  }, [filteredNavProjects, project.id]);

  // Cycle strictly and internally within activeFiltered list using standard mathematical modulo
  const prevProject = React.useMemo(() => {
    const len = activeList.length;
    if (len === 0) return project;
    const prevIdx = (activeIdx - 1 + len) % len;
    return activeList[prevIdx];
  }, [activeList, activeIdx, project]);

  const nextProject = React.useMemo(() => {
    const len = activeList.length;
    if (len === 0) return project;
    const nextIdx = (activeIdx + 1) % len;
    return activeList[nextIdx];
  }, [activeList, activeIdx, project]);

  const lastInteractionTime = useRef(0);

  const handlePrevClick = () => {
    const now = Date.now();
    if (now - lastInteractionTime.current < 300) return;
    lastInteractionTime.current = now;

    window.scrollTo(0, 0);
    navigate(`/project/${prevProject.id}`);
  };

  const handleNextClick = () => {
    const now = Date.now();
    if (now - lastInteractionTime.current < 300) return;
    lastInteractionTime.current = now;

    window.scrollTo(0, 0);
    navigate(`/project/${nextProject.id}`);
  };

  // Scroll to top on mount or when project changes and manage dynamic document titles
  useEffect(() => {
    window.scrollTo(0, 0);
    const originalTitle = document.title;
    document.title = `${project.title.toUpperCase()} — RAZAN AZIZIEH`;
    return () => {
      document.title = originalTitle;
    };
  }, [project.id, project.title]);

  // Keyboard navigation mapping
  useEffect(() => {
    const handleKeyDownGlobal = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        window.scrollTo(0, 0);
        navigate(`/project/${prevProject.id}`);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        window.scrollTo(0, 0);
        navigate(`/project/${nextProject.id}`);
      }
    };
    window.addEventListener('keydown', handleKeyDownGlobal);
    return () => {
      window.removeEventListener('keydown', handleKeyDownGlobal);
    };
  }, [onClose, navigate, prevProject.id, nextProject.id]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: MOTION_CURVE_PREMIUM }}
      className="relative w-full min-h-screen bg-[var(--bg-color)] select-text focus:outline-none flex flex-col overflow-x-hidden"
    >
      {/* Editorial Page Container */}
      <div className="w-full max-w-4xl mx-auto px-6 sm:px-12 md:px-16 pb-32 pt-24 sm:pt-32 flex-1 flex flex-col gap-16 md:gap-24">

        {/* • HERO HEADER SECTION */}
        <section className="flex flex-col gap-8 text-left">
          <motion.div
            variants={motionRoles.metaLabel(0.05)}
            initial="hidden"
            animate="visible"
            className="typo-mono-label text-[var(--text-dim)] tracking-[0.2em] text-[11px] uppercase flex items-center"
          >
            <span>{project.category}</span>
            <span className="mx-2">|</span>
            <span>{project.year}</span>
          </motion.div>

          <div className="flex flex-col gap-4">
            <motion.h1
              id="case-study-title"
              variants={motionRoles.largeTypography(0.12, shouldReduceMotion)}
              initial="hidden"
              animate="visible"
              className="typo-display-md text-[var(--text-color)]"
            >
              {project.title}
            </motion.h1>

            {project.subtitle && (
              <motion.p
                variants={motionRoles.supportingText(0.18, shouldReduceMotion)}
                initial="hidden"
                animate="visible"
                className="typo-mono-sub mt-2 max-w-2xl leading-relaxed font-normal text-[var(--text-dim)]"
              >
                {project.subtitle}
              </motion.p>
            )}

            {(project.live || (isCodeCentric && project.repository)) && (
              <motion.div
                variants={motionRoles.interactiveButton(0.24)}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-6 flex-wrap mt-6"
              >
                {project.live && (
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="typo-mono-btn text-[var(--text-dim)] hover:text-[var(--text-color)] opacity-50 hover:opacity-100 transition-all duration-300 ease-out focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-color)] focus-visible:px-2 focus-visible:py-1 rounded font-semibold select-none min-h-[44px] px-2 py-1 -mx-2 -my-1 cursor-pointer flex items-center gap-1.5"
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.3, ease: MOTION_CURVE_PREMIUM }}
                  >
                    VIEW LIVE SITE
                  </motion.a>
                )}

                {isCodeCentric && project.repository && (
                  <motion.a
                    href={project.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="typo-mono-btn text-[var(--text-dim)] hover:text-[var(--text-color)] opacity-50 hover:opacity-100 transition-all duration-300 ease-out focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-color)] focus-visible:px-2 focus-visible:py-1 rounded font-semibold select-none min-h-[44px] px-2 py-1 -mx-2 -my-1 cursor-pointer flex items-center gap-1.5"
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.3, ease: MOTION_CURVE_PREMIUM }}
                  >
                    VIEW SOURCE CODE
                  </motion.a>
                )}
              </motion.div>
            )}
          </div>

          {/* Main Visual Showcase: Vertical Image Stack */}
          {!isCodeCentric && allImages.length > 0 && (
            <div className="w-full flex flex-col gap-20 sm:gap-28 my-10 sm:my-14">
              {allImages.map((item, idx) => (
                <motion.figure
                  key={idx}
                  variants={motionRoles.editorialImage(0, shouldReduceMotion)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT_ONCE_CONFIG}
                  className="w-full flex flex-col gap-4 group/editorial rounded-none cursor-default"
                >
                  <div className="w-full rounded-none overflow-hidden border-none outline-none shadow-none bg-transparent">
                    <PremiumImage
                      src={item.image}
                      alt={`${project.title} — ${item.label}`}
                      borderNone={true}
                      className="rounded-none transition-transform duration-700 ease-out group-hover/editorial:scale-[1.012] object-contain object-top w-full h-auto"
                    />
                  </div>
                  <figcaption className="flex items-center mt-2 px-0 font-mono text-[10px] sm:text-[11px] tracking-widest uppercase text-[var(--text-dim)] opacity-60">
                    FIG. {String(idx + 1).padStart(2, '0')} — {item.label.toUpperCase()}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          )}

        </section>

        {/* • OVERVIEW */}
        {project.overview && (
          <motion.section
            variants={{
              hidden: {
                opacity: 0,
                y: shouldReduceMotion ? 0 : 16,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: MOTION_CURVE_PREMIUM }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col gap-5 text-left"
          >
            <h2 className="typo-mono-label">
              Overview
            </h2>
            <p className="typo-body-lead max-w-2xl text-[var(--text-color)] leading-[1.75]">
              {project.overview}
            </p>
          </motion.section>
        )}

        {/* • CHALLENGE */}
        {project.challenge && (
          <motion.section
            variants={{
              hidden: {
                opacity: 0,
                y: shouldReduceMotion ? 0 : 16,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: MOTION_CURVE_PREMIUM }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col gap-5 text-left"
          >
            <h2 className="typo-mono-label">
              Challenge
            </h2>
            <p className="typo-body-regular max-w-2xl text-[var(--text-dim-high)] leading-[1.75]">
              {project.challenge}
            </p>
          </motion.section>
        )}

        {/* • SOLUTION */}
        {project.solution && (
          <motion.section
            variants={{
              hidden: {
                opacity: 0,
                y: shouldReduceMotion ? 0 : 16,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: MOTION_CURVE_PREMIUM }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col gap-5 text-left"
          >
            <h2 className="typo-mono-label">
              Solution
            </h2>
            <p className="typo-body-lead max-w-2xl text-[var(--text-color)] leading-[1.75]">
              {project.solution}
            </p>
          </motion.section>
        )}

        {/* • MY ROLE */}
        {project.myRole && (
          <motion.section
            variants={{
              hidden: {
                opacity: 0,
                y: shouldReduceMotion ? 0 : 16,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: MOTION_CURVE_PREMIUM }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col gap-5 text-left"
          >
            <h2 className="typo-mono-label">
              My Role
            </h2>
            <p className="typo-body-regular max-w-2xl text-[var(--text-dim-high)] leading-[1.75]">
              {project.myRole}
            </p>
          </motion.section>
        )}

        {/* • TECHNICAL HIGHLIGHTS */}
        {project.technicalHighlights && project.technicalHighlights.length > 0 && (
          <motion.section
            variants={{
              hidden: {
                opacity: 0,
                y: shouldReduceMotion ? 0 : 16,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: MOTION_CURVE_PREMIUM }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col gap-5 text-left"
          >
            <h2 className="typo-mono-label">
              Technical Highlights
            </h2>
            <ul className="flex flex-col gap-3.5 max-w-2xl pl-5 list-disc text-[var(--text-dim-high)]">
              {project.technicalHighlights.map((highlight, idx) => (
                <li key={idx} className="typo-body-regular leading-[1.7]">
                  {highlight}
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* • TECHNOLOGY */}
        {project.technology && project.technology.length > 0 && (
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col gap-5 text-left"
          >
            <h2 className="typo-mono-label">
              Technology
            </h2>
            <div className="flex flex-wrap gap-x-6 gap-y-3 max-w-2xl">
              {project.technology.map((tech, idx) => (
                <motion.span
                  key={idx}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: shouldReduceMotion ? 0 : 12,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.4, ease: MOTION_CURVE_PREMIUM, delay: idx * 0.03 }
                    }
                  }}
                  className="typo-mono-sub font-light flex items-center text-[var(--text-color)]"
                >
                  {tech}
                  {idx < project.technology.length - 1 && <span className="ml-6 text-[var(--text-dim)] opacity-40 font-normal">·</span>}
                </motion.span>
              ))}
            </div>
          </motion.section>
        )}

        {/* • IMPACT */}
        {project.impact && (
          <motion.section
            variants={{
              hidden: {
                opacity: 0,
                y: shouldReduceMotion ? 0 : 16,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: MOTION_CURVE_PREMIUM }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col gap-5 text-left"
          >
            <h2 className="typo-mono-label">
              Impact
            </h2>
            <p className="typo-body-lead max-w-2xl text-[var(--text-color)] leading-[1.75]">
              {project.impact}
            </p>
          </motion.section>
        )}

        {/* Editorial Bottom Navigation */}
        <div className="mt-24 sm:mt-32 select-none border-t border-[var(--border-color)]/10 pt-16">
          <div className="flex items-center justify-between gap-6 w-full">
            {/* Previous Project Link */}
            <motion.button
              onPointerDown={(e) => {
                if (e.button === 0) {
                  e.preventDefault();
                  handlePrevClick();
                }
              }}
              onClick={(e) => {
                if (e.clientX === 0 && e.clientY === 0) {
                  handlePrevClick();
                }
              }}
              whileHover={{ x: -3 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="typo-mono-btn font-medium text-[var(--text-dim)] hover:text-[var(--text-color)] opacity-50 hover:opacity-100 transition-all duration-300 ease-out focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-color)] uppercase cursor-pointer flex items-center gap-1 bg-transparent border-none outline-none p-0"
            >
              <span>← PREVIOUS PROJECT</span>
            </motion.button>
            
            {/* Next Project Link */}
            <motion.button
              onPointerDown={(e) => {
                if (e.button === 0) {
                  e.preventDefault();
                  handleNextClick();
                }
              }}
              onClick={(e) => {
                if (e.clientX === 0 && e.clientY === 0) {
                  handleNextClick();
                }
              }}
              whileHover={{ x: 3 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="typo-mono-btn font-medium text-[var(--text-dim)] hover:text-[var(--text-color)] opacity-50 hover:opacity-100 transition-all duration-300 ease-out focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-color)] uppercase cursor-pointer flex items-center gap-1 bg-transparent border-none outline-none p-0"
            >
              <span>NEXT PROJECT →</span>
            </motion.button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
