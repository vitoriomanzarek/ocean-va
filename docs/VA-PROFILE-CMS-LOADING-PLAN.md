# VA Profile Pages - CMS Data Loading Plan

**Date**: November 19, 2025  
**Status**: 📋 PLANNING PHASE  
**Objective**: Define structure and process for loading VA profile data into Webflow CMS

---

## 📊 CURRENT STATE

### Existing HTML Profile Files
- ✅ `213-Grace-va-profile.html` (Complete profile example)
- ✅ `212-Yvette-va-profile.html`
- ✅ `211-Tricia-va-profile.html`
- ✅ `210-VA-profile-styles.html` (Styles template)
- ✅ `210-adrian-styles.html` (Adrian profile styles)
- ⚠️ Only 3 VA profiles found (need to locate others)

### Current vasData.js
- ✅ 62 VAs total
- ✅ Basic fields: nombre, categoría_principal, idiomas, etc.
- ✅ New fields: videoUrl, youtubeUrl (recently added)
- ❌ Missing: Employment history, DISC, English scores, Education

---

## 🎯 REQUIRED CMS FIELDS FOR PROFILE PAGES

### SECTION 1: Basic Info (Already in CMS)
- ✅ Name
- ✅ Title (categoría_principal)
- ✅ Languages (idiomas)
- ✅ Experience Years (años_experiencia)
- ✅ Image (imagen)
- ✅ Video URL (videoUrl)
- ✅ YouTube URL (youtubeUrl)

### SECTION 2: Summary & Skills (NEW)
| Field Name | Type | Source | Notes |
|-----------|------|--------|-------|
| Summary | Rich Text | va-summary | Existing in HTML |
| Skills | Multi-Reference | va-skills-container | Link to Skills collection |
| Tagline | Plain Text | va-tagline-text | Existing in HTML |

### SECTION 3: Tools & Equipment (NEW)
| Field Name | Type | Source | Notes |
|-----------|------|--------|-------|
| Tools | Multi-Reference | va-tools-list | Link to Tools collection |
| Equipment | Multi-Reference | va-equipment-list | Link to Equipment collection |

### SECTION 4: Employment History (NEW - COMPLEX)
**Type**: Multi-Reference to Employment Collection

**Employment Collection Fields**:
| Field Name | Type | Notes |
|-----------|------|-------|
| Company | Plain Text | va-employment-company |
| Position | Plain Text | va-employment-position |
| Period | Plain Text | va-employment-period |
| Description | Rich Text | va-employment-description |

**Structure in Profile**:
```
Employment History (Multi-Reference)
├── Entry 1
│   ├── Company: "Company Name"
│   ├── Position: "Job Title"
│   ├── Period: "2020 - 2023"
│   └── Description: "What they did..."
├── Entry 2
│   ├── Company: "Another Company"
│   ├── Position: "Another Role"
│   ├── Period: "2018 - 2020"
│   └── Description: "..."
└── Entry 3
    └── ...
```

### SECTION 5: DISC Assessment (NEW)
| Field Name | Type | Source | Notes |
|-----------|------|--------|-------|
| DISC Badge | Plain Text | va-disc-badge | D, I, S, or C |
| DISC Description | Rich Text | va-disc-description | Explanation of badge |

### SECTION 6: English Proficiency (NEW - CONDITIONAL)
| Field Name | Type | Source | Notes |
|-----------|------|--------|-------|
| English Score | Option | va-english-score | Link to English Level table |
| English Description | Rich Text | va-english-description | Custom description |

**English Level Options** (Create Option Field):
- Beginner (A1)
- Elementary (A2)
- Intermediate (B1)
- Upper-Intermediate (B2)
- Advanced (C1)
- Proficient (C2)

**Conditional Logic**:
- If English Score = "Beginner" → Show specific scale
- If English Score = "Proficient" → Show different scale
- etc.

### SECTION 7: Education (NEW - COMPLEX)
**Type**: Multi-Reference to Education Collection

**Education Collection Fields**:
| Field Name | Type | Notes |
|-----------|------|-------|
| School | Plain Text | va-education-school |
| Degree | Plain Text | va-education-degree |
| Year | Plain Text | va-education-year |

**Structure in Profile**:
```
Education (Multi-Reference)
├── Entry 1
│   ├── School: "University Name"
│   ├── Degree: "Bachelor of Science"
│   └── Year: "2015"
├── Entry 2
│   ├── School: "College Name"
│   ├── Degree: "Associate Degree"
│   └── Year: "2013"
└── Entry 3
    └── ...
```

---

## 📋 CMS COLLECTION STRUCTURE

### Main Collection: Virtual Assistants (Existing)
```
Virtual Assistants
├── Basic Fields (13 existing)
├── Summary (NEW)
├── Skills (Multi-Reference to Skills collection)
├── Tools (Multi-Reference to Tools collection)
├── Equipment (Multi-Reference to Equipment collection)
├── Employment History (Multi-Reference to Employment collection)
├── DISC Badge (NEW)
├── DISC Description (NEW)
├── English Score (Option field - NEW)
├── English Description (NEW)
└── Education (Multi-Reference to Education collection)
```

### New Collection: Employment
```
Employment
├── Company (Plain Text)
├── Position (Plain Text)
├── Period (Plain Text)
└── Description (Rich Text)
```

### New Collection: Education
```
Education
├── School (Plain Text)
├── Degree (Plain Text)
└── Year (Plain Text)
```

### New Collection: Skills (Optional)
```
Skills
├── Name (Plain Text)
└── Category (Option)
```

### New Collection: Tools (Optional)
```
Tools
├── Name (Plain Text)
└── Category (Option)
```

### New Collection: Equipment (Optional)
```
Equipment
├── Name (Plain Text)
└── Category (Option)
```

---

## 🔍 DATA EXTRACTION PLAN

### STEP 1: Locate All VA Profile HTML Files
**Status**: ⏳ TODO

**Files Found**:
- ✅ 213-Grace-va-profile.html
- ✅ 212-Yvette-va-profile.html
- ✅ 211-Tricia-va-profile.html

**Files Missing**: Need to find profiles for other VAs

**Action**:
1. Search Git history for all VA profile files
2. Check commit `242eaf0bcf5cb84247c3eae7c337101a48d8d8dd`
3. Extract from backup if necessary
4. Create inventory of all profiles

### STEP 2: Extract Data from HTML Files
**Status**: ⏳ TODO

**Process**:
1. Parse each HTML file
2. Extract sections:
   - Summary (va-summary)
   - Skills (va-skills-container)
   - Tools (va-tools-list)
   - Equipment (va-equipment-list)
   - Employment History (va-employment-*)
   - DISC (va-disc-*)
   - English Score (va-english-*)
   - Education (va-education-*)

**Output**: JSON file with extracted data

### STEP 3: Create Master Data File
**Status**: ⏳ TODO

**File**: `data/va-profiles-complete.json`

**Structure**:
```json
{
  "profiles": [
    {
      "id": 1,
      "name": "Adrian",
      "summary": "...",
      "skills": ["Skill 1", "Skill 2"],
      "tools": ["Tool 1", "Tool 2"],
      "equipment": ["Equipment 1"],
      "employmentHistory": [
        {
          "company": "Company A",
          "position": "Role A",
          "period": "2020-2023",
          "description": "..."
        }
      ],
      "disc": {
        "badge": "D",
        "description": "..."
      },
      "englishScore": "Proficient",
      "englishDescription": "...",
      "education": [
        {
          "school": "University",
          "degree": "Bachelor",
          "year": "2015"
        }
      ]
    }
  ]
}
```

### STEP 4: Create CMS Collections
**Status**: ⏳ TODO

**Manual in Webflow Designer**:
1. Create Employment collection
2. Create Education collection
3. Create Skills collection (optional)
4. Create Tools collection (optional)
5. Create Equipment collection (optional)
6. Add Multi-Reference fields to Virtual Assistants collection

### STEP 5: Load Data into CMS
**Status**: ⏳ TODO

**Process**:
1. Create script: `scripts/load-va-profiles-to-cms.js`
2. Create Employment entries
3. Create Education entries
4. Create Skills entries (if needed)
5. Create Tools entries (if needed)
6. Create Equipment entries (if needed)
7. Update Virtual Assistants items with references

---

## 📁 FILES TO EXTRACT DATA FROM

### Current Profile Files (3 found)
```
webflow-components/
├── 210-VA-profile-styles.html (Styles template)
├── 210-adrian-styles.html (Adrian styles)
├── 211-Tricia-va-profile.html (Tricia profile)
├── 212-Yvette-va-profile.html (Yvette profile)
└── 213-Grace-va-profile.html (Grace profile)
```

### Data to Extract from Each
- Summary (va-summary)
- Skills (va-skills-container)
- Tools (va-tools-list)
- Equipment (va-equipment-list)
- Employment History (va-employment-*)
- DISC (va-disc-*)
- English Score (va-english-*)
- Education (va-education-*)

---

## 🛠️ IMPLEMENTATION ROADMAP

### Phase 1: Data Extraction (2-3 hours)
- [ ] Locate all VA profile HTML files
- [ ] Create extraction script
- [ ] Extract data from all profiles
- [ ] Create master JSON file
- [ ] Validate extracted data

### Phase 2: CMS Setup (1-2 hours)
- [ ] Create Employment collection
- [ ] Create Education collection
- [ ] Create Skills collection (optional)
- [ ] Create Tools collection (optional)
- [ ] Create Equipment collection (optional)
- [ ] Add Multi-Reference fields to Virtual Assistants

### Phase 3: Data Loading (1-2 hours)
- [ ] Create load script
- [ ] Load Employment entries
- [ ] Load Education entries
- [ ] Load Skills entries (if needed)
- [ ] Load Tools entries (if needed)
- [ ] Load Equipment entries (if needed)
- [ ] Link references to Virtual Assistants

### Phase 4: Validation (30 min)
- [ ] Verify all data loaded correctly
- [ ] Check references are linked
- [ ] Test dynamic page rendering
- [ ] Validate on mobile

### Phase 5: Dynamic Pages (2-3 hours)
- [ ] Create `/va-profile/[slug]` dynamic page
- [ ] Design profile template
- [ ] Test with multiple VAs
- [ ] Deploy to Webflow

---

## 💾 NEXT IMMEDIATE ACTIONS

### Priority 1: Find All VA Profile Files
```bash
# Search in current directory
find webflow-components -name "*-va-profile.html"

# Search in Git history
git log --all --full-history -- "*-va-profile.html"

# Check specific commit
git show 242eaf0:webflow-components/ | grep "va-profile"
```

### Priority 2: Create Data Extraction Script
- Parse HTML files
- Extract structured data
- Output JSON

### Priority 3: Inventory All VAs
- Map which VAs have profiles
- Identify missing profiles
- Plan for VAs without profiles

---

## 📊 ESTIMATED TIMELINE

| Phase | Tasks | Time | Status |
|-------|-------|------|--------|
| 1 | Data Extraction | 2-3h | ⏳ TODO |
| 2 | CMS Setup | 1-2h | ⏳ TODO |
| 3 | Data Loading | 1-2h | ⏳ TODO |
| 4 | Validation | 30m | ⏳ TODO |
| 5 | Dynamic Pages | 2-3h | ⏳ TODO |
| **TOTAL** | **All Phases** | **7-10h** | ⏳ TODO |

---

## 🔗 RELATED DOCUMENTS

- `docs/CMS_PROFILE_PAGES_ANALYSIS.md` - Field requirements
- `docs/WEBFLOW_MANUAL_SETUP_GUIDE.md` - CMS setup guide
- `docs/PROJECT_CONTEXT.md` - Project overview
- `src/data/vasData.js` - VA data source

---

## 📝 NOTES

- Employment History and Education are complex multi-reference fields
- Need to create separate collections for Employment and Education
- English Score should be conditional (different scales for different levels)
- Consider creating reusable Skills, Tools, Equipment collections
- Some VAs may not have all sections filled
- Need to handle missing data gracefully

---

## ✅ CHECKLIST

- [ ] Locate all VA profile HTML files
- [ ] Extract data from profiles
- [ ] Create master data file
- [ ] Create CMS collections
- [ ] Load data into CMS
- [ ] Validate data
- [ ] Create dynamic pages
- [ ] Test on mobile
- [ ] Deploy to production
