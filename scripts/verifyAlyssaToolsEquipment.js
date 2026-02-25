/**
 * Script para verificar y comparar Tools y Equipment de Alyssa
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import fs from 'fs';
import path from 'path';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔍 Verificando Tools y Equipment de Alyssa...\n');
  
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
  
  console.log('✅ Alyssa encontrado\n');
  
  // Leer HTML minificado
  const htmlPath = path.join(process.cwd(), 'webflow-components-minified', '297-alyssa-profile.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📊 TOOLS - COMPARACIÓN');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  // Tools en CMS
  const toolsRichtext = alyssa.fieldData['tools-richtext'] || '';
  console.log('EN CMS (tools-richtext):');
  if (toolsRichtext) {
    console.log(`   Longitud: ${toolsRichtext.length} caracteres`);
    console.log(`   Contenido (primeros 500 chars):`);
    console.log(`   ${toolsRichtext.substring(0, 500)}...`);
    
    // Extraer tools del HTML del CMS
    const toolMatches = toolsRichtext.match(/<span[^>]*>([^<]+)<\/span>/g) || [];
    const toolsFromCMS = toolMatches
      .map(match => {
        const m = match.match(/<span[^>]*>([^<]+)<\/span>/);
        return m ? m[1].trim() : '';
      })
      .filter(t => t && t !== '✓');
    
    console.log(`\n   Tools extraídos del CMS: ${toolsFromCMS.length}`);
    toolsFromCMS.forEach((tool, idx) => {
      console.log(`     ${idx + 1}. ${tool}`);
    });
  } else {
    console.log('   ❌ Campo vacío');
  }
  console.log();
  
  // Tools en HTML minificado
  const toolsSection = htmlContent.match(/<h3 class="va-column-header">TOOLS<\/h3>[\s\S]*?<div class="va-tools-list[^"]*">([\s\S]*?)<\/div>/);
  if (toolsSection) {
    const toolsHTML = toolsSection[1];
    const toolItems = toolsHTML.match(/<div class="va-tool-item">[\s\S]*?<span>([^<]+)<\/span>/g) || [];
    const toolsFromHTML = toolItems.map(item => {
      const match = item.match(/<span>([^<]+)<\/span>/);
      return match ? match[1].trim() : '';
    }).filter(t => t);
    
    console.log('EN HTML MINIFICADO:');
    console.log(`   Tools encontrados: ${toolsFromHTML.length}`);
    toolsFromHTML.forEach((tool, idx) => {
      console.log(`     ${idx + 1}. ${tool}`);
    });
  }
  console.log();
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📊 EQUIPMENT - COMPARACIÓN');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  // Equipment en CMS
  const equipmentRichtext = alyssa.fieldData['equipment-richtext'] || '';
  console.log('EN CMS (equipment-richtext):');
  if (equipmentRichtext) {
    console.log(`   Longitud: ${equipmentRichtext.length} caracteres`);
    console.log(`   Contenido (primeros 500 chars):`);
    console.log(`   ${equipmentRichtext.substring(0, 500)}...`);
    
    // Extraer equipment del HTML del CMS
    const equipmentMatches = equipmentRichtext.match(/<span[^>]*>([^<]+)<\/span>/g) || [];
    const equipmentFromCMS = equipmentMatches
      .map(match => {
        const m = match.match(/<span[^>]*>([^<]+)<\/span>/);
        return m ? m[1].trim() : '';
      })
      .filter(e => e);
    
    console.log(`\n   Equipment extraído del CMS: ${equipmentFromCMS.length}`);
    equipmentFromCMS.forEach((eq, idx) => {
      console.log(`     ${idx + 1}. ${eq}`);
    });
  } else {
    console.log('   ❌ Campo vacío');
  }
  console.log();
  
  // Equipment en HTML minificado
  const equipmentSection = htmlContent.match(/<h3 class="va-column-header">EQUIPMENT<\/h3>[\s\S]*?<div class="va-equipment-list">([\s\S]*?)<\/div>/);
  if (equipmentSection) {
    const equipmentHTML = equipmentSection[1];
    const equipmentItems = equipmentHTML.match(/<span[^>]*>([^<]+)<\/span>/g) || [];
    const equipmentFromHTML = equipmentItems.map(item => {
      const match = item.match(/<span[^>]*>([^<]+)<\/span>/);
      return match ? match[1].trim() : '';
    }).filter(e => e);
    
    console.log('EN HTML MINIFICADO:');
    console.log(`   Equipment encontrado: ${equipmentFromHTML.length}`);
    equipmentFromHTML.forEach((eq, idx) => {
      console.log(`     ${idx + 1}. ${eq}`);
    });
  }
  console.log();
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('💡 CONCLUSIÓN');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  console.log('Si los tools/equipment aparecen en la página pero "no se ven en el CMS":');
  console.log('   - Los campos tools-richtext y equipment-richtext SÍ tienen datos');
  console.log('   - Pero en la interfaz del CMS de Webflow, los campos Rich Text pueden ser');
  console.log('     difíciles de leer porque muestran HTML crudo');
  console.log('   - El template los renderiza correctamente usando JavaScript\n');
  
  console.log('Para verificar en el CMS:');
  console.log('   1. Abre el item de Alyssa en Webflow CMS');
  console.log('   2. Busca los campos "Tools Richtext" y "Equipment Richtext"');
  console.log('   3. Deberías ver HTML como: <div class="va-tools-list">...</div>');
  console.log('   4. Si ves HTML, los datos están ahí, solo que no es fácil de leer\n');
}

main().catch(console.error);
