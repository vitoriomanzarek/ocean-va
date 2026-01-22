/**
 * Script para convertir tools-tags y equipment-tags a tools-richtext y equipment-richtext
 * Esto soluciona el problema de VAs que tienen datos en tags pero no se muestran en el template
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

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

// Generar HTML de Tools desde tags
function generateToolsHTMLFromTags(tagsString) {
  if (!tagsString || typeof tagsString !== 'string') return '';
  
  const tools = tagsString.split(',').map(t => t.trim()).filter(Boolean);
  if (tools.length === 0) return '';
  
  const items = tools.map(tool => 
    `<div class="va-tool-item"><span class="va-tool-checkmark">✓</span><span>${escapeHtml(tool)}</span></div>`
  ).join('');
  
  return `<div class="va-tools-list">${items}</div>`;
}

// Generar HTML de Equipment desde tags
function generateEquipmentHTMLFromTags(tagsString) {
  if (!tagsString || typeof tagsString !== 'string') return '';
  
  const equipment = tagsString.split(',').map(e => e.trim()).filter(Boolean);
  if (equipment.length === 0) return '';
  
  const monitorSVG = `<svg class="va-equipment-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20m0 0l-.75 3M9 20H5m4 0h10m0 0l.75 3M19 20l.75 3M19 20h4m-4 0h.01M9 17h10a2 2 0 002-2V5a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`;
  
  const headsetSVG = `<svg class="va-equipment-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>`;
  
  const items = equipment.map(equip => {
    const isMonitor = equip.toLowerCase().includes('monitor');
    const svg = isMonitor ? monitorSVG : headsetSVG;
    return `<div class="va-equipment-item">${svg}<span>${escapeHtml(equip)}</span></div>`;
  }).join('');
  
  return `<div class="va-equipment-list">${items}</div>`;
}

async function main() {
  console.log('🔧 Convirtiendo tags a richtext para todos los VAs...\n');
  
  const apiClient = new WebflowApiClient(WEBFLOW_API_TOKEN);
  
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
  console.log('═'.repeat(80));
  console.log('');
  
  const stats = {
    toolsConverted: 0,
    equipmentConverted: 0,
    errors: 0,
    skipped: 0
  };
  
  for (const va of allVAs) {
    const vaName = va.fieldData.name || 'Sin nombre';
    const vaSlug = va.fieldData.slug || 'sin-slug';
    
    const toolsTags = va.fieldData['tools-tags'] || '';
    const toolsRichtext = va.fieldData['tools-richtext'] || '';
    const equipmentTags = va.fieldData['equipment-tags'] || '';
    const equipmentRichtext = va.fieldData['equipment-richtext'] || '';
    
    const hasToolsTags = toolsTags && toolsTags.trim() !== '';
    const hasToolsRichtext = toolsRichtext && toolsRichtext.trim() !== '';
    const hasEquipmentTags = equipmentTags && equipmentTags.trim() !== '';
    const hasEquipmentRichtext = equipmentRichtext && equipmentRichtext.trim() !== '';
    
    // Solo procesar si tiene tags pero NO tiene richtext
    const needsToolsConversion = hasToolsTags && !hasToolsRichtext;
    const needsEquipmentConversion = hasEquipmentTags && !hasEquipmentRichtext;
    
    if (!needsToolsConversion && !needsEquipmentConversion) {
      stats.skipped++;
      continue;
    }
    
    console.log(`📋 ${vaName.toUpperCase()} (${vaSlug})`);
    console.log(`   CMS ID: ${va.id}`);
    
    const updates = {};
    
    if (needsToolsConversion) {
      const toolsHTML = generateToolsHTMLFromTags(toolsTags);
      if (toolsHTML) {
        updates['tools-richtext'] = toolsHTML;
        const tools = toolsTags.split(',').map(t => t.trim()).filter(Boolean);
        console.log(`   ✓ Tools: ${tools.length} items (${tools.join(', ')})`);
        stats.toolsConverted++;
      }
    }
    
    if (needsEquipmentConversion) {
      const equipmentHTML = generateEquipmentHTMLFromTags(equipmentTags);
      if (equipmentHTML) {
        updates['equipment-richtext'] = equipmentHTML;
        const equipment = equipmentTags.split(',').map(e => e.trim()).filter(Boolean);
        console.log(`   ✓ Equipment: ${equipment.length} items (${equipment.join(', ')})`);
        stats.equipmentConverted++;
      }
    }
    
    if (Object.keys(updates).length > 0) {
      try {
        await apiClient.updateCollectionItem(vaCollection.id, va.id, updates);
        console.log(`   ✅ Actualizado exitosamente\n`);
      } catch (error) {
        console.error(`   ❌ Error: ${error.message}\n`);
        stats.errors++;
      }
    } else {
      stats.skipped++;
      console.log(`   ⚠️  No hay cambios para actualizar\n`);
    }
    
    // Delay para evitar rate limits
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  
  console.log('═'.repeat(80));
  console.log('📊 RESUMEN FINAL');
  console.log('═'.repeat(80));
  console.log(`   VAs procesados: ${allVAs.length}`);
  console.log(`   Tools convertidos: ${stats.toolsConverted}`);
  console.log(`   Equipment convertido: ${stats.equipmentConverted}`);
  console.log(`   VAs omitidos (ya tienen richtext): ${stats.skipped}`);
  console.log(`   Errores: ${stats.errors}`);
  console.log('═'.repeat(80));
  console.log('');
}

main().catch(console.error);
