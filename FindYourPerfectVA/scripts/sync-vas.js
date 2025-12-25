/**
 * Script: Sync VAs from Webflow
 * 
 * Standalone script to sync Virtual Assistants from Webflow CMS
 * Run with: npm run sync:vas
 */

import { syncVAs } from '../lib/webflow-sync.js';

async function main() {
  try {
    console.log('🔄 Starting VA synchronization...\n');
    
    const vas = await syncVAs();
    
    console.log(`\n✅ Successfully synced ${vas.length} Virtual Assistants`);
    console.log(`📦 Cache saved to: data/vas-cache.json\n`);
    
    // Show sample
    if (vas.length > 0) {
      console.log('Sample VA:');
      console.log(JSON.stringify(vas[0], null, 2));
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();

