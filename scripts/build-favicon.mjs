#!/usr/bin/env node

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import opentype from 'opentype.js';
import { Font } from 'fonteditor-core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

function parseFontBuffer(buffer) {
  const ab = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
  return opentype.parse(ab);
}

export function loadInterTight500() {
  const localWoff500 = path.join(__dirname, 'fonts', 'inter-tight-latin-500-normal.woff');
  if (fs.existsSync(localWoff500)) {
    const buf = fs.readFileSync(localWoff500);
    return parseFontBuffer(buf);
  }

  const localWoff600 = path.join(__dirname, 'fonts', 'inter-tight-latin-600-normal.woff');
  if (fs.existsSync(localWoff600)) {
    const buf = fs.readFileSync(localWoff600);
    return parseFontBuffer(buf);
  }

  const woff2Path = path.join(
    rootDir,
    'node_modules',
    '@fontsource-variable',
    'inter-tight',
    'files',
    'inter-tight-latin-wght-normal.woff2'
  );
  if (fs.existsSync(woff2Path)) {
    const woff2Buf = fs.readFileSync(woff2Path);
    const fontEditor = Font.create(woff2Buf, { type: 'woff2' });
    const ttfBuf = Buffer.from(fontEditor.toBuffer({ type: 'ttf' }));
    return parseFontBuffer(ttfBuf);
  }

  throw new Error('Could not find Inter Tight font source.');
}

export function loadInstrumentSerifItalic() {
  const woffPath = path.join(
    rootDir,
    'node_modules',
    '@fontsource',
    'instrument-serif',
    'files',
    'instrument-serif-latin-400-italic.woff'
  );
  if (fs.existsSync(woffPath)) {
    const buf = fs.readFileSync(woffPath);
    return parseFontBuffer(buf);
  }

  const woff2Path = path.join(
    rootDir,
    'node_modules',
    '@fontsource',
    'instrument-serif',
    'files',
    'instrument-serif-latin-400-italic.woff2'
  );
  if (fs.existsSync(woff2Path)) {
    const woff2Buf = fs.readFileSync(woff2Path);
    const fontEditor = Font.create(woff2Buf, { type: 'woff2' });
    const ttfBuf = Buffer.from(fontEditor.toBuffer({ type: 'ttf' }));
    return parseFontBuffer(ttfBuf);
  }

  throw new Error('Could not find Instrument Serif italic font source.');
}

export function getXIntersections(commands, targetY) {
  const xs = [];
  let currX = 0, currY = 0;
  let startX = 0, startY = 0;

  for (const cmd of commands) {
    if (cmd.type === 'M') {
      currX = startX = cmd.x;
      currY = startY = cmd.y;
    } else if (cmd.type === 'L') {
      const x0 = currX, y0 = currY;
      const x1 = cmd.x, y1 = cmd.y;
      if ((y0 <= targetY && targetY <= y1) || (y1 <= targetY && targetY <= y0)) {
        if (Math.abs(y1 - y0) > 1e-6) {
          const t = (targetY - y0) / (y1 - y0);
          xs.push(x0 + t * (x1 - x0));
        }
      }
      currX = x1;
      currY = y1;
    } else if (cmd.type === 'Q') {
      const x0 = currX, y0 = currY;
      const x1 = cmd.x1, y1 = cmd.y1;
      const x2 = cmd.x, y2 = cmd.y;
      const a = y0 - 2 * y1 + y2;
      const b = 2 * (y1 - y0);
      const c = y0 - targetY;
      if (Math.abs(a) < 1e-6) {
        if (Math.abs(b) > 1e-6) {
          const t = -c / b;
          if (t >= 0 && t <= 1) xs.push((1 - t) ** 2 * x0 + 2 * (1 - t) * t * x1 + t ** 2 * x2);
        }
      } else {
        const disc = b * b - 4 * a * c;
        if (disc >= 0) {
          const sqrtD = Math.sqrt(disc);
          const t1 = (-b + sqrtD) / (2 * a);
          const t2 = (-b - sqrtD) / (2 * a);
          if (t1 >= 0 && t1 <= 1) xs.push((1 - t1) ** 2 * x0 + 2 * (1 - t1) * t1 * x1 + t1 ** 2 * x2);
          if (t2 >= 0 && t2 <= 1) xs.push((1 - t2) ** 2 * x0 + 2 * (1 - t2) * t2 * x1 + t2 ** 2 * x2);
        }
      }
      currX = x2;
      currY = y2;
    } else if (cmd.type === 'Z') {
      const x0 = currX, y0 = currY;
      const x1 = startX, y1 = startY;
      if ((y0 <= targetY && targetY <= y1) || (y1 <= targetY && targetY <= y0)) {
        if (Math.abs(y1 - y0) > 1e-6) {
          const t = (targetY - y0) / (y1 - y0);
          xs.push(x0 + t * (x1 - x0));
        }
      }
      currX = x1;
      currY = y1;
    }
  }
  return xs;
}

export function findShiftA(pathR, pathA, capHeight, strokeWidthA, targetGap = 3.0) {
  let shift = 0;
  while (true) {
    let minGap = Infinity;
    // Sample along baseline area: from 0 (baseline) to capHeight in 0.25 unit steps
    for (let y = 0; y <= capHeight; y += 0.25) {
      const xsR = getXIntersections(pathR.commands, -y);
      const xsA = getXIntersections(pathA.commands, -y);
      if (xsR.length > 0 && xsA.length > 0) {
        const maxR = Math.max(...xsR);
        const minA = Math.min(...xsA);
        const gap = (minA + shift - strokeWidthA / 2) - maxR;
        if (gap < minGap) minGap = gap;
      }
    }
    if (minGap >= targetGap) {
      return { shift, minGap };
    }
    shift += 0.25;
  }
}

export function createMonogramSvg({ isSmallVariant = false, colorScheme = 'adaptive' } = {}) {
  const fontR = loadInterTight500();
  const fontA = loadInstrumentSerifItalic();

  const glyphR = fontR.charToGlyph('R');
  const glyphA = fontA.charToGlyph('A');

  const bboxR = glyphR.getBoundingBox();
  const bboxA = glyphA.getBoundingBox();

  // 1. CAP-HEIGHT MATCH:
  // Measure exact cap height of R from glyph outline:
  const rCapHeightFont = bboxR.y2 - bboxR.y1; // 1490 font units (out of 2048 UPM = 0.7275 em)

  // Measure cap height of italic "A" from shoulders/horizontal bars (excluding apex overshoot):
  // Apex of A in Instrument Serif italic is at 730 font units; shoulder vertices sit at 714 font units.
  const aTopVertices = glyphA.path.commands
    .map((cmd) => cmd.y)
    .filter((y) => y !== undefined && y > 650 && y < 725);
  const aCapHeightFont = aTopVertices.length > 0 ? Math.max(...aTopVertices) : 714; // 714 font units (out of 1000 UPM = 0.7140 em)

  // Scale ratio so cap height of A equals cap height of R:
  const scaleRatio = (rCapHeightFont / fontR.unitsPerEm) / (aCapHeightFont / fontA.unitsPerEm); // 1.018962

  // sR chosen so the centered monogram has ~8 units of padding in a 64x64 viewBox:
  const sR = 41.5;
  const sA = sR * scaleRatio; // 42.2869

  const capHeightUnits = sR * (rCapHeightFont / fontR.unitsPerEm); // 30.19 units

  // 3. WEIGHT BALANCE:
  // Normal artwork: stroke of "A" = 1.6 units
  // Small variant (item 4): stroke of "A" increased by 40% = 1.6 * 1.4 = 2.24 units
  const strokeWidthA = isSmallVariant ? +(1.6 * 1.4).toFixed(2) : 1.6;

  // Render raw paths at origin (0, 0)
  const pathR = glyphR.getPath(0, 0, sR);
  const pathA = glyphA.getPath(0, 0, sA);

  // 2. NO COLLISION:
  // Shift "A" in 0.25-unit steps until minimum horizontal gap is >= 3.0 units along baseline area
  const { shift: shiftA, minGap } = findShiftA(pathR, pathA, capHeightUnits, strokeWidthA, 3.0);

  // Re-center horizontally and vertically with ~8 units of padding
  const canvasSize = 64;
  const rMinX = bboxR.x1 * (sR / fontR.unitsPerEm);
  const aMaxX = bboxA.x2 * (sA / fontA.unitsPerEm) + shiftA + strokeWidthA / 2;

  const totalWidth = aMaxX - rMinX;
  const padX = (canvasSize - totalWidth) / 2;
  const offsetX = padX - rMinX;

  const apexHeightUnits = bboxA.y2 * (sA / fontA.unitsPerEm); // 30.87 units
  const totalHeight = apexHeightUnits + strokeWidthA;
  const padY = (canvasSize - totalHeight) / 2;
  const baselineY = canvasSize - padY - strokeWidthA / 2;

  // Generate paths placed on the exact baseline
  const placedPathR = glyphR.getPath(offsetX, baselineY, sR);
  const placedPathA = glyphA.getPath(offsetX + shiftA, baselineY, sA);

  const pathDataR = placedPathR.toPathData(2);
  const pathDataA = placedPathA.toPathData(2);

  let styleBlock = '';
  if (colorScheme === 'light') {
    styleBlock = `  <style>
    .bg { fill: #F5F4F0; }
    .glyph-r { fill: #141414; }
    .glyph-a { fill: #141414; stroke: #141414; stroke-width: ${strokeWidthA}; stroke-linejoin: round; }
  </style>`;
  } else {
    styleBlock = `  <style>
    .bg { fill: #F5F4F0; }
    .glyph-r { fill: #141414; }
    .glyph-a { fill: #141414; stroke: #141414; stroke-width: ${strokeWidthA}; stroke-linejoin: round; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: #141414; }
      .glyph-r { fill: #F5F4F0; }
      .glyph-a { fill: #F5F4F0; stroke: #F5F4F0; }
    }
  </style>`;
  }

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
${styleBlock}
  <rect class="bg" width="64" height="64" rx="0" />
  <path class="glyph-r" d="${pathDataR}" />
  <path class="glyph-a" d="${pathDataA}" />
</svg>
`;

  return {
    svgContent,
    rCapHeightFont,
    aCapHeightFont,
    scaleRatio,
    sR,
    sA,
    capHeightUnits,
    apexHeightUnits,
    shiftA,
    minGap,
    strokeWidthA,
    totalWidth,
    totalHeight,
    padX,
    padY,
  };
}

export function buildFaviconSvg() {
  const result = createMonogramSvg({ isSmallVariant: false, colorScheme: 'adaptive' });

  const destPath = path.join(publicDir, 'favicon.svg');
  fs.writeFileSync(destPath, result.svgContent, 'utf-8');

  console.log('✓ Generated public/favicon.svg');
  console.log(`  - Measured "R" cap height: ${result.rCapHeightFont} font units (${(result.rCapHeightFont / 2048).toFixed(4)} em)`);
  console.log(`  - Measured "A" shoulder cap height: ${result.aCapHeightFont} font units (${(result.aCapHeightFont / 1000).toFixed(4)} em)`);
  console.log(`  - Computed scale ratio (sA / sR): ${result.scaleRatio.toFixed(6)}`);
  console.log(`  - Font sizes: sR = ${result.sR}, sA = ${result.sA.toFixed(2)} (both cap heights = ${result.capHeightUnits.toFixed(2)} units)`);
  console.log(`  - "A" apex height: ${result.apexHeightUnits.toFixed(2)} units (rises ${(result.apexHeightUnits - result.capHeightUnits).toFixed(2)} units above R)`);
  console.log(`  - "A" shift step: ${result.shiftA} units (minimum horizontal gap = ${result.minGap.toFixed(2)} units >= 3.0 units)`);
  console.log(`  - "A" stroke-width: ${result.strokeWidthA} units (stroke-linejoin round)`);
  console.log(`  - Monogram size: ${result.totalWidth.toFixed(2)} x ${result.totalHeight.toFixed(2)} units`);
  console.log(`  - Padding: horizontal = ${result.padX.toFixed(2)} units (~8 units), vertical = ${result.padY.toFixed(2)} units`);

  return result;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    buildFaviconSvg();
  } catch (err) {
    console.error('Error generating favicon.svg:', err);
    process.exit(1);
  }
}
