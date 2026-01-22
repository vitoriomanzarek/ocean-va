/**
 * Script para extraer Tools, Equipment y Video Thumbnails
 * Guarda los datos en un archivo para revisión antes de cargar al CMS
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

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
  'ximena': 'ximena-g', // Ximena G.
};

// Función para obtener el slug de URL desde el slug del CMS
function getUrlSlug(cmsSlug) {
  return SLUG_MAPPING[cmsSlug] || cmsSlug;
}

// Función para construir la URL completa
function buildProfileUrl(cmsSlug) {
  const urlSlug = getUrlSlug(cmsSlug);
  return `https://www.oceanvirtualassistant.com/${urlSlug}-ocean-va-profile`;
}

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;
const CSV_FILE = path.join(process.cwd(), 'src/data/carga-vas-2026.csv');

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
    console.error(`   ❌ Error fetching ${url}:`, error.message);
    return null;
  }
}

// Función para escapar HTML
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Generar HTML de Tools
function generateToolsHTML(toolsArray) {
  if (!toolsArray || toolsArray.length === 0) return '';
  
  const items = toolsArray.map(tool => 
    `<div class="va-tool-item"><span class="va-tool-checkmark">✓</span><span>${escapeHtml(tool)}</span></div>`
  ).join('');
  
  return `<div class="va-tools-list">${items}</div>`;
}

// Generar HTML de Equipment
function generateEquipmentHTML(equipmentArray) {
  if (!equipmentArray || equipmentArray.length === 0) return '';
  
  const monitorSVG = `<svg class="va-equipment-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20m0 0l-.75 3M9 20H5m4 0h10m0 0l.75 3M19 20l.75 3M19 20h4m-4 0h.01M9 17h10a2 2 0 002-2V5a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`;
  
  const headsetSVG = `<svg class="va-equipment-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>`;
  
  const items = equipmentArray.map(equip => {
    const isMonitor = equip.toLowerCase().includes('monitor');
    const svg = isMonitor ? monitorSVG : headsetSVG;
    return `<div class="va-equipment-item">${svg}<span>${escapeHtml(equip)}</span></div>`;
  }).join('');
  
  return `<div class="va-equipment-list">${items}</div>`;
}

// Extraer Tools de la página HTML usando regex
function extractTools(html) {
  const tools = [];
  
  // Buscar elementos con clase va-tool-item
  const toolItemRegex = /<div[^>]*class="[^"]*va-tool-item[^"]*"[^>]*>(.*?)<\/div>/gis;
  let match;
  
  while ((match = toolItemRegex.exec(html)) !== null) {
    const itemHtml = match[1];
    // Extraer el texto del span (evitando el checkmark)
    const spanMatch = itemHtml.match(/<span[^>]*(?!checkmark)[^>]*>([^<]+)<\/span>/i);
    if (spanMatch && spanMatch[1]) {
      const toolText = spanMatch[1].trim();
      if (toolText && !toolText.match(/^✓|✓$/)) {
        tools.push(toolText);
      }
    }
    // También buscar texto después del checkmark
    const checkmarkMatch = itemHtml.match(/<span[^>]*class="[^"]*va-tool-checkmark[^"]*"[^>]*>.*?<\/span>\s*<span[^>]*>([^<]+)<\/span>/i);
    if (checkmarkMatch && checkmarkMatch[1]) {
      const toolText = checkmarkMatch[1].trim();
      if (toolText) {
        tools.push(toolText);
      }
    }
  }
  
  // Limpiar duplicados
  return [...new Set(tools)];
}

// Extraer Equipment de la página HTML usando regex
function extractEquipment(html) {
  const equipment = [];
  
  // Buscar elementos con clase va-equipment-item
  const equipmentItemRegex = /<div[^>]*class="[^"]*va-equipment-item[^"]*"[^>]*>(.*?)<\/div>/gis;
  let match;
  
  while ((match = equipmentItemRegex.exec(html)) !== null) {
    const itemHtml = match[1];
    // Extraer el texto del último span (después del SVG)
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
  
  // Limpiar duplicados
  return [...new Set(equipment)];
}

// Extraer ID de YouTube de una URL
function getYoutubeId(url) {
  if (!url || typeof url !== 'string') return null;
  
  // Patrones comunes de YouTube
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/.*[?&]v=([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return null;
}

// Generar URL de thumbnail de YouTube
function getThumbnailUrl(youtubeId) {
  if (!youtubeId) return null;
  // Usar maxresdefault para mejor calidad, hqdefault como fallback
  return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
}

async function main() {
  console.log('🔍 Extrayendo Tools, Equipment y Video Thumbnails...\n');
  console.log('⚠️  NOTA: Los datos se guardarán en un archivo para revisión, NO se cargarán al CMS\n');
  
  const apiClient = new WebflowApiClient(WEBFLOW_API_TOKEN);
  
  // Leer CSV para obtener URLs
  let urlMap = new Map();
  try {
    if (fs.existsSync(CSV_FILE)) {
      const csvContent = fs.readFileSync(CSV_FILE, 'utf8');
      const csvRecords = parse(csvContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true
      });
      
      csvRecords.forEach(record => {
        if (record.slug && record['profile-slug-2']) {
          urlMap.set(record.slug.toLowerCase(), record['profile-slug-2']);
        }
      });
      console.log(`✅ ${urlMap.size} URLs encontradas en CSV\n`);
    } else {
      console.log(`⚠️  CSV no encontrado en ${CSV_FILE}\n`);
    }
  } catch (error) {
    console.log(`⚠️  Error leyendo CSV: ${error.message}\n`);
  }
  
  // Obtener sitio y collection
  const site = await apiClient.getSite(SITE_ID);
  console.log(`📍 Sitio: ${site.displayName} (${site.id})\n`);
  
  const collectionsResponse = await apiClient.getCollections(SITE_ID);
  const vaCollection = collectionsResponse.collections.find(c => c.slug === 'virtual-assistants');
  if (!vaCollection) {
    console.error('❌ Collection "Virtual Assistants" no encontrada');
    return;
  }
  
  console.log(`📍 Virtual Assistants Collection ID: ${vaCollection.id}\n`);
  
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
  
  // Filtrar VAs que necesitan actualización
  const itemsToProcess = allVAs.filter(item => {
    const toolsRichtext = item.fieldData?.['tools-richtext'] || '';
    const equipmentRichtext = item.fieldData?.['equipment-richtext'] || '';
    const videoThumbnail = item.fieldData?.['video-thumbnail-2'] || '';
    const videoUrl = item.fieldData?.['video'] || '';
    
    const isEmpty = (str) => !str || str.trim() === '';
    const needsTools = isEmpty(toolsRichtext);
    const needsEquipment = isEmpty(equipmentRichtext);
    const needsThumbnail = isEmpty(videoThumbnail) && !isEmpty(videoUrl);
    
    return needsTools || needsEquipment || needsThumbnail;
  });
  
  console.log(`📊 VAs que necesitan actualización: ${itemsToProcess.length}\n`);
  console.log('═'.repeat(80));
  console.log('');
  
  const extractedData = [];
  let processed = 0;
  let errors = 0;
  
  for (const item of itemsToProcess) {
    const name = item.fieldData?.name || 'Unnamed';
    const slug = item.fieldData?.slug || '';
    const toolsRichtext = item.fieldData?.['tools-richtext'] || '';
    const equipmentRichtext = item.fieldData?.['equipment-richtext'] || '';
    const videoThumbnail = item.fieldData?.['video-thumbnail-2'] || '';
    const videoUrl = item.fieldData?.['video'] || '';
    
    const needsTools = !toolsRichtext || toolsRichtext.trim() === '';
    const needsEquipment = !equipmentRichtext || equipmentRichtext.trim() === '';
    const needsThumbnail = (!videoThumbnail || videoThumbnail.trim() === '') && videoUrl && videoUrl.trim() !== '';
    
    console.log(`\n📋 ${name.toUpperCase()} (${slug})`);
    console.log(`   CMS ID: ${item.id}`);
    
    const vaData = {
      name,
      slug,
      cmsId: item.id,
      needsTools,
      needsEquipment,
      needsThumbnail,
      extracted: {
        tools: null,
        equipment: null,
        videoThumbnail: null
      }
    };
    
    // Extraer Tools y Equipment de la página web
    if (needsTools || needsEquipment) {
      // Intentar obtener URL del CSV primero
      let profileUrl = urlMap.get(slug.toLowerCase());
      
      // Si no está en el CSV, construir URL automáticamente usando el mapeo
      if (!profileUrl) {
        profileUrl = buildProfileUrl(slug);
        console.log(`   💡 URL no encontrada en CSV, construyendo automáticamente: ${profileUrl}`);
      }
      
      if (profileUrl) {
        try {
          console.log(`   🌐 Visitando: ${profileUrl}`);
          
          const html = await fetchPage(profileUrl);
          
          if (html) {
            // Extraer Tools
            if (needsTools) {
              const tools = extractTools(html);
              if (tools.length > 0) {
                const toolsHTML = generateToolsHTML(tools);
                vaData.extracted.tools = {
                  raw: tools,
                  html: toolsHTML
                };
                console.log(`   ✅ Tools extraídos: ${tools.length} items`);
                console.log(`      Tools: ${tools.join(', ')}`);
              } else {
                console.log(`   ⚠️  No se encontraron Tools en la página`);
              }
            }
            
            // Extraer Equipment
            if (needsEquipment) {
              const equipment = extractEquipment(html);
              if (equipment.length > 0) {
                const equipmentHTML = generateEquipmentHTML(equipment);
                vaData.extracted.equipment = {
                  raw: equipment,
                  html: equipmentHTML
                };
                console.log(`   ✅ Equipment extraído: ${equipment.length} items`);
                console.log(`      Equipment: ${equipment.join(', ')}`);
              } else {
                console.log(`   ⚠️  No se encontró Equipment en la página`);
              }
            }
          } else {
            console.log(`   ⚠️  No se pudo obtener HTML de la página`);
          }
        } catch (error) {
          console.error(`   ❌ Error al procesar página: ${error.message}`);
          errors++;
        }
      } else {
        console.log(`   ⚠️  No se encontró URL en CSV`);
      }
    }
    
    // Generar Video Thumbnail
    if (needsThumbnail && videoUrl) {
      const youtubeId = getYoutubeId(videoUrl);
      if (youtubeId) {
        const thumbnailUrl = getThumbnailUrl(youtubeId);
        vaData.extracted.videoThumbnail = thumbnailUrl;
        console.log(`   ✅ Video Thumbnail generado: ${thumbnailUrl}`);
      } else {
        console.log(`   ⚠️  No se pudo extraer YouTube ID de: ${videoUrl}`);
      }
    }
    
    extractedData.push(vaData);
    processed++;
    
    // Delay para evitar rate limits
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Guardar datos extraídos en archivo JSON
  const outputPath = path.join(process.cwd(), 'src/data/datos-extraidos-para-revision.json');
  fs.writeFileSync(outputPath, JSON.stringify(extractedData, null, 2), 'utf-8');
  
  console.log('\n');
  console.log('═'.repeat(80));
  console.log('📊 RESUMEN FINAL');
  console.log('═'.repeat(80));
  console.log(`   VAs procesados: ${processed}`);
  console.log(`   Errores: ${errors}`);
  console.log(`\n✅ Datos extraídos guardados en: ${outputPath}`);
  console.log('\n⚠️  REVISAR EL ARCHIVO ANTES DE CARGAR AL CMS');
  console.log('═'.repeat(80));
  console.log('');
}

main().catch(console.error);
