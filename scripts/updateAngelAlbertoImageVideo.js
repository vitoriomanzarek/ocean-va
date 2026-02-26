/**
 * Update Angel Alberto in Webflow CMS: image, video, video thumbnail.
 * Run with: node scripts/updateAngelAlbertoImageVideo.js
 */

import dotenv from 'dotenv';
import WebflowApiClient from '../src/webflow/webflowApiClient.js';

dotenv.config();

const token = process.env.WEBFLOW_API_TOKEN;
const siteId = process.env.WEBFLOW_SITE_ID;

if (!token || !siteId) {
  console.error('❌ WEBFLOW_API_TOKEN and WEBFLOW_SITE_ID required in .env');
  process.exit(1);
}

const client = new WebflowApiClient(token);

const ANGEL_IMAGE_URL =
  'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/699f52116b1b5cfb3a45fc3a_Angel%20Alberto.webp';
const ANGEL_VIDEO_URL = 'https://youtu.be/ypO0Y5eW050';
const ANGEL_VIDEO_THUMBNAIL = 'https://img.youtube.com/vi/ypO0Y5eW050/hqdefault.jpg';

async function main() {
  try {
    console.log('🔧 Updating Angel Alberto: image, video, video thumbnail...\n');

    const collectionsResponse = await client.getCollections(siteId);
    const vaCollection = collectionsResponse.collections.find((c) => c.slug === 'virtual-assistants');
    if (!vaCollection) {
      console.error('❌ Virtual Assistants collection not found');
      process.exit(1);
    }

    let allVAs = [];
    let offset = 0;
    const limit = 100;
    while (true) {
      const res = await client.getCollectionItems(vaCollection.id, { limit, offset });
      if (!res.items || res.items.length === 0) break;
      allVAs = allVAs.concat(res.items);
      if (res.items.length < limit) break;
      offset += limit;
    }

    const angel = allVAs.find((v) => (v.fieldData.slug || '').toLowerCase().trim() === 'angel-alberto');
    if (!angel) {
      console.error('❌ Angel Alberto (slug: angel-alberto) not found in CMS');
      process.exit(1);
    }

    console.log(`✅ Found Angel Alberto (${angel.id})\n`);

    const updates = {
      image: ANGEL_IMAGE_URL,
      video: ANGEL_VIDEO_URL,
      'video-thumbnail-2': ANGEL_VIDEO_THUMBNAIL,
    };

    await client.updateCollectionItem(vaCollection.id, angel.id, updates, { isDraft: false });

    console.log('✅ Angel Alberto updated successfully.\n');
    console.log('  - Image:', ANGEL_IMAGE_URL);
    console.log('  - Video:', ANGEL_VIDEO_URL);
    console.log('  - Video thumbnail:', ANGEL_VIDEO_THUMBNAIL);
    console.log('');
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();
