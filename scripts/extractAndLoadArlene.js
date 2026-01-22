/**
 * Script para extraer y cargar Arlene al CMS
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;
const ARLENE_URL = 'https://www.oceanvirtualassistant.com/arlene-ocean-va-profile';

// Funciones de extracción (similares a extractDrueAsReference.js)
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
      employment.push({ company, position, period, description });
    }
  }
  
  return employment;
}

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

function extractOtherFields(html) {
  const data = {};
  
  const summaryMatch = html.match(/<div[^>]*class="[^"]*va-employment-summary[^"]*"[^>]*>(.*?)<\/div>/gis);
  if (summaryMatch) {
    data.employmentSummary = summaryMatch[0]
      .replace(/<div[^>]*class="[^"]*va-employment-summary[^"]*"[^>]*>/i, '')
      .replace(/<\/div>/gi, '')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/&nbsp;/g, ' ')
      .trim();
  }
  
  const discMatch = html.match(/<div[^>]*class="[^"]*va-disc-badge[^"]*"[^>]*>([^<]+)<\/div>/i);
  if (discMatch) {
    data.discType = discMatch[1].trim();
  }
  
  const englishScoreMatch = html.match(/<div[^>]*class="[^"]*va-english-score[^"]*"[^>]*>([^<]+)<\/div>/i);
  if (englishScoreMatch) {
    data.englishScore = englishScoreMatch[1].trim();
  }
  
  const thumbnailMatch = html.match(/background-image:\s*url\(['"]?([^'"]+)['"]?\)/i) || 
                              html.match(/<img[^>]*src=['"]([^'"]*youtube[^'"]*)['"]/i);
  if (thumbnailMatch) {
    data.videoThumbnail = thumbnailMatch[1];
  }
  
  return data;
}

// Funciones para generar HTML (de VACreation.jsx)
function generateEmploymentHTML(employmentHistory) {
  if (!employmentHistory || employmentHistory.length === 0) return '';
  
  return employmentHistory.map(emp => {
    const description = (emp.description || '').split('\n').map(line => 
      line.trim() ? `<p>${line.trim()}</p>` : ''
    ).filter(Boolean).join('');
    
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

function generateEducationHTML(education) {
  if (!education || education.length === 0) return '';
  
  // Remover duplicados
  const uniqueEducation = [];
  const seen = new Set();
  
  for (const edu of education) {
    const key = `${edu.school}-${edu.degree}`.toLowerCase();
    if (!seen.has(key)) {
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

function generateToolsHTML(tools) {
  if (!tools || tools.length === 0) return '';
  
  const items = tools.map(tool => 
    `<div class="va-tool-item"><span class="va-tool-checkmark">✓</span><span>${tool}</span></div>`
  ).join('');
  
  return `<div class="va-tools-list">${items}</div>`;
}

function generateEquipmentHTML(equipment) {
  if (!equipment || equipment.length === 0) return '';
  
  const monitorSVG = `<svg class="va-equipment-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20m0 0l-.75 3M9 20H5m4 0h10m0 0l.75 3M19 20l.75 3M19 20h4m-4 0h.01M9 17h10a2 2 0 002-2V5a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`;
  const headsetSVG = `<svg class="va-equipment-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>`;
  
  const items = equipment.map(equip => {
    const isMonitor = equip.toLowerCase().includes('monitor');
    const svg = isMonitor ? monitorSVG : headsetSVG;
    return `<div class="va-equipment-item">${svg}<span>${equip}</span></div>`;
  }).join('');
  
  return `<div class="va-equipment-list">${items}</div>`;
}

function getYoutubeId(url) {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  return match ? match[1] : null;
}

function getThumbnailUrl(videoUrl) {
  const videoId = getYoutubeId(videoUrl);
  if (!videoId) return null;
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

async function main() {
  console.log('🔍 Extrayendo y cargando Arlene al CMS...\n');
  
  // Leer CSV para obtener data básica
  const csvPath = path.join(process.cwd(), 'src/data/carga-vas-2026.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true
  });
  
  const arleneCSV = records.find(r => (r.name || '').toUpperCase() === 'ARLENE');
  
  if (!arleneCSV) {
    console.error('❌ Arlene no encontrado en CSV');
    return;
  }
  
  console.log('✅ Arlene encontrado en CSV\n');
  console.log(`🌐 Visitando: ${ARLENE_URL}\n`);
  
  // Extraer data de la página web
  const html = await fetchPage(ARLENE_URL);
  
  if (!html) {
    console.error('❌ No se pudo obtener HTML de la página');
    return;
  }
  
  console.log('✅ HTML obtenido, extrayendo datos...\n');
  
  const extracted = {
    tools: extractTools(html),
    equipment: extractEquipment(html),
    employmentHistory: extractEmploymentHistory(html),
    education: extractEducation(html),
    ...extractOtherFields(html)
  };
  
  console.log('📊 DATOS EXTRAÍDOS:');
  console.log(`   Tools: ${extracted.tools.length} items`);
  console.log(`   Equipment: ${extracted.equipment.length} items`);
  console.log(`   Employment History: ${extracted.employmentHistory.length} items`);
  console.log(`   Education: ${extracted.education.length} items`);
  console.log(`   DISC Type: ${extracted.discType || 'N/A'}`);
  console.log(`   English Score: ${extracted.englishScore || 'N/A'}`);
  console.log(`   Video Thumbnail: ${extracted.videoThumbnail || 'N/A'}\n`);
  
  // Generar HTML
  const toolsHTML = generateToolsHTML(extracted.tools);
  const equipmentHTML = generateEquipmentHTML(extracted.equipment);
  const employmentHTML = generateEmploymentHTML(extracted.employmentHistory);
  const educationHTML = generateEducationHTML(extracted.education);
  
  // Obtener video thumbnail si no se extrajo
  let videoThumbnail = extracted.videoThumbnail;
  if (!videoThumbnail && arleneCSV.video) {
    videoThumbnail = getThumbnailUrl(arleneCSV.video);
  }
  
  // Preparar data para CMS
  const apiClient = new WebflowApiClient(WEBFLOW_API_TOKEN);
  const site = await apiClient.getSite(SITE_ID);
  const collectionsResponse = await apiClient.getCollections(SITE_ID);
  const vaCollection = collectionsResponse.collections.find(c => c.slug === 'virtual-assistants');
  
  // Verificar si Arlene ya existe
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
  
  const existingArlene = allVAs.find(v => (v.fieldData.slug || '').toLowerCase() === 'arlene');
  
  const fieldData = {
    name: 'Arlene',
    slug: 'arlene',
    'main-category': arleneCSV['main-category'] || '',
    'experience-years': arleneCSV['experience-years'] || '',
    languages: arleneCSV.language || '',
    availability: arleneCSV.availability || '',
    summary: arleneCSV.summary || '',
    tagline: arleneCSV.tagline || '',
    'thumbnail-description': arleneCSV['thumbnail-description'] || '',
    video: arleneCSV.video || '',
    'video-thumbnail-2': videoThumbnail || '',
    'tools-richtext': toolsHTML,
    'equipment-richtext': equipmentHTML,
    'employment-richtext': employmentHTML,
    'education-richtext': educationHTML,
    'employment-summary': extracted.employmentSummary || arleneCSV['employment-summary'] || '',
    'disc-type-2': extracted.discType || '',
    'english-score-3': extracted.englishScore || '',
  };
  
  if (existingArlene) {
    console.log(`⚠️  Arlene ya existe en CMS (ID: ${existingArlene.id}), actualizando...\n`);
    await apiClient.updateCollectionItem(vaCollection.id, existingArlene.id, fieldData);
    console.log('✅ Arlene actualizado exitosamente\n');
  } else {
    console.log('📤 Creando nuevo item en CMS...\n');
    await apiClient.createCollectionItem(vaCollection.id, fieldData);
    console.log('✅ Arlene creado exitosamente\n');
  }
}

main().catch(console.error);
