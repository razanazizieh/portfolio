import type Lenis from 'lenis';

export function setLenis(instance: Lenis | null) {
  if (typeof window !== 'undefined') {
    (window as any).__lenisInstance = instance;
  }
}

export function getLenis(): Lenis | null {
  if (typeof window !== 'undefined') {
    return (window as any).__lenisInstance || null;
  }
  return null;
}
