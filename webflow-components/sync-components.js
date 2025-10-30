#!/usr/bin/env node

/**
 * Webflow Components Sync Script
 * Sincroniza componentes desde GitHub a un archivo local
 * Uso: node sync-components.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuración
const CONFIG = {
  github: {
    owner: 'vitoriomanzarek',
    repo: 'ocean-va',
    branch: 'main',
    path: 'webflow-components'
  },
  local: {
    outputDir: './webflow-components-sync',
    timestamp: new Date().toISOString().split('T')[0]
  }
};

// Colores para consola
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Logger
const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  header: (msg) => console.log(`\n${colors.cyan}${msg}${colors.reset}\n`)
};

/**
 * Descarga un archivo desde GitHub
 */
function downloadFile(filePath) {
  return new Promise((resolve, reject) => {
    const url = `https://raw.githubusercontent.com/${CONFIG.github.owner}/${CONFIG.github.repo}/${CONFIG.github.branch}/${CONFIG.github.path}/${filePath}`;
    
    https.get(url, (response) => {
      if (response.statusCode === 404) {
        reject(new Error(`Archivo no encontrado: ${filePath}`));
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Error HTTP ${response.statusCode}`));
        return;
      }

      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        resolve(data);
      });
    }).on('error', reject);
  });
}

/**
 * Obtiene lista de archivos del repositorio
 */
function getFilesList() {
  return [
    // Documentación
    'README.md',
    'WEBFLOW-SETUP-GUIDE.md',
    'IMAGES-SETUP.md',
    'CHANGELOG.md',
    'TESTING-CHECKLIST.md',
    'MAINTENANCE-GUIDE.md',
    'INDEX.md',
    'WEBFLOW-VALIDATOR-BOOKMARKLET.md',
    
    // Design System
    'design-system.css',
    
    // Componentes
    '01-comparison-table.html',
    '02-client-logos-carousel.html',
    '03-navbar-header.html',
    '04-hero-section.html',
    '05-footer.html',
    '06-stats-section.html',
    '07-pricing-section.html',
    '08-timeline-section.html',
    '09-testimonials-section.html',
    '10-faq-section.html',
    '11-services-industries-showcase.html',
    '12-va-showcase.html'
  ];
}

/**
 * Crea directorio si no existe
 */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Guarda un archivo localmente
 */
function saveFile(filePath, content) {
  const fullPath = path.join(CONFIG.local.outputDir, filePath);
  const dir = path.dirname(fullPath);
  
  ensureDir(dir);
  fs.writeFileSync(fullPath, content, 'utf-8');
}

/**
 * Calcula estadísticas del archivo
 */
function getFileStats(content) {
  const lines = content.split('\n').length;
  const size = Buffer.byteLength(content, 'utf-8');
  return { lines, size };
}

/**
 * Sincroniza todos los componentes
 */
async function syncComponents() {
  log.header('🚀 Webflow Components Sync');
  
  console.log(`Origen: https://github.com/${CONFIG.github.owner}/${CONFIG.github.repo}`);
  console.log(`Rama: ${CONFIG.github.branch}`);
  console.log(`Destino: ${CONFIG.local.outputDir}`);
  console.log(`Fecha: ${CONFIG.local.timestamp}\n`);

  ensureDir(CONFIG.local.outputDir);

  const files = getFilesList();
  const results = {
    success: [],
    failed: [],
    stats: {
      totalFiles: files.length,
      totalLines: 0,
      totalSize: 0
    }
  };

  log.info(`Descargando ${files.length} archivos...\n`);

  for (const file of files) {
    try {
      const content = await downloadFile(file);
      saveFile(file, content);
      
      const stats = getFileStats(content);
      results.success.push(file);
      results.stats.totalLines += stats.lines;
      results.stats.totalSize += stats.size;
      
      log.success(`${file} (${stats.lines} líneas, ${(stats.size / 1024).toFixed(2)}KB)`);
    } catch (error) {
      results.failed.push({ file, error: error.message });
      log.error(`${file}: ${error.message}`);
    }
  }

  // Resumen
  log.header('📊 Resumen');
  console.log(`Archivos descargados: ${results.success.length}/${files.length}`);
  console.log(`Archivos fallidos: ${results.failed.length}`);
  console.log(`Total líneas: ${results.stats.totalLines.toLocaleString()}`);
  console.log(`Tamaño total: ${(results.stats.totalSize / 1024).toFixed(2)}KB`);

  if (results.failed.length > 0) {
    log.header('❌ Archivos Fallidos');
    results.failed.forEach(({ file, error }) => {
      console.log(`  - ${file}: ${error}`);
    });
  }

  // Crear archivo de resumen
  const summary = {
    timestamp: new Date().toISOString(),
    source: `https://github.com/${CONFIG.github.owner}/${CONFIG.github.repo}`,
    branch: CONFIG.github.branch,
    filesDownloaded: results.success.length,
    filesFailed: results.failed.length,
    totalLines: results.stats.totalLines,
    totalSize: results.stats.totalSize,
    files: results.success,
    failed: results.failed
  };

  saveFile('SYNC-REPORT.json', JSON.stringify(summary, null, 2));
  log.success(`Reporte guardado en: ${CONFIG.local.outputDir}/SYNC-REPORT.json`);

  log.header('✅ Sincronización Completada');
  console.log(`Los archivos están en: ${path.resolve(CONFIG.local.outputDir)}`);
}

/**
 * Valida la sincronización
 */
async function validateSync() {
  log.header('🔍 Validando Sincronización');

  const files = getFilesList();
  let allValid = true;

  for (const file of files) {
    const filePath = path.join(CONFIG.local.outputDir, file);
    
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      log.success(`${file} (${(stats.size / 1024).toFixed(2)}KB)`);
    } else {
      log.error(`${file} - NO ENCONTRADO`);
      allValid = false;
    }
  }

  if (allValid) {
    log.success('Todos los archivos están presentes');
  } else {
    log.error('Faltan algunos archivos');
  }

  return allValid;
}

/**
 * Limpia archivos antiguos
 */
function cleanup() {
  log.header('🧹 Limpieza');

  const outputDir = CONFIG.local.outputDir;
  
  if (fs.existsSync(outputDir)) {
    const files = fs.readdirSync(outputDir);
    files.forEach(file => {
      const filePath = path.join(outputDir, file);
      fs.unlinkSync(filePath);
    });
    fs.rmdirSync(outputDir);
    log.success(`Directorio limpiado: ${outputDir}`);
  }
}

/**
 * Función principal
 */
async function main() {
  try {
    const args = process.argv.slice(2);

    if (args.includes('--clean')) {
      cleanup();
      return;
    }

    await syncComponents();

    if (args.includes('--validate')) {
      const isValid = await validateSync();
      process.exit(isValid ? 0 : 1);
    }

    process.exit(0);
  } catch (error) {
    log.error(`Error fatal: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
}

// Ejecutar
main();

/**
 * Uso:
 * 
 * Sincronizar componentes:
 *   node sync-components.js
 * 
 * Sincronizar y validar:
 *   node sync-components.js --validate
 * 
 * Limpiar archivos descargados:
 *   node sync-components.js --clean
 * 
 * Limpiar y sincronizar:
 *   node sync-components.js --clean && node sync-components.js
 */
