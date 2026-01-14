const fs = require('fs');
const path = require('path');

const content = "DEEP_SEEK_AI_API_KEY=sk-eead7336e32046a280513cf0e330a7c7\n";
const filePath = path.join(__dirname, '.env.local');

fs.writeFileSync(filePath, content, { encoding: 'utf8' });
console.log("Written .env.local with content length:", content.length);
console.log("Content:", content.trim());
