/**
 * Script para corregir Employment Summary y Employment History de Ana Victoria
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
      // Dividir por <br> o saltos de línea y convertir cada línea en un <p>
      const lines = emp.description
        .split(/<br\s*\/?>/i)
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
      .replace(/<strong>(.*?)<\/strong>/g, '$1') // Remover <strong> tags pero mantener el texto
      .replace(/&nbsp;/g, ' ')
      .trim();
    console.log('✅ Employment Summary extraído:');
    console.log(`   ${employmentSummary.substring(0, 150)}...\n`);
  } else {
    console.log('⚠️  No se encontró Employment Summary en HTML\n');
  }
  
  // Extraer Employment History
  const employmentListMatch = htmlContent.match(/<div class="va-employment-list">([\s\S]*?)<\/div><\/div><\/section>/);
  const employmentHistory = [];
  
  if (employmentListMatch) {
    const employmentHTML = employmentListMatch[1];
    // Buscar todos los accordions - el patrón es más específico
    const accordionPattern = /<div class="va-employment-accordion">([\s\S]*?)<\/div><\/div>(?=<div class="va-employment-accordion">|$)/g;
    const accordionMatches = [...employmentHTML.matchAll(accordionPattern)];
    
    for (const match of accordionMatches) {
      const accordionHTML = match[1];
      
      // Extraer company
      const companyMatch = accordionHTML.match(/<h4 class="va-employment-accordion-company">(.*?)<\/h4>/);
      const company = companyMatch ? companyMatch[1].trim() : '';
      
      // Extraer position
      const positionMatch = accordionHTML.match(/<p class="va-employment-accordion-position">(.*?)<\/p>/);
      const position = positionMatch ? positionMatch[1].trim() : '';
      
      // Extraer period
      const periodMatch = accordionHTML.match(/<p class="va-employment-accordion-period">(.*?)<\/p>/);
      const period = periodMatch ? periodMatch[1].trim() : '';
      
      // Extraer description - buscar todos los <p> tags dentro del content
      let description = '';
      const contentMatch = accordionHTML.match(/<div class="va-employment-accordion-content">([\s\S]*?)<\/div>/);
      
      if (contentMatch) {
        const contentHTML = contentMatch[1];
        // Buscar todos los <p class="va-employment-accordion-description">
        const pMatches = [...contentHTML.matchAll(/<p class="va-employment-accordion-description">([\s\S]*?)<\/p>/g)];
        
        const lines = [];
        for (const pMatch of pMatches) {
          let line = pMatch[1]
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/&nbsp;/g, ' ')
            .trim();
          if (line) {
            lines.push(line);
          }
        }
        
        description = lines.join('\n');
      }
      
      if (company) {
        employmentHistory.push({
          company,
          position,
          period,
          description
        });
      }
    }
    
    console.log(`✅ Employment History extraído: ${employmentHistory.length} trabajos`);
    employmentHistory.forEach((emp, idx) => {
      console.log(`   ${idx + 1}. ${emp.company} - ${emp.position} (${emp.period})`);
      if (emp.description) {
        console.log(`      Descripción: ${emp.description.substring(0, 100)}${emp.description.length > 100 ? '...' : ''}`);
      } else {
        console.log(`      ⚠️  Sin descripción`);
      }
    });
    console.log();
  } else {
    console.log('⚠️  No se encontró Employment History en HTML\n');
  }
  
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
    console.log(`   ✅ Employment History: ${employmentHistory.length} trabajos cargados con formato correcto`);
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
