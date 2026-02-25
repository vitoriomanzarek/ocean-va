/**
 * Script para corregir campos de Alyssa:
 * 1. Verificar Employment Summary (ya tiene datos, pero verificar formato)
 * 2. Employment History está vacío (correcto, no tiene en HTML minificado)
 * 3. DISC Type tiene ID pero no se muestra (problema de Designer)
 * 4. English Result Title tiene datos pero verificar
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import fs from 'fs';
import path from 'path';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔧 Verificando y corrigiendo campos de Alyssa...\n');
  
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
  
  const alyssa = allVAs.find(v => {
    const name = (v.fieldData.name || '').toLowerCase();
    return name.includes('alyssa');
  });
  
  if (!alyssa) {
    console.error('❌ Alyssa no encontrado en CMS');
    return;
  }
  
  console.log('✅ Alyssa encontrado en CMS\n');
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 DIAGNÓSTICO');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  // Leer HTML minificado para comparar
  const htmlPath = path.join(process.cwd(), 'webflow-components-minified', '297-alyssa-profile.html');
  let htmlContent = '';
  try {
    htmlContent = fs.readFileSync(htmlPath, 'utf-8');
  } catch (e) {
    console.log('⚠️  No se pudo leer el HTML minificado\n');
  }
  
  // 1. Employment Summary
  console.log('1. EMPLOYMENT SUMMARY:');
  const currentSummary = alyssa.fieldData['employment-summary'] || '';
  console.log(`   Valor actual: ${currentSummary.substring(0, 100)}...`);
  
  // Extraer del HTML si está disponible
  let expectedSummary = '';
  if (htmlContent) {
    const summaryMatch = htmlContent.match(/<p class="va-employment-summary">(.*?)<\/p>/s);
    if (summaryMatch) {
      expectedSummary = summaryMatch[1]
        .replace(/<strong>(.*?)<\/strong>/g, '$1') // Remover <strong> tags
        .replace(/&nbsp;/g, ' ')
        .trim();
    }
  }
  
  if (expectedSummary && expectedSummary !== currentSummary) {
    console.log(`   ⚠️  Diferencia encontrada con HTML minificado`);
    console.log(`   Valor esperado: ${expectedSummary.substring(0, 100)}...`);
  } else {
    console.log(`   ✅ Campo tiene datos`);
  }
  console.log();
  
  // 2. Employment History
  console.log('2. EMPLOYMENT HISTORY:');
  const currentEmployment = alyssa.fieldData['employment-richtext'] || '';
  if (!currentEmployment || currentEmployment.trim() === '') {
    console.log(`   ✅ Campo está vacío (correcto, no tiene employment history en HTML)`);
  } else {
    console.log(`   ⚠️  Campo tiene datos: ${currentEmployment.substring(0, 100)}...`);
  }
  console.log();
  
  // 3. DISC Type
  console.log('3. DISC TYPE:');
  const discType = alyssa.fieldData['disc-type-2'] || '';
  if (discType) {
    if (/^[a-f0-9]{32}$/i.test(discType.trim())) {
      console.log(`   ⚠️  Campo tiene ID: ${discType}`);
      console.log(`   💡 Problema: Webflow devuelve ID en lugar de texto`);
      console.log(`   💡 Solución: Re-conectar el elemento Text "va-disc-type-source" en Webflow Designer`);
    } else {
      console.log(`   ✅ Campo tiene texto: "${discType}"`);
    }
  } else {
    console.log(`   ❌ Campo está vacío`);
  }
  console.log();
  
  // 4. English Result Title
  console.log('4. ENGLISH RESULT (TÍTULO):');
  const englishTestType = alyssa.fieldData['type-of-english-test'] || '';
  if (englishTestType && englishTestType.trim() !== '') {
    console.log(`   ✅ Campo tiene datos: "${englishTestType}"`);
    
    // Verificar si coincide con el HTML
    if (htmlContent) {
      const titleMatch = htmlContent.match(/EF ENGLISH TEST RESULT/i);
      if (titleMatch && englishTestType !== 'EF English Test') {
        console.log(`   ⚠️  HTML tiene "EF ENGLISH TEST RESULT" pero CMS tiene "${englishTestType}"`);
      }
    }
  } else {
    console.log(`   ❌ Campo está vacío`);
  }
  console.log();
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('💡 RECOMENDACIONES');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const updates = {};
  let needsUpdate = false;
  
  // Actualizar Employment Summary si es necesario
  if (expectedSummary && expectedSummary !== currentSummary) {
    updates['employment-summary'] = expectedSummary;
    needsUpdate = true;
    console.log('✅ Se actualizará Employment Summary');
  }
  
  // Verificar si el Employment History debería estar vacío
  if (currentEmployment && currentEmployment.trim() !== '') {
    // Si tiene datos pero no debería, limpiarlo
    if (!htmlContent.includes('va-employment-accordion')) {
      updates['employment-richtext'] = '';
      needsUpdate = true;
      console.log('✅ Se limpiará Employment History (no tiene datos en HTML)');
    }
  }
  
  if (!needsUpdate) {
    console.log('✅ No se requieren actualizaciones de datos en el CMS');
    console.log('\n⚠️  PROBLEMAS IDENTIFICADOS QUE REQUIEREN ACCIÓN MANUAL:\n');
    console.log('1. DISC Type no se muestra:');
    console.log('   - El campo tiene el ID correcto pero Webflow no renderiza el texto');
    console.log('   - Solución: En Webflow Designer, re-conectar el elemento Text con ID "va-disc-type-source"');
    console.log('     al campo "DISC Type 2", luego publicar y limpiar caché\n');
    
    console.log('2. Employment Summary y English Title no se ven:');
    console.log('   - Los campos tienen datos en el CMS');
    console.log('   - Verificar en el navegador (DevTools) si {{employment-summary}} y {{type-of-english-test}}');
    console.log('     se están reemplazando correctamente');
    console.log('   - Verificar que los campos estén conectados en Webflow Designer\n');
    
    console.log('3. Employment History:');
    console.log('   - El campo está vacío (correcto, no tiene employment history)');
    console.log('   - El template siempre muestra el título "EMPLOYMENT HISTORY"');
    console.log('   - Si no se ve, puede ser que la sección esté oculta o el contenedor esté vacío\n');
  } else {
    console.log('\n════════════════════════════════════════════════════════════════════════════════');
    console.log('📤 ACTUALIZANDO CMS');
    console.log('════════════════════════════════════════════════════════════════════════════════\n');
    
    try {
      await apiClient.updateCollectionItem(vaCollection.id, alyssa.id, updates);
      console.log('✅ Campos actualizados exitosamente\n');
      console.log('Campos actualizados:');
      Object.keys(updates).forEach(field => {
        console.log(`   - ${field}`);
      });
    } catch (error) {
      console.error(`❌ Error: ${error.message}\n`);
      if (error.response) {
        console.error('Detalles:', JSON.stringify(error.response, null, 2));
      }
    }
  }
  
  console.log();
}

main().catch(console.error);
