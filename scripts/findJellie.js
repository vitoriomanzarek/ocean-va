/**
 * Script para encontrar a Jellie en el CMS
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔍 Buscando a Jellie en el CMS...\n');

  const apiClient = new WebflowApiClient(WEBFLOW_API_TOKEN);
  const collectionsResponse = await apiClient.getCollections(SITE_ID);
  const vaCollection = collectionsResponse.collections.find((c) => c.slug === 'virtual-assistants');

  if (!vaCollection) {
    console.error('❌ Colección "virtual-assistants" no encontrada');
    return;
  }

  let allVAs = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const res = await apiClient.getCollectionItems(vaCollection.id, { limit, offset });
    if (!res.items || res.items.length === 0) break;
    allVAs = allVAs.concat(res.items);
    if (res.items.length < limit) break;
    offset += limit;
  }

  console.log(`Total de VAs en CMS: ${allVAs.length}\n`);

  // Buscar variaciones
  const jellie = allVAs.find((v) => {
    const name = (v.fieldData.name || '').toLowerCase();
    const slug = (v.fieldData.slug || '').toLowerCase();
    return name.includes('jell') || name.includes('ellie') || slug.includes('jell') || slug.includes('ellie');
  });

  if (jellie) {
    console.log(`✅ Encontrada: ${jellie.fieldData.name}`);
    console.log(`   Slug: ${jellie.fieldData.slug}`);
    console.log(`   ID: ${jellie.id}`);
    console.log(`   Title: ${jellie.fieldData.title || 'N/A'}`);
  } else {
    console.log('❌ No se encontró a Jellie/Ellie');
    console.log('\nVAs con nombres similares:');
    allVAs.forEach(v => {
      const name = (v.fieldData.name || '').toLowerCase();
      if (name.includes('j') || name.includes('e')) {
        console.log(`  - ${v.fieldData.name} (slug: ${v.fieldData.slug})`);
      }
    });
  }
}

main().catch(console.error);
