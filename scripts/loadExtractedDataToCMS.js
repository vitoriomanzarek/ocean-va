/**
 * Script para cargar los datos extraídos al CMS de Webflow
 * Solo carga los datos que están en el archivo de revisión
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import fs from 'fs';
import path from 'path';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;
const DATA_FILE = path.join(process.cwd(), 'src/data/datos-extraidos-para-revision.json');

async function main() {
  console.log('📤 Cargando datos extraídos al CMS...\n');
  
  // Leer archivo de datos extraídos
  if (!fs.existsSync(DATA_FILE)) {
    console.error(`❌ Archivo no encontrado: ${DATA_FILE}`);
    console.error('   Ejecuta primero: node scripts/extractMissingDataForReview.js');
    process.exit(1);
  }
  
  const extractedData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  console.log(`✅ ${extractedData.length} VAs encontrados en archivo de revisión\n`);
  
  const apiClient = new WebflowApiClient(WEBFLOW_API_TOKEN);
  
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
  console.log('═'.repeat(80));
  console.log('');
  
  const stats = {
    total: extractedData.length,
    toolsUpdated: 0,
    equipmentUpdated: 0,
    thumbnailsUpdated: 0,
    errors: 0,
    skipped: 0
  };
  
  for (const vaData of extractedData) {
    const { name, slug, cmsId, extracted } = vaData;
    
    console.log(`📋 ${name.toUpperCase()} (${slug})`);
    console.log(`   CMS ID: ${cmsId}`);
    
    const updates = {};
    let hasUpdates = false;
    
    // Actualizar Tools
    if (extracted.tools && extracted.tools.html) {
      updates['tools-richtext'] = extracted.tools.html;
      hasUpdates = true;
      console.log(`   ✓ Tools: ${extracted.tools.raw.length} items`);
    }
    
    // Actualizar Equipment
    if (extracted.equipment && extracted.equipment.html) {
      updates['equipment-richtext'] = extracted.equipment.html;
      hasUpdates = true;
      console.log(`   ✓ Equipment: ${extracted.equipment.raw.length} items`);
    }
    
    // Actualizar Video Thumbnail
    if (extracted.videoThumbnail) {
      updates['video-thumbnail-2'] = extracted.videoThumbnail;
      hasUpdates = true;
      console.log(`   ✓ Video Thumbnail: ${extracted.videoThumbnail}`);
    }
    
    if (hasUpdates) {
      try {
        await apiClient.updateCollectionItem(vaCollection.id, cmsId, updates);
        
        if (updates['tools-richtext']) stats.toolsUpdated++;
        if (updates['equipment-richtext']) stats.equipmentUpdated++;
        if (updates['video-thumbnail-2']) stats.thumbnailsUpdated++;
        
        console.log(`   ✅ Actualizado exitosamente\n`);
      } catch (error) {
        console.error(`   ❌ Error: ${error.message}\n`);
        stats.errors++;
      }
    } else {
      console.log(`   ⚠️  No hay datos para actualizar\n`);
      stats.skipped++;
    }
    
    // Delay para evitar rate limits
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  
  console.log('═'.repeat(80));
  console.log('📊 RESUMEN FINAL');
  console.log('═'.repeat(80));
  console.log(`   VAs procesados: ${stats.total}`);
  console.log(`   Tools actualizados: ${stats.toolsUpdated}`);
  console.log(`   Equipment actualizados: ${stats.equipmentUpdated}`);
  console.log(`   Video Thumbnails actualizados: ${stats.thumbnailsUpdated}`);
  console.log(`   VAs omitidos: ${stats.skipped}`);
  console.log(`   Errores: ${stats.errors}`);
  console.log('═'.repeat(80));
  console.log('');
}

main().catch(console.error);
