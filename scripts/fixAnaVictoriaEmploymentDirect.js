/**
 * Script para corregir Employment Summary y Employment History de Ana Victoria
 * Usando extracción directa del HTML
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import fs from 'fs';
import path from 'path';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

function escapeHtml(text) {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}

function generateEmploymentHTML(employmentHistory) {
  if (!employmentHistory || employmentHistory.length === 0) return '';
  
  return employmentHistory.map(emp => {
    let descriptionHTML = '';
    if (emp.description) {
      // Dividir por saltos de línea y convertir cada línea en un <p>
      const lines = emp.description
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
      
      descriptionHTML = lines.map(line => {
        const bulletText = line.startsWith('•') ? line : `• ${line}`;
        return `<p class="va-employment-accordion-description">${escapeHtml(bulletText)}</p>`;
      }).join('');
    }
    
    return `<div class="va-employment-accordion"><div class="va-employment-accordion-header" onclick="this.classList.toggle('active'); this.nextElementSibling.classList.toggle('active');"><div class="va-employment-accordion-title"><h4 class="va-employment-accordion-company">${escapeHtml(emp.company || 'N/A')}</h4><p class="va-employment-accordion-position">${escapeHtml(emp.position || '')}</p><p class="va-employment-accordion-period">${escapeHtml(emp.period || '')}</p></div><svg class="va-employment-accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div><div class="va-employment-accordion-content">${descriptionHTML}</div></div>`;
  }).join('');
}

async function main() {
  console.log('🔧 Corrigiendo Employment Summary y History de Ana Victoria...\n');
  
  const apiClient = new WebflowApiClient(WEBFLOW_API_TOKEN);
  const site = await apiClient.getSite(SITE_ID);
  const collectionsResponse = await apiClient.getCollections(SITE_ID);
  const vaCollection = collectionsResponse.collections.find(c => c.slug === 'virtual-assistants');
  
  let allVAs = [];
  let offset = 0;
  const limit = 100;
  
  while (true) {
    const response = await apiClient.getCollectionItems(vaCollection.id, { limit, offset });
    if (!response.items || response.items.length === 0) break;
    allVAs = allVAs.concat(response.items);
    if (response.items.length < limit) break;
    offset += limit;
  }
  
  const anaVictoria = allVAs.find(v => {
    const name = (v.fieldData.name || '').toLowerCase();
    return name.includes('ana victoria') || (name.includes('ana') && name.includes('victoria'));
  });
  
  if (!anaVictoria) {
    console.error('❌ Ana Victoria no encontrado en CMS');
    return;
  }
  
  console.log('✅ Ana Victoria encontrado en CMS\n');
  
  // Leer HTML minificado
  const htmlPath = path.join(process.cwd(), 'webflow-components-minified', '244-ana-victoria-profile.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 EXTRACCIÓN DE DATOS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  // Extraer Employment Summary
  const summaryMatch = htmlContent.match(/<p class="va-employment-summary">(.*?)<\/p>/s);
  let employmentSummary = '';
  if (summaryMatch) {
    employmentSummary = summaryMatch[1]
      .replace(/<strong>(.*?)<\/strong>/g, '$1')
      .replace(/&nbsp;/g, ' ')
      .trim();
    console.log('✅ Employment Summary extraído\n');
  }
  
  // Extraer Employment History - buscar todos los elementos por separado
  const employmentHistory = [];
  
  // Buscar todas las companies
  const companyMatches = [...htmlContent.matchAll(/<h4 class="va-employment-accordion-company">(.*?)<\/h4>/g)];
  const positionMatches = [...htmlContent.matchAll(/<p class="va-employment-accordion-position">(.*?)<\/p>/g)];
  const periodMatches = [...htmlContent.matchAll(/<p class="va-employment-accordion-period">(.*?)<\/p>/g)];
  const descriptionMatches = [...htmlContent.matchAll(/<p class="va-employment-accordion-description">(.*?)<\/p>/g)];
  
  // Agrupar por índice (asumiendo que están en el mismo orden)
  const maxItems = Math.max(companyMatches.length, positionMatches.length, periodMatches.length);
  
  for (let i = 0; i < maxItems; i++) {
    const company = companyMatches[i] ? companyMatches[i][1].trim() : '';
    const position = positionMatches[i] ? positionMatches[i][1].trim() : '';
    const period = periodMatches[i] ? periodMatches[i][1].trim() : '';
    
    // Las descripciones pueden tener múltiples <p> tags por trabajo
    // Necesitamos agruparlas por trabajo
    // Por ahora, tomemos todas las descripciones y las asignemos por orden
    let description = '';
    
    if (company) {
      // Buscar descripciones que estén después de este trabajo
      // Esto es más complejo, mejor extraer el HTML completo de cada accordion
      employmentHistory.push({
        company,
        position,
        period,
        description: '' // Lo llenaremos después
      });
    }
  }
  
  // Ahora extraer las descripciones correctamente
  // Buscar el contenido completo de cada accordion
  const accordionContentMatches = [...htmlContent.matchAll(/<div class="va-employment-accordion-content">([\s\S]*?)<\/div><\/div>/g)];
  
  for (let i = 0; i < employmentHistory.length && i < accordionContentMatches.length; i++) {
    const contentHTML = accordionContentMatches[i][1];
    const descPMatches = [...contentHTML.matchAll(/<p class="va-employment-accordion-description">(.*?)<\/p>/g)];
    
    const lines = [];
    for (const descMatch of descPMatches) {
      let line = descMatch[1]
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/&nbsp;/g, ' ')
        .trim();
      if (line) {
        lines.push(line);
      }
    }
    
    employmentHistory[i].description = lines.join('\n');
  }
  
  console.log(`✅ Employment History extraído: ${employmentHistory.length} trabajos`);
  employmentHistory.forEach((emp, idx) => {
    console.log(`   ${idx + 1}. ${emp.company} - ${emp.position} (${emp.period})`);
    if (emp.description) {
      console.log(`      Descripción: ${emp.description.substring(0, 80)}${emp.description.length > 80 ? '...' : ''}`);
    } else {
      console.log(`      ⚠️  Sin descripción`);
    }
  });
  console.log();
  
  // Generar HTML corregido
  const employmentHTML = generateEmploymentHTML(employmentHistory);
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📤 ACTUALIZANDO CMS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const updates = {};
  
  if (employmentSummary) {
    updates['employment-summary'] = employmentSummary;
    console.log('✅ Employment Summary será actualizado');
  }
  
  if (employmentHTML) {
    updates['employment-richtext'] = employmentHTML;
    console.log('✅ Employment History será actualizado con formato correcto');
    console.log(`   Longitud HTML: ${employmentHTML.length} caracteres`);
  }
  
  if (Object.keys(updates).length === 0) {
    console.log('⚠️  No hay datos para actualizar');
    return;
  }
  
  console.log();
  
  try {
    await apiClient.updateCollectionItem(vaCollection.id, anaVictoria.id, updates);
    
    console.log('✅ Ana Victoria actualizado exitosamente\n');
    console.log('════════════════════════════════════════════════════════════════════════════════');
    console.log('📊 RESUMEN');
    console.log('════════════════════════════════════════════════════════════════════════════════\n');
    console.log(`   ✅ Employment Summary: ${employmentSummary ? 'Actualizado' : 'No actualizado'}`);
    console.log(`   ✅ Employment History: ${employmentHistory.length} trabajos`);
    employmentHistory.forEach((emp, idx) => {
      console.log(`      ${idx + 1}. ${emp.company} - ${emp.description ? 'Con descripción' : 'Sin descripción'}`);
    });
    console.log('\n   💡 El contenido del dropdown ahora debería tener los estilos correctos.');
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
  
  console.log();
}

main().catch(console.error);
