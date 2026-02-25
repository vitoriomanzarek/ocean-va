/**
 * Script para recargar Employment History de Jill, corregir Education y formatear Certifications
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔧 Recargando Employment History, corrigiendo Education y formateando Certifications de Jill...\n');
  
  // Leer el HTML minificado
  const htmlPath = path.join(__dirname, '..', 'webflow-components-minified', '218-jill-profile.html');
  console.log(`📄 Leyendo HTML desde: ${htmlPath}\n`);
  
  if (!fs.existsSync(htmlPath)) {
    console.error(`❌ Archivo no encontrado: ${htmlPath}`);
    return;
  }
  
  const html = fs.readFileSync(htmlPath, 'utf-8');
  
  // Extraer el employment list completo
  const employmentListMatch = html.match(/<div class="va-employment-list">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/);
  
  if (!employmentListMatch) {
    console.error('❌ No se encontró el employment list en el HTML');
    return;
  }
  
  const employmentListHTML = `<div class="va-employment-list">${employmentListMatch[1]}</div>`;
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 EMPLOYMENT LIST EXTRAÍDO');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log(employmentListHTML.substring(0, 500) + '...\n');
  
  // Extraer la sección de educación
  const educationSectionMatch = html.match(/<section class="va-education-section">([\s\S]*?)<\/section>/);
  
  if (!educationSectionMatch) {
    console.error('❌ No se encontró la sección de educación en el HTML');
    return;
  }
  
  const educationSectionHTML = educationSectionMatch[1];
  
  // Extraer la primera entrada de educación (AMA Computer Learning Center)
  const firstEducationMatch = educationSectionHTML.match(/<div class="va-education-item">([\s\S]*?)<\/div>/);
  
  if (!firstEducationMatch) {
    console.error('❌ No se encontró la primera entrada de educación');
    return;
  }
  
  // Corregir el año en la primera entrada de educación
  // Reemplazar el estilo inline por la clase correcta
  let firstEducationHTML = firstEducationMatch[1];
  firstEducationHTML = firstEducationHTML.replace(
    /<p class="va-education-degree" style="font-size: 12px; margin-top: 4px;">2012 - 2015<\/p>/,
    '<p class="va-education-year">2012 - 2015</p>'
  );
  
  // Extraer las certificaciones
  const certificationsMatch = educationSectionHTML.match(/<h3 class="va-education-school">Certifications<\/h3>\s*<p class="va-education-degree">([\s\S]*?)<\/p>/);
  
  if (!certificationsMatch) {
    console.error('❌ No se encontraron las certificaciones');
    return;
  }
  
  const certificationsText = certificationsMatch[1];
  
  // Separar las certificaciones por comas y formatearlas con saltos de línea
  // Primero, dividir por comas, pero tener cuidado con las comas dentro de las comillas
  const certifications = certificationsText
    .split(',')
    .map(c => c.trim())
    .filter(c => c.length > 0);
  
  // Formatear cada certificación con un salto de línea (usando <br>)
  const certificationsFormatted = certifications
    .map(cert => `- ${cert}`)
    .join('<br>');
  
  // Construir el HTML de educación completo
  const educationHTML = `
    <div class="va-education-item">
      ${firstEducationHTML}
    </div>
    <div class="va-education-item" style="margin-top: 16px;">
      <h3 class="va-education-school">Certifications</h3>
      <p class="va-education-degree">${certificationsFormatted}</p>
    </div>
  `;
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 EDUCATION CORREGIDA');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log(educationHTML.substring(0, 300) + '...\n');
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 CERTIFICATIONS FORMATEADAS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log(`Total certificaciones: ${certifications.length}\n`);
  console.log(certificationsFormatted.substring(0, 500) + '...\n');
  
  // Conectar con Webflow API
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
  
  const jill = allVAs.find(v => {
    const name = (v.fieldData.name || '').toLowerCase();
    return name.includes('jill') || name.startsWith('jill ');
  });
  
  if (!jill) {
    console.error('❌ Jill no encontrado en CMS');
    return;
  }
  
  console.log('✅ Jill encontrado en CMS\n');
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 VALORES ACTUALES');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  const currentEmployment = jill.fieldData['employment-richtext'] || '';
  const currentEducation = jill.fieldData['education-richtext'] || '';
  console.log(`Employment History: ${currentEmployment.length} caracteres`);
  console.log(`Education: ${currentEducation ? currentEducation.substring(0, 200) + '...' : '(vacío)'}`);
  console.log('\n');
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📤 ACTUALIZANDO CMS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const updates = {
    'employment-richtext': employmentListHTML,
    'education-richtext': educationHTML.trim()
  };
  
  try {
    await apiClient.updateCollectionItem(vaCollection.id, jill.id, updates);
    
    console.log('✅ Jill actualizado exitosamente\n');
    console.log('════════════════════════════════════════════════════════════════════════════════');
    console.log('📊 RESUMEN');
    console.log('════════════════════════════════════════════════════════════════════════════════\n');
    console.log('   ✅ Employment History: Recargado desde 218-jill-profile.html');
    console.log('      - Estructura: <div class="va-employment-list"> con accordions internos');
    console.log('      - Incluye todos los trabajos con títulos y descripciones con estilos');
    console.log('   ✅ Education: Corregida');
    console.log('      - Año "2012 - 2015" ahora en <p class="va-education-year"> (formato correcto)');
    console.log('   ✅ Certifications: Formateadas');
    console.log(`      - ${certifications.length} certificaciones separadas con saltos de línea`);
    console.log('      - Cada certificación tiene un guión "-" y está en una línea separada');
    console.log('\n   💡 El Employment History debería mostrarse ahora sin errores.');
    console.log('   💡 El año en Education debería mostrarse con el estilo correcto.');
    console.log('   💡 Las Certifications deberían ser más legibles con saltos de línea.');
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
  
  console.log();
}

main().catch(console.error);
