/**
 * Script maestro para extraer datos de TODOS los VAs desde sus componentes HTML minificados
 * y cargarlos al CMS en el formato correcto para el template dinámico
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import fs from 'fs';
import path from 'path';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;
const HTML_DIR = path.join(process.cwd(), 'webflow-components-minified');

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Extraer nombre del VA del HTML
function extractName(html) {
  const nameMatch = html.match(/<h1[^>]*class="[^"]*va-profile-name[^"]*"[^>]*>([^<]+)<\/h1>/i);
  return nameMatch ? nameMatch[1].trim().toUpperCase() : '';
}

// Extraer employment history
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

// Extraer education
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
    
    // Buscar año - puede estar en un <p> con class va-education-year o en el mismo degree
    const yearMatch = eduHtml.match(/<p[^>]*class="[^"]*va-education-year[^"]*"[^>]*>([^<]+)<\/p>/i) ||
                     eduHtml.match(/<p[^>]*style="[^"]*font-size:\s*12px[^"]*"[^>]*>([^<]+)<\/p>/i) ||
                     eduHtml.match(/(\d{4})/);
    const year = yearMatch ? (yearMatch[1] || yearMatch[0]).trim() : '';
    
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

// Obtener todos los archivos HTML de perfiles
function getProfileHTMLFiles() {
  const files = fs.readdirSync(HTML_DIR);
  return files
    .filter(file => file.match(/^\d+-.*-profile\.html$/i))
    .map(file => path.join(HTML_DIR, file));
}

async function main() {
  console.log('🚀 Procesando TODOS los VAs desde HTML minificados...\n');
  
  // Obtener todos los archivos HTML
  const htmlFiles = getProfileHTMLFiles();
  console.log(`✅ Encontrados ${htmlFiles.length} archivos HTML de perfiles\n`);
  
  // Obtener todos los VAs del CMS
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
  
  console.log(`✅ Encontrados ${allVAs.length} VAs en CMS\n`);
  
  let processed = 0;
  let updated = 0;
  let errors = 0;
  let skipped = 0;
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 PROCESANDO VAs');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  for (const htmlFile of htmlFiles) {
    try {
      const html = fs.readFileSync(htmlFile, 'utf8');
      const vaName = extractName(html);
      
      if (!vaName) {
        console.log(`⚠️  ${path.basename(htmlFile)}: No se pudo extraer nombre, saltando`);
        skipped++;
        continue;
      }
      
      // Buscar VA en CMS
      const va = allVAs.find(v => (v.fieldData.name || '').toUpperCase() === vaName);
      
      if (!va) {
        console.log(`⚠️  ${vaName}: No encontrado en CMS, saltando`);
        skipped++;
        continue;
      }
      
      // Extraer datos
      const employmentHistory = extractEmploymentHistory(html);
      const education = extractEducation(html);
      
      // Generar HTML
      const employmentHTML = generateEmploymentHTML(employmentHistory);
      const educationHTML = generateEducationHTML(education);
      
      // Actualizar CMS
      const updates = {};
      let hasUpdates = false;
      
      if (employmentHistory.length > 0) {
        updates['employment-richtext'] = employmentHTML;
        hasUpdates = true;
      }
      
      if (education.length > 0) {
        updates['education-richtext'] = educationHTML;
        hasUpdates = true;
      }
      
      if (hasUpdates) {
        await apiClient.updateCollectionItem(vaCollection.id, va.id, updates);
        console.log(`✓ ${vaName}: Actualizado (${employmentHistory.length} empleos, ${education.length} educaciones)`);
        updated++;
      } else {
        console.log(`- ${vaName}: Sin datos para actualizar`);
      }
      
      processed++;
      
      // Pequeña pausa para no sobrecargar la API
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.error(`❌ ${path.basename(htmlFile)}: Error - ${error.message}`);
      errors++;
    }
  }
  
  console.log('\n════════════════════════════════════════════════════════════════════════════════');
  console.log('📊 RESUMEN FINAL');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log(`   Archivos HTML procesados: ${processed}`);
  console.log(`   VAs actualizados: ${updated}`);
  console.log(`   Omitidos: ${skipped}`);
  console.log(`   Errores: ${errors}`);
}

main().catch(console.error);
