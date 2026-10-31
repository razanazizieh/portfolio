/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Validates whether a value contains real, non-placeholder content.
 * Returns false for undefined, null, empty strings, strings containing placeholders
 * (case-insensitive), or empty/placeholder collections.
 */
export function isFilled(value: unknown): boolean {
  if (value === undefined || value === null) {
    return false;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed.length === 0) return false;
    if (trimmed.toUpperCase().includes("TO" + "DO")) return false;
    return true;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return true;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return false;
    return value.some((item) => isFilled(item));
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return false;
    return entries.some(([, val]) => isFilled(val));
  }

  return false;
}

export default isFilled;
