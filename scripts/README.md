# Scripts Directory

## 📋 Overview

All automation scripts for Ocean VA project.

---

## 🔧 VA Generation Scripts

### generate-va-profiles.js
Generates individual VA profile HTML files from vasData.js

```bash
node scripts/generate-va-profiles.js
```

### generate-va-grids.js
Generates VA grid layouts for Webflow

```bash
node scripts/generate-va-grids.js
```

### generate-vas-html.py
Python version for VA HTML generation (DEPRECATED?)

```bash
python3 scripts/generate-vas-html.py
```

**TODO**: Consolidate Python and JS versions

---

## 🖼️ Image Management Scripts

### match-webflow-images.js
Matches VA names with Webflow image URLs

```bash
node scripts/match-webflow-images.js
```

### extract-webflow-images.js
Extracts image URLs from Webflow API

```bash
node scripts/extract-webflow-images.js
```

### update-image-urls.js
Updates image URLs in components

```bash
node scripts/update-image-urls.js
```

### update-grid-with-webflow-images.js
Updates VA grid with Webflow image URLs

```bash
node scripts/update-grid-with-webflow-images.js
```

---

## 🎬 Video & Content Scripts

### inject-video-urls.js
Injects video URLs into VA profiles

```bash
node scripts/inject-video-urls.js
```

---

## ✅ Validation Scripts

### validate-webflow-components.js
Validates all Webflow components

```bash
node scripts/validate-webflow-components.js
```

---

## 🛠️ Utility Scripts

### webflow-api-helper.js
Helper functions for Webflow API calls

### split-html-file.js
Splits large HTML files into smaller chunks

```bash
node scripts/split-html-file.js
```

### update-webflow-vas-page.js
Updates the main VA page in Webflow

```bash
node scripts/update-webflow-vas-page.js
```

---

## 📊 Script Status

| Script | Status | Priority | Notes |
|--------|--------|----------|-------|
| generate-va-profiles.js | ✅ Active | High | Main generator |
| generate-va-grids.js | ✅ Active | High | Grid layouts |
| generate-vas-html.py | ⚠️ Check | Low | Duplicate? |
| generate-vas-html-v2.js | ⚠️ Check | Low | Duplicate? |
| generate-vas-html-premium.js | ⚠️ Check | Low | Duplicate? |
| match-webflow-images.js | ✅ Active | Medium | Image matching |
| extract-webflow-images.js | ✅ Active | Medium | Image extraction |
| update-image-urls.js | ✅ Active | Medium | URL updates |
| inject-video-urls.js | ✅ Active | Low | Video injection |
| validate-webflow-components.js | ✅ Active | High | Validation |
| webflow-api-helper.js | ✅ Active | Medium | API helper |
| split-html-file.js | ⚠️ Check | Low | Utility |
| update-webflow-vas-page.js | ⚠️ Check | Low | Page update |

---

## 🚀 Usage

### Run all generators
```bash
npm run generate:all
```

### Run specific generator
```bash
node scripts/generate-va-profiles.js
```

### Validate components
```bash
node scripts/validate-webflow-components.js
```

---

## 📝 TODO

- [ ] Consolidate duplicate generators (Python + JS versions)
- [ ] Create unified script runner
- [ ] Add error handling to all scripts
- [ ] Document each script's parameters
- [ ] Create automated test suite
- [ ] Add logging to scripts

