import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read CSV file
const csvPath = path.join(__dirname, 'src/data/VAs Database - VA Merged with licenced VA.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');
const records = parse(csvContent, {
  columns: true,
  skip_empty_lines: true
});

// Create a map of VA names to YouTube URLs
const vaVideoMap = {};
records.forEach(record => {
  const name = record['Name.1'] || record['Name'];
  const youtubeUrl = record['YouTube URL'];
  if (name && youtubeUrl) {
    vaVideoMap[name.toLowerCase()] = youtubeUrl;
  }
});

console.log('VA Video Map created with', Object.keys(vaVideoMap).length, 'entries');

// Function to extract YouTube ID from URL
function getYoutubeId(url) {
  if (!url) return null;
  // Handle both youtu.be and youtube.com formats
  let match = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (match) return match[1];
  
  match = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
  if (match) return match[1];
  
  return null;
}

// Function to generate thumbnail URL
function getThumbnailUrl(youtubeId) {
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
}

// Function to update video section
function updateVideoSection(content, vaName, youtubeUrl) {
  const youtubeId = youtubeUrl ? getYoutubeId(youtubeUrl) : null;

  if (!youtubeId || youtubeUrl === 'NO VIDEO' || !youtubeUrl) {
    // No video - replace with "VIDEO IN PROGRESS"
    const videoPattern = /<div class="va-video-container"[\s\S]*?<\/div>\s*<\/div>/;
    const replacement = `<div class="va-video-container" style="background-color: #f0f0f0; display: flex; align-items: center; justify-content: center;">
              <div class="va-video-overlay">
                <p class="va-video-text">VIDEO IN PROGRESS</p>
              </div>
            </div>`;
    return content.replace(videoPattern, replacement);
  }

  // Has video - update with new thumbnail and URL
  const thumbnailUrl = getThumbnailUrl(youtubeId);
  const videoPattern = /<div class="va-video-container"[\s\S]*?<\/div>\s*<\/div>/;
  const replacement = `<div class="va-video-container" style="background-image: url('${thumbnailUrl}')">
            <div class="va-video-overlay">
              <svg class="va-video-play-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path>
              </svg>
              <p class="va-video-text">CLICK HERE</p>
            </div>
          </div>`;
  return content.replace(videoPattern, replacement);
}

// Process all HTML files
const componentsDir = path.join(__dirname, 'webflow-components');
const files = fs.readdirSync(componentsDir).filter(f => f.match(/^\d+-.*-profile\.html$/));

let successCount = 0;
let errorCount = 0;
let noVideoCount = 0;

files.forEach(file => {
  const filePath = path.join(componentsDir, file);
  const fileNumber = parseInt(file.split('-')[0]);

  // Only process files 211-275
  if (fileNumber < 211 || fileNumber > 275) {
    return;
  }

  try {
    let content = fs.readFileSync(filePath, 'utf-8');

    // Extract VA name from file (e.g., "257-janice-profile.html" -> "janice")
    const vaNameMatch = file.match(/\d+-(.+?)-profile\.html/);
    if (!vaNameMatch) {
      console.log(`⚠️  Could not extract VA name from: ${file}`);
      return;
    }

    const vaNameFromFile = vaNameMatch[1].toLowerCase();

    // Find matching VA in the map (handle special cases)
    let youtubeUrl = null;

    // Direct lookup
    if (vaVideoMap[vaNameFromFile]) {
      youtubeUrl = vaVideoMap[vaNameFromFile];
    } else {
      // Try to find by partial match
      const keys = Object.keys(vaVideoMap);
      const match = keys.find(key => key.includes(vaNameFromFile) || vaNameFromFile.includes(key));
      if (match) {
        youtubeUrl = vaVideoMap[match];
      }
    }

    // Update the video section
    const updatedContent = updateVideoSection(content, vaNameFromFile, youtubeUrl);

    // Write back to file
    fs.writeFileSync(filePath, updatedContent, 'utf-8');

    if (youtubeUrl && youtubeUrl !== 'NO VIDEO') {
      console.log(`✅ Updated: ${file} (${youtubeUrl})`);
      successCount++;
    } else {
      console.log(`⚠️  No video: ${file}`);
      noVideoCount++;
    }
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error.message);
    errorCount++;
  }
});

console.log(`\n📊 SUMMARY:`);
console.log(`✅ Videos updated: ${successCount}`);
console.log(`⚠️  No video (VIDEO IN PROGRESS): ${noVideoCount}`);
console.log(`❌ Errors: ${errorCount}`);
console.log(`📁 Total processed: ${successCount + noVideoCount + errorCount}`);
