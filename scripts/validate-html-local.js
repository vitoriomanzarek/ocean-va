#!/usr/bin/env node

/**
 * Local HTML Validation Script
 * 
 * Valida los HTML en webflow-components/ localmente
 * Genera reporte de cambios, tamaños, y estructura
 * 
 * Uso: node scripts/validate-html-local.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WEBFLOW_DIR = path.join(__dirname, '../webflow-components');
const REPORTS_DIR = path.join(__dirname, '../reports');

// Crear directorio de reportes si no existe
if (!fs.existsSync(REPORTS_DIR)) {
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
}

/**
 * Analizar HTML
 */
function analyzeHtml(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const stats = fs.statSync(filePath);

  return {
    file: path.basename(filePath),
    path: filePath,
    size: content.length,
    sizeKB: (content.length / 1024).toFixed(2),
    lines: content.split('\n').length,
    lastModified: stats.mtime,
    lastModifiedDate: stats.mtime.toISOString(),
    analysis: {
      hasStyle: content.includes('<style>'),
      hasScript: content.includes('<script>'),
      hasWebflowCDN: content.includes('cdn.prod.website-files.com'),
      hasImages: (content.match(/src=/g) || []).length,
      hasLinks: (content.match(/href=/g) || []).length,
      hasClasses: (content.match(/class=/g) || []).length,
      hasIds: (content.match(/id=/g) || []).length,
      styleLines: (content.match(/<style>[\s\S]*?<\/style>/g) || []).length,
      scriptLines: (content.match(/<script>[\s\S]*?<\/script>/g) || []).length,
    },
  };
}

/**
 * Generar reporte
 */
function generateReport() {
  const htmlFiles = fs.readdirSync(WEBFLOW_DIR)
    .filter(f => f.endsWith('.html'))
    .sort();

  const components = htmlFiles.map(file => {
    try {
      return analyzeHtml(path.join(WEBFLOW_DIR, file));
    } catch (error) {
      return {
        file,
        error: error.message,
      };
    }
  });

  const report = {
    timestamp: new Date().toISOString(),
    totalFiles: components.length,
    totalSize: components.reduce((sum, c) => sum + (c.size || 0), 0),
    components,
    summary: {
      withStyle: components.filter(c => c.analysis?.hasStyle).length,
      withScript: components.filter(c => c.analysis?.hasScript).length,
      withWebflowCDN: components.filter(c => c.analysis?.hasWebflowCDN).length,
      averageSize: (components.reduce((sum, c) => sum + (c.size || 0), 0) / components.length).toFixed(2),
      largestFile: components.reduce((max, c) => (c.size > (max.size || 0) ? c : max), {}),
      smallestFile: components.reduce((min, c) => (c.size < (min.size || Infinity) ? c : min), {}),
    },
  };

  return report;
}

/**
 * Generar HTML visual
 */
function generateHtmlReport(report) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML Components Validation Report</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; padding: 20px; }
    .container { max-width: 1400px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 30px; }
    h1 { color: #049d98; margin-bottom: 10px; }
    .timestamp { color: #666; font-size: 14px; margin-bottom: 30px; }
    .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 30px; }
    .summary-card { background: #f9f9f9; padding: 20px; border-radius: 6px; border-left: 4px solid #049d98; }
    .summary-card h3 { font-size: 12px; color: #666; margin-bottom: 10px; text-transform: uppercase; }
    .summary-card .value { font-size: 32px; font-weight: bold; color: #049d98; }
    .summary-card.large { grid-column: span 2; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th { background: #049d98; color: white; padding: 12px; text-align: left; font-weight: 600; font-size: 13px; }
    td { padding: 12px; border-bottom: 1px solid #eee; font-size: 13px; }
    tr:hover { background: #f9f9f9; }
    .file-name { font-weight: 600; color: #049d98; }
    .badge { display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; margin-right: 5px; }
    .badge.style { background: #dbeafe; color: #1e40af; }
    .badge.script { background: #fef3c7; color: #92400e; }
    .badge.cdn { background: #d1fae5; color: #065f46; }
    .stat { display: inline-block; margin-right: 15px; }
    .stat-label { font-size: 11px; color: #666; }
    .stat-value { font-weight: 600; color: #049d98; }
  </style>
</head>
<body>
  <div class="container">
    <h1>📊 HTML Components Validation Report</h1>
    <p class="timestamp">Generated: ${report.timestamp}</p>
    
    <div class="summary-grid">
      <div class="summary-card">
        <h3>Total Files</h3>
        <div class="value">${report.totalFiles}</div>
      </div>
      <div class="summary-card">
        <h3>Total Size</h3>
        <div class="value">${(report.totalSize / 1024 / 1024).toFixed(2)} MB</div>
      </div>
      <div class="summary-card">
        <h3>Avg Size</h3>
        <div class="value">${report.summary.averageSize} KB</div>
      </div>
      <div class="summary-card">
        <h3>With Styles</h3>
        <div class="value">${report.summary.withStyle}</div>
      </div>
      <div class="summary-card">
        <h3>With Scripts</h3>
        <div class="value">${report.summary.withScript}</div>
      </div>
      <div class="summary-card">
        <h3>Webflow CDN</h3>
        <div class="value">${report.summary.withWebflowCDN}</div>
      </div>
      <div class="summary-card large">
        <h3>Largest File</h3>
        <div class="value">${report.summary.largestFile.file}</div>
        <div class="stat">
          <div class="stat-label">Size:</div>
          <div class="stat-value">${report.summary.largestFile.sizeKB} KB</div>
        </div>
      </div>
      <div class="summary-card large">
        <h3>Smallest File</h3>
        <div class="value">${report.summary.smallestFile.file}</div>
        <div class="stat">
          <div class="stat-label">Size:</div>
          <div class="stat-value">${report.summary.smallestFile.sizeKB} KB</div>
        </div>
      </div>
    </div>

    <h2 style="margin-top: 40px; margin-bottom: 20px; color: #333;">📋 All Components</h2>
    <table>
      <thead>
        <tr>
          <th>File Name</th>
          <th>Size</th>
          <th>Lines</th>
          <th>Last Modified</th>
          <th>Features</th>
        </tr>
      </thead>
      <tbody>
        ${report.components.map(comp => `
          <tr>
            <td><span class="file-name">${comp.file}</span></td>
            <td>${comp.sizeKB} KB</td>
            <td>${comp.lines}</td>
            <td>${new Date(comp.lastModified).toLocaleDateString()}</td>
            <td>
              ${comp.analysis?.hasStyle ? '<span class="badge style">Style</span>' : ''}
              ${comp.analysis?.hasScript ? '<span class="badge script">Script</span>' : ''}
              ${comp.analysis?.hasWebflowCDN ? '<span class="badge cdn">CDN</span>' : ''}
              <span class="stat">
                <span class="stat-label">Images:</span>
                <span class="stat-value">${comp.analysis?.hasImages || 0}</span>
              </span>
              <span class="stat">
                <span class="stat-label">Links:</span>
                <span class="stat-value">${comp.analysis?.hasLinks || 0}</span>
              </span>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>
</body>
</html>
  `;

  return html;
}

/**
 * Main
 */
function main() {
  console.log('📊 Validating HTML components locally...\n');

  const report = generateReport();

  // Guardar reporte JSON
  const jsonPath = path.join(REPORTS_DIR, 'html-validation-report.json');
  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
  console.log(`✅ JSON report saved: ${jsonPath}`);

  // Guardar reporte HTML
  const htmlPath = path.join(REPORTS_DIR, 'html-validation-report.html');
  const htmlContent = generateHtmlReport(report);
  fs.writeFileSync(htmlPath, htmlContent);
  console.log(`✅ HTML report saved: ${htmlPath}`);

  // Mostrar resumen en consola
  console.log('\n📊 SUMMARY:');
  console.log(`   Total files: ${report.totalFiles}`);
  console.log(`   Total size: ${(report.totalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Average size: ${report.summary.averageSize} KB`);
  console.log(`   Files with styles: ${report.summary.withStyle}`);
  console.log(`   Files with scripts: ${report.summary.withScript}`);
  console.log(`   Files with Webflow CDN: ${report.summary.withWebflowCDN}`);
  console.log(`\n   Largest: ${report.summary.largestFile.file} (${report.summary.largestFile.sizeKB} KB)`);
  console.log(`   Smallest: ${report.summary.smallestFile.file} (${report.summary.smallestFile.sizeKB} KB)`);

  console.log('\n✨ Done! Open reports/html-validation-report.html to view full report');
}

main();
