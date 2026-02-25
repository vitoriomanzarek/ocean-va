/**
 * Script para diagnosticar el problema del DISC Result de Ana Gabriela
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔍 Diagnosticando DISC Result de Ana Gabriela...\n');
  
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
  
  // Buscar Ana Gabriela (puede estar como "Ana Gabriela" o solo "Ana")
  const anaGabriela = allVAs.find(v => {
    const name = (v.fieldData.name || '').toLowerCase();
    return name.includes('ana gabriela') || (name.includes('ana') && name.includes('gabriela'));
  });
  
  if (!anaGabriela) {
    console.error('❌ Ana Gabriela no encontrado en CMS');
    console.log('\nBuscando todas las VAs con "Ana" en el nombre:');
    allVAs.filter(v => {
      const name = (v.fieldData.name || '').toLowerCase();
      return name.includes('ana');
    }).forEach(v => {
      console.log(`   - ${v.fieldData.name}`);
    });
    return;
  }
  
  console.log(`✅ Ana Gabriela encontrado en CMS (nombre: "${anaGabriela.fieldData.name}")\n`);
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 DISC RESULT - DIAGNÓSTICO');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const discType2 = anaGabriela.fieldData['disc-type-2'] || '';
  console.log(`Campo disc-type-2 en CMS:`);
  console.log(`   Valor: ${JSON.stringify(discType2)}`);
  
  if (discType2) {
    if (/^[a-f0-9]{32}$/i.test(discType2.trim())) {
      console.log(`   ⚠️  Es un ID (32 caracteres hexadecimales)`);
      
      // Buscar la opción correspondiente
      const discField = collectionSchema.fields.find(f => f.slug === 'disc-type-2');
      if (discField && discField.validations && discField.validations.options) {
        const option = discField.validations.options.find(opt => opt.id === discType2);
        if (option) {
          console.log(`   ✅ Opción encontrada: "${option.displayName || option.name}"`);
          console.log(`   ID de la opción: ${option.id}`);
        } else {
          console.log(`   ❌ No se encontró la opción con ese ID`);
          console.log(`   Opciones disponibles:`);
          discField.validations.options.forEach((opt, idx) => {
            console.log(`     ${idx + 1}. ${opt.displayName || opt.name} (ID: ${opt.id})`);
          });
        }
      }
    } else {
      console.log(`   ✅ Es texto: "${discType2}"`);
      console.log(`   Esto debería funcionar correctamente en el template.`);
    }
  } else {
    console.log(`   ❌ Campo vacío`);
  }
  
  console.log('\n════════════════════════════════════════════════════════════════════════════════');
  console.log('💡 DIAGNÓSTICO DEL PROBLEMA');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  if (discType2 && /^[a-f0-9]{32}$/i.test(discType2.trim())) {
    console.log('PROBLEMA IDENTIFICADO:');
    console.log('   El campo disc-type-2 es un Option field que devuelve un ID en lugar de texto.');
    console.log('   El template intenta manejar esto usando JavaScript, pero necesita que el');
    console.log('   elemento Text en Webflow Designer esté correctamente conectado.\n');
    
    console.log('SOLUCIÓN:');
    console.log('   1. Ve a Webflow Designer');
    console.log('   2. Busca el elemento Text con ID "va-disc-type-source"');
    console.log('   3. Re-conéctalo al campo "DISC Type 2" (aunque ya esté conectado)');
    console.log('   4. Publica el sitio');
    console.log('   5. Limpia la caché del navegador y recarga la página\n');
    
    console.log('ALTERNATIVA:');
    console.log('   Si re-conectar no funciona, intenta:');
    console.log('   1. Re-seleccionar la opción en el CMS de Ana Gabriela');
    console.log('   2. Guardar el item');
    console.log('   3. Publicar el sitio');
    console.log('   4. Limpiar caché y recargar\n');
  } else if (!discType2) {
    console.log('PROBLEMA: El campo disc-type-2 está vacío.');
    console.log('   Necesitas seleccionar un valor en el CMS.\n');
  } else {
    console.log('El campo tiene texto, debería funcionar.');
    console.log('   Si no se muestra, verifica en el navegador (DevTools) si el elemento');
    console.log('   "va-disc-type-source" existe y tiene contenido.\n');
  }
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('🔍 VERIFICACIÓN ADICIONAL');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  // Verificar otros campos relacionados con DISC
  const discDescription = anaGabriela.fieldData['disc-description'] || '';
  console.log(`Campo disc-description: ${discDescription ? '✅ Tiene datos' : '❌ Vacío'}`);
  if (discDescription) {
    console.log(`   Longitud: ${discDescription.length} caracteres`);
    console.log(`   Preview: ${discDescription.substring(0, 100)}...`);
  }
  console.log();
}

main().catch(console.error);
