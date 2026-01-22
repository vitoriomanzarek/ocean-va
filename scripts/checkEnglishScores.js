import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvFile = path.join(__dirname, '../src/data/carga-vas-2026.csv');

const VAS_TO_CHECK = ['fabiola', 'maria', 'fernanda', 'christine', 'maria-paula'];

// Leer CSV
const csvContent = fs.readFileSync(csvFile, 'utf-8');
const records = parse(csvContent, {
  columns: true,
  skip_empty_lines: true,
  trim: true
});

console.log('🔍 Verificando valores de english-score en CSV...\n');
console.log('═'.repeat(80));
console.log('');

let foundCount = 0;

for (const record of records) {
  const slug = (record.slug || '').toLowerCase().trim();
  
  if (VAS_TO_CHECK.includes(slug)) {
    foundCount++;
    const name = record.name || 'Unknown';
    const englishScore = record['english-score'] || '';
    
    console.log(`📋 ${name.toUpperCase()} (${slug})`);
    console.log(`   english-score en CSV: "${englishScore}"`);
    
    if (!englishScore || englishScore.trim() === '') {
      console.log(`   ⚠️  Campo vacío en CSV`);
    } else {
      console.log(`   ✅ Tiene valor: ${englishScore}`);
    }
    console.log('');
  }
}

if (foundCount < VAS_TO_CHECK.length) {
  console.log(`⚠️  Solo se encontraron ${foundCount} de ${VAS_TO_CHECK.length} VAs\n`);
}

console.log('═'.repeat(80));
