/**
 * Script para cargar datos completos de Alyssa:
 * 1. Employment History (4 trabajos)
 * 2. Employment Summary (verificar/actualizar)
 * 3. English Description
 * 4. CEFR (C2)
 * 5. Nombre (solo "Alyssa", sin apellido)
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

function escapeHtml(text) {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}

function generateEmploymentHTML(employmentHistory) {
  if (!employmentHistory || employmentHistory.length === 0) return '';
  
  return employmentHistory.map(emp => {
    let descriptionHTML = '';
    if (emp.description) {
      const lines = emp.description.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
      
      descriptionHTML = lines.map(line => {
        const bulletText = line.startsWith('•') ? line : `• ${line}`;
        return `<p class="va-employment-accordion-description">${escapeHtml(bulletText)}</p>`;
      }).join('');
    }
    
    return `<div class="va-employment-accordion"><div class="va-employment-accordion-header" onclick="this.classList.toggle('active'); this.nextElementSibling.classList.toggle('active');"><div class="va-employment-accordion-title"><h4 class="va-employment-accordion-company">${escapeHtml(emp.company || 'N/A')}</h4><p class="va-employment-accordion-position">${escapeHtml(emp.position || '')}</p><p class="va-employment-accordion-period">${escapeHtml(emp.period || '')}</p></div><svg class="va-employment-accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div><div class="va-employment-accordion-content">${descriptionHTML}</div></div>`;
  }).join('');
}

function generateCEFRHTML(level) {
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const descriptions = {
    'A1': 'Can understand and use familiar everyday phrases and answer basic questions about personal details.',
    'A2': 'Can have very short social exchanges and give information on familiar and routine matters.',
    'B1': 'Can briefly describe past events and future plans, give reasons for opinions and use the language when traveling.',
    'B2': 'Can communicate confidently in a variety of academic and professional environments.',
    'C1': 'Can use the language flexibly and effectively for social, academic and professional purposes.',
    'C2': 'Can interact with ease and can differentiate their shades of meaning.'
  };
  
  return levels.map(l => {
    const isActive = l === level;
    return `<div class="va-cefr-item"><div class="va-cefr-bubble va-cefr-bubble-${isActive ? 'active' : 'inactive'}">${l}</div><p class="va-cefr-description">${descriptions[l]}</p></div>`;
  }).join('');
}

async function main() {
  console.log('🔧 Cargando datos completos de Alyssa...\n');
  
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
  
  console.log('✅ Alyssa encontrado en CMS\n');
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📋 PREPARANDO DATOS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  // Employment History
  const employmentHistory = [
    {
      company: 'FREELANCE',
      position: 'INSURANCE VA',
      period: 'DEC 2024 - 2025',
      description: `Processes the following as per client requirements:
Mortgagee Clause
Endorsement (Any changes request)
Updating and keeping the CRMs updated
Quoting, Renewal, & New Business
Servicing (COi & other ACORD Forms)`
    },
    {
      company: 'Office Beacon',
      position: 'INSURANCE TEAM LEADER',
      period: 'March 2023 - Dec. 2024',
      description: `The majority of the accounts I managed were in Health, along with Personal & Commercial Lines accounts.
Ensure that each team member's objectives are met efficiently and effectively.
Coordinating tasks, providing support, and fostering a positive work environment.
Provide weekly updates on each account and discuss strengths and opportunities.
Timely update and submitted team reports and administrative tasks.
Knowledgeable in Health & Benefits, Personal, and Commercial Line.
In Health, my experience includes processes such as enrollment, submission, quoting & rates, and handling censuses.
Personal & Commercial Lines - Processing New Business, Certificates of Insurance (COis), Mortgagee, Endorsements, and Servicing, as well as Renewals.`
    },
    {
      company: 'Sutherland, Inc',
      position: 'CUSTOMER SERVICE REP',
      period: 'September 2022 - March 2023',
      description: `Assisted Account Receivable and Payable Department where I had the opportunity to gain practical experience and further enhance my accounting skills. In this role:
Email Management
Receipt allocation in CRM was used and Xero
Creating of clients' Invoices
Creating Payment Reminders to clients through email
Submitting Accounts Receivable Metrics to track AR percentage`
    },
    {
      company: 'TOA, Global',
      position: 'ON-THE-JOB TRAINING',
      period: 'April 2022 - August 2022',
      description: `Assisted Account Receivable and Payable Department where I had the opportunity to gain practical experience and further enhance my accounting skills. In this role:
Email Management
Receipt allocation in CRM was used and Xero
Creating of clients' Invoices
Creating Payment Reminders to clients through email
Submitting Accounts Receivable Metrics to track AR percentage`
    }
  ];
  
  const employmentHTML = generateEmploymentHTML(employmentHistory);
  console.log(`✅ Employment History generado: ${employmentHistory.length} trabajos`);
  console.log(`   Longitud HTML: ${employmentHTML.length} caracteres\n`);
  
  // Employment Summary
  const employmentSummary = `Alyssa has three years of Home and Auto insurance experience focused on quoting, renewals, endorsements, and mortgage updates, gained through her work as an Insurance VA and her Personal and Commercial Lines responsibilities at Office Beacon. She is skilled in processing new business, COIs, ACORD forms, servicing requests, and maintaining accurate CRM records. As an Insurance Team Leader at Office Beacon, she strengthened her leadership, task coordination, and reporting abilities while managing Health, Personal, and Commercial Lines accounts. She also gained experience in health insurance processes, including enrollments, submissions, and quoting. Her earlier roles at Sutherland Inc. and TOA Global enhanced her administrative, accounting support, and email management skills. Alyssa is recognized for her attention to detail, strong communication, organization, and adaptability.`;
  console.log(`✅ Employment Summary preparado: ${employmentSummary.length} caracteres\n`);
  
  // English Description
  const englishDescription = `Shows solid communication skills with clear pronunciation and a generally smooth flow. Uses everyday vocabulary and basic grammar confidently, expressing ideas effectively with growing consistency.`;
  console.log(`✅ English Description preparado: ${englishDescription.length} caracteres\n`);
  
  // CEFR
  const cefrHTML = generateCEFRHTML('C2');
  console.log(`✅ CEFR HTML generado (C2): ${cefrHTML.length} caracteres\n`);
  
  // Nombre (solo "Alyssa")
  const name = 'Alyssa';
  const currentName = alyssa.fieldData.name || '';
  console.log(`✅ Nombre: "${currentName}" → "${name}"\n`);
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📤 ACTUALIZANDO CMS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const updates = {
    'name': name,
    'employment-richtext': employmentHTML,
    'employment-summary': employmentSummary,
    'english-description': englishDescription,
    'cerf-result': cefrHTML
  };
  
  console.log('Campos a actualizar:');
  Object.keys(updates).forEach(field => {
    const preview = typeof updates[field] === 'string' && updates[field].length > 50 
      ? updates[field].substring(0, 50) + '...' 
      : updates[field];
    console.log(`   - ${field}: ${preview}`);
  });
  console.log();
  
  try {
    await apiClient.updateCollectionItem(vaCollection.id, alyssa.id, updates);
    
    console.log('✅ Alyssa actualizado exitosamente\n');
    console.log('════════════════════════════════════════════════════════════════════════════════');
    console.log('📊 RESUMEN');
    console.log('════════════════════════════════════════════════════════════════════════════════\n');
    console.log(`   ✅ Nombre actualizado: "${name}"`);
    console.log(`   ✅ Employment History: ${employmentHistory.length} trabajos cargados`);
    console.log(`   ✅ Employment Summary: ${employmentSummary.length} caracteres`);
    console.log(`   ✅ English Description: ${englishDescription.length} caracteres`);
    console.log(`   ✅ CEFR: C2 configurado`);
    console.log('\n   💡 Después de publicar, verifica que todos los campos se muestren correctamente.');
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
    if (error.response) {
      console.error('Detalles:', JSON.stringify(error.response, null, 2));
    }
  }
  
  console.log();
}

main().catch(console.error);
