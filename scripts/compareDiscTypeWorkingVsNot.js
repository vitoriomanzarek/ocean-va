/**
 * Script para comparar VAs que muestran DISC Type vs los que no
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔍 Comparando VAs con DISC Type que funciona vs no funciona...\n');
  
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
  
  // Buscar VAs específicos
  const anaGabriela = allVAs.find(v => {
    const name = (v.fieldData.name || '').toLowerCase();
    return name.includes('ana gabriela');
  });
  
  // Buscar algunos VAs que probablemente funcionen (como Drue, que es referencia)
  const drue = allVAs.find(v => {
    const name = (v.fieldData.name || '').toLowerCase();
    return name.includes('drue') || name.includes('drew');
  });
  
  // Buscar otros VAs con DISC Type para comparar
  const vasWithDisc = allVAs.filter(v => {
    const discType = v.fieldData['disc-type-2'];
    return discType && discType.trim() !== '';
  });
  
  console.log(`✅ Encontrados ${vasWithDisc.length} VAs con DISC Type\n`);
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📊 COMPARACIÓN: Ana Gabriela (NO funciona)');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  if (anaGabriela) {
    const discType = anaGabriela.fieldData['disc-type-2'] || '';
    console.log(`Nombre: ${anaGabriela.fieldData.name}`);
    console.log(`disc-type-2: ${JSON.stringify(discType)}`);
    console.log(`Tipo: ${typeof discType}`);
    console.log(`Es ID (32 hex): ${/^[a-f0-9]{32}$/i.test(discType.trim()) ? '✅ SÍ' : '❌ NO'}`);
    
    if (discType) {
      const discField = collectionSchema.fields.find(f => f.slug === 'disc-type-2');
      if (discField && discField.validations && discField.validations.options) {
        const option = discField.validations.options.find(opt => opt.id === discType);
        if (option) {
          console.log(`Opción: "${option.displayName || option.name}"`);
          console.log(`ID de opción: ${option.id}`);
        }
      }
    }
  } else {
    console.log('❌ Ana Gabriela no encontrado');
  }
  
  console.log('\n════════════════════════════════════════════════════════════════════════════════');
  console.log('📊 COMPARACIÓN: Drue (probablemente funciona)');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  if (drue) {
    const discType = drue.fieldData['disc-type-2'] || '';
    console.log(`Nombre: ${drue.fieldData.name}`);
    console.log(`disc-type-2: ${JSON.stringify(discType)}`);
    console.log(`Tipo: ${typeof discType}`);
    console.log(`Es ID (32 hex): ${/^[a-f0-9]{32}$/i.test(discType.trim()) ? '✅ SÍ' : '❌ NO'}`);
    
    if (discType) {
      const discField = collectionSchema.fields.find(f => f.slug === 'disc-type-2');
      if (discField && discField.validations && discField.validations.options) {
        const option = discField.validations.options.find(opt => opt.id === discType);
        if (option) {
          console.log(`Opción: "${option.displayName || option.name}"`);
          console.log(`ID de opción: ${option.id}`);
        }
      }
    }
  } else {
    console.log('⚠️  Drue no encontrado');
  }
  
  console.log('\n════════════════════════════════════════════════════════════════════════════════');
  console.log('📊 ANÁLISIS DE TODOS LOS VAs CON DISC TYPE');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const discField = collectionSchema.fields.find(f => f.slug === 'disc-type-2');
  const optionMap = {};
  if (discField && discField.validations && discField.validations.options) {
    discField.validations.options.forEach(opt => {
      optionMap[opt.id] = opt.displayName || opt.name;
    });
  }
  
  const idCount = vasWithDisc.filter(v => {
    const discType = v.fieldData['disc-type-2'] || '';
    return /^[a-f0-9]{32}$/i.test(discType.trim());
  }).length;
  
  const textCount = vasWithDisc.filter(v => {
    const discType = v.fieldData['disc-type-2'] || '';
    return discType && !/^[a-f0-9]{32}$/i.test(discType.trim());
  }).length;
  
  console.log(`Total VAs con DISC Type: ${vasWithDisc.length}`);
  console.log(`VAs con ID (32 hex): ${idCount}`);
  console.log(`VAs con texto: ${textCount}`);
  console.log();
  
  // Agrupar por opción
  const byOption = {};
  vasWithDisc.forEach(va => {
    const discType = va.fieldData['disc-type-2'] || '';
    if (/^[a-f0-9]{32}$/i.test(discType.trim())) {
      const optionName = optionMap[discType] || 'Unknown';
      if (!byOption[optionName]) {
        byOption[optionName] = { ids: [], texts: [] };
      }
      byOption[optionName].ids.push(va.fieldData.name);
    } else if (discType) {
      if (!byOption[discType]) {
        byOption[discType] = { ids: [], texts: [] };
      }
      byOption[discType].texts.push(va.fieldData.name);
    }
  });
  
  console.log('Distribución por opción:');
  Object.keys(byOption).sort().forEach(option => {
    const data = byOption[option];
    console.log(`\n  ${option}:`);
    if (data.ids.length > 0) {
      console.log(`    Con ID: ${data.ids.length} VAs`);
      if (data.ids.length <= 5) {
        data.ids.forEach(name => console.log(`      - ${name}`));
      } else {
        data.ids.slice(0, 5).forEach(name => console.log(`      - ${name}`));
        console.log(`      ... y ${data.ids.length - 5} más`);
      }
    }
    if (data.texts.length > 0) {
      console.log(`    Con texto: ${data.texts.length} VAs`);
      if (data.texts.length <= 5) {
        data.texts.forEach(name => console.log(`      - ${name}`));
      } else {
        data.texts.slice(0, 5).forEach(name => console.log(`      - ${name}`));
        console.log(`      ... y ${data.texts.length - 5} más`);
      }
    }
  });
  
  console.log('\n════════════════════════════════════════════════════════════════════════════════');
  console.log('💡 CONCLUSIÓN');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  if (idCount === vasWithDisc.length) {
    console.log('⚠️  TODOS los VAs tienen IDs, no texto.');
    console.log('   Esto significa que Webflow siempre devuelve IDs para Option fields.');
    console.log('   El problema debe estar en cómo el template/JavaScript maneja estos IDs.\n');
    console.log('   Posibles causas:');
    console.log('   1. El JavaScript del template no está ejecutándose correctamente');
    console.log('   2. El elemento Text "va-disc-type-source" no está renderizando el texto');
    console.log('   3. Hay un problema de timing (el JavaScript se ejecuta antes de que Webflow');
    console.log('      renderice el contenido del elemento Text)');
    console.log('   4. Algunos VAs tienen el elemento Text conectado y otros no\n');
  } else if (textCount > 0) {
    console.log('✅ Algunos VAs tienen texto en lugar de ID.');
    console.log('   Esto sugiere que hay una diferencia en cómo se cargaron los datos.\n');
    console.log('   Posible solución:');
    console.log('   - Re-seleccionar la opción en el CMS para los VAs que tienen ID');
    console.log('   - Esto puede forzar a Webflow a renderizar el texto correctamente\n');
  }
}

main().catch(console.error);
