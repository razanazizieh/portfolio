/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Resolves a public asset path against Vite's base URL.
 * Handles running under subpaths like /portfolio/ on GitHub Pages.
 */
export function asset(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  const base = import.meta.env.BASE_URL || "/";
  const clean = path.replace(/^\/+/, "");
  if (base !== "/" && path.startsWith(base)) {
    return path;
  }
  return base.endsWith("/") ? base + clean : base + "/" + clean;
}

export default asset;
