#!/usr/bin/env node

/**
 * Script to update Option field values after manual conversion in Webflow
 * Run this AFTER you've converted the fields to Option Fields in Webflow Designer
 * 
 * Usage: WEBFLOW_API_TOKEN="token" node scripts/update-option-field-values.js
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

console.log('🔄 Updating Option field values...\n')

// Load VA data
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

// Mapping functions
function mapSpecialization(spec) {
  if (!spec) return 'Insurance VA'
  
  const specMap = {
    'Auto': 'Auto Insurance',
    'Health': 'Health Insurance',
    'Home': 'Home Insurance',
    'Life': 'Life Insurance',
    'Commercial': 'Commercial Insurance',
    'Property': 'Property Insurance',
    'Liability': 'Liability Insurance',
    'Workers Comp': 'Workers Compensation',
    'Disability': 'Disability Insurance',
    'Travel': 'Travel Insurance',
    'Pet': 'Pet Insurance',
    'Motorcycle': 'Motorcycle Insurance',
    'Boat': 'Boat Insurance',
    'RV': 'RV Insurance',
    'Flood': 'Flood Insurance',
    'Earthquake': 'Earthquake Insurance',
    'Mortgage': 'Mortgage',
    'Real Estate': 'Real Estate',
    'Medical': 'Medical',
    'Executive Admin': 'Executive Admin',
    'Customer Service': 'Customer Service',
    'Data Entry': 'Data Entry'
  }
  
  return specMap[spec] || spec
}

async function main() {
  try {
    console.log('📝 Fetching all items...')
    const itemsUrl = `https://api.webflow.com/v2/collections/${COLLECTION_ID}/items?limit=100`
    const itemsResponse = await fetch(itemsUrl, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Accept-Version': '2.0'
      }
    })
    const itemsData = await itemsResponse.json()
    const items = itemsData.items || []

    console.log(`✅ Found ${items.length} items\n`)
    console.log('📝 Updating Option field values...\n')

    let updated = 0
    let errors = 0

    for (const item of items) {
      try {
        // Find corresponding VA
        const va = vasData.find(v => v.nombre === item.fieldData.name)
        if (!va) {
          console.log(`  ⏭️  ${item.fieldData.name}: Not found in vasData (skipped)`)
          continue
        }

        // Prepare update data with correct field names
        const updateBody = {
          fieldData: {
            'role': 'Insurance VA',
            'availability': va.disponibilidad || va.categorías?.[0] || 'Full Time',
            'languages': va.idiomas || 'English',
            'specializations': va.especialización?.[0] ? mapSpecialization(va.especialización[0]) : 'Insurance VA'
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

    console.log(`\n📊 Results:`)
    console.log(`  ✅ Updated: ${updated}`)
    console.log(`  ⚠️  Errors: ${errors}`)
    console.log(`  📈 Total: ${updated + errors}/${items.length}\n`)

    if (updated > 0) {
      console.log('🎉 Success!\n')
      console.log('📝 Next Steps:')
      console.log('  1. Go to Webflow Designer')
      console.log('  2. Navigate to Collections → Virtual Assistants')
      console.log('  3. Verify all items have correct Option values')
      console.log('  4. Create dynamic page template')
      console.log('  5. Add filters for: Role, Availability, Languages, Specializations')
    }

  } catch (error) {
    console.error('\n❌ Fatal Error:', error.message)
    process.exit(1)
  }
}

main()
