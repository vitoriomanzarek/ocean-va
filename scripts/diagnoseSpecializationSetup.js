/**
 * Diagnose Specialization setup before linking
 * Run with: node scripts/diagnoseSpecializationSetup.js
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

async function main() {
  try {
    console.log('🔍 Diagnosing Specialization Setup...\n');

    // Get sites
    const sitesResponse = await client.getSites();
    const site = sitesResponse.sites[0];

    console.log(`📍 Site: ${site.displayName || site.name}\n`);

    // Get collections
    const collectionsResponse = await client.getCollections(site.id);
    
    const vaCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'virtual-assistants'
    );
    
    const specializationsCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'vas-specializations' || col.slug === 'specializations'
    );

    if (!vaCollection) {
      console.error('❌ Virtual Assistants collection not found');
      process.exit(1);
    }

    if (!specializationsCollection) {
      console.error('❌ Specializations collection not found');
      process.exit(1);
    }

    console.log('═'.repeat(80));
    console.log('\n1️⃣  VIRTUAL ASSISTANTS COLLECTION:\n');
    
    const vaDetails = await client.getCollection(vaCollection.id);
    
    // Find Specialization field
    const specializationField = vaDetails.fields.find(
      (f) => f.displayName === 'Specialization' || f.slug === 'specialization'
    );

    if (!specializationField) {
      console.error('❌ Specialization field NOT FOUND in Virtual Assistants');
      console.log('\n📋 Available fields:');
      vaDetails.fields.forEach((f) => {
        console.log(`   - ${f.displayName} (${f.type})`);
      });
      process.exit(1);
    }

    console.log(`✅ Field: ${specializationField.displayName}`);
    console.log(`   Slug: ${specializationField.slug}`);
    console.log(`   Type: ${specializationField.type}`);
    console.log(`   Required: ${specializationField.required ? 'Yes' : 'No'}`);

    if (specializationField.type !== 'MultiReference') {
      console.error(`\n❌ ERROR: Field type is ${specializationField.type}, should be MultiReference`);
      process.exit(1);
    }

    console.log('\n═'.repeat(80));
    console.log('\n2️⃣  SPECIALIZATIONS COLLECTION:\n');

    console.log(`✅ Collection: ${specializationsCollection.displayName || specializationsCollection.name}`);
    console.log(`   Slug: ${specializationsCollection.slug}`);
    console.log(`   ID: ${specializationsCollection.id}`);

    // Get specializations count
    const specsResponse = await client.getCollectionItems(specializationsCollection.id, { limit: 100 });
    
    console.log(`   Items: ${specsResponse.items.length}`);

    if (specsResponse.items.length === 0) {
      console.error('\n❌ ERROR: No specializations found in collection');
      process.exit(1);
    }

    console.log('\n   Sample specializations:');
    specsResponse.items.slice(0, 5).forEach((spec) => {
      console.log(`   - ${spec.fieldData.name} (ID: ${spec.id})`);
    });

    console.log('\n═'.repeat(80));
    console.log('\n3️⃣  MULTI-REFERENCE CONFIGURATION:\n');

    // Check if the field references the correct collection
    if (specializationField.validations && specializationField.validations.collectionId) {
      const referencedCollectionId = specializationField.validations.collectionId;
      console.log(`✅ References collection: ${referencedCollectionId}`);
      
      if (referencedCollectionId === specializationsCollection.id) {
        console.log(`✅ Correctly references Specializations collection`);
      } else {
        console.error(`❌ References wrong collection (expected: ${specializationsCollection.id})`);
      }
    }

    console.log('\n═'.repeat(80));
    console.log('\n✅ SETUP LOOKS GOOD!\n');
    console.log('You can now run: node scripts/linkSpecializationsToVAs.js\n');
    console.log('═'.repeat(80));

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
