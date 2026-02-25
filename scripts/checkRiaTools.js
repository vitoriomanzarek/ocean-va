/**
 * Script para verificar los tools actuales de Ria
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔍 Buscando información de Ria...\n');

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

  const ria = allVAs.find((v) => {
    const name = (v.fieldData.name || '').toLowerCase();
    const slug = (v.fieldData.slug || '').toLowerCase();
    return name === 'ria' || slug === 'ria' || name.includes('ria');
  });

  if (!ria) {
    console.error('❌ No se encontró a Ria en la colección de VAs');
    console.log('\nVAs encontrados con nombres similares:');
    allVAs.forEach(v => {
      const name = (v.fieldData.name || '').toLowerCase();
      if (name.includes('r')) {
        console.log(`  - ${v.fieldData.name} (slug: ${v.fieldData.slug})`);
      }
    });
    return;
  }

  console.log(`✅ Ria encontrada: ${ria.fieldData.name}`);
  console.log(`   Slug: ${ria.fieldData.slug}`);
  console.log(`   ID: ${ria.id}\n`);

  const toolsTags = ria.fieldData['tools-tags'] || '';
  const toolsRichtext = ria.fieldData['tools-richtext'] || '';

  console.log('════════ TOOLS ACTUALES ════════\n');
  console.log('Tools Tags:', toolsTags);
  console.log('\nTools RichText (HTML):');
  console.log(toolsRichtext);
  
  // Extraer tools del HTML
  const toolMatches = toolsRichtext.match(/<span>([^<]+)<\/span>/g);
  if (toolMatches) {
    const tools = toolMatches.map(match => match.replace(/<\/?span>/g, '').trim());
    console.log('\n════════ TOOLS EXTRAÍDOS ════════\n');
    console.log(`Total de tools: ${tools.length}`);
    tools.forEach((tool, idx) => {
      console.log(`${idx + 1}. ${tool}`);
    });
  }
}

main().catch(console.error);
