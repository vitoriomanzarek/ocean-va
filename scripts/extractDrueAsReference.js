/**
 * Script para extraer la data de Drue como caso de éxito/referencia
 */

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const DRUE_URL = 'https://www.oceanvirtualassistant.com/virtual-assistants/drue';

// Función para hacer fetch a una URL
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

// Extraer Tools de la página HTML
function extractTools(html) {
  const tools = [];
  const toolItemRegex = /<div[^>]*class="[^"]*va-tool-item[^"]*"[^>]*>(.*?)<\/div>/gis;
  let match;
  
  while ((match = toolItemRegex.exec(html)) !== null) {
    const itemHtml = match[1];
    const spanMatch = itemHtml.match(/<span[^>]*(?!checkmark)[^>]*>([^<]+)<\/span>/i);
    if (spanMatch && spanMatch[1]) {
      const toolText = spanMatch[1].trim();
      if (toolText && !toolText.match(/^✓|✓$/)) {
        tools.push(toolText);
      }
    }
  }
  
  return [...new Set(tools)];
}

// Extraer Equipment de la página HTML
function extractEquipment(html) {
  const equipment = [];
  const equipmentItemRegex = /<div[^>]*class="[^"]*va-equipment-item[^"]*"[^>]*>(.*?)<\/div>/gis;
  let match;
  
  while ((match = equipmentItemRegex.exec(html)) !== null) {
    const itemHtml = match[1];
    const spanMatches = itemHtml.match(/<span[^>]*>([^<]+)<\/span>/gi);
    if (spanMatches && spanMatches.length > 0) {
      const lastSpan = spanMatches[spanMatches.length - 1];
      const textMatch = lastSpan.match(/<span[^>]*>([^<]+)<\/span>/i);
      if (textMatch && textMatch[1]) {
        const equipText = textMatch[1].trim();
        if (equipText) {
          equipment.push(equipText);
        }
      }
    }
  }
  
  return [...new Set(equipment)];
}

// Extraer Employment History de la página HTML
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
    
    // Extraer description
    const descriptionMatch = accordionHtml.match(/<p[^>]*class="[^"]*va-employment-accordion-description[^"]*"[^>]*>(.*?)<\/p>/gis);
    let description = '';
    if (descriptionMatch) {
      description = descriptionMatch[0]
        .replace(/<p[^>]*class="[^"]*va-employment-accordion-description[^"]*"[^>]*>/i, '')
        .replace(/<\/p>/gi, '')
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/&nbsp;/g, ' ')
        .trim();
    }
    
    if (company || position) {
      employment.push({
        company,
        position,
        period,
        description
      });
    }
  }
  
  return employment;
}

// Extraer Education de la página HTML
function extractEducation(html) {
  const education = [];
  
  // Buscar items de education
  const educationItemRegex = /<div[^>]*class="[^"]*va-education-item[^"]*"[^>]*>(.*?)<\/div>/gis;
  let match;
  
  while ((match = educationItemRegex.exec(html)) !== null) {
    const itemHtml = match[1];
    
    // Extraer school
    const schoolMatch = itemHtml.match(/<h3[^>]*class="[^"]*va-education-school[^"]*"[^>]*>([^<]+)<\/h3>/i);
    const school = schoolMatch ? schoolMatch[1].trim() : '';
    
    // Extraer degree
    const degreeMatch = itemHtml.match(/<p[^>]*class="[^"]*va-education-degree[^"]*"[^>]*>([^<]+)<\/p>/i);
    const degree = degreeMatch ? degreeMatch[1].trim() : '';
    
    // Extraer year
    const yearMatch = itemHtml.match(/<p[^>]*class="[^"]*va-education-year[^"]*"[^>]*>([^<]+)<\/p>/i);
    const year = yearMatch ? yearMatch[1].trim() : '';
    
    if (school || degree) {
      education.push({
        school,
        degree,
        year
      });
    }
  }
  
  return education;
}

// Extraer otros campos
function extractOtherFields(html) {
  const data = {};
  
  // Employment Summary
  const summaryMatch = html.match(/<div[^>]*class="[^"]*va-employment-summary[^"]*"[^>]*>(.*?)<\/div>/gis);
  if (summaryMatch) {
    data.employmentSummary = summaryMatch[0]
      .replace(/<div[^>]*class="[^"]*va-employment-summary[^"]*"[^>]*>/i, '')
      .replace(/<\/div>/gi, '')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/&nbsp;/g, ' ')
      .trim();
  }
  
  // DISC Type
  const discMatch = html.match(/<div[^>]*class="[^"]*va-disc-badge[^"]*"[^>]*>([^<]+)<\/div>/i);
  if (discMatch) {
    data.discType = discMatch[1].trim();
  }
  
  // English Score
  const englishScoreMatch = html.match(/<div[^>]*class="[^"]*va-english-score[^"]*"[^>]*>([^<]+)<\/div>/i);
  if (englishScoreMatch) {
    data.englishScore = englishScoreMatch[1].trim();
  }
  
  // Video Thumbnail (buscar en background-image o img)
  const thumbnailMatch = html.match(/background-image:\s*url\(['"]?([^'"]+)['"]?\)/i) || 
                              html.match(/<img[^>]*src=['"]([^'"]*youtube[^'"]*)['"]/i);
  if (thumbnailMatch) {
    data.videoThumbnail = thumbnailMatch[1];
  }
  
  return data;
}

async function main() {
  console.log('🔍 Extrayendo data de Drue como referencia...\n');
  console.log(`🌐 Visitando: ${DRUE_URL}\n`);
  
  const html = await fetchPage(DRUE_URL);
  
  if (!html) {
    console.error('❌ No se pudo obtener HTML de la página');
    return;
  }
  
  console.log('✅ HTML obtenido, extrayendo datos...\n');
  
  const drueData = {
    name: 'Drue',
    slug: 'drue',
    url: DRUE_URL,
    extracted: {
      tools: extractTools(html),
      equipment: extractEquipment(html),
      employmentHistory: extractEmploymentHistory(html),
      education: extractEducation(html),
      ...extractOtherFields(html)
    }
  };
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 DATA DE DRUE (REFERENCIA)');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  console.log('TOOLS:');
  console.log(`   ${drueData.extracted.tools.length} items: ${drueData.extracted.tools.join(', ')}\n`);
  
  console.log('EQUIPMENT:');
  console.log(`   ${drueData.extracted.equipment.length} items: ${drueData.extracted.equipment.join(', ')}\n`);
  
  console.log('EMPLOYMENT HISTORY:');
  drueData.extracted.employmentHistory.forEach((emp, idx) => {
    console.log(`   ${idx + 1}. ${emp.company} - ${emp.position} (${emp.period})`);
    if (emp.description) {
      console.log(`      Descripción: ${emp.description.substring(0, 100)}...`);
    }
  });
  console.log('');
  
  console.log('EDUCATION:');
  drueData.extracted.education.forEach((edu, idx) => {
    console.log(`   ${idx + 1}. ${edu.school} - ${edu.degree} (${edu.year})`);
  });
  console.log('');
  
  console.log('OTROS CAMPOS:');
  console.log(`   DISC Type: ${drueData.extracted.discType || 'N/A'}`);
  console.log(`   English Score: ${drueData.extracted.englishScore || 'N/A'}`);
  console.log(`   Video Thumbnail: ${drueData.extracted.videoThumbnail || 'N/A'}`);
  console.log(`   Employment Summary: ${drueData.extracted.employmentSummary ? drueData.extracted.employmentSummary.substring(0, 100) + '...' : 'N/A'}\n`);
  
  // Guardar en archivo
  const outputPath = path.join(process.cwd(), 'src/data/drue-reference-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(drueData, null, 2), 'utf-8');
  
  console.log(`✅ Data de referencia guardada en: ${outputPath}\n`);
}

main().catch(console.error);
