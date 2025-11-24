import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsDir = path.join(__dirname, 'webflow-components');
const files = fs.readdirSync(componentsDir).filter(f => f.match(/^\d+-.*-profile\.html$/));

let successCount = 0;
let errorCount = 0;
const modifiedFiles = [];

files.forEach(file => {
  const fileNumber = parseInt(file.split('-')[0]);
  
  // Only process files 211-275
  if (fileNumber < 211 || fileNumber > 275) {
    return;
  }

  const filePath = path.join(componentsDir, file);

  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Check if file contains literal \n (escaped newline in HTML)
    if (content.includes('\\n')) {
      // Replace all occurrences of \n with <br>
      const updatedContent = content.replace(/\\n/g, '<br>');
      
      // Write back to file
      fs.writeFileSync(filePath, updatedContent, 'utf-8');
      
      console.log(`✅ ${fileNumber}: ${file} - Replaced \\n with <br>`);
      modifiedFiles.push({ number: fileNumber, file: file });
      successCount++;
    }
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error.message);
    errorCount++;
  }
});

console.log(`\n📊 SUMMARY:`);
console.log(`✅ Files modified: ${successCount}`);
console.log(`❌ Errors: ${errorCount}`);
console.log(`📁 Total processed: ${successCount + errorCount}`);

if (modifiedFiles.length > 0) {
  console.log(`\n📋 Modified files:`);
  modifiedFiles.forEach(f => {
    console.log(`   ${f.number}: ${f.file}`);
  });
}
