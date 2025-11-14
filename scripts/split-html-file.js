#!/usr/bin/env node

/**
 * Split large HTML file into two parts for Webflow
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFile = path.join(__dirname, 'webflow-components', '200-our-current-vas-grid-premium.html');
const content = fs.readFileSync(inputFile, 'utf-8');

// Find the middle point - around 50KB
const midpoint = Math.floor(content.length / 2);

// Find a safe split point (after a closing </div> tag)
let splitPoint = midpoint;
while (splitPoint < content.length && !content.substring(splitPoint, splitPoint + 6).includes('</div>')) {
  splitPoint++;
}
splitPoint = content.lastIndexOf('</div>', splitPoint) + 6;

const part1 = content.substring(0, splitPoint);
const part2 = content.substring(splitPoint);

// Write part 1
const part1File = path.join(__dirname, 'webflow-components', '200-our-current-vas-grid-premium-PART1.html');
fs.writeFileSync(part1File, part1, 'utf-8');

// Write part 2
const part2File = path.join(__dirname, 'webflow-components', '200-our-current-vas-grid-premium-PART2.html');
fs.writeFileSync(part2File, part2, 'utf-8');

console.log('✅ File split successfully!\n');
console.log(`📄 PART 1: ${(part1.length / 1024).toFixed(2)} KB`);
console.log(`   File: webflow-components/200-our-current-vas-grid-premium-PART1.html`);
console.log(`\n📄 PART 2: ${(part2.length / 1024).toFixed(2)} KB`);
console.log(`   File: webflow-components/200-our-current-vas-grid-premium-PART2.html`);
console.log(`\n📋 Instructions:`);
console.log(`   1. Copy PART 1 and paste into Webflow HTML Embed`);
console.log(`   2. Then copy PART 2 and paste into the SAME HTML Embed`);
console.log(`   3. Both parts will combine into one complete grid`);
