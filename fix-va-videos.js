import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List of 65 VAs in order (211-275)
const vaList = [
  'Adrian', 'Yvette', 'Grace', 'Janet', 'Pavel', 'Albert', 'Kathleen', 'Jill', 'Jasmine', 'Gizelle',
  'Raydon', 'Michelle', 'Lorenz', 'Laurice', 'Joji Marie', 'Jerome', 'Javier', 'Jay Alvin', 'Francis', 'Emmanuel',
  'Cherry Mae', 'Moises', 'Karen', 'Ivan', 'Dafne', 'Alejandro', 'Ximena G.', 'Tricia', 'Joana', 'Maria Paula',
  'Abigail', 'Antonio', 'Ana', 'Ana Victoria', 'Balbina', 'Brandon L.', 'Carolina', 'Christine', 'Fernanda', 'Ellen',
  'Dawn', 'Dayana', 'Gonzalo', 'Guillermo', 'Kevin', 'Israel', 'Janice', 'Lois', 'Maria D.', 'Maria',
  'Melissa', 'Patricia', 'Rafael', 'Rainier', 'Rejean', 'Ximena G.', 'Rochelle', 'Sandra', 'Anahi', 'AC',
  'Mina', 'Ma. Venus', 'Rejean Mae', 'Rona Mae', 'Jimmy', 'Joel'
];

// Read CSV file
const csvPath = path.join(__dirname, 'src/data/VAs Database - VA Merged with licenced VA.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');
const records = parse(csvContent, {
  columns: true,
  skip_empty_lines: true
});

// Create a map of VA names to YouTube URLs (case-insensitive)
const vaVideoMap = {};
records.forEach(record => {
  const name = record['Name.1'] || record['Name'];
  const youtubeUrl = record['YouTube URL'];
  if (name && youtubeUrl && youtubeUrl !== 'NO VIDEO') {
    // Store with multiple variations for better matching
    vaVideoMap[name.toLowerCase()] = youtubeUrl;
    vaVideoMap[name.toLowerCase().replace(/\s+/g, '')] = youtubeUrl;
  }
});

console.log('VA Video Map created with', Object.keys(vaVideoMap).length, 'entries');
console.log('Sample entries:', Object.keys(vaVideoMap).slice(0, 10));

// Function to extract YouTube ID from URL
function getYoutubeId(url) {
  if (!url) return null;
  let match = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (match) return match[1];
  
  match = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
  if (match) return match[1];
  
  return null;
}

// Function to generate thumbnail URL
function getThumbnailUrl(youtubeId) {
  return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
}

// Function to update video section
function updateVideoSection(content, youtubeUrl) {
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

// Process all HTML files using the VA list
const componentsDir = path.join(__dirname, 'webflow-components');

let successCount = 0;
let noVideoCount = 0;
let errorCount = 0;

vaList.forEach((vaName, index) => {
  const fileNumber = 211 + index;
  const file = `${fileNumber}-${vaName.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '')}-profile.html`;
  
  // Find actual file (case-insensitive)
  const files = fs.readdirSync(componentsDir);
  const actualFile = files.find(f => {
    const num = parseInt(f.split('-')[0]);
    return num === fileNumber;
  });

  if (!actualFile) {
    console.log(`⚠️  File not found for ${fileNumber}: ${vaName}`);
    return;
  }

  const filePath = path.join(componentsDir, actualFile);

  try {
    let content = fs.readFileSync(filePath, 'utf-8');

    // Find matching VA in the map
    let youtubeUrl = null;
    const vaNameLower = vaName.toLowerCase();
    const vaNameNoSpaces = vaNameLower.replace(/\s+/g, '');

    // Try exact match first
    if (vaVideoMap[vaNameLower]) {
      youtubeUrl = vaVideoMap[vaNameLower];
    } else if (vaVideoMap[vaNameNoSpaces]) {
      youtubeUrl = vaVideoMap[vaNameNoSpaces];
    } else {
      // Try partial match
      const keys = Object.keys(vaVideoMap);
      const match = keys.find(key => 
        key.includes(vaNameNoSpaces) || 
        vaNameNoSpaces.includes(key.replace(/\s+/g, ''))
      );
      if (match) {
        youtubeUrl = vaVideoMap[match];
      }
    }

    // Update the video section
    const updatedContent = updateVideoSection(content, youtubeUrl);

    // Write back to file
    fs.writeFileSync(filePath, updatedContent, 'utf-8');

    if (youtubeUrl && youtubeUrl !== 'NO VIDEO') {
      console.log(`✅ ${fileNumber}: ${vaName} - Video updated`);
      successCount++;
    } else {
      console.log(`⚠️  ${fileNumber}: ${vaName} - No video`);
      noVideoCount++;
    }
  } catch (error) {
    console.error(`❌ Error processing ${actualFile}:`, error.message);
    errorCount++;
  }
});

console.log(`\n📊 FINAL SUMMARY:`);
console.log(`✅ Videos updated: ${successCount}`);
console.log(`⚠️  No video (VIDEO IN PROGRESS): ${noVideoCount}`);
console.log(`❌ Errors: ${errorCount}`);
console.log(`📁 Total processed: ${successCount + noVideoCount + errorCount}`);
