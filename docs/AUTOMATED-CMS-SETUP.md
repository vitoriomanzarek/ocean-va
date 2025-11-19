# Automated CMS Setup - Complete Guide

**Date**: November 19, 2025  
**Status**: 🚀 READY TO EXECUTE  
**Time**: ~2-3 hours (fully automated)  
**Alternative**: Manual setup would take 8-10 hours

---

## 🎯 OVERVIEW

Instead of manually creating collections in Webflow Designer, we have **4 automated scripts** that do everything via the Webflow API:

1. ✅ Create 5 new collections
2. ✅ Add 10 new fields to Virtual Assistants
3. ✅ Extract unique values from profiles
4. ✅ Load data into collections
5. ✅ Link references to VAs

**Total Time**: ~2-3 hours (vs 8-10 hours manual)

---

## 📋 PREREQUISITES

### 1. Get Webflow API Token
- Go to Webflow Dashboard → Account Settings → API Tokens
- Create a new token with these permissions:
  - `collections:read`
  - `collections:write`
  - `items:read`
  - `items:write`
- Copy the token

### 2. Get Site ID
- Go to Webflow Dashboard → Your Site
- Look for Site ID in the URL or settings
- Format: `66e9b3f71eb321a17e92218a`

### 3. Verify Data Files
- ✅ `data/va-profiles-complete.json` (57 profiles)
- ✅ `scripts/create-cms-collections.js`
- ✅ `scripts/extract-unique-values.js`
- ✅ `scripts/load-collections-data.js`
- ✅ `scripts/link-references-to-vas.js`

---

## 🚀 EXECUTION STEPS

### STEP 1: Create Collections and Fields

**Command**:
```bash
WEBFLOW_API_TOKEN="your_token_here" WEBFLOW_SITE_ID="your_site_id_here" node scripts/create-cms-collections.js
```

**What it does**:
- Creates 5 new collections (Skills, Tools, Equipment, Employment, Education)
- Adds 10 new fields to Virtual Assistants
- Configures all multi-reference relationships
- Saves collection IDs to `data/collection-ids.json`

**Expected output**:
```
🚀 Creating CMS Collections via Webflow API...

📝 Creating collection: Skills...
✅ Collection created: Skills (ID: xxx)
  📌 Adding field: Name...
  ✅ Field added: Name
  📌 Adding field: Category...
  ✅ Field added: Category

... (more collections) ...

✅ CMS Collections and Fields created successfully!
```

**Time**: ~5-10 minutes

---

### STEP 2: Extract Unique Values

**Command**:
```bash
node scripts/extract-unique-values.js
```

**What it does**:
- Reads all 57 VA profiles
- Extracts unique skills, tools, equipment
- Extracts all employment and education entries
- Generates `data/unique-values.json`

**Expected output**:
```
🔍 Extracting unique values from VA profiles...

📊 Processing 57 profiles...

✅ Extraction complete!

📊 SUMMARY:

  Skills: 150 unique
  Tools: 80 unique
  Equipment: 15 unique
  DISC Badges: 7 unique
  English Scores: 6 unique
  Employment Entries: 200 total
  Education Entries: 60 total
```

**Time**: ~1 minute

---

### STEP 3: Load Data into Collections

**Command**:
```bash
WEBFLOW_API_TOKEN="your_token_here" node scripts/load-collections-data.js
```

**What it does**:
- Loads all unique skills into Skills collection
- Loads all unique tools into Tools collection
- Loads all unique equipment into Equipment collection
- Loads all employment entries into Employment collection
- Loads all education entries into Education collection

**Expected output**:
```
🚀 Loading data into CMS collections...

✅ Data files loaded

📝 Loading 150 items to Skills...
  ✅ 10/150 loaded
  ✅ 20/150 loaded
  ... (progress) ...
✅ Skills: 150 loaded, 0 failed

📝 Loading 80 items to Tools...
  ✅ 10/80 loaded
  ... (progress) ...
✅ Tools: 80 loaded, 0 failed

... (more collections) ...

✅ Data loading complete!

📊 SUMMARY:

  Skills: 150 loaded, 0 failed
  Tools: 80 loaded, 0 failed
  Equipment: 15 loaded, 0 failed
  Employment: 200 loaded, 0 failed
  Education: 60 loaded, 0 failed

  TOTAL: 505 loaded, 0 failed
```

**Time**: ~30-45 minutes (depends on API rate limits)

---

### STEP 4: Link References to VAs

**Command**:
```bash
WEBFLOW_API_TOKEN="your_token_here" node scripts/link-references-to-vas.js
```

**What it does**:
- For each VA profile:
  - Links skills to Skills collection
  - Links tools to Tools collection
  - Links equipment to Equipment collection
  - Links employment entries to Employment collection
  - Links education entries to Education collection
  - Sets DISC Badge and DISC Description
  - Sets English Score and English Description

**Expected output**:
```
🚀 Linking references to VA profiles...

✅ Loaded 57 profiles

📊 Loading collection items...

  Loading Skills...
  Loading Tools...
  Loading Equipment...
  Loading Employment...
  Loading Education...

✅ Loaded 150 skills, 80 tools, 15 equipment, 200 employment, 60 education

🔗 Linking references to VAs...

  ✅ ABIGAIL FAITH
  ✅ ADRIAN
  ✅ ALEJANDRO
  ... (all 57 VAs) ...

✅ Linking complete!

📊 SUMMARY:

  Updated: 57
  Failed: 0
  Total: 57
```

**Time**: ~30-45 minutes (depends on API rate limits)

---

## 📊 COMPLETE EXECUTION

### Quick Copy-Paste Commands

```bash
# Step 1: Create collections (5-10 min)
WEBFLOW_API_TOKEN="your_token_here" WEBFLOW_SITE_ID="your_site_id_here" node scripts/create-cms-collections.js

# Step 2: Extract values (1 min)
node scripts/extract-unique-values.js

# Step 3: Load data (30-45 min)
WEBFLOW_API_TOKEN="your_token_here" node scripts/load-collections-data.js

# Step 4: Link references (30-45 min)
WEBFLOW_API_TOKEN="your_token_here" node scripts/link-references-to-vas.js
```

### Total Time
- **Step 1**: 5-10 minutes
- **Step 2**: 1 minute
- **Step 3**: 30-45 minutes
- **Step 4**: 30-45 minutes
- **TOTAL**: ~1.5-2.5 hours

---

## ✅ VERIFICATION

After all scripts complete, verify in Webflow Designer:

### Check Collections
- [ ] Skills collection exists with ~150 items
- [ ] Tools collection exists with ~80 items
- [ ] Equipment collection exists with ~15 items
- [ ] Employment collection exists with ~200 items
- [ ] Education collection exists with ~60 items

### Check Virtual Assistants
- [ ] Skills field populated (multi-reference)
- [ ] Tools field populated (multi-reference)
- [ ] Equipment field populated (multi-reference)
- [ ] Employment History field populated (multi-reference)
- [ ] DISC Badge field populated (option)
- [ ] DISC Description field populated (rich text)
- [ ] English Score field populated (option)
- [ ] English Description field populated (rich text)
- [ ] Education field populated (multi-reference)
- [ ] YouTube URL field populated (plain text)

### Check Sample VA
- [ ] Open a VA profile (e.g., ABIGAIL FAITH)
- [ ] Verify all fields are populated
- [ ] Verify references are linked correctly
- [ ] Verify DISC and English fields have values

---

## 🔧 TROUBLESHOOTING

### Error: "WEBFLOW_API_TOKEN required"
**Solution**: Make sure you're passing the token correctly:
```bash
WEBFLOW_API_TOKEN="your_actual_token" node scripts/...
```

### Error: "Virtual Assistants collection not found"
**Solution**: Make sure the collection exists in your Webflow site. Check the collection name is exactly "Virtual Assistants".

### Error: "API rate limit exceeded"
**Solution**: Wait a few minutes and run the script again. The scripts will resume from where they left off.

### Error: "Collection IDs not found"
**Solution**: Make sure you ran Step 1 (create-cms-collections.js) first. It generates the collection-ids.json file.

### Error: "unique-values.json not found"
**Solution**: Make sure you ran Step 2 (extract-unique-values.js) first. It generates the unique-values.json file.

---

## 📝 IMPORTANT NOTES

1. **Order Matters**: Run scripts in order (1 → 2 → 3 → 4)
2. **API Token**: Keep it secret, don't commit it to git
3. **Backups**: Consider backing up your CMS before running scripts
4. **Testing**: The scripts are safe - they only create new items, they don't delete anything
5. **Idempotent**: You can run scripts multiple times without issues

---

## 🎯 NEXT STEPS

After completing all 4 steps:

1. ✅ Verify data in Webflow Designer
2. ✅ Test dynamic page rendering
3. ✅ Create VA profile pages in Webflow
4. ✅ Deploy to production

---

## 💡 COMPARISON

### Manual Approach (Old)
- Create 5 collections manually: 30 min
- Add 10 fields manually: 20 min
- Create 150+ skills manually: 2 hours
- Create 80+ tools manually: 1.5 hours
- Create 15 equipment manually: 15 min
- Create 200+ employment entries manually: 3 hours
- Create 60+ education entries manually: 1 hour
- Link all references manually: 2 hours
- **TOTAL**: 10-12 hours

### Automated Approach (New)
- Run 4 scripts: 2-3 hours
- **TOTAL**: 2-3 hours

### Time Saved
**7-9 hours** ✅

---

**Ready to execute?** Let's go! 🚀
