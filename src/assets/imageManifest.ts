// Provides image asset mapping and layout specifications for all project assets
// Directly delivers highest-resolution supplied sources without compression or downscaling

export interface ResponsiveImageSpec {
  src: string;
  width: number;
  height: number;
  aspectRatio: number;
  webpSrcSet?: string;
  fallbackSrcSet?: string;
}

import articula_editorial_1780400462531_orig from './images/articula_editorial_1780400462531.png';
import articula_sec_1780407434279_orig from './images/articula_sec_1780407434279.png';
import bilingual_sec_1787999042373_orig from './images/bilingual_sec_1787999042373.jpg';
import minimalist_sec_1787999067928_orig from './images/minimalist_sec_1787999067928.jpg';
import minimalist_tert_1787999078582_orig from './images/minimalist_tert_1787999078582.jpg';
import og_image_1782228462141_orig from './images/og_image_1782228462141.jpg';
import razan_legacy_editorial_1782753447417_orig from './images/razan_legacy_editorial_1782753447417.jpg';
import sarah_portfolio_editorial_1782753433749_orig from './images/sarah_portfolio_editorial_1782753433749.jpg';
import specimen_editorial_1782753464554_orig from './images/specimen_editorial_1782753464554.jpg';
import specimen_sec_1787999092872_orig from './images/specimen_sec_1787999092872.jpg';
import vortex_editorial_1780400444831_orig from './images/vortex_editorial_1780400444831.png';
import vortex_sec_1780407415309_orig from './images/vortex_sec_1780407415309.png';
import vortex_tertiary_1787999055349_orig from './images/vortex_tertiary_1787999055349.jpg';

export const IMAGE_MANIFEST: Record<string, ResponsiveImageSpec> = {
  'cms.png': {
    src: articula_editorial_1780400462531_orig,
    width: 1408,
    height: 768,
    aspectRatio: 1.8333,
  },
  '3d.png': {
    src: vortex_editorial_1780400444831_orig,
    width: 1408,
    height: 768,
    aspectRatio: 1.8333,
  },
  'bilingual.png': {
    src: sarah_portfolio_editorial_1782753433749_orig,
    width: 1264,
    height: 848,
    aspectRatio: 1.4906,
  },
  'canvas.png': {
    src: razan_legacy_editorial_1782753447417_orig,
    width: 1264,
    height: 848,
    aspectRatio: 1.4906,
  },
  'lepoque.png': {
    src: specimen_editorial_1782753464554_orig,
    width: 1264,
    height: 848,
    aspectRatio: 1.4906,
  },
  'articula_editorial_1780400462531.png': {
    src: articula_editorial_1780400462531_orig,
    width: 1408,
    height: 768,
    aspectRatio: 1.8333,
  },
  'articula_sec_1780407434279.png': {
    src: articula_sec_1780407434279_orig,
    width: 1408,
    height: 768,
    aspectRatio: 1.8333,
  },
  'bilingual_sec_1787999042373.jpg': {
    src: bilingual_sec_1787999042373_orig,
    width: 1376,
    height: 768,
    aspectRatio: 1.7917,
  },
  'minimalist_sec_1787999067928.jpg': {
    src: minimalist_sec_1787999067928_orig,
    width: 1376,
    height: 768,
    aspectRatio: 1.7917,
  },
  'minimalist_tert_1787999078582.jpg': {
    src: minimalist_tert_1787999078582_orig,
    width: 1376,
    height: 768,
    aspectRatio: 1.7917,
  },
  'og_image_1782228462141.jpg': {
    src: og_image_1782228462141_orig,
    width: 1376,
    height: 768,
    aspectRatio: 1.7917,
  },
  'razan_legacy_editorial_1782753447417.jpg': {
    src: razan_legacy_editorial_1782753447417_orig,
    width: 1264,
    height: 848,
    aspectRatio: 1.4906,
  },
  'sarah_portfolio_editorial_1782753433749.jpg': {
    src: sarah_portfolio_editorial_1782753433749_orig,
    width: 1264,
    height: 848,
    aspectRatio: 1.4906,
  },
  'specimen_editorial_1782753464554.jpg': {
    src: specimen_editorial_1782753464554_orig,
    width: 1264,
    height: 848,
    aspectRatio: 1.4906,
  },
  'specimen_sec_1787999092872.jpg': {
    src: specimen_sec_1787999092872_orig,
    width: 1376,
    height: 768,
    aspectRatio: 1.7917,
  },
  'vortex_editorial_1780400444831.png': {
    src: vortex_editorial_1780400444831_orig,
    width: 1408,
    height: 768,
    aspectRatio: 1.8333,
  },
  'vortex_sec_1780407415309.png': {
    src: vortex_sec_1780407415309_orig,
    width: 1312,
    height: 816,
    aspectRatio: 1.6078,
  },
  'vortex_tertiary_1787999055349.jpg': {
    src: vortex_tertiary_1787999055349_orig,
    width: 1376,
    height: 768,
    aspectRatio: 1.7917,
  },
};

/**
 * Helper that resolves highest-resolution supplied image source and dimensions.
 */
export function getResponsiveImageProps(
  src: string,
  archetype?: string,
  isFullBleed?: boolean
): {
  src: string;
  srcSet?: string;
  webpSrcSet?: string;
  sizes: string;
  width?: number;
  height?: number;
  aspectRatio?: number;
} {
  let sizes = '100vw';
  if (isFullBleed || archetype === 'cinematic-anchor' || archetype === 'full-bleed-moment') {
    sizes = '100vw';
  } else if (archetype === 'tall-staggered-right' || archetype === 'narrative-offset-left') {
    sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 44vw, 560px';
  } else if (archetype === 'staggered-offset-right') {
    sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 660px';
  } else if (archetype === 'compact-staggered-left' || archetype === 'split-editorial') {
    sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 58vw, 760px';
  } else {
    sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 800px';
  }

  if (!src) {
    return { src: '', sizes };
  }

  // Check if image matches an entry in our manifest
  const filenameMatch = src.match(/([^/\?#]+\.(?:png|jpg|jpeg|webp))/i);
  const matchedKey = filenameMatch
    ? Object.keys(IMAGE_MANIFEST).find((k) =>
        filenameMatch[1].includes(k.replace(/\.[^.]+$/, ''))
      )
    : null;

  if (matchedKey && IMAGE_MANIFEST[matchedKey]) {
    const spec = IMAGE_MANIFEST[matchedKey];
    return {
      src: spec.src,
      sizes,
      width: spec.width,
      height: spec.height,
      aspectRatio: spec.aspectRatio,
    };
  }

  return {
    src,
    sizes,
  };
}
