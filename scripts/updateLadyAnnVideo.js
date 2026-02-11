/**
 * Update Lady Ann's video URL and thumbnail in Webflow CMS
 * Run with: node scripts/updateLadyAnnVideo.js
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const token = process.env.WEBFLOW_API_TOKEN;
if (!token) {
  console.error('❌ WEBFLOW_API_TOKEN not found in .env');
  process.exit(1);
}

const client = new WebflowApiClient(token);

// Lady Ann's video URL
const videoUrl = 'https://youtu.be/qxrCreiMTFo';

// Extract video ID and generate thumbnail URL
function getVideoId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/.*[?&]v=([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}

const videoId = getVideoId(videoUrl);
if (!videoId) {
  console.error('❌ Could not extract video ID from URL:', videoUrl);
  process.exit(1);
}

// Generate thumbnail URL (maxresdefault is highest quality)
const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

async function main() {
  try {
    console.log('🎬 Updating Lady Ann\'s video and thumbnail in Webflow CMS...\n');
    console.log(`📹 Video URL: ${videoUrl}`);
    console.log(`🖼️  Thumbnail URL: ${thumbnailUrl}\n`);

    const sitesResponse = await client.getSites();
    const site = sitesResponse.sites[0];

    if (!site) {
      console.error('❌ No sites found');
      process.exit(1);
    }

    console.log(`📍 Site: ${site.displayName || site.name}\n`);

    const collectionsResponse = await client.getCollections(site.id);
    
    const vaCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'virtual-assistants'
    );

    if (!vaCollection) {
      console.error('❌ Virtual Assistants collection not found');
      process.exit(1);
    }

    console.log(`📍 Virtual Assistants Collection ID: ${vaCollection.id}\n`);

    // Fetch all VAs to find Lady Ann
    console.log('📥 Searching for Lady Ann...');
    let allVAs = [];
    let offset = 0;
    const limit = 100;

    while (true) {
      const response = await client.getCollectionItems(vaCollection.id, { limit, offset });
      if (!response.items || response.items.length === 0) break;
      allVAs = allVAs.concat(response.items);
      if (response.items.length < limit) break;
      offset += limit;
    }

    // Find Lady Ann by name (case insensitive)
    const ladyAnn = allVAs.find(va => {
      const name = (va.fieldData.name || '').toLowerCase();
      return name === 'lady ann' || name === 'lady anne' || name.includes('lady ann');
    });

    if (!ladyAnn) {
      console.error('❌ Lady Ann not found in Webflow CMS');
      console.log('Available VAs:', allVAs.map(v => v.fieldData.name).slice(0, 10).join(', '), '...');
      process.exit(1);
    }

    console.log(`✅ Found Lady Ann: ${ladyAnn.fieldData.name}`);
    console.log(`   Item ID: ${ladyAnn.id}`);
    console.log(`   Current video URL: ${ladyAnn.fieldData.video || '(empty)'}`);
    console.log(`   Current thumbnail: ${ladyAnn.fieldData['video-thumbnail-2'] || '(empty)'}\n`);

    // Update both video and thumbnail
    const fieldData = {
      'video': videoUrl,
      'video-thumbnail-2': thumbnailUrl,
    };

    console.log('🔄 Updating Lady Ann\'s video and thumbnail...');
    console.log(`   New video URL: ${videoUrl}`);
    console.log(`   New thumbnail URL: ${thumbnailUrl}\n`);

    await client.updateCollectionItem(vaCollection.id, ladyAnn.id, fieldData, {
      isDraft: false,
    });

    console.log('✅ Lady Ann updated successfully!');
    console.log(`   Item ID: ${ladyAnn.id}`);
    console.log(`   Video URL: ${videoUrl}`);
    console.log(`   Thumbnail URL: ${thumbnailUrl}\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('API Response:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();
