#!/usr/bin/env node

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import opentype from 'opentype.js';
import { loadInterTight500, loadInstrumentSerifItalic } from './build-favicon.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

/**
 * Renders a string into SVG path data using charToGlyph and font advance metrics.
 */
function renderStringToPath(font, text, startX, startY, fontSize, tracking = 0) {
  let x = startX;
  const scale = fontSize / font.unitsPerEm;
  let fullPathData = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === ' ') {
      x += fontSize * 0.28 + tracking;
      continue;
    }

    const glyph = font.charToGlyph(char);
    const p = glyph.getPath(x, startY, fontSize);
    fullPathData += p.toPathData(2) + ' ';

    const kerning =
      i < text.length - 1 && font.getKerningValue
        ? font.getKerningValue(glyph, font.charToGlyph(text[i + 1])) * scale
        : 0;

    x += glyph.advanceWidth * scale + kerning + tracking;
  }

  return { pathData: fullPathData.trim(), totalWidth: x - startX, endX: x };
}

/**
 * Generates the 1200x630 Open Graph (OG) editorial card.
 */
export async function generateOgImage() {
  console.log('Generating Open Graph (OG) image (1200x630, #141414 background)...');

  const fontSans = loadInterTight500();
  const fontSerif = loadInstrumentSerifItalic();

  const width = 1200;
  const height = 630;

  // 1. Cap-height matching for the dual-type full name
  const rBbox = fontSans.charToGlyph('R').getBoundingBox();
  const aBbox = fontSerif.charToGlyph('A').getBoundingBox();

  const rCapHeight = rBbox.y2 - rBbox.y1; // 1490 font units
  const aShoulderHeight = 714; // 714 font units (excluding apex overshoot)

  const scaleRatio = (rCapHeight / fontSans.unitsPerEm) / (aShoulderHeight / fontSerif.unitsPerEm);

  const sansFontSize = 84;
  const serifFontSize = sansFontSize * scaleRatio; // ~85.6px

  const nameStartX = 96;
  const nameBaselineY = 345;

  // Render "RAZAN" in Sans-serif (Inter Tight)
  const sansName = renderStringToPath(fontSans, 'RAZAN', nameStartX, nameBaselineY, sansFontSize, 3);

  // Render "AZIZIEH" in Serif Italic (Instrument Serif)
  const serifGap = 24;
  const serifName = renderStringToPath(
    fontSerif,
    'AZIZIEH',
    sansName.endX + serifGap,
    nameBaselineY,
    serifFontSize,
    1.5
  );

  // 2. Subtitle / Role strictly: "FRONT-END DEVELOPER"
  const subtitleBaselineY = nameBaselineY + 54;
  const subtitleFontSize = 20;
  const subtitle = renderStringToPath(
    fontSans,
    'FRONT-END DEVELOPER',
    nameStartX,
    subtitleBaselineY,
    subtitleFontSize,
    4.5
  );

  // 3. Monogram mark in upper section
  const monoBoxX = 96;
  const monoBoxY = 104;
  const monoBoxSize = 56;
  const monoFontSizeR = 34;
  const monoFontSizeA = monoFontSizeR * scaleRatio;
  const monoBaselineY = monoBoxY + 41;

  const monoGlyphR = fontSans.charToGlyph('R').getPath(monoBoxX + 9, monoBaselineY, monoFontSizeR);
  const monoGlyphA = fontSerif.charToGlyph('A').getPath(monoBoxX + 31, monoBaselineY, monoFontSizeA);

  // 4. Header annotations (monochrome editorial tokens)
  const metaTopRight = renderStringToPath(
    fontSans,
    'PORTFOLIO · 2026',
    1000,
    monoBoxY + 33,
    14,
    2.5
  );

  // 5. Footer annotations strictly technical/engineering
  const footerBaselineY = 535;
  const footerLeft = renderStringToPath(
    fontSans,
    'REACT · TYPESCRIPT · DISTRIBUTED SYSTEMS',
    nameStartX,
    footerBaselineY,
    13,
    2.5
  );

  const footerRight = renderStringToPath(
    fontSans,
    'RAZANAZIZIEH.GITHUB.IO/PORTFOLIO',
    880,
    footerBaselineY,
    13,
    2.5
  );

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <!-- Dark charcoal background -->
  <rect width="${width}" height="${height}" fill="#141414" />

  <!-- Outer frame border -->
  <rect x="48" y="48" width="${width - 96}" height="${height - 96}" fill="none" stroke="#242424" stroke-width="1" />

  <!-- Horizontal divider lines -->
  <line x1="48" y1="184" x2="${width - 48}" y2="184" stroke="#1F1F1F" stroke-width="1" />
  <line x1="48" y1="488" x2="${width - 48}" y2="488" stroke="#1F1F1F" stroke-width="1" />

  <!-- Upper Monogram Badge -->
  <rect x="${monoBoxX}" y="${monoBoxY}" width="${monoBoxSize}" height="${monoBoxSize}" fill="#191919" stroke="#292929" stroke-width="1" />
  <path fill="#F5F4F0" d="${monoGlyphR.toPathData(2)}" />
  <path fill="#F5F4F0" stroke="#F5F4F0" stroke-width="1.2" stroke-linejoin="round" d="${monoGlyphA.toPathData(2)}" />

  <!-- Header Right Metadata -->
  <path fill="#7D7C78" d="${metaTopRight.pathData}" />

  <!-- Full Name: RAZAN (Sans-serif) AZIZIEH (Serif Italic) -->
  <path fill="#F5F4F0" d="${sansName.pathData}" />
  <path fill="#F5F4F0" stroke="#F5F4F0" stroke-width="1.4" stroke-linejoin="round" d="${serifName.pathData}" />

  <!-- Subtitle: FRONT-END DEVELOPER -->
  <path fill="#9C9B96" d="${subtitle.pathData}" />

  <!-- Footer Technical Annotations -->
  <path fill="#73726E" d="${footerLeft.pathData}" />
  <path fill="#73726E" d="${footerRight.pathData}" />
</svg>
`;

  const svgBuffer = Buffer.from(svgContent);

  // Write PNG format to public/og.png (standard Open Graph image)
  const ogPngPath = path.join(publicDir, 'og.png');
  await sharp(svgBuffer).png({ quality: 100 }).toFile(ogPngPath);
  console.log(`✓ Generated ${ogPngPath} (${width}x${height} PNG)`);

  // Write JPEG format to public/og-image.jpg
  const ogJpgPath = path.join(publicDir, 'og-image.jpg');
  await sharp(svgBuffer).jpeg({ quality: 92 }).toFile(ogJpgPath);
  console.log(`✓ Generated ${ogJpgPath} (${width}x${height} JPEG)`);

  return { ogPngPath, ogJpgPath };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    await generateOgImage();
  } catch (err) {
    console.error('Error generating OG image:', err);
    process.exit(1);
  }
}
