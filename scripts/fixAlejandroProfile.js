/**
 * Script para arreglar el perfil de Alejandro:
 * - Employment history sin estilos en dropdown
 * - Education falta el año 2022
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import fs from 'fs';
import path from 'path';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;
const HTML_FILE_PATH = path.join(process.cwd(), 'webflow-components-minified/236-alejandro-profile.html');

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
  const accordionRegex = /<div[^>]*class="[^"]*va-employment-accordion[^"]*"[^>]*>(.*?)<\/div>\s*<\/div>/gis;
  let accordionMatch;
  
  while ((accordionMatch = accordionRegex.exec(html)) !== null) {
    const accordionHtml = accordionMatch[0];
    
    const companyMatch = accordionHtml.match(/<h4[^>]*class="[^"]*va-employment-accordion-company[^"]*"[^>]*>([^<]+)<\/h4>/i);
    const company = companyMatch ? companyMatch[1].trim() : '';
    
    const positionMatch = accordionHtml.match(/<p[^>]*class="[^"]*va-employment-accordion-position[^"]*"[^>]*>([^<]+)<\/p>/i);
    const position = positionMatch ? positionMatch[1].trim() : '';
    
    const periodMatch = accordionHtml.match(/<p[^>]*class="[^"]*va-employment-accordion-period[^"]*"[^>]*>([^<]+)<\/p>/i);
    const period = periodMatch ? periodMatch[1].trim() : '';
    
    let description = '';
    const ulMatch = accordionHtml.match(/<ul[^>]*class="[^"]*va-employment-accordion-description[^"]*"[^>]*>(.*?)<\/ul>/is);
    if (ulMatch) {
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

// Extraer education del HTML
function extractEducation(html) {
  const education = [];
  const eduRegex = /<div[^>]*class="[^"]*va-education-item[^"]*"[^>]*>(.*?)<\/div>/gis;
  let eduMatch;
  
  while ((eduMatch = eduRegex.exec(html)) !== null) {
    const eduHtml = eduMatch[1];
    
    const schoolMatch = eduHtml.match(/<h3[^>]*class="[^"]*va-education-school[^"]*"[^>]*>([^<]+)<\/h3>/i);
    const school = schoolMatch ? schoolMatch[1].trim() : '';
    
    const degreeMatch = eduHtml.match(/<p[^>]*class="[^"]*va-education-degree[^"]*"[^>]*>([^<]+)<\/p>/i);
    const degree = degreeMatch ? degreeMatch[1].trim() : '';
    
    const yearMatch = eduHtml.match(/<p[^>]*class="[^"]*va-education-year[^"]*"[^>]*>([^<]+)<\/p>/i);
    let year = yearMatch ? yearMatch[1].trim() : '';
    
    // Si no hay año pero sabemos que debe ser 2022, agregarlo
    if (!year && school) {
      year = '2022';
    }
    
    if (school || degree) {
      education.push({ school, degree, year });
    }
  }
  
  return education;
}

// Generar HTML de employment history
function generateEmploymentHTML(employmentHistory) {
  if (!employmentHistory || employmentHistory.length === 0) return '';
  
  return employmentHistory.map(emp => {
    let descriptionHTML = '';
    if (emp.description) {
      const lines = emp.description.split('\n')
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

// Generar HTML de education
function generateEducationHTML(education) {
  if (!education || education.length === 0) return '';
  
  return education.map(edu => `
    <div class="va-education-item">
      <h3 class="va-education-school">${escapeHtml(edu.school || '')}</h3>
      <p class="va-education-degree">${escapeHtml(edu.degree || '')}</p>
      <p class="va-education-year">${escapeHtml(edu.year || '')}</p>
    </div>
  `).join('');
}

async function main() {
  console.log('🔧 Arreglando perfil de Alejandro...\n');
  
  // Leer HTML
  const html = fs.readFileSync(HTML_FILE_PATH, 'utf8');
  
  // Extraer datos
  const employmentHistory = extractEmploymentHistory(html);
  const education = extractEducation(html);
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 DATOS EXTRAÍDOS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  console.log('Employment History:');
  employmentHistory.forEach((emp, index) => {
    console.log(`  ${index + 1}. ${emp.company} - ${emp.position}`);
  });
  
  console.log('\nEducation:');
  education.forEach((edu, index) => {
    console.log(`  ${index + 1}. ${edu.school} - ${edu.degree} - ${edu.year || '(sin año)'}`);
  });
  
  // Generar HTML
  const employmentHTML = generateEmploymentHTML(employmentHistory);
  const educationHTML = generateEducationHTML(education);
  
  // Obtener Alejandro del CMS
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
  
  const alejandro = allVAs.find(v => (v.fieldData.name || '').toLowerCase() === 'alejandro');
  
  if (!alejandro) {
    console.error('❌ Alejandro no encontrado en CMS');
    return;
  }
  
  console.log('\n✅ Alejandro encontrado en CMS\n');
  console.log('📤 Actualizando campos...\n');
  
  try {
    const updates = {};
    
    if (employmentHistory.length > 0) {
      updates['employment-richtext'] = employmentHTML;
      console.log('✓ Employment history actualizado');
    }
    
    if (education.length > 0) {
      updates['education-richtext'] = educationHTML;
      console.log('✓ Education actualizado (con año 2022)');
    }
    
    await apiClient.updateCollectionItem(vaCollection.id, alejandro.id, updates);
    
    console.log('\n✅ Perfil de Alejandro actualizado exitosamente\n');
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
}

main().catch(console.error);
