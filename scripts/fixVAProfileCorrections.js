/**
 * Script maestro para corregir problemas en perfiles VA
 * Basado en el análisis de los primeros 10 VAs y escalable a todos
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

// Mapeo de slugs del CMS a slugs de URL
const SLUG_MAPPING = {
  'aaron-a0d16': 'aaron',
  'karl-bd0a3': 'karl',
  'bernadette-abellana': 'bernadette',
  'vicente-penaflor': 'vicente',
  'louise-a-siloterio': 'louise',
  'ximena-4e77d': 'ximena',
  'grace': 'grace-carmel',
  'maria-d': 'maria-d',
  'ellen': 'ellen-rose',
  'brandon': 'brandon-l',
  'ana': 'ana-s',
  'rona': 'rona-mae',
  'joji': 'joji-marie',
  'jay': 'jay-alvin',
  'cherry': 'cherry-mae',
  'ximena': 'ximena-g',
};

function getUrlSlug(cmsSlug) {
  return SLUG_MAPPING[cmsSlug] || cmsSlug;
}

function buildProfileUrl(cmsSlug) {
  const urlSlug = getUrlSlug(cmsSlug);
  return `https://www.oceanvirtualassistant.com/${urlSlug}-ocean-va-profile`;
}

// VAs a corregir (primeros 10)
const VAs_TO_FIX = [
  { slug: 'ac', name: 'AC', issues: ['employment-history-styles', 'education-duplicate'] },
  { slug: 'aaron-a0d16', name: 'Aaron', issues: ['employment-history-styles', 'education-empty', 'english-score-missing'] },
  { slug: 'abigail', name: 'Abigail', issues: ['employment-history-no-company', 'education-duplicate'] },
  { slug: 'albert', name: 'Albert', issues: ['employment-history-styles', 'education-empty', 'english-score-missing', 'disc-type'] },
  { slug: 'alejandro', name: 'Alejandro', issues: ['employment-history-no-company', 'employment-history-bullets', 'education-duplicate'] },
  { slug: 'ana', name: 'Ana', issues: ['employment-summary-erroneous', 'employment-history-no-company', 'employment-history-bullets', 'education-duplicate', 'education-year-missing', 'english-score-missing'] },
  { slug: 'ana-gabriela', name: 'Ana Gabriela', issues: ['employment-summary-erroneous', 'employment-history-empty', 'education-styles', 'education-symbols'] },
  { slug: 'ana-victoria', name: 'Ana Victoria', issues: ['employment-summary-erroneous', 'employment-history-no-company', 'employment-history-bullets', 'disc-description', 'english-score-missing'] },
  { slug: 'anahi', name: 'Anahi', issues: ['employment-history-no-company', 'employment-history-empty', 'disc-type', 'disc-description', 'education-duplicate', 'education-year-missing'] },
  { slug: 'alyssa', name: 'Alyssa', issues: ['employment-summary-erroneous'] },
];

// Modo dry-run (no actualiza CMS)
const DRY_RUN = process.argv.includes('--dry-run') || process.argv.includes('--dryrun');

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
    console.error(`   ❌ Error fetching ${url}:`, error.message);
    return null;
  }
}

// Escapar HTML
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Generar HTML de Employment History con estructura correcta (header/content)
function generateEmploymentHTML(employmentHistory) {
  if (!employmentHistory || employmentHistory.length === 0) return '';
  
  return employmentHistory.map(emp => {
    // Formatear descripción: cada bullet en su propio <p>
    let descriptionHTML = '';
    if (emp.description) {
      const bullets = emp.description.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
      
      descriptionHTML = bullets.map(bullet => {
        // Si no tiene bullet, agregarlo
        if (!bullet.startsWith('•')) {
          return `<p>• ${escapeHtml(bullet)}</p>`;
        }
        return `<p>${escapeHtml(bullet)}</p>`;
      }).join('');
    }
    
    // Estructura accordion con header y content
    return `
      <div class="va-employment-accordion">
        <div class="va-employment-accordion-header" onclick="this.classList.toggle('active'); this.nextElementSibling.classList.toggle('active');">
          <div class="va-employment-accordion-title">
            <h4 class="va-employment-accordion-company">${escapeHtml(emp.company || 'N/A')}</h4>
            <p class="va-employment-accordion-position">${escapeHtml(emp.position || '')}</p>
            <p class="va-employment-accordion-period">${escapeHtml(emp.period || '')}</p>
          </div>
          <svg class="va-employment-accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="va-employment-accordion-content">
          <p class="va-employment-accordion-description">${descriptionHTML}</p>
        </div>
      </div>
    `;
  }).join('');
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
    const descMatch = accordionHtml.match(/<p[^>]*class="[^"]*va-employment-accordion-description[^"]*"[^>]*>(.*?)<\/p>/gis);
    if (descMatch) {
      description = descMatch[0]
        .replace(/<p[^>]*class="[^"]*va-employment-accordion-description[^"]*"[^>]*>/i, '')
        .replace(/<\/p>/gi, '\n')
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/<[^>]+>/g, '')
        .trim();
    }
    
    if (company || position) {
      employment.push({ company, position, period, description });
    }
  }
  
  return employment;
}

// Generar HTML de Education sin duplicados
function generateEducationHTML(education) {
  if (!education || education.length === 0) return '';
  
  // Remover duplicados por (school, degree)
  const uniqueEducation = [];
  const seen = new Set();
  
  for (const edu of education) {
    const key = `${(edu.school || '').toLowerCase()}-${(edu.degree || '').toLowerCase()}`;
    if (key && !seen.has(key)) {
      seen.add(key);
      uniqueEducation.push(edu);
    }
  }
  
  return uniqueEducation.map(edu => {
    // Limpiar símbolos raros
    const school = (edu.school || '').replace(/[^\w\s\-&.,()]/g, '').trim();
    const degree = (edu.degree || '').replace(/[^\w\s\-&.,()]/g, '').trim();
    const year = (edu.year || '').replace(/[^\w\s\-&.,()]/g, '').trim();
    
    return `
      <div class="va-education-item">
        <h3 class="va-education-school">${escapeHtml(school)}</h3>
        <p class="va-education-degree">${escapeHtml(degree)}</p>
        <p class="va-education-year">${escapeHtml(year)}</p>
      </div>
    `;
  }).join('');
}

// Extraer Education de HTML
function extractEducation(html) {
  const education = [];
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
  
  return education;
}

// Extraer English Score
function extractEnglishScore(html) {
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

// Corregir DISC Description: párrafo por letra con salto de línea
function fixDiscDescription(discType, currentDescription) {
  if (!discType || discType.length <= 1) return currentDescription;
  
  // Si tiene múltiples letras (ej: C+S, S+I)
  if (discType.length > 1 && discType.includes('+')) {
    const letters = discType.split('+');
    const descriptions = {
      'C': 'Conscientiousness (C) - Detail-oriented and organized. C-type VAs ensure accuracy, maintain structured systems, and deliver high-quality work.',
      'S': 'Steadiness (S) - Dependable and patient. S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.',
      'I': 'Influence (I) - Enthusiastic and collaborative. I-type VAs excel at communication, build rapport easily, and contribute positively to team dynamics.',
      'D': 'Dominance (D) - Proactive and goal-driven. D-type VAs take initiative, solve problems efficiently, and thrive in fast-paced environments.'
    };
    
    const paragraphs = letters.map(letter => descriptions[letter.trim()] || '').filter(Boolean);
    return paragraphs.join('<br><br>');
  }
  
  return currentDescription;
}

// Leer CSV
function loadCSV() {
  const csvPath = path.join(process.cwd(), 'src/data/carga-vas-2026.csv');
  if (!fs.existsSync(csvPath)) return null;
  
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true
  });
  
  return records;
}

async function main() {
  console.log('🔧 Corrigiendo perfiles VA...\n');
  if (DRY_RUN) {
    console.log('⚠️  MODO DRY-RUN: No se actualizará el CMS\n');
  }
  
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
  
  // Cargar CSV
  const csvRecords = loadCSV();
  const csvMap = new Map();
  if (csvRecords) {
    csvRecords.forEach(record => {
      const slug = (record.slug || '').toLowerCase();
      if (slug) csvMap.set(slug, record);
    });
  }
  
  console.log(`✅ Total VAs en CMS: ${allVAs.length}\n`);
  console.log('═'.repeat(80));
  console.log('');
  
  const stats = {
    processed: 0,
    updated: 0,
    skipped: 0,
    errors: 0
  };
  
  for (const vaToFix of VAs_TO_FIX) {
    const va = allVAs.find(v => (v.fieldData.slug || '').toLowerCase() === vaToFix.slug.toLowerCase());
    
    if (!va) {
      console.log(`❌ ${vaToFix.name} (${vaToFix.slug}): NO ENCONTRADO EN CMS\n`);
      stats.skipped++;
      continue;
    }
    
    console.log(`📋 ${vaToFix.name.toUpperCase()} (${vaToFix.slug})`);
    console.log(`   CMS ID: ${va.id}`);
    console.log(`   Problemas: ${vaToFix.issues.join(', ')}\n`);
    
    const updates = {};
    let needsUpdate = false;
    
    // Obtener data del CSV
    const csvData = csvMap.get(vaToFix.slug.toLowerCase());
    
    // Construir URL de página antigua
    const profileUrl = buildProfileUrl(vaToFix.slug);
    let pageHTML = null;
    
    // Si necesita extraer de página web, hacerlo
    const needsWebExtraction = vaToFix.issues.some(issue => 
      issue.includes('employment-history') || 
      issue.includes('education') || 
      issue.includes('english-score')
    );
    
    if (needsWebExtraction) {
      console.log(`   🌐 Visitando: ${profileUrl}`);
      pageHTML = await fetchPage(profileUrl);
      if (pageHTML) {
        console.log(`   ✅ HTML obtenido\n`);
      } else {
        console.log(`   ⚠️  No se pudo obtener HTML\n`);
      }
    }
    
    // 1. Corregir Employment Summary
    if (vaToFix.issues.includes('employment-summary-erroneous')) {
      if (csvData && csvData['employment-summary']) {
        updates['employment-summary'] = csvData['employment-summary'];
        needsUpdate = true;
        console.log('   ✓ Employment Summary corregido desde CSV');
      }
    }
    
    // 2. Corregir Employment History
    if (vaToFix.issues.some(i => i.includes('employment-history'))) {
      let employmentHistory = null;
      
      // Intentar desde página web
      if (pageHTML) {
        employmentHistory = extractEmploymentHistory(pageHTML);
      }
      
      // Si no se obtuvo, intentar desde CSV
      if (!employmentHistory && csvData && csvData['employment-richtext']) {
        try {
          const jsonData = JSON.parse(csvData['employment-richtext']);
          if (Array.isArray(jsonData)) {
            employmentHistory = jsonData;
          }
        } catch (e) {
          // No es JSON, continuar
        }
      }
      
      if (employmentHistory && employmentHistory.length > 0) {
        // Asegurar que todos tengan company
        employmentHistory = employmentHistory.map(emp => ({
          ...emp,
          company: emp.company || 'N/A'
        }));
        
        const newEmploymentHTML = generateEmploymentHTML(employmentHistory);
        if (newEmploymentHTML) {
          updates['employment-richtext'] = newEmploymentHTML;
          needsUpdate = true;
          console.log(`   ✓ Employment History corregido (${employmentHistory.length} items)`);
        }
      }
    }
    
    // 3. Corregir Education
    if (vaToFix.issues.some(i => i.includes('education'))) {
      let education = null;
      
      // Intentar desde página web
      if (pageHTML) {
        education = extractEducation(pageHTML);
      }
      
      // Si no se obtuvo, intentar desde CSV
      if (!education && csvData && csvData['education-richtext']) {
        try {
          const jsonData = JSON.parse(csvData['education-richtext']);
          if (Array.isArray(jsonData)) {
            education = jsonData;
          }
        } catch (e) {
          // No es JSON, continuar
        }
      }
      
      // Si hay education actual, limpiarlo
      const currentEducation = va.fieldData['education-richtext'] || '';
      if (currentEducation) {
        const currentEdu = extractEducation(currentEducation);
        if (currentEdu.length > 0) {
          education = education ? [...education, ...currentEdu] : currentEdu;
        }
      }
      
      if (education && education.length > 0) {
        const newEducationHTML = generateEducationHTML(education);
        if (newEducationHTML) {
          updates['education-richtext'] = newEducationHTML;
          needsUpdate = true;
          console.log(`   ✓ Education corregido (${education.length} items, duplicados removidos)`);
        }
      }
    }
    
    // 4. Corregir DISC Type
    // NOTA: disc-type-2 es un campo Option en Webflow. El valor debe ser exacto.
    // Según updateEmptyFieldsFromCSV-fixed.js, C+S está en ALLOWED_DISC_TYPES
    // pero hay un mapeo que convierte C+S → S+C, sugiriendo que Webflow prefiere S+C
    // El usuario pidió C+S, así que intentaremos ese valor
    if (vaToFix.issues.includes('disc-type')) {
      if (vaToFix.slug === 'albert' || vaToFix.slug === 'anahi') {
        const currentDiscType = va.fieldData['disc-type-2'] || '';
        // Intentar C+S como pidió el usuario
        // Si falla, el error se capturará y reportará
        updates['disc-type-2'] = 'C+S';
        needsUpdate = true;
        console.log(`   ✓ DISC Type cambiado: ${currentDiscType} → C+S`);
        console.log(`   ⚠️  NOTA: Si falla, puede ser que Webflow requiera S+C en lugar de C+S`);
      }
    }
    
    // 5. Corregir DISC Description
    if (vaToFix.issues.includes('disc-description')) {
      const discType = updates['disc-type-2'] || va.fieldData['disc-type-2'] || '';
      const currentDesc = va.fieldData['disc-description'] || '';
      const fixedDesc = fixDiscDescription(discType, currentDesc);
      
      if (fixedDesc !== currentDesc) {
        updates['disc-description'] = fixedDesc;
        needsUpdate = true;
        console.log('   ✓ DISC Description corregido (párrafos separados)');
      }
    }
    
    // 6. Agregar English Score
    if (vaToFix.issues.includes('english-score-missing')) {
      let englishScore = null;
      
      // Intentar desde página web
      if (pageHTML) {
        englishScore = extractEnglishScore(pageHTML);
      }
      
      // Intentar desde CSV
      if (!englishScore && csvData && csvData['english-score']) {
        englishScore = csvData['english-score'];
      }
      
      if (englishScore) {
        updates['english-score-3'] = englishScore;
        needsUpdate = true;
        console.log(`   ✓ English Score agregado: ${englishScore}`);
      }
    }
    
    // Aplicar actualizaciones
    if (needsUpdate) {
      if (DRY_RUN) {
        console.log(`   📝 [DRY-RUN] Se actualizarían: ${Object.keys(updates).join(', ')}\n`);
        stats.processed++;
      } else {
        try {
          // Si hay error con DISC Type, intentar sin ese campo
          let finalUpdates = { ...updates };
          let retryWithoutDisc = false;
          
          try {
            await apiClient.updateCollectionItem(vaCollection.id, va.id, finalUpdates);
            console.log(`   ✅ Actualizado exitosamente\n`);
            stats.updated++;
          } catch (error) {
            // Si el error es de validación y estamos actualizando disc-type-2
            if (error.message.includes('Validation Error') && updates['disc-type-2']) {
              console.log(`   ⚠️  Error con DISC Type, intentando sin ese campo...`);
              delete finalUpdates['disc-type-2'];
              retryWithoutDisc = true;
              
              // Reintentar sin DISC Type
              if (Object.keys(finalUpdates).length > 0) {
                await apiClient.updateCollectionItem(vaCollection.id, va.id, finalUpdates);
                console.log(`   ✅ Actualizado exitosamente (sin DISC Type - requiere corrección manual)\n`);
                console.log(`   ⚠️  DISC Type no se pudo actualizar. Valor actual: ${va.fieldData['disc-type-2']}`);
                console.log(`   ⚠️  Intenta cambiar manualmente en Webflow de S+C a C+S\n`);
                stats.updated++;
              } else {
                throw error; // Si no hay otros campos, lanzar el error original
              }
            } else {
              throw error; // Si no es error de DISC Type, lanzar el error original
            }
          }
        } catch (error) {
          console.error(`   ❌ Error: ${error.message}\n`);
          stats.errors++;
        }
      }
    } else {
      console.log(`   ⚠️  No hay cambios para actualizar\n`);
      stats.skipped++;
    }
    
    // Delay para evitar rate limits
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('═'.repeat(80));
  console.log('📊 RESUMEN FINAL');
  console.log('═'.repeat(80));
  console.log(`   VAs procesados: ${stats.processed + stats.updated}`);
  console.log(`   VAs actualizados: ${stats.updated}`);
  console.log(`   VAs omitidos: ${stats.skipped}`);
  console.log(`   Errores: ${stats.errors}`);
  if (DRY_RUN) {
    console.log(`\n⚠️  MODO DRY-RUN: Ejecuta sin --dry-run para aplicar cambios reales`);
  }
  console.log('═'.repeat(80));
  console.log('');
}

main().catch(console.error);
