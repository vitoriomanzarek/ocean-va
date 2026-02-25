/**
 * Script to check if URLs are working or broken
 */

const urls = [
  'https://www.oceanvirtualassistant.com/virtual-assistants/maximiliano',
  'https://www.oceanvirtualassistant.com/maximiliano-ocean-va-profile',
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

async function checkUrl(url) {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      timeout: 10000
    });
    
    return {
      url,
      status: response.status,
      ok: response.ok,
      statusText: response.statusText
    };
  } catch (error) {
    return {
      url,
      status: 'ERROR',
      ok: false,
      error: error.message
    };
  }
}

async function checkAllUrls() {
  console.log(`🔍 Checking ${urls.length} URLs...\n`);
  
  const results = [];
  
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    process.stdout.write(`\rChecking ${i + 1}/${urls.length}: ${url.substring(url.lastIndexOf('/') + 1)}...`);
    
    const result = await checkUrl(url);
    results.push(result);
    
    // Small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log('\n\n📊 RESULTS:\n');
  
  const working = results.filter(r => r.ok && r.status === 200);
  const broken = results.filter(r => !r.ok || r.status !== 200);
  
  console.log(`✅ Working: ${working.length}`);
  console.log(`❌ Broken: ${broken.length}\n`);
  
  if (broken.length > 0) {
    console.log('❌ BROKEN URLs:\n');
    broken.forEach(result => {
      console.log(`  ${result.url}`);
      console.log(`    Status: ${result.status} ${result.statusText || result.error || ''}`);
    });
    console.log('');
  }
  
  if (working.length > 0) {
    console.log('✅ WORKING URLs:\n');
    working.forEach(result => {
      console.log(`  ${result.url}`);
    });
  }
  
  return { working, broken };
}

checkAllUrls().catch(console.error);
