#!/usr/bin/env node

/**
 * Setup .env.local with Webflow credentials
 * 
 * Usage: node scripts/setup-env.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, '../.env.local');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.log('🔧 Setup .env.local for Phase 5 - Webflow Integration\n');

  // Check if .env.local already exists
  if (fs.existsSync(envPath)) {
    console.log('⚠️  .env.local already exists');
    const overwrite = await question('Overwrite? (y/n): ');
    if (overwrite.toLowerCase() !== 'y') {
      console.log('❌ Cancelled');
      rl.close();
      return;
    }
  }

  console.log('\n📝 Enter your Webflow credentials:\n');

  const apiToken = await question('Webflow API Token: ');
  const siteId = await question('Webflow Site ID (Copy): ');
  const collectionVas = await question('Collection ID - VAs (optional, press Enter to skip): ');
  const collectionServices = await question('Collection ID - Services (optional, press Enter to skip): ');
  const collectionIndustries = await question('Collection ID - Industries (optional, press Enter to skip): ');

  // Build .env.local content
  let envContent = `# Webflow API Configuration
WEBFLOW_API_TOKEN=${apiToken}
WEBFLOW_SITE_ID=${siteId}

# DevLink
DEVLINK_ENABLED=true

# Webflow Collections (optional)
`;

  if (collectionVas) {
    envContent += `WEBFLOW_COLLECTION_VAS=${collectionVas}\n`;
  }
  if (collectionServices) {
    envContent += `WEBFLOW_COLLECTION_SERVICES=${collectionServices}\n`;
  }
  if (collectionIndustries) {
    envContent += `WEBFLOW_COLLECTION_INDUSTRIES=${collectionIndustries}\n`;
  }

  envContent += `
# MCP Server (optional, for Phase 6)
MCP_ENABLED=false
`;

  // Write to .env.local
  try {
    fs.writeFileSync(envPath, envContent);
    console.log('\n✅ .env.local created successfully!\n');
    console.log('📋 Configuration:');
    console.log(`   API Token: ${apiToken.substring(0, 10)}...`);
    console.log(`   Site ID: ${siteId}`);
    if (collectionVas) console.log(`   VAs Collection: ${collectionVas}`);
    if (collectionServices) console.log(`   Services Collection: ${collectionServices}`);
    if (collectionIndustries) console.log(`   Industries Collection: ${collectionIndustries}`);
    console.log('\n🚀 Next steps:');
    console.log('   1. npm install @webflow/devlink');
    console.log('   2. npm install @webflow/react');
    console.log('   3. npm run devlink');
    console.log('   4. Follow DevLink instructions\n');
  } catch (error) {
    console.error('❌ Error creating .env.local:', error.message);
  }

  rl.close();
}

main();
