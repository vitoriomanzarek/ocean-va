/**
 * Script para verificar el estado actual de Maria en el CMS
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('🔍 Verificando estado de Maria en el CMS...\n');

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

  const maria = allVAs.find((v) => {
    const slug = (v.fieldData.slug || '').toLowerCase().trim();
    return slug === 'maria';
  });

  if (!maria) {
    console.error('❌ No se encontró a Maria (maria) en la colección de VAs');
    return;
  }

  console.log(`✅ Maria encontrada: ${maria.fieldData.name}`);
  console.log(`   Slug: ${maria.fieldData.slug}`);
  console.log(`   ID: ${maria.id}`);
  console.log(`   Estado: ${maria.isArchived ? 'Archivado' : 'Activo'}`);
  console.log(`   Publicado: ${maria.isDraft ? 'No' : 'Sí'}\n`);

  const employment = maria.fieldData['employment-richtext'] || '';
  const education = maria.fieldData['education-richtext'] || '';

  console.log('════════ EMPLOYMENT RICHTEXT ════════');
  console.log(`Longitud: ${employment.length} caracteres`);
  console.log(`Primeros 300 caracteres:`);
  console.log(employment.substring(0, 300) + '...\n');

  console.log('════════ EDUCATION RICHTEXT ════════');
  console.log(`Longitud: ${education.length} caracteres`);
  console.log(`Contenido completo:`);
  console.log(education + '\n');

  // Verificar si tiene el formato de acordeón
  const hasAccordion = employment.includes('va-employment-accordion');
  const hasList = employment.includes('va-employment-list');
  const accordionCount = (employment.match(/va-employment-accordion/g) || []).length;

  console.log('════════ VERIFICACIÓN DE FORMATO ════════');
  console.log(`¿Tiene formato acordeón? ${hasAccordion ? '✅ Sí' : '❌ No'}`);
  console.log(`¿Tiene contenedor de lista? ${hasList ? '✅ Sí' : '❌ No'}`);
  console.log(`Número de acordeones encontrados: ${accordionCount / 2} (cada acordeón aparece 2 veces en el HTML)`);
}

main().catch(console.error);
