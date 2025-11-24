import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List of 24 VAs with "Not provided" in Education
const vasToUpdate = [
  221, 222, 224, 225, 226, 228, 230, 234, 235, 237, 244, 253, 254, 256, 258, 259, 262, 264, 265, 266, 271, 272, 273, 274
];

const componentsDir = path.join(__dirname, 'webflow-components');
const files = fs.readdirSync(componentsDir).filter(f => f.match(/^\d+-.*-profile\.html$/));

let successCount = 0;
let errorCount = 0;

vasToUpdate.forEach(vaNumber => {
  // Find the actual file for this VA number
  const actualFile = files.find(f => {
    const num = parseInt(f.split('-')[0]);
    return num === vaNumber;
  });

  if (!actualFile) {
    console.log(`⚠️  File not found for ${vaNumber}`);
    return;
  }

  const filePath = path.join(componentsDir, actualFile);

  try {
    let content = fs.readFileSync(filePath, 'utf-8');

    // Pattern to match the entire Education section
    // Matches from <!-- Education Section --> to </section> (the closing section tag)
    const educationPattern = /\s*<!-- Education Section -->[\s\S]*?<\/section>\s*<\/div>\s*$/;
    
    // Remove the Education section
    const updatedContent = content.replace(educationPattern, '\n</div>');

    // Write back to file
    fs.writeFileSync(filePath, updatedContent, 'utf-8');

    console.log(`✅ ${vaNumber}: Removed Education section`);
    successCount++;
  } catch (error) {
    console.error(`❌ Error processing ${actualFile}:`, error.message);
    errorCount++;
  }
});

console.log(`\n📊 SUMMARY:`);
console.log(`✅ Education sections removed: ${successCount}`);
console.log(`❌ Errors: ${errorCount}`);
console.log(`📁 Total processed: ${successCount + errorCount}`);
