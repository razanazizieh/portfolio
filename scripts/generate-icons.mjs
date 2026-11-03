#!/usr/bin/env node

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { createMonogramSvg } from './build-favicon.mjs';
import { generateOgImage } from './generate-og-image.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

async function generateIcons() {
  console.log('Generating icons from monogram artwork (LIGHT variant: #141414 on #F5F4F0)...');

  // Normal artwork (light variant: stroke 1.6, gap >= 3, ~8 units padding)
  const normalResult = createMonogramSvg({ isSmallVariant: false, colorScheme: 'light' });
  const normalBuffer = Buffer.from(normalResult.svgContent);

  // Small artwork (light variant: stroke increased by 40% to 2.24, gap kept >= 3)
  const smallResult = createMonogramSvg({ isSmallVariant: true, colorScheme: 'light' });
  const smallBuffer = Buffer.from(smallResult.svgContent);

  // 1. Small favicons (16x16 and 32x32) use the small variant
  const smallSizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
  ];

  for (const { name, size } of smallSizes) {
    const dest = path.join(publicDir, name);
    await sharp(smallBuffer)
      .resize(size, size)
      .png()
      .toFile(dest);
    console.log(`✓ Generated ${name} (${size}x${size}, small variant stroke +40%, gap >= 3)`);
  }

  // 2. Medium and large icons (48, 96, 192, 512) use the normal artwork
  const normalSizes = [
    { name: 'favicon-48x48.png', size: 48 },
    { name: 'favicon-96x96.png', size: 96 },
    { name: 'icon-192.png', size: 192 },
    { name: 'icon-512.png', size: 512 },
  ];

  for (const { name, size } of normalSizes) {
    const dest = path.join(publicDir, name);
    await sharp(normalBuffer)
      .resize(size, size)
      .png()
      .toFile(dest);
    console.log(`✓ Generated ${name} (${size}x${size}, normal artwork)`);
  }

  // 3. apple-touch-icon.png (180x180, opaque #F5F4F0 background, monogram at 70% size centered, no transparency)
  const appleTouchSize = 180;
  const appleMonogramSize = Math.round(appleTouchSize * 0.7); // 126px
  const appleMonogramOffset = Math.round((appleTouchSize - appleMonogramSize) / 2); // 27px

  const appleMonogramBuffer = await sharp(normalBuffer)
    .resize(appleMonogramSize, appleMonogramSize)
    .png()
    .toBuffer();

  const appleTouchDest = path.join(publicDir, 'apple-touch-icon.png');
  await sharp({
    create: {
      width: appleTouchSize,
      height: appleTouchSize,
      channels: 3,
      background: '#F5F4F0',
    },
  })
    .composite([
      {
        input: appleMonogramBuffer,
        left: appleMonogramOffset,
        top: appleMonogramOffset,
      },
    ])
    .flatten({ background: '#F5F4F0' })
    .png()
    .toFile(appleTouchDest);
  console.log(`✓ Generated apple-touch-icon.png (${appleTouchSize}x${appleTouchSize}, 70% monogram, opaque)`);

  // 4. icon-maskable-512.png (monogram inside central 60% safe zone on solid #F5F4F0 background)
  const maskableSize = 512;
  const maskableMonogramSize = Math.round(maskableSize * 0.6); // 307px
  const maskableOffset = Math.round((maskableSize - maskableMonogramSize) / 2); // 103px

  const maskableMonogramBuffer = await sharp(normalBuffer)
    .resize(maskableMonogramSize, maskableMonogramSize)
    .png()
    .toBuffer();

  const maskableDest = path.join(publicDir, 'icon-maskable-512.png');
  await sharp({
    create: {
      width: maskableSize,
      height: maskableSize,
      channels: 3,
      background: '#F5F4F0',
    },
  })
    .composite([
      {
        input: maskableMonogramBuffer,
        left: maskableOffset,
        top: maskableOffset,
      },
    ])
    .flatten({ background: '#F5F4F0' })
    .png()
    .toFile(maskableDest);
  console.log(`✓ Generated icon-maskable-512.png (${maskableSize}x${maskableSize}, 60% safe zone)`);

  // 5. favicon.ico (16 from small variant, 32 from small variant, 48 from normal artwork)
  const [ico16, ico32, ico48] = await Promise.all([
    sharp(smallBuffer).resize(16, 16).png().toBuffer(),
    sharp(smallBuffer).resize(32, 32).png().toBuffer(),
    sharp(normalBuffer).resize(48, 48).png().toBuffer(),
  ]);

  const icoBuffer = await pngToIco([ico16, ico32, ico48]);
  const icoDest = path.join(publicDir, 'favicon.ico');
  fs.writeFileSync(icoDest, icoBuffer);
  console.log('✓ Generated favicon.ico (16x16 small, 32x32 small, 48x48 normal)');

  // 6. Open Graph branding assets
  await generateOgImage();

  console.log('\nAll icons and visual branding assets successfully generated in public/ directory.');
}

generateIcons().catch((err) => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
