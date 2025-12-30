/**
 * Script para crear la colección de Quiz Leads en Webflow CMS
 * 
 * Uso:
 * WEBFLOW_API_TOKEN=tu_token WEBFLOW_SITE_ID=tu_site_id node scripts/create-leads-collection.js
 * O simplemente: node scripts/create-leads-collection.js (si las variables están en .env)
 */

import 'dotenv/config';

const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;
const WEBFLOW_SITE_ID = process.env.WEBFLOW_SITE_ID;

if (!WEBFLOW_API_TOKEN || !WEBFLOW_SITE_ID) {
  console.error('❌ Error: WEBFLOW_API_TOKEN y WEBFLOW_SITE_ID son requeridos');
  console.log('\nUso:');
  console.log('WEBFLOW_API_TOKEN=tu_token WEBFLOW_SITE_ID=tu_site_id node scripts/create-leads-collection.js');
  process.exit(1);
}

const API_BASE = `https://api.webflow.com/v2/sites/${WEBFLOW_SITE_ID}`;

const headers = {
  'Authorization': `Bearer ${WEBFLOW_API_TOKEN}`,
  'Content-Type': 'application/json',
  'Accept-Version': '1.0.0'
};

async function createCollection() {
  console.log('🚀 Creando colección "Quiz Leads" en Webflow CMS...\n');

  try {
    // 1. Crear la colección
    console.log('📝 Creando colección...');
    const collectionResponse = await fetch(`${API_BASE}/collections`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        displayName: 'Quiz Leads',
        singularName: 'Quiz Lead',
        slug: 'quiz-leads'
      })
    });

    if (!collectionResponse.ok) {
      const errorText = await collectionResponse.text();
      throw new Error(`Error creando colección: ${collectionResponse.status} - ${errorText}`);
    }

    const collection = await collectionResponse.json();
    const collectionId = collection.id;
    
    console.log(`✅ Colección creada: ${collection.displayName} (ID: ${collectionId})\n`);

    // 2. Agregar campos a la colección
    const fields = [
      { name: 'Name', type: 'PlainText', slug: 'name', isRequired: true },
      { name: 'Email', type: 'Email', slug: 'email', isRequired: true },
      { name: 'Phone', type: 'PlainText', slug: 'phone', isRequired: false },
      { name: 'Industry', type: 'PlainText', slug: 'industry', isRequired: false },
      { name: 'Operational Score', type: 'Number', slug: 'operational-score', isRequired: false },
      { name: 'Intent Score', type: 'Number', slug: 'intent-score', isRequired: false },
      { name: 'Urgency Score', type: 'Number', slug: 'urgency-score', isRequired: false },
      { name: 'Profile', type: 'PlainText', slug: 'profile', isRequired: false },
      { name: 'Profile Name', type: 'PlainText', slug: 'profile-name', isRequired: false },
      { name: 'Priority', type: 'Number', slug: 'priority', isRequired: false },
      { name: 'Action', type: 'PlainText', slug: 'action', isRequired: false },
      { name: 'Current Cost', type: 'Number', slug: 'current-cost', isRequired: false },
      { name: 'VA Cost', type: 'Number', slug: 'va-cost', isRequired: false },
      { name: 'Monthly Savings', type: 'Number', slug: 'monthly-savings', isRequired: false },
      { name: 'Annual Savings', type: 'Number', slug: 'annual-savings', isRequired: false },
      { name: 'Answers', type: 'PlainText', slug: 'answers', isRequired: false },
      { name: 'Submitted At', type: 'Date', slug: 'submitted-at', isRequired: false }
    ];

    console.log('📌 Agregando campos a la colección...\n');
    
    for (const field of fields) {
      try {
        const fieldResponse = await fetch(
          `${API_BASE}/collections/${collectionId}/fields`,
          {
            method: 'POST',
            headers,
            body: JSON.stringify({
              displayName: field.name,
              type: field.type,
              slug: field.slug,
              isRequired: field.isRequired || false
            })
          }
        );

        if (!fieldResponse.ok) {
          const errorText = await fieldResponse.text();
          console.warn(`⚠️  Error agregando campo "${field.name}": ${errorText}`);
        } else {
          const createdField = await fieldResponse.json();
          console.log(`✅ Campo agregado: ${field.name} (${field.slug})`);
        }

        // Esperar un poco entre requests para evitar rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.warn(`⚠️  Error agregando campo "${field.name}":`, error.message);
      }
    }

    console.log('\n✅ ¡Colección creada exitosamente!\n');
    console.log('📋 Información de la colección:');
    console.log(`   Collection ID: ${collectionId}`);
    console.log(`   Slug: quiz-leads`);
    console.log('\n📝 Agrega este ID a tu archivo .env:');
    console.log(`   WEBFLOW_LEADS_COLLECTION_ID=${collectionId}\n`);

    return collectionId;
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

// Ejecutar
createCollection();
