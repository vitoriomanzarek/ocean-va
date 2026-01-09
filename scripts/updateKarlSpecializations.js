/**
 * Update Karl's Specializations in Webflow CMS
 * Run with: node scripts/updateKarlSpecializations.js
 */

import dotenv from 'dotenv'
import WebflowApiClient from '../src/webflow/webflowApiClient.js'

dotenv.config()

const token = process.env.WEBFLOW_API_TOKEN
if (!token) {
  console.error('❌ WEBFLOW_API_TOKEN not found in .env')
  process.exit(1)
}

const client = new WebflowApiClient(token)

// Karl's item ID from previous run
const karlItemId = '695d70bb817fe323368bd413'

// All 4 specializations
const karlSpecializations = [
  'Personal Lines',
  'Commercial Lines',
  'Insurance Quoting',
  'Policy Management'
]

async function main() {
  try {
    console.log('🔗 Updating Karl\'s Specializations in Webflow CMS...\n')

    // Get sites
    const sitesResponse = await client.getSites()
    const site = sitesResponse.sites[0]

    if (!site) {
      console.error('❌ No sites found')
      process.exit(1)
    }

    console.log(`📍 Site: ${site.displayName || site.name}\n`)

    // Get collections
    const collectionsResponse = await client.getCollections(site.id)
    
    // Find Virtual Assistants collection
    const vaCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'virtual-assistants'
    )

    if (!vaCollection) {
      console.error('❌ Virtual Assistants collection not found')
      process.exit(1)
    }

    console.log(`📍 Virtual Assistants Collection ID: ${vaCollection.id}\n`)

    // Find Specializations collection
    const specializationsCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'vas-specializations' || col.slug === 'specializations'
    )

    if (!specializationsCollection) {
      console.error('❌ Specializations collection not found')
      process.exit(1)
    }

    console.log(`📍 Specializations Collection ID: ${specializationsCollection.id}\n`)

    // Get all specializations to find IDs
    console.log('📥 Fetching specializations...')
    const specializationsResponse = await client.getCollectionItems(specializationsCollection.id, { limit: 200 })
    const specializationMap = {}
    specializationsResponse.items.forEach((item) => {
      const name = item.fieldData.name || item.fieldData['specialization-name']
      if (name) {
        specializationMap[name] = item.id
      }
    })

    console.log(`✅ Found ${Object.keys(specializationMap).length} specializations\n`)

    // Get specialization IDs for Karl
    const specializationIds = karlSpecializations
      .map((spec) => specializationMap[spec])
      .filter((id) => id)

    console.log(`📋 Specializations to link (${specializationIds.length}):`)
    karlSpecializations.forEach((spec) => {
      const id = specializationMap[spec]
      console.log(`   ${spec}: ${id ? '✅' : '❌'}`)
    })
    console.log('')

    if (specializationIds.length !== karlSpecializations.length) {
      console.error('❌ Not all specializations found!')
      process.exit(1)
    }

    // Get current item
    console.log(`📥 Fetching Karl's current data...`)
    const currentItem = await client.getCollectionItem(vaCollection.id, karlItemId)
    console.log(`✅ Found Karl (${currentItem.fieldData.name})\n`)

    // Update with all 4 specializations
    console.log('🔄 Updating Karl with all 4 specializations...\n')
    
    const updateData = {
      'specialization': specializationIds
    }

    console.log('📋 Update Data:')
    console.log(JSON.stringify(updateData, null, 2))
    console.log('')

    const result = await client.updateCollectionItem(vaCollection.id, karlItemId, updateData, {
      isDraft: false
    })

    console.log(`✅ Karl updated successfully!\n`)
    console.log(`📌 Item ID: ${karlItemId}`)
    console.log(`📌 Specializations: ${specializationIds.length} linked`)
    console.log(`   - Personal Lines`)
    console.log(`   - Commercial Lines`)
    console.log(`   - Insurance Quoting`)
    console.log(`   - Policy Management\n`)
    console.log('═'.repeat(80))
    console.log('\n✨ Done! Verify in Webflow CMS that all 4 specializations are linked.\n')

  } catch (error) {
    console.error('❌ Error:', error.message)
    if (error.response) {
      console.error('Response:', JSON.stringify(error.response, null, 2))
    }
    process.exit(1)
  }
}

main()

