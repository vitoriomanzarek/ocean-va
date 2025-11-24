import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List of VAs to create (starting from 243, since 242 Antonio was already created)
const vas = [
  { number: 243, name: 'Ana' },
  { number: 244, name: 'Ana Victoria' },
  { number: 245, name: 'Balbina' },
  { number: 246, name: 'Brandon L.' },
  { number: 247, name: 'Carolina' },
  { number: 248, name: 'Christine' },
  { number: 249, name: 'Fernanda' },
  { number: 250, name: 'Ellen' },
  { number: 251, name: 'Day' },
  { number: 252, name: 'Dayana' },
  { number: 253, name: 'Gonzalo' },
  { number: 254, name: 'Guillermo' },
  { number: 255, name: 'Kevin' },
  { number: 256, name: 'Israel' },
  { number: 257, name: 'Janice' },
  { number: 258, name: 'Lois' },
  { number: 259, name: 'Maria D.' },
  { number: 260, name: 'Maria' },
  { number: 261, name: 'Melissa' },
  { number: 262, name: 'Patricia' },
  { number: 263, name: 'Rafael' },
  { number: 264, name: 'Rainier' },
  { number: 265, name: 'Rejean' },
  { number: 266, name: 'Rochelle' },
  { number: 267, name: 'Sandra' },
  { number: 268, name: 'Anahi' },
  { number: 269, name: 'AC' },
  { number: 270, name: 'Mina' }
];

const outputDir = path.join(__dirname, '..', 'webflow-components');

vas.forEach(va => {
  const fileName = `${va.number}-${va.name.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '')}-profile.html`;
  const filePath = path.join(outputDir, fileName);
  
  // Create empty file
  fs.writeFileSync(filePath, '');
  console.log(`✅ Created: ${fileName}`);
});

console.log(`\n✅ All ${vas.length} empty VA profile files created successfully!`);
