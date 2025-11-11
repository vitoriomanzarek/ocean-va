#!/usr/bin/env node

/**
 * Script to update image URLs in Webflow VA Grid components (208)
 * Compares old URLs with new URLs from Webflow and updates them
 * 
 * Usage: node update-image-urls.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Image URL mappings - OLD -> NEW
const imageUpdates = {
  // PART 1
  // Joana
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Joana': 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d7d3a9269a232c087c_Johana.webp',
  
  // Maria Paula
  'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d832a39b976f928efd_Maria Paula.webp': 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d8bf0d16a67d796ebc_Maria%20Paula.webp',
  
  // Ma. Venus
  'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d84a0eb5d1ec0e85db_Ma%20Venus.webp': 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d84a0eb5d1ec0e85db_Ma%20Venus.webp',
  
  // Raydon
  'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d460710f374d2ce4ff_Raidon.webp': 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d460710f374d2ce4ff_Raydon.webp',
  
  // PART 2
  // Ana
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana': 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8e4658f99ec04bf1338_Anna.webp',
  
  // Ana Victoria
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana Victoria': 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d57d576b7fccbc87e0_Anna%20Victoria.webp',
  
  // Balbina
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Balbina': 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d5e8b404bf07609f0f_Balbina.webp',
  
  // Carolina
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Carolina': 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d5ebcbcb8ae3572a64_Carolina.webp',
  
  // Janice
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Janice': 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d637032e6e94653a02_Janice.webp',
  
  // Maria Fernanda
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria Fernanda': 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d832a39b976f928efd_Maria.webp'
};

console.log('🖼️  Updating image URLs in VA Grid components...\n');

const files = [
  'webflow-components/208-va-grid-part1.html',
  'webflow-components/208-va-grid-part2.html'
];

let totalUpdated = 0;

files.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf-8');
  let updatedCount = 0;

  // Replace each old URL with new URL
  Object.entries(imageUpdates).forEach(([oldUrl, newUrl]) => {
    if (oldUrl !== newUrl && content.includes(oldUrl)) {
      content = content.replace(new RegExp(oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newUrl);
      updatedCount++;
      console.log(`  ✅ ${oldUrl.substring(0, 80)}...`);
    }
  });

  if (updatedCount > 0) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`\n✅ ${filePath}: Updated ${updatedCount} image URLs\n`);
    totalUpdated += updatedCount;
  } else {
    console.log(`⚠️  ${filePath}: No updates needed\n`);
  }
});

console.log(`🎉 Done! Updated ${totalUpdated} image URLs total.`);
console.log('\n📝 Next steps:');
console.log('1. Review the changes in the 208 files');
console.log('2. Commit the changes: git add -A && git commit -m "Update image URLs in VA Grid components"');
console.log('3. Push to GitHub when ready');
