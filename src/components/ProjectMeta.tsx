import React, { memo } from 'react';

interface ProjectMetaProps {
  index?: string;
  category: string;
  year: string;
  className?: string;
}

export const ProjectMeta = memo<ProjectMetaProps>(({ index, category, year, className = '' }) => (
  <div data-no-cursor="true" className={`flex items-center gap-2 sm:gap-2.5 font-mono text-xs sm:text-[13px] uppercase tracking-[0.16em] leading-normal text-neutral-500 dark:text-neutral-400 select-text font-normal ${className}`}>
    {index && <span className="font-normal text-neutral-500 dark:text-neutral-400">{index}</span>}
    {index && <span className="opacity-40 select-none">·</span>}
    <span className="font-normal text-neutral-700 dark:text-neutral-300">{category}</span>
    <span className="opacity-40 select-none">·</span>
    <span className="font-normal text-neutral-500 dark:text-neutral-400">{year}</span>
  </div>
));

ProjectMeta.displayName = 'ProjectMeta';
