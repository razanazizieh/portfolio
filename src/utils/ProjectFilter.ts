/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project } from '../types';

export type ProjectFilterCategory = 'ALL' | 'FULL-STACK' | 'CODE' | 'UI';

/**
 * Checks whether a given project satisfies the selected category filter.
 * 
 * Logic inspects the project's category, projectType, role, tech stack, and repository,
 * ensuring robust matching across active and historical portfolio entries.
 */
export const isProjectMatchingFilter = (
  project: Project,
  filter: ProjectFilterCategory
): boolean => {
  if (filter === 'ALL') return true;

  const category = (project.category || '').toUpperCase();
  const projectType = (project.projectType || '').toUpperCase();
  const role = (project.myRole || '').toUpperCase();
  const tech = (project.technology || []).map((t) => t.toUpperCase());

  switch (filter) {
    case 'FULL-STACK':
      return (
        category.includes('FULL-STACK') ||
        projectType.includes('FULL STACK') ||
        category.includes('ENGINE') ||
        role.includes('SYSTEM ARCHITECTURE') ||
        role.includes('END-TO-END') ||
        project.id === 'bilingual-engine' ||
        project.id === '3d-fluid'
      );

    case 'CODE':
      return (
        category.includes('CODE') ||
        category.includes('ENGINE') ||
        category.includes('INTERACTIVE') ||
        projectType.includes('CODING') ||
        projectType.includes('PLAYGROUND') ||
        tech.some((t) => t.includes('JAVASCRIPT') || t.includes('REACT') || t.includes('CANVAS')) ||
        Boolean(project.repository) ||
        project.id === 'minimalist-portfolio' ||
        project.id === 'bilingual-engine' ||
        project.id === '3d-fluid' ||
        project.id === 'custom-cms'
      );

    case 'UI':
      return (
        category.includes('UI') ||
        category.includes('INTERFACE') ||
        projectType.includes('INTERFACE') ||
        projectType.includes('UI/UX') ||
        tech.some((t) => t.includes('UI') || t.includes('FIGMA') || t.includes('STUDIO')) ||
        project.id === 'brutalist-architecture' ||
        project.id === '3d-fluid' ||
        project.id === 'dwello' ||
        project.id === 'interaction-specimen'
      );

    default:
      return true;
  }
};
