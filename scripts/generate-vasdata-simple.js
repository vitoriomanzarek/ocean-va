import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the CSV file
const csvPath = path.join(__dirname, '../src/data/VAs Database - VA Merged with licenced VA.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Simple CSV parser (handles quoted fields)
function parseCSV(content) {
  const lines = content.split('\n');
  const headers = parseCSVLine(lines[0]);
  
  const records = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    const values = parseCSVLine(lines[i]);
    const record = {};
    
    headers.forEach((header, index) => {
      record[header] = values[index] || '';
    });
    
    records.push(record);
  }
  
  return records;
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let insideQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];
    
    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        current += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

// Parse CSV
const records = parseCSV(csvContent);

// Map CSV to vasData format
const vasData = records.map((record, index) => {
  // Parse specializations from semicolon-separated string
  const specializations = record.Specialization 
    ? record.Specialization.split(';').map(s => s.trim()).filter(s => s)
    : [];

  // Parse main categories from semicolon-separated string
  const mainCategoriesArray = record['Main Categories']
    ? record['Main Categories'].split(';').map(s => s.trim()).filter(s => s)
    : [];

  // Parse experience
  let yearsExp = null;
  if (record['Experience (Years)']) {
    const match = record['Experience (Years)'].match(/(\d+(?:\.\d+)?)/);
    yearsExp = match ? parseFloat(match[1]) : null;
  }

  return {
    id: index + 1,
    nombre: record.Name,
    slug: record.Slug,
    categoría_principal: record.Title,
    categorías: mainCategoriesArray,
    idiomas: record.Languages,
    años_experiencia: yearsExp,
    especialización: specializations,
    nivel_inglés: record['English Description'] || '',
    disponibilidad: record.Availability,
    horario: '',
    imagen: record['VA Image'] || `/images/VAs/${record.Name}.webp`,
    videoUrl: record['Video URL'] || '',
    youtubeUrl: record['YouTube URL'] || '',
    summary: record.Summary || '',
    tagline: record.Tagline || '',
    thumbnail: record['Thumbnail Description'] || '',
    discResult: record['DISC Description'] || '',
    profileSlug: record['Profile Slug'] || `/${record.Slug}-ocean-va-profile`,
    itemId: record['Item ID'] || '',
    collectionId: record['Collection ID'] || '',
  };
});

// Generate JavaScript file
const jsContent = `export const vasData = ${JSON.stringify(vasData, null, 2)};
`;

// Write to file
const outputPath = path.join(__dirname, '../src/data/vasData.js');
fs.writeFileSync(outputPath, jsContent, 'utf-8');

console.log(`✅ Generated vasData.js with ${vasData.length} VAs`);
console.log(`📁 Output: ${outputPath}`);
