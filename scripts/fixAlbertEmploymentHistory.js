/**
 * Script para extraer el employment history de Albert del HTML minificado
 * y cargarlo al CMS con el formato correcto para el template dinámico
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import fs from 'fs';
import path from 'path';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;
const HTML_FILE_PATH = path.join(process.cwd(), 'webflow-components-minified/216-albert-profile.html');

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Extraer employment history del HTML
function extractEmploymentHistory(html) {
  const employment = [];
  
  // Buscar todos los accordions de employment
  const accordionRegex = /<div[^>]*class="[^"]*va-employment-accordion[^"]*"[^>]*>(.*?)<\/div>\s*<\/div>/gis;
  let accordionMatch;
  
  while ((accordionMatch = accordionRegex.exec(html)) !== null) {
    const accordionHtml = accordionMatch[0];
    
    // Extraer company
    const companyMatch = accordionHtml.match(/<h4[^>]*class="[^"]*va-employment-accordion-company[^"]*"[^>]*>([^<]+)<\/h4>/i);
    const company = companyMatch ? companyMatch[1].trim() : '';
    
    // Extraer position
    const positionMatch = accordionHtml.match(/<p[^>]*class="[^"]*va-employment-accordion-position[^"]*"[^>]*>([^<]+)<\/p>/i);
    const position = positionMatch ? positionMatch[1].trim() : '';
    
    // Extraer period
    const periodMatch = accordionHtml.match(/<p[^>]*class="[^"]*va-employment-accordion-period[^"]*"[^>]*>([^<]+)<\/p>/i);
    const period = periodMatch ? periodMatch[1].trim() : '';
    
    // Extraer description - puede estar en <ul><li> o <p>
    let description = '';
    const ulMatch = accordionHtml.match(/<ul[^>]*class="[^"]*va-employment-accordion-description[^"]*"[^>]*>(.*?)<\/ul>/is);
    if (ulMatch) {
      // Extraer todos los <li>
      const liRegex = /<li[^>]*>(.*?)<\/li>/gis;
      let liMatch;
      const bullets = [];
      while ((liMatch = liRegex.exec(ulMatch[1])) !== null) {
        const bulletText = liMatch[1]
          .replace(/<[^>]+>/g, '')
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .trim();
        if (bulletText) {
          bullets.push(bulletText);
        }
      }
      description = bullets.join('\n');
    } else {
      // Intentar con <p>
      const pMatch = accordionHtml.match(/<p[^>]*class="[^"]*va-employment-accordion-description[^"]*"[^>]*>(.*?)<\/p>/is);
      if (pMatch) {
        description = pMatch[1]
          .replace(/<br\s*\/?>/gi, '\n')
          .replace(/<[^>]+>/g, '')
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .trim();
      }
    }
    
    if (company || position) {
      employment.push({ company, position, period, description });
    }
  }
  
  return employment;
}

// Generar HTML en formato correcto para el template dinámico
function generateEmploymentHTML(employmentHistory) {
  if (!employmentHistory || employmentHistory.length === 0) return '';
  
  return employmentHistory.map(emp => {
    // Formatear descripción: cada línea en su propio <p> tag
    let descriptionHTML = '';
    if (emp.description) {
      const lines = emp.description.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
      
      descriptionHTML = lines.map(line => {
        // Asegurar que cada línea tenga bullet point
        const bulletText = line.startsWith('•') ? line : `• ${line}`;
        return `<p class="va-employment-accordion-description">${escapeHtml(bulletText)}</p>`;
      }).join('');
    }
    
    return `<div class="va-employment-accordion"><div class="va-employment-accordion-header" onclick="this.classList.toggle('active'); this.nextElementSibling.classList.toggle('active');"><div class="va-employment-accordion-title"><h4 class="va-employment-accordion-company">${escapeHtml(emp.company || 'N/A')}</h4><p class="va-employment-accordion-position">${escapeHtml(emp.position || '')}</p><p class="va-employment-accordion-period">${escapeHtml(emp.period || '')}</p></div><svg class="va-employment-accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div><div class="va-employment-accordion-content">${descriptionHTML}</div></div>`;
  }).join('');
}

async function main() {
  console.log('🔧 Extrayendo y cargando employment history de Albert...\n');
  
  // Leer HTML
  const html = fs.readFileSync(HTML_FILE_PATH, 'utf8');
  
  // Extraer employment history
  const employmentHistory = extractEmploymentHistory(html);
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 EMPLOYMENT HISTORY EXTRAÍDO');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  employmentHistory.forEach((emp, index) => {
    console.log(`${index + 1}. ${emp.company}`);
    console.log(`   Position: ${emp.position}`);
    console.log(`   Period: ${emp.period}`);
    console.log(`   Description:`);
    if (emp.description) {
      emp.description.split('\n').forEach(line => {
        if (line.trim()) {
          console.log(`      ${line.trim()}`);
        }
      });
    }
    console.log('');
  });
  
  // Generar HTML
  const employmentHTML = generateEmploymentHTML(employmentHistory);
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📤 HTML GENERADO');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log(employmentHTML.substring(0, 500) + '...\n');
  
  // Obtener Albert del CMS
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
  
  const albert = allVAs.find(v => (v.fieldData.name || '').toLowerCase() === 'albert');
  
  if (!albert) {
    console.error('❌ Albert no encontrado en CMS');
    return;
  }
  
  console.log('✅ Albert encontrado en CMS\n');
  console.log('📤 Actualizando employment-richtext...\n');
  
  try {
    await apiClient.updateCollectionItem(vaCollection.id, albert.id, {
      'employment-richtext': employmentHTML
    });
    
    console.log('✅ Employment history actualizado exitosamente\n');
    console.log('════════════════════════════════════════════════════════════════════════════════');
    console.log('📊 RESUMEN');
    console.log('════════════════════════════════════════════════════════════════════════════════\n');
    console.log(`   Total empleos: ${employmentHistory.length}`);
    employmentHistory.forEach((emp, index) => {
      console.log(`   ${index + 1}. ${emp.company} - ${emp.position}`);
    });
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
}

main().catch(console.error);
