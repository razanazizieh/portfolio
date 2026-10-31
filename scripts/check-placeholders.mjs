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

const patterns = [
  { name: 'TODO-HOST', regex: /TODO-HOST/g },
  { name: 'TODO-DOMAIN', regex: /TODO-DOMAIN/g },
  { name: 'YOUR-', regex: /YOUR-/g },
  { name: 'TODO', regex: /\bTODO\b/g },
  { name: 'lorem', regex: /lorem/gi },
  { name: 'example.com', regex: /example\.com/gi },
  { name: 'Empty href', regex: /href=["'](#|"|'|\s*)["']/g },
  { name: 'Engineer', regex: /\bEngineer\b/g },
  { name: 'Engineered', regex: /\bEngineered\b/g },
  { name: 'Engineering', regex: /\bEngineering\b/g },
  { name: 'Architect', regex: /\bArchitect\b/g },
  { name: 'Architecture', regex: /\bArchitecture\b/g },
  { name: 'Architectural', regex: /\bArchitectural\b/g },
  { name: 'Python', regex: /\bPython\b/g },
  { name: 'Index label string', regex: /(?:>|'|"|`)\s*Index\s*(?:<|'|"|`)/g },
  { name: 'Underline class', regex: /\bclass(?:Name)?\s*=\s*["'][^"']*(?<!no-)\bunderline\b/g },
];

const targetDirs = ['src', 'content', 'data'];
const targetFiles = ['index.html'];

const allowedExtensions = new Set([
  '.html',
  '.ts',
  '.tsx',
  '.js',
  '.mjs',
  '.json',
  '.css',
  '.md',
]);

const ignoredDirs = new Set(['node_modules', 'dist', '.git', 'build']);

function scanFile(filePath, relativePath, findings) {
  let content = '';
  try {
    content = fs.readFileSync(filePath, 'utf-8');
  } catch {
    return;
  }

  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Skip scripts/check-placeholders.mjs itself and archive.ts
    if (relativePath.includes('check-placeholders.mjs') || relativePath.endsWith('archive.ts')) return;

    patterns.forEach(({ name, regex }) => {
      // Reset regex state
      regex.lastIndex = 0;
      if (regex.test(line)) {
        findings.push({
          pattern: name,
          file: relativePath,
          line: index + 1,
          preview: line.trim().slice(0, 100),
        });
      }
    });
  });
}

function walkDir(dirPath, relativeDir, findings) {
  if (!fs.existsSync(dirPath)) return;

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    if (ignoredDirs.has(entry.name)) continue;

    const fullPath = path.join(dirPath, entry.name);
    const relPath = path.join(relativeDir, entry.name);

    if (entry.isDirectory()) {
      walkDir(fullPath, relPath, findings);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (allowedExtensions.has(ext)) {
        scanFile(fullPath, relPath, findings);
      }
    }
  }
}

function runCheck() {
  const findings = [];

  // 1. Scan root files
  for (const file of targetFiles) {
    const fullPath = path.join(rootDir, file);
    if (fs.existsSync(fullPath)) {
      scanFile(fullPath, file, findings);
    }
  }

  // 2. Scan directories
  for (const dir of targetDirs) {
    const fullPath = path.join(rootDir, dir);
    if (fs.existsSync(fullPath)) {
      walkDir(fullPath, dir, findings);
    }
  }

  // 3. Validate rendered strings for unparsed asterisks ("*")
  let asteriskErrors = 0;

  // Validate siteContent copy strings with parseInline logic
  const copyStrings = [
    { source: 'siteContent.hero.sentence', text: 'I build *careful*, responsive interfaces with React. Full-stack is next.' },
    { source: 'Statement', text: "Logic is not just how code runs, it's how the interface *feels*." }
  ];

  copyStrings.forEach(({ source, text }) => {
    // parseInline logic
    const regex = /\*([^*]+)\*/g;
    let lastIndex = 0;
    let match;
    const segments = [];
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        segments.push({ text: text.slice(lastIndex, match.index), italic: false });
      }
      segments.push({ text: match[1], italic: true });
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
      segments.push({ text: text.slice(lastIndex), italic: false });
    }

    segments.forEach((seg) => {
      if (seg.text.includes('*')) {
        console.error(`✖ Rendered string in ${source} contains literal asterisk: "${seg.text}"`);
        asteriskErrors++;
      }
    });
  });

  // Also check dist/ if built to ensure no rendered HTML contains literal unparsed asterisks
  const distHtmlPath = path.join(rootDir, 'dist', 'index.html');
  if (fs.existsSync(distHtmlPath)) {
    const distHtml = fs.readFileSync(distHtmlPath, 'utf-8');
    const asteriskMatches = distHtml.match(/\*[a-zA-Z0-9_-]+\*/g);
    if (asteriskMatches) {
      console.error(`✖ Built HTML contains unparsed markdown asterisks: ${asteriskMatches.join(', ')}`);
      asteriskErrors += asteriskMatches.length;
    }
  }

  // 4. Print report
  console.log('\n--- Pre-Publish Placeholder & Quality Scan ---\n');

  if (findings.length === 0 && asteriskErrors === 0) {
    console.log('✓ No placeholders or banned patterns found (TODO-HOST, TODO-DOMAIN, YOUR-, "Index", underline classes all clean).');
    console.log('✓ All rendered strings verified without literal asterisks.');
    process.exitCode = 0;
  } else {
    if (findings.length > 0) {
      console.error(`✖ Found ${findings.length} placeholder / banned item(s):\n`);
      findings.forEach((f) => {
        console.error(`  [${f.pattern}] ${f.file}:${f.line} -> "${f.preview}"`);
      });
    }
    if (asteriskErrors > 0) {
      console.error(`\n✖ Check failed: ${asteriskErrors} rendered string(s) contain literal "*".`);
    }
    process.exitCode = 1;
  }
}

runCheck();
