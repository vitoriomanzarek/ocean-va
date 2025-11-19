#!/usr/bin/env node

/**
 * Script to extract unique values from VA profiles
 * Extracts: Skills, Tools, Equipment, DISC Results, English Scores
 * Output: JSON file with unique values ready for CMS loading
 * 
 * Usage: node scripts/extract-unique-values.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const inputFile = path.join(__dirname, '../data/va-profiles-complete.json')
const outputFile = path.join(__dirname, '../data/unique-values.json')

console.log('🔍 Extracting unique values from VA profiles...\n')

// Load profiles
const profilesData = JSON.parse(fs.readFileSync(inputFile, 'utf-8'))
const profiles = profilesData.profiles

console.log(`📊 Processing ${profiles.length} profiles...\n`)

// Extract unique values
const uniqueValues = {
  skills: new Map(),
  tools: new Map(),
  equipment: new Map(),
  discBadges: new Set(),
  englishScores: new Set(),
  employmentEntries: [],
  educationEntries: []
}

// Process each profile
profiles.forEach((profile, index) => {
  // Skills
  if (profile.skills && Array.isArray(profile.skills)) {
    profile.skills.forEach(skill => {
      if (skill && !uniqueValues.skills.has(skill)) {
        uniqueValues.skills.set(skill, {
          name: skill,
          category: 'Other'
        })
      }
    })
  }

  // Tools
  if (profile.tools && Array.isArray(profile.tools)) {
    profile.tools.forEach(tool => {
      if (tool && !uniqueValues.tools.has(tool)) {
        uniqueValues.tools.set(tool, {
          name: tool,
          category: 'Other'
        })
      }
    })
  }

  // Equipment
  if (profile.equipment && Array.isArray(profile.equipment)) {
    profile.equipment.forEach(item => {
      if (item && !uniqueValues.equipment.has(item)) {
        uniqueValues.equipment.set(item, {
          name: item,
          category: 'Other'
        })
      }
    })
  }

  // DISC Badges
  if (profile.discResult) {
    uniqueValues.discBadges.add(profile.discResult)
  }

  // English Scores
  if (profile.englishScore) {
    uniqueValues.englishScores.add(profile.englishScore)
  }

  // Employment History
  if (profile.employmentHistory && Array.isArray(profile.employmentHistory)) {
    profile.employmentHistory.forEach(entry => {
      if (entry) {
        uniqueValues.employmentEntries.push({
          ...entry,
          vaName: profile.name
        })
      }
    })
  }

  // Education
  if (profile.education) {
    uniqueValues.educationEntries.push({
      ...profile.education,
      vaName: profile.name
    })
  }
})

// Convert Maps to Arrays
const output = {
  metadata: {
    totalProfiles: profiles.length,
    extractedAt: new Date().toISOString()
  },
  skills: {
    total: uniqueValues.skills.size,
    items: Array.from(uniqueValues.skills.values()).sort((a, b) => a.name.localeCompare(b.name))
  },
  tools: {
    total: uniqueValues.tools.size,
    items: Array.from(uniqueValues.tools.values()).sort((a, b) => a.name.localeCompare(b.name))
  },
  equipment: {
    total: uniqueValues.equipment.size,
    items: Array.from(uniqueValues.equipment.values()).sort((a, b) => a.name.localeCompare(b.name))
  },
  discBadges: {
    total: uniqueValues.discBadges.size,
    items: Array.from(uniqueValues.discBadges).sort()
  },
  englishScores: {
    total: uniqueValues.englishScores.size,
    items: Array.from(uniqueValues.englishScores).sort()
  },
  employmentHistory: {
    total: uniqueValues.employmentEntries.length,
    items: uniqueValues.employmentEntries
  },
  education: {
    total: uniqueValues.educationEntries.length,
    items: uniqueValues.educationEntries
  }
}

// Save output
fs.writeFileSync(outputFile, JSON.stringify(output, null, 2))

// Print summary
console.log('✅ Extraction complete!\n')
console.log('📊 SUMMARY:\n')
console.log(`  Skills: ${output.skills.total} unique`)
console.log(`  Tools: ${output.tools.total} unique`)
console.log(`  Equipment: ${output.equipment.total} unique`)
console.log(`  DISC Badges: ${output.discBadges.total} unique`)
console.log(`  English Scores: ${output.englishScores.total} unique`)
console.log(`  Employment Entries: ${output.employmentHistory.total} total`)
console.log(`  Education Entries: ${output.education.total} total`)
console.log(`\n📁 Output saved to: ${outputFile}`)
console.log(`📈 File size: ${(fs.statSync(outputFile).size / 1024).toFixed(2)} KB`)

// Print sample data
console.log('\n📋 SAMPLE DATA:\n')
console.log('Top 5 Skills:')
output.skills.items.slice(0, 5).forEach(skill => {
  console.log(`  - ${skill.name}`)
})
console.log('\nTop 5 Tools:')
output.tools.items.slice(0, 5).forEach(tool => {
  console.log(`  - ${tool.name}`)
})
console.log('\nEquipment:')
output.equipment.items.forEach(item => {
  console.log(`  - ${item.name}`)
})
console.log('\nDISC Badges:')
output.discBadges.items.forEach(badge => {
  console.log(`  - ${badge}`)
})
console.log('\nEnglish Scores:')
output.englishScores.items.forEach(score => {
  console.log(`  - ${score}`)
})
