/**
 * Script para actualizar el campo "Profile Slug (Link)" con el valor del campo "slug"
 * para todos los VAs en el CMS
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔍 Verificando campos en el CMS y actualizando Profile Slug...\n');
  
  const apiClient = new WebflowApiClient(WEBFLOW_API_TOKEN);
  const site = await apiClient.getSite(SITE_ID);
  const collectionsResponse = await apiClient.getCollections(SITE_ID);
  const vaCollection = collectionsResponse.collections.find(c => c.slug === 'virtual-assistants');
  
  if (!vaCollection) {
    console.error('❌ Colección "Virtual Assistants" no encontrada');
    return;
  }
  
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
  
  console.log(`✅ Total VAs encontrados: ${allVAs.length}\n`);
  
  // Verificar campos disponibles en el primer VA
  if (allVAs.length > 0) {
    const sampleVA = allVAs[0];
    console.log('════════════════════════════════════════════════════════════════════════════════');
    console.log('📋 CAMPOS DISPONIBLES (muestra del primer VA)');
    console.log('════════════════════════════════════════════════════════════════════════════════\n');
    
    const allFields = Object.keys(sampleVA.fieldData);
    const profileSlugFields = allFields.filter(f => 
      f.toLowerCase().includes('profile') || 
      f.toLowerCase().includes('slug') ||
      f.toLowerCase().includes('link')
    );
    
    console.log('Campos relacionados con Profile/Slug/Link:');
    profileSlugFields.forEach(field => {
      const value = sampleVA.fieldData[field];
      console.log(`   - ${field}: ${typeof value === 'string' ? value.substring(0, 50) : String(value)}`);
    });
    
    console.log('\nTodos los campos disponibles:');
    allFields.sort().forEach(field => {
      console.log(`   - ${field}`);
    });
  }
  
  // Identificar el campo correcto para "Profile Slug (Link)"
  // Basado en lo que vimos antes, probablemente sea "profile-slug-2"
  const profileSlugField = 'profile-slug-2'; // Campo que vimos antes
  
  console.log('\n════════════════════════════════════════════════════════════════════════════════');
  console.log('🔧 ACTUALIZANDO PROFILE SLUG');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log(`Usando campo: "${profileSlugField}"`);
  console.log(`Formato: slug del VA → profile-slug-2\n`);
  
  let updated = 0;
  let skipped = 0;
  let errors = 0;
  
  for (const va of allVAs) {
    const slug = va.fieldData.slug || '';
    const currentProfileSlug = va.fieldData[profileSlugField] || '';
    
    if (!slug) {
      console.log(`⚠️  ${va.fieldData.name || 'N/A'}: No tiene slug, saltando`);
      skipped++;
      continue;
    }
    
    // Construir el profile slug: /virtual-assistants/{slug}
    const newProfileSlug = `/virtual-assistants/${slug}`;
    
    // Solo actualizar si es diferente
    if (currentProfileSlug === newProfileSlug) {
      console.log(`✓ ${va.fieldData.name || 'N/A'}: Ya tiene el profile slug correcto`);
      skipped++;
      continue;
    }
    
    try {
      await apiClient.updateCollectionItem(vaCollection.id, va.id, {
        [profileSlugField]: newProfileSlug
      });
      console.log(`✓ ${va.fieldData.name || 'N/A'}: ${currentProfileSlug || '(vacío)'} → ${newProfileSlug}`);
      updated++;
    } catch (error) {
      console.error(`❌ ${va.fieldData.name || 'N/A'}: Error - ${error.message}`);
      errors++;
    }
  }
  
  console.log('\n════════════════════════════════════════════════════════════════════════════════');
  console.log('📊 RESUMEN');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log(`   Total VAs: ${allVAs.length}`);
  console.log(`   Actualizados: ${updated}`);
  console.log(`   Omitidos (ya correctos): ${skipped}`);
  console.log(`   Errores: ${errors}`);
}

main().catch(console.error);
