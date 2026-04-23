import React from 'react'
import { useParams } from 'react-router-dom'
import { useVasData } from '../hooks/useVasData'
import VAProfilePage from '../components/VAProfile/VAProfilePage'

const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
const CEFR_DESCRIPTIONS = {
  A1: 'Can understand and use familiar everyday expressions and basic questions about personal details.',
  A2: 'Can have very short social exchanges and give information on familiar and routine matters when traveling.',
  B1: 'Can briefly describe past events and future plans, give reasons for opinions and express advantages and disadvantages.',
  B2: 'Can communicate confidently in a variety of academic and professional environments.',
  C1: 'Can use the language flexibly and effectively for social, academic and professional purposes.',
  C2: 'Can interact with ease and can differentiate their shades of meaning.',
}

function toEmbedUrl(url) {
  if (!url) return ''
  // Already embed format
  if (url.includes('youtube.com/embed/')) return url
  // youtu.be/ID
  const short = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
  if (short) return `https://www.youtube.com/embed/${short[1]}`
  // youtube.com/watch?v=ID
  const watch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/)
  if (watch) return `https://www.youtube.com/embed/${watch[1]}`
  return url
}

function stripHtml(html) {
  return (html || '').replace(/<[^>]*>/g, '').trim()
}

function buildCefr(englishLevel) {
  return CEFR_LEVELS.map(label => ({
    label,
    active: label === (englishLevel || '').toUpperCase(),
    description: CEFR_DESCRIPTIONS[label],
  }))
}

function adaptVA(va) {
  return {
    name: va.name,
    title: va.title,
    image: va.image,
    // Summary: strip HTML tags for the plain-text summary field
    summary: stripHtml(va.summary),
    summaryHtml: va.summary,
    tagline: va.tagline,
    thumbnail: va.thumbnailDescription,
    // Media
    videoUrl: toEmbedUrl(va.video),
    videoThumbnail: va.videoThumbnail,
    // Tags (arrays)
    skills: va.skills || [],
    tools: va.tools || [],
    equipment: va.equipment || [],
    // Employment
    employmentSummary: va.employmentSummary,
    employmentHtml: va.employmentHtml,
    // Education
    educationHtml: va.educationHtml,
    // DISC
    discResult: va.discType,
    discResultDescription: stripHtml(va.discDescription),
    // English
    englishScore: va.englishScore || va.cerfResult,
    englishDescription: stripHtml(va.englishDescription),
    englishTestType: va.englishTestType,
    cerfResult: va.cerfResult,
    cefr: buildCefr(va.cerfResult || va.englishLevel),
    // Rich HTML tabs
    skillsHtml: va.skillsHtml,
    toolsHtml: va.toolsHtml,
    equipmentHtml: va.equipmentHtml,
  }
}

export default function VADynamicProfile() {
  const { slug } = useParams()
  const vasData = useVasData()
  const va = vasData.find(v => v.slug === slug)

  if (!va) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ocean-700 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">VA Not Found</h1>
          <p className="mb-6 text-ocean-100">No profile found for "{slug}".</p>
          <a href="/ovas-current-vas" className="bg-white text-ocean-700 font-bold px-6 py-3 rounded-lg">
            Browse All VAs
          </a>
        </div>
      </div>
    )
  }

  return <VAProfilePage vaData={adaptVA(va)} />
}
