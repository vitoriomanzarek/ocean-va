/**
 * Debug the 3 VAs with validation errors
 * Run with: node scripts/debugVAsErrors.js
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import { vasData } from '../src/data/vasData.js';
import fs from 'fs';

dotenv.config();

const token = process.env.WEBFLOW_API_TOKEN;
if (!token) {
  console.error('❌ WEBFLOW_API_TOKEN not found in .env');
  process.exit(1);
}

const client = new WebflowApiClient(token);

// The 3 VAs with errors
const problematicVAs = ['Maria Paula', 'Ana Victoria', 'Maria D.'];

async function main() {
  try {
    console.log('🔍 Debugging problematic VAs...\n');

    // Get sites and collection ID
    const sitesResponse = await client.getSites();
    const site = sitesResponse.sites[0];

    const collectionsResponse = await client.getCollections(site.id);
    const vaCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'virtual-assistants'
    );

    console.log(`📍 Collection: Virtual Assistants\n`);

    // Read the webflow export file
    const webflowExport = JSON.parse(fs.readFileSync('webflow-vas-export.json', 'utf-8'));

    for (const vaName of problematicVAs) {
      console.log('═'.repeat(80));
      console.log(`\n🔴 VA: ${vaName}\n`);

      const va = vasData.find((v) => v.nombre === vaName);
      const webflowVA = webflowExport.vas.find((wva) => wva.fieldData.name === vaName);

      if (!va) {
        console.log(`❌ Not found in vasData.js`);
        continue;
      }

      if (!webflowVA) {
        console.log(`❌ Not found in Webflow`);
        continue;
      }

      console.log('📊 vasData.js info:');
      console.log(`   nombre: ${va.nombre}`);
      console.log(`   categoría_principal: ${va.categoría_principal}`);
      console.log(`   idiomas: ${va.idiomas}`);
      console.log(`   años_experiencia: ${va.años_experiencia}`);
      console.log(`   especialización: [${va.especialización.join(', ')}]`);
      console.log(`   nivel_inglés: ${va.nivel_inglés}`);
      console.log(`   disponibilidad: ${va.disponibilidad}`);
      console.log(`   imagen: ${va.imagen}`);
      console.log(`   slug: ${va.slug}`);
      console.log(`   videoUrl: ${va.videoUrl || 'N/A'}`);

      console.log('\n📊 Webflow current data:');
      console.log(JSON.stringify(webflowVA.fieldData, null, 2));

      console.log('\n🔧 Attempting update with detailed logging...');

      try {
        const fieldData = {
          'name': va.nombre,
          'main-category': va.categoría_principal,
          'title': va.categoría_principal,
          'experience-years': `${va.años_experiencia} years`,
          'languages': va.idiomas,
          'availability': va.disponibilidad,
          'image': va.imagen,
          'profile-slug': va.slug,
          'slug': va.slug.split('-')[0],
          'video-url': va.videoUrl || null,
        };

        console.log('\n📝 Attempting to send:');
        console.log(JSON.stringify(fieldData, null, 2));

        await client.updateCollectionItem(vaCollection.id, webflowVA.id, fieldData, {
          isDraft: false,
        });

        console.log('\n✅ Update successful!');
      } catch (error) {
        console.log(`\n❌ Error: ${error.message}`);
        console.log('\n💡 Possible causes:');
        console.log('   1. Field type mismatch (e.g., sending null to required field)');
        console.log('   2. Invalid field name or slug');
        console.log('   3. Field validation rules (e.g., max length exceeded)');
        console.log('   4. Special characters in field values');
      }
    }

    console.log('\n' + '═'.repeat(80));

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
