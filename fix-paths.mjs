#!/usr/bin/env node
// Postbuild script to fix image paths for GitHub Pages

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, 'dist');
const base = '/lekce';

// Only run when CI is true (GitHub Actions)
if (!process.env.CI) {
  console.log('Not in CI environment, skipping image path fixes.');
  process.exit(0);
}

function fixHtmlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;
  
  // Fix image src paths: src="/img/..." -> src="/lekce/img/..."
  const newContent = content.replace(/src="\/img\//g, `src="${base}/img/`);
  
  // Fix video src paths: src="/video-... -> src="/lekce/video-...
  const newContent2 = newContent.replace(/src="\/video-/g, `src="${base}/video-`);
  
  if (content !== newContent2) {
    fs.writeFileSync(filePath, newContent2);
    console.log(`Fixed: ${filePath}`);
    return true;
  }
  return false;
}

function walkDir(dir) {
  let fixed = 0;
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      fixed += walkDir(filePath);
    } else if (file.endsWith('.html')) {
      if (fixHtmlFile(filePath)) {
        fixed++;
      }
    }
  }
  
  return fixed;
}

console.log('Fixing image paths for GitHub Pages...');
const count = walkDir(distDir);
console.log(`Done! Fixed ${count} files.`);
