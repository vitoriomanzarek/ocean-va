#!/usr/bin/env node

/**
 * Extract Webflow Image URLs Massively
 * Uses Webflow API to get all assets from your site
 */

import https from 'https';

// Configuration
const SITE_ID = '66e9b3f71eb321a17e92218a';
const API_TOKEN = process.env.WEBFLOW_API_TOKEN;

if (!API_TOKEN) {
  console.error('❌ Error: WEBFLOW_API_TOKEN environment variable not set');
  console.error('Usage: WEBFLOW_API_TOKEN="your_token" node extract-webflow-images.js');
  process.exit(1);
}

// Make API request
function makeRequest(endpoint) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.webflow.com',
      path: endpoint,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Accept-Version': '1.0'
      }
    };

    https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject).end();
  });
}

// Main function
async function extractImages() {
  try {
    console.log('🔍 Extracting Webflow images...\n');

    // Get all assets
    const assetsResponse = await makeRequest(`/sites/${SITE_ID}/assets`);
    
    if (!assetsResponse.assets || assetsResponse.assets.length === 0) {
      console.log('⚠️  No assets found in Webflow');
      return;
    }

    console.log(`✅ Found ${assetsResponse.assets.length} assets\n`);
    console.log('📋 Image URLs:\n');

    // Filter and display images
    const images = assetsResponse.assets.filter(asset => 
      asset.mimeType && asset.mimeType.startsWith('image/')
    );

    if (images.length === 0) {
      console.log('⚠️  No images found');
      return;
    }

    // Create organized output
    const imagesByType = {};

    images.forEach((image, index) => {
      const type = image.mimeType.split('/')[1].toUpperCase();
      if (!imagesByType[type]) {
        imagesByType[type] = [];
      }

      imagesByType[type].push({
        name: image.fileName,
        url: image.url,
        size: image.size,
        width: image.width,
        height: image.height
      });

      console.log(`${index + 1}. ${image.fileName}`);
      console.log(`   URL: ${image.url}`);
      console.log(`   Size: ${(image.size / 1024).toFixed(2)} KB`);
      console.log(`   Dimensions: ${image.width}x${image.height}px`);
      console.log();
    });

    // Summary
    console.log('\n📊 Summary by Type:');
    Object.entries(imagesByType).forEach(([type, imgs]) => {
      console.log(`   ${type}: ${imgs.length} images`);
    });

    // Export as JSON
    const jsonOutput = {
      siteId: SITE_ID,
      totalImages: images.length,
      exportedAt: new Date().toISOString(),
      images: images.map(img => ({
        fileName: img.fileName,
        url: img.url,
        mimeType: img.mimeType,
        size: img.size,
        width: img.width,
        height: img.height
      }))
    };

    // Save to file
    const fs = await import('fs');
    fs.writeFileSync('webflow-images-export.json', JSON.stringify(jsonOutput, null, 2));
    console.log('\n✅ Exported to: webflow-images-export.json');

    // Create CSV
    let csvContent = 'File Name,URL,Size (KB),Width,Height,MIME Type\n';
    images.forEach(img => {
      csvContent += `"${img.fileName}","${img.url}",${(img.size / 1024).toFixed(2)},${img.width},${img.height},"${img.mimeType}"\n`;
    });

    fs.writeFileSync('webflow-images-export.csv', csvContent);
    console.log('✅ Exported to: webflow-images-export.csv');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

extractImages();
