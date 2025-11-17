#!/usr/bin/env node

/**
 * Script to convert PlainText fields to Option Fields in Webflow CMS
 * Converts Spanish field names to English
 * 
 * Usage: WEBFLOW_API_TOKEN="token" node scripts/convert-fields-to-option-fields.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url' 

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.dirname(__dirname)

const COLLECTION_ID = '691b82a97542c69f3f77fa76'
const API_TOKEN = process.env.WEBFLOW_API_TOKEN

if (!API_TOKEN) {
  console.error('❌ Error: WEBFLOW_API_TOKEN not set')
  process.exit(1)
}

console.log('🔄 Converting fields to Option Fields...\n')

// Field conversions needed
const fieldConversions = {
  'role': {
    oldSlug: 'title',
    newDisplayName: 'Role',
    newSlug: 'role',
    type: 'Option',
    options: [
      'Insurance VA',
      'Mortgage Specialist',
      'CSR',
      'Executive Admin',
      'Medical VA',
      'Real Estate VA'
    ]
  },
  'availability': {
    oldSlug: 'availability',
    newDisplayName: 'Availability',
    newSlug: 'availability',
    type: 'Option',
    options: [
      'Full Time',
      'Part Time',
      'Assigned'
    ]
  },
  'languages': {
    oldSlug: 'languages',
    newDisplayName: 'Languages',
    newSlug: 'languages',
    type: 'Option',
    options: [
      'English',
      'Spanish',
      'Portuguese',
      'Bilingual EN-ES',
      'Bilingual EN-PT'
    ]
  },
  'specializations': {
    oldSlug: 'specializations',
    newDisplayName: 'Specializations',
    newSlug: 'specializations',
    type: 'Option',
    options: [
      'Auto Insurance',
      'Home Insurance',
      'Health Insurance',
      'Life Insurance',
      'Commercial Insurance',
      'Mortgage',
      'Real Estate',
      'Medical',
      'Executive Admin',
      'Customer Service',
      'Data Entry',
      'Email Management',
      'Calendar Management',
      'Social Media',
      'Content Writing',
      'Bookkeeping',
      'Accounting',
      'HR',
      'Payroll',
      'Legal',
      'Insurance Claims',
      'Insurance Quotes',
      'Insurance Processing',
      'Insurance Customer Service',
      'Insurance Underwriting',
      'Insurance Adjusting',
      'Insurance Brokerage',
      'Insurance Agency',
      'Insurance Compliance',
      'Insurance Licensing',
      'Insurance Training',
      'Insurance Consulting'
    ]
  }
}

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

  const response = await fetch(url, options)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(`${response.status} - ${data.message || JSON.stringify(data)}`)
  }

  return data
}

async function main() {
  try {
    // Step 1: Get current collection
    console.log('📋 Step 1: Getting current collection...')
    const collection = await apiCall('GET', `/collections/${COLLECTION_ID}`)
    console.log(`✅ Collection: ${collection.displayName}\n`)

    // Step 2: Create new Option fields
    console.log('📝 Step 2: Creating new Option fields...\n')
    
    const newFields = {}
    
    for (const [key, config] of Object.entries(fieldConversions)) {
      try {
        console.log(`  Creating field: ${config.newDisplayName}...`)
        
        const fieldBody = {
          displayName: config.newDisplayName,
          slug: config.newSlug,
          type: config.type,
          options: config.options.map(opt => ({ name: opt }))
        }

        const newField = await apiCall('POST', `/collections/${COLLECTION_ID}/fields`, fieldBody)
        newFields[key] = newField.id
        console.log(`  ✅ ${config.newDisplayName} (ID: ${newField.id})`)
      } catch (error) {
        console.log(`  ⚠️  ${config.newDisplayName}: ${error.message}`)
      }
    }

    console.log(`\n✅ Created ${Object.keys(newFields).length} new Option fields\n`)

    // Step 3: Load VA data
    console.log('📝 Step 3: Loading VA data...')
    const vasDataPath = path.join(rootDir, 'src', 'data', 'vasData.js')
    const vasDataContent = fs.readFileSync(vasDataPath, 'utf-8')
    const vasDataMatch = vasDataContent.match(/export const vasData = \[([\s\S]*)\]/)

    let vasData = []
    try {
      const arrayContent = '[' + vasDataMatch[1] + ']'
      vasData = eval('(' + arrayContent + ')')
    } catch (e) {
      console.error('❌ Error parsing vasData:', e.message)
      process.exit(1)
    }

    console.log(`✅ Loaded ${vasData.length} VAs\n`)

    // Step 4: Get all items and update them
    console.log('📝 Step 4: Updating items with new Option field values...\n')
    
    const itemsUrl = `https://api.webflow.com/v2/collections/${COLLECTION_ID}/items?limit=100`
    const itemsResponse = await fetch(itemsUrl, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Accept-Version': '2.0'
      }
    })
    const itemsData = await itemsResponse.json()
    const items = itemsData.items || []

    console.log(`Found ${items.length} items to update\n`)

    let updated = 0
    let errors = 0

    for (const item of items) {
      try {
        // Find corresponding VA
        const va = vasData.find(v => v.nombre === item.fieldData.name)
        if (!va) {
          console.log(`  ⚠️  ${item.fieldData.name}: Not found in vasData`)
          continue
        }

        // Prepare update data
        const updateBody = {
          fieldData: {
            'role': 'Insurance VA', // Default role
            'availability': va.disponibilidad || va.categorías?.[0] || 'Full Time',
            'languages': va.idiomas || 'English',
            'specializations': va.especialización?.[0] || 'Insurance VA'
          }
        }

        // Update item
        await apiCall('PATCH', `/collections/${COLLECTION_ID}/items/${item.id}`, updateBody)
        updated++
        console.log(`  ✅ ${va.nombre}`)
      } catch (error) {
        errors++
        console.log(`  ⚠️  ${item.fieldData.name}: ${error.message}`)
      }
    }

    console.log(`\n✅ Updated ${updated} items (${errors} errors)\n`)

    // Step 5: Summary
    console.log('🎉 Conversion Complete!\n')
    console.log('📊 Summary:')
    console.log(`  - New Option fields created: ${Object.keys(newFields).length}`)
    console.log(`  - Items updated: ${updated}`)
    console.log(`  - Errors: ${errors}`)
    console.log('\n📝 Next Steps:')
    console.log('  1. Go to Webflow Designer')
    console.log('  2. Navigate to Collections → Virtual Assistants')
    console.log('  3. Verify new Option fields')
    console.log('  4. Create dynamic page template')
    console.log('  5. Add filters for: Role, Availability, Languages, Specializations')

  } catch (error) {
    console.error('\n❌ Fatal Error:', error.message)
    process.exit(1)
  }
}

main()
