/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { getProjectBySlug, projects } from "../data/projects";
import { asset } from "./asset";

const prefetchedUrls = new Set<string>();
const prefetchedChunks = new Set<string>();

export function prefetchImage(src: string): void {
  if (!src || prefetchedUrls.has(src) || typeof window === "undefined") return;
  prefetchedUrls.add(src);
  const img = new Image();
  img.src = src;
}

export function prefetchRouteChunk(path: string): void {
  const cleanPath = path.replace(/^\/portfolio/, "").replace(/\/$/, "") || "/";

  if (cleanPath.startsWith("/work/")) {
    const slug = cleanPath.replace("/work/", "").split("/")[0];
    if (!prefetchedChunks.has("project")) {
      prefetchedChunks.add("project");
      import("../pages/ProjectPage").catch(() => {});
    }
    const project = getProjectBySlug(slug);
    if (project) {
      if (project.image) prefetchImage(asset(project.image));
      if (project.gallery) {
        project.gallery.forEach((g) => {
          if (g.src) prefetchImage(asset(g.src));
        });
      }
    }
  } else if (cleanPath === "/journal") {
    if (!prefetchedChunks.has("journal-list")) {
      prefetchedChunks.add("journal-list");
      import("../pages/JournalListPage").catch(() => {});
    }
  } else if (cleanPath.startsWith("/journal/")) {
    if (!prefetchedChunks.has("journal-entry")) {
      prefetchedChunks.add("journal-entry");
      import("../pages/JournalEntryPage").catch(() => {});
    }
  } else if (cleanPath === "/privacy") {
    if (!prefetchedChunks.has("privacy")) {
      prefetchedChunks.add("privacy");
      import("../pages/PrivacyPage").catch(() => {});
    }
  }
}

export function prefetchOnInteraction(target: EventTarget | null): void {
  if (!target || !(target instanceof Element)) return;
  const anchor = target.closest("a");
  if (!anchor) return;
  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("http")) {
    return;
  }
  prefetchRouteChunk(href);
}

export function initGlobalPrefetch(): void {
  if (typeof window === "undefined") return;

  const handleInteraction = (e: Event) => {
    prefetchOnInteraction(e.target);
  };

  // Prefetch on pointerenter, focusin, touchstart and pointerdown of any internal link
  document.addEventListener("pointerenter", handleInteraction, { capture: true, passive: true });
  document.addEventListener("focusin", handleInteraction, { capture: true, passive: true });
  document.addEventListener("touchstart", handleInteraction, { capture: true, passive: true });
  document.addEventListener("pointerdown", handleInteraction, { capture: true, passive: true });

  // Prefetch all routes with requestIdleCallback after first load
  const prefetchAllIdle = () => {
    import("../pages/ProjectPage").catch(() => {});
    import("../pages/JournalListPage").catch(() => {});
    import("../pages/JournalEntryPage").catch(() => {});
    import("../pages/PrivacyPage").catch(() => {});

    projects.forEach((p) => {
      if (p.image) prefetchImage(asset(p.image));
      p.gallery?.forEach((g) => {
        if (g.src) prefetchImage(asset(g.src));
      });
    });
  };

  if ("requestIdleCallback" in window) {
    (window as Window).requestIdleCallback(prefetchAllIdle, { timeout: 3000 });
  } else {
    setTimeout(prefetchAllIdle, 1500);
  }
}
