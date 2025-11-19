/**
 * Check which VAs are missing video URLs
 * Run with: node scripts/checkMissingVideoUrls.js
 */

import { vasData } from '../src/data/vasData.js';

console.log('🎬 Checking for missing Video URLs in vasData.js\n');
console.log('═'.repeat(80));

const missingVideos = vasData.filter((va) => !va.videoUrl || va.videoUrl.trim() === '');

console.log(`\n📊 SUMMARY:\n`);
console.log(`Total VAs: ${vasData.length}`);
console.log(`With Video URL: ${vasData.length - missingVideos.length}`);
console.log(`Missing Video URL: ${missingVideos.length}\n`);

if (missingVideos.length > 0) {
  console.log('❌ VAs WITHOUT Video URL:\n');
  missingVideos.forEach((va, index) => {
    console.log(`${index + 1}. ${va.nombre}`);
  });
} else {
  console.log('✅ All VAs have Video URLs!');
}

console.log('\n═'.repeat(80));

// Also show all VAs with their video URLs for verification
console.log('\n📋 COMPLETE LIST (for verification):\n');
console.log('Nombre,Video URL');
vasData.forEach((va) => {
  const videoUrl = va.videoUrl || '';
  console.log(`${va.nombre},${videoUrl}`);
});

console.log('\n═'.repeat(80));
