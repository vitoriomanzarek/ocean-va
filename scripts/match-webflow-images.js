#!/usr/bin/env node

/**
 * Match Webflow Image URLs with VA Names
 * Extracts VA names from URLs and matches them with vasData
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Webflow image URLs
const imageUrls = [
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/69127dbc3d850f85a5ac7854_Cherry%20Mae.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8e4658f99ec04bf1338_Anna.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d8fb4cb934bf34fbea_Maria%20D.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d82ea0944cf9a27fad_Moises.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d808ab483ef413b5a4_Lorenz.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d800cade68370ae2bd_Patricia.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d8a2c4eaefc8bdf89b_Michelle.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d832a39b976f928efd_Maria.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d84a0eb5d1ec0e85db_Ma%20Venus.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d8bf0d16a67d796ebc_Maria%20Paula.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d87955a4dd132ab57b_Melissa.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d7d2c85bb443792492_Lois.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d7dc544fabb458df9b_Jill.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d7201c78ec545b7e2c_Kevin.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d7d6b8bb8899b909af_Laurice.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d7b62ec13fcdb2352e_Jay%20Alvin.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d7cc9f336cba3243d1_Karen.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d7756529b8d6f82e64_Jerome.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d7bfb51d07abc54804_Joji%20Marie.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d7d3a9269a232c087c_Johana.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d74162d50e2a4cf540_Javier.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d755a86cdc95a748bb_Jimmy.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d790d2b6dd52e49d1d_Joel.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d66b6a9ccb30f922f0_Guillermo.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d6e926a944fc9b3bdd_Jasmine.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d6cc9f336cba32439b_Janet.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d66009cfe9aa7246f0_Gonzalo.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d69bc6c6b305798a5e_Fernanda.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d6ad9bbbbea950cd39_Geraldine.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d603e4c20b7c797f5f_Emmanuel.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d637032e6e94653a02_Janice.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d6d2c85bb443792446_Gizelle.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d6b37f8c43bae099f6_Ivan.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d6b01c191263cccfdb_Israel.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d6663e37de486152d3_Francis.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d5ce1af3810d83758c_Ellen.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d5fe1f53093ba3bfe6_Christine.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d5d746a6cf5bb7267c_Dayana.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d58619558948531fd2_Brandon%20L.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d5e8b404bf07609f0f_Balbina.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d5ebcbcb8ae3572a64_Carolina.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d57d576b7fccbc87e0_Anna%20Victoria.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d53cbf1ca607b02b2d_Dafne.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d51f3842a99b786f41_Antonio.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d5374a8caa568a7ffa_Dawn.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d460710f374d2ce4ff_Raidon.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d4cd15fbec43d91276_Alejandro.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d4d13b93a2381cc23a_Rochelle.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d48591ce6093bdf2c2_Abigail.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d48ceb2e681075ee67_Pavel.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d4a0a265a4f24afd4b_Rejean.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d468814006ba9e4466_Sandra.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d496a4c098ace60d8e_Rainier.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d41f7b9bba8c7a930b_Adrian.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d46fef50cb33110012_Ximena%20G.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d46a128c664d29b2f9_Rafael.webp",
  "https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/690ca8d4cf44374e7f56a63e_Rona%20Mae.webp"
];

// Extract VA names from URLs
function extractNameFromUrl(url) {
  // Get the filename part after the last underscore
  const filename = url.split('_').pop();
  // Remove .webp and decode URL encoding
  const name = decodeURIComponent(filename.replace('.webp', ''));
  return name.trim();
}

// Read vasData.js
const vasDataPath = path.join(__dirname, 'src', 'data', 'vasData.js');
const vasDataContent = fs.readFileSync(vasDataPath, 'utf-8');

// Parse vasData
const lines = vasDataContent.split('\n');
let currentVA = null;
const vas = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  
  if (line.startsWith('{')) {
    currentVA = {};
  } else if (line.startsWith('id:')) {
    currentVA.id = parseInt(line.match(/\d+/)[0]);
  } else if (line.startsWith('nombre:')) {
    currentVA.nombre = line.match(/"([^"]+)"/)[1];
  } else if (line.startsWith('slug:')) {
    currentVA.slug = line.match(/"([^"]+)"/)[1];
  } else if (line.startsWith('}') && currentVA && currentVA.id) {
    vas.push(currentVA);
    currentVA = null;
  }
}

console.log(`✅ Parsed ${vas.length} VAs from vasData.js\n`);
console.log(`📸 Processing ${imageUrls.length} image URLs...\n`);

// Create mapping
const imageMap = {};
const matches = [];
const unmatched = [];

imageUrls.forEach(url => {
  const vaName = extractNameFromUrl(url);
  
  // Find matching VA
  const matchedVA = vas.find(va => 
    va.nombre.toLowerCase() === vaName.toLowerCase()
  );
  
  if (matchedVA) {
    imageMap[matchedVA.nombre] = url;
    matches.push({
      nombre: matchedVA.nombre,
      slug: matchedVA.slug,
      url: url
    });
    console.log(`✅ ${matchedVA.nombre} → Found`);
  } else {
    unmatched.push(vaName);
    console.log(`❌ ${vaName} → Not found in vasData`);
  }
});

console.log(`\n📊 Results:`);
console.log(`   ✅ Matched: ${matches.length}`);
console.log(`   ❌ Unmatched: ${unmatched.length}`);

if (unmatched.length > 0) {
  console.log(`\n⚠️  Unmatched names:`);
  unmatched.forEach(name => console.log(`   - ${name}`));
}

// Export as JSON
const exportData = {
  totalImages: imageUrls.length,
  matched: matches.length,
  unmatched: unmatched.length,
  unmatchedNames: unmatched,
  imageMap: imageMap,
  matches: matches,
  exportedAt: new Date().toISOString()
};

fs.writeFileSync('webflow-image-mapping.json', JSON.stringify(exportData, null, 2));
console.log(`\n✅ Exported mapping to: webflow-image-mapping.json`);

// Create CSV for easy reference
let csvContent = 'VA Name,Webflow URL\n';
matches.forEach(match => {
  csvContent += `"${match.nombre}","${match.url}"\n`;
});
fs.writeFileSync('webflow-image-mapping.csv', csvContent);
console.log(`✅ Created CSV: webflow-image-mapping.csv`);

console.log(`\n📋 Next steps:`);
console.log(`   1. Review webflow-image-mapping.json`);
console.log(`   2. If all matched, run the update script`);
console.log(`   3. Regenerate grid with: node generate-va-grid-webflow.js`);
