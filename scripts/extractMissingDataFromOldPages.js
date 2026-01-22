/**
 * Script para extraer data faltante de páginas web antiguas y corregir problemas
 * - Employment History con descripciones vacías
 * - Education faltante
 * - English Scores faltantes
 * - Formato de bullet points
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import fs from 'fs';
import path from 'path';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

// VAs que necesitan corrección
const VAs_TO_FIX = [
  { slug: 'aaron-a0d16', name: 'Aaron', url: 'https://www.oceanvirtualassistant.com/aaron-ocean-va-profile' },
  { slug: 'albert', name: 'Albert', url: 'https://www.oceanvirtualassistant.com/albert-ocean-va-profile' },
  { slug: 'alejandro', name: 'Alejandro', url: 'https://www.oceanvirtualassistant.com/alejandro-ocean-va-profile' },
  { slug: 'ac', name: 'AC', url: 'https://www.oceanvirtualassistant.com/ac-ocean-va-profile' },
];

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

// Extraer Employment History completo de la página
function extractEmploymentHistory(html) {
  const employment = [];
  
  // Buscar accordions de employment
  const accordionRegex = /<div[^>]*class="[^"]*va-employment-accordion[^"]*"[^>]*>(.*?)<\/div>\s*<\/div>/gis;
  let match;
  
  while ((match = accordionRegex.exec(html)) !== null) {
    const accordionHtml = match[0];
    
    // Extraer company
    const companyMatch = accordionHtml.match(/<h4[^>]*class="[^"]*va-employment-accordion-company[^"]*"[^>]*>([^<]+)<\/h4>/i);
    const company = companyMatch ? companyMatch[1].trim() : '';
    
    // Extraer position
    const positionMatch = accordionHtml.match(/<p[^>]*class="[^"]*va-employment-accordion-position[^"]*"[^>]*>([^<]+)<\/p>/i);
    const position = positionMatch ? positionMatch[1].trim() : '';
    
    // Extraer period
    const periodMatch = accordionHtml.match(/<p[^>]*class="[^"]*va-employment-accordion-period[^"]*"[^>]*>([^<]+)<\/p>/i);
    const period = periodMatch ? periodMatch[1].trim() : '';
    
    // Extraer description - buscar en múltiples formatos
    let description = '';
    
    // Formato 1: con clase va-employment-accordion-description
    const descMatch1 = accordionHtml.match(/<p[^>]*class="[^"]*va-employment-accordion-description[^"]*"[^>]*>(.*?)<\/p>/gis);
    if (descMatch1) {
      description = descMatch1[0]
        .replace(/<p[^>]*class="[^"]*va-employment-accordion-description[^"]*"[^>]*>/i, '')
        .replace(/<\/p>/gi, '')
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .trim();
    }
    
    // Si no se encontró, buscar en formato alternativo (bullet points)
    if (!description) {
      // Buscar listas ul/li dentro del accordion
      const listMatch = accordionHtml.match(/<ul[^>]*>(.*?)<\/ul>/gis);
      if (listMatch) {
        const listItems = listMatch[0].match(/<li[^>]*>(.*?)<\/li>/gis);
        if (listItems) {
          description = listItems.map(li => {
            return li
              .replace(/<li[^>]*>/i, '• ')
              .replace(/<\/li>/gi, '')
              .replace(/<br\s*\/?>/gi, '\n')
              .replace(/&nbsp;/g, ' ')
              .replace(/&amp;/g, '&')
              .trim();
          }).join('\n');
        }
      }
    }
    
    // Si aún no hay descripción, buscar párrafos dentro del accordion
    if (!description) {
      const pMatches = accordionHtml.match(/<p[^>]*>(.*?)<\/p>/gis);
      if (pMatches && pMatches.length > 3) { // Más de company, position, period
        const descParagraphs = pMatches.slice(3); // Saltar los primeros 3
        description = descParagraphs.map(p => {
          return p
            .replace(/<p[^>]*>/i, '')
            .replace(/<\/p>/gi, '')
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .trim();
        }).filter(p => p && !p.match(/^(Current|Previous|Company|Position)$/i)).join('\n');
      }
    }
    
    if (company || position) {
      employment.push({ company, position, period, description });
    }
  }
  
  return employment;
}

// Extraer Education de la página
function extractEducation(html) {
  const education = [];
  
  // Buscar items de education
  const educationItemRegex = /<div[^>]*class="[^"]*va-education-item[^"]*"[^>]*>(.*?)<\/div>/gis;
  let match;
  
  while ((match = educationItemRegex.exec(html)) !== null) {
    const itemHtml = match[1];
    
    const schoolMatch = itemHtml.match(/<h3[^>]*class="[^"]*va-education-school[^"]*"[^>]*>([^<]+)<\/h3>/i);
    const school = schoolMatch ? schoolMatch[1].trim() : '';
    
    const degreeMatch = itemHtml.match(/<p[^>]*class="[^"]*va-education-degree[^"]*"[^>]*>([^<]+)<\/p>/i);
    const degree = degreeMatch ? degreeMatch[1].trim() : '';
    
    const yearMatch = itemHtml.match(/<p[^>]*class="[^"]*va-education-year[^"]*"[^>]*>([^<]+)<\/p>/i);
    const year = yearMatch ? yearMatch[1].trim() : '';
    
    if (school || degree) {
      education.push({ school, degree, year });
    }
  }
  
  // Si no se encontró con el formato nuevo, buscar formato alternativo
  if (education.length === 0) {
    // Buscar sección de Education en HTML
    const educationSection = html.match(/<h2[^>]*>EDUCATION<\/h2>(.*?)(?:<h2|<div class="va-|<\/body)/gis);
    if (educationSection) {
      const sectionHtml = educationSection[0];
      
      // Buscar patrones de educación
      const eduPatterns = [
        /([A-Z][^<]+(?:University|College|School|Institute)[^<]*)/gi,
        /([A-Z][^<]+(?:Bachelor|Master|Degree|Diploma|Certificate)[^<]*)/gi
      ];
      
      for (const pattern of eduPatterns) {
        const matches = sectionHtml.match(pattern);
        if (matches) {
          matches.forEach(match => {
            const cleanMatch = match.replace(/<[^>]+>/g, '').trim();
            if (cleanMatch && cleanMatch.length > 5) {
              education.push({
                school: cleanMatch.split('–')[0].trim(),
                degree: cleanMatch.split('–')[1]?.trim() || '',
                year: ''
              });
            }
          });
        }
      }
    }
  }
  
  // Remover duplicados
  const uniqueEducation = [];
  const seen = new Set();
  
  for (const edu of education) {
    const key = `${edu.school}-${edu.degree}`.toLowerCase();
    if (key && !seen.has(key)) {
      seen.add(key);
      uniqueEducation.push(edu);
    }
  }
  
  return uniqueEducation;
}

// Extraer English Score
function extractEnglishScore(html) {
  // Buscar en múltiples formatos
  const patterns = [
    /<div[^>]*class="[^"]*va-english-score[^"]*"[^>]*>([^<]+)<\/div>/i,
    /English[^<]*Score[^<]*:?\s*([0-9\/A-Z]+)/i,
    /EF English Test[^<]*([0-9\/A-Z]+)/i,
    /([0-9]+\/[0-9]+\s*[A-Z][0-9]?)/i
  ];
  
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  
  return null;
}

// Generar HTML de Employment History
function generateEmploymentHTML(employmentHistory) {
  if (!employmentHistory || employmentHistory.length === 0) return '';
  
  return employmentHistory.map(emp => {
    // Formatear descripción con saltos de línea correctos
    let description = '';
    if (emp.description) {
      // Si tiene bullet points, mantenerlos
      if (emp.description.includes('•')) {
        description = emp.description.split('\n').map(line => {
          line = line.trim();
          if (line.startsWith('•')) {
            return `<p>${line}</p>`;
          } else if (line) {
            return `<p>${line}</p>`;
          }
          return '';
        }).filter(Boolean).join('');
      } else {
        // Si no tiene bullet points, agregar párrafos
        description = emp.description.split('\n').map(line => {
          line = line.trim();
          return line ? `<p>${line}</p>` : '';
        }).filter(Boolean).join('');
      }
    }
    
    return `
      <div class="va-employment-accordion">
        <h4 class="va-employment-accordion-company">${emp.company || ''}</h4>
        <p class="va-employment-accordion-position">${emp.position || ''}</p>
        <p class="va-employment-accordion-period">${emp.period || ''}</p>
        <p class="va-employment-accordion-description">${description}</p>
      </div>
    `;
  }).join('');
}

// Generar HTML de Education
function generateEducationHTML(education) {
  if (!education || education.length === 0) return '';
  
  // Remover duplicados
  const uniqueEducation = [];
  const seen = new Set();
  
  for (const edu of education) {
    const key = `${edu.school}-${edu.degree}`.toLowerCase();
    if (key && !seen.has(key)) {
      seen.add(key);
      uniqueEducation.push(edu);
    }
  }
  
  return uniqueEducation.map(edu => `
    <div class="va-education-item">
      <h3 class="va-education-school">${edu.school || ''}</h3>
      <p class="va-education-degree">${edu.degree || ''}</p>
      <p class="va-education-year">${edu.year || ''}</p>
    </div>
  `).join('');
}

async function main() {
  console.log('🔍 Extrayendo data faltante de páginas web antiguas...\n');
  
  const apiClient = new WebflowApiClient(WEBFLOW_API_TOKEN);
  const site = await apiClient.getSite(SITE_ID);
  const collectionsResponse = await apiClient.getCollections(SITE_ID);
  const vaCollection = collectionsResponse.collections.find(c => c.slug === 'virtual-assistants');
  
  // Obtener todos los VAs
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
  
  console.log(`✅ Total VAs en CMS: ${allVAs.length}\n`);
  console.log('═'.repeat(80));
  console.log('');
  
  const stats = {
    employmentFixed: 0,
    educationAdded: 0,
    englishScoreAdded: 0,
    errors: 0
  };
  
  for (const vaToFix of VAs_TO_FIX) {
    const va = allVAs.find(v => (v.fieldData.slug || '').toLowerCase() === vaToFix.slug.toLowerCase());
    
    if (!va) {
      console.log(`❌ ${vaToFix.name} (${vaToFix.slug}): NO ENCONTRADO EN CMS\n`);
      continue;
    }
    
    console.log(`📋 ${vaToFix.name.toUpperCase()} (${vaToFix.slug})`);
    console.log(`   CMS ID: ${va.id}`);
    console.log(`   🌐 Visitando: ${vaToFix.url}\n`);
    
    // Extraer data de la página web
    const html = await fetchPage(vaToFix.url);
    
    if (!html) {
      console.log(`   ❌ No se pudo obtener HTML de la página\n`);
      stats.errors++;
      continue;
    }
    
    console.log('   ✅ HTML obtenido, extrayendo datos...\n');
    
    const extracted = {
      employmentHistory: extractEmploymentHistory(html),
      education: extractEducation(html),
      englishScore: extractEnglishScore(html)
    };
    
    console.log(`   📊 DATOS EXTRAÍDOS:`);
    console.log(`      Employment History: ${extracted.employmentHistory.length} items`);
    extracted.employmentHistory.forEach((emp, idx) => {
      console.log(`         ${idx + 1}. ${emp.company} - ${emp.position} (${emp.period})`);
      console.log(`            Descripción: ${emp.description ? 'Sí (' + emp.description.substring(0, 50) + '...)' : 'No'}`);
    });
    console.log(`      Education: ${extracted.education.length} items`);
    extracted.education.forEach((edu, idx) => {
      console.log(`         ${idx + 1}. ${edu.school} - ${edu.degree} (${edu.year})`);
    });
    console.log(`      English Score: ${extracted.englishScore || 'No encontrado'}\n`);
    
    // Preparar actualizaciones
    const updates = {};
    let needsUpdate = false;
    
    // 1. Corregir Employment History
    const currentEmployment = va.fieldData['employment-richtext'] || '';
    if (extracted.employmentHistory.length > 0) {
      const newEmploymentHTML = generateEmploymentHTML(extracted.employmentHistory);
      if (newEmploymentHTML && newEmploymentHTML !== currentEmployment) {
        updates['employment-richtext'] = newEmploymentHTML;
        needsUpdate = true;
        stats.employmentFixed++;
        console.log('   ✓ Employment History actualizado');
      }
    }
    
    // 2. Agregar Education si falta
    const currentEducation = va.fieldData['education-richtext'] || '';
    if (extracted.education.length > 0 && !currentEducation) {
      const newEducationHTML = generateEducationHTML(extracted.education);
      if (newEducationHTML) {
        updates['education-richtext'] = newEducationHTML;
        needsUpdate = true;
        stats.educationAdded++;
        console.log('   ✓ Education agregado');
      }
    }
    
    // 3. Agregar English Score si falta
    const currentEnglishScore = va.fieldData['english-score-3'] || '';
    if (extracted.englishScore && !currentEnglishScore) {
      updates['english-score-3'] = extracted.englishScore;
      needsUpdate = true;
      stats.englishScoreAdded++;
      console.log(`   ✓ English Score agregado: ${extracted.englishScore}`);
    }
    
    // Aplicar actualizaciones
    if (needsUpdate) {
      try {
        await apiClient.updateCollectionItem(vaCollection.id, va.id, updates);
        console.log(`   ✅ Actualizado exitosamente\n`);
      } catch (error) {
        console.error(`   ❌ Error: ${error.message}\n`);
        stats.errors++;
      }
    } else {
      console.log(`   ⚠️  No hay cambios para actualizar\n`);
    }
    
    // Delay para evitar rate limits
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('═'.repeat(80));
  console.log('📊 RESUMEN FINAL');
  console.log('═'.repeat(80));
  console.log(`   Employment History corregido: ${stats.employmentFixed}`);
  console.log(`   Education agregado: ${stats.educationAdded}`);
  console.log(`   English Scores agregados: ${stats.englishScoreAdded}`);
  console.log(`   Errores: ${stats.errors}`);
  console.log('═'.repeat(80));
  console.log('');
}

main().catch(console.error);
