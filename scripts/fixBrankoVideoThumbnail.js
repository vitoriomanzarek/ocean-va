/**
 * Script para corregir el video thumbnail de Branko
 * El ID del video está incompleto en el CMS
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔧 Corrigiendo video thumbnail de Branko...\n');
  
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
  
  // El ID correcto del video es i6-nGI5xLNM (según el HTML original)
  const correctVideoId = 'i6-nGI5xLNM';
  const correctThumbnail = `https://img.youtube.com/vi/${correctVideoId}/hqdefault.jpg`;
  const correctVideoUrl = `https://youtu.be/${correctVideoId}`;
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 VALORES ACTUALES');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const currentThumbnail = branko.fieldData['video-thumbnail-2'] || '';
  const currentVideo = branko.fieldData['video'] || '';
  
  console.log(`Video Thumbnail: "${currentThumbnail}"`);
  console.log(`Video URL: "${currentVideo}"`);
  console.log('\n');
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 VALORES CORRECTOS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  console.log(`Video Thumbnail: "${correctThumbnail}"`);
  console.log(`Video URL: "${correctVideoUrl}"`);
  console.log('\n');
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📤 ACTUALIZANDO CMS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const updates = {
    'video-thumbnail-2': correctThumbnail,
    'video': correctVideoUrl
  };
  
  try {
    await apiClient.updateCollectionItem(vaCollection.id, branko.id, updates);
    
    console.log('✅ Video thumbnail y URL de Branko actualizados exitosamente\n');
    console.log('════════════════════════════════════════════════════════════════════════════════');
    console.log('📊 RESUMEN');
    console.log('════════════════════════════════════════════════════════════════════════════════\n');
    console.log('   ✅ Video Thumbnail: Corregido');
    console.log(`      Antes: "${currentThumbnail}"`);
    console.log(`      Ahora: "${correctThumbnail}"`);
    console.log('   ✅ Video URL: Corregido');
    console.log(`      Antes: "${currentVideo}"`);
    console.log(`      Ahora: "${correctVideoUrl}"`);
    console.log('\n   💡 El video thumbnail ahora debería mostrarse correctamente en la página.');
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
  
  console.log();
}

main().catch(console.error);
