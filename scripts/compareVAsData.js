/**
 * Compare VAs from the live website with vasData.js
 * Lists VAs found on the website and identifies what's missing or different in vasData.js
 */

import { vasData } from '../src/data/vasData.js';

// VAs listed on the website (from the page content)
const websiteVAsFullTime = [
  'Abigail', 'Adrian', 'Alejandro', 'AC', 'Anahi', 'Antonio', 'Cherry Mae',
  'Dafne', 'Dayana', 'Emmanuel', 'Francis', 'Geraldine', 'Grace', 'Gizelle',
  'Ivan', 'Jasmine', 'Javier', 'Jay Alvin', 'Jerome', 'Jill', 'Jimmy', 'Joana',
  'Joel', 'Joji Marie', 'Karen', 'Laurice', 'Lorenz', 'Ma. Venus', 'Maria Paula',
  'Mina', 'Michelle', 'Moises', 'Pavel', 'Raydon', 'Rona Mae', 'Tricia', 'Yvette'
];

const websiteVAsAssigned = [
  'Ana', 'Ana Victoria', 'Balbina', 'Brandon L.', 'Carolina', 'Christine', 'Dawn',
  'Ellen', 'Fernanda', 'Gonzalo', 'Guillermo', 'Israel', 'Janice', 'Kevin', 'Lois',
  'Maria D.', 'Maria', 'Melissa', 'Patricia', 'Rafael', 'Rainier', 'Rejean',
  'Rochelle', 'Sandra', 'Ximena G.'
];

const allWebsiteVAs = [...websiteVAsFullTime, ...websiteVAsAssigned];

console.log('📊 VA Comparison Report\n');
console.log('═'.repeat(80));

// Create a map of vasData by nombre for easy lookup
const vasDataMap = new Map(vasData.map((va) => [va.nombre, va]));

console.log(`\n📍 Website VAs: ${allWebsiteVAs.length}`);
console.log(`   - Full Time & Part Time: ${websiteVAsFullTime.length}`);
console.log(`   - Assigned: ${websiteVAsAssigned.length}`);

console.log(`\n📍 vasData.js VAs: ${vasData.length}\n`);

// Find VAs in website but not in vasData
const missingInVasData = allWebsiteVAs.filter((name) => !vasDataMap.has(name));

// Find VAs in vasData but not on website
const extraInVasData = vasData.filter((va) => !allWebsiteVAs.includes(va.nombre));

// Check for differences
console.log('═'.repeat(80));
console.log('\n✅ MATCHES (VAs in both website and vasData.js):\n');

const matches = allWebsiteVAs.filter((name) => vasDataMap.has(name));
matches.forEach((name) => {
  const va = vasDataMap.get(name);
  console.log(`  ✓ ${name.padEnd(20)} | Disponibilidad: ${va.disponibilidad.padEnd(12)} | ID: ${va.id}`);
});

console.log(`\n   Total: ${matches.length}/${allWebsiteVAs.length}`);

// Missing in vasData
if (missingInVasData.length > 0) {
  console.log('\n' + '═'.repeat(80));
  console.log('\n❌ MISSING IN vasData.js (found on website but not in vasData.js):\n');
  missingInVasData.forEach((name) => {
    console.log(`  ✗ ${name}`);
  });
  console.log(`\n   Total missing: ${missingInVasData.length}`);
}

// Extra in vasData
if (extraInVasData.length > 0) {
  console.log('\n' + '═'.repeat(80));
  console.log('\n⚠️  EXTRA IN vasData.js (in vasData.js but not on website):\n');
  extraInVasData.forEach((va) => {
    console.log(`  ⚠ ${va.nombre.padEnd(20)} | Disponibilidad: ${va.disponibilidad.padEnd(12)} | ID: ${va.id}`);
  });
  console.log(`\n   Total extra: ${extraInVasData.length}`);
}

// Summary
console.log('\n' + '═'.repeat(80));
console.log('\n📋 SUMMARY:\n');
console.log(`  Website Total:        ${allWebsiteVAs.length}`);
console.log(`  vasData.js Total:     ${vasData.length}`);
console.log(`  Matches:              ${matches.length}`);
console.log(`  Missing in vasData:   ${missingInVasData.length}`);
console.log(`  Extra in vasData:     ${extraInVasData.length}`);

if (missingInVasData.length === 0 && extraInVasData.length === 0) {
  console.log('\n✅ All VAs are in sync!\n');
} else {
  console.log('\n⚠️  Data is out of sync. Review the differences above.\n');
}

console.log('═'.repeat(80));
