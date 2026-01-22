/**
 * Script para extraer Tools y Equipment de las páginas originales de los VAs
 * y actualizar el CMS con esos datos
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const CSV_FILE = path.join(__dirname, '../src/data/carga-vas-2026.csv');

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
  // Patrón: <div class="va-tool-item">...<span>Tool Name</span>...</div>
  const toolItemRegex = /<div[^>]*class="[^"]*va-tool-item[^"]*"[^>]*>(.*?)<\/div>/gis;
  let match;
  
  while ((match = toolItemRegex.exec(html)) !== null) {
    const itemHtml = match[1];
    // Extraer el texto del span (evitando el checkmark)
    const spanMatch = itemHtml.match(/<span[^>]*(?!checkmark)[^>]*>([^<]+)<\/span>/i);
    if (spanMatch && spanMatch[1]) {
      const toolText = spanMatch[1].trim();
      if (toolText && !toolText.match(/^✓|✓$/)) { // Excluir si solo tiene checkmark
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
  // Patrón: <div class="va-equipment-item">...<span>Equipment Name</span></div>
  const equipmentItemRegex = /<div[^>]*class="[^"]*va-equipment-item[^"]*"[^>]*>(.*?)<\/div>/gis;
  let match;
  
  while ((match = equipmentItemRegex.exec(html)) !== null) {
    const itemHtml = match[1];
    // Extraer el texto del último span (después del SVG)
    const spanMatches = itemHtml.match(/<span[^>]*>([^<]+)<\/span>/gi);
    if (spanMatches && spanMatches.length > 0) {
      // Tomar el último span
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

async function main() {
  console.log('🔍 Extrayendo Tools y Equipment de páginas originales...\n');
  
  const apiClient = new WebflowApiClient(process.env.WEBFLOW_API_TOKEN);
  
  try {
    // Leer CSV para obtener URLs
    const csvContent = fs.readFileSync(CSV_FILE, 'utf8');
    const csvRecords = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });
    
    // Crear mapa de slug a URL
    const urlMap = new Map();
    csvRecords.forEach(record => {
      if (record.slug && record['profile-slug-2']) {
        urlMap.set(record.slug.toLowerCase(), record['profile-slug-2']);
      }
    });
    
    // Obtener el sitio
    const site = await apiClient.getSite(SITE_ID);
    console.log(`📍 Sitio: ${site.displayName} (${site.id})\n`);
    
    // Obtener la colección
    const collectionsResponse = await apiClient.getCollections(site.id);
    const vaCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'virtual-assistants'
    );
    
    if (!vaCollection) {
      console.error('❌ Virtual Assistants collection not found');
      process.exit(1);
    }
    
    console.log(`📍 Virtual Assistants Collection ID: ${vaCollection.id}\n`);
    
    // Obtener todos los items
    let allItems = [];
    let offset = 0;
    const limit = 100;
    
    while (true) {
      const response = await apiClient.getCollectionItems(vaCollection.id, { limit, offset });
      if (!response.items || response.items.length === 0) break;
      allItems = allItems.concat(response.items);
      if (response.items.length < limit) break;
      offset += limit;
    }
    
    // Filtrar VAs que necesitan actualización (Tools o Equipment vacíos)
    const itemsToUpdate = allItems.filter(item => {
      const toolsRichtext = item.fieldData?.['tools-richtext'] || '';
      const equipmentRichtext = item.fieldData?.['equipment-richtext'] || '';
      const isEmpty = (str) => !str || str.trim() === '';
      
      return isEmpty(toolsRichtext) || isEmpty(equipmentRichtext);
    });
    
    console.log(`✅ Total VAs en CMS: ${allItems.length}`);
    console.log(`📊 VAs que necesitan actualización: ${itemsToUpdate.length}\n`);
    console.log('═'.repeat(80));
    console.log('');
    
    let totalUpdated = 0;
    let totalSkipped = 0;
    let totalErrors = 0;
    
    for (const item of itemsToUpdate) {
      const name = item.fieldData?.name || 'Unnamed';
      const slug = item.fieldData?.slug || '';
      const toolsRichtext = item.fieldData?.['tools-richtext'] || '';
      const equipmentRichtext = item.fieldData?.['equipment-richtext'] || '';
      
      const needsTools = !toolsRichtext || toolsRichtext.trim() === '';
      const needsEquipment = !equipmentRichtext || equipmentRichtext.trim() === '';
      
      console.log(`\n📋 ${name.toUpperCase()} (${slug})`);
      console.log(`   CMS ID: ${item.id}`);
      
      // Obtener URL de la página
      const profileUrl = urlMap.get(slug.toLowerCase());
      
      if (!profileUrl) {
        console.log(`   ⚠️  No se encontró URL en CSV, omitiendo...`);
        totalSkipped++;
        continue;
      }
      
      // Visitar la página
      try {
        console.log(`   🌐 Visitando: ${profileUrl}`);
        
        const html = await fetchPage(profileUrl);
        
        if (!html) {
          console.log(`   ⚠️  No se pudo obtener HTML, omitiendo...`);
          totalSkipped++;
          continue;
        }
        
        // Extraer Tools
        let toolsHTML = toolsRichtext;
        if (needsTools) {
          const tools = extractTools(html);
          if (tools.length > 0) {
            toolsHTML = generateToolsHTML(tools);
            console.log(`   ✅ Tools extraídos: ${tools.length} items`);
            console.log(`      Tools: ${tools.join(', ')}`);
          } else {
            console.log(`   ⚠️  No se encontraron Tools en la página`);
          }
        } else {
          console.log(`   ℹ️  Tools ya tiene contenido, omitiendo...`);
        }
        
        // Extraer Equipment
        let equipmentHTML = equipmentRichtext;
        if (needsEquipment) {
          const equipment = extractEquipment(html);
          if (equipment.length > 0) {
            equipmentHTML = generateEquipmentHTML(equipment);
            console.log(`   ✅ Equipment extraído: ${equipment.length} items`);
            console.log(`      Equipment: ${equipment.join(', ')}`);
          } else {
            console.log(`   ⚠️  No se encontró Equipment en la página`);
          }
        } else {
          console.log(`   ℹ️  Equipment ya tiene contenido, omitiendo...`);
        }
        
        // Actualizar en Webflow solo si hay cambios
        if ((needsTools && toolsHTML && toolsHTML !== toolsRichtext) || 
            (needsEquipment && equipmentHTML && equipmentHTML !== equipmentRichtext)) {
          
          const fieldData = {};
          if (needsTools && toolsHTML) {
            fieldData['tools-richtext'] = toolsHTML;
          }
          if (needsEquipment && equipmentHTML) {
            fieldData['equipment-richtext'] = equipmentHTML;
          }
          
          try {
            await apiClient.updateCollectionItem(vaCollection.id, item.id, fieldData);
            
            console.log(`   ✅ Actualizado exitosamente en CMS`);
            totalUpdated++;
          } catch (updateError) {
            console.error(`   ❌ Error al actualizar en Webflow: ${updateError.message}`);
            if (updateError.response) {
              console.error(`      Response: ${JSON.stringify(updateError.response, null, 2)}`);
              if (updateError.response.details && Array.isArray(updateError.response.details)) {
                updateError.response.details.forEach(detail => {
                  console.error(`      - Campo: ${detail.param || 'unknown'}, Error: ${detail.description || detail.message || 'unknown'}`);
                });
              }
            }
            // Continuar con el siguiente VA en lugar de fallar completamente
            totalErrors++;
          }
        } else {
          console.log(`   ⚠️  No hay cambios para actualizar`);
          totalSkipped++;
        }
        
        // Delay para evitar rate limits
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (error) {
        console.error(`   ❌ Error al procesar: ${error.message}`);
        totalErrors++;
        // Delay incluso en caso de error
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    console.log('\n');
    console.log('═'.repeat(80));
    console.log('📊 RESUMEN FINAL');
    console.log('═'.repeat(80));
    console.log(`   VAs procesados: ${itemsToUpdate.length}`);
    console.log(`   VAs actualizados: ${totalUpdated}`);
    console.log(`   VAs omitidos: ${totalSkipped}`);
    console.log(`   Errores: ${totalErrors}`);
    console.log('═'.repeat(80));
    console.log('');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('   Detalles:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();
