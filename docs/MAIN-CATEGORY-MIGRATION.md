# Main Category Migration - Multi-Reference Implementation

**Date**: November 20, 2025  
**Status**: 🔄 READY TO EXECUTE  
**Objective**: Convert categoría_principal from string to multi-reference field

---

## 📊 CURRENT STATE

### Main Categories Found
- **Insurance Virtual Assistant** (56 VAs)
- **Executive Virtual Assistant** (18 VAs)
- **Mortgage Specialist** (1 VA)
- **Marketing Virtual Assistant** (1 VA)
- **Healthcare Virtual Assistant** (1 VA)

**Total**: 5 unique categories across 77 VAs

---

## 🎯 IMPLEMENTATION PLAN

### Phase 1: Create Main Category Collection
**Script**: `create-main-category-collection.js`
**Time**: ~5 minutes

**What it does**:
1. Extracts all unique main categories from vasData.js
2. Creates "Main Category" collection in Webflow
3. Adds "Name" field to collection
4. Loads all 5 categories as items
5. Saves collection ID to `data/collection-ids.json`
6. Saves categories list to `data/main-categories.json`

**Command**:
```bash
WEBFLOW_API_TOKEN="token" WEBFLOW_SITE_ID="site_id" node scripts/create-main-category-collection.js
```

---

### Phase 2: Convert vasData.js Format
**Script**: `convert-main-category-to-array.js`
**Time**: ~1 minute

**What it does**:
1. Converts `categoría_principal: "string"` to `categoría_principal: ["string"]`
2. Updates all 77 VAs
3. Verifies conversion

**Command**:
```bash
node scripts/convert-main-category-to-array.js
```

**Example**:
```javascript
// Before
categoría_principal: "Insurance Virtual Assistant"

// After
categoría_principal: ["Insurance Virtual Assistant"]
```

---

### Phase 3: Add Multi-Reference Field to Virtual Assistants
**Script**: `add-main-category-field.js`
**Time**: ~2 minutes

**What it does**:
1. Adds "Main Categories" multi-reference field to Virtual Assistants collection
2. Links it to Main Category collection
3. Handles existing field gracefully

**Command**:
```bash
WEBFLOW_API_TOKEN="token" node scripts/add-main-category-field.js
```

---

### Phase 4: Link Categories to VAs
**Script**: `link-main-categories-to-vas.js`
**Time**: ~10 minutes (with rate limiting)

**What it does**:
1. Fetches all Main Category items from Webflow
2. Parses vasData.js to get VA-category mappings
3. Fetches all VAs from Webflow
4. Links each VA to their main category(ies)
5. Shows progress and summary

**Command**:
```bash
WEBFLOW_API_TOKEN="token" node scripts/link-main-categories-to-vas.js
```

---

### Phase 5: Update Webflow Components
**Manual**: Update VA cards to use multi-reference field
**Time**: ~30 minutes

**What to change**:
1. Update `205-navbar-header.html` - Filter by main category
2. Update `205-navbar-va-page.html` - Filter by main category
3. Update `208-va-grid-part1.html` - Display main categories
4. Update `208-va-grid-part2.html` - Display main categories
5. Update `207-filters-va-page.html` - Add main category filter

**Changes needed**:
- Change field reference from `categoría_principal` to `main-categories`
- Update display logic to handle array of categories
- Update filter logic to work with multi-reference

---

## 📋 EXECUTION CHECKLIST

### Before Starting
- [ ] Backup vasData.js
- [ ] Backup Webflow collection (export)
- [ ] Ensure API tokens are set

### Phase 1
- [ ] Run `create-main-category-collection.js`
- [ ] Verify collection created in Webflow
- [ ] Check `data/collection-ids.json` updated
- [ ] Check `data/main-categories.json` created

### Phase 2
- [ ] Run `convert-main-category-to-array.js`
- [ ] Verify all 77 VAs have array format
- [ ] Commit changes to git

### Phase 3
- [ ] Run `add-main-category-field.js`
- [ ] Verify field added in Webflow Designer
- [ ] Check field is multi-reference type

### Phase 4
- [ ] Run `link-main-categories-to-vas.js`
- [ ] Monitor progress (should take ~10 min)
- [ ] Verify all 77 VAs linked
- [ ] Check Webflow Designer for linked categories

### Phase 5
- [ ] Update HTML components in Webflow
- [ ] Test filters with new field
- [ ] Test VA cards display categories
- [ ] Test on mobile
- [ ] Publish changes

---

## 🔧 QUICK START

```bash
# Phase 1: Create collection
WEBFLOW_API_TOKEN="your_token" WEBFLOW_SITE_ID="your_site_id" node scripts/create-main-category-collection.js

# Phase 2: Convert format
node scripts/convert-main-category-to-array.js

# Phase 3: Add field
WEBFLOW_API_TOKEN="your_token" node scripts/add-main-category-field.js

# Phase 4: Link categories
WEBFLOW_API_TOKEN="your_token" node scripts/link-main-categories-to-vas.js

# Phase 5: Manual updates in Webflow Designer
```

---

## 📊 DATA STRUCTURE

### Before
```javascript
{
  nombre: "Adrian",
  categoría_principal: "Insurance Virtual Assistant",
  // ...
}
```

### After
```javascript
{
  nombre: "Adrian",
  categoría_principal: ["Insurance Virtual Assistant"],
  // ...
}
```

### In Webflow
```
Virtual Assistants Collection
├── Main Categories (Multi-Reference)
│   └── Links to Main Category collection items
│       ├── Insurance Virtual Assistant
│       ├── Executive Virtual Assistant
│       ├── Mortgage Specialist
│       ├── Marketing Virtual Assistant
│       └── Healthcare Virtual Assistant
```

---

## ⚠️ IMPORTANT NOTES

1. **Backup First**: Always backup vasData.js before running Phase 2
2. **Rate Limiting**: Phase 4 will take ~10 minutes due to API rate limiting
3. **Webflow Updates**: Phase 5 requires manual updates to HTML components
4. **Testing**: Test thoroughly before publishing to production
5. **Rollback**: If issues occur, can revert vasData.js from git

---

## 🎯 BENEFITS

✅ **Multi-Category Support**: VAs can have multiple main categories  
✅ **Better Organization**: Centralized category management  
✅ **Improved Filtering**: Filter by multiple categories  
✅ **Scalability**: Easy to add new categories  
✅ **Data Consistency**: Single source of truth in Webflow  

---

## 📝 NEXT STEPS

1. Execute Phase 1-4 (automated)
2. Verify in Webflow Designer
3. Update HTML components (manual)
4. Test thoroughly
5. Commit changes
6. Deploy to production

**Total Time**: ~1 hour (including manual updates)

---

**Status**: Ready to execute! 🚀
