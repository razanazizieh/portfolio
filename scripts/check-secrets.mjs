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

// Scanner patterns for source files
const secretPatterns = [
  { name: 'Google API Key', regex: /AIza[0-9A-Za-z_-]{35}/g },
  { name: 'OpenAI Secret Key', regex: /sk-[A-Za-z0-9]{20,}/g },
  { name: 'GitHub Token', regex: /ghp_[A-Za-z0-9]{36}/g },
  { name: 'API_KEY keyword', regex: /"API_KEY"|'API_KEY'/g },
  { name: 'api_key keyword', regex: /"api_key"|'api_key'/g },
  { name: 'secret keyword', regex: /"secret"|'secret'/g },
  { name: 'password keyword', regex: /"password"|'password'/g },
  { name: 'token= keyword', regex: /token=/g },
  { name: 'Bearer token header', regex: /Bearer\s+[A-Za-z0-9_\-\.]+/g },
];

// In compiled bundles, only check actual credential tokens (not generic minified HTML attribute names)
const distSecretPatterns = [
  { name: 'Google API Key', regex: /AIza[0-9A-Za-z_-]{35}/g },
  { name: 'OpenAI Secret Key', regex: /sk-[A-Za-z0-9]{20,}/g },
  { name: 'GitHub Token', regex: /ghp_[A-Za-z0-9]{36}/g },
  { name: 'Bearer token header', regex: /Bearer\s+[A-Za-z0-9_\-\.]+/g },
];

const targetDirs = ['src', 'public', 'data', 'content', 'dist'];
const targetFiles = [
  'package.json',
  'tsconfig.json',
  'vite.config.ts',
  'eslint.config.js',
  '.prettierrc',
  'index.html',
];

const ignoredDirs = new Set(['node_modules', '.git', 'coverage', '.vercel']);

const findings = [];

function scanFile(filePath, relativePath) {
  // Skip check-secrets.mjs itself
  if (relativePath.includes('check-secrets.mjs')) return;

  let content = '';
  try {
    content = fs.readFileSync(filePath, 'utf-8');
  } catch {
    return;
  }

  const isDist = relativePath.startsWith('dist');
  const patternsToUse = isDist ? distSecretPatterns : secretPatterns;

  const lines = content.split('\n');

  lines.forEach((line, index) => {
    patternsToUse.forEach(({ name, regex }) => {
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

function walkDir(dirPath, relativeDir) {
  if (!fs.existsSync(dirPath)) return;

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    if (ignoredDirs.has(entry.name)) continue;

    const fullPath = path.join(dirPath, entry.name);
    const relPath = path.join(relativeDir, entry.name);

    if (entry.isDirectory()) {
      walkDir(fullPath, relPath);
    } else if (entry.isFile()) {
      scanFile(fullPath, relPath);
    }
  }
}

// 1. Scan for any .env files in root or directories
function checkEnvFiles(dirPath, relativeDir) {
  if (!fs.existsSync(dirPath)) return;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    if (ignoredDirs.has(entry.name)) continue;
    const relPath = path.join(relativeDir, entry.name);
    if (entry.isFile() && (entry.name === '.env' || entry.name.startsWith('.env.'))) {
      findings.push({
        pattern: '.env file found',
        file: relPath,
        line: 1,
        preview: entry.name,
      });
    } else if (entry.isDirectory()) {
      checkEnvFiles(path.join(dirPath, entry.name), relPath);
    }
  }
}

// Execute checks
checkEnvFiles(rootDir, '');

for (const file of targetFiles) {
  const fullPath = path.join(rootDir, file);
  if (fs.existsSync(fullPath)) {
    scanFile(fullPath, file);
  }
}

for (const dir of targetDirs) {
  const fullPath = path.join(rootDir, dir);
  if (fs.existsSync(fullPath)) {
    walkDir(fullPath, dir);
  }
}

console.log('\n--- Repository Secrets & Hygiene Scan ---\n');

if (findings.length === 0) {
  console.log('✓ No exposed secrets, forbidden auth patterns, or .env files detected.');
  process.exit(0);
} else {
  console.error(`✖ Found ${findings.length} secret / forbidden keyword finding(s):\n`);
  findings.forEach((f) => {
    console.error(`  [${f.pattern}] ${f.file}:${f.line} -> "${f.preview}"`);
  });
  process.exit(1);
}
