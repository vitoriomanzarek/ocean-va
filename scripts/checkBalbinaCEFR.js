/**
 * Script para verificar el CEFR Result de Balbina
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔍 Verificando CEFR Result de Balbina...\n');
  
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
  console.log('📋 VALOR DE CEFR RESULT');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const cerfResult = balbina.fieldData['cerf-result'] || '';
  console.log(`CEFR Result: "${cerfResult}"`);
  console.log(`Tipo: ${typeof cerfResult}`);
  console.log(`Longitud: ${String(cerfResult).length}`);
  console.log('\n');
  
  // Verificar todos los campos relacionados con CEFR
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 CAMPOS RELACIONADOS CON CEFR');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const cerfFields = Object.keys(balbina.fieldData).filter(k => 
    k.toLowerCase().includes('cerf') || k.toLowerCase().includes('cefr')
  );
  
  if (cerfFields.length > 0) {
    cerfFields.forEach(field => {
      console.log(`${field}: "${balbina.fieldData[field]}"`);
    });
  } else {
    console.log('No se encontraron campos con "cerf" o "cefr" en el nombre');
  }
  
  console.log('\n');
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('💡 POSIBLES PROBLEMAS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  if (!cerfResult || cerfResult.trim() === '') {
    console.log('❌ El campo cerf-result está vacío');
  } else {
    console.log('✅ El campo cerf-result tiene valor');
    
    // Verificar si el valor es válido (debe ser A1, A2, B1, B2, C1, o C2)
    const validValues = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const isValid = validValues.includes(cerfResult.toUpperCase());
    
    if (!isValid) {
      console.log(`⚠️  El valor "${cerfResult}" no es un nivel CEFR estándar`);
      console.log('   Valores válidos: A1, A2, B1, B2, C1, C2');
    } else {
      console.log(`✅ El valor "${cerfResult}" es un nivel CEFR válido`);
    }
  }
  
  console.log('\n');
  console.log('💡 Verificar en el template:');
  console.log('   1. Que el elemento con ID "va-cefr-source" esté conectado al campo "cerf-result"');
  console.log('   2. Que el JavaScript esté copiando el contenido correctamente');
  console.log('   3. Que el valor coincida con uno de los niveles en el template (A1, A2, B1, B2, C1, C2)');
  
  console.log('\n');
}

main().catch(console.error);
