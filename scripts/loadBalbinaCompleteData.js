/**
 * Script para cargar toda la información faltante de Balbina
 * Extraída del componente HTML minificado
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

// Función para generar HTML de skills
// IMPORTANTE: NO incluir el contenedor <div class="va-skills-container">
// El template dinámico ya tiene ese contenedor con id="va-skills-target"
// Solo generar los <span> tags individuales sin contenedor
function generateSkillsHTML(skills) {
  return skills.map(skill => `<span class="va-skill-tag">${skill}</span>`).join('');
}

async function main() {
  console.log('🔧 Cargando información completa de Balbina...\n');
  
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
  
  // Datos extraídos del HTML minificado
  const skills = [
    'Process Improvement',
    'Team Leadership & Supervision',
    'Operational Efficiency',
    'Customer Service',
    'Complaint Resolution',
    'Appointment Scheduling',
    'Time Management',
    'Performance Monitoring & Coaching',
    'Administrative Support'
  ];
  
  // IMPORTANTE: NO incluir el contenedor <div class="va-skills-container">
  // El template ya tiene ese contenedor con id="va-skills-target"
  // Solo generar los <span> tags individuales
  const skillsHTML = generateSkillsHTML(skills);
  const thumbnailDescription = 'Operations expertise, Team leadership, Customer service';
  const employmentSummary = `Balbina is an Operations Supervisor with a proven record of coaching customer service teams, optimizing processes, managing schedules, and resolving escalations. Previously, she served as a Customer Service Agent at Telvista handling car-rental reservations, meeting quality targets, and flagging security risks. She also has 4 years of Executive Assistant experience, gained supporting leadership teams and day-to-day operations, and is trained in insurance. Her strengths include team leadership, stakeholder communication, process improvement, and conflict resolution. She brings strong skills in scheduling and calendar management, customer care, KPI tracking, and time management.`;
  const discType = 'I';
  const discDescription = 'Influence (I) - Charismatic and engaging. I-type VAs excel in client communication, networking, and keeping teams motivated.';
  const englishScore = '7.2';
  const typeOfEnglishTest = 'EF English Test';
  const cerfResult = 'B2';
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 DATOS A CARGAR');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  console.log(`✅ Skills: ${skills.length} skills`);
  console.log(`✅ Thumbnail Description: "${thumbnailDescription}"`);
  console.log(`✅ Employment Summary: ${employmentSummary.length} caracteres`);
  console.log(`✅ DISC Type: "${discType}"`);
  console.log(`✅ DISC Description: "${discDescription.substring(0, 50)}..."`);
  console.log(`✅ English Score: "${englishScore}"`);
  console.log(`✅ Type of English Test: "${typeOfEnglishTest}"`);
  console.log(`✅ CEFR Result: "${cerfResult}"`);
  console.log('\n');
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📤 ACTUALIZANDO CMS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const updates = {
    'skills-richtext': skillsHTML,
    'thumbnail-description': thumbnailDescription,
    'employment-summary': employmentSummary,
    'disc-type-2': discType,
    'disc-description': discDescription,
    'english-score-3': englishScore,
    'type-of-english-test': typeOfEnglishTest,
    'cerf-result': cerfResult
  };
  
  try {
    await apiClient.updateCollectionItem(vaCollection.id, balbina.id, updates);
    
    console.log('✅ Balbina actualizado exitosamente\n');
    console.log('════════════════════════════════════════════════════════════════════════════════');
    console.log('📊 RESUMEN');
    console.log('════════════════════════════════════════════════════════════════════════════════\n');
    console.log('   ✅ Skills: Cargado (9 skills)');
    console.log('   ✅ Thumbnail Description: Cargado');
    console.log('   ✅ Employment Summary: Cargado');
    console.log('   ✅ DISC Type: Cargado ("I")');
    console.log('   ✅ DISC Description: Cargado');
    console.log('   ✅ English Score: Cargado ("7.2")');
    console.log('   ✅ Type of English Test: Cargado ("EF English Test")');
    console.log('   ✅ CEFR Result: Cargado ("B2")');
    console.log('\n   💡 Todos los campos ahora deberían mostrarse correctamente en la página.');
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
  
  console.log();
}

main().catch(console.error);
