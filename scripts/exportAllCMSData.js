/**
 * Script para exportar TODA la data del CMS y compararla con Drue como referencia
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import fs from 'fs';
import path from 'path';

dotenv.config();

const SITE_ID = process.env.WEBFLOW_SITE_ID;
const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN;

async function main() {
  console.log('📤 Exportando toda la data del CMS...\n');
  
  const apiClient = new WebflowApiClient(WEBFLOW_API_TOKEN);
  
  const site = await apiClient.getSite(SITE_ID);
  console.log(`📍 Sitio: ${site.displayName} (${site.id})\n`);
  
  const collectionsResponse = await apiClient.getCollections(SITE_ID);
  const vaCollection = collectionsResponse.collections.find(c => c.slug === 'virtual-assistants');
  if (!vaCollection) {
    console.error('❌ Collection "Virtual Assistants" no encontrada');
    return;
  }
  
  console.log(`📍 Virtual Assistants Collection ID: ${vaCollection.id}\n`);
  
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
  
  console.log(`✅ Total VAs en CMS: ${allVAs.length}\n`);
  
  // Exportar toda la data
  const exportedData = allVAs.map(va => ({
    cmsId: va.id,
    name: va.fieldData.name || '',
    slug: va.fieldData.slug || '',
    fields: {
      // Campos principales
      'tools-tags': va.fieldData['tools-tags'] || '',
      'tools-richtext': va.fieldData['tools-richtext'] || '',
      'equipment-tags': va.fieldData['equipment-tags'] || '',
      'equipment-richtext': va.fieldData['equipment-richtext'] || '',
      'video-thumbnail-2': va.fieldData['video-thumbnail-2'] || '',
      'video': va.fieldData['video'] || '',
      'employment-summary': va.fieldData['employment-summary'] || '',
      'employment-richtext': va.fieldData['employment-richtext'] || '',
      'education-richtext': va.fieldData['education-richtext'] || '',
      'disc-type-2': va.fieldData['disc-type-2'] || '',
      'english-score-3': va.fieldData['english-score-3'] || '',
      'english-description': va.fieldData['english-description'] || '',
    },
    // Longitudes para análisis rápido
    lengths: {
      'tools-richtext': (va.fieldData['tools-richtext'] || '').length,
      'equipment-richtext': (va.fieldData['equipment-richtext'] || '').length,
      'employment-richtext': (va.fieldData['employment-richtext'] || '').length,
      'education-richtext': (va.fieldData['education-richtext'] || '').length,
    },
    // Flags para análisis
    flags: {
      hasToolsTags: !!(va.fieldData['tools-tags'] && va.fieldData['tools-tags'].trim()),
      hasToolsRichtext: !!(va.fieldData['tools-richtext'] && va.fieldData['tools-richtext'].trim()),
      hasEquipmentTags: !!(va.fieldData['equipment-tags'] && va.fieldData['equipment-tags'].trim()),
      hasEquipmentRichtext: !!(va.fieldData['equipment-richtext'] && va.fieldData['equipment-richtext'].trim()),
      hasVideoThumbnail: !!(va.fieldData['video-thumbnail-2'] && va.fieldData['video-thumbnail-2'].trim()),
      hasVideo: !!(va.fieldData['video'] && va.fieldData['video'].trim()),
      hasEmploymentSummary: !!(va.fieldData['employment-summary'] && va.fieldData['employment-summary'].trim()),
      hasEmploymentRichtext: !!(va.fieldData['employment-richtext'] && va.fieldData['employment-richtext'].trim()),
      hasEducationRichtext: !!(va.fieldData['education-richtext'] && va.fieldData['education-richtext'].trim()),
      hasDiscType: !!(va.fieldData['disc-type-2'] && va.fieldData['disc-type-2'].trim()),
      hasEnglishScore: !!(va.fieldData['english-score-3'] && va.fieldData['english-score-3'].trim()),
      employmentHasAccordion: (va.fieldData['employment-richtext'] || '').includes('va-employment-accordion'),
      educationHasItem: (va.fieldData['education-richtext'] || '').includes('va-education-item'),
    }
  }));
  
  // Guardar export completo
  const exportPath = path.join(process.cwd(), 'src/data/cms-export-completo.json');
  fs.writeFileSync(exportPath, JSON.stringify(exportedData, null, 2), 'utf-8');
  
  console.log(`✅ Data exportada a: ${exportPath}\n`);
  
  // Generar reporte de análisis
  const report = {
    total: exportedData.length,
    stats: {
      hasToolsRichtext: exportedData.filter(v => v.flags.hasToolsRichtext).length,
      hasEquipmentRichtext: exportedData.filter(v => v.flags.hasEquipmentRichtext).length,
      hasVideoThumbnail: exportedData.filter(v => v.flags.hasVideoThumbnail).length,
      hasEmploymentRichtext: exportedData.filter(v => v.flags.hasEmploymentRichtext).length,
      hasEducationRichtext: exportedData.filter(v => v.flags.hasEducationRichtext).length,
      hasDiscType: exportedData.filter(v => v.flags.hasDiscType).length,
      hasEnglishScore: exportedData.filter(v => v.flags.hasEnglishScore).length,
      employmentHasAccordion: exportedData.filter(v => v.flags.employmentHasAccordion).length,
      educationHasItem: exportedData.filter(v => v.flags.educationHasItem).length,
    },
    issues: {
      hasToolsTagsButNoRichtext: exportedData.filter(v => v.flags.hasToolsTags && !v.flags.hasToolsRichtext),
      hasEquipmentTagsButNoRichtext: exportedData.filter(v => v.flags.hasEquipmentTags && !v.flags.hasEquipmentRichtext),
      hasVideoButNoThumbnail: exportedData.filter(v => v.flags.hasVideo && !v.flags.hasVideoThumbnail),
      hasEmploymentButNoAccordion: exportedData.filter(v => v.flags.hasEmploymentRichtext && !v.flags.employmentHasAccordion),
      hasEducationButNoItem: exportedData.filter(v => v.flags.hasEducationRichtext && !v.flags.educationHasItem),
      missingEnglishScore: exportedData.filter(v => !v.flags.hasEnglishScore),
    }
  };
  
  const reportPath = path.join(process.cwd(), 'src/data/cms-analysis-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
  
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📊 REPORTE DE ANÁLISIS');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  console.log('ESTADÍSTICAS:');
  console.log(`   Total VAs: ${report.total}`);
  console.log(`   Con Tools Richtext: ${report.stats.hasToolsRichtext}`);
  console.log(`   Con Equipment Richtext: ${report.stats.hasEquipmentRichtext}`);
  console.log(`   Con Video Thumbnail: ${report.stats.hasVideoThumbnail}`);
  console.log(`   Con Employment Richtext: ${report.stats.hasEmploymentRichtext}`);
  console.log(`   Con Education Richtext: ${report.stats.hasEducationRichtext}`);
  console.log(`   Con DISC Type: ${report.stats.hasDiscType}`);
  console.log(`   Con English Score: ${report.stats.hasEnglishScore}`);
  console.log(`   Employment con Accordion: ${report.stats.employmentHasAccordion}`);
  console.log(`   Education con Item: ${report.stats.educationHasItem}\n`);
  
  console.log('PROBLEMAS IDENTIFICADOS:');
  console.log(`   VAs con Tools Tags pero sin Richtext: ${report.issues.hasToolsTagsButNoRichtext.length}`);
  console.log(`   VAs con Equipment Tags pero sin Richtext: ${report.issues.hasEquipmentTagsButNoRichtext.length}`);
  console.log(`   VAs con Video pero sin Thumbnail: ${report.issues.hasVideoButNoThumbnail.length}`);
  console.log(`   VAs con Employment pero sin Accordion: ${report.issues.hasEmploymentButNoAccordion.length}`);
  console.log(`   VAs con Education pero sin Item: ${report.issues.hasEducationButNoItem.length}`);
  console.log(`   VAs sin English Score: ${report.issues.missingEnglishScore.length}\n`);
  
  console.log(`✅ Reporte guardado en: ${reportPath}\n`);
}

main().catch(console.error);
