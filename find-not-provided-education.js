import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsDir = path.join(__dirname, 'webflow-components');
const files = fs.readdirSync(componentsDir).filter(f => f.match(/^\d+-.*-profile\.html$/));

const notProvidedList = [];

files.forEach(file => {
  const fileNumber = parseInt(file.split('-')[0]);
  
  // Only check files 211-275
  if (fileNumber < 211 || fileNumber > 275) {
    return;
  }

  const filePath = path.join(componentsDir, file);
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Check if file contains "Not provided" in Education section
    if (content.includes('Not provided')) {
      // Extract VA name from filename
      const vaNameMatch = file.match(/\d+-(.+?)-profile\.html/);
      const vaName = vaNameMatch ? vaNameMatch[1] : 'Unknown';
      
      notProvidedList.push({
        number: fileNumber,
        name: vaName,
        file: file
      });
    }
  } catch (error) {
    console.error(`Error reading ${file}:`, error.message);
  }
});

console.log(`\n📋 VAs with "Not provided" in Education Section:\n`);
console.log(`Total found: ${notProvidedList.length}\n`);

notProvidedList.forEach(va => {
  console.log(`${va.number}. ${va.name.replace(/-/g, ' ').toUpperCase()}`);
});

console.log(`\n✅ Complete list above`);
