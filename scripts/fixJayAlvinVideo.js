/**
 * Script para corregir el video y thumbnail de Jay Alvin
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔧 Corrigiendo video y thumbnail de Jay Alvin...\n');
  
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
  
  const jayAlvin = allVAs.find(v => {
    const name = (v.fieldData.name || '').toLowerCase();
    return (name.includes('jay') && name.includes('alvin')) || name === 'jay alvin' || name.startsWith('jay alvin');
  });
  
  if (!jayAlvin) {
    console.error('❌ Jay Alvin no encontrado en CMS');
    return;
  }
  
  console.log('✅ Jay Alvin encontrado en CMS\n');
  
  // URL correcta del video
  const correctVideoUrl = 'https://www.youtube.com/watch?v=ZL6KHoVvPYs';
  const videoId = 'ZL6KHoVvPYs';
  const correctThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 VALORES ACTUALES');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const currentVideo = jayAlvin.fieldData['video'] || '';
  const currentThumbnail = jayAlvin.fieldData['video-thumbnail-2'] || '';
  
  console.log(`Video URL: "${currentVideo}"`);
  console.log(`Video Thumbnail: "${currentThumbnail}"`);
  console.log('\n');
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 VALORES CORRECTOS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  console.log(`Video URL: "${correctVideoUrl}"`);
  console.log(`Video Thumbnail: "${correctThumbnail}"`);
  console.log(`Video ID: ${videoId}`);
  console.log('\n');
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📤 ACTUALIZANDO CMS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const updates = {
    'video': correctVideoUrl,
    'video-thumbnail-2': correctThumbnail
  };
  
  try {
    await apiClient.updateCollectionItem(vaCollection.id, jayAlvin.id, updates);
    
    console.log('✅ Video y thumbnail de Jay Alvin actualizados exitosamente\n');
    console.log('════════════════════════════════════════════════════════════════════════════════');
    console.log('📊 RESUMEN');
    console.log('════════════════════════════════════════════════════════════════════════════════\n');
    console.log('   ✅ Video URL: Corregido');
    console.log(`      Antes: "${currentVideo}"`);
    console.log(`      Ahora: "${correctVideoUrl}"`);
    console.log('   ✅ Video Thumbnail: Corregido');
    console.log(`      Antes: "${currentThumbnail}"`);
    console.log(`      Ahora: "${correctThumbnail}"`);
    console.log('\n   💡 El video y thumbnail ahora deberían mostrarse correctamente en la página.');
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
  
  console.log();
}

main().catch(console.error);
