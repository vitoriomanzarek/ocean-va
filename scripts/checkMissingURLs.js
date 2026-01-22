/**
 * Script para verificar qué VAs no tienen URL en el CSV
 */

import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const CSV_FILE = path.join(process.cwd(), 'src/data/carga-vas-2026.csv');
const DATA_FILE = path.join(process.cwd(), 'src/data/datos-extraidos-para-revision.json');

const csv = fs.readFileSync(CSV_FILE, 'utf8');
const records = parse(csv, { columns: true, skip_empty_lines: true, trim: true });

const extractedData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

const missingSlugs = extractedData
  .filter(v => v.needsTools && (!v.extracted.tools || !v.extracted.tools.html))
  .map(v => v.slug.toLowerCase());

console.log('════════════════════════════════════════════════════════════════════════════════');
console.log('🔍 VERIFICANDO URLs FALTANTES EN CSV');
console.log('════════════════════════════════════════════════════════════════════════════════\n');

console.log(`Total VAs que necesitan Tools/Equipment: ${missingSlugs.length}\n`);

let foundInCSV = 0;
let missingInCSV = 0;
let hasProfileSlug = 0;
let hasSourceUrl = 0;
let hasBoth = 0;

missingSlugs.forEach(slug => {
  const record = records.find(r => r.slug && r.slug.toLowerCase() === slug.toLowerCase());
  
  if (record) {
    foundInCSV++;
    const profileSlug = record['profile-slug-2'] || '';
    const sourceUrl = record['_source-url'] || '';
    
    if (profileSlug) {
      hasProfileSlug++;
      console.log(`✅ ${slug}:`);
      console.log(`   profile-slug-2: ${profileSlug.substring(0, 80)}...`);
    } else {
      console.log(`⚠️  ${slug}:`);
      console.log(`   profile-slug-2: (VACÍO)`);
    }
    
    if (sourceUrl) {
      hasSourceUrl++;
      console.log(`   _source-url: ${sourceUrl.substring(0, 80)}...`);
    } else {
      console.log(`   _source-url: (VACÍO)`);
    }
    
    if (profileSlug && sourceUrl) {
      hasBoth++;
    }
    
    console.log('');
  } else {
    missingInCSV++;
    console.log(`❌ ${slug}: NO ENCONTRADO EN CSV\n`);
  }
});

console.log('════════════════════════════════════════════════════════════════════════════════');
console.log('📊 RESUMEN');
console.log('════════════════════════════════════════════════════════════════════════════════\n');

console.log(`VAs encontrados en CSV: ${foundInCSV}`);
console.log(`VAs NO encontrados en CSV: ${missingInCSV}`);
console.log(`VAs con profile-slug-2: ${hasProfileSlug}`);
console.log(`VAs con _source-url: ${hasSourceUrl}`);
console.log(`VAs con ambas URLs: ${hasBoth}\n`);

console.log('💡 SOLUCIÓN:');
if (hasSourceUrl > 0 && hasProfileSlug < hasSourceUrl) {
  console.log('   - El script puede usar _source-url como alternativa');
  console.log('   - Necesitamos modificar el script para usar _source-url cuando profile-slug-2 esté vacío');
} else if (hasProfileSlug === 0) {
  console.log('   - Ninguno de estos VAs tiene URL en el CSV');
  console.log('   - Necesitas agregar las URLs manualmente al CSV o proporcionar otro método');
} else {
  console.log('   - Algunos VAs tienen URLs pero el script no las encontró');
  console.log('   - Puede ser un problema de matching de slugs');
}
