/**
 * Check URLs (old vs new) and compare structures
 * Identifies broken URLs and differences between old and new versions
 */

import fs from 'fs';

const OLD_URLS = [
  'https://www.oceanvirtualassistant.com/ac-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/aaron-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/abigail-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/albert-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/alejandro-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/alyssa-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/ana-s-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/ana-gabriela-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/ana-victoria-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/anahi-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/andrea-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/andres-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/angel-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/antonio-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/balbina-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/bernadette-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/brandon-l-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/branko-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/charley-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/cherry-mae-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/christine-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/dafne-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/dawn-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/dayana-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/drue-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/ella-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/ellen-rose-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/emmanuel-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/fabiola-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/fernanda-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/francis-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/francis-aldrin-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/gabriela-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/gael-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/geraldine-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/gizelle-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/gonzalo-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/grace-carmel-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/guillermo-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/hugo-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/israel-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/ivan-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/jane-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/janet-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/janice-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/jasmine-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/javier-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/jay-alvin-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/jerome-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/jill-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/jimmy-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/joan-rose-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/joana-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/joel-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/joji-marie-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/jomer-daniel-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/jose-luis-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/joy-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/juname-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/karen-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/karl-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/karl-loyd-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/kathleen-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/kempee-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/kevin-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/lady-ann-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/laurice-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/lois-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/lorenz-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/louise-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/ma-venus-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/marco-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/maria-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/maria-christine-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/maria-paula-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/maridel-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/arlene-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/melissa-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/michelle-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/mina-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/moises-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/patricia-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/patricia-nicole-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/patricio-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/pavel-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/rafael-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/rainier-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/randean-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/raydon-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/rejean-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/rochelle-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/rona-mae-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/ruel-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/samantha-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/sandra-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/sheila-marie-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/tricia-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/vicente-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/ximena-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/ximena-g-ocean-va-profile',
  'https://www.oceanvirtualassistant.com/yvette-ocean-va-profile',
];

const NEW_URLS = [
  'https://www.oceanvirtualassistant.com/virtual-assistants/ac',
  'https://www.oceanvirtualassistant.com/virtual-assistants/aaron-a0d16',
  'https://www.oceanvirtualassistant.com/virtual-assistants/abigail',
  'https://www.oceanvirtualassistant.com/virtual-assistants/albert',
  'https://www.oceanvirtualassistant.com/virtual-assistants/alejandro',
  'https://www.oceanvirtualassistant.com/virtual-assistants/alyssa',
  'https://www.oceanvirtualassistant.com/virtual-assistants/ana',
  'https://www.oceanvirtualassistant.com/virtual-assistants/ana-gabriela',
  'https://www.oceanvirtualassistant.com/virtual-assistants/ana-victoria',
  'https://www.oceanvirtualassistant.com/virtual-assistants/anahi',
  'https://www.oceanvirtualassistant.com/virtual-assistants/andrea',
  'https://www.oceanvirtualassistant.com/virtual-assistants/andres',
  'https://www.oceanvirtualassistant.com/virtual-assistants/angel',
  'https://www.oceanvirtualassistant.com/virtual-assistants/antonio',
  'https://www.oceanvirtualassistant.com/virtual-assistants/balbina',
  'https://www.oceanvirtualassistant.com/virtual-assistants/bernadette-abellana',
  'https://www.oceanvirtualassistant.com/virtual-assistants/brandon',
  'https://www.oceanvirtualassistant.com/virtual-assistants/branko',
  'https://www.oceanvirtualassistant.com/virtual-assistants/charley',
  'https://www.oceanvirtualassistant.com/virtual-assistants/cherry',
  'https://www.oceanvirtualassistant.com/virtual-assistants/christine',
  'https://www.oceanvirtualassistant.com/virtual-assistants/dafne',
  'https://www.oceanvirtualassistant.com/virtual-assistants/dawn',
  'https://www.oceanvirtualassistant.com/virtual-assistants/dayana',
  'https://www.oceanvirtualassistant.com/virtual-assistants/drue',
  'https://www.oceanvirtualassistant.com/virtual-assistants/ella',
  'https://www.oceanvirtualassistant.com/virtual-assistants/ellen',
  'https://www.oceanvirtualassistant.com/virtual-assistants/emmanuel',
  'https://www.oceanvirtualassistant.com/virtual-assistants/fabiola',
  'https://www.oceanvirtualassistant.com/virtual-assistants/fernanda',
  'https://www.oceanvirtualassistant.com/virtual-assistants/francis',
  'https://www.oceanvirtualassistant.com/virtual-assistants/francis-aldrin',
  'https://www.oceanvirtualassistant.com/virtual-assistants/gabriela',
  'https://www.oceanvirtualassistant.com/virtual-assistants/gael',
  'https://www.oceanvirtualassistant.com/virtual-assistants/geraldine',
  'https://www.oceanvirtualassistant.com/virtual-assistants/gizelle',
  'https://www.oceanvirtualassistant.com/virtual-assistants/gonzalo',
  'https://www.oceanvirtualassistant.com/virtual-assistants/grace',
  'https://www.oceanvirtualassistant.com/virtual-assistants/guillermo',
  'https://www.oceanvirtualassistant.com/virtual-assistants/hugo',
  'https://www.oceanvirtualassistant.com/virtual-assistants/israel',
  'https://www.oceanvirtualassistant.com/virtual-assistants/ivan',
  'https://www.oceanvirtualassistant.com/virtual-assistants/jane',
  'https://www.oceanvirtualassistant.com/virtual-assistants/janet',
  'https://www.oceanvirtualassistant.com/virtual-assistants/janice',
  'https://www.oceanvirtualassistant.com/virtual-assistants/jasmine',
  'https://www.oceanvirtualassistant.com/virtual-assistants/javier',
  'https://www.oceanvirtualassistant.com/virtual-assistants/jay',
  'https://www.oceanvirtualassistant.com/virtual-assistants/jerome',
  'https://www.oceanvirtualassistant.com/virtual-assistants/jill',
  'https://www.oceanvirtualassistant.com/virtual-assistants/jimmy',
  'https://www.oceanvirtualassistant.com/virtual-assistants/joan-rose',
  'https://www.oceanvirtualassistant.com/virtual-assistants/joana',
  'https://www.oceanvirtualassistant.com/virtual-assistants/joel',
  'https://www.oceanvirtualassistant.com/virtual-assistants/joji',
  'https://www.oceanvirtualassistant.com/virtual-assistants/jomer-daniel',
  'https://www.oceanvirtualassistant.com/virtual-assistants/jose-luis',
  'https://www.oceanvirtualassistant.com/virtual-assistants/joy',
  'https://www.oceanvirtualassistant.com/virtual-assistants/juname',
  'https://www.oceanvirtualassistant.com/virtual-assistants/karen',
  'https://www.oceanvirtualassistant.com/virtual-assistants/karl-bd0a3',
  'https://www.oceanvirtualassistant.com/virtual-assistants/karl-loyd',
  'https://www.oceanvirtualassistant.com/virtual-assistants/kathleen',
  'https://www.oceanvirtualassistant.com/virtual-assistants/kempee',
  'https://www.oceanvirtualassistant.com/virtual-assistants/kevin',
  'https://www.oceanvirtualassistant.com/virtual-assistants/lady-ann',
  'https://www.oceanvirtualassistant.com/virtual-assistants/laurice',
  'https://www.oceanvirtualassistant.com/virtual-assistants/lois',
  'https://www.oceanvirtualassistant.com/virtual-assistants/lorenz',
  'https://www.oceanvirtualassistant.com/virtual-assistants/louise-a-siloterio',
  'https://www.oceanvirtualassistant.com/virtual-assistants/ma-venus',
  'https://www.oceanvirtualassistant.com/virtual-assistants/marco',
  'https://www.oceanvirtualassistant.com/virtual-assistants/maria',
  'https://www.oceanvirtualassistant.com/virtual-assistants/maria-christine',
  'https://www.oceanvirtualassistant.com/virtual-assistants/maria-paula',
  'https://www.oceanvirtualassistant.com/virtual-assistants/maridel',
  'https://www.oceanvirtualassistant.com/virtual-assistants/arlene',
  'https://www.oceanvirtualassistant.com/virtual-assistants/melissa',
  'https://www.oceanvirtualassistant.com/virtual-assistants/michelle',
  'https://www.oceanvirtualassistant.com/virtual-assistants/mina',
  'https://www.oceanvirtualassistant.com/virtual-assistants/moises',
  'https://www.oceanvirtualassistant.com/virtual-assistants/patricia',
  'https://www.oceanvirtualassistant.com/virtual-assistants/patricia-nicole',
  'https://www.oceanvirtualassistant.com/virtual-assistants/patricio',
  'https://www.oceanvirtualassistant.com/virtual-assistants/pavel',
  'https://www.oceanvirtualassistant.com/virtual-assistants/rafael',
  'https://www.oceanvirtualassistant.com/virtual-assistants/rainier',
  'https://www.oceanvirtualassistant.com/virtual-assistants/randean',
  'https://www.oceanvirtualassistant.com/virtual-assistants/raydon',
  'https://www.oceanvirtualassistant.com/virtual-assistants/rejean',
  'https://www.oceanvirtualassistant.com/virtual-assistants/rochelle',
  'https://www.oceanvirtualassistant.com/virtual-assistants/rona',
  'https://www.oceanvirtualassistant.com/virtual-assistants/ruel',
  'https://www.oceanvirtualassistant.com/virtual-assistants/samantha',
  'https://www.oceanvirtualassistant.com/virtual-assistants/sandra',
  'https://www.oceanvirtualassistant.com/virtual-assistants/sheila-marie',
  'https://www.oceanvirtualassistant.com/virtual-assistants/tricia',
  'https://www.oceanvirtualassistant.com/virtual-assistants/vicente-penaflor',
  'https://www.oceanvirtualassistant.com/virtual-assistants/ximena-4e77d',
  'https://www.oceanvirtualassistant.com/virtual-assistants/ximena',
  'https://www.oceanvirtualassistant.com/virtual-assistants/yvette',
];

function extractSlug(url) {
  const parts = url.split('/');
  return parts[parts.length - 1];
}

function extractNameFromOldUrl(url) {
  const slug = extractSlug(url);
  return slug.replace('-ocean-va-profile', '');
}

function extractNameFromNewUrl(url) {
  const slug = extractSlug(url);
  return slug;
}

async function checkUrl(url) {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
    });
    return {
      url,
      status: response.status,
      ok: response.ok,
      redirected: response.redirected,
      finalUrl: response.url,
    };
  } catch (error) {
    return {
      url,
      status: 'ERROR',
      ok: false,
      error: error.message,
    };
  }
}

async function main() {
  console.log('🔍 Checking URLs and comparing structures...\n');

  // Extract names and create mapping
  const oldMapping = OLD_URLS.map((url) => ({
    url,
    name: extractNameFromOldUrl(url),
    slug: extractSlug(url),
  }));

  const newMapping = NEW_URLS.map((url) => ({
    url,
    name: extractNameFromNewUrl(url),
    slug: extractSlug(url),
  }));

  // Create name mapping
  const nameMap = new Map();
  oldMapping.forEach((old) => {
    const newItem = newMapping.find((n) => {
      const oldName = old.name.toLowerCase().replace(/-/g, '');
      const newName = n.name.toLowerCase().replace(/-/g, '');
      return oldName === newName || oldName.includes(newName) || newName.includes(oldName);
    });
    if (newItem) {
      nameMap.set(old.name, newItem);
    }
  });

  // Check old URLs
  console.log('📋 Checking OLD URLs...\n');
  const oldResults = [];
  for (const old of oldMapping) {
    const result = await checkUrl(old.url);
    oldResults.push(result);
    if (!result.ok) {
      console.log(`❌ ${old.url} - Status: ${result.status}`);
    } else {
      console.log(`✅ ${old.url}`);
    }
    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  console.log('\n📋 Checking NEW URLs...\n');
  const newResults = [];
  for (const newItem of newMapping) {
    const result = await checkUrl(newItem.url);
    newResults.push(result);
    if (!result.ok) {
      console.log(`❌ ${newItem.url} - Status: ${result.status}`);
    } else {
      console.log(`✅ ${newItem.url}`);
    }
    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  // Analyze differences
  const brokenOld = oldResults.filter((r) => !r.ok);
  const brokenNew = newResults.filter((r) => !r.ok);

  // Compare URL structures
  const differences = [];
  oldMapping.forEach((old) => {
    const newItem = nameMap.get(old.name);
    if (newItem) {
      if (old.slug !== newItem.slug) {
        differences.push({
          name: old.name,
          oldSlug: old.slug,
          newSlug: newItem.slug,
          oldUrl: old.url,
          newUrl: newItem.url,
        });
      }
    } else {
      differences.push({
        name: old.name,
        oldSlug: old.slug,
        newSlug: 'NOT FOUND',
        oldUrl: old.url,
        newUrl: 'NOT FOUND',
      });
    }
  });

  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalOldUrls: OLD_URLS.length,
      totalNewUrls: NEW_URLS.length,
      brokenOldUrls: brokenOld.length,
      brokenNewUrls: brokenNew.length,
      urlDifferences: differences.length,
    },
    brokenOldUrls: brokenOld.map((r) => ({
      url: r.url,
      status: r.status,
      error: r.error,
    })),
    brokenNewUrls: brokenNew.map((r) => ({
      url: r.url,
      status: r.status,
      error: r.error,
    })),
    urlDifferences: differences,
    allOldResults: oldResults,
    allNewResults: newResults,
  };

  // Save report
  fs.writeFileSync('reports/url-comparison-report.json', JSON.stringify(report, null, 2));

  // Display summary
  console.log('\n' + '═'.repeat(80));
  console.log('📊 SUMMARY');
  console.log('═'.repeat(80));
  console.log(`Total Old URLs: ${OLD_URLS.length}`);
  console.log(`Total New URLs: ${NEW_URLS.length}`);
  console.log(`Broken Old URLs: ${brokenOld.length}`);
  console.log(`Broken New URLs: ${brokenNew.length}`);
  console.log(`URL Structure Differences: ${differences.length}`);

  if (brokenOld.length > 0) {
    console.log('\n❌ Broken OLD URLs:');
    brokenOld.forEach((r) => {
      console.log(`   - ${r.url} (${r.status})`);
    });
  }

  if (brokenNew.length > 0) {
    console.log('\n❌ Broken NEW URLs:');
    brokenNew.forEach((r) => {
      console.log(`   - ${r.url} (${r.status})`);
    });
  }

  if (differences.length > 0) {
    console.log('\n📝 URL Structure Differences:');
    differences.forEach((diff) => {
      console.log(`   ${diff.name}:`);
      console.log(`      Old: ${diff.oldSlug}`);
      console.log(`      New: ${diff.newSlug}`);
    });
  }

  console.log('\n💾 Full report saved to: reports/url-comparison-report.json');
  console.log('═'.repeat(80));
}

main().catch(console.error);
