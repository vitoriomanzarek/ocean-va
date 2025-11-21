import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the CSV file
const csvPath = path.join(__dirname, '../src/data/VAs Database - VA Merged with licenced VA.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Parse CSV
const records = parse(csvContent, {
  columns: true,
  skip_empty_lines: true,
});

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

  return {
    id: index + 1,
    nombre: record.Name,
    slug: record.Slug,
    categoría_principal: record.Title, // Main title (text)
    categorías: mainCategoriesArray, // Main categories (multireference)
    idiomas: record.Languages,
    años_experiencia: record['Experience (Years)'] ? 
      (record['Experience (Years)'].includes('years') ? 
        parseFloat(record['Experience (Years)']) : 
        record['Experience (Years)']) : 
      null,
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
