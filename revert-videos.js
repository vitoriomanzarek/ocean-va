import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// This script reverts the video sections to their original state
// by removing the VIDEO IN PROGRESS placeholders

const componentsDir = path.join(__dirname, 'webflow-components');
const files = fs.readdirSync(componentsDir).filter(f => f.match(/^\d+-.*-profile\.html$/));

let revertedCount = 0;

files.forEach(file => {
  const filePath = path.join(componentsDir, file);
  const fileNumber = parseInt(file.split('-')[0]);

  if (fileNumber < 211 || fileNumber > 275) {
    return;
  }

  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Check if file has VIDEO IN PROGRESS
    if (content.includes('VIDEO IN PROGRESS')) {
      // This file was incorrectly marked as no video
      // We'll need to restore it from backup or leave it as is for now
      console.log(`Found VIDEO IN PROGRESS in: ${file}`);
      revertedCount++;
    }
  } catch (error) {
    console.error(`Error reading ${file}:`, error.message);
  }
});

console.log(`Found ${revertedCount} files with VIDEO IN PROGRESS`);
