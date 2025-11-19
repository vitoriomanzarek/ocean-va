# CMS Implementation - Step by Step Guide

**Date**: November 19, 2025  
**Status**: 🚀 READY TO IMPLEMENT  
**Estimated Time**: 8-10 hours total

---

## 📋 PHASE 1: CREATE 5 NEW COLLECTIONS (Manual in Webflow Designer)

**Time**: ~30 minutes  
**Location**: Webflow Designer → Collections

### Collection 1: Skills

1. Go to **Collections** → **+ Create New Collection**
2. Name: **Skills**
3. Add fields:
   - **Name** (Plain text) - Required
   - **Category** (Option) - Optional
     - Options: Administrative, Technical, Customer Service, Sales, Management, Other

### Collection 2: Tools

1. Go to **Collections** → **+ Create New Collection**
2. Name: **Tools**
3. Add fields:
   - **Name** (Plain text) - Required
   - **Category** (Option) - Optional
     - Options: CRM, Communication, Project Management, Design, Accounting, Other

### Collection 3: Equipment

1. Go to **Collections** → **+ Create New Collection**
2. Name: **Equipment**
3. Add fields:
   - **Name** (Plain text) - Required
   - **Category** (Option) - Optional
     - Options: Hardware, Software, Accessories, Other

### Collection 4: Employment

1. Go to **Collections** → **+ Create New Collection**
2. Name: **Employment**
3. Add fields:
   - **Company** (Plain text) - Required
   - **Position** (Plain text) - Required
   - **Period** (Plain text) - Required (e.g., "2020 - 2023")
   - **Description** (Rich text) - Optional

### Collection 5: Education

1. Go to **Collections** → **+ Create New Collection**
2. Name: **Education**
3. Add fields:
   - **School** (Plain text) - Required
   - **Degree** (Plain text) - Required
   - **Year** (Plain text) - Required (e.g., "2015" or "2015 - 2019")

---

## 📋 PHASE 2: ADD 10 NEW FIELDS TO VIRTUAL ASSISTANTS

**Time**: ~20 minutes  
**Location**: Webflow Designer → Collections → Virtual Assistants → Add Field

### Field 1: Skills

1. Click **+ Add Field**
2. Name: **Skills**
3. Type: **Multi-reference**
4. Reference Collection: **Skills**
5. Save

### Field 2: Tools

1. Click **+ Add Field**
2. Name: **Tools**
3. Type: **Multi-reference**
4. Reference Collection: **Tools**
5. Save

### Field 3: Equipment

1. Click **+ Add Field**
2. Name: **Equipment**
3. Type: **Multi-reference**
4. Reference Collection: **Equipment**
5. Save

### Field 4: Employment History

1. Click **+ Add Field**
2. Name: **Employment History**
3. Type: **Multi-reference**
4. Reference Collection: **Employment**
5. Save

### Field 5: DISC Badge

1. Click **+ Add Field**
2. Name: **DISC Badge**
3. Type: **Option**
4. Options:
   - D
   - I
   - S
   - C
   - D+I
   - S+I
   - S+C
5. Save

### Field 6: DISC Description

1. Click **+ Add Field**
2. Name: **DISC Description**
3. Type: **Rich text**
4. Save

### Field 7: English Score

1. Click **+ Add Field**
2. Name: **English Score**
3. Type: **Option**
4. Options:
   - A1 - Beginner
   - A2 - Elementary
   - B1 - Intermediate
   - B2 - Upper-Intermediate
   - C1 - Advanced
   - C2 - Proficient
5. Save

### Field 8: English Description

1. Click **+ Add Field**
2. Name: **English Description**
3. Type: **Rich text**
4. Save

### Field 9: Education

1. Click **+ Add Field**
2. Name: **Education**
3. Type: **Multi-reference**
4. Reference Collection: **Education**
5. Save

### Field 10: YouTube URL

1. Click **+ Add Field**
2. Name: **YouTube URL**
3. Type: **Plain text**
4. Save

---

## 📊 PHASE 3: EXTRACT UNIQUE VALUES FROM PROFILES

**Time**: ~30 minutes  
**Automated**: Script will do this

### What we'll extract:

**Skills** (~150+ unique):
- Executive & Administrative Support
- Email & Calendar Management
- Process Improvement
- Client Onboarding
- Social Media Asset Creation
- SOP Documentation
- Lead Tracking
- Discovery Call Management
- Insurance Claim Submission
- Payment Link Sending
- ... (and ~140+ more)

**Tools** (~80+ unique):
- Salesforce
- Zoom Workspace
- Google Meet
- Google Workspace
- Asana
- Canva
- Zoho CRM
- Opera Software
- Microsoft Office
- ... (and ~70+ more)

**Equipment** (~15 unique):
- Two-Monitor Setup
- Noise-Cancelling Headset
- Laptop (Provided)
- Headset (Provided)
- ... (and ~10+ more)

**Employment Entries** (~200+ total):
- From 57 VAs with 3-5 positions each

**Education Entries** (~60+ total):
- From 57 VAs with 1-2 entries each

---

## 🔧 PHASE 4: CREATE DATA LOADING SCRIPTS

**Time**: ~1-2 hours  
**Automated**: We'll create scripts for this

### Scripts to create:

1. **extract-unique-values.js**
   - Extract unique skills, tools, equipment from profiles
   - Output: JSON file with unique values

2. **load-skills-to-cms.js**
   - Create Skills collection items
   - Load all unique skills

3. **load-tools-to-cms.js**
   - Create Tools collection items
   - Load all unique tools

4. **load-equipment-to-cms.js**
   - Create Equipment collection items
   - Load all unique equipment

5. **load-employment-to-cms.js**
   - Create Employment collection items
   - Load all employment entries from profiles

6. **load-education-to-cms.js**
   - Create Education collection items
   - Load all education entries from profiles

7. **link-references-to-vas.js**
   - Link all references to Virtual Assistants items
   - Update each VA with skills, tools, equipment, employment, education

---

## 🚀 PHASE 5: EXECUTE DATA LOADING

**Time**: ~1-2 hours  
**Execution Order**:

```bash
# 1. Extract unique values
node scripts/extract-unique-values.js

# 2. Load collections (in order)
WEBFLOW_API_TOKEN="your_token" node scripts/load-skills-to-cms.js
WEBFLOW_API_TOKEN="your_token" node scripts/load-tools-to-cms.js
WEBFLOW_API_TOKEN="your_token" node scripts/load-equipment-to-cms.js
WEBFLOW_API_TOKEN="your_token" node scripts/load-employment-to-cms.js
WEBFLOW_API_TOKEN="your_token" node scripts/load-education-to-cms.js

# 3. Link references
WEBFLOW_API_TOKEN="your_token" node scripts/link-references-to-vas.js

# 4. Verify
WEBFLOW_API_TOKEN="your_token" node scripts/verify-cms-data.js
```

---

## ✅ CHECKLIST

### Phase 1: Create Collections
- [ ] Skills collection created
- [ ] Tools collection created
- [ ] Equipment collection created
- [ ] Employment collection created
- [ ] Education collection created

### Phase 2: Add Fields
- [ ] Skills field added to Virtual Assistants
- [ ] Tools field added to Virtual Assistants
- [ ] Equipment field added to Virtual Assistants
- [ ] Employment History field added to Virtual Assistants
- [ ] DISC Badge field added to Virtual Assistants
- [ ] DISC Description field added to Virtual Assistants
- [ ] English Score field added to Virtual Assistants
- [ ] English Description field added to Virtual Assistants
- [ ] Education field added to Virtual Assistants
- [ ] YouTube URL field added to Virtual Assistants

### Phase 3: Extract Values
- [ ] extract-unique-values.js created
- [ ] Unique values extracted
- [ ] JSON file generated

### Phase 4: Create Scripts
- [ ] load-skills-to-cms.js created
- [ ] load-tools-to-cms.js created
- [ ] load-equipment-to-cms.js created
- [ ] load-employment-to-cms.js created
- [ ] load-education-to-cms.js created
- [ ] link-references-to-vas.js created
- [ ] verify-cms-data.js created

### Phase 5: Execute
- [ ] Skills loaded
- [ ] Tools loaded
- [ ] Equipment loaded
- [ ] Employment loaded
- [ ] Education loaded
- [ ] References linked
- [ ] Data verified

---

## 📝 IMPORTANT NOTES

1. **Webflow Designer Access**: You'll need access to Webflow Designer for Phase 1 & 2
2. **API Token**: You'll need WEBFLOW_API_TOKEN for Phase 4 & 5
3. **Order Matters**: Execute scripts in the order listed
4. **Backup**: Consider backing up your CMS before running scripts
5. **Test First**: Run scripts on a test collection first if possible
6. **Verify**: Always verify data after each phase

---

## 🎯 NEXT STEPS

1. **Complete Phase 1 & 2** in Webflow Designer (manual, ~50 min)
2. **Tell me when done**, I'll create the scripts for Phase 3-5
3. **Run the scripts** in order
4. **Verify the data** in Webflow

---

## 💡 TIPS

- Take screenshots of each collection after creation
- Document the collection IDs for reference
- Test with 1-2 items before bulk loading
- Monitor API rate limits when running scripts
- Keep a log of what was loaded and when

---

**Ready to start Phase 1?** 🚀
