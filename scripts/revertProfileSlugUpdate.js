/**
 * Script para revertir los cambios del profile-slug-2
 * Restaura los valores originales basándose en los patrones observados
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

// Valores originales basados en el output anterior
// Formato: nombre del VA: valor original
const originalValues = {
  'Drue': 'https://www.oceanvirtualassistant.com/drue-ocean-va-profile',
  'Charley': 'https://www.oceanvirtualassistant.com/charley-ocean-va-profile',
  'Karl Loyd': 'https://www.oceanvirtualassistant.com/karl-loyd-ocean-va-profile',
  'Karl': 'https://www.oceanvirtualassistant.com/karl-ocean-va-profile',
  'Kempee': 'https://www.oceanvirtualassistant.com/kempee-ocean-va-profile',
  'Patricia Nicole': '/patricia-nicole-ocean-va-profile',
  'Alyssa': '/alyssa-ocean-va-profile',
  'Maria Christine': '/maria-christine-ocean-va-profile',
  'Ella': '/ella-ocean-va-profile',
  'Gabriela': '/gabriela-ocean-va-profile',
  'Louise': '/louise-ocean-va-profile',
  'Randean': '/randean-ocean-va-profile',
  'Maridel': '/maridel-ocean-va-profile',
  'Jane': '/jane-ocean-va-profile',
  'Joy': '/joy-ocean-va-profile',
  'Joan Rose': '/joan-rose-ocean-va-profile',
  'Samantha': '/samantha-ocean-va-profile',
  'Patricio': '/patricio-ocean-va-profile',
  'Marco': '/marco-ocean-va-profile',
  'Jose Luis': '/jose-luis-ocean-va-profile',
  'Jomer': '/jomer-daniel-ocean-va-profile',
  'Hugo': '/hugo-ocean-va-profile',
  'Gael': '/gael-ocean-va-profile',
  'Fabiola': '/fabiola-ocean-va-profile',
  'Branko': '/branko-ocean-va-profile',
  'Angel': '/angel-ocean-va-profile',
  'Ana Gabriela': '/ana-gabriela-ocean-va-profile',
  'Ximena': '/ximena-ocean-va-profile',
  'Mina': '/mina-ocean-va-profile',
  'AC': '/ac-ocean-va-profile',
  'Grace': '/grace-carmel-ocean-va-profile',
  'Yvette': '/yvette-ocean-va-profile',
  'Anahi': '/anahi-ocean-va-profile',
  'Tricia': '/tricia-ocean-va-profile',
  'Ximena G.': '/ximena-g-ocean-va-profile',
  'Sandra': '/sandra-ocean-va-profile',
  'Rochelle': '/rochelle-ocean-va-profile',
  'Rejean': '/rejean-ocean-va-profile',
  'Rainier': '/rainier-ocean-va-profile',
  'Rafael': '/rafael-ocean-va-profile',
  'Patricia': '/patricia-ocean-va-profile',
  'Melissa': '/melissa-ocean-va-profile',
  'Maria': '/maria-ocean-va-profile',
  'Maria D.': '/maria-d-ocean-va-profile',
  'Lois': '/lois-ocean-va-profile',
  'Kevin': '/kevin-ocean-va-profile',
  'Janice': '/janice-ocean-va-profile',
  'Israel': '/israel-ocean-va-profile',
  'Guillermo': '/guillermo-ocean-va-profile',
  'Gonzalo': '/gonzalo-ocean-va-profile',
  'Fernanda': '/fernanda-ocean-va-profile',
  'Ellen': '/ellen-rose-ocean-va-profile',
  'Dayana': '/dayana-ocean-va-profile',
  'Dawn': '/dawn-ocean-va-profile',
  'Christine': '/christine-ocean-va-profile',
  'Carolina': '/carolina-ocean-va-profile',
  'Brandon L.': '/brandon-l-ocean-va-profile',
  'Balbina': '/balbina-ocean-va-profile',
  'Ana Victoria': '/ana-victoria-ocean-va-profile',
  'Ana': '/ana-s-ocean-va-profile',
  'Pavel': '/pavel-ocean-va-profile',
  'Jill': '/jill-ocean-va-profile',
  'Jasmine': '/jasmine-ocean-va-profile',
  'Gizelle': '/gizelle-ocean-va-profile',
  'Rona Mae': '/rona-mae-ocean-va-profile',
  'Raydon': '/raydon-ocean-va-profile',
  'Michelle': '/michelle-ocean-va-profile',
  'Ma. Venus': '/ma-venus-ocean-va-profile',
  'Lorenz': '/lorenz-ocean-va-profile',
  'Laurice': '/laurice-ocean-va-profile',
  'Joji Marie': '/joji-marie-ocean-va-profile',
  'Joel': '/joel-ocean-va-profile',
  'Jimmy': '/jimmy-ocean-va-profile',
  'Jerome': '/jerome-ocean-va-profile',
  'Javier': '/javier-ocean-va-profile',
  'Jay Alvin': '/jay-alvin-ocean-va-profile',
  'Geraldine': '/geraldine-ocean-va-profile',
  'Francis': '/francis-ocean-va-profile',
  'Emmanuel': '/emmanuel-ocean-va-profile',
  'Cherry Mae': '/cherry-mae-ocean-va-profile',
  'Antonio': '/antonio-ocean-va-profile',
  'Abigail': '/abigail-ocean-va-profile',
  'Moises': '/moises-ocean-va-profile',
  'Maria Paula': '/maria-paula-ocean-va-profile',
  'Karen': '/karen-ocean-va-profile',
  'Joana': '/joana-ocean-va-profile',
  'Ivan': '/ivan-ocean-va-profile',
  'Dafne': '/dafne-ocean-va-profile',
  'Alejandro': '/alejandro-ocean-va-profile',
  'Adrian': '/adrian-ocean-va-profile',
};

async function main() {
  console.log('🔄 Revirtiendo cambios en profile-slug-2...\n');
  
  const apiClient = new WebflowApiClient(WEBFLOW_API_TOKEN);
  const site = await apiClient.getSite(SITE_ID);
  const collectionsResponse = await apiClient.getCollections(SITE_ID);
  const vaCollection = collectionsResponse.collections.find(c => c.slug === 'virtual-assistants');
  
  if (!vaCollection) {
    console.error('❌ Colección "Virtual Assistants" no encontrada');
    return;
  }
  
  // Obtener todos los VAs
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
  
  console.log(`✅ Total VAs encontrados: ${allVAs.length}\n`);
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('🔄 REVIRTIENDO CAMBIOS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  let reverted = 0;
  let skipped = 0;
  let errors = 0;
  let notFound = 0;
  
  for (const va of allVAs) {
    const name = va.fieldData.name || 'N/A';
    const currentValue = va.fieldData['profile-slug-2'] || '';
    
    // Buscar valor original
    const originalValue = originalValues[name];
    
    if (!originalValue) {
      // Si no está en la lista, verificar si el valor actual es el formato nuevo
      // (formato: {slug}-ocean-va-profile)
      const slug = va.fieldData.slug || '';
      const newFormat = `${slug}-ocean-va-profile`;
      
      if (currentValue === newFormat) {
        // Este VA fue actualizado pero no tenemos el valor original
        // Podemos dejarlo vacío o usar un formato por defecto
        console.log(`⚠️  ${name}: No se encontró valor original, dejando vacío`);
        try {
          await apiClient.updateCollectionItem(vaCollection.id, va.id, {
            'profile-slug-2': ''
          });
          reverted++;
        } catch (error) {
          console.error(`❌ ${name}: Error - ${error.message}`);
          errors++;
        }
        notFound++;
      } else {
        console.log(`✓ ${name}: No fue actualizado o ya tiene valor diferente`);
        skipped++;
      }
      continue;
    }
    
    // Si el valor actual es diferente al original, revertir
    if (currentValue !== originalValue) {
      try {
        await apiClient.updateCollectionItem(vaCollection.id, va.id, {
          'profile-slug-2': originalValue
        });
        console.log(`✓ ${name}: ${currentValue} → ${originalValue}`);
        reverted++;
      } catch (error) {
        console.error(`❌ ${name}: Error - ${error.message}`);
        errors++;
      }
    } else {
      console.log(`✓ ${name}: Ya tiene el valor original`);
      skipped++;
    }
  }
  
  console.log('\n════════════════════════════════════════════════════════════════════════════════');
  console.log('📊 RESUMEN');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  console.log(`   Total VAs: ${allVAs.length}`);
  console.log(`   Revertidos: ${reverted}`);
  console.log(`   Omitidos (ya correctos): ${skipped}`);
  console.log(`   Sin valor original encontrado: ${notFound}`);
  console.log(`   Errores: ${errors}`);
  console.log('\n⚠️  Nota: Algunos VAs pueden haber quedado vacíos si no se encontró su valor original.');
}

main().catch(console.error);
