# VA Profile - Field Mapping & CMS Structure

**Date**: November 19, 2025  
**Reference**: Component 213 (Grace VA Profile)  
**Status**: 📋 PLANNING

---

## 🎯 FIELD MAPPING - HTML to CMS

### SECTION 1: Summary & Skills

| HTML Class | Field Name | CMS Type | CMS Field Slug | Notes |
|-----------|-----------|----------|-----------------|-------|
| va-summary | Summary | Rich Text | summary | Main VA description |
| va-skills-container | Skills | Multi-Reference | skills | Link to Skills collection |
| va-skill-tag | Individual Skill | Plain Text | (part of array) | Extracted from tags |

**HTML Structure**:
```html
<div class="va-summary">
  Abigail Faith is a proactive and results-driven...
</div>

<div class="va-skills-container">
  <span class="va-skill-tag">Executive & Administrative Support</span>
  <span class="va-skill-tag">Email & Calendar Management</span>
  <span class="va-skill-tag">Process Improvement</span>
  ...
</div>
```

**CMS Structure**:
```
Virtual Assistants Item
├── Summary: "Abigail Faith is a proactive..."
└── Skills: [
    { name: "Executive & Administrative Support" },
    { name: "Email & Calendar Management" },
    { name: "Process Improvement" }
  ]
```

---

### SECTION 2: Tools & Equipment

| HTML Class | Field Name | CMS Type | CMS Field Slug | Notes |
|-----------|-----------|----------|-----------------|-------|
| va-tools-list | Tools | Multi-Reference | tools | Link to Tools collection |
| va-tool-item | Individual Tool | Plain Text | (part of array) | Extracted from items |
| va-equipment-list | Equipment | Multi-Reference | equipment | Link to Equipment collection |
| va-equipment-item | Individual Equipment | Plain Text | (part of array) | Extracted from items |

**HTML Structure**:
```html
<div class="va-tools-column">
  <h3 class="va-column-header">TOOLS & PLATFORMS</h3>
  <div class="va-tools-list">
    <div class="va-tool-item">
      <span class="va-tool-checkmark">✓</span>
      <span>Asana</span>
    </div>
    <div class="va-tool-item">
      <span class="va-tool-checkmark">✓</span>
      <span>Monday.com</span>
    </div>
  </div>
</div>

<div class="va-tools-column">
  <h3 class="va-column-header">EQUIPMENT</h3>
  <div class="va-equipment-list">
    <div class="va-equipment-item">
      <span class="va-equipment-icon">🖥️</span>
      <span>Laptop (Provided)</span>
    </div>
  </div>
</div>
```

**CMS Structure**:
```
Virtual Assistants Item
├── Tools: [
│   { name: "Asana" },
│   { name: "Monday.com" },
│   { name: "Slack" }
│ ]
└── Equipment: [
    { name: "Laptop (Provided)" },
    { name: "Headset (Provided)" }
  ]
```

---

### SECTION 3: Employment History (COMPLEX)

| HTML Class | Field Name | CMS Type | CMS Field Slug | Notes |
|-----------|-----------|----------|-----------------|-------|
| va-employment-company | Company | Plain Text | company | Part of Employment entry |
| va-employment-position | Position | Plain Text | position | Part of Employment entry |
| va-employment-period | Period | Plain Text | period | Part of Employment entry |
| va-employment-description | Description | Rich Text | description | Part of Employment entry |

**HTML Structure**:
```html
<div class="va-employment-item">
  <h3 class="va-employment-company">Company Name</h3>
  <p class="va-employment-position">Job Title</p>
  <p class="va-employment-period">2020 - 2023</p>
  <p class="va-employment-description">
    Responsibilities and achievements...
  </p>
</div>
```

**CMS Structure - Option A: Separate Collection**
```
Employment Collection
├── Company: "Company Name"
├── Position: "Job Title"
├── Period: "2020 - 2023"
└── Description: "Responsibilities..."

Virtual Assistants Item
└── Employment History: [
    { ref: Employment_ID_1 },
    { ref: Employment_ID_2 },
    { ref: Employment_ID_3 }
  ]
```

**CMS Structure - Option B: Nested Object (if supported)**
```
Virtual Assistants Item
└── Employment History: [
    {
      company: "Company Name",
      position: "Job Title",
      period: "2020 - 2023",
      description: "Responsibilities..."
    },
    {
      company: "Another Company",
      position: "Another Role",
      period: "2018 - 2020",
      description: "..."
    }
  ]
```

**RECOMMENDATION**: Use Option A (Separate Collection) for:
- Better data organization
- Reusability across VAs
- Easier to update individual entries
- Better for CMS queries

---

### SECTION 4: DISC Assessment

| HTML Class | Field Name | CMS Type | CMS Field Slug | Notes |
|-----------|-----------|----------|-----------------|-------|
| va-disc-badge | DISC Badge | Option | disc-badge | D, I, S, or C |
| va-disc-description | DISC Description | Rich Text | disc-description | Explanation |

**HTML Structure**:
```html
<div class="va-disc-section">
  <h2 class="va-section-title">DISC ASSESSMENT</h2>
  <div class="va-disc-item">
    <div class="va-disc-badge">I</div>
    <p class="va-disc-description">
      Influencer - Outgoing, enthusiastic, people-focused...
    </p>
  </div>
</div>
```

**CMS Structure**:
```
Virtual Assistants Item
├── DISC Badge: "I" (Option: D, I, S, C)
└── DISC Description: "Influencer - Outgoing, enthusiastic..."
```

**DISC Option Field Values**:
- D - Dominant/Driver
- I - Influencer
- S - Steadiness/Supporter
- C - Conscientious/Compliant

---

### SECTION 5: English Proficiency (CONDITIONAL)

| HTML Class | Field Name | CMS Type | CMS Field Slug | Notes |
|-----------|-----------|----------|-----------------|-------|
| va-english-score | English Score | Option | english-score | Link to English Level |
| va-english-description | English Description | Rich Text | english-description | Custom description |

**HTML Structure**:
```html
<div class="va-english-section">
  <h2 class="va-section-title">ENGLISH PROFICIENCY</h2>
  <div class="va-english-item">
    <div class="va-english-score">C2 - Proficient</div>
    <p class="va-english-description">
      Native-like proficiency with excellent...
    </p>
  </div>
</div>
```

**CMS Structure**:
```
Virtual Assistants Item
├── English Score: "C2 - Proficient" (Option field)
└── English Description: "Native-like proficiency..."
```

**English Level Option Field Values**:
- A1 - Beginner
- A2 - Elementary
- B1 - Intermediate
- B2 - Upper-Intermediate
- C1 - Advanced
- C2 - Proficient

**Conditional Logic** (Webflow Conditional Visibility):
```
IF English Score = "A1" THEN Show "Beginner Scale"
IF English Score = "A2" THEN Show "Elementary Scale"
IF English Score = "B1" THEN Show "Intermediate Scale"
IF English Score = "B2" THEN Show "Upper-Intermediate Scale"
IF English Score = "C1" THEN Show "Advanced Scale"
IF English Score = "C2" THEN Show "Proficient Scale"
```

---

### SECTION 6: Education (COMPLEX)

| HTML Class | Field Name | CMS Type | CMS Field Slug | Notes |
|-----------|-----------|----------|-----------------|-------|
| va-education-school | School | Plain Text | school | Part of Education entry |
| va-education-degree | Degree | Plain Text | degree | Part of Education entry |
| va-education-year | Year | Plain Text | year | Part of Education entry |

**HTML Structure**:
```html
<section class="va-education-section">
  <div class="va-education-container">
    <h2 class="va-section-title">EDUCATION</h2>
    <div class="va-education-item">
      <h3 class="va-education-school">University Name</h3>
      <p class="va-education-degree">Bachelor of Science</p>
      <p class="va-education-year">2015</p>
    </div>
  </div>
</section>
```

**CMS Structure - Option A: Separate Collection**
```
Education Collection
├── School: "University Name"
├── Degree: "Bachelor of Science"
└── Year: "2015"

Virtual Assistants Item
└── Education: [
    { ref: Education_ID_1 },
    { ref: Education_ID_2 }
  ]
```

**CMS Structure - Option B: Nested Object**
```
Virtual Assistants Item
└── Education: [
    {
      school: "University Name",
      degree: "Bachelor of Science",
      year: "2015"
    },
    {
      school: "College Name",
      degree: "Associate Degree",
      year: "2013"
    }
  ]
```

**RECOMMENDATION**: Use Option A (Separate Collection) for consistency with Employment History.

---

## 📋 COMPLETE CMS FIELD CHECKLIST

### Virtual Assistants Collection (Updated)

**Existing Fields** (13):
- [x] Name (PlainText)
- [x] Title (PlainText)
- [x] Experience Years (PlainText)
- [x] Languages (PlainText)
- [x] Specializations (PlainText)
- [x] Availability (PlainText)
- [x] Image URL (PlainText)
- [x] Video URL (PlainText)
- [x] Video Thumbnail (PlainText)
- [x] Summary (Rich Text)
- [x] Tagline (PlainText)
- [x] Thumbnail Description (PlainText)
- [x] Profile Slug (PlainText)

**New Fields to Add** (10):
- [ ] Skills (Multi-Reference → Skills collection)
- [ ] Tools (Multi-Reference → Tools collection)
- [ ] Equipment (Multi-Reference → Equipment collection)
- [ ] Employment History (Multi-Reference → Employment collection)
- [ ] DISC Badge (Option: D, I, S, C)
- [ ] DISC Description (Rich Text)
- [ ] English Score (Option: A1-C2)
- [ ] English Description (Rich Text)
- [ ] Education (Multi-Reference → Education collection)
- [ ] youtubeUrl (PlainText) - Already added to vasData.js

### New Collections to Create

**Employment Collection**:
- [ ] Company (PlainText)
- [ ] Position (PlainText)
- [ ] Period (PlainText)
- [ ] Description (Rich Text)

**Education Collection**:
- [ ] School (PlainText)
- [ ] Degree (PlainText)
- [ ] Year (PlainText)

**Skills Collection** (Optional):
- [ ] Name (PlainText)
- [ ] Category (Option)

**Tools Collection** (Optional):
- [ ] Name (PlainText)
- [ ] Category (Option)

**Equipment Collection** (Optional):
- [ ] Name (PlainText)
- [ ] Category (Option)

---

## 🔄 DATA FLOW

```
HTML Profile Files
    ↓
Extract Data (Script)
    ↓
Master JSON File (va-profiles-complete.json)
    ↓
Create CMS Collections (Manual in Webflow)
    ↓
Load Data into CMS (Script)
    ↓
Create Dynamic Pages (Webflow Designer)
    ↓
Publish to Production
```

---

## 📊 EXAMPLE: Complete VA Profile Entry

### Grace VA Profile

**Basic Info**:
```json
{
  "name": "Grace",
  "title": "Executive Virtual Assistant",
  "experience": "6+ years",
  "languages": "English",
  "availability": "Full Time",
  "image": "/images/VAs/Grace.webp",
  "videoUrl": "https://www.youtube.com/embed/VIDEO_ID",
  "youtubeUrl": "https://youtu.be/VIDEO_ID"
}
```

**Profile Data**:
```json
{
  "summary": "Grace is a proactive and results-driven Executive Virtual Assistant...",
  "tagline": "Dedicated to excellence in executive support and operations management",
  
  "skills": [
    "Executive & Administrative Support",
    "Email & Calendar Management",
    "Process Improvement",
    "Client Onboarding",
    "Social Media Asset Creation",
    "SOP Documentation",
    "Lead Tracking"
  ],
  
  "tools": [
    "Asana",
    "Monday.com",
    "Slack",
    "Zapier",
    "Google Workspace"
  ],
  
  "equipment": [
    "Laptop (Provided)",
    "Headset (Provided)"
  ],
  
  "employmentHistory": [
    {
      "company": "Company A",
      "position": "Executive Assistant",
      "period": "2020 - 2023",
      "description": "Managed executive calendar, coordinated meetings..."
    },
    {
      "company": "Company B",
      "position": "Administrative Coordinator",
      "period": "2018 - 2020",
      "description": "Supported multiple executives..."
    }
  ],
  
  "disc": {
    "badge": "I",
    "description": "Influencer - Outgoing, enthusiastic, people-focused..."
  },
  
  "englishScore": "C2 - Proficient",
  "englishDescription": "Native-like proficiency with excellent communication skills",
  
  "education": [
    {
      "school": "University Name",
      "degree": "Bachelor of Science",
      "year": "2015"
    }
  ]
}
```

---

## 🎯 NEXT STEPS

1. **Locate all VA profile HTML files** (Priority 1)
2. **Create data extraction script** (Priority 2)
3. **Extract data from all profiles** (Priority 3)
4. **Create master JSON file** (Priority 4)
5. **Create CMS collections** (Priority 5)
6. **Load data into CMS** (Priority 6)
7. **Create dynamic pages** (Priority 7)
8. **Test and validate** (Priority 8)

---

## 📝 NOTES

- Employment History and Education should use separate collections for better organization
- DISC Badge should be an Option field with 4 values (D, I, S, C)
- English Score should be conditional to show different scales
- Skills, Tools, Equipment can be simple arrays or separate collections
- Consider creating reusable collections for better data management
- Some VAs may not have all sections filled - handle gracefully
