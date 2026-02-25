/**
 * Update Jesus's video URL, thumbnail, and image in Webflow CMS
 * Run with: node scripts/updateJesusVideoAndImage.js
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

// Jesus's video URL and image
const videoUrl = 'https://youtu.be/SUGkOMnPinU';
const imageUrl = 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/69977b7568cf978e044cc330_Jesus%20Antonio%20Ruiz%20Rojo%20ver%201.webp';

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
    console.log('🎬 Updating Jesus\'s video, thumbnail, and image in Webflow CMS...\n');
    console.log(`📹 Video URL: ${videoUrl}`);
    console.log(`🖼️  Video Thumbnail URL: ${thumbnailUrl}`);
    console.log(`🖼️  Image URL: ${imageUrl}\n`);

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

    // Fetch all VAs to find Jesus
    console.log('📥 Searching for Jesus...');
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

    // Find Jesus by name (case insensitive)
    const jesusVA = allVAs.find(va => {
      const name = (va.fieldData.name || '').toLowerCase();
      return name === 'jesus' || name.includes('jesus');
    });

    if (!jesusVA) {
      console.error('❌ Jesus not found in Webflow CMS');
      console.log('Available VAs:', allVAs.map(v => v.fieldData.name).slice(0, 10).join(', '), '...');
      process.exit(1);
    }

    console.log(`✅ Found Jesus: ${jesusVA.fieldData.name}`);
    console.log(`   Item ID: ${jesusVA.id}`);
    console.log(`   Current video URL: ${jesusVA.fieldData.video || '(empty)'}`);
    console.log(`   Current thumbnail: ${jesusVA.fieldData['video-thumbnail-2'] || '(empty)'}`);
    console.log(`   Current image: ${jesusVA.fieldData.image || '(empty)'}\n`);

    // Update video, thumbnail, and image
    const fieldData = {
      'video': videoUrl,
      'video-thumbnail-2': thumbnailUrl,
      'image': imageUrl,
    };

    console.log('🔄 Updating Jesus\'s video, thumbnail, and image...');
    console.log(`   New video URL: ${videoUrl}`);
    console.log(`   New thumbnail URL: ${thumbnailUrl}`);
    console.log(`   New image URL: ${imageUrl}\n`);

    const result = await client.updateCollectionItem(vaCollection.id, jesusVA.id, fieldData, {
      isDraft: false,
    });

    console.log('✅ Jesus updated successfully!');
    console.log(`   Item ID: ${result.item?.id || result.id || jesusVA.id}`);
    console.log(`   Video URL: ${videoUrl}`);
    console.log(`   Video ID: ${videoId}`);
    console.log(`   Thumbnail URL: ${thumbnailUrl}`);
    console.log(`   Image URL: ${imageUrl}\n`);

    // Publish the item
    if (result.item?.id || result.id) {
      console.log('🔄 Publishing item...');
      try {
        await client.publishItems(vaCollection.id, [result.item?.id || result.id]);
        console.log('✅ Item published successfully!\n');
      } catch (publishError) {
        console.warn('⚠️  Could not publish item automatically:', publishError.message);
        console.log('   You may need to publish it manually in Webflow.\n');
      }
    }

    console.log('🎉 Jesus\'s video, thumbnail, and image updated successfully!');
    console.log(`   Profile URL: https://www.oceanvirtualassistant.com/virtual-assistants/${jesusVA.fieldData.slug || 'jesus'}\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('API Response:', JSON.stringify(error.response, null, 2));
    }
    if (error.stack) {
      console.error('Stack:', error.stack);
    }
    process.exit(1);
  }
}

main();
