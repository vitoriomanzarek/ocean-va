/**
 * Script para obtener el Collection ID de "Quiz Leads"
 * 
 * Uso:
 * node scripts/get-collection-id.js
 */

import 'dotenv/config';
import { fetchWithTimeout } from './fetch-with-timeout.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Intentar cargar .env manualmente si dotenv no funciona
let WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;
let WEBFLOW_SITE_ID = process.env.WEBFLOW_SITE_ID;

if (!WEBFLOW_API_TOKEN || !WEBFLOW_SITE_ID) {
  // Intentar leer el archivo .env directamente
  try {
    const envPath = join(__dirname, '..', '.env');
    const envContent = readFileSync(envPath, 'utf-8');
    const envLines = envContent.split('\n');
    
    envLines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        const value = valueParts.join('=').trim().replace(/^["']|["']$/g, ''); // Quitar comillas si las tiene
        if (key === 'WEBFLOW_API_TOKEN' || key === 'WEBFLOW_SITE_API_TOKEN') {
          WEBFLOW_API_TOKEN = value;
        }
        if (key === 'WEBFLOW_SITE_ID') WEBFLOW_SITE_ID = value;
      }
    });
  } catch (error) {
    // Si no se puede leer, continuar con las variables de entorno
  }
}

// También verificar argumentos de línea de comandos
if (process.argv[2] && process.argv[3]) {
  WEBFLOW_API_TOKEN = process.argv[2];
  WEBFLOW_SITE_ID = process.argv[3];
}

if (!WEBFLOW_API_TOKEN || !WEBFLOW_SITE_ID) {
  console.error('❌ Error: WEBFLOW_API_TOKEN y WEBFLOW_SITE_ID son requeridos');
  console.log('\nOpciones:');
  console.log('  1. Asegúrate de tener estas variables en tu archivo .env:');
  console.log('     - WEBFLOW_API_TOKEN');
  console.log('     - WEBFLOW_SITE_ID');
  console.log('\n  2. O pásalas como argumentos:');
  console.log('     node scripts/get-collection-id.js YOUR_TOKEN YOUR_SITE_ID');
  process.exit(1);
}

const API_BASE = `https://api.webflow.com/v2/sites/${WEBFLOW_SITE_ID}`;

const headers = {
  'Authorization': `Bearer ${WEBFLOW_API_TOKEN}`,
  'Content-Type': 'application/json',
  'Accept-Version': '1.0.0'
};

async function getCollectionId() {
  console.log('🔍 Buscando colección "Quiz Leads"...\n');

  try {
    // Obtener todas las colecciones del sitio
    const response = await fetchWithTimeout(`${API_BASE}/collections`, {
      headers
    }, 30000);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error obteniendo colecciones: ${response.status} - ${errorText}`);
    }

    const responseData = await response.json();
    
    // Debug: mostrar la estructura de la respuesta
    console.log('📦 Estructura de la respuesta:', JSON.stringify(responseData, null, 2).substring(0, 500));
    console.log('');
    
    // La API v2 puede devolver un objeto con una propiedad 'items' o directamente un array
    let collections = [];
    if (Array.isArray(responseData)) {
      collections = responseData;
    } else if (responseData.items && Array.isArray(responseData.items)) {
      collections = responseData.items;
    } else if (responseData.collections && Array.isArray(responseData.collections)) {
      collections = responseData.collections;
    } else {
      console.log('⚠️  Formato de respuesta inesperado');
      console.log('Respuesta completa:', JSON.stringify(responseData, null, 2));
      return;
    }

    if (!collections || collections.length === 0) {
      console.log('⚠️  No se encontraron colecciones en este sitio.\n');
      return;
    }

    console.log(`📋 Colecciones encontradas: ${collections.length}\n`);

    // Buscar la colección "Quiz Leads" o "Quiz Lead"
    const quizLeadsCollection = collections.find(
      collection => 
        collection.displayName?.toLowerCase().includes('quiz lead') ||
        collection.slug?.toLowerCase().includes('quiz-lead')
    );

    if (quizLeadsCollection) {
      console.log('✅ ¡Colección "Quiz Leads" encontrada!\n');
      console.log('═══════════════════════════════════════════════════════');
      console.log(`   Nombre: ${quizLeadsCollection.displayName}`);
      console.log(`   Slug: ${quizLeadsCollection.slug}`);
      console.log(`   ID: ${quizLeadsCollection.id}`);
      console.log('═══════════════════════════════════════════════════════\n');
      console.log('📝 Agrega esto a tu archivo .env:');
      console.log(`   WEBFLOW_LEADS_COLLECTION_ID=${quizLeadsCollection.id}\n`);
      
      return quizLeadsCollection.id;
    } else {
      console.log('❌ No se encontró la colección "Quiz Leads"\n');
      console.log('📋 Colecciones disponibles:\n');
      collections.forEach((collection, index) => {
        console.log(`   ${index + 1}. ${collection.displayName} (${collection.slug})`);
        console.log(`      ID: ${collection.id}\n`);
      });
      console.log('\n💡 Si la colección tiene otro nombre, búscala en la lista arriba.');
      console.log('   O crea la colección con el script: node scripts/create-leads-collection.js\n');
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
      console.error('   → Verifica que tu WEBFLOW_SITE_ID sea correcto');
    }
    process.exit(1);
  }
}

// Ejecutar
getCollectionId();

