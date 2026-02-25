const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'index.html');
const outDir = path.join(__dirname, 'dist');
const outFile = path.join(outDir, 'index.html');

if (!fs.existsSync(src)) {
  console.error('❌ talent/index.html not found');
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });
fs.copyFileSync(src, outFile);
console.log('✅ Copied index.html to dist/index.html');

