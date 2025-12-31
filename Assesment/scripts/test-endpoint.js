/**
 * Script para probar el endpoint /api/quiz/submit
 * 
 * Uso:
 * node scripts/test-endpoint.js
 * 
 * O con servidor local corriendo:
 * npm run dev  # En otra terminal
 * node scripts/test-endpoint.js
 */

import 'dotenv/config';
import { fetchWithTimeout } from './fetch-with-timeout.js';

// URL del endpoint - por defecto localhost, pero se puede cambiar
const API_URL = process.env.API_URL || 'http://localhost:3000/api/quiz/submit';

// Datos de prueba
const testData = {
  contact: {
    name: 'Test User',
    email: `test-${Date.now()}@example.com`,
    phone: '(555) 123-4567',
    industry: 'insurance'
  },
  answers: {
    q1: 'yes',
    q2: 'sometimes',
    q3: 'no'
  },
  scores: {
    operational: 7.5,
    intent: 12,
    urgency: 5
  },
  profile: {
    profile: 'A',
    name: 'HOT LEAD',
    priority: 1,
    action: 'immediate-sales-call'
  },
  savings: {
    currentCost: 4500,
    vaCost: 1300,
    monthlySavings: 3200,
    annualSavings: 38400
  }
};

async function testEndpoint() {
  console.log('🧪 Probando endpoint /api/quiz/submit...\n');
  console.log(`📍 URL: ${API_URL}\n`);
  console.log('📦 Datos de prueba:');
  console.log(JSON.stringify(testData, null, 2));
  console.log('\n' + '='.repeat(60) + '\n');

  try {
    console.log('⏳ Enviando petición...\n');
    
    const startTime = Date.now();
    const response = await fetchWithTimeout(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    }, 30000); // 30 segundos timeout

    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log(`⏱️  Tiempo de respuesta: ${duration}ms\n`);

    const responseText = await response.text();
    let responseData;

    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      console.error('❌ Error: La respuesta no es JSON válido');
      console.log('Respuesta recibida:');
      console.log(responseText);
      process.exit(1);
    }

    console.log(`📊 Status: ${response.status} ${response.statusText}\n`);

    if (response.ok) {
      console.log('✅ ¡Éxito! Endpoint funcionando correctamente\n');
      console.log('📄 Respuesta:');
      console.log(JSON.stringify(responseData, null, 2));
      
      if (responseData.savedTo) {
        console.log(`\n💾 Guardado en: ${responseData.savedTo}`);
      }
      
      if (responseData.warning) {
        console.log(`\n⚠️  Advertencia: ${responseData.warning}`);
      }
      
      if (responseData.data && responseData.data.id) {
        console.log(`\n🆔 ID del lead: ${responseData.data.id}`);
      }
      
      console.log('\n' + '='.repeat(60) + '\n');
      console.log('🎉 Prueba completada exitosamente!\n');
      return true;
    } else {
      console.error('❌ Error: El endpoint devolvió un error\n');
      console.log('📄 Respuesta de error:');
      console.log(JSON.stringify(responseData, null, 2));
      console.log('\n' + '='.repeat(60) + '\n');
      
      if (response.status === 400) {
        console.log('💡 Sugerencia: Verifica que los datos de prueba sean válidos');
      } else if (response.status === 500) {
        console.log('💡 Sugerencia: Revisa los logs del servidor para más detalles');
      }
      
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Error al probar el endpoint:\n');
    
    if (error.name === 'TimeoutError' || error.name === 'NetworkError') {
      console.error(`   ${error.message}\n`);
      console.log('💡 Posibles causas:');
      console.log('   - El servidor no está corriendo (¿ejecutaste "npm run dev"?)');
      console.log('   - Problema de conexión a internet');
      console.log('   - La URL del endpoint es incorrecta');
      console.log('\n💡 Solución:');
      console.log('   1. Asegúrate de que el servidor esté corriendo:');
      console.log('      cd Assesment && npm run dev');
      console.log('   2. Verifica que la URL sea correcta:');
      console.log(`      ${API_URL}`);
    } else {
      console.error(`   ${error.message}\n`);
    }
    
    console.log('\n' + '='.repeat(60) + '\n');
    process.exit(1);
  }
}

// Ejecutar prueba
testEndpoint();

