// Script para comparar VAs del CSV con los existentes en Webflow
import fs from 'fs';
import { parse } from 'csv-parse/sync';

const CSV_FILE = 'src/data/VAs Database - Executive Virtual Assistants.csv';
const WEBFLOW_ITEMS_FILE = 'src/data/webflow-vas-temp.json';

// Leer CSV
const csvContent = fs.readFileSync(CSV_FILE, 'utf-8');
const lines = csvContent.split('\n').filter(line => line.trim());
const headers = lines[0].split(';');

const csvVAs = [];
for (let i = 1; i < lines.length; i++) {
  const values = lines[i].split(';');
  const va = {};
  headers.forEach((header, index) => {
    va[header.trim()] = values[index]?.trim() || '';
  });
  csvVAs.push(va);
}

// Mapear campos CSV a Webflow
function mapCSVToWebflow(csvVA) {
  return {
    slug: csvVA.Slug,
    name: csvVA.Name,
    'experience-years': csvVA['Experience (Years)'],
    languages: csvVA.Languages,
    availability: csvVA.Availability,
    'main-category': csvVA['Main Category'],
    'main-categories': csvVA['Main Categories'],
    image: csvVA['VA Image'],
    'profile-slug-2': csvVA['Profile Slug'],
    specialization: csvVA.Specialization,
    video: csvVA.Video,
    'item-id': csvVA['Item ID']
  };
}

// Normalizar specializations del CSV
function parseSpecializations(specString) {
  if (!specString) return [];
  return specString
    .split(/[,;]/)
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .map(s => s.toLowerCase());
}

// Normalizar main categories del CSV
function parseMainCategories(catString) {
  if (!catString) return [];
  return catString
    .split(',')
    .map(c => c.trim())
    .filter(c => c.length > 0);
}

// Comparar dos valores
function compareValues(val1, val2, fieldName) {
  if (fieldName === 'specialization' || fieldName === 'main-categories') {
    // Para arrays, comparar como sets
    const arr1 = Array.isArray(val1) ? val1.map(v => String(v).toLowerCase()) : [];
    const arr2 = Array.isArray(val2) ? val2.map(v => String(v).toLowerCase()) : [];
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    return set1.size === set2.size && [...set1].every(v => set2.has(v));
  }
  
  if (fieldName === 'image') {
    // Para imágenes, comparar URLs
    const url1 = typeof val1 === 'object' ? val1?.url : val1;
    const url2 = typeof val2 === 'object' ? val2?.url : val2;
    return url1 === url2;
  }
  
  return String(val1 || '').trim() === String(val2 || '').trim();
}

// Analizar diferencias
const report = {
  nuevos: [],
  existentes: [],
  diferencias: []
};

// VAs del CSV mapeados
const csvVAsMapped = csvVAs.map(mapCSVToWebflow);
const csvSlugs = new Set(csvVAsMapped.map(v => v.slug));

console.log('📊 Análisis de VAs: CSV vs Webflow\n');
console.log(`Total en CSV: ${csvVAsMapped.length}`);
console.log(`Total en Webflow: ${65} (según última consulta)\n`);

// Leer items de Webflow (necesitamos obtenerlos de nuevo o usar los que ya tenemos)
// Por ahora, vamos a crear el reporte basado en lo que sabemos

// Crear reporte detallado
const reporteDetallado = {
  fecha: new Date().toISOString(),
  resumen: {
    totalCSV: csvVAsMapped.length,
    nuevos: 0,
    existentes: 0,
    conDiferencias: 0
  },
  nuevos: [],
  existentes: [],
  diferencias: []
};

// Guardar datos del CSV para comparación
fs.writeFileSync('src/data/csv-vas-mapped.json', JSON.stringify(csvVAsMapped, null, 2));

console.log('✅ Datos del CSV mapeados y guardados en: src/data/csv-vas-mapped.json');
console.log('\n📋 VAs en CSV:');
csvVAsMapped.forEach((va, index) => {
  console.log(`${index + 1}. ${va.name} (${va.slug})`);
});

console.log('\n⚠️  Nota: Para comparar con Webflow, necesito los items actuales.');
console.log('   Ejecuta el script de comparación completo para ver diferencias.');

