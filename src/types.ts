/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TransitionStyle = 'mask-reveal' | 'crop-shift' | 'directional-wipe' | 'soft-crossfade';

export interface ImageRhythmProfile {
  coverDwell: number; // ms to display canonical cover initially (e.g., 4200ms)
  interval: number; // ms to display secondary frames (e.g., 3400ms)
  transitionDuration: number; // ms for the transition between frames (e.g., 900ms)
  transitionStyle: TransitionStyle; // authored transition character
}

export type RhythmPreset = 'RHYTHM_A' | 'RHYTHM_B' | 'RHYTHM_C' | 'RHYTHM_D';

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  year?: string;
  overview?: string;
  myRole?: string;
  technicalHighlights?: string[];
  technology?: string[];
  gallery?: (string | { label: string; image: string })[];
  impact?: string;
  challenge?: string;
  solution?: string;
  image?: string; // URL reference or imported image path
  images?: string[]; // Canonical image array: [cover, secondary, ...]
  secondaryImage?: string; // Secondary project image mockup
  fit?: 'cover' | 'contain'; // Image fitting strategy (defaults to 'cover')
  rhythm?: RhythmPreset | Partial<ImageRhythmProfile>;
  live?: string;
  repository?: string;
  projectType?: string;
  technicalSpecifications?: {
    parameter: string;
    specification: string;
    metric: string;
    standard: string;
  }[];
  faq?: {
    question: string;
    answer: string;
  }[];
}

export interface VisitorMessage {
  id: string;
  name: string;
  message: string;
  createdAt: number; // Unix timestamp
}
