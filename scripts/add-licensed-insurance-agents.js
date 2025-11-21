#!/usr/bin/env node

/**
 * Script to add Licensed Insurance Agents to vasData.js
 * 
 * Usage: node scripts/add-licensed-insurance-agents.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🔄 Adding Licensed Insurance Agents to vasData.js...\n')

const vasDataPath = path.join(__dirname, '../src/data/vasData.js')
let content = fs.readFileSync(vasDataPath, 'utf-8')

// Licensed Insurance Agents data extracted from images
const licensedAgents = [
  // BILINGUAL ENGLISH-SPANISH INSURANCE AGENTS
  {
    id: 79,
    nombre: "Jeanette",
    categoría_principal: "Insurance Virtual Assistant",
    mainCategory: "Insurance Virtual Assistant",
    idiomas: "Bilingual (EN-ES)",
    años_experiencia: 7,
    especialización: ["Home & Auto Insurance", "State License - Illinois"],
    nivel_inglés: "Proficient",
    disponibilidad: "Full Time",
    horario: "",
    categorías: ["Insurance VA"],
    slug: "jeanette-licensed-insurance-agent-ocean-va-profile",
    imagen: "/images/VAs/Jeanette.webp"
  },
  {
    id: 80,
    nombre: "Jose",
    categoría_principal: "Insurance Virtual Assistant",
    mainCategory: "Insurance Virtual Assistant",
    idiomas: "Bilingual (EN-ES)",
    años_experiencia: 3,
    especialización: ["Personal, Commercial & Health Insurance", "State License - All States"],
    nivel_inglés: "Proficient",
    disponibilidad: "Full Time",
    horario: "",
    categorías: ["Insurance VA"],
    slug: "jose-licensed-insurance-agent-ocean-va-profile",
    imagen: "/images/VAs/Jose.webp"
  },
  {
    id: 81,
    nombre: "Kevin S.",
    categoría_principal: "Insurance Virtual Assistant",
    mainCategory: "Insurance Virtual Assistant",
    idiomas: "Multilingual (EN-ES-PT)",
    años_experiencia: 8,
    especialización: ["Property & Casualty Insurance", "State License - All States"],
    nivel_inglés: "Advanced",
    disponibilidad: "Full Time",
    horario: "",
    categorías: ["Insurance VA"],
    slug: "kevin-s-licensed-insurance-agent-ocean-va-profile",
    imagen: "/images/VAs/Kevin S.webp"
  },
  {
    id: 82,
    nombre: "Leah",
    categoría_principal: "Insurance Virtual Assistant",
    mainCategory: "Insurance Virtual Assistant",
    idiomas: "Bilingual (EN-ES)",
    años_experiencia: 1,
    especialización: ["Property & Casualty Insurance", "State License - Multiple States"],
    nivel_inglés: "Proficient",
    disponibilidad: "Full Time",
    horario: "",
    categorías: ["Insurance VA"],
    slug: "leah-licensed-insurance-agent-ocean-va-profile",
    imagen: "/images/VAs/Leah.webp"
  },
  {
    id: 83,
    nombre: "Liliana",
    categoría_principal: "Insurance Virtual Assistant",
    mainCategory: "Insurance Virtual Assistant",
    idiomas: "Bilingual (EN-ES)",
    años_experiencia: 4,
    especialización: ["Property & Casualty", "State License - Texas"],
    nivel_inglés: "Proficient",
    disponibilidad: "Full Time",
    horario: "",
    categorías: ["Insurance VA"],
    slug: "liliana-licensed-insurance-agent-ocean-va-profile",
    imagen: "/images/VAs/Liliana.webp"
  },
  {
    id: 84,
    nombre: "Maria R.",
    categoría_principal: "Insurance Virtual Assistant",
    mainCategory: "Insurance Virtual Assistant",
    idiomas: "Bilingual (EN-ES)",
    años_experiencia: 4,
    especialización: ["Property, Casualty, Life & Health Insurance", "State License - Multiple States"],
    nivel_inglés: "Proficient",
    disponibilidad: "Full Time",
    horario: "",
    categorías: ["Insurance VA"],
    slug: "maria-r-licensed-insurance-agent-ocean-va-profile",
    imagen: "/images/VAs/Maria R.webp"
  },
  // ENGLISH-SPEAKING INSURANCE AGENTS
  {
    id: 85,
    nombre: "Amber",
    categoría_principal: "Insurance Virtual Assistant",
    mainCategory: "Insurance Virtual Assistant",
    idiomas: "English",
    años_experiencia: 21,
    especialización: ["Property & Casualty Insurance", "State License - Multiple States"],
    nivel_inglés: "Advanced",
    disponibilidad: "Full Time",
    horario: "",
    categorías: ["Insurance VA"],
    slug: "amber-licensed-insurance-agent-ocean-va-profile",
    imagen: "/images/VAs/Amber.webp"
  },
  {
    id: 86,
    nombre: "Anthony",
    categoría_principal: "Insurance Virtual Assistant",
    mainCategory: "Insurance Virtual Assistant",
    idiomas: "English",
    años_experiencia: 7,
    especialización: ["Personal Lines, Auto & Home Insurance", "State License - Florida"],
    nivel_inglés: "Advanced",
    disponibilidad: "Full Time",
    horario: "",
    categorías: ["Insurance VA"],
    slug: "anthony-licensed-insurance-agent-ocean-va-profile",
    imagen: "/images/VAs/Anthony.webp"
  },
  {
    id: 87,
    nombre: "Autumn",
    categoría_principal: "Insurance Virtual Assistant",
    mainCategory: "Insurance Virtual Assistant",
    idiomas: "English",
    años_experiencia: 1,
    especialización: ["Personal Lines, Home & Auto Insurance", "State License - Nebraska, Iowa"],
    nivel_inglés: "Advanced",
    disponibilidad: "Full Time",
    horario: "",
    categorías: ["Insurance VA"],
    slug: "autumn-licensed-insurance-agent-ocean-va-profile",
    imagen: "/images/VAs/Autumn.webp"
  },
  {
    id: 88,
    nombre: "Carlo",
    categoría_principal: "Insurance Virtual Assistant",
    mainCategory: "Insurance Virtual Assistant",
    idiomas: "English",
    años_experiencia: 18,
    especialización: ["Property & Casualty Insurance", "State License - Florida"],
    nivel_inglés: "Advanced",
    disponibilidad: "Full Time",
    horario: "",
    categorías: ["Insurance VA"],
    slug: "carlo-licensed-insurance-agent-ocean-va-profile",
    imagen: "/images/VAs/Carlo.webp"
  },
  {
    id: 89,
    nombre: "Christopher",
    categoría_principal: "Insurance Virtual Assistant",
    mainCategory: "Insurance Virtual Assistant",
    idiomas: "English",
    años_experiencia: 7,
    especialización: ["Home & Auto Insurance", "State License - Oklahoma"],
    nivel_inglés: "Advanced",
    disponibilidad: "Full Time",
    horario: "",
    categorías: ["Insurance VA"],
    slug: "christopher-licensed-insurance-agent-ocean-va-profile",
    imagen: "/images/VAs/Christopher.webp"
  },
  {
    id: 90,
    nombre: "Erika",
    categoría_principal: "Insurance Virtual Assistant",
    mainCategory: "Insurance Virtual Assistant",
    idiomas: "English",
    años_experiencia: 5,
    especialización: ["Property & Casualty Insurance", "State License - Nebraska"],
    nivel_inglés: "Advanced",
    disponibilidad: "Full Time",
    horario: "",
    categorías: ["Insurance VA"],
    slug: "erika-licensed-insurance-agent-ocean-va-profile",
    imagen: "/images/VAs/Erika.webp"
  },
  {
    id: 91,
    nombre: "Jalil",
    categoría_principal: "Insurance Virtual Assistant",
    mainCategory: "Insurance Virtual Assistant",
    idiomas: "English",
    años_experiencia: 1,
    especialización: ["Property & Casualty Insurance", "State License - Texas"],
    nivel_inglés: "Advanced",
    disponibilidad: "Full Time",
    horario: "",
    categorías: ["Insurance VA"],
    slug: "jalil-licensed-insurance-agent-ocean-va-profile",
    imagen: "/images/VAs/Jalil.webp"
  },
  {
    id: 92,
    nombre: "Janki",
    categoría_principal: "Insurance Virtual Assistant",
    mainCategory: "Insurance Virtual Assistant",
    idiomas: "English",
    años_experiencia: 7,
    especialización: ["Property & Casualty Insurance", "State License - Georgia"],
    nivel_inglés: "Advanced",
    disponibilidad: "Full Time",
    horario: "",
    categorías: ["Insurance VA"],
    slug: "janki-licensed-insurance-agent-ocean-va-profile",
    imagen: "/images/VAs/Janki.webp"
  },
  {
    id: 93,
    nombre: "John",
    categoría_principal: "Insurance Virtual Assistant",
    mainCategory: "Insurance Virtual Assistant",
    idiomas: "English",
    años_experiencia: 8,
    especialización: ["Commercial & General Liability Insurance", "State License - Michigan"],
    nivel_inglés: "Advanced",
    disponibilidad: "Full Time",
    horario: "",
    categorías: ["Insurance VA"],
    slug: "john-licensed-insurance-agent-ocean-va-profile",
    imagen: "/images/VAs/John.webp"
  },
  {
    id: 94,
    nombre: "Julie",
    categoría_principal: "Insurance Virtual Assistant",
    mainCategory: "Insurance Virtual Assistant",
    idiomas: "English",
    años_experiencia: 2,
    especialización: ["Personal Lines, Home & Auto Insurance", "State License - Michigan"],
    nivel_inglés: "Advanced",
    disponibilidad: "Full Time",
    horario: "",
    categorías: ["Insurance VA"],
    slug: "julie-licensed-insurance-agent-ocean-va-profile",
    imagen: "/images/VAs/Julie.webp"
  },
  {
    id: 95,
    nombre: "Katie",
    categoría_principal: "Insurance Virtual Assistant",
    mainCategory: "Insurance Virtual Assistant",
    idiomas: "English",
    años_experiencia: 1,
    especialización: ["Property & Casualty Insurance", "State License - Multiple States"],
    nivel_inglés: "Advanced",
    disponibilidad: "Full Time",
    horario: "",
    categorías: ["Insurance VA"],
    slug: "katie-licensed-insurance-agent-ocean-va-profile",
    imagen: "/images/VAs/Katie.webp"
  },
  {
    id: 96,
    nombre: "Kelly",
    categoría_principal: "Insurance Virtual Assistant",
    mainCategory: "Insurance Virtual Assistant",
    idiomas: "English",
    años_experiencia: 3,
    especialización: ["Homeowners, Auto Insurance", "State License - Florida"],
    nivel_inglés: "Advanced",
    disponibilidad: "Full Time",
    horario: "",
    categorías: ["Insurance VA"],
    slug: "kelly-licensed-insurance-agent-ocean-va-profile",
    imagen: "/images/VAs/Kelly.webp"
  },
  {
    id: 97,
    nombre: "Laketha",
    categoría_principal: "Insurance Virtual Assistant",
    mainCategory: "Insurance Virtual Assistant",
    idiomas: "English",
    años_experiencia: 9,
    especialización: ["Property & Casualty Insurance", "State License - Texas"],
    nivel_inglés: "Advanced",
    disponibilidad: "Full Time",
    horario: "",
    categorías: ["Insurance VA"],
    slug: "laketha-licensed-insurance-agent-ocean-va-profile",
    imagen: "/images/VAs/Laketha.webp"
  },
  {
    id: 98,
    nombre: "Laura",
    categoría_principal: "Insurance Virtual Assistant",
    mainCategory: "Insurance Virtual Assistant",
    idiomas: "English",
    años_experiencia: 9,
    especialización: ["General Liability & Commercial Insurance", "State License - California"],
    nivel_inglés: "Advanced",
    disponibilidad: "Full Time",
    horario: "",
    categorías: ["Insurance VA"],
    slug: "laura-licensed-insurance-agent-ocean-va-profile",
    imagen: "/images/VAs/Laura.webp"
  },
  {
    id: 99,
    nombre: "Lucas",
    categoría_principal: "Insurance Virtual Assistant",
    mainCategory: "Insurance Virtual Assistant",
    idiomas: "English",
    años_experiencia: 10,
    especialización: ["Auto & Home Insurance", "State License - Michigan"],
    nivel_inglés: "Advanced",
    disponibilidad: "Full Time",
    horario: "",
    categorías: ["Insurance VA"],
    slug: "lucas-licensed-insurance-agent-ocean-va-profile",
    imagen: "/images/VAs/Lucas.webp"
  },
  {
    id: 100,
    nombre: "Luke",
    categoría_principal: "Insurance Virtual Assistant",
    mainCategory: "Insurance Virtual Assistant",
    idiomas: "English",
    años_experiencia: null,
    especialización: ["Property & Casualty Insurance", "State License - Utah"],
    nivel_inglés: "Advanced",
    disponibilidad: "Full Time",
    horario: "",
    categorías: ["Insurance VA"],
    slug: "luke-licensed-insurance-agent-ocean-va-profile",
    imagen: "/images/VAs/Luke.webp"
  },
  {
    id: 101,
    nombre: "Mary",
    categoría_principal: "Insurance Virtual Assistant",
    mainCategory: "Insurance Virtual Assistant",
    idiomas: "English",
    años_experiencia: 15,
    especialización: ["Property & Casualty Insurance", "State License - Florida"],
    nivel_inglés: "Advanced",
    disponibilidad: "Full Time",
    horario: "",
    categorías: ["Insurance VA"],
    slug: "mary-licensed-insurance-agent-ocean-va-profile",
    imagen: "/images/VAs/Mary.webp"
  },
  {
    id: 102,
    nombre: "Patti",
    categoría_principal: "Insurance Virtual Assistant",
    mainCategory: "Insurance Virtual Assistant",
    idiomas: "English",
    años_experiencia: 5,
    especialización: ["Auto, Umbrella, Secondary Homes, General Liability", "State License - CT, CA, MA"],
    nivel_inglés: "Advanced",
    disponibilidad: "Full Time",
    horario: "",
    categorías: ["Insurance VA"],
    slug: "patti-licensed-insurance-agent-ocean-va-profile",
    imagen: "/images/VAs/Patti.webp"
  },
  {
    id: 103,
    nombre: "Sarah",
    categoría_principal: "Insurance Virtual Assistant",
    mainCategory: "Insurance Virtual Assistant",
    idiomas: "English",
    años_experiencia: 7,
    especialización: ["Personal Lines, Auto Insurance", "State License - Alabama, Georgia"],
    nivel_inglés: "Advanced",
    disponibilidad: "Full Time",
    horario: "",
    categorías: ["Insurance VA"],
    slug: "sarah-licensed-insurance-agent-ocean-va-profile",
    imagen: "/images/VAs/Sarah.webp"
  },
  {
    id: 104,
    nombre: "Stephanie",
    categoría_principal: "Insurance Virtual Assistant",
    mainCategory: "Insurance Virtual Assistant",
    idiomas: "English",
    años_experiencia: 1,
    especialización: ["Personal, Commercial Home, Motorcycle Insurance", "State License - Multiple States"],
    nivel_inglés: "Advanced",
    disponibilidad: "Full Time",
    horario: "",
    categorías: ["Insurance VA"],
    slug: "stephanie-licensed-insurance-agent-ocean-va-profile",
    imagen: "/images/VAs/Stephanie.webp"
  },
  {
    id: 105,
    nombre: "Tina",
    categoría_principal: "Insurance Virtual Assistant",
    mainCategory: "Insurance Virtual Assistant",
    idiomas: "English",
    años_experiencia: 15,
    especialización: ["Property & Casualty Insurance", "State License - Florida"],
    nivel_inglés: "Advanced",
    disponibilidad: "Full Time",
    horario: "",
    categorías: ["Insurance VA"],
    slug: "tina-licensed-insurance-agent-ocean-va-profile",
    imagen: "/images/VAs/Tina.webp"
  },
  {
    id: 106,
    nombre: "Todd",
    categoría_principal: "Insurance Virtual Assistant",
    mainCategory: "Insurance Virtual Assistant",
    idiomas: "English",
    años_experiencia: 10,
    especialización: ["Auto, Home, Umbrella, Property, Commercial Building & Liability", "State License - Multiple States"],
    nivel_inglés: "Advanced",
    disponibilidad: "Full Time",
    horario: "",
    categorías: ["Insurance VA"],
    slug: "todd-licensed-insurance-agent-ocean-va-profile",
    imagen: "/images/VAs/Todd.webp"
  },
  {
    id: 107,
    nombre: "Tyneisha",
    categoría_principal: "Insurance Virtual Assistant",
    mainCategory: "Insurance Virtual Assistant",
    idiomas: "English",
    años_experiencia: 4,
    especialización: ["Auto, Home & Umbrella Insurance", "State License - All States"],
    nivel_inglés: "Advanced",
    disponibilidad: "Full Time",
    horario: "",
    categorías: ["Insurance VA"],
    slug: "tyneisha-licensed-insurance-agent-ocean-va-profile",
    imagen: "/images/VAs/Tyneisha.webp"
  }
]

// Find the last VA object in the file
const lastVAMatch = content.match(/  \{\s*id:\s*\d+[\s\S]*?\n  \}(?=\s*\];)/m)
if (!lastVAMatch) {
  console.error('❌ Could not find last VA object')
  process.exit(1)
}

// Insert new VAs before the closing bracket
const newVAsString = licensedAgents.map(va => {
  return `  {
    id: ${va.id},
    nombre: "${va.nombre}",
    categoría_principal: "${va.categoría_principal}",
    mainCategory: "${va.mainCategory}",
    idiomas: "${va.idiomas}",
    años_experiencia: ${va.años_experiencia},
    especialización: [${va.especialización.map(e => `"${e}"`).join(', ')}],
    nivel_inglés: "${va.nivel_inglés}",
    disponibilidad: "${va.disponibilidad}",
    horario: "",
    categorías: [${va.categorías.map(c => `"${c}"`).join(', ')}],
    slug: "${va.slug}",
    imagen: "${va.imagen}"
  }`
}).join(',\n')

// Replace the closing bracket with new VAs + closing bracket
content = content.replace(/(\n  \}\s*)\];/, `,\n${newVAsString}\n];`)

fs.writeFileSync(vasDataPath, content)

console.log(`✅ Added ${licensedAgents.length} Licensed Insurance Agents to vasData.js\n`)

// Verify
const updatedContent = fs.readFileSync(vasDataPath, 'utf-8')
const totalVAs = (updatedContent.match(/id:\s*\d+/g) || []).length

console.log(`📈 Verification:`)
console.log(`  - Total VAs now: ${totalVAs}`)
console.log(`  - Licensed Agents added: ${licensedAgents.length}`)
console.log(`  - Status: ✅ OK\n`)

console.log('✅ Licensed Insurance Agents added successfully!')
