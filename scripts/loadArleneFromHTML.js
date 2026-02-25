/**
 * Script para extraer todos los datos del HTML minificado de Arlene
 * y cargarlos al CMS en el formato correcto del template dinámico
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;
const HTML_FILE_PATH = path.join(process.cwd(), 'webflow-components-minified/311-arlene-profile.html');
const CSV_FILE_PATH = path.join(process.cwd(), 'src/data/carga-vas-2026.csv');

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Extraer datos del HTML minificado
function extractDataFromHTML(html) {
  const data = {};
  
  // Name
  const nameMatch = html.match(/<h1[^>]*class="[^"]*va-profile-name[^"]*"[^>]*>([^<]+)<\/h1>/i);
  data.name = nameMatch ? nameMatch[1].trim() : '';
  
  // Title
  const titleMatch = html.match(/<p[^>]*class="[^"]*va-title[^"]*"[^>]*>([^<]+)<\/p>/i);
  data.title = titleMatch ? titleMatch[1].trim() : '';
  
  // Summary
  const summaryMatch = html.match(/<p[^>]*class="[^"]*va-summary[^"]*"[^>]*>([^<]+)<\/p>/i);
  data.summary = summaryMatch ? summaryMatch[1].trim() : '';
  
  // Skills
  const skillTags = [];
  const skillRegex = /<span[^>]*class="[^"]*va-skill-tag[^"]*"[^>]*>([^<]+)<\/span>/gi;
  let skillMatch;
  while ((skillMatch = skillRegex.exec(html)) !== null) {
    skillTags.push(skillMatch[1].trim());
  }
  data.skills = skillTags;
  
  // Tools - buscar todos los spans dentro de va-tool-item que no sean checkmark
  const tools = [];
  const toolItemRegex = /<div[^>]*class="[^"]*va-tool-item[^"]*"[^>]*>(.*?)<\/div>/gi;
  let toolItemMatch;
  
  while ((toolItemMatch = toolItemRegex.exec(html)) !== null) {
    const itemHtml = toolItemMatch[1];
    // Buscar el span que no es checkmark (el segundo span generalmente)
    const spanMatches = itemHtml.match(/<span[^>]*>([^<]+)<\/span>/gi);
    if (spanMatches && spanMatches.length > 1) {
      // El segundo span es el nombre del tool
      const toolMatch = spanMatches[1].match(/<span[^>]*>([^<]+)<\/span>/i);
      if (toolMatch) {
        const tool = toolMatch[1].trim();
        if (tool && tool !== '✓' && !tool.match(/checkmark/i)) {
          tools.push(tool);
        }
      }
    } else if (spanMatches && spanMatches.length === 1) {
      // Si solo hay un span, verificar que no sea checkmark
      const toolMatch = spanMatches[0].match(/<span[^>]*>([^<]+)<\/span>/i);
      if (toolMatch) {
        const tool = toolMatch[1].trim();
        if (tool && tool !== '✓' && !tool.match(/checkmark/i) && !tool.match(/^<svg/i)) {
          tools.push(tool);
        }
      }
    }
  }
  data.tools = tools;
  
  // Equipment
  const equipment = [];
  const equipRegex = /<div[^>]*class="[^"]*va-equipment-item[^"]*"[^>]*>.*?<span>([^<]+)<\/span>/gi;
  let equipMatch;
  while ((equipMatch = equipRegex.exec(html)) !== null) {
    equipment.push(equipMatch[1].trim());
  }
  data.equipment = equipment;
  
  // Image
  const imgMatch = html.match(/<img[^>]*src=['"]([^'"]+)['"][^>]*alt=['"]Arlene['"]/i);
  data.image = imgMatch ? imgMatch[1] : '';
  
  // Video Thumbnail
  const thumbMatch = html.match(/background-image:\s*url\(['"]?([^'"]+youtube[^'"]+)['"]?\)/i);
  data.videoThumbnail = thumbMatch ? thumbMatch[1] : '';
  
  // Employment Summary
  const empSummaryMatch = html.match(/<p[^>]*class="[^"]*va-employment-summary[^"]*"[^>]*>(.*?)<\/p>/is);
  if (empSummaryMatch) {
    data.employmentSummary = empSummaryMatch[1]
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .trim();
  }
  
  // Employment History
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
    
    // Extraer descripción - puede tener <br> tags
    const descMatch = accordionHtml.match(/<p[^>]*class="[^"]*va-employment-accordion-description[^"]*"[^>]*>(.*?)<\/p>/is);
    let description = '';
    if (descMatch) {
      description = descMatch[1]
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .trim();
    }
    
    if (company || position) {
      employment.push({ company, position, period, description });
    }
  }
  data.employmentHistory = employment;
  
  // Education
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
    const year = yearMatch ? yearMatch[1].trim() : '';
    
    if (school || degree) {
      education.push({ school, degree, year });
    }
  }
  data.education = education;
  
  // DISC Type
  const discMatch = html.match(/<div[^>]*class="[^"]*va-disc-badge[^"]*"[^>]*>([^<]+)<\/div>/i);
  data.discType = discMatch ? discMatch[1].trim() : '';
  
  // DISC Description
  const discDescMatch = html.match(/<p[^>]*class="[^"]*va-disc-description[^"]*"[^>]*>([^<]+)<\/p>/i);
  data.discDescription = discDescMatch ? discDescMatch[1].trim() : '';
  
  // English Score
  const engScoreMatch = html.match(/<div[^>]*class="[^"]*va-english-score[^"]*"[^>]*>([^<]+)<\/div>/i);
  data.englishScore = engScoreMatch ? engScoreMatch[1].trim() : '';
  
  // English Description
  const engDescMatch = html.match(/<p[^>]*class="[^"]*va-english-description[^"]*"[^>]*>([^<]+)<\/p>/i);
  data.englishDescription = engDescMatch ? engDescMatch[1].trim() : '';
  
  // CEFR
  const cefrMatch = html.match(/<div[^>]*class="[^"]*va-cefr-grid[^"]*"[^>]*>(.*?)<\/div>\s*<div[^>]*class="[^"]*va-cefr-categories/i);
  if (cefrMatch) {
    data.cefr = cefrMatch[0].replace(/<div[^>]*class="[^"]*va-cefr-categories/i, '').trim();
  }
  
  return data;
}

// Generar HTML en formato correcto para el template dinámico
function generateEmploymentHTML(employmentHistory) {
  if (!employmentHistory || employmentHistory.length === 0) return '';
  
  return employmentHistory.map(emp => {
    // Formatear descripción: cada línea en su propio <p class="va-employment-accordion-description">
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

function generateToolsHTML(tools) {
  if (!tools || tools.length === 0) return '';
  
  const items = tools.map(tool => 
    `<div class="va-tool-item"><span class="va-tool-checkmark">✓</span><span>${escapeHtml(tool)}</span></div>`
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
    return `<div class="va-equipment-item">${svg}<span>${escapeHtml(equip)}</span></div>`;
  }).join('');
  
  return `<div class="va-equipment-list">${items}</div>`;
}

function generateSkillsHTML(skills) {
  if (!skills || skills.length === 0) return '';
  
  const tags = skills.map(skill => 
    `<span class="va-skill-tag">${escapeHtml(skill)}</span>`
  ).join('');
  
  return tags;
}

function formatDiscDescription(description) {
  if (!description) return '';
  return description
    .split('.')
    .map(p => p.trim())
    .filter(p => p.length > 0)
    .map(p => `<p>${escapeHtml(p)}.</p>`)
    .join('');
}

async function main() {
  console.log('🔧 Extrayendo y cargando Arlene desde HTML minificado...\n');
  
  // Leer HTML
  const html = fs.readFileSync(HTML_FILE_PATH, 'utf8');
  console.log('✅ HTML leído\n');
  
  // Extraer datos
  const extracted = extractDataFromHTML(html);
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📊 DATOS EXTRAÍDOS DEL HTML');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log(`Name: ${extracted.name}`);
  console.log(`Title: ${extracted.title}`);
  console.log(`Skills: ${extracted.skills.length} items`);
  console.log(`Tools: ${extracted.tools.length} items`);
  console.log(`Equipment: ${extracted.equipment.length} items`);
  console.log(`Employment History: ${extracted.employmentHistory.length} items`);
  console.log(`Education: ${extracted.education.length} items`);
  console.log(`DISC Type: ${extracted.discType}`);
  console.log(`English Score: ${extracted.englishScore}`);
  console.log(`CEFR: ${extracted.cefr ? 'Sí' : 'No'}\n`);
  
  // Leer CSV para datos adicionales
  let csvData = [];
  try {
    const fileContent = fs.readFileSync(CSV_FILE_PATH, 'utf8');
    csvData = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });
  } catch (error) {
    console.warn(`⚠️  No se pudo leer CSV: ${error.message}`);
  }
  
  const arleneCSV = csvData.find(r => (r.name || '').toUpperCase() === 'ARLENE');
  
  // Obtener Arlene del CMS
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
  
  const arlene = allVAs.find(v => (v.fieldData.slug || '').toLowerCase() === 'arlene');
  
  if (!arlene) {
    console.error('❌ Arlene no encontrado en CMS');
    return;
  }
  
  console.log('✅ Arlene encontrado en CMS\n');
  
  // Generar HTML en formato correcto
  const toolsHTML = generateToolsHTML(extracted.tools);
  const equipmentHTML = generateEquipmentHTML(extracted.equipment);
  const employmentHTML = generateEmploymentHTML(extracted.employmentHistory);
  const educationHTML = generateEducationHTML(extracted.education);
  const skillsHTML = generateSkillsHTML(extracted.skills);
  const discDescriptionHTML = formatDiscDescription(extracted.discDescription);
  
  // Preparar actualizaciones
  const updates = {};
  
  // Campos básicos
  if (extracted.title) {
    // Verificar si el campo title existe, si no, usar main-category
    if (arlene.fieldData.hasOwnProperty('title')) {
      updates['title'] = extracted.title;
    }
  }
  
  if (extracted.image) {
    updates['image'] = extracted.image;
  }
  
  if (extracted.videoThumbnail) {
    updates['video-thumbnail-2'] = extracted.videoThumbnail;
  }
  
  // Rich Text fields
  if (toolsHTML) {
    updates['tools-richtext'] = toolsHTML;
  }
  
  if (equipmentHTML) {
    updates['equipment-richtext'] = equipmentHTML;
  }
  
  if (employmentHTML) {
    updates['employment-richtext'] = employmentHTML;
  }
  
  if (educationHTML) {
    updates['education-richtext'] = educationHTML;
  }
  
  if (skillsHTML) {
    updates['skills-richtext'] = skillsHTML;
  }
  
  if (extracted.employmentSummary) {
    updates['employment-summary'] = extracted.employmentSummary;
  }
  
  if (extracted.discType) {
    updates['disc-type-2'] = extracted.discType;
  }
  
  if (discDescriptionHTML) {
    updates['disc-description'] = discDescriptionHTML;
  }
  
  if (extracted.englishScore) {
    updates['english-score-3'] = extracted.englishScore;
  }
  
  if (extracted.englishDescription) {
    updates['english-description'] = extracted.englishDescription;
  }
  
  if (extracted.cefr) {
    updates['cerf-result'] = extracted.cefr;
  }
  
  // Datos del CSV si están disponibles
  if (arleneCSV) {
    if (arleneCSV['experience-years'] && arlene.fieldData.hasOwnProperty('experience-years')) {
      updates['experience-years'] = arleneCSV['experience-years'];
    }
    if (arleneCSV.language && arlene.fieldData.hasOwnProperty('languages')) {
      updates['languages'] = arleneCSV.language;
    }
    if (arleneCSV.video) {
      updates['video'] = arleneCSV.video;
    }
  }
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('🔧 CAMPOS A ACTUALIZAR');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  Object.keys(updates).forEach(field => {
    const value = updates[field];
    const preview = typeof value === 'string' ? value.substring(0, 80) : String(value);
    console.log(`   ✓ ${field}: ${preview}${typeof value === 'string' && value.length > 80 ? '...' : ''}`);
  });
  
  console.log('\n📤 Actualizando CMS...\n');
  
  try {
    await apiClient.updateCollectionItem(vaCollection.id, arlene.id, updates);
    console.log('✅ Arlene actualizado exitosamente con todos los datos del HTML\n');
    
    console.log('════════════════════════════════════════════════════════════════════════════════');
    console.log('📋 RESUMEN');
    console.log('════════════════════════════════════════════════════════════════════════════════\n');
    console.log(`   Campos actualizados: ${Object.keys(updates).length}`);
    console.log(`   Tools: ${extracted.tools.length} items`);
    console.log(`   Equipment: ${extracted.equipment.length} items`);
    console.log(`   Employment History: ${extracted.employmentHistory.length} items`);
    console.log(`   Education: ${extracted.education.length} items`);
    console.log(`   Skills: ${extracted.skills.length} items`);
    console.log(`   DISC Type: ${extracted.discType}`);
    console.log(`   English Score: ${extracted.englishScore}`);
    console.log(`   CEFR: ${extracted.cefr ? 'Cargado' : 'No'}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
}

main().catch(console.error);
