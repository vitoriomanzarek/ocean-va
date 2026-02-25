/**
 * Script para diagnosticar el problema del video thumbnail de Branko
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔍 Diagnosticando video thumbnail de Branko...\n');
  
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
  
  const branko = allVAs.find(v => {
    const name = (v.fieldData.name || '').toLowerCase();
    return name === 'branko' || name.startsWith('branko ');
  });
  
  if (!branko) {
    console.error('❌ Branko no encontrado en CMS');
    return;
  }
  
  console.log('✅ Branko encontrado en CMS\n');
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 CAMPOS DE VIDEO');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  // Verificar todos los campos relacionados con video
  const videoFields = [
    'video',
    'video-url',
    'video-url-2',
    'video-thumbnail',
    'video-thumbnail-2',
    'youtube-url'
  ];
  
  for (const field of videoFields) {
    const value = branko.fieldData[field] || '';
    if (value) {
      console.log(`✅ ${field}: "${value}"`);
    } else {
      console.log(`❌ ${field}: (vacío)`);
    }
  }
  
  console.log('\n');
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('💡 DIAGNÓSTICO');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const videoThumbnail = branko.fieldData['video-thumbnail-2'] || '';
  const video = branko.fieldData['video'] || '';
  const youtubeUrl = branko.fieldData['youtube-url'] || '';
  
  if (!videoThumbnail || videoThumbnail.trim() === '') {
    console.log('❌ PROBLEMA: El campo video-thumbnail-2 está vacío');
    console.log('\n💡 SOLUCIÓN:');
    
    // Intentar generar la URL del thumbnail desde el video URL
    if (video || youtubeUrl) {
      const videoUrl = video || youtubeUrl;
      console.log(`   Video URL encontrado: "${videoUrl}"`);
      
      // Extraer el ID del video de YouTube
      const youtubeIdMatch = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
      
      if (youtubeIdMatch) {
        const videoId = youtubeIdMatch[1];
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        console.log(`   ✅ ID del video extraído: ${videoId}`);
        console.log(`   ✅ URL del thumbnail generada: ${thumbnailUrl}`);
        console.log('\n   📤 ¿Quieres que actualice el campo video-thumbnail-2 con esta URL?');
        return { videoId, thumbnailUrl };
      } else {
        console.log('   ⚠️  No se pudo extraer el ID del video de YouTube');
      }
    } else {
      console.log('   ⚠️  No se encontró ningún campo de video URL');
      console.log('   💡 Necesitas proporcionar la URL del video o del thumbnail manualmente');
    }
  } else {
    console.log(`✅ El campo video-thumbnail-2 tiene valor: "${videoThumbnail}"`);
    console.log('\n💡 Si el thumbnail no se ve en el frontend, puede ser:');
    console.log('   1. La URL está mal formateada');
    console.log('   2. El campo no está conectado correctamente en el template');
    console.log('   3. Problema de caché del navegador');
    console.log('   4. La imagen no está disponible en esa URL');
    
    // Verificar formato de URL
    if (videoThumbnail.startsWith('http://') || videoThumbnail.startsWith('https://')) {
      console.log('\n   ✅ La URL tiene el formato correcto (http/https)');
    } else {
      console.log('\n   ⚠️  La URL no tiene el formato correcto (debería empezar con http:// o https://)');
    }
  }
  
  console.log('\n');
}

main().catch(console.error);
