/**
 * Script para diagnosticar campos faltantes de Balbina
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔍 Diagnosticando campos faltantes de Balbina...\n');
  
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
  console.log('📋 DIAGNÓSTICO DE CAMPOS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  // Campos a verificar
  const fieldsToCheck = [
    { key: 'name', label: 'Name' },
    { key: 'skills-richtext', label: 'Skills (Rich Text)' },
    { key: 'tools-richtext', label: 'Tools (Rich Text)' },
    { key: 'equipment-richtext', label: 'Equipment (Rich Text)' },
    { key: 'thumbnail-description-2', label: 'Thumbnail Description' },
    { key: 'employment-summary', label: 'Employment Summary' },
    { key: 'employment-richtext', label: 'Employment History (Rich Text)' },
    { key: 'disc-type-2', label: 'DISC Type (Option)' },
    { key: 'disc-description-2', label: 'DISC Description' },
    { key: 'english-score-3', label: 'English Score' },
    { key: 'type-of-english-test', label: 'Type of English Test' },
    { key: 'english-description', label: 'English Description' },
    { key: 'cerf-result', label: 'CEFR Result' }
  ];
  
  const results = {
    missing: [],
    empty: [],
    hasData: [],
    issues: []
  };
  
  for (const field of fieldsToCheck) {
    const value = balbina.fieldData[field.key];
    const isEmpty = !value || value === '' || (Array.isArray(value) && value.length === 0);
    
    if (isEmpty) {
      results.empty.push(field);
      console.log(`❌ ${field.label} (${field.key}): VACÍO`);
    } else {
      results.hasData.push(field);
      if (field.key === 'disc-type-2') {
        // Verificar si es un ID en lugar de texto
        const isId = /^[a-f0-9]{32}$/i.test(String(value).trim());
        if (isId) {
          results.issues.push({ field: field.label, issue: 'Contiene un ID en lugar de texto', value });
          console.log(`⚠️  ${field.label} (${field.key}): Tiene valor pero es un ID: ${value}`);
        } else {
          console.log(`✅ ${field.label} (${field.key}): ${String(value).substring(0, 50)}...`);
        }
      } else if (field.key.includes('richtext')) {
        const htmlLength = String(value).length;
        console.log(`✅ ${field.label} (${field.key}): Tiene HTML (${htmlLength} caracteres)`);
      } else {
        console.log(`✅ ${field.label} (${field.key}): ${String(value).substring(0, 50)}...`);
      }
    }
  }
  
  console.log('\n');
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📊 RESUMEN DEL DIAGNÓSTICO');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  console.log(`✅ Campos con datos: ${results.hasData.length}`);
  console.log(`❌ Campos vacíos: ${results.empty.length}`);
  if (results.issues.length > 0) {
    console.log(`⚠️  Campos con problemas: ${results.issues.length}`);
  }
  
  console.log('\n');
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('🔍 CAMPOS FALTANTES (según lo que ves en el front)');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const frontendIssues = [
    { field: 'skills-richtext', label: 'Skill Tags', reason: 'No se ven en el front' },
    { field: 'thumbnail-description-2', label: 'Thumbnail Description', reason: 'No se ve en el front' },
    { field: 'employment-summary', label: 'Employment Summary', reason: 'No se ve en el front' },
    { field: 'disc-type-2', label: 'DISC Result (título)', reason: 'No se ve en el front' },
    { field: 'english-score-3', label: 'English Results (título)', reason: 'No se ve en el front' },
    { field: 'cerf-result', label: 'CEFR Table', reason: 'No se ve en el front' }
  ];
  
  for (const issue of frontendIssues) {
    const fieldData = balbina.fieldData[issue.field];
    const isEmpty = !fieldData || fieldData === '' || (Array.isArray(fieldData) && fieldData.length === 0);
    
    if (isEmpty) {
      console.log(`❌ ${issue.label} (${issue.field}): VACÍO EN CMS - ${issue.reason}`);
    } else {
      // Verificar si es un ID para Option fields
      if (issue.field === 'disc-type-2') {
        const isId = /^[a-f0-9]{32}$/i.test(String(fieldData).trim());
        if (isId) {
          console.log(`⚠️  ${issue.label} (${issue.field}): Tiene ID en CMS pero no se muestra - ${issue.reason}`);
          console.log(`   ID encontrado: ${fieldData}`);
          console.log(`   💡 Problema: El campo Option está devolviendo un ID en lugar de texto.`);
          console.log(`   💡 Solución: Verificar conexión del elemento "va-disc-type-source" en Webflow Designer.`);
        } else {
          console.log(`✅ ${issue.label} (${issue.field}): Tiene valor en CMS: ${String(fieldData).substring(0, 30)}...`);
          console.log(`   ⚠️  Pero no se muestra en el front - posible problema de template/conexión.`);
        }
      } else {
        console.log(`✅ ${issue.label} (${issue.field}): Tiene valor en CMS`);
        console.log(`   ⚠️  Pero no se muestra en el front - posible problema de template/conexión.`);
        if (issue.field.includes('richtext')) {
          console.log(`   HTML length: ${String(fieldData).length} caracteres`);
        }
      }
    }
  }
  
  console.log('\n');
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('💡 RECOMENDACIONES');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const emptyFields = results.empty.map(f => f.label);
  if (emptyFields.length > 0) {
    console.log('1. Campos que necesitan ser cargados en CMS:');
    emptyFields.forEach(f => console.log(`   - ${f}`));
    console.log('\n2. Buscar información de Balbina en:');
    console.log('   - Componente HTML minificado original');
    console.log('   - CSV de datos');
    console.log('   - Página antigua del perfil');
  }
  
  if (results.issues.length > 0) {
    console.log('\n3. Problemas detectados:');
    results.issues.forEach(i => {
      console.log(`   - ${i.field}: ${i.issue}`);
    });
  }
  
  console.log('\n');
  
  // Mostrar algunos valores para referencia
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📄 VALORES ACTUALES (para referencia)');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  console.log(`Name: ${balbina.fieldData.name || '(vacío)'}`);
  console.log(`Slug: ${balbina.fieldData.slug || '(vacío)'}`);
  console.log(`Title: ${balbina.fieldData['title-2'] || '(vacío)'}`);
  console.log(`Tagline: ${balbina.fieldData.tagline || '(vacío)'}`);
  
  if (balbina.fieldData['skills-richtext']) {
    const skillsHTML = String(balbina.fieldData['skills-richtext']);
    console.log(`\nSkills HTML (primeros 200 chars):`);
    console.log(skillsHTML.substring(0, 200) + '...');
  }
  
  if (balbina.fieldData['employment-richtext']) {
    const empHTML = String(balbina.fieldData['employment-richtext']);
    console.log(`\nEmployment History HTML (primeros 200 chars):`);
    console.log(empHTML.substring(0, 200) + '...');
  }
  
  console.log('\n');
}

main().catch(console.error);
