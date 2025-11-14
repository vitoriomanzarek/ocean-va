# Data Directory

## 📊 Overview

All static data and mappings for Ocean VA project.

---

## 📋 Primary Data Sources

### vasData.js
**Location**: `../src/data/vasData.js` (MAIN SOURCE)

Contains all 56 VA profiles with:
- Name, slug, experience
- Languages, specializations
- Image URLs, bio
- Availability, hourly rate
- Video URLs

**Status**: ✅ Active (source of truth)

---

## 📁 Data Files

### ocean_va_all_assistants.tsv
Tab-separated values file with VA data

**Status**: ⚠️ Check if duplicate of vasData.js

**TODO**: Verify if needed, consolidate if duplicate

---

## 🖼️ Image Mappings

### webflow-image-mapping.json
JSON mapping of VA names to Webflow image URLs

**Format**:
```json
{
  "VA Name": "https://webflow-cdn.com/image-url",
  "Another VA": "https://webflow-cdn.com/another-url"
}
```

**Status**: ✅ Active

### webflow-image-mapping.csv
CSV version of image mappings

**Status**: ⚠️ Duplicate of JSON version

**TODO**: Consolidate into single format

---

## 📄 Metadata

### PAGES_METADATA.txt
Metadata for all pages (titles, descriptions, etc.)

**Status**: ⚠️ Check if needed

**TODO**: Verify usage, consolidate if duplicate

---

## 🔄 Data Flow

```
vasData.js (source)
    ↓
scripts/generate-va-profiles.js
    ↓
webflow-components/*.html
    ↓
Webflow CMS (future)
```

---

## 📊 Data Status

| File | Type | Status | Notes |
|------|------|--------|-------|
| vasData.js | JS | ✅ Active | Main source |
| ocean_va_all_assistants.tsv | TSV | ⚠️ Check | Duplicate? |
| webflow-image-mapping.json | JSON | ✅ Active | Image URLs |
| webflow-image-mapping.csv | CSV | ⚠️ Duplicate | Consolidate? |
| PAGES_METADATA.txt | TXT | ⚠️ Check | Needed? |

---

## 🚀 Next Steps

### Phase 1: Audit (Week 1)
- [ ] Verify vasData.js is complete
- [ ] Check if TSV is duplicate
- [ ] Consolidate image mappings
- [ ] Verify PAGES_METADATA.txt usage

### Phase 2: Consolidate (Week 2)
- [ ] Keep vasData.js as source
- [ ] Delete duplicate TSV if not needed
- [ ] Use single image mapping format
- [ ] Migrate to Webflow CMS

### Phase 3: Automate (Week 3)
- [ ] Script to sync vasData.js → Webflow CMS
- [ ] Script to update image mappings
- [ ] Automated validation

---

## 📞 Related

- **vasData.js**: `src/data/vasData.js`
- **Scripts**: `scripts/`
- **Webflow Components**: `webflow-components/`

