const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'index.html');
const faviconSrc = path.join(__dirname, '..', 'public', 'images', 'favicon.jpeg');
const outDir = path.join(__dirname, 'dist');
const outFile = path.join(outDir, 'index.html');
const faviconOut = path.join(outDir, 'favicon.jpeg');

if (!fs.existsSync(src)) {
  console.error('❌ talent/index.html not found');
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });
fs.copyFileSync(src, outFile);
if (fs.existsSync(faviconSrc)) {
  fs.copyFileSync(faviconSrc, faviconOut);
  console.log('✅ Copied favicon to dist/favicon.jpeg');
} else {
  console.warn('⚠️ favicon source not found at', faviconSrc);
}
console.log('✅ Copied index.html to dist/index.html');

