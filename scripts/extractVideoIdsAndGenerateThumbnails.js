/**
 * Script para extraer IDs de videos y generar thumbnails con formato sddefault.jpg
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import fs from 'fs';
import path from 'path';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

// Función para extraer YouTube ID de una URL
function extractYouTubeId(videoUrl) {
  if (!videoUrl) return null;
  
  // Patrones comunes de YouTube URLs
  const patterns = [
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
    /youtube\.com\/watch\?v=([^"&?\/\s]{11})/,
    /youtu\.be\/([^"&?\/\s]{11})/,
    /youtube\.com\/embed\/([^"&?\/\s]{11})/
  ];
  
  for (const pattern of patterns) {
    const match = videoUrl.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
}

// Función para generar thumbnail URL con formato sddefault.jpg
function generateThumbnailUrl(videoId) {
  if (!videoId) return null;
  return `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
}

async function main() {
  console.log('🎬 Extrayendo IDs de videos y generando thumbnails...\n');
  
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
    videoIdsExtracted: 0,
    thumbnailsGenerated: 0,
    thumbnailsUpdated: 0,
    skipped: 0,
    errors: 0
  };
  
  const thumbnailsData = [];
  
  for (const va of allVAs) {
    const vaName = va.fieldData.name || 'Sin nombre';
    const vaSlug = va.fieldData.slug || '';
    const videoUrl = va.fieldData['video'] || '';
    const currentThumbnail = va.fieldData['video-thumbnail-2'] || '';
    
    if (!videoUrl) {
      stats.skipped++;
      continue;
    }
    
    // Extraer YouTube ID
    const videoId = extractYouTubeId(videoUrl);
    
    if (!videoId) {
      console.log(`⚠️  ${vaName} (${vaSlug}): No se pudo extraer ID del video: ${videoUrl}`);
      stats.skipped++;
      continue;
    }
    
    stats.videoIdsExtracted++;
    
    // Generar nuevo thumbnail
    const newThumbnail = generateThumbnailUrl(videoId);
    stats.thumbnailsGenerated++;
    
    thumbnailsData.push({
      name: vaName,
      slug: vaSlug,
      cmsId: va.id,
      videoUrl,
      videoId,
      currentThumbnail,
      newThumbnail
    });
    
    // Solo actualizar si es diferente al actual
    if (currentThumbnail !== newThumbnail) {
      console.log(`📋 ${vaName.toUpperCase()} (${vaSlug})`);
      console.log(`   Video ID: ${videoId}`);
      console.log(`   Thumbnail actual: ${currentThumbnail ? currentThumbnail.substring(0, 60) + '...' : 'No tiene'}`);
      console.log(`   Nuevo thumbnail: ${newThumbnail}`);
      
      try {
        await apiClient.updateCollectionItem(vaCollection.id, va.id, {
          'video-thumbnail-2': newThumbnail
        });
        console.log(`   ✅ Actualizado exitosamente\n`);
        stats.thumbnailsUpdated++;
      } catch (error) {
        console.error(`   ❌ Error: ${error.message}\n`);
        stats.errors++;
      }
      
      // Delay para evitar rate limits
      await new Promise(resolve => setTimeout(resolve, 300));
    } else {
      stats.skipped++;
    }
  }
  
  // Guardar datos extraídos
  const outputPath = path.join(process.cwd(), 'src/data/video-thumbnails-generated.json');
  fs.writeFileSync(outputPath, JSON.stringify(thumbnailsData, null, 2), 'utf-8');
  
  console.log('═'.repeat(80));
  console.log('📊 RESUMEN FINAL');
  console.log('═'.repeat(80));
  console.log(`   Video IDs extraídos: ${stats.videoIdsExtracted}`);
  console.log(`   Thumbnails generados: ${stats.thumbnailsGenerated}`);
  console.log(`   Thumbnails actualizados: ${stats.thumbnailsUpdated}`);
  console.log(`   VAs omitidos: ${stats.skipped}`);
  console.log(`   Errores: ${stats.errors}`);
  console.log('═'.repeat(80));
  console.log('');
  console.log(`✅ Datos guardados en: ${outputPath}\n`);
}

main().catch(console.error);
