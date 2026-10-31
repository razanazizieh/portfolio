#!/usr/bin/env node

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const indexPath = path.join(rootDir, 'dist', 'index.html');
const notFoundPath = path.join(rootDir, 'dist', '404.html');

try {
  if (fs.existsSync(indexPath)) {
    fs.copyFileSync(indexPath, notFoundPath);
    console.log('✓ Copied dist/index.html to dist/404.html for GitHub Pages SPA routing.');
  } else {
    console.warn('⚠ dist/index.html not found, skipping 404.html copy.');
  }
} catch (error) {
  console.error('✖ Failed to copy dist/index.html to dist/404.html:', error);
  process.exit(1);
}
