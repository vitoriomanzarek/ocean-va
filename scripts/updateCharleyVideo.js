/**
 * Update Charley's video in Webflow CMS
 * Run with: node scripts/updateCharleyVideo.js
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

const CHARLEY_ITEM_ID = '696fceec1dc5d0464ce5e2f4'; // Charley's item ID from previous creation
const VIDEO_URL = 'https://youtu.be/qSeLs2Hg2EQ';

async function main() {
  try {
    console.log('🔗 Updating Charley\'s video in Webflow CMS...\n');

    // Get sites and collection ID
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

    // Extract video ID and generate thumbnail
    const videoIdMatch = VIDEO_URL.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    
    if (!videoId) {
      console.error('❌ Invalid YouTube URL');
      process.exit(1);
    }

    const videoThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    console.log(`📹 Video URL: ${VIDEO_URL}`);
    console.log(`📹 Video ID: ${videoId}`);
    console.log(`📹 Thumbnail: ${videoThumbnail}\n`);

    // Prepare field data
    const fieldData = {
      'video': VIDEO_URL,
      'video-thumbnail-2': videoThumbnail
    };

    console.log('📤 Updating Charley\'s video in Webflow CMS...\n');

    await client.updateCollectionItem(vaCollection.id, CHARLEY_ITEM_ID, fieldData, {
      isDraft: false,
    });

    console.log(`✅ Charley's video updated successfully!\n`);
    console.log(`📌 Item ID: ${CHARLEY_ITEM_ID}`);
    console.log(`📌 Video URL: ${VIDEO_URL}`);
    console.log(`📌 Video Thumbnail: ${videoThumbnail}\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();
