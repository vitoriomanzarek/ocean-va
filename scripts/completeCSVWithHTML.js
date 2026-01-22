/**
 * Script para completar el CSV con campos HTML faltantes
 * Genera: skills-richtext, tools-richtext, equipment-richtext, cerf-result (HTML)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFile = path.join(__dirname, '../src/data/carga-vas-2026.csv');
const outputFile = path.join(__dirname, '../src/data/carga-vas-2026.csv');

// CEFR Descriptions (igual que en el formulario)
const CEFR_DESCRIPTIONS = {
  'A1': 'Can understand and use familiar everyday expressions and basic questions about personal details.',
  'A2': 'Can have very short social exchanges and give information on familiar and routine matters when traveling.',
  'B1': 'Can briefly describe past events and future plans, give reasons for opinions and explain advantages and disadvantages.',
  'B2': 'Can communicate confidently in a variety of academic and professional environments.',
  'C1': 'Can use the language flexibly and effectively for social, academic and professional purposes.',
  'C2': 'Can interact with ease and can differentiate their shades of meaning.'
};

// Función para escapar HTML
function escapeHtml(text) {
  if (!text) return '';
  const div = {
    textContent: text
  };
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Generar HTML de Skills
function generateSkillsHTML(skillsString) {
  if (!skillsString || typeof skillsString !== 'string') return '';
  
  const skills = skillsString.split(',').map(s => s.trim()).filter(Boolean);
  if (skills.length === 0) return '';
  
  const tags = skills.map(skill => 
    `<span class="va-skill-tag">${escapeHtml(skill)}</span>`
  ).join('');
  
  return tags;
}

// Generar HTML de Tools
function generateToolsHTML(toolsString) {
  if (!toolsString || typeof toolsString !== 'string') return '';
  
  const tools = toolsString.split(',').map(t => t.trim()).filter(Boolean);
  if (tools.length === 0) return '';
  
  const items = tools.map(tool => 
    `<div class="va-tool-item"><span class="va-tool-checkmark">✓</span><span>${escapeHtml(tool)}</span></div>`
  ).join('');
  
  return `<div class="va-tools-list">${items}</div>`;
}

// Generar HTML de Equipment
function generateEquipmentHTML(equipmentString) {
  if (!equipmentString || typeof equipmentString !== 'string') return '';
  
  const equipment = equipmentString.split(',').map(e => e.trim()).filter(Boolean);
  if (equipment.length === 0) return '';
  
  const items = equipment.map(item => 
    `<div class="va-equipment-item"><svg class="va-equipment-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span>${escapeHtml(item)}</span></div>`
  ).join('');
  
  return `<div class="va-equipment-list">${items}</div>`;
}

// Generar HTML de CEFR
function generateCEFRHTML(activeLevel) {
  if (!activeLevel) return '';
  
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  
  const items = levels.map(level => {
    const isActive = level === activeLevel;
    const bubbleClass = isActive ? 'va-cefr-bubble-active' : 'va-cefr-bubble-inactive';
    const description = CEFR_DESCRIPTIONS[level] || '';
    
    return `<div class="va-cefr-item"><div class="va-cefr-bubble ${bubbleClass}">${escapeHtml(level)}</div><p class="va-cefr-description">${escapeHtml(description)}</p></div>`;
  }).join('\n');
  
  return items;
}

// Función principal
function main() {
  console.log('📝 Completando CSV con campos HTML...\n');
  
  // Leer CSV
  const csvContent = fs.readFileSync(inputFile, 'utf8');
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true
  });
  
  console.log(`📊 Total de registros: ${records.length}\n`);
  
  // Procesar cada registro
  records.forEach((record, index) => {
    const name = record.name || '';
    
    // Generar HTML de Skills
    if (record['skills-tags'] && !record['skills-richtext']) {
      record['skills-richtext'] = generateSkillsHTML(record['skills-tags']);
    }
    
    // Generar HTML de Tools
    if (record['tools-tags'] && !record['tools-richtext']) {
      record['tools-richtext'] = generateToolsHTML(record['tools-tags']);
    }
    
    // Generar HTML de Equipment
    if (record['equipment-tags'] && !record['equipment-richtext']) {
      record['equipment-richtext'] = generateEquipmentHTML(record['equipment-tags']);
    }
    
    // Generar HTML de CEFR
    if (record['cerf-result'] && typeof record['cerf-result'] === 'string') {
      // Si cerf-result es solo un nivel (A1, B2, C1, etc.), generar HTML
      const cefrLevel = record['cerf-result'].trim();
      if (/^[A-C][1-2]$/.test(cefrLevel)) {
        record['cerf-result'] = generateCEFRHTML(cefrLevel);
        // También agregar englishCefrHtml para compatibilidad
        record['englishCefrHtml'] = generateCEFRHTML(cefrLevel);
      }
    }
    
    if ((index + 1) % 10 === 0) {
      console.log(`   ✅ Procesados ${index + 1}/${records.length}...`);
    }
  });
  
  // Obtener todas las columnas
  const allColumns = new Set();
  records.forEach(row => {
    Object.keys(row).forEach(key => allColumns.add(key));
  });
  
  // Ordenar columnas - mantener el mismo orden que antes
  const priorityColumns = [
    'name',
    'slug',
    'profile-slug-2',
    'title',
    'main-category',
    'image',
    'video',
    'summary',
    'tagline',
    'thumbnail-description',
    'availability',
    'language',
    'experience-years',
    'skills-tags',
    'skills-richtext',
    'tools-tags',
    'tools-richtext',
    'equipment-tags',
    'equipment-richtext',
    'employment-summary',
    'employment-richtext',
    'education-richtext',
    'disc-type',
    'disc-description',
    'english-test-type',
    'english-score',
    'english-description',
    'cerf-result',
    'englishCefrHtml'
  ];
  
  const columns = [];
  priorityColumns.forEach(col => {
    if (allColumns.has(col)) {
      columns.push(col);
      allColumns.delete(col);
    }
  });
  
  // Agregar el resto
  const remainingColumns = Array.from(allColumns).sort();
  columns.push(...remainingColumns);
  
  // Generar CSV
  const output = stringify(records, {
    header: true,
    columns: columns,
    quoted: true,
    quoted_empty: false
  });
  
  // Escribir archivo
  fs.writeFileSync(outputFile, output, 'utf8');
  
  console.log('\n═'.repeat(80));
  console.log('\n📊 RESUMEN:\n');
  console.log(`  ✅ Registros procesados: ${records.length}`);
  console.log(`  📄 Archivo actualizado: ${outputFile}`);
  console.log(`  📋 Columnas: ${columns.length}`);
  console.log('\n✅ CSV completado exitosamente!\n');
  console.log('═'.repeat(80));
}

// Ejecutar
main();
