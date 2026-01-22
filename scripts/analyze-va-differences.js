/**
 * Comprehensive analysis of VA profile differences
 * Compares old vs new URLs, template structure, and CMS data
 */

import fs from 'fs';
import path from 'path';

const OLD_URLS = [
  'ac-ocean-va-profile',
  'aaron-ocean-va-profile',
  'abigail-ocean-va-profile',
  'albert-ocean-va-profile',
  'alejandro-ocean-va-profile',
  'alyssa-ocean-va-profile',
  'ana-s-ocean-va-profile',
  'ana-gabriela-ocean-va-profile',
  'ana-victoria-ocean-va-profile',
  'anahi-ocean-va-profile',
  'andrea-ocean-va-profile',
  'andres-ocean-va-profile',
  'angel-ocean-va-profile',
  'antonio-ocean-va-profile',
  'balbina-ocean-va-profile',
  'bernadette-ocean-va-profile',
  'brandon-l-ocean-va-profile',
  'branko-ocean-va-profile',
  'charley-ocean-va-profile',
  'cherry-mae-ocean-va-profile',
  'christine-ocean-va-profile',
  'dafne-ocean-va-profile',
  'dawn-ocean-va-profile',
  'dayana-ocean-va-profile',
  'drue-ocean-va-profile',
  'ella-ocean-va-profile',
  'ellen-rose-ocean-va-profile',
  'emmanuel-ocean-va-profile',
  'fabiola-ocean-va-profile',
  'fernanda-ocean-va-profile',
  'francis-ocean-va-profile',
  'francis-aldrin-ocean-va-profile',
  'gabriela-ocean-va-profile',
  'gael-ocean-va-profile',
  'geraldine-ocean-va-profile',
  'gizelle-ocean-va-profile',
  'gonzalo-ocean-va-profile',
  'grace-carmel-ocean-va-profile',
  'guillermo-ocean-va-profile',
  'hugo-ocean-va-profile',
  'israel-ocean-va-profile',
  'ivan-ocean-va-profile',
  'jane-ocean-va-profile',
  'janet-ocean-va-profile',
  'janice-ocean-va-profile',
  'jasmine-ocean-va-profile',
  'javier-ocean-va-profile',
  'jay-alvin-ocean-va-profile',
  'jerome-ocean-va-profile',
  'jill-ocean-va-profile',
  'jimmy-ocean-va-profile',
  'joan-rose-ocean-va-profile',
  'joana-ocean-va-profile',
  'joel-ocean-va-profile',
  'joji-marie-ocean-va-profile',
  'jomer-daniel-ocean-va-profile',
  'jose-luis-ocean-va-profile',
  'joy-ocean-va-profile',
  'juname-ocean-va-profile',
  'karen-ocean-va-profile',
  'karl-ocean-va-profile',
  'karl-loyd-ocean-va-profile',
  'kathleen-ocean-va-profile',
  'kempee-ocean-va-profile',
  'kevin-ocean-va-profile',
  'lady-ann-ocean-va-profile',
  'laurice-ocean-va-profile',
  'lois-ocean-va-profile',
  'lorenz-ocean-va-profile',
  'louise-ocean-va-profile',
  'ma-venus-ocean-va-profile',
  'marco-ocean-va-profile',
  'maria-ocean-va-profile',
  'maria-christine-ocean-va-profile',
  'maria-paula-ocean-va-profile',
  'maridel-ocean-va-profile',
  'arlene-ocean-va-profile',
  'melissa-ocean-va-profile',
  'michelle-ocean-va-profile',
  'mina-ocean-va-profile',
  'moises-ocean-va-profile',
  'patricia-ocean-va-profile',
  'patricia-nicole-ocean-va-profile',
  'patricio-ocean-va-profile',
  'pavel-ocean-va-profile',
  'rafael-ocean-va-profile',
  'rainier-ocean-va-profile',
  'randean-ocean-va-profile',
  'raydon-ocean-va-profile',
  'rejean-ocean-va-profile',
  'rochelle-ocean-va-profile',
  'rona-mae-ocean-va-profile',
  'ruel-ocean-va-profile',
  'samantha-ocean-va-profile',
  'sandra-ocean-va-profile',
  'sheila-marie-ocean-va-profile',
  'tricia-ocean-va-profile',
  'vicente-ocean-va-profile',
  'ximena-ocean-va-profile',
  'ximena-g-ocean-va-profile',
  'yvette-ocean-va-profile',
];

const NEW_URLS = [
  'ac',
  'aaron-a0d16',
  'abigail',
  'albert',
  'alejandro',
  'alyssa',
  'ana',
  'ana-gabriela',
  'ana-victoria',
  'anahi',
  'andrea',
  'andres',
  'angel',
  'antonio',
  'balbina',
  'bernadette-abellana',
  'brandon',
  'branko',
  'charley',
  'cherry',
  'christine',
  'dafne',
  'dawn',
  'dayana',
  'drue',
  'ella',
  'ellen',
  'emmanuel',
  'fabiola',
  'fernanda',
  'francis',
  'francis-aldrin',
  'gabriela',
  'gael',
  'geraldine',
  'gizelle',
  'gonzalo',
  'grace',
  'guillermo',
  'hugo',
  'israel',
  'ivan',
  'jane',
  'janet',
  'janice',
  'jasmine',
  'javier',
  'jay',
  'jerome',
  'jill',
  'jimmy',
  'joan-rose',
  'joana',
  'joel',
  'joji',
  'jomer-daniel',
  'jose-luis',
  'joy',
  'juname',
  'karen',
  'karl-bd0a3',
  'karl-loyd',
  'kathleen',
  'kempee',
  'kevin',
  'lady-ann',
  'laurice',
  'lois',
  'lorenz',
  'louise-a-siloterio',
  'ma-venus',
  'marco',
  'maria',
  'maria-christine',
  'maria-paula',
  'maridel',
  'arlene',
  'melissa',
  'michelle',
  'mina',
  'moises',
  'patricia',
  'patricia-nicole',
  'patricio',
  'pavel',
  'rafael',
  'rainier',
  'randean',
  'raydon',
  'rejean',
  'rochelle',
  'rona',
  'ruel',
  'samantha',
  'sandra',
  'sheila-marie',
  'tricia',
  'vicente-penaflor',
  'ximena-4e77d',
  'ximena',
  'yvette',
];

function extractName(slug) {
  return slug.replace('-ocean-va-profile', '').replace(/-/g, ' ');
}

function normalizeName(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function createMapping() {
  const mapping = [];
  
  for (let i = 0; i < OLD_URLS.length; i++) {
    const oldSlug = OLD_URLS[i];
    const newSlug = NEW_URLS[i] || 'NOT_FOUND';
    
    const oldName = extractName(oldSlug);
    const newName = newSlug === 'NOT_FOUND' ? 'NOT_FOUND' : newSlug.replace(/-/g, ' ');
    
    const normalizedOld = normalizeName(oldName);
    const normalizedNew = normalizeName(newName);
    
    mapping.push({
      index: i + 1,
      oldSlug,
      newSlug,
      oldName,
      newName,
      normalizedOld,
      normalizedNew,
      match: normalizedOld === normalizedNew || normalizedOld.includes(normalizedNew) || normalizedNew.includes(normalizedOld),
      differences: [],
    });
  }
  
  return mapping;
}

function analyzeSlugDifferences(mapping) {
  const differences = [];
  
  mapping.forEach((item) => {
    const diff = {
      name: item.oldName,
      oldSlug: item.oldSlug,
      newSlug: item.newSlug,
      type: 'unknown',
      details: '',
    };
    
    // Check for special cases
    if (item.newSlug.includes('-a0d16') || item.newSlug.includes('-bd0a3') || item.newSlug.includes('-4e77d')) {
      diff.type = 'has-suffix-id';
      diff.details = 'New URL has unique identifier suffix';
    } else if (item.oldSlug.includes('-l-') && !item.newSlug.includes('-l-')) {
      diff.type = 'removed-middle-initial';
      diff.details = 'Middle initial removed in new URL';
    } else if (item.oldSlug.includes('-mae') && item.newSlug === 'rona') {
      diff.type = 'name-shortened';
      diff.details = 'Name shortened (rona-mae -> rona)';
    } else if (item.oldSlug.includes('ellen-rose') && item.newSlug === 'ellen') {
      diff.type = 'name-shortened';
      diff.details = 'Name shortened (ellen-rose -> ellen)';
    } else if (item.oldSlug.includes('grace-carmel') && item.newSlug === 'grace') {
      diff.type = 'name-shortened';
      diff.details = 'Name shortened (grace-carmel -> grace)';
    } else if (item.oldSlug.includes('joji-marie') && item.newSlug === 'joji') {
      diff.type = 'name-shortened';
      diff.details = 'Name shortened (joji-marie -> joji)';
    } else if (item.oldSlug.includes('jay-alvin') && item.newSlug === 'jay') {
      diff.type = 'name-shortened';
      diff.details = 'Name shortened (jay-alvin -> jay)';
    } else if (item.oldSlug.includes('cherry-mae') && item.newSlug === 'cherry') {
      diff.type = 'name-shortened';
      diff.details = 'Name shortened (cherry-mae -> cherry)';
    } else if (item.oldSlug.includes('ana-s') && item.newSlug === 'ana') {
      diff.type = 'name-shortened';
      diff.details = 'Name shortened (ana-s -> ana)';
    } else if (item.oldSlug.includes('brandon-l') && item.newSlug === 'brandon') {
      diff.type = 'name-shortened';
      diff.details = 'Name shortened (brandon-l -> brandon)';
    } else if (item.oldSlug.includes('karl-loyd') && item.newSlug === 'karl-loyd') {
      diff.type = 'no-change';
      diff.details = 'No significant change';
    } else if (item.oldSlug !== item.newSlug.replace(/-/g, '-')) {
      diff.type = 'slug-changed';
      diff.details = 'Slug structure changed';
    } else {
      diff.type = 'standard-change';
      diff.details = 'Standard URL structure change (removed -ocean-va-profile suffix)';
    }
    
    if (diff.type !== 'no-change' && diff.type !== 'standard-change') {
      differences.push(diff);
    }
  });
  
  return differences;
}

function readTemplate() {
  try {
    const templatePath = path.join(process.cwd(), 'webflow-components-minified', '313-va-profile-dynamic-template.html');
    const template = fs.readFileSync(templatePath, 'utf-8');
    return template;
  } catch (error) {
    console.error('Error reading template:', error.message);
    return null;
  }
}

function extractTemplateFields(template) {
  if (!template) return [];
  
  const fieldPattern = /\{\{([^}]+)\}\}/g;
  const fields = [];
  let match;
  
  while ((match = fieldPattern.exec(template)) !== null) {
    const fieldName = match[1].trim();
    if (!fields.includes(fieldName)) {
      fields.push(fieldName);
    }
  }
  
  return fields.sort();
}

function compareWithDrueData() {
  try {
    const drueDataPath = path.join(process.cwd(), 'data', 'drue-reference-model.json');
    const drueData = JSON.parse(fs.readFileSync(drueDataPath, 'utf-8'));
    
    return {
      cmsFields: drueData.collectionFields.map((f) => ({
        slug: f.slug,
        displayName: f.displayName,
        type: f.type,
      })),
      drueFields: Object.keys(drueData.drueData.fieldData),
    };
  } catch (error) {
    console.error('Error reading Drue data:', error.message);
    return null;
  }
}

async function main() {
  console.log('🔍 Analyzing VA Profile Differences...\n');
  
  // 1. Create URL mapping
  console.log('📋 Step 1: Creating URL mapping...');
  const mapping = createMapping();
  console.log(`   ✅ Mapped ${mapping.length} profiles\n`);
  
  // 2. Analyze slug differences
  console.log('📋 Step 2: Analyzing slug differences...');
  const slugDifferences = analyzeSlugDifferences(mapping);
  console.log(`   ✅ Found ${slugDifferences.length} significant differences\n`);
  
  // 3. Read template
  console.log('📋 Step 3: Reading template...');
  const template = readTemplate();
  const templateFields = extractTemplateFields(template);
  console.log(`   ✅ Template has ${templateFields.length} field placeholders\n`);
  
  // 4. Compare with Drue data
  console.log('📋 Step 4: Comparing with Drue CMS data...');
  const drueComparison = compareWithDrueData();
  if (drueComparison) {
    console.log(`   ✅ CMS has ${drueComparison.cmsFields.length} fields`);
    console.log(`   ✅ Drue has ${drueComparison.drueFields.length} populated fields\n`);
  }
  
  // 5. Generate report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalProfiles: OLD_URLS.length,
      slugDifferences: slugDifferences.length,
      templateFields: templateFields.length,
      cmsFields: drueComparison?.cmsFields.length || 0,
    },
    urlMapping: mapping,
    slugDifferences,
    templateFields,
    cmsFields: drueComparison?.cmsFields || [],
    drueFields: drueComparison?.drueFields || [],
  };
  
  // Save report
  const reportPath = path.join(process.cwd(), 'reports', 'va-differences-analysis.json');
  if (!fs.existsSync(path.dirname(reportPath))) {
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  }
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  // Display summary
  console.log('═'.repeat(80));
  console.log('📊 ANALYSIS SUMMARY');
  console.log('═'.repeat(80));
  console.log(`Total Profiles: ${report.summary.totalProfiles}`);
  console.log(`URL Differences: ${report.summary.slugDifferences}`);
  console.log(`Template Fields: ${report.summary.templateFields}`);
  console.log(`CMS Fields: ${report.summary.cmsFields}`);
  console.log('\n📝 Significant URL Changes:');
  slugDifferences.forEach((diff) => {
    console.log(`   ${diff.name}:`);
    console.log(`      Old: ${diff.oldSlug}`);
    console.log(`      New: ${diff.newSlug}`);
    console.log(`      Type: ${diff.type}`);
    console.log(`      Details: ${diff.details}`);
    console.log('');
  });
  
  console.log('\n📋 Template Fields:');
  templateFields.forEach((field) => {
    console.log(`   - {{${field}}}`);
  });
  
  console.log('\n💾 Full report saved to: reports/va-differences-analysis.json');
  console.log('═'.repeat(80));
}

main().catch(console.error);
