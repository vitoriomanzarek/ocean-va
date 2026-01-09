/**
 * Add Karl to Webflow CMS
 * Run with: node scripts/addKarlToWebflow.js
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

// Karl's data
const karlData = {
  name: 'Karl',
  title: 'English Speaking VA | Personal and Commercial Lines Insurance',
  experienceYears: '3 years',
  languages: 'English (Advanced - C1)',
  // Only 4 specializations as multireference
  specializations: ['Personal Lines', 'Commercial Lines', 'Insurance Quoting', 'Policy Management'],
  // All skills for display (not multireference)
  allSkills: ['Personal Lines', 'Commercial Lines', 'Insurance Quoting', 'Policy Management', 'Endorsements', 'Renewals', 'COI Issuance', 'Billing Support', 'Carrier Coordination', 'Client Communication', 'CRM Management', 'Data Accuracy'],
  availability: 'Available',
  imageUrl: 'https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/695d63fa9d2a8fbb0544f958_Karl.webp',
  videoUrl: 'https://www.youtube.com/watch?v=W6f_dt2kiIY',
  videoThumbnail: 'https://img.youtube.com/vi/W6f_dt2kiIY/maxresdefault.jpg',
  summary: 'Karl is an Insurance Virtual Assistant with over six years of experience in the BPO industry and three years supporting U.S.-based insurance agencies. He has worked extensively with Personal Lines and selected Commercial Lines, collaborating directly with licensed agents in Florida, Massachusetts, New Hampshire, and Maine. His experience covers the full policy lifecycle, strong carrier coordination, and consistent client-facing support in fast-paced insurance environments.',
  tagline: 'Karl is a dependable Insurance VA who can independently handle quoting, endorsements, renewals, and COIs with precision and confidence. His familiarity with carrier portals, rating tools, and CRMs allows agencies to streamline operations while maintaining accuracy, compliance, and high service standards.',
  thumbnailDescription: '3 yrs of Insurance Experience, PERSONAL & COMMERCIAL LINES, MULTI-STATE EXPERIENCE',
  profileSlug: 'karl-ocean-va-profile',
  mainCategory: 'Insurance Virtual Assistant'
}

async function main() {
  try {
    console.log('🔗 Adding Karl to Webflow CMS...\n')

    // Get sites and collection ID
    const sitesResponse = await client.getSites()
    const site = sitesResponse.sites[0]

    if (!site) {
      console.error('❌ No sites found')
      process.exit(1)
    }

    const collectionsResponse = await client.getCollections(site.id)
    const vaCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'virtual-assistants'
    )

    if (!vaCollection) {
      console.error('❌ Virtual Assistants collection not found')
      process.exit(1)
    }

    console.log(`📍 Site: ${site.displayName || site.name}`)
    console.log(`📍 Collection ID: ${vaCollection.id}\n`)

    // Find Specializations collection
    const specializationsCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'vas-specializations' || col.slug === 'specializations'
    )

    if (!specializationsCollection) {
      console.error('❌ Specializations collection not found')
      process.exit(1)
    }

    console.log(`📍 Specializations Collection ID: ${specializationsCollection.id}\n`)

    // Find Main Category collection
    const mainCategoryCollection = collectionsResponse.collections.find(
      (col) => col.slug === 'main-category' || col.slug === 'main-categories'
    )

    if (!mainCategoryCollection) {
      console.error('❌ Main Category collection not found')
      process.exit(1)
    }

    console.log(`📍 Main Category Collection ID: ${mainCategoryCollection.id}\n`)

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

    // Get specialization IDs for Karl (only 4)
    const specializationIds = karlData.specializations
      .map((spec) => specializationMap[spec])
      .filter((id) => id)

    console.log(`📋 Specializations to link (${specializationIds.length}):`)
    karlData.specializations.forEach((spec) => {
      const id = specializationMap[spec]
      console.log(`   ${spec}: ${id ? '✅' : '❌'}`)
    })
    console.log('')

    // Get main category ID
    console.log('📥 Fetching main categories...')
    const mainCategoryResponse = await client.getCollectionItems(mainCategoryCollection.id, { limit: 50 })
    const mainCategoryMap = {}
    mainCategoryResponse.items.forEach((item) => {
      const name = item.fieldData.name || item.fieldData['category-name']
      if (name) {
        mainCategoryMap[name] = item.id
      }
    })

    const mainCategoryId = mainCategoryMap[karlData.mainCategory]
    console.log(`✅ Main Category "${karlData.mainCategory}": ${mainCategoryId ? '✅' : '❌'}\n`)

    if (!mainCategoryId) {
      console.error(`❌ Main Category "${karlData.mainCategory}" not found`)
      console.log('Available categories:', Object.keys(mainCategoryMap))
      process.exit(1)
    }

    console.log(`➕ Adding Karl...\n`)

    try {
      const fieldData = {
        'name': karlData.name,
        'slug': karlData.profileSlug.split('-')[0], // Simple slug like "karl"
        'experience-years': karlData.experienceYears,
        'languages': karlData.languages,
        'availability': karlData.availability,
        'image': karlData.imageUrl, // Image field - URL as string
        'profile-slug-2': `https://www.oceanvirtualassistant.com/${karlData.profileSlug}`, // Link field
        'video': karlData.videoUrl || '', // Link field
        'summary': karlData.summary,
        'tagline': karlData.tagline,
        'thumbnail-description': karlData.thumbnailDescription,
        'skills-tags': karlData.allSkills.join(', '), // All skills as plain text for display
        'disc-type': 'S+I',
        'english-score': '90',
        'english-level': 'C1 (CEFR) - Advanced'
      }

      // Add main-categories as multi-reference
      if (mainCategoryId) {
        fieldData['main-categories'] = [mainCategoryId]
      }

      // Add specializations as multi-reference (only 4)
      if (specializationIds.length > 0) {
        fieldData['specialization'] = specializationIds
      }

      console.log('📋 Field Data:')
      console.log(JSON.stringify(fieldData, null, 2))
      console.log('\n')

      const result = await client.createCollectionItem(vaCollection.id, fieldData, {
        isDraft: false, // Create as published
      })

      const itemId = result.item?.id || result.id || result.success
      console.log(`✅ Karl added successfully!\n`)
      console.log(`📌 Item ID: ${itemId}`)
      console.log(`📌 Status: Published\n`)
      console.log(`📌 Main Category: ${karlData.mainCategory} (linked)`)
      console.log(`📌 Specializations: ${specializationIds.length} linked\n`)
      console.log('═'.repeat(80))
      console.log('\n✨ Next steps:')
      console.log('1. Verify all fields in Webflow CMS')
      console.log('2. Verify Main Categories and Specializations are linked correctly')
      console.log('3. Add schema markup to the profile page\n')

    } catch (error) {
      console.error(`❌ Error adding Karl: ${error.message}`)
      if (error.response) {
        console.error('Response:', JSON.stringify(error.response, null, 2))
      }
      process.exit(1)
    }

  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

main()

