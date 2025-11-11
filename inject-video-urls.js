#!/usr/bin/env node

/**
 * Script to inject video URLs from JSX profile files into Webflow VA Grid components (208)
 * Extracts videoUrl from each profile and adds onclick handler to video buttons
 * 
 * Usage: node inject-video-urls.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🎬 Extracting video URLs from VA profiles...\n');

// Step 1: Extract video URLs from JSX profile files
const videoMap = {};
const profileDir = path.join(__dirname, 'src', 'pages');

// Get all profile files
const profileFiles = fs.readdirSync(profileDir).filter(f => f.endsWith('Profile.jsx'));

profileFiles.forEach(file => {
  const filePath = path.join(profileDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Extract VA name from filename (e.g., "AdrianProfile.jsx" -> "Adrian")
  const vaName = file.replace('Profile.jsx', '');
  
  // Extract videoUrl from the file
  const videoUrlMatch = content.match(/videoUrl:\s*['"]([^'"]+)['"]/);
  
  if (videoUrlMatch && videoUrlMatch[1]) {
    videoMap[vaName] = videoUrlMatch[1];
    console.log(`✅ ${vaName}: ${videoUrlMatch[1]}`);
  } else {
    console.log(`⚠️  ${vaName}: No video URL found`);
  }
});

console.log(`\n📊 Found ${Object.keys(videoMap).length} video URLs\n`);

// Step 2: Update the 208 files with video URLs
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

  // For each VA in the video map, find and update the button
  Object.entries(videoMap).forEach(([vaName, videoUrl]) => {
    // Find the pattern: <a href="/[va-slug]-ocean-va-profile"...
    // Then find the corresponding button after it
    
    // Create a regex to find the VA card and its video button
    const cardPattern = new RegExp(
      `(<a href="/${vaName.toLowerCase()}-ocean-va-profile"[^>]*>View Profile →</a>)\\s*<button class="va-grid-btn-secondary" title="Share">▶</button>`,
      'gi'
    );
    
    // Check if we need to handle multi-word names (e.g., "Cherry Mae" -> "cherry-mae")
    const slugVariations = [
      vaName.toLowerCase(),
      vaName.toLowerCase().replace(/\s+/g, '-'),
      vaName.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '').replace(/\s+/g, '-')
    ];

    slugVariations.forEach(slug => {
      const pattern = new RegExp(
        `(<a href="/${slug}-ocean-va-profile"[^>]*>View Profile →</a>)\\s*<button class="va-grid-btn-secondary" title="Share">▶</button>`,
        'gi'
      );

      if (pattern.test(content)) {
        const replacement = `$1\n        <button class="va-grid-btn-secondary" title="Watch Video" onclick="window.open('${videoUrl}', '_blank')">▶</button>`;
        content = content.replace(pattern, replacement);
        updatedCount++;
      }
    });
  });

  if (updatedCount > 0) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`✅ ${filePath}: Updated ${updatedCount} video buttons`);
    totalUpdated += updatedCount;
  } else {
    console.log(`⚠️  ${filePath}: No updates made`);
  }
});

console.log(`\n🎉 Done! Updated ${totalUpdated} video buttons total.`);
console.log('\n📝 Next steps:');
console.log('1. Review the changes in the 208 files');
console.log('2. Commit the changes: git add -A && git commit -m "Inject video URLs into VA Grid components"');
console.log('3. Push to GitHub: git push origin main');
console.log('4. Update Webflow page with new HTML component');
