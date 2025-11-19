/**
 * Extract all unique specializations from vasData.js
 * Run with: node scripts/extractSpecializations.js
 */

import { vasData } from '../src/data/vasData.js';
import fs from 'fs';

console.log('📊 Extracting specializations from vasData.js...\n');

// Extract all unique specializations
const allSpecializations = new Set();
const specializationsByVA = {};

vasData.forEach((va) => {
  specializationsByVA[va.nombre] = va.especialización;
  va.especialización.forEach((spec) => {
    allSpecializations.add(spec);
  });
});

const specializationsList = Array.from(allSpecializations).sort();

console.log(`📋 Total unique specializations: ${specializationsList.length}\n`);
console.log('═'.repeat(80));
console.log('\n🏷️  SPECIALIZATIONS LIST:\n');

specializationsList.forEach((spec, index) => {
  console.log(`${index + 1}. ${spec}`);
});

console.log('\n' + '═'.repeat(80));

// Generate slug for each specialization
console.log('\n📝 SPECIALIZATIONS WITH SLUGS (for Webflow):\n');

const specializationsWithSlugs = specializationsList.map((spec) => ({
  name: spec,
  slug: spec
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
    .replace(/-+/g, '-'),
}));

console.log('JSON Format:\n');
console.log(JSON.stringify(specializationsWithSlugs, null, 2));

// Save to file
fs.writeFileSync('specializations-list.json', JSON.stringify(specializationsWithSlugs, null, 2));

console.log('\n✅ Specializations saved to: specializations-list.json\n');

// Show VAs per specialization
console.log('═'.repeat(80));
console.log('\n👥 VAS PER SPECIALIZATION:\n');

const vasBySpecialization = {};
specializationsList.forEach((spec) => {
  vasBySpecialization[spec] = [];
  vasData.forEach((va) => {
    if (va.especialización.includes(spec)) {
      vasBySpecialization[spec].push(va.nombre);
    }
  });
});

Object.entries(vasBySpecialization).forEach(([spec, vas]) => {
  console.log(`\n${spec} (${vas.length} VAs):`);
  vas.forEach((va) => {
    console.log(`  • ${va}`);
  });
});

console.log('\n' + '═'.repeat(80));
