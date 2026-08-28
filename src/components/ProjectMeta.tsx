import React, { memo } from 'react';

interface ProjectMetaProps {
  category: string;
  year: string;
  className?: string;
}

export const ProjectMeta = memo<ProjectMetaProps>(({ category, year, className = '' }) => (
  <div className={`flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] leading-none text-neutral-500 dark:text-neutral-400 select-text ${className}`}>
    <span className="text-neutral-950 dark:text-neutral-50 font-medium">{category}</span>
    <span className="opacity-40">/</span>
    <span>{year}</span>
  </div>
));

ProjectMeta.displayName = 'ProjectMeta';
