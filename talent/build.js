const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'index.html');
const faviconSrc = path.join(__dirname, '..', 'public', 'images', 'favicon.jpeg');
const outDir = path.join(__dirname, 'dist');
const outFile = path.join(outDir, 'index.html');
const faviconOut = path.join(outDir, 'favicon.jpeg');
const adminSrc = path.join(__dirname, 'admin', 'index.html');
const adminOutDir = path.join(outDir, 'admin');
const adminOutFile = path.join(adminOutDir, 'index.html');
const imgSrcDir = path.join(__dirname, 'img');
const imgOutDir = path.join(outDir, 'img');

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

if (fs.existsSync(adminSrc)) {
  fs.mkdirSync(adminOutDir, { recursive: true });
  fs.copyFileSync(adminSrc, adminOutFile);
  console.log('✅ Copied admin/index.html to dist/admin/index.html');
} else {
  console.warn('⚠️ admin/index.html not found at', adminSrc);
}

if (fs.existsSync(imgSrcDir)) {
  // Copy avatar images (and any other assets) used by the talent page
  if (fs.cpSync) {
    fs.cpSync(imgSrcDir, imgOutDir, { recursive: true });
  } else {
    // Fallback for older Node versions
    fs.mkdirSync(imgOutDir, { recursive: true });
    for (const entry of fs.readdirSync(imgSrcDir)) {
      const srcPath = path.join(imgSrcDir, entry);
      const destPath = path.join(imgOutDir, entry);
      const stat = fs.statSync(srcPath);
      if (stat.isDirectory()) continue;
      fs.copyFileSync(srcPath, destPath);
    }
  }
  console.log('✅ Copied img directory to dist/img');
} else {
  console.warn('⚠️ img directory not found at', imgSrcDir);
}

