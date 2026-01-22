/**
 * Quick URL check - Sample verification
 * Checks a sample of URLs to verify they work
 */

const OLD_BASE = 'https://www.oceanvirtualassistant.com';
const NEW_BASE = 'https://www.oceanvirtualassistant.com/virtual-assistants';

// Sample URLs to check (first 10 and some special cases)
const SAMPLE_OLD = [
  'ac-ocean-va-profile',
  'aaron-ocean-va-profile',
  'drue-ocean-va-profile',
  'ana-s-ocean-va-profile',
  'ximena-ocean-va-profile',
  'ximena-g-ocean-va-profile',
  'karl-ocean-va-profile',
];

const SAMPLE_NEW = [
  'ac',
  'aaron-a0d16',
  'drue',
  'ana',
  'ximena-4e77d',
  'ximena',
  'karl-bd0a3',
];

async function checkUrl(url) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    return {
      url,
      status: response.status,
      ok: response.ok,
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
  console.log('🔍 Quick URL Check (Sample)...\n');
  
  console.log('📋 Checking OLD URLs (sample):\n');
  const oldResults = [];
  for (const slug of SAMPLE_OLD) {
    const url = `${OLD_BASE}/${slug}`;
    const result = await checkUrl(url);
    oldResults.push(result);
    const status = result.ok ? '✅' : '❌';
    console.log(`${status} ${url} - Status: ${result.status}`);
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  
  console.log('\n📋 Checking NEW URLs (sample):\n');
  const newResults = [];
  for (const slug of SAMPLE_NEW) {
    const url = `${NEW_BASE}/${slug}`;
    const result = await checkUrl(url);
    newResults.push(result);
    const status = result.ok ? '✅' : '❌';
    console.log(`${status} ${url} - Status: ${result.status}`);
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  
  const brokenOld = oldResults.filter((r) => !r.ok);
  const brokenNew = newResults.filter((r) => !r.ok);
  
  console.log('\n' + '═'.repeat(80));
  console.log('📊 SUMMARY');
  console.log('═'.repeat(80));
  console.log(`Old URLs checked: ${SAMPLE_OLD.length}`);
  console.log(`Broken Old URLs: ${brokenOld.length}`);
  console.log(`New URLs checked: ${SAMPLE_NEW.length}`);
  console.log(`Broken New URLs: ${brokenNew.length}`);
  
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
  
  console.log('═'.repeat(80));
}

main().catch(console.error);
