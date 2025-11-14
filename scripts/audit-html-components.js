#!/usr/bin/env node

/**
 * HTML Components Audit Script
 * 
 * Audita los componentes HTML en webflow-components/ 
 * y los compara con los React components en src/components/
 * 
 * Uso: node scripts/audit-html-components.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WEBFLOW_DIR = path.join(__dirname, '../webflow-components');
const REACT_DIR = path.join(__dirname, '../src/components');
const REPORTS_DIR = path.join(__dirname, '../reports');

// Crear directorio de reportes si no existe
if (!fs.existsSync(REPORTS_DIR)) {
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
}

// Mapeo de componentes HTML a React
const componentMapping = {
  '206-hero-va-page.html': 'Hero.jsx',
  '205-navbar-va-page.html': 'Navbar.jsx',
  '134-pricing-final-cta.html': 'Pricing.jsx',
  '77-sdr-faqs.html': 'FAQSection.jsx',
  '83-va-services-faqs.html': 'FAQSection.jsx',
  '102-ecommerce-va-faqs.html': 'FAQSection.jsx',
  '112-property-management-va-faqs.html': 'FAQSection.jsx',
  '117-medical-va-faqs.html': 'FAQSection.jsx',
  '200-our-current-vas-grid.html': 'VAShowcase.jsx',
  '208-va-grid-part1.html': 'OurVAs/VAGrid.jsx',
  '208-va-grid-part2.html': 'OurVAs/VAGrid.jsx',
  '209-sticky-cta-footer.html': 'OurVAs/VAStickyCTA.jsx',
  '22-booking-demo.html': 'BookingDemo.jsx',
  '29-real-estate-why-ocean.html': 'WhyOceanSection.jsx',
  '31-real-estate-how-it-works.html': 'HowItWorksSection.jsx',
  '43-admin-assistant-what-we-do.html': 'WhyOceanSection.jsx',
  '44-admin-assistant-why-ocean.html': 'WhyOceanSection.jsx',
  '110-property-management-va-outcomes.html': 'OutcomesSection.jsx',
  '19-ready-section.html': 'Stats.jsx',
};

/**
 * Analizar archivo HTML
 */
function analyzeHtml(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    return {
      size: content.length,
      lines: content.split('\n').length,
      hasStyle: content.includes('<style>'),
      hasScript: content.includes('<script>'),
      hasReact: content.includes('React') || content.includes('jsx'),
      hasWebflowCDN: content.includes('cdn.prod.website-files.com'),
      hasImages: (content.match(/src=/g) || []).length,
      hasLinks: (content.match(/href=/g) || []).length,
      lastModified: fs.statSync(filePath).mtime,
    };
  } catch (error) {
    return { error: error.message };
  }
}

/**
 * Analizar archivo React
 */
function analyzeReact(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    return {
      size: content.length,
      lines: content.split('\n').length,
      hasImports: (content.match(/import /g) || []).length,
      hasClassNames: (content.match(/className=/g) || []).length,
      hasHooks: content.includes('useState') || content.includes('useEffect'),
      hasProps: content.includes('props') || content.includes('{'),
      lastModified: fs.statSync(filePath).mtime,
    };
  } catch (error) {
    return { error: error.message };
  }
}

/**
 * Comparar HTML vs React
 */
function compareComponents() {
  const report = {
    timestamp: new Date().toISOString(),
    components: [],
    summary: {
      total: 0,
      htmlOnly: 0,
      reactOnly: 0,
      paired: 0,
      needsReview: 0,
    },
  };

  // Obtener archivos HTML
  const htmlFiles = fs.readdirSync(WEBFLOW_DIR)
    .filter(f => f.endsWith('.html') && !f.includes('profile'));

  // Procesar cada HTML
  htmlFiles.forEach(htmlFile => {
    const reactFile = componentMapping[htmlFile];
    const htmlPath = path.join(WEBFLOW_DIR, htmlFile);
    const htmlAnalysis = analyzeHtml(htmlPath);

    const component = {
      name: htmlFile,
      type: 'html',
      file: htmlFile,
      analysis: htmlAnalysis,
      paired: false,
      reactFile: null,
      reactAnalysis: null,
      status: 'unknown',
      notes: [],
    };

    if (reactFile) {
      const reactPath = path.join(REACT_DIR, reactFile);
      
      if (fs.existsSync(reactPath)) {
        component.paired = true;
        component.reactFile = reactFile;
        component.reactAnalysis = analyzeReact(reactPath);
        component.status = 'paired';
        
        // Analizar diferencias
        const htmlSize = htmlAnalysis.size;
        const reactSize = component.reactAnalysis.size;
        const sizeDiff = Math.abs(htmlSize - reactSize);
        const sizeDiffPercent = ((sizeDiff / Math.max(htmlSize, reactSize)) * 100).toFixed(1);

        if (sizeDiffPercent > 20) {
          component.notes.push(`⚠️ Size difference: ${sizeDiffPercent}% (HTML: ${htmlSize}B, React: ${reactSize}B)`);
          component.status = 'needs-review';
          report.summary.needsReview++;
        }

        if (htmlAnalysis.hasWebflowCDN && !component.reactAnalysis.hasImports) {
          component.notes.push('⚠️ HTML uses Webflow CDN, React may need updates');
          component.status = 'needs-review';
          report.summary.needsReview++;
        }

        report.summary.paired++;
      } else {
        component.notes.push(`❌ React file not found: ${reactFile}`);
        component.status = 'missing-react';
        report.summary.htmlOnly++;
      }
    } else {
      component.notes.push('⚠️ No React mapping found');
      component.status = 'unmapped';
      report.summary.htmlOnly++;
    }

    report.components.push(component);
    report.summary.total++;
  });

  return report;
}

/**
 * Generar reporte HTML
 */
function generateHtmlReport(report) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML Components Audit Report</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; padding: 20px; }
    .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 30px; }
    h1 { color: #049d98; margin-bottom: 10px; }
    .timestamp { color: #666; font-size: 14px; margin-bottom: 20px; }
    .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 30px; }
    .summary-card { background: #f9f9f9; padding: 15px; border-radius: 6px; border-left: 4px solid #049d98; }
    .summary-card h3 { font-size: 14px; color: #666; margin-bottom: 5px; }
    .summary-card .value { font-size: 28px; font-weight: bold; color: #049d98; }
    .summary-card.warning { border-left-color: #f59e0b; }
    .summary-card.warning .value { color: #f59e0b; }
    .summary-card.error { border-left-color: #ef4444; }
    .summary-card.error .value { color: #ef4444; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th { background: #049d98; color: white; padding: 12px; text-align: left; font-weight: 600; }
    td { padding: 12px; border-bottom: 1px solid #eee; }
    tr:hover { background: #f9f9f9; }
    .status { display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; }
    .status.paired { background: #d1fae5; color: #065f46; }
    .status.needs-review { background: #fef3c7; color: #92400e; }
    .status.missing-react { background: #fee2e2; color: #991b1b; }
    .status.unmapped { background: #e5e7eb; color: #374151; }
    .notes { font-size: 12px; color: #666; margin-top: 5px; }
    .note { display: block; margin: 3px 0; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔍 HTML Components Audit Report</h1>
    <p class="timestamp">Generated: ${report.timestamp}</p>
    
    <div class="summary">
      <div class="summary-card">
        <h3>Total Components</h3>
        <div class="value">${report.summary.total}</div>
      </div>
      <div class="summary-card">
        <h3>Paired</h3>
        <div class="value">${report.summary.paired}</div>
      </div>
      <div class="summary-card warning">
        <h3>Needs Review</h3>
        <div class="value">${report.summary.needsReview}</div>
      </div>
      <div class="summary-card error">
        <h3>HTML Only</h3>
        <div class="value">${report.summary.htmlOnly}</div>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>HTML File</th>
          <th>React File</th>
          <th>Status</th>
          <th>HTML Size</th>
          <th>React Size</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        ${report.components.map(comp => `
          <tr>
            <td><strong>${comp.file}</strong></td>
            <td>${comp.reactFile || '—'}</td>
            <td><span class="status ${comp.status}">${comp.status.replace('-', ' ').toUpperCase()}</span></td>
            <td>${comp.analysis.size ? (comp.analysis.size / 1024).toFixed(1) + ' KB' : '—'}</td>
            <td>${comp.reactAnalysis ? (comp.reactAnalysis.size / 1024).toFixed(1) + ' KB' : '—'}</td>
            <td>
              <div class="notes">
                ${comp.notes.map(note => `<span class="note">${note}</span>`).join('')}
              </div>
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
  console.log('🔍 Auditing HTML components...\n');

  const report = compareComponents();

  // Guardar reporte JSON
  const jsonPath = path.join(REPORTS_DIR, 'html-audit-report.json');
  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
  console.log(`✅ JSON report saved: ${jsonPath}`);

  // Guardar reporte HTML
  const htmlPath = path.join(REPORTS_DIR, 'html-audit-report.html');
  const htmlContent = generateHtmlReport(report);
  fs.writeFileSync(htmlPath, htmlContent);
  console.log(`✅ HTML report saved: ${htmlPath}`);

  // Mostrar resumen en consola
  console.log('\n📊 SUMMARY:');
  console.log(`   Total components: ${report.summary.total}`);
  console.log(`   Paired: ${report.summary.paired}`);
  console.log(`   Needs review: ${report.summary.needsReview}`);
  console.log(`   HTML only: ${report.summary.htmlOnly}`);

  if (report.summary.needsReview > 0) {
    console.log('\n⚠️  Components needing review:');
    report.components
      .filter(c => c.status === 'needs-review')
      .forEach(c => {
        console.log(`   - ${c.file}`);
        c.notes.forEach(note => console.log(`     ${note}`));
      });
  }

  console.log('\n✨ Done! Open reports/html-audit-report.html to view full report');
}

main();
