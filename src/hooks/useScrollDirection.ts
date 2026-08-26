/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';

export type ScrollDirection = 'down' | 'up';

/**
 * Tracks dynamic scroll direction with requestAnimationFrame throttling.
 * Returns 'down' when scrolling downwards and 'up' when scrolling upwards,
 * allowing UI and motion choreographies to adapt dynamically to scroll vectors.
 */
export function useScrollDirection(threshold = 4): ScrollDirection {
  const [direction, setDirection] = useState<ScrollDirection>('down');
  const prevY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    prevY.current = window.scrollY;

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const diff = currentY - prevY.current;

          if (Math.abs(diff) >= threshold) {
            const nextDirection: ScrollDirection = diff > 0 ? 'down' : 'up';
            setDirection(nextDirection);
            prevY.current = Math.max(0, currentY);
          }
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return direction;
}
