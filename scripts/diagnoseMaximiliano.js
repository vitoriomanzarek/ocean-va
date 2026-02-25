/**
 * Script para diagnosticar problemas con Maximiliano:
 * 1. Skills con doble fondo
 * 2. DISC Result no se muestra
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔍 Diagnosticando problemas de Maximiliano...\n');
  
  const apiClient = new WebflowApiClient(WEBFLOW_API_TOKEN);
  const site = await apiClient.getSite(SITE_ID);
  const collectionsResponse = await apiClient.getCollections(SITE_ID);
  const vaCollection = collectionsResponse.collections.find(c => c.slug === 'virtual-assistants');
  
  // Obtener schema para ver los campos disponibles
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
  
  const maximiliano = allVAs.find(v => {
    const name = (v.fieldData.name || '').toLowerCase();
    return name.includes('maximiliano');
  });
  
  if (!maximiliano) {
    console.error('❌ Maximiliano no encontrado en CMS');
    return;
  }
  
  console.log('✅ Maximiliano encontrado en CMS\n');
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 PROBLEMA 1: SKILLS CON DOBLE FONDO');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  // Buscar campos relacionados con skills
  const skillsFields = [
    'skills',
    'skills-tags',
    'skills-richtext',
    'skills-2',
    'skills-tags-2'
  ];
  
  console.log('🔍 Campos relacionados con Skills en el schema:');
  collectionSchema.fields
    .filter(f => f.slug && f.slug.toLowerCase().includes('skill'))
    .forEach(f => {
      console.log(`   - ${f.slug} (${f.type}) - Display: "${f.displayName}"`);
    });
  console.log();
  
  console.log('📊 Valores en los campos de skills de Maximiliano:');
  skillsFields.forEach(field => {
    const value = maximiliano.fieldData[field];
    if (value !== undefined && value !== null && value !== '') {
      console.log(`\n   Campo: ${field}`);
      console.log(`   Tipo: ${typeof value}`);
      console.log(`   Valor: ${JSON.stringify(value).substring(0, 200)}${JSON.stringify(value).length > 200 ? '...' : ''}`);
      
      // Si es HTML, buscar tags que puedan causar doble fondo
      if (typeof value === 'string' && value.includes('<')) {
        const divCount = (value.match(/<div/g) || []).length;
        const classCount = (value.match(/class=/g) || []).length;
        const skillsContainerCount = (value.match(/skills-container|va-skills/g) || []).length;
        
        console.log(`   📊 Análisis HTML:`);
        console.log(`      - Tags <div>: ${divCount}`);
        console.log(`      - Atributos class: ${classCount}`);
        console.log(`      - Referencias a "skills-container" o "va-skills": ${skillsContainerCount}`);
        
        // Buscar posibles contenedores anidados
        if (value.includes('va-skills-container') || value.includes('skills-container')) {
          console.log(`      ⚠️  Encontrado contenedor de skills en el HTML`);
        }
      }
    }
  });
  
  // Comparar con otro VA que funciona bien (por ejemplo, Drue)
  const drue = allVAs.find(v => {
    const name = (v.fieldData.name || '').toLowerCase();
    return name.includes('drue') || name.includes('drew');
  });
  
  if (drue) {
    console.log('\n📊 COMPARACIÓN con Drue (que funciona bien):');
    skillsFields.forEach(field => {
      const maxValue = maximiliano.fieldData[field];
      const drueValue = drue.fieldData[field];
      
      if (maxValue !== undefined || drueValue !== undefined) {
        console.log(`\n   Campo: ${field}`);
        console.log(`   Maximiliano: ${maxValue ? `Tiene valor (${typeof maxValue})` : 'Vacío'}`);
        console.log(`   Drue: ${drueValue ? `Tiene valor (${typeof drueValue})` : 'Vacío'}`);
        
        if (maxValue && drueValue && typeof maxValue === 'string' && typeof drueValue === 'string') {
          const maxHasContainer = maxValue.includes('va-skills-container') || maxValue.includes('skills-container');
          const drueHasContainer = drueValue.includes('va-skills-container') || drueValue.includes('skills-container');
          
          if (maxHasContainer && !drueHasContainer) {
            console.log(`   ⚠️  DIFERENCIA: Maximiliano tiene contenedor de skills en el HTML, Drue no`);
          } else if (!maxHasContainer && drueHasContainer) {
            console.log(`   ⚠️  DIFERENCIA: Drue tiene contenedor de skills en el HTML, Maximiliano no`);
          }
        }
      }
    });
  }
  
  console.log('\n════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 PROBLEMA 2: DISC RESULT NO SE MUESTRA');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  // Buscar campos relacionados con DISC
  const discFields = [
    'disc',
    'disc-type',
    'disc-type-2',
    'disc-result',
    'disc-result-2'
  ];
  
  console.log('🔍 Campos relacionados con DISC en el schema:');
  collectionSchema.fields
    .filter(f => f.slug && f.slug.toLowerCase().includes('disc'))
    .forEach(f => {
      console.log(`   - ${f.slug} (${f.type}) - Display: "${f.displayName}"`);
      if (f.type === 'Option') {
        console.log(`     Opciones disponibles:`);
        if (f.validations && f.validations.options) {
          f.validations.options.forEach((opt, idx) => {
            console.log(`       ${idx + 1}. ${opt.displayName || opt.name || opt.id} (ID: ${opt.id || 'N/A'})`);
          });
        } else if (f.validations && f.validations.optionIds) {
          console.log(`     (Opciones definidas por IDs: ${f.validations.optionIds.length} opciones)`);
        }
      }
    });
  console.log();
  
  console.log('📊 Valores en los campos de DISC de Maximiliano:');
  discFields.forEach(field => {
    const value = maximiliano.fieldData[field];
    if (value !== undefined && value !== null && value !== '') {
      console.log(`\n   Campo: ${field}`);
      console.log(`   Tipo: ${typeof value}`);
      console.log(`   Valor: ${JSON.stringify(value)}`);
      
      // Si es un Option field, puede devolver un ID
      if (typeof value === 'string' && /^[a-f0-9]{32}$/i.test(value.trim())) {
        console.log(`   ⚠️  Este parece ser un ID de opción (32 caracteres hexadecimales)`);
        console.log(`   💡 Los Option fields en Webflow devuelven IDs, no texto`);
        console.log(`   💡 El template necesita convertir el ID a texto usando JavaScript`);
      } else if (typeof value === 'object' && value !== null) {
        console.log(`   📦 Es un objeto: ${JSON.stringify(value)}`);
      }
    }
  });
  
  // Buscar el campo específico que se usa en el template
  const discType2Field = collectionSchema.fields.find(f => f.slug === 'disc-type-2');
  if (discType2Field) {
    console.log(`\n🔍 Campo "disc-type-2" (usado en template):`);
    console.log(`   Tipo: ${discType2Field.type}`);
    console.log(`   Display Name: ${discType2Field.displayName}`);
    
    if (discType2Field.type === 'Option') {
      console.log(`   Es un Option field ✅`);
      
      // Obtener opciones disponibles
      if (discType2Field.validations && discType2Field.validations.options) {
        console.log(`   Opciones disponibles:`);
        discType2Field.validations.options.forEach((opt, idx) => {
          const isSelected = maximiliano.fieldData['disc-type-2'] === opt.id || 
                            (typeof maximiliano.fieldData['disc-type-2'] === 'object' && 
                             maximiliano.fieldData['disc-type-2']?.id === opt.id);
          const marker = isSelected ? '✅ (SELECCIONADO)' : '  ';
          console.log(`     ${marker} ${idx + 1}. ${opt.displayName || opt.name || 'N/A'} (ID: ${opt.id})`);
        });
      }
    }
    
    const currentValue = maximiliano.fieldData['disc-type-2'];
    console.log(`\n   Valor actual en CMS: ${JSON.stringify(currentValue)}`);
    
    if (currentValue) {
      if (typeof currentValue === 'string' && /^[a-f0-9]{32}$/i.test(currentValue.trim())) {
        console.log(`   ⚠️  PROBLEMA IDENTIFICADO: El campo devuelve un ID, no el texto`);
        console.log(`   💡 El template necesita:`);
        console.log(`      1. Detectar que es un ID`);
        console.log(`      2. Buscar la opción correspondiente en el schema`);
        console.log(`      3. Mostrar el displayName de la opción`);
        console.log(`   💡 O usar un elemento Text en Webflow Designer conectado al campo`);
        console.log(`      y luego copiar el contenido con JavaScript (como se hace con otros campos)`);
      } else if (typeof currentValue === 'object' && currentValue !== null) {
        console.log(`   📦 Es un objeto: ${JSON.stringify(currentValue)}`);
        if (currentValue.displayName) {
          console.log(`   ✅ Tiene displayName: ${currentValue.displayName}`);
        }
      } else {
        console.log(`   ✅ Parece ser texto: "${currentValue}"`);
      }
    } else {
      console.log(`   ⚠️  El campo está vacío`);
    }
  }
  
  console.log('\n════════════════════════════════════════════════════════════════════════════════');
  console.log('💡 DIAGNÓSTICO Y RECOMENDACIONES');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  console.log('PROBLEMA 1 - Skills con doble fondo:');
  console.log('   Si el campo de skills contiene HTML con un contenedor <div class="va-skills-container">,');
  console.log('   y el template también agrega ese contenedor, resultará en doble fondo.');
  console.log('   Solución: El campo debe contener solo los tags individuales, no el contenedor.\n');
  
  console.log('PROBLEMA 2 - DISC Result no se muestra:');
  console.log('   Los Option fields en Webflow devuelven IDs, no texto.');
  console.log('   El template actual usa {{disc-type-2}} directamente, lo cual mostrará el ID.');
  console.log('   Solución: Usar el mismo patrón que otros campos (elemento Text oculto + JavaScript).\n');
  
  console.log();
}

main().catch(console.error);
