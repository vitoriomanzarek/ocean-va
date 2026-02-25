/**
 * Script para corregir específicamente el perfil de Abigail
 * - Employment History: contenido del dropdown sin estilos
 * - Education: duplicado 3 veces
 * - Education: falta el año (2011 - 2015)
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import fs from 'fs';
import path from 'path';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function fetchPage(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.text();
  } catch (error) {
    console.error(`❌ Error fetching ${url}:`, error.message);
    return null;
  }
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Extraer Employment History de HTML
function extractEmploymentHistory(html) {
  const employment = [];
  const accordionRegex = /<div[^>]*class="[^"]*va-employment-accordion[^"]*"[^>]*>(.*?)<\/div>\s*<\/div>/gis;
  let match;
  
  while ((match = accordionRegex.exec(html)) !== null) {
    const accordionHtml = match[0];
    
    const companyMatch = accordionHtml.match(/<h4[^>]*class="[^"]*va-employment-accordion-company[^"]*"[^>]*>([^<]+)<\/h4>/i);
    const company = companyMatch ? companyMatch[1].trim() : '';
    
    const positionMatch = accordionHtml.match(/<p[^>]*class="[^"]*va-employment-accordion-position[^"]*"[^>]*>([^<]+)<\/p>/i);
    const position = positionMatch ? positionMatch[1].trim() : '';
    
    const periodMatch = accordionHtml.match(/<p[^>]*class="[^"]*va-employment-accordion-period[^"]*"[^>]*>([^<]+)<\/p>/i);
    const period = periodMatch ? periodMatch[1].trim() : '';
    
    let description = '';
    const contentMatch = accordionHtml.match(/<div[^>]*class="[^"]*va-employment-accordion-content[^"]*"[^>]*>(.*?)<\/div>/gis);
    if (contentMatch) {
      const contentHtml = contentMatch[0];
      const pMatches = contentHtml.match(/<p[^>]*>(.*?)<\/p>/gis);
      if (pMatches) {
        description = pMatches.map(p => {
          return p
            .replace(/<p[^>]*>/i, '')
            .replace(/<\/p>/gi, '')
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .trim();
        }).filter(p => p && !p.match(/^(Current|Previous|Company|Position)$/i)).join('\n');
      }
      
      if (!description) {
        description = contentHtml
          .replace(/<div[^>]*class="[^"]*va-employment-accordion-content[^"]*"[^>]*>/i, '')
          .replace(/<\/div>/gi, '')
          .replace(/<br\s*\/?>/gi, '\n')
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .replace(/<[^>]+>/g, '')
          .trim();
      }
    }
    
    if (company || position) {
      employment.push({ company, position, period, description });
    }
  }
  
  return employment;
}

// Generar Employment History HTML con formato correcto (sin <p> anidados)
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

// Extraer Education de HTML
function extractEducation(html) {
  const education = [];
  const educationItemRegex = /<div[^>]*class="[^"]*va-education-item[^"]*"[^>]*>(.*?)<\/div>/gis;
  let match;
  
  while ((match = educationItemRegex.exec(html)) !== null) {
    const itemHtml = match[1];
    
    const schoolMatch = itemHtml.match(/<h3[^>]*class="[^"]*va-education-school[^"]*"[^>]*>([^<]+)<\/h3>/i) || 
                        itemHtml.match(/<h4[^>]*class="[^"]*va-education-school[^"]*"[^>]*>([^<]+)<\/h4>/i);
    const school = schoolMatch ? schoolMatch[1].trim() : '';
    
    const degreeMatch = itemHtml.match(/<p[^>]*class="[^"]*va-education-degree[^"]*"[^>]*>([^<]+)<\/p>/i);
    const degree = degreeMatch ? degreeMatch[1].trim() : '';
    
    const yearMatch = itemHtml.match(/<p[^>]*class="[^"]*va-education-year[^"]*"[^>]*>([^<]+)<\/p>/i);
    const year = yearMatch ? yearMatch[1].trim() : '';
    
    if (school || degree) {
      education.push({ school, degree, year });
    }
  }
  
  return education;
}

// Generar Education HTML (remover duplicados y agregar año)
function generateEducationHTML(education) {
  if (!education || education.length === 0) return '';
  
  // Remover duplicados
  const uniqueEducation = [];
  const seen = new Set();
  
  for (const edu of education) {
    const key = `${(edu.school || '').toLowerCase()}-${(edu.degree || '').toLowerCase()}`;
    if (key && !seen.has(key)) {
      seen.add(key);
      uniqueEducation.push(edu);
    }
  }
  
  // Si no hay año pero sabemos que debe ser 2011 - 2015, agregarlo
  if (uniqueEducation.length > 0 && !uniqueEducation[0].year) {
    uniqueEducation[0].year = '2011 - 2015';
  }
  
  return uniqueEducation.map(edu => `
    <div class="va-education-item">
      <h3 class="va-education-school">${escapeHtml(edu.school || '')}</h3>
      <p class="va-education-degree">${escapeHtml(edu.degree || '')}</p>
      <p class="va-education-year">${escapeHtml(edu.year || '')}</p>
    </div>
  `).join('');
}

async function main() {
  console.log('🔧 Corrigiendo perfil de Abigail...\n');
  
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
  
  const abigail = allVAs.find(v => (v.fieldData.slug || '').toLowerCase() === 'abigail');
  
  if (!abigail) {
    console.error('❌ Abigail no encontrado');
    return;
  }
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 ABIGAIL - ESTADO ACTUAL');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const currentEmployment = abigail.fieldData['employment-richtext'] || '';
  const currentEducation = abigail.fieldData['education-richtext'] || '';
  
  console.log('Employment History:');
  console.log(`   Tiene accordion: ${currentEmployment.includes('va-employment-accordion')}`);
  console.log(`   Tiene description: ${currentEmployment.includes('va-employment-accordion-description')}`);
  
  // Contar items de education
  const educationMatches = currentEducation.match(/va-education-item/g);
  const educationCount = educationMatches ? educationMatches.length : 0;
  console.log(`\nEducation:`);
  console.log(`   Items encontrados: ${educationCount}`);
  console.log('');
  
  // Extraer data de página web
  const abigailUrl = 'https://www.oceanvirtualassistant.com/abigail-ocean-va-profile';
  console.log(`🌐 Visitando: ${abigailUrl}\n`);
  
  const html = await fetchPage(abigailUrl);
  
  if (!html) {
    console.error('❌ No se pudo obtener HTML de la página');
    return;
  }
  
  console.log('✅ HTML obtenido, extrayendo datos...\n');
  
  const extractedEmployment = extractEmploymentHistory(html);
  const extractedEducation = extractEducation(html);
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📊 DATOS EXTRAÍDOS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  console.log('EMPLOYMENT HISTORY:');
  extractedEmployment.forEach((emp, idx) => {
    console.log(`   ${idx + 1}. ${emp.company} - ${emp.position} (${emp.period})`);
  });
  console.log('');
  
  console.log('EDUCATION:');
  extractedEducation.forEach((edu, idx) => {
    console.log(`   ${idx + 1}. ${edu.school} - ${edu.degree} (${edu.year || 'SIN AÑO'})`);
  });
  console.log('');
  
  // Generar HTML correcto
  const newEmploymentHTML = generateEmploymentHTML(extractedEmployment);
  const newEducationHTML = generateEducationHTML(extractedEducation);
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('🔧 CORRECCIONES');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const updates = {};
  
  if (newEmploymentHTML && newEmploymentHTML !== currentEmployment) {
    updates['employment-richtext'] = newEmploymentHTML;
    console.log('✓ Employment History será actualizado (formato correcto, sin <p> anidados)');
  }
  
  if (newEducationHTML && newEducationHTML !== currentEducation) {
    updates['education-richtext'] = newEducationHTML;
    console.log('✓ Education será actualizado (duplicados removidos, año agregado: 2011 - 2015)');
  }
  
  if (Object.keys(updates).length === 0) {
    console.log('⚠️  No hay cambios necesarios\n');
    return;
  }
  
  console.log('');
  console.log('📤 Actualizando CMS...\n');
  
  try {
    await apiClient.updateCollectionItem(vaCollection.id, abigail.id, updates);
    console.log('✅ Abigail actualizado exitosamente\n');
    
    console.log('════════════════════════════════════════════════════════════════════════════════');
    console.log('📋 RESUMEN');
    console.log('════════════════════════════════════════════════════════════════════════════════\n');
    console.log('Campos actualizados:', Object.keys(updates).join(', '));
    if (updates['education-richtext']) {
      console.log('\nEducation final:');
      const finalEducation = extractEducation(newEducationHTML);
      finalEducation.forEach((edu, idx) => {
        console.log(`   ${idx + 1}. ${edu.school} - ${edu.degree} (${edu.year})`);
      });
    }
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
  }
}

main().catch(console.error);
