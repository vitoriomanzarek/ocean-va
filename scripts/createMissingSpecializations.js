/**
 * Create missing Specializations in Webflow CMS
 * Run with: node scripts/createMissingSpecializations.js
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

// Specializations that need to be created
const missingSpecializations = [
  'Commercial Lines',
  'Policy Management'
]

async function main() {
  try {
    console.log('🔗 Creating missing Specializations in Webflow CMS...\n')

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
    
    // Find Specializations collection
    const specializationsCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'vas-specializations' || col.slug === 'specializations'
    )

    if (!specializationsCollection) {
      console.error('❌ Specializations collection not found')
      process.exit(1)
    }

    console.log(`📍 Specializations Collection ID: ${specializationsCollection.id}\n`)

    // Get collection schema to understand fields
    const collectionDetails = await client.getCollection(specializationsCollection.id)
    console.log('📋 Collection fields:')
    collectionDetails.fields.forEach(field => {
      console.log(`   - ${field.slug} (${field.type})`)
    })
    console.log('')

    // Get existing specializations
    console.log('📥 Fetching existing specializations...')
    const existingResponse = await client.getCollectionItems(specializationsCollection.id, { limit: 200 })
    const existingMap = {}
    existingResponse.items.forEach((item) => {
      const name = item.fieldData.name || item.fieldData['specialization-name']
      if (name) {
        existingMap[name] = item.id
      }
    })

    console.log(`✅ Found ${Object.keys(existingMap).length} existing specializations\n`)

    // Check which ones are missing
    const toCreate = missingSpecializations.filter(spec => !existingMap[spec])
    const alreadyExist = missingSpecializations.filter(spec => existingMap[spec])

    if (alreadyExist.length > 0) {
      console.log('✅ Already exist:')
      alreadyExist.forEach(spec => {
        console.log(`   - ${spec}`)
      })
      console.log('')
    }

    if (toCreate.length === 0) {
      console.log('✅ All specializations already exist!\n')
      return
    }

    console.log(`📝 Need to create ${toCreate.length} specializations:\n`)

    // Create each missing specialization
    for (const specName of toCreate) {
      try {
        console.log(`➕ Creating "${specName}"...`)
        
        // Determine field name based on collection schema
        // Common field names: 'name', 'specialization-name', 'title'
        const fieldData = {}
        
        // Try to find the name field
        const nameField = collectionDetails.fields.find(f => 
          f.slug === 'name' || 
          f.slug === 'specialization-name' || 
          f.slug === 'title'
        )

        if (nameField) {
          fieldData[nameField.slug] = specName
        } else {
          // Fallback: use first text field
          const textField = collectionDetails.fields.find(f => f.type === 'PlainText')
          if (textField) {
            fieldData[textField.slug] = specName
          } else {
            console.error(`❌ Could not determine name field for "${specName}"`)
            continue
          }
        }

        // Create slug from name
        const slug = specName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        if (collectionDetails.fields.find(f => f.slug === 'slug')) {
          fieldData['slug'] = slug
        }

        console.log(`   Field data:`, JSON.stringify(fieldData, null, 2))

        const result = await client.createCollectionItem(specializationsCollection.id, fieldData, {
          isDraft: false, // Create as published
        })

        const itemId = result.item?.id || result.id
        console.log(`   ✅ Created! ID: ${itemId}\n`)

      } catch (error) {
        console.error(`   ❌ Error creating "${specName}": ${error.message}`)
        if (error.response) {
          console.error('   Response:', JSON.stringify(error.response, null, 2))
        }
        console.log('')
      }
    }

    console.log('═'.repeat(80))
    console.log('\n✨ Done! Now you can run: node scripts/addKarlToWebflow.js\n')

  } catch (error) {
    console.error('❌ Error:', error.message)
    if (error.response) {
      console.error('Response:', JSON.stringify(error.response, null, 2))
    }
    process.exit(1)
  }
}

main()

