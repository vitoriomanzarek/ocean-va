/**
 * Script para probar el endpoint /api/quiz/submit en Vercel
 * 
 * Uso:
 * node scripts/test-endpoint-vercel.js https://tu-proyecto.vercel.app
 * 
 * O configura la URL como variable de entorno:
 * VERCEL_URL=https://tu-proyecto.vercel.app node scripts/test-endpoint-vercel.js
 */

import 'dotenv/config';
import { fetchWithTimeout } from './fetch-with-timeout.js';

// Obtener URL de Vercel desde argumentos o variable de entorno
const vercelUrl = process.argv[2] || process.env.VERCEL_URL;

if (!vercelUrl) {
  console.error('❌ Error: Debes proporcionar la URL de Vercel\n');
  console.log('Uso:');
  console.log('  node scripts/test-endpoint-vercel.js https://tu-proyecto.vercel.app');
  console.log('\nO con variable de entorno:');
  console.log('  VERCEL_URL=https://tu-proyecto.vercel.app node scripts/test-endpoint-vercel.js');
  process.exit(1);
}

// Limpiar la URL (quitar / al final si existe)
const baseUrl = vercelUrl.replace(/\/$/, '');
const API_URL = `${baseUrl}/api/quiz/submit`;

// Datos de prueba
const testData = {
  contact: {
    name: 'Test User Vercel',
    email: `test-vercel-${Date.now()}@example.com`,
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
  console.log('🧪 Probando endpoint en Vercel...\n');
  console.log(`📍 URL: ${API_URL}\n`);
  console.log('📦 Datos de prueba:');
  console.log(JSON.stringify(testData, null, 2));
  console.log('\n' + '='.repeat(60) + '\n');

  try {
    console.log('⏳ Enviando petición a Vercel...\n');
    
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
      console.log('✅ ¡Éxito! Endpoint funcionando correctamente en Vercel\n');
      console.log('📄 Respuesta:');
      console.log(JSON.stringify(responseData, null, 2));
      
      if (responseData.savedTo) {
        console.log(`\n💾 Guardado en: ${responseData.savedTo}`);
        if (responseData.savedTo === 'webflow') {
          console.log('   ✅ Datos guardados correctamente en Webflow CMS');
        } else {
          console.log('   ⚠️  Datos guardados localmente (fallback)');
        }
      }
      
      if (responseData.warning) {
        console.log(`\n⚠️  Advertencia: ${responseData.warning}`);
      }
      
      if (responseData.data && responseData.data.id) {
        console.log(`\n🆔 ID del lead: ${responseData.data.id}`);
      }
      
      console.log('\n' + '='.repeat(60) + '\n');
      console.log('🎉 Prueba completada exitosamente en Vercel!\n');
      console.log('💡 Verifica en Webflow CMS que el lead se haya creado correctamente.\n');
      return true;
    } else {
      console.error('❌ Error: El endpoint devolvió un error\n');
      console.log('📄 Respuesta de error:');
      console.log(JSON.stringify(responseData, null, 2));
      console.log('\n' + '='.repeat(60) + '\n');
      
      if (response.status === 400) {
        console.log('💡 Sugerencia: Verifica que los datos de prueba sean válidos');
      } else if (response.status === 401) {
        console.log('💡 Sugerencia: Verifica que las variables de entorno estén configuradas en Vercel');
        console.log('   - Ve a Vercel Dashboard → Settings → Environment Variables');
      } else if (response.status === 500) {
        console.log('💡 Sugerencia: Revisa los logs de Vercel para más detalles');
        console.log('   - Ve a Vercel Dashboard → Deployments → Functions');
      }
      
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Error al probar el endpoint:\n');
    
    if (error.name === 'TimeoutError' || error.name === 'NetworkError') {
      console.error(`   ${error.message}\n`);
      console.log('💡 Posibles causas:');
      console.log('   - El proyecto no está desplegado en Vercel');
      console.log('   - La URL de Vercel es incorrecta');
      console.log('   - Problema de conexión a internet');
      console.log('   - El deployment de Vercel falló (revisa los logs)');
      console.log('\n💡 Solución:');
      console.log('   1. Verifica que el proyecto esté desplegado:');
      console.log('      vercel --prod');
      console.log('   2. Verifica que la URL sea correcta:');
      console.log(`      ${API_URL}`);
      console.log('   3. Revisa los logs de Vercel para ver si hay errores');
    } else {
      console.error(`   ${error.message}\n`);
    }
    
    console.log('\n' + '='.repeat(60) + '\n');
    process.exit(1);
  }
}

// Ejecutar prueba
testEndpoint();

