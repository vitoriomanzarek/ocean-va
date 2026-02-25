/**
 * Script para diagnosticar problemas con Alyssa:
 * 1. Employment History no se ve
 * 2. Employment Summary no se ve
 * 3. DISC Type no se ve
 * 4. English Result (Título) no se ve
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔍 Diagnosticando problemas de Alyssa...\n');
  
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
  console.log('📋 PROBLEMA 1: EMPLOYMENT HISTORY NO SE VE');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  // Buscar campos relacionados con employment
  const employmentFields = [
    'employment',
    'employment-history',
    'employment-history-richtext',
    'employment-richtext',
    'employment-history-2'
  ];
  
  console.log('🔍 Campos relacionados con Employment en el schema:');
  collectionSchema.fields
    .filter(f => f.slug && f.slug.toLowerCase().includes('employment'))
    .forEach(f => {
      console.log(`   - ${f.slug} (${f.type}) - Display: "${f.displayName}"`);
    });
  console.log();
  
  console.log('📊 Valores en los campos de Employment de Alyssa:');
  employmentFields.forEach(field => {
    const value = alyssa.fieldData[field];
    if (value !== undefined && value !== null && value !== '') {
      console.log(`\n   Campo: ${field}`);
      console.log(`   Tipo: ${typeof value}`);
      if (typeof value === 'string') {
        const preview = value.length > 200 ? value.substring(0, 200) + '...' : value;
        console.log(`   Valor: ${preview}`);
        console.log(`   Longitud: ${value.length} caracteres`);
        if (value.includes('<')) {
          const divCount = (value.match(/<div/g) || []).length;
          const hasEmploymentClass = value.includes('va-employment');
          console.log(`   📊 Análisis HTML:`);
          console.log(`      - Tags <div>: ${divCount}`);
          console.log(`      - Tiene clase "va-employment": ${hasEmploymentClass ? '✅' : '❌'}`);
        }
      } else {
        console.log(`   Valor: ${JSON.stringify(value)}`);
      }
    } else {
      console.log(`\n   Campo: ${field} - ❌ VACÍO`);
    }
  });
  
  console.log('\n════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 PROBLEMA 2: EMPLOYMENT SUMMARY NO SE VE');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const employmentSummaryFields = [
    'employment-summary',
    'employment-summary-2',
    'employment-summary-richtext'
  ];
  
  console.log('🔍 Campos relacionados con Employment Summary en el schema:');
  collectionSchema.fields
    .filter(f => f.slug && f.slug.toLowerCase().includes('summary') && f.slug.toLowerCase().includes('employment'))
    .forEach(f => {
      console.log(`   - ${f.slug} (${f.type}) - Display: "${f.displayName}"`);
    });
  console.log();
  
  console.log('📊 Valores en los campos de Employment Summary de Alyssa:');
  employmentSummaryFields.forEach(field => {
    const value = alyssa.fieldData[field];
    if (value !== undefined && value !== null && value !== '') {
      console.log(`\n   Campo: ${field}`);
      console.log(`   Tipo: ${typeof value}`);
      if (typeof value === 'string') {
        const preview = value.length > 200 ? value.substring(0, 200) + '...' : value;
        console.log(`   Valor: ${preview}`);
        console.log(`   Longitud: ${value.length} caracteres`);
      } else {
        console.log(`   Valor: ${JSON.stringify(value)}`);
      }
    } else {
      console.log(`\n   Campo: ${field} - ❌ VACÍO`);
    }
  });
  
  console.log('\n════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 PROBLEMA 3: DISC TYPE NO SE VE');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
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
        console.log(`     Es Option field ✅`);
      }
    });
  console.log();
  
  console.log('📊 Valores en los campos de DISC de Alyssa:');
  discFields.forEach(field => {
    const value = alyssa.fieldData[field];
    if (value !== undefined && value !== null && value !== '') {
      console.log(`\n   Campo: ${field}`);
      console.log(`   Tipo: ${typeof value}`);
      console.log(`   Valor: ${JSON.stringify(value)}`);
      
      if (typeof value === 'string' && /^[a-f0-9]{32}$/i.test(value.trim())) {
        console.log(`   ⚠️  Es un ID de opción (32 caracteres hexadecimales)`);
      }
    } else {
      console.log(`\n   Campo: ${field} - ❌ VACÍO`);
    }
  });
  
  // Verificar opciones disponibles para disc-type-2
  const discType2Field = collectionSchema.fields.find(f => f.slug === 'disc-type-2');
  if (discType2Field && discType2Field.type === 'Option') {
    const currentValue = alyssa.fieldData['disc-type-2'];
    if (currentValue) {
      console.log(`\n   Valor actual de disc-type-2: ${JSON.stringify(currentValue)}`);
      if (discType2Field.validations && discType2Field.validations.options) {
        const selectedOption = discType2Field.validations.options.find(
          opt => opt.id === currentValue || (typeof currentValue === 'object' && currentValue?.id === opt.id)
        );
        if (selectedOption) {
          console.log(`   ✅ Opción seleccionada: "${selectedOption.displayName || selectedOption.name}" (ID: ${selectedOption.id})`);
        } else {
          console.log(`   ⚠️  No se encontró la opción correspondiente al ID`);
        }
      }
    }
  }
  
  console.log('\n════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 PROBLEMA 4: ENGLISH RESULT (TÍTULO) NO SE VE');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const englishFields = [
    'type-of-english-test',
    'english-test',
    'english-test-type',
    'english-result',
    'english-title'
  ];
  
  console.log('🔍 Campos relacionados con English Test/Result en el schema:');
  collectionSchema.fields
    .filter(f => {
      const slug = f.slug.toLowerCase();
      return slug.includes('english') || slug.includes('test') || slug.includes('cefr');
    })
    .forEach(f => {
      console.log(`   - ${f.slug} (${f.type}) - Display: "${f.displayName}"`);
    });
  console.log();
  
  console.log('📊 Valores en los campos de English de Alyssa:');
  englishFields.forEach(field => {
    const value = alyssa.fieldData[field];
    if (value !== undefined && value !== null && value !== '') {
      console.log(`\n   Campo: ${field}`);
      console.log(`   Tipo: ${typeof value}`);
      if (typeof value === 'string') {
        console.log(`   Valor: "${value}"`);
        console.log(`   Longitud: ${value.length} caracteres`);
      } else {
        console.log(`   Valor: ${JSON.stringify(value)}`);
      }
    } else {
      console.log(`\n   Campo: ${field} - ❌ VACÍO`);
    }
  });
  
  // Verificar el campo específico que usa el template
  const typeOfEnglishTest = alyssa.fieldData['type-of-english-test'];
  console.log(`\n   Campo usado en template (type-of-english-test):`);
  console.log(`   Valor: ${typeOfEnglishTest || '(vacío)'}`);
  if (!typeOfEnglishTest || typeOfEnglishTest.trim() === '') {
    console.log(`   ⚠️  Este campo está vacío, por eso no se muestra el título`);
  }
  
  console.log('\n════════════════════════════════════════════════════════════════════════════════');
  console.log('💡 DIAGNÓSTICO Y RECOMENDACIONES');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  console.log('RESUMEN DE PROBLEMAS ENCONTRADOS:\n');
  
  // Resumen de Employment History
  const hasEmploymentHistory = employmentFields.some(f => {
    const val = alyssa.fieldData[f];
    return val !== undefined && val !== null && val !== '' && val.trim() !== '';
  });
  console.log(`1. Employment History: ${hasEmploymentHistory ? '✅ Tiene datos' : '❌ VACÍO'}`);
  
  // Resumen de Employment Summary
  const hasEmploymentSummary = employmentSummaryFields.some(f => {
    const val = alyssa.fieldData[f];
    return val !== undefined && val !== null && val !== '' && val.trim() !== '';
  });
  console.log(`2. Employment Summary: ${hasEmploymentSummary ? '✅ Tiene datos' : '❌ VACÍO'}`);
  
  // Resumen de DISC Type
  const hasDiscType = discFields.some(f => {
    const val = alyssa.fieldData[f];
    return val !== undefined && val !== null && val !== '' && val.trim() !== '';
  });
  console.log(`3. DISC Type: ${hasDiscType ? '✅ Tiene datos' : '❌ VACÍO'}`);
  
  // Resumen de English Result Title
  const hasEnglishTitle = typeOfEnglishTest && typeOfEnglishTest.trim() !== '';
  console.log(`4. English Result (Título): ${hasEnglishTitle ? '✅ Tiene datos' : '❌ VACÍO'}`);
  
  console.log('\n════════════════════════════════════════════════════════════════════════════════\n');
}

main().catch(console.error);
