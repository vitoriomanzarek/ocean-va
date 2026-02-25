/**
 * Script para cargar Employment Summary, Employment History y English Score de Bernadette
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

// Función para generar HTML de employment history
function generateEmploymentHTML(jobs) {
  const accordions = jobs.map(job => {
    // Dividir la descripción por <br> o saltos de línea y crear párrafos
    const descriptionLines = job.description
      .split(/<br\s*\/?>/gi)
      .map(line => line.trim())
      .filter(line => line.length > 0);
    
    const descriptionHTML = descriptionLines
      .map(line => `<p class="va-employment-accordion-description">${line}</p>`)
      .join('\n');
    
    return `<div class="va-employment-accordion">
  <div class="va-employment-accordion-header" onclick="this.classList.toggle('active'); this.nextElementSibling.classList.toggle('active');">
    <div class="va-employment-accordion-title">
      <h4 class="va-employment-accordion-company">${job.company}</h4>
      <p class="va-employment-accordion-position">${job.position}</p>
      <p class="va-employment-accordion-period">${job.period}</p>
    </div>
    <svg class="va-employment-accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
    </svg>
  </div>
  <div class="va-employment-accordion-content">
    ${descriptionHTML}
  </div>
</div>`;
  }).join('\n');
  
  return `<div class="va-employment-list">${accordions}</div>`;
}

async function main() {
  console.log('🔧 Cargando datos faltantes de Bernadette...\n');
  
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
  
  const bernadette = allVAs.find(v => {
    const name = (v.fieldData.name || '').toLowerCase();
    return name.includes('bernadette');
  });
  
  if (!bernadette) {
    console.error('❌ Bernadette no encontrado en CMS');
    return;
  }
  
  console.log('✅ Bernadette encontrado en CMS\n');
  
  // Employment Summary
  const employmentSummary = `Bernadette has 8 years of mortgage and lending experience gained through her roles at ICMS–LLC Philippine Branch Office, EMAPTA Versatile Services, and ACOM Consumer Finance Corporation. She specializes in reviewing loan applications, validating disclosures and supporting documents, and ensuring compliance with U.S. lending laws and regulatory requirements. Her experience includes pre-underwriting and compliance reviews, fee and disclosure validation, loan package setup in loan origination systems, and quality checks of approved and denied loans. She has worked closely with loan officers, managers, and internal teams to provide guidance on regulatory standards and process accuracy. Bernadette's strengths include strong compliance knowledge, attention to detail, analytical skills, clear communication, and consistent adherence to quality and regulatory standards.`;
  
  // Employment History (extraído del HTML minificado)
  const employmentHistory = [
    {
      company: 'EMAPTA VERSATILE SERVICES',
      position: 'Compliance Analyst (US Mortgage)',
      period: 'Nov 2020 – Apr 2024',
      description: '• Reviews forms, disclosures, and other documents to validate information and ensure compliance with applicable laws and regulations.<br>• Communicates with loan officers/area managers/team members to provide direction and guidance on applicable regulations.'
    },
    {
      company: 'ACOM CONSUMER FINANCE CORPORATION',
      position: 'Credit Processing Staff',
      period: 'Jan 1, 2019 – Nov 2020',
      description: '• Processing loan transactions (Releasing, Renewals and Extensions)<br>• Responding to customer queries through phone calls, social media platforms and emails.<br>• Quality Checking of approved/Denied loans for internal monthly production.'
    },
    {
      company: 'ICMS – LLC PHILIPPINE BRANCH OFFICE',
      position: 'Process Analyst (US Mortgage)',
      period: 'Aug 6, 2016 – July 20, 2018',
      description: '• Responsible for reviewing disclosures and fees by checking minimum requirements based on Pre-Underwriting and Compliance checklist.<br>• Reviewing fees related disclosures for initial loan estimates.<br>• Performs set up of loan package by categorizing it to proper place holder in Loan Origination System.'
    }
  ];
  
  const employmentHistoryHTML = generateEmploymentHTML(employmentHistory);
  const englishScore = '75/C1';
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 DATOS A CARGAR');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  console.log(`✅ Employment Summary: ${employmentSummary.length} caracteres`);
  console.log(`✅ Employment History: ${employmentHistory.length} trabajos`);
  console.log(`✅ English Score: "${englishScore}"`);
  console.log('\n');
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📤 ACTUALIZANDO CMS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const updates = {
    'employment-summary': employmentSummary,
    'employment-richtext': employmentHistoryHTML,
    'english-score-3': englishScore
  };
  
  try {
    await apiClient.updateCollectionItem(vaCollection.id, bernadette.id, updates);
    
    console.log('✅ Bernadette actualizado exitosamente\n');
    console.log('════════════════════════════════════════════════════════════════════════════════');
    console.log('📊 RESUMEN');
    console.log('════════════════════════════════════════════════════════════════════════════════\n');
    console.log('   ✅ Employment Summary: Cargado');
    console.log('   ✅ Employment History: Cargado (3 trabajos con descripciones)');
    console.log('   ✅ English Score: Cargado ("75/C1")');
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
