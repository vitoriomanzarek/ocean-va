/**
 * Script para diagnosticar problemas de visualización de Alyssa:
 * 1. DISC Result (title) está en CMS pero no sale en la página
 * 2. Tools y Equipment tags no se ven en CMS pero sí en la página
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import fs from 'fs';
import path from 'path';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔍 Diagnosticando problemas de visualización de Alyssa...\n');
  
  const apiClient = new WebflowApiClient(WEBFLOW_API_TOKEN);
  const site = await apiClient.getSite(SITE_ID);
  const collectionsResponse = await apiClient.getCollections(SITE_ID);
  const vaCollection = collectionsResponse.collections.find(c => c.slug === 'virtual-assistants');
  
  // Obtener schema
  const collectionSchema = await apiClient.getCollection(vaCollection.id);
  
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
  
  // Leer HTML minificado
  const htmlPath = path.join(process.cwd(), 'webflow-components-minified', '297-alyssa-profile.html');
  let htmlContent = '';
  try {
    htmlContent = fs.readFileSync(htmlPath, 'utf-8');
  } catch (e) {
    console.log('⚠️  No se pudo leer el HTML minificado\n');
  }
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 PROBLEMA 1: DISC RESULT (TITLE) NO SE MUESTRA');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const discType2 = alyssa.fieldData['disc-type-2'] || '';
  console.log(`Campo disc-type-2 en CMS: ${JSON.stringify(discType2)}`);
  
  if (discType2) {
    if (/^[a-f0-9]{32}$/i.test(discType2.trim())) {
      console.log(`   ⚠️  Es un ID: ${discType2}`);
      
      // Buscar la opción correspondiente
      const discField = collectionSchema.fields.find(f => f.slug === 'disc-type-2');
      if (discField && discField.validations && discField.validations.options) {
        const option = discField.validations.options.find(opt => opt.id === discType2);
        if (option) {
          console.log(`   ✅ Opción encontrada: "${option.displayName || option.name}"`);
        } else {
          console.log(`   ❌ No se encontró la opción con ese ID`);
        }
      }
    } else {
      console.log(`   ✅ Es texto: "${discType2}"`);
    }
  } else {
    console.log(`   ❌ Campo vacío`);
  }
  
  // Verificar en HTML minificado
  if (htmlContent) {
    const discMatch = htmlContent.match(/<div class="va-disc-badge">(.*?)<\/div>/);
    if (discMatch) {
      console.log(`\n   En HTML minificado: "${discMatch[1]}"`);
    } else {
      console.log(`\n   ⚠️  No se encontró va-disc-badge en HTML minificado`);
    }
  }
  
  console.log('\n════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 PROBLEMA 2: TOOLS Y EQUIPMENT TAGS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  // Buscar campos de tools y equipment
  const toolsFields = [
    'tools',
    'tools-tags',
    'tools-richtext',
    'tools-2'
  ];
  
  const equipmentFields = [
    'equipment',
    'equipment-tags',
    'equipment-richtext',
    'equipment-2'
  ];
  
  console.log('🔍 Campos relacionados con Tools en el schema:');
  collectionSchema.fields
    .filter(f => f.slug && f.slug.toLowerCase().includes('tool'))
    .forEach(f => {
      const value = alyssa.fieldData[f.slug];
      console.log(`   - ${f.slug} (${f.type}) - Display: "${f.displayName}"`);
      if (value !== undefined && value !== null && value !== '') {
        const preview = typeof value === 'string' && value.length > 100 
          ? value.substring(0, 100) + '...' 
          : value;
        console.log(`     Valor: ${preview}`);
      } else {
        console.log(`     Valor: (vacío)`);
      }
    });
  console.log();
  
  console.log('🔍 Campos relacionados con Equipment en el schema:');
  collectionSchema.fields
    .filter(f => f.slug && f.slug.toLowerCase().includes('equipment'))
    .forEach(f => {
      const value = alyssa.fieldData[f.slug];
      console.log(`   - ${f.slug} (${f.type}) - Display: "${f.displayName}"`);
      if (value !== undefined && value !== null && value !== '') {
        const preview = typeof value === 'string' && value.length > 100 
          ? value.substring(0, 100) + '...' 
          : value;
        console.log(`     Valor: ${preview}`);
      } else {
        console.log(`     Valor: (vacío)`);
      }
    });
  console.log();
  
  // Extraer tools y equipment del HTML minificado
  if (htmlContent) {
    console.log('📊 TOOLS en HTML minificado:');
    const toolsMatch = htmlContent.match(/<h3 class="va-column-header">TOOLS<\/h3>[\s\S]*?<div class="va-tools-list[^"]*">([\s\S]*?)<\/div>/);
    if (toolsMatch) {
      const toolsHTML = toolsMatch[1];
      const toolItems = toolsHTML.match(/<span[^>]*>([^<]+)<\/span>/g) || [];
      const tools = toolItems.map(item => {
        const match = item.match(/<span[^>]*>([^<]+)<\/span>/);
        return match ? match[1].trim() : '';
      }).filter(t => t);
      
      console.log(`   Encontrados ${tools.length} tools:`);
      tools.forEach((tool, idx) => {
        console.log(`     ${idx + 1}. ${tool}`);
      });
    } else {
      console.log(`   ⚠️  No se encontraron tools en HTML`);
    }
    console.log();
    
    console.log('📊 EQUIPMENT en HTML minificado:');
    const equipmentMatch = htmlContent.match(/<h3 class="va-column-header">EQUIPMENT<\/h3>[\s\S]*?<div class="va-equipment-list">([\s\S]*?)<\/div>/);
    if (equipmentMatch) {
      const equipmentHTML = equipmentMatch[1];
      const equipmentItems = equipmentHTML.match(/<span[^>]*>([^<]+)<\/span>/g) || [];
      const equipment = equipmentItems.map(item => {
        const match = item.match(/<span[^>]*>([^<]+)<\/span>/);
        return match ? match[1].trim() : '';
      }).filter(e => e);
      
      console.log(`   Encontrados ${equipment.length} equipment:`);
      equipment.forEach((eq, idx) => {
        console.log(`     ${idx + 1}. ${eq}`);
      });
    } else {
      console.log(`   ⚠️  No se encontró equipment en HTML`);
    }
    console.log();
  }
  
  // Verificar qué campos usa el template
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('💡 DIAGNÓSTICO');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  console.log('PROBLEMA 1 - DISC Result:');
  console.log('   El template usa un elemento Text oculto "va-disc-type-source" conectado al campo');
  console.log('   "disc-type-2" (Option field). Si el campo devuelve un ID en lugar de texto,');
  console.log('   el JavaScript intenta usar textContent como fallback.');
  console.log('   💡 Verificar en el navegador (DevTools) si el elemento "va-disc-type-source"');
  console.log('      tiene contenido y si el JavaScript está copiándolo correctamente.\n');
  
  console.log('PROBLEMA 2 - Tools y Equipment:');
  console.log('   Si los tools/equipment aparecen en la página pero no en el CMS, puede ser que:');
  console.log('   1. Estén hardcodeados en el template (no dinámicos)');
  console.log('   2. Vengan de otro campo que no estamos revisando');
  console.log('   3. El template esté usando datos del HTML minificado en lugar del CMS');
  console.log('   💡 Verificar en el template cómo se renderizan tools y equipment\n');
  
  console.log();
}

main().catch(console.error);
