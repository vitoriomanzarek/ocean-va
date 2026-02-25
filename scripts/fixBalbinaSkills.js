/**
 * Script para corregir el doble fondo en skills de Balbina
 * El problema: el campo skills-richtext incluye <div class="va-skills-container">
 * pero el template ya tiene ese contenedor, causando doble fondo.
 * 
 * Solución: Remover el contenedor del HTML, dejar solo los <span> tags
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

function fixSkillsHTML(html) {
  if (!html || typeof html !== 'string') return html;
  
  // Buscar el contenedor va-skills-container y extraer solo su contenido interno
  const containerMatch = html.match(/<div\s+class=["']va-skills-container["'][^>]*>(.*?)<\/div>/s);
  
  if (containerMatch) {
    // Si encontramos el contenedor, extraer solo el contenido interno
    const innerContent = containerMatch[1].trim();
    console.log('   ✅ Contenedor encontrado, extrayendo contenido interno...');
    return innerContent;
  }
  
  // Si no hay contenedor, puede que ya esté correcto o tenga otro formato
  // Verificar si tiene tags individuales
  const hasSkillTags = html.includes('va-skill-tag');
  if (hasSkillTags) {
    // Ya tiene los tags, solo asegurarse de que no tenga el contenedor
    return html.replace(/<div\s+class=["']va-skills-container["'][^>]*>/gi, '').replace(/<\/div>\s*$/, '').trim();
  }
  
  return html;
}

async function main() {
  console.log('🔧 Corrigiendo doble fondo en skills de Balbina...\n');
  
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
  
  const balbina = allVAs.find(v => {
    const name = (v.fieldData.name || '').toLowerCase();
    return name === 'balbina' || name.startsWith('balbina ');
  });
  
  if (!balbina) {
    console.error('❌ Balbina no encontrado en CMS');
    return;
  }
  
  console.log('✅ Balbina encontrado en CMS\n');
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 VALOR ACTUAL');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const currentSkills = balbina.fieldData['skills-richtext'] || '';
  console.log(`Campo: skills-richtext`);
  console.log(`Longitud: ${currentSkills.length} caracteres`);
  console.log(`Contiene contenedor: ${currentSkills.includes('va-skills-container') ? '⚠️  SÍ (esto causa el doble fondo)' : '✅ NO'}`);
  console.log(`\nContenido actual (primeros 300 chars):`);
  console.log(currentSkills.substring(0, 300) + (currentSkills.length > 300 ? '...' : ''));
  console.log();
  
  const fixedSkills = fixSkillsHTML(currentSkills);
  
  if (fixedSkills === currentSkills && currentSkills.includes('va-skills-container')) {
    console.log('⚠️  Intentando método alternativo...\n');
    
    // Método alternativo: remover cualquier div contenedor que tenga la clase
    const altFixed = currentSkills
      .replace(/<div[^>]*class=["'][^"']*va-skills-container[^"']*["'][^>]*>/gi, '')
      .replace(/<\/div>\s*(?=<span)/g, '') // Remover </div> que esté antes de un <span>
      .replace(/<\/div>\s*$/g, '') // Remover </div> al final
      .trim();
    
    if (altFixed !== currentSkills) {
      console.log('   ✅ Método alternativo funcionó\n');
      await updateField(apiClient, vaCollection.id, balbina.id, altFixed, currentSkills);
      return;
    }
  }
  
  if (fixedSkills === currentSkills) {
    console.log('✅ El campo ya está correcto, no necesita corrección.\n');
    return;
  }
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 VALOR CORREGIDO');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log(`Campo: skills-richtext`);
  console.log(`Longitud: ${fixedSkills.length} caracteres`);
  console.log(`Contiene contenedor: ${fixedSkills.includes('va-skills-container') ? '⚠️  SÍ (aún tiene)' : '✅ NO (removido)'}`);
  console.log(`\nContenido corregido (primeros 300 chars):`);
  console.log(fixedSkills.substring(0, 300) + (fixedSkills.length > 300 ? '...' : ''));
  console.log();
  
  await updateField(apiClient, vaCollection.id, balbina.id, fixedSkills, currentSkills);
}

async function updateField(apiClient, collectionId, itemId, newValue, oldValue) {
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📤 ACTUALIZANDO CMS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  try {
    await apiClient.updateCollectionItem(collectionId, itemId, {
      'skills-richtext': newValue
    });
    
    console.log('✅ Campo skills-richtext actualizado exitosamente\n');
    console.log('════════════════════════════════════════════════════════════════════════════════');
    console.log('📊 RESUMEN');
    console.log('════════════════════════════════════════════════════════════════════════════════\n');
    console.log('   Campo actualizado: skills-richtext');
    console.log(`   Longitud anterior: ${oldValue.length} caracteres`);
    console.log(`   Longitud nueva: ${newValue.length} caracteres`);
    console.log(`   Diferencia: ${newValue.length - oldValue.length} caracteres`);
    console.log('\n   💡 El doble fondo debería desaparecer después de publicar y recargar la página.');
    console.log('\n   📝 LECCIÓN APRENDIDA:');
    console.log('      - El template YA tiene <div class="va-skills-container" id="va-skills-target">');
    console.log('      - El campo skills-richtext NO debe incluir el contenedor');
    console.log('      - Solo debe contener los <span class="va-skill-tag"> tags');
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
}

main().catch(console.error);
