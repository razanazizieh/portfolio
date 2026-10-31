/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Block {
  type: "p" | "h2" | "quote" | "code" | "image";
  text?: string;
  code?: string;
  language?: string;
  src?: string;
  alt?: string;
  caption?: string;
}

export interface Entry {
  slug: string;
  title: string;
  date: string; // ISO date format YYYY-MM-DD
  summary: string;
  readingMinutes: number;
  body: Block[];
}

export const entries: Entry[] = [
{
    slug: 'why-im-learning-the-back-end',
    title: "Why I'm learning the back end",
    date: '2026-10-29',
    readingMinutes: 1,
    summary: 'Starting something new can be surprising. I took my first steps into back-end development, and found a space that truly fits how I think.',
    body: [
      { 
        type: 'p', 
        text: 'I have always been drawn to structure and logic. While my core focus has been on building front-end interfaces, I was naturally curious about what happens on the other side of the system.' 
      },
      { 
        type: 'p', 
        text: 'Recently, I decided to take my very first steps into the back end using NestJS. What began as a small experiment turned out to be genuinely exciting.' 
      },
      { 
        type: 'p', 
        text: 'I found a pattern of thinking and structuring code that just clicked with me—it felt very aligned with my engineering background.' 
      },
      { 
        type: 'p', 
        text: 'I am right at the beginning of this learning path, and I want to share my notes and discoveries here as I keep growing.' 
      }
    ]
  }
];

export function getEntries(): Entry[] {
  return entries;
}

export function getEntryBySlug(slug: string | undefined): Entry | undefined {
  if (!slug) return undefined;
  const list = getEntries();
  return list.find((e) => e.slug === slug.toLowerCase().trim());
}
