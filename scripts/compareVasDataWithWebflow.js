/**
 * Compare vasData.js with Webflow CMS data
 * Run with: node scripts/compareVasDataWithWebflow.js
 */

import { vasData } from '../src/data/vasData.js';
import fs from 'fs';

// Read the webflow export file
const webflowExport = JSON.parse(fs.readFileSync('webflow-vas-export.json', 'utf-8'));

console.log('📊 Comparison: vasData.js vs Webflow CMS\n');
console.log('═'.repeat(80));

// Create maps for easy lookup
const vasDataMap = new Map(vasData.map((va) => [va.nombre, va]));
const webflowMap = new Map(webflowExport.vas.map((va) => [va.fieldData.name, va]));

console.log(`\n📍 vasData.js Total: ${vasData.length}`);
console.log(`📍 Webflow CMS Total: ${webflowExport.vas.length}\n`);

// Find VAs in vasData but not in Webflow
const missingInWebflow = vasData.filter((va) => !webflowMap.has(va.nombre));

// Find VAs in Webflow but not in vasData
const extraInWebflow = webflowExport.vas.filter((va) => !vasDataMap.has(va.fieldData.name));

// Check for differences in data
console.log('═'.repeat(80));
console.log('\n✅ MATCHES (VAs in both vasData.js and Webflow CMS):\n');

let matchCount = 0;
vasData.forEach((va) => {
  const webflowVA = webflowMap.get(va.nombre);
  if (webflowVA) {
    matchCount++;
    const isDraft = webflowVA.isDraft ? '📝 Draft' : '✅ Published';
    console.log(`  ✓ ${va.nombre.padEnd(20)} | vasData ID: ${va.id} | Webflow: ${webflowVA.fieldData.name} | ${isDraft}`);
  }
});

console.log(`\n   Total matches: ${matchCount}/${vasData.length}`);

// Missing in Webflow
if (missingInWebflow.length > 0) {
  console.log('\n' + '═'.repeat(80));
  console.log('\n❌ MISSING IN WEBFLOW CMS (in vasData.js but not in Webflow):\n');
  missingInWebflow.forEach((va) => {
    console.log(`  ✗ ${va.nombre.padEnd(20)} | ID: ${va.id} | Slug: ${va.slug}`);
  });
  console.log(`\n   Total missing: ${missingInWebflow.length}`);
}

// Extra in Webflow
if (extraInWebflow.length > 0) {
  console.log('\n' + '═'.repeat(80));
  console.log('\n⚠️  EXTRA IN WEBFLOW CMS (in Webflow but not in vasData.js):\n');
  extraInWebflow.forEach((va) => {
    const isDraft = va.isDraft ? '📝 Draft' : '✅ Published';
    console.log(`  ⚠ ${va.fieldData.name.padEnd(20)} | Slug: ${va.fieldData.slug} | ${isDraft}`);
  });
  console.log(`\n   Total extra: ${extraInWebflow.length}`);
}

// Summary
console.log('\n' + '═'.repeat(80));
console.log('\n📋 SUMMARY:\n');
console.log(`  vasData.js Total:        ${vasData.length}`);
console.log(`  Webflow CMS Total:       ${webflowExport.vas.length}`);
console.log(`  Matches:                 ${matchCount}`);
console.log(`  Missing in Webflow:      ${missingInWebflow.length}`);
console.log(`  Extra in Webflow:        ${extraInWebflow.length}`);

if (missingInWebflow.length === 0 && extraInWebflow.length === 0) {
  console.log('\n✅ vasData.js and Webflow CMS are in perfect sync!\n');
} else {
  console.log('\n⚠️  Data is out of sync. Review the differences above.\n');
}

console.log('═'.repeat(80));
