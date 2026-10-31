/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface InlineSegment {
  text: string;
  italic: boolean;
}

/**
 * Splits text containing *...* into an array of { text, italic } segments.
 * Strips literal asterisks and flags the encapsulated segment as italic.
 *
 * Example:
 * parseInline("stay fast and *calm*.") =>
 * [
 *   { text: "stay fast and ", italic: false },
 *   { text: "calm", italic: true },
 *   { text: ".", italic: false }
 * ]
 */
export function parseInline(text: string): InlineSegment[] {
  if (!text || typeof text !== 'string') return [];
  const segments: InlineSegment[] = [];
  const regex = /\*([^*]+)\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        text: text.slice(lastIndex, match.index),
        italic: false,
      });
    }
    segments.push({
      text: match[1],
      italic: true,
    });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    segments.push({
      text: text.slice(lastIndex),
      italic: false,
    });
  }

  return segments;
}

export default parseInline;
