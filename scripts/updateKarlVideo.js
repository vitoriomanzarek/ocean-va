/**
 * Update Karl Loyd's video in Webflow CMS
 * Run with: node scripts/updateKarlVideo.js
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

const KARL_SLUG = 'karl-loyd'; // Karl's slug
const VIDEO_URL = 'https://youtu.be/1YPljewNi6M';

async function main() {
  try {
    console.log('🔗 Updating Karl Loyd\'s video in Webflow CMS...\n');

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

    // Find Karl by slug
    console.log('📥 Searching for Karl Loyd by slug...');
    const itemsResponse = await client.getCollectionItems(vaCollection.id, { limit: 200 });
    const karlItem = itemsResponse.items.find(item => item.fieldData.slug === KARL_SLUG);

    if (!karlItem) {
      console.error(`❌ Karl Loyd not found with slug: ${KARL_SLUG}`);
      console.log('Available slugs:', itemsResponse.items.map(item => item.fieldData.slug).slice(0, 10));
      process.exit(1);
    }

    console.log(`✅ Found Karl Loyd - Item ID: ${karlItem.id}\n`);

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

    console.log('📤 Updating Karl Loyd\'s video in Webflow CMS...\n');

    await client.updateCollectionItem(vaCollection.id, karlItem.id, fieldData, {
      isDraft: false,
    });

    console.log(`✅ Karl Loyd's video updated successfully!\n`);
    console.log(`📌 Item ID: ${karlItem.id}`);
    console.log(`📌 Slug: ${KARL_SLUG}`);
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
