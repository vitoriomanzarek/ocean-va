/**
 * Script para verificar los campos de Ellie
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  const apiClient = new WebflowApiClient(WEBFLOW_API_TOKEN);
  const collectionsResponse = await apiClient.getCollections(SITE_ID);
  const vaCollection = collectionsResponse.collections.find((c) => c.slug === 'virtual-assistants');

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

  const ellie = allVAs.find((v) => {
    const name = (v.fieldData.name || '').toLowerCase();
    return name === 'ellie';
  });

  if (!ellie) {
    console.error('❌ No se encontró a Ellie');
    return;
  }

  console.log('════════ CAMPOS DE ELLIE ════════\n');
  console.log(JSON.stringify(ellie.fieldData, null, 2));
}

main().catch(console.error);
