#!/usr/bin/env node

/**
 * Update Grid HTML with Webflow Image URLs
 * Replaces DiceBear placeholder URLs with real Webflow image URLs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the image mapping
const mappingPath = path.join(__dirname, 'webflow-image-mapping.json');
const mappingData = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'));
const imageMap = mappingData.imageMap;

console.log(`📸 Updating grid HTML with ${Object.keys(imageMap).length} Webflow image URLs...\n`);

// Update Part 1
const part1Path = path.join(__dirname, 'webflow-components', '208-va-grid-part1.html');
let part1Content = fs.readFileSync(part1Path, 'utf-8');

let part1Updated = 0;
Object.entries(imageMap).forEach(([vaName, webflowUrl]) => {
  // Create regex to find DiceBear URL for this VA
  const dicebearUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${vaName}`;
  const escapedUrl = dicebearUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escapedUrl, 'g');
  
  if (regex.test(part1Content)) {
    part1Content = part1Content.replace(regex, webflowUrl);
    part1Updated++;
  }
});

fs.writeFileSync(part1Path, part1Content);
console.log(`✅ Part 1 updated: ${part1Updated} images replaced`);

// Update Part 2
const part2Path = path.join(__dirname, 'webflow-components', '208-va-grid-part2.html');
let part2Content = fs.readFileSync(part2Path, 'utf-8');

let part2Updated = 0;
Object.entries(imageMap).forEach(([vaName, webflowUrl]) => {
  const dicebearUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${vaName}`;
  const escapedUrl = dicebearUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escapedUrl, 'g');
  
  if (regex.test(part2Content)) {
    part2Content = part2Content.replace(regex, webflowUrl);
    part2Updated++;
  }
});

fs.writeFileSync(part2Path, part2Content);
console.log(`✅ Part 2 updated: ${part2Updated} images replaced`);

console.log(`\n📊 Summary:`);
console.log(`   Total replaced: ${part1Updated + part2Updated}`);
console.log(`   Part 1: ${part1Path}`);
console.log(`   Part 2: ${part2Path}`);

console.log(`\n✅ Grid HTML updated successfully!`);
console.log(`\n📋 Next steps:`);
console.log(`   1. Copy Part 1 and paste into Webflow HTML Embed`);
console.log(`   2. Then copy Part 2 and paste into the SAME HTML Embed`);
console.log(`   3. Publish the page`);
