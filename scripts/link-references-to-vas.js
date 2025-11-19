#!/usr/bin/env node

/**
 * Script to link references from VA profiles to collection items
 * Links: Skills, Tools, Equipment, Employment, Education to Virtual Assistants
 * 
 * Usage: WEBFLOW_API_TOKEN="token" node scripts/link-references-to-vas.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const API_TOKEN = process.env.WEBFLOW_API_TOKEN

if (!API_TOKEN) {
  console.error('❌ Error: WEBFLOW_API_TOKEN required')
  console.error('Usage: WEBFLOW_API_TOKEN="token" node scripts/link-references-to-vas.js')
  process.exit(1)
}

console.log('🚀 Linking references to VA profiles...\n')

// Load data files
const profilesPath = path.join(__dirname, '../data/va-profiles-complete.json')
const collectionIdsPath = path.join(__dirname, '../data/collection-ids.json')

if (!fs.existsSync(profilesPath)) {
  console.error('❌ Error: va-profiles-complete.json not found')
  process.exit(1)
}

if (!fs.existsSync(collectionIdsPath)) {
  console.error('❌ Error: collection-ids.json not found')
  process.exit(1)
}

const profilesData = JSON.parse(fs.readFileSync(profilesPath, 'utf-8'))
const collectionIds = JSON.parse(fs.readFileSync(collectionIdsPath, 'utf-8'))

console.log(`✅ Loaded ${profilesData.profiles.length} profiles\n`)

// API Helper
async function apiCall(method, endpoint, body = null) {
  const url = `https://api.webflow.com/v2${endpoint}`
  const options = {
    method,
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
      'Accept-Version': '2.0'
    }
  }

  if (body) {
    options.body = JSON.stringify(body)
  }

  try {
    const response = await fetch(url, options)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(`${response.status} - ${data.message || JSON.stringify(data)}`)
    }

    return data
  } catch (error) {
    throw error
  }
}

// Get all items from collection
async function getCollectionItems(collectionId) {
  console.log(`  Fetching items from collection...`)
  
  try {
    const response = await apiCall('GET', `/collections/${collectionId}/items`)
    return response.items || []
  } catch (error) {
    console.error(`  ❌ Error fetching items: ${error.message}`)
    return []
  }
}

// Get VA by name
async function getVAByName(vaName) {
  const vaCollectionId = collectionIds.virtualAssistants
  
  try {
    const response = await apiCall('GET', `/collections/${vaCollectionId}/items`)
    const items = response.items || []
    
    // Find VA by name (case-insensitive)
    return items.find(item => 
      item.fieldData?.name?.toUpperCase() === vaName.toUpperCase()
    )
  } catch (error) {
    console.error(`  ❌ Error finding VA: ${error.message}`)
    return null
  }
}

// Update VA with references
async function updateVAReferences(vaId, fieldData) {
  const vaCollectionId = collectionIds.virtualAssistants
  
  try {
    await apiCall('PATCH', `/collections/${vaCollectionId}/items/${vaId}`, {
      fieldData
    })
    return true
  } catch (error) {
    console.error(`  ❌ Error updating VA: ${error.message}`)
    return false
  }
}

// Main execution
async function main() {
  try {
    console.log('📊 Loading collection items...\n')

    // Load all collection items
    console.log('  Loading Skills...')
    const skillsItems = await getCollectionItems(collectionIds.skills)
    const skillsMap = new Map(skillsItems.map(item => [item.fieldData?.name, item.id]))

    console.log('  Loading Tools...')
    const toolsItems = await getCollectionItems(collectionIds.tools)
    const toolsMap = new Map(toolsItems.map(item => [item.fieldData?.name, item.id]))

    console.log('  Loading Equipment...')
    const equipmentItems = await getCollectionItems(collectionIds.equipment)
    const equipmentMap = new Map(equipmentItems.map(item => [item.fieldData?.name, item.id]))

    console.log('  Loading Employment...')
    const employmentItems = await getCollectionItems(collectionIds.employment)
    const employmentMap = new Map(employmentItems.map(item => [
      `${item.fieldData?.company}|${item.fieldData?.position}|${item.fieldData?.period}`,
      item.id
    ]))

    console.log('  Loading Education...')
    const educationItems = await getCollectionItems(collectionIds.education)
    const educationMap = new Map(educationItems.map(item => [
      `${item.fieldData?.school}|${item.fieldData?.degree}|${item.fieldData?.year}`,
      item.id
    ]))

    console.log(`\n✅ Loaded ${skillsItems.length} skills, ${toolsItems.length} tools, ${equipmentItems.length} equipment, ${employmentItems.length} employment, ${educationItems.length} education\n`)

    // Process each profile
    console.log('🔗 Linking references to VAs...\n')
    let updated = 0
    let failed = 0

    for (const profile of profilesData.profiles) {
      try {
        // Get VA
        const va = await getVAByName(profile.name)
        if (!va) {
          console.log(`  ⚠️  VA not found: ${profile.name}`)
          failed++
          continue
        }

        const fieldData = {}

        // Link Skills
        if (profile.skills && Array.isArray(profile.skills)) {
          const skillIds = profile.skills
            .map(skill => skillsMap.get(skill))
            .filter(id => id)
          if (skillIds.length > 0) {
            fieldData.skills = skillIds
          }
        }

        // Link Tools
        if (profile.tools && Array.isArray(profile.tools)) {
          const toolIds = profile.tools
            .map(tool => toolsMap.get(tool))
            .filter(id => id)
          if (toolIds.length > 0) {
            fieldData.tools = toolIds
          }
        }

        // Link Equipment
        if (profile.equipment && Array.isArray(profile.equipment)) {
          const equipmentIds = profile.equipment
            .map(item => equipmentMap.get(item))
            .filter(id => id)
          if (equipmentIds.length > 0) {
            fieldData.equipment = equipmentIds
          }
        }

        // Link Employment
        if (profile.employmentHistory && Array.isArray(profile.employmentHistory)) {
          const employmentIds = profile.employmentHistory
            .map(entry => employmentMap.get(`${entry.company}|${entry.position}|${entry.period}`))
            .filter(id => id)
          if (employmentIds.length > 0) {
            fieldData['employment-history'] = employmentIds
          }
        }

        // Link Education
        if (profile.education) {
          const educationId = educationMap.get(
            `${profile.education.school}|${profile.education.degree}|${profile.education.date}`
          )
          if (educationId) {
            fieldData.education = [educationId]
          }
        }

        // Add DISC and English fields
        if (profile.discResult) {
          fieldData['disc-badge'] = profile.discResult.toLowerCase()
        }
        if (profile.discResultDescription) {
          fieldData['disc-description'] = profile.discResultDescription
        }
        if (profile.englishScore) {
          fieldData['english-score'] = profile.englishScore
        }
        if (profile.englishDescription) {
          fieldData['english-description'] = profile.englishDescription
        }

        // Update VA
        const success = await updateVAReferences(va.id, fieldData)
        if (success) {
          updated++
          console.log(`  ✅ ${profile.name}`)
        } else {
          failed++
        }

      } catch (error) {
        console.error(`  ❌ Error processing ${profile.name}: ${error.message}`)
        failed++
      }
    }

    console.log(`\n✅ Linking complete!\n`)
    console.log(`📊 SUMMARY:\n`)
    console.log(`  Updated: ${updated}`)
    console.log(`  Failed: ${failed}`)
    console.log(`  Total: ${profilesData.profiles.length}`)

  } catch (error) {
    console.error('\n❌ Error:', error.message)
    process.exit(1)
  }
}

main()
