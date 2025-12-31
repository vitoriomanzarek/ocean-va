/**
 * Script para verificar que los campos de la colección "Quiz Leads" 
 * tengan los slugs correctos
 * 
 * Uso:
 * node scripts/verify-collection-fields.js
 */

import 'dotenv/config';
import { fetchWithTimeout } from './fetch-with-timeout.js';

const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;
const WEBFLOW_SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_LEADS_COLLECTION_ID = process.env.WEBFLOW_LEADS_COLLECTION_ID;

if (!WEBFLOW_API_TOKEN || !WEBFLOW_SITE_ID || !WEBFLOW_LEADS_COLLECTION_ID) {
  console.error('❌ Error: Variables de entorno requeridas no encontradas');
  console.log('\nAsegúrate de tener en tu archivo .env:');
  console.log('  - WEBFLOW_API_TOKEN');
  console.log('  - WEBFLOW_SITE_ID');
  console.log('  - WEBFLOW_LEADS_COLLECTION_ID');
  process.exit(1);
}

const API_BASE = `https://api.webflow.com/v2/sites/${WEBFLOW_SITE_ID}`;

const headers = {
  'Authorization': `Bearer ${WEBFLOW_API_TOKEN}`,
  'Content-Type': 'application/json',
  'Accept-Version': '1.0.0'
};

// Slugs esperados según el código
const expectedFields = {
  'name': { displayName: 'Name', type: 'PlainText', required: true },
  'email': { displayName: 'Email', type: 'Email', required: true },
  'phone': { displayName: 'Phone', type: 'PlainText', required: false },
  'industry': { displayName: 'Industry', type: 'PlainText', required: false },
  'operational-score': { displayName: 'Operational Score', type: 'Number', required: false },
  'intent-score': { displayName: 'Intent Score', type: 'Number', required: false },
  'urgency-score': { displayName: 'Urgency Score', type: 'Number', required: false },
  'profile': { displayName: 'Profile', type: 'PlainText', required: false },
  'profile-name': { displayName: 'Profile Name', type: 'PlainText', required: false },
  'priority': { displayName: 'Priority', type: 'Number', required: false },
  'action': { displayName: 'Action', type: 'PlainText', required: false },
  'current-cost': { displayName: 'Current Cost', type: 'Number', required: false },
  'va-cost': { displayName: 'VA Cost', type: 'Number', required: false },
  'monthly-savings': { displayName: 'Monthly Savings', type: 'Number', required: false },
  'annual-savings': { displayName: 'Annual Savings', type: 'Number', required: false },
  'answers': { displayName: 'Answers', type: 'PlainText', required: false },
  'submitted-at': { displayName: 'Submitted At', type: 'Date', required: false }
};

async function verifyCollectionFields() {
  console.log('🔍 Verificando campos de la colección "Quiz Leads"...\n');

  try {
    // 1. Obtener todas las colecciones para encontrar la nuestra
    const collectionsResponse = await fetchWithTimeout(`${API_BASE}/collections`, { headers }, 30000);

    if (!collectionsResponse.ok) {
      const errorText = await collectionsResponse.text();
      throw new Error(`Error obteniendo colecciones: ${collectionsResponse.status} - ${errorText}`);
    }

    const collectionsData = await collectionsResponse.json();
    const collections = collectionsData.collections || collectionsData;
    
    const collection = collections.find(c => c.id === WEBFLOW_LEADS_COLLECTION_ID);
    
    if (!collection) {
      throw new Error(`No se encontró la colección con ID: ${WEBFLOW_LEADS_COLLECTION_ID}`);
    }

    console.log(`✅ Colección encontrada: ${collection.displayName}\n`);

    // 2. Obtener todos los campos de la colección
    // La API v2 usa una ruta diferente para obtener campos
    const fieldsResponse = await fetchWithTimeout(
      `${API_BASE}/collections/${WEBFLOW_LEADS_COLLECTION_ID}/fields`,
      { headers },
      30000
    );

    if (!fieldsResponse.ok) {
      const errorText = await fieldsResponse.text();
      // Si falla, intentar obtener los campos desde la información de la colección
      if (fieldsResponse.status === 404) {
        console.log('⚠️  No se pudo obtener campos directamente. Intentando método alternativo...\n');
        // Los campos pueden estar en la respuesta de la colección
        if (collection.fields) {
          var fields = collection.fields;
        } else {
          throw new Error(`No se pudieron obtener los campos. Error: ${errorText}`);
        }
      } else {
        throw new Error(`Error obteniendo campos: ${fieldsResponse.status} - ${errorText}`);
      }
    } else {
      const fieldsData = await fieldsResponse.json();
      var fields = fieldsData.fields || fieldsData.items || fieldsData;
    }
    
    // Crear un mapa de slugs encontrados
    const foundFields = {};
    fields.forEach(field => {
      foundFields[field.slug] = {
        displayName: field.displayName,
        type: field.type,
        slug: field.slug
      };
    });

    console.log(`📋 Campos encontrados en Webflow: ${fields.length}\n`);

    // 3. Verificar cada campo esperado
    const missingFields = [];
    const incorrectFields = [];
    const correctFields = [];

    for (const [expectedSlug, expectedInfo] of Object.entries(expectedFields)) {
      if (foundFields[expectedSlug]) {
        const found = foundFields[expectedSlug];
        // Verificar que el tipo coincida (algunos tipos pueden variar)
        if (found.type === expectedInfo.type || 
            (expectedInfo.type === 'PlainText' && found.type === 'PlainText') ||
            (expectedInfo.type === 'Number' && found.type === 'Number') ||
            (expectedInfo.type === 'Email' && found.type === 'Email') ||
            (expectedInfo.type === 'Date' && found.type === 'Date')) {
          correctFields.push({
            slug: expectedSlug,
            displayName: found.displayName,
            type: found.type
          });
        } else {
          incorrectFields.push({
            slug: expectedSlug,
            expected: expectedInfo.type,
            found: found.type,
            displayName: found.displayName
          });
        }
      } else {
        missingFields.push({
          slug: expectedSlug,
          displayName: expectedInfo.displayName,
          type: expectedInfo.type
        });
      }
    }

    // 4. Mostrar resultados
    console.log('═══════════════════════════════════════════════════════\n');
    
    if (correctFields.length > 0) {
      console.log(`✅ CAMPOS CORRECTOS (${correctFields.length}):\n`);
      correctFields.forEach(field => {
        console.log(`   ✓ ${field.displayName} (${field.slug}) - ${field.type}`);
      });
      console.log('');
    }

    if (missingFields.length > 0) {
      console.log(`❌ CAMPOS FALTANTES (${missingFields.length}):\n`);
      missingFields.forEach(field => {
        console.log(`   ✗ ${field.displayName}`);
        console.log(`     Slug esperado: "${field.slug}"`);
        console.log(`     Tipo: ${field.type}`);
        console.log(`     → Crea este campo en Webflow con el nombre exacto: "${field.displayName}"`);
        console.log('');
      });
    }

    if (incorrectFields.length > 0) {
      console.log(`⚠️  CAMPOS CON TIPO INCORRECTO (${incorrectFields.length}):\n`);
      incorrectFields.forEach(field => {
        console.log(`   ⚠ ${field.displayName} (${field.slug})`);
        console.log(`     Tipo esperado: ${field.expected}`);
        console.log(`     Tipo encontrado: ${field.found}`);
        console.log(`     → Cambia el tipo de este campo en Webflow`);
        console.log('');
      });
    }

    // 5. Verificar campos adicionales (que no deberían estar)
    const extraFields = [];
    for (const [slug, field] of Object.entries(foundFields)) {
      if (!expectedFields[slug] && slug !== 'name' && slug !== 'slug') {
        // Ignorar campos del sistema como 'name' y 'slug'
        extraFields.push({
          slug: slug,
          displayName: field.displayName,
          type: field.type
        });
      }
    }

    if (extraFields.length > 0) {
      console.log(`ℹ️  CAMPOS ADICIONALES (no requeridos, pero OK):\n`);
      extraFields.forEach(field => {
        console.log(`   ℹ ${field.displayName} (${field.slug}) - ${field.type}`);
      });
      console.log('');
    }

    console.log('═══════════════════════════════════════════════════════\n');

    // 6. Resumen final
    const totalExpected = Object.keys(expectedFields).length;
    const totalCorrect = correctFields.length;
    const totalMissing = missingFields.length;
    const totalIncorrect = incorrectFields.length;

    console.log('📊 RESUMEN:');
    console.log(`   Total esperado: ${totalExpected}`);
    console.log(`   ✅ Correctos: ${totalCorrect}`);
    console.log(`   ❌ Faltantes: ${totalMissing}`);
    console.log(`   ⚠️  Incorrectos: ${totalIncorrect}\n`);

    if (totalMissing === 0 && totalIncorrect === 0) {
      console.log('🎉 ¡Perfecto! Todos los campos están correctamente configurados.\n');
      return true;
    } else {
      console.log('⚠️  Hay campos que necesitan atención. Revisa la lista arriba.\n');
      return false;
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    
    // Handle timeout and network errors specifically
    if (error.name === 'TimeoutError' || error.name === 'NetworkError') {
      console.error('   → Error de red o timeout. Verifica tu conexión a internet.');
      console.error('   → El script se canceló automáticamente después de 30 segundos para evitar bloqueos.');
    } else if (error.message.includes('401')) {
      console.error('   → Verifica que tu WEBFLOW_API_TOKEN sea correcto');
    } else if (error.message.includes('404')) {
      console.error('   → Verifica que tu WEBFLOW_LEADS_COLLECTION_ID sea correcto');
    }
    process.exit(1);
  }
}

// Ejecutar verificación
verifyCollectionFields();

