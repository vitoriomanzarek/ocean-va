/**
 * Script para corregir específicamente el perfil de Aaron
 * - Employment Summary
 * - Employment History dropdown (contenido sin estilos)
 * - DISC Type: S+C → C+S
 * - English Score richtext
 * - CEFR: C1 → C2
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

async function main() {
  console.log('🔧 Corrigiendo perfil de Aaron...\n');
  
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
  
  const aaron = allVAs.find(v => (v.fieldData.slug || '').toLowerCase() === 'aaron-a0d16' || (v.fieldData.name || '').toLowerCase() === 'aaron');
  
  if (!aaron) {
    console.error('❌ Aaron no encontrado');
    return;
  }
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 AARON - ESTADO ACTUAL');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const currentEmploymentSummary = aaron.fieldData['employment-summary'] || '';
  const currentEmployment = aaron.fieldData['employment-richtext'] || '';
  const currentDiscType = aaron.fieldData['disc-type-2'] || '';
  const currentEnglishScore = aaron.fieldData['english-score-3'] || '';
  const currentEnglishDescription = aaron.fieldData['english-description'] || '';
  const currentCefr = aaron.fieldData['cerf-result'] || '';
  
  console.log('Employment Summary (actual):');
  console.log(`   ${currentEmploymentSummary.substring(0, 100)}...\n`);
  
  console.log('Employment History:');
  console.log(`   Tiene accordion: ${currentEmployment.includes('va-employment-accordion')}`);
  console.log(`   Tiene description: ${currentEmployment.includes('va-employment-accordion-description')}\n`);
  
  console.log('DISC Type (actual):', currentDiscType);
  console.log('English Score (actual):', currentEnglishScore);
  console.log('CEFR (actual):', currentCefr);
  console.log('');
  
  // Extraer data de página web
  const aaronUrl = 'https://www.oceanvirtualassistant.com/aaron-ocean-va-profile';
  console.log(`🌐 Visitando: ${aaronUrl}\n`);
  
  const html = await fetchPage(aaronUrl);
  
  if (!html) {
    console.error('❌ No se pudo obtener HTML de la página');
    return;
  }
  
  console.log('✅ HTML obtenido, extrayendo datos...\n');
  
  const extractedEmployment = extractEmploymentHistory(html);
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('🔧 CORRECCIONES');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const updates = {};
  
  // 1. Employment Summary
  const newEmploymentSummary = 'Aaron is an Insurance Virtual Assistant with over five years of experience supporting U.S. personal lines property and casualty insurance with Travelers. He has worked in both agent-facing and direct-to-customer environments, handling high-volume policy servicing and insurance quoting. His experience covers auto, homeowners, personal articles floaters, and umbrella policies. He has managed the full policy lifecycle, including quotes, endorsements, and renewals. His background reflects strong attention to detail, regulatory awareness, and clear communication with agents and insureds. Aaron brings technical insurance knowledge, customer-facing communication skills, and comprehensive experience with major U.S. insurance carrier operations, making him a reliable support professional for personal lines operations.';
  
  if (newEmploymentSummary !== currentEmploymentSummary) {
    updates['employment-summary'] = newEmploymentSummary;
    console.log('✓ Employment Summary será actualizado');
  }
  
  // 2. Employment History
  if (extractedEmployment.length > 0) {
    const newEmploymentHTML = generateEmploymentHTML(extractedEmployment);
    if (newEmploymentHTML && newEmploymentHTML !== currentEmployment) {
      updates['employment-richtext'] = newEmploymentHTML;
      console.log(`✓ Employment History será actualizado (${extractedEmployment.length} items)`);
    }
  }
  
  // 3. DISC Type: S+C → C+S
  if (currentDiscType === 'S+C' || currentDiscType === 's+c' || currentDiscType.toLowerCase() === 's+c') {
    updates['disc-type-2'] = 'C+S';
    console.log('✓ DISC Type será cambiado: S+C → C+S');
    console.log('   ⚠️  NOTA: Si falla, puede requerir corrección manual');
  }
  
  // 4. English Score
  const newEnglishScore = 'C2';
  if (newEnglishScore !== currentEnglishScore) {
    updates['english-score-3'] = newEnglishScore;
    console.log('✓ English Score será actualizado: C2');
  }
  
  // 5. English Description
  const newEnglishDescription = 'Proficient level. Demonstrates native-like command of English with exceptional accuracy, nuanced communication, and complete fluency in both written and spoken contexts. Can understand with ease virtually everything heard or read and can summarize information from different sources.';
  if (newEnglishDescription !== currentEnglishDescription) {
    updates['english-description'] = newEnglishDescription;
    console.log('✓ English Description será actualizado');
  }
  
  // 6. CEFR: C1 → C2
  // El CEFR es un campo richtext que contiene HTML con la tabla
  // Necesitamos reemplazar C1 por C2 en el HTML
  if (currentCefr.includes('C1') || currentCefr.toLowerCase().includes('c1')) {
    const updatedCefr = currentCefr.replace(/C1/gi, 'C2');
    updates['cerf-result'] = updatedCefr;
    console.log('✓ CEFR será actualizado: C1 → C2');
  }
  
  if (Object.keys(updates).length === 0) {
    console.log('⚠️  No hay cambios necesarios\n');
    return;
  }
  
  console.log('');
  console.log('📤 Actualizando CMS...\n');
  
  try {
    // Si hay error con DISC Type, intentar sin ese campo
    let finalUpdates = { ...updates };
    let retryWithoutDisc = false;
    
    try {
      await apiClient.updateCollectionItem(vaCollection.id, aaron.id, finalUpdates);
      console.log('✅ Aaron actualizado exitosamente\n');
    } catch (error) {
      if (error.message.includes('Validation Error') && updates['disc-type-2']) {
        console.log('   ⚠️  Error con DISC Type, intentando sin ese campo...');
        delete finalUpdates['disc-type-2'];
        retryWithoutDisc = true;
        
        if (Object.keys(finalUpdates).length > 0) {
          await apiClient.updateCollectionItem(vaCollection.id, aaron.id, finalUpdates);
          console.log('✅ Aaron actualizado exitosamente (sin DISC Type - requiere corrección manual)\n');
          console.log('   ⚠️  DISC Type no se pudo actualizar. Valor actual:', currentDiscType);
          console.log('   ⚠️  Intenta cambiar manualmente en Webflow de S+C a C+S\n');
        } else {
          throw error;
        }
      } else {
        throw error;
      }
    }
    
    console.log('════════════════════════════════════════════════════════════════════════════════');
    console.log('📋 RESUMEN DE CAMBIOS');
    console.log('════════════════════════════════════════════════════════════════════════════════\n');
    console.log('Campos actualizados:', Object.keys(finalUpdates).join(', '));
    if (retryWithoutDisc) {
      console.log('⚠️  DISC Type requiere corrección manual');
    }
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
  }
}

main().catch(console.error);
