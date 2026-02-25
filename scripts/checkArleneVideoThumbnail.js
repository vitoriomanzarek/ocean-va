/**
 * Script para verificar los datos del video y thumbnail de Arlene
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

function getVideoId(url) {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
  return match ? match[1] : null;
}

function generateThumbnailUrl(videoId) {
  if (!videoId) return null;
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

async function main() {
  console.log('🔍 Verificando datos del video de Arlene...\n');
  
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
  
  const arlene = allVAs.find(v => {
    const name = (v.fieldData.name || '').toLowerCase();
    return name.includes('arlene');
  });
  
  if (!arlene) {
    console.error('❌ Arlene no encontrado en CMS');
    return;
  }
  
  console.log('✅ Arlene encontrado en CMS\n');
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 DATOS ACTUALES EN CMS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const videoUrl = arlene.fieldData.video || '';
  const videoThumbnail = arlene.fieldData['video-thumbnail-2'] || '';
  
  console.log(`📹 Campo "video" (Link):`);
  console.log(`   Valor: ${videoUrl || '(vacío)'}`);
  console.log(`   Longitud: ${videoUrl.length} caracteres`);
  if (videoUrl) {
    const videoId = getVideoId(videoUrl);
    console.log(`   Video ID extraído: ${videoId || 'NO SE PUDO EXTRAER'}`);
    if (videoId) {
      const autoThumbnail = generateThumbnailUrl(videoId);
      console.log(`   Thumbnail auto-generado: ${autoThumbnail}`);
    }
  }
  console.log();
  
  console.log(`🖼️  Campo "video-thumbnail-2" (PlainText):`);
  console.log(`   Valor: ${videoThumbnail || '(vacío)'}`);
  console.log(`   Longitud: ${videoThumbnail.length} caracteres`);
  if (videoThumbnail) {
    console.log(`   Tiene espacios al inicio: ${videoThumbnail !== videoThumbnail.trimStart()}`);
    console.log(`   Tiene espacios al final: ${videoThumbnail !== videoThumbnail.trimEnd()}`);
    console.log(`   Valor trimmeado: "${videoThumbnail.trim()}"`);
    console.log(`   Es URL válida: ${videoThumbnail.trim().startsWith('http')}`);
    
    // Verificar si la URL es accesible
    if (videoThumbnail.trim().startsWith('http')) {
      console.log(`   ✅ URL parece válida`);
    } else {
      console.log(`   ⚠️  URL no parece válida (no empieza con http)`);
    }
  }
  console.log();
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('🔍 DIAGNÓSTICO');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  if (!videoUrl && !videoThumbnail) {
    console.log('❌ PROBLEMA: Ambos campos están vacíos');
    console.log('   Solución: Agregar al menos el campo "video" con la URL de YouTube');
  } else if (!videoThumbnail) {
    console.log('⚠️  ADVERTENCIA: Campo "video-thumbnail-2" está vacío');
    if (videoUrl) {
      const videoId = getVideoId(videoUrl);
      if (videoId) {
        const autoThumbnail = generateThumbnailUrl(videoId);
        console.log(`   ✅ El JavaScript debería generar automáticamente: ${autoThumbnail}`);
        console.log(`   💡 Si no se ve, el problema puede ser:`);
        console.log(`      1. El campo "video" no está conectado correctamente en Webflow Designer`);
        console.log(`      2. El JavaScript no está ejecutándose correctamente`);
      } else {
        console.log(`   ❌ No se pudo extraer el Video ID de: ${videoUrl}`);
      }
    }
  } else {
    const trimmed = videoThumbnail.trim();
    if (trimmed !== videoThumbnail) {
      console.log('⚠️  ADVERTENCIA: El campo "video-thumbnail-2" tiene espacios extra');
      console.log(`   Valor original: "${videoThumbnail}"`);
      console.log(`   Valor trimmeado: "${trimmed}"`);
      console.log(`   💡 Solución: Limpiar espacios del campo en el CMS`);
    } else if (!trimmed.startsWith('http')) {
      console.log('❌ PROBLEMA: La URL del thumbnail no es válida');
      console.log(`   Valor: "${trimmed}"`);
      console.log(`   Debe empezar con "http://" o "https://"`);
    } else {
      console.log('✅ Los datos parecen correctos');
      console.log(`   URL del thumbnail: ${trimmed}`);
      console.log(`   💡 Si no se ve en el frontend, el problema puede ser:`);
      console.log(`      1. El campo "video-thumbnail-2" no está conectado en Webflow Designer`);
      console.log(`      2. El template no está reemplazando {{video-thumbnail-2}} correctamente`);
      console.log(`      3. Hay un problema de CORS o la imagen no está accesible`);
      console.log(`      4. El JavaScript está sobrescribiendo el estilo inline`);
    }
  }
  
  console.log('\n════════════════════════════════════════════════════════════════════════════════');
  console.log('💡 RECOMENDACIONES');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  if (videoThumbnail) {
    const trimmed = videoThumbnail.trim();
    if (trimmed !== videoThumbnail) {
      console.log('1. Limpiar espacios del campo "video-thumbnail-2" en el CMS');
    }
    console.log('2. Verificar en Webflow Designer que el campo "video-thumbnail-2" está conectado');
    console.log('3. Verificar en el navegador (DevTools) si la URL se está aplicando correctamente');
    console.log('4. Verificar en la consola del navegador si hay errores de JavaScript');
    console.log('5. Probar la URL directamente en el navegador para verificar que la imagen carga');
  } else if (videoUrl) {
    const videoId = getVideoId(videoUrl);
    if (videoId) {
      const autoThumbnail = generateThumbnailUrl(videoId);
      console.log(`1. El JavaScript debería generar: ${autoThumbnail}`);
      console.log('2. Verificar que el campo "video" está conectado en Webflow Designer');
      console.log('3. Verificar en la consola del navegador si el JavaScript está ejecutándose');
    }
  }
  
  console.log();
}

main().catch(console.error);
