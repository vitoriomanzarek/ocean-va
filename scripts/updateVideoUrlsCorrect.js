/**
 * Update Video URLs with corrected list
 * Run with: node scripts/updateVideoUrlsCorrect.js
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';
import fs from 'fs';

dotenv.config();

const token = process.env.WEBFLOW_API_TOKEN;
if (!token) {
  console.error('❌ WEBFLOW_API_TOKEN not found in .env');
  process.exit(1);
}

const client = new WebflowApiClient(token);

// Updated video URLs from the user
const videoUrls = {
  "Adrian": "https://youtu.be/k5OatPLSORw",
  "Alejandro": "https://youtu.be/a_cRiGRSLEs",
  "Dafne": "https://youtu.be/habJY_0mpjs",
  "Ivan": "https://youtu.be/dHojsDPmfHc",
  "Joana": "https://youtu.be/PrZ7xZryyjQ",
  "Karen": "https://youtu.be/TXb9ONnF310",
  "Maria Paula": "https://youtu.be/yxgaoJEpdGg",
  "Moises": "https://youtu.be/tbz0iRIWaps",
  "Abigail": "https://youtu.be/z3hiwu0mPc8",
  "Antonio": "https://youtu.be/3b3R9YoLumE?t=2s",
  "Cherry Mae": "https://youtu.be/DIfncidHCpY",
  "Emmanuel": "https://youtu.be/dZaAfgmaQwk",
  "Francis": "https://youtu.be/Atdu3qVBHLs?t=1s",
  "Geraldine": "https://youtu.be/OAEGigybmFM",
  "Jay Alvin": "https://youtu.be/GUe3uCkW8-4",
  "Javier": "https://youtu.be/UCqesVIO_7M",
  "Jerome": "https://youtu.be/aomGUtRlOiE",
  "Jimmy": "https://youtu.be/rKDnjVB-dxE",
  "Joel": "https://youtu.be/5n99ZiMc0fs",
  "Joji Marie": "https://youtu.be/5N_z80i4KrQ?t=1s",
  "Laurice": "https://youtu.be/9cz71wjqIX8",
  "Lorenz": "https://youtu.be/3if5VzuvLNc",
  "Ma. Venus": "https://youtu.be/AgUkZKEWzkw",
  "Michelle": "https://youtu.be/sjVqZfkunbY",
  "Raydon": "https://youtu.be/2OIkxzcz-pw",
  "Rona Mae": "https://youtu.be/eHrDpnlAeoc",
  "Gizelle": "https://youtu.be/xkbMKgYarbk",
  "Jasmine": "https://youtu.be/WhdFCM1GABs",
  "Jill": "https://youtu.be/7yREE7oxSu0",
  "Pavel": "https://youtu.be/_reMSeE_gyY",
  "Ana": "https://youtu.be/XloA9MBGtGA",
  "Ana Victoria": "https://youtu.be/1d4dWgjd0fE",
  "Balbina": "https://youtu.be/sESom3C4Tjk",
  "Brandon L.": "https://youtu.be/PVmxKa19Mz0",
  "Carolina": "https://youtu.be/_3cmkdxncdg",
  "Christine": "https://youtu.be/m0n5unGQ1Bk",
  "Dawn": "https://youtu.be/fMWR-UrNXAg",
  "Dayana": "https://youtu.be/1xTnx_3MRPA",
  "Ellen": "https://youtu.be/zgEzkCfI3Pw",
  "Fernanda": "https://youtu.be/7ngbNodl3es",
  "Gonzalo": "https://youtu.be/DYky1VhKGNQ",
  "Guillermo": "https://youtu.be/sLtVFyK2b7s",
  "Israel": "https://youtu.be/aSLhEc15mN4",
  "Janice": "https://youtu.be/P8gcQHNJwsk",
  "Kevin": "https://youtu.be/MnlRVthsUYE",
  "Lois": "https://youtu.be/HSCzM1jVsaE",
  "Maria D.": "https://youtu.be/ALQNI3jsBLs",
  "Melissa": "https://youtu.be/6dB2M8wAkjE",
  "Rafael": "https://youtu.be/S19B0sRiohI",
  "Rainier": "https://youtu.be/Gl_Rijv44Ec",
  "Rejean": "https://youtu.be/yeJ_lskQovU",
  "Rochelle": "https://youtu.be/aCJyNu79nto",
  "Sandra": "https://youtu.be/xrNMiTNBkcg",
  "Ximena G.": "https://youtu.be/UQ2JcPPjEnE",
  "Tricia": "https://youtu.be/VClb24kDU7s",
  "Yvette": "https://youtu.be/oiZlHPfAjbg",
  "Grace": "https://youtu.be/J08tAud6nTQ",
  "AC": "https://youtu.be/mfyGOi9mo58",
  "Mina": "https://youtu.be/k4jmdy8ifrE"
};

async function main() {
  try {
    console.log('🎬 Updating Video URLs to Webflow (Corrected)...\n');

    // Get sites and collection ID
    const sitesResponse = await client.getSites();
    const site = sitesResponse.sites[0];

    if (!site) {
      console.error('❌ No sites found');
      process.exit(1);
    }

    const collectionsResponse = await client.getCollections(site.id);
    const vaCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'virtual-assistants'
    );

    if (!vaCollection) {
      console.error('❌ Virtual Assistants collection not found');
      process.exit(1);
    }

    console.log(`📍 Site: ${site.displayName || site.name}`);
    console.log(`📍 Collection ID: ${vaCollection.id}\n`);

    // Read the webflow export file
    const webflowExport = JSON.parse(fs.readFileSync('webflow-vas-export.json', 'utf-8'));

    console.log(`📤 Updating ${Object.keys(videoUrls).length} VAs with corrected Video URLs...\n`);

    let successCount = 0;
    let failCount = 0;
    let skippedCount = 0;

    for (const [vaName, videoUrl] of Object.entries(videoUrls)) {
      // Find corresponding Webflow VA
      const webflowVA = webflowExport.vas.find((wva) => wva.fieldData.name === vaName);

      if (!webflowVA) {
        console.log(`⚠️  ${vaName} not found in Webflow (skipping)`);
        skippedCount++;
        continue;
      }

      console.log(`📤 Updating ${vaName}...`);

      try {
        // Clean video URL - remove query parameters that might cause validation issues
        let cleanVideoUrl = videoUrl;
        if (cleanVideoUrl && cleanVideoUrl.includes('?')) {
          cleanVideoUrl = cleanVideoUrl.split('?')[0];
        }
        
        // Update the "Video" field (Link type)
        const fieldData = {
          'video': cleanVideoUrl,
        };

        await client.updateCollectionItem(vaCollection.id, webflowVA.id, fieldData, {
          isDraft: false, // Keep published
        });

        console.log(`   ✅ Updated successfully\n`);
        successCount++;
        
        // Add delay to respect rate limiting (100ms between requests)
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`   ❌ Error: ${error.message}\n`);
        failCount++;
        
        // Add delay even on error
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    // Summary
    console.log('═'.repeat(80));
    console.log('\n📋 SUMMARY:\n');
    console.log(`  Successfully updated: ${successCount}`);
    console.log(`  Failed: ${failCount}`);
    console.log(`  Skipped: ${skippedCount}`);
    console.log(`  Total: ${successCount + failCount + skippedCount}\n`);

    if (failCount === 0) {
      console.log('✅ All video URLs updated successfully!\n');
    } else {
      console.log('⚠️  Some VAs failed to update. Review the errors above.\n');
    }

    console.log('═'.repeat(80));

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
