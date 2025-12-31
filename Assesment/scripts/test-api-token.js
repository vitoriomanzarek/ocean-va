/**
 * Script para probar el token de API y verificar permisos
 */

import 'dotenv/config';
import { fetchWithTimeout } from './fetch-with-timeout.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;
let WEBFLOW_SITE_ID = process.env.WEBFLOW_SITE_ID;

// Intentar leer .env manualmente
if (!WEBFLOW_API_TOKEN || !WEBFLOW_SITE_ID) {
  try {
    const envPath = join(__dirname, '..', '.env');
    const envContent = readFileSync(envPath, 'utf-8');
    const envLines = envContent.split('\n');
    
    envLines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        const value = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
        if (key === 'WEBFLOW_API_TOKEN' || key === 'WEBFLOW_SITE_API_TOKEN') {
          WEBFLOW_API_TOKEN = value;
        }
        if (key === 'WEBFLOW_SITE_ID') WEBFLOW_SITE_ID = value;
      }
    });
  } catch (error) {
    console.error('Error leyendo .env:', error.message);
  }
}

if (!WEBFLOW_API_TOKEN || !WEBFLOW_SITE_ID) {
  console.error('❌ Faltan variables de entorno');
  process.exit(1);
}

console.log('🔍 Probando token de API...\n');
console.log(`Site ID: ${WEBFLOW_SITE_ID}`);
console.log(`Token (primeros 20 chars): ${WEBFLOW_API_TOKEN.substring(0, 20)}...\n`);

// Probar diferentes endpoints y versiones de API
async function testToken() {
  const tests = [
    {
      name: 'Listar sitios (v2)',
      url: 'https://api.webflow.com/v2/sites',
      headers: {
        'Authorization': `Bearer ${WEBFLOW_API_TOKEN}`,
        'Accept-Version': '1.0.0'
      }
    },
    {
      name: 'Obtener sitio específico (v2)',
      url: `https://api.webflow.com/v2/sites/${WEBFLOW_SITE_ID}`,
      headers: {
        'Authorization': `Bearer ${WEBFLOW_API_TOKEN}`,
        'Accept-Version': '1.0.0'
      }
    },
    {
      name: 'Listar colecciones (v2)',
      url: `https://api.webflow.com/v2/sites/${WEBFLOW_SITE_ID}/collections`,
      headers: {
        'Authorization': `Bearer ${WEBFLOW_API_TOKEN}`,
        'Accept-Version': '1.0.0'
      }
    },
    {
      name: 'Listar colecciones (v1)',
      url: `https://api.webflow.com/v1/sites/${WEBFLOW_SITE_ID}/collections`,
      headers: {
        'Authorization': `Bearer ${WEBFLOW_API_TOKEN}`
      }
    }
  ];

  for (const test of tests) {
    try {
      console.log(`\n📡 Probando: ${test.name}`);
      const response = await fetchWithTimeout(test.url, { headers: test.headers }, 30000);
      const data = await response.text();
      
      if (response.ok) {
        console.log(`   ✅ Éxito (${response.status})`);
        try {
          const json = JSON.parse(data);
          if (Array.isArray(json)) {
            console.log(`   📋 Encontradas ${json.length} colecciones`);
            if (json.length > 0) {
              console.log(`   Primera colección: ${json[0].displayName} (${json[0].id})`);
            }
          } else if (json.displayName) {
            console.log(`   📋 Sitio: ${json.displayName}`);
          }
        } catch (e) {
          console.log(`   📄 Respuesta: ${data.substring(0, 100)}...`);
        }
      } else {
        console.log(`   ❌ Error (${response.status})`);
        try {
          const error = JSON.parse(data);
          console.log(`   Mensaje: ${error.message || error.msg || 'Sin mensaje'}`);
          if (error.code) console.log(`   Código: ${error.code}`);
          if (error.details) console.log(`   Detalles: ${JSON.stringify(error.details)}`);
        } catch (e) {
          console.log(`   Respuesta: ${data.substring(0, 200)}`);
        }
      }
    } catch (error) {
      if (error.name === 'TimeoutError' || error.name === 'NetworkError') {
        console.log(`   ❌ ${error.name}: ${error.message}`);
        console.log(`   → El script se canceló automáticamente después de 30 segundos.`);
      } else {
        console.log(`   ❌ Excepción: ${error.message}`);
      }
    }
  }
}

testToken();

