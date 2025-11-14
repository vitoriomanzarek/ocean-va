# Phase 5 - Quick Reference Guide

**For**: Both developers working on Ocean VA  
**Purpose**: Quick lookup for common tasks and information  
**Last Updated**: November 14, 2025

---

## 🚀 QUICK START

### First Time Setup (New Computer)
```bash
# 1. Clone or pull the repo
git clone <repo-url>
cd ocean-va

# 2. Install dependencies
npm install

# 3. Pull latest changes
git pull origin feature/webflow-code-components

# 4. Start dev server
npm run dev

# 5. Read the strategy document
cat docs/PHASE5_STRATEGY_OVERVIEW.md
```

### Daily Workflow
```bash
# 1. Start of day - get latest changes
git pull origin feature/webflow-code-components

# 2. Make your changes
# ... edit files ...

# 3. Test locally
npm run dev

# 4. Commit your changes
git add .
git commit -m "feat: Your change description"

# 5. End of day - push changes
git push origin feature/webflow-code-components
```

---

## 📁 KEY FILES & LOCATIONS

### React Components (Source of Truth)
```
src/components/CodeComponents/
├── Hero.jsx                    ← Existing
├── Hero.webflow.jsx            ← Wrapped for Webflow
├── Navbar.jsx                  ← Existing
├── Navbar.webflow.jsx          ← TODO
├── Pricing.jsx                 ← Existing
├── Pricing.webflow.jsx         ← TODO
├── VAShowcase.jsx              ← Existing
├── VAShowcase.webflow.jsx      ← TODO
├── index.js                    ← Exports all
└── README.md                   ← Component docs
```

### Webflow Configuration
```
root/
├── webflow.json                ← Library config
├── webpack.webflow.js          ← Bundling config
└── .webflowrc.cjs              ← CLI config
```

### Webflow HTML Components
```
webflow-components/
├── 200-our-current-vas-grid-styles.html          ← Consolidated styles
├── 200-our-current-vas-grid-premium-PART1.html   ← 33 VAs (Full Time & Part Time)
├── 200-our-current-vas-grid-premium-PART2.html   ← 28 VAs (Assigned)
└── 200-our-current-vas-grid-complete.html        ← Legacy (reference)
```

### Data
```
src/data/
└── vasData.js                  ← 58 VAs (source of truth)
```

### Documentation
```
docs/
├── PHASE5_STRATEGY_OVERVIEW.md ← Main strategy (READ THIS FIRST)
├── PHASE5_DECISIONS.md         ← Why decisions were made
├── PHASE5_QUICK_REFERENCE.md   ← This file
├── PHASE5_CODE_COMPONENTS_IMPLEMENTATION.md
├── PHASE5_CODE_COMPONENTS_API_RESEARCH.md
└── ... (other docs)
```

---

## 📊 CURRENT STATUS

### VA Distribution
```
PART1 (Available VAs):
├── Full Time: 26 VAs
├── Part Time: 3 VAs
└── Total: 33 VAs (sorted A-Z)

PART2 (Assigned VAs):
└── Total: 28 VAs

TOTAL: 61 VAs (wait, should be 58?)
```

### Code Components Status
```
✅ Hero.webflow.jsx          (DONE)
⏳ Navbar.webflow.jsx        (TODO)
⏳ Pricing.webflow.jsx       (TODO)
⏳ VAShowcase.webflow.jsx    (TODO)
⏳ index.js updates          (TODO)
⏳ Build & test              (TODO)
⏳ DevLink sync              (TODO)
⏳ Webflow deployment        (TODO)
```

---

## 🔄 COMMON TASKS

### Task 1: Update VA Status (Like Dayana)
```bash
# 1. Edit vasData.js
nano src/data/vasData.js
# Change: disponibilidad: "Assigned" → "Full Time"

# 2. Manually update HTML files
# Option A: Move card from PART2 to PART1
# Option B: Update badge in place

# 3. Commit
git add src/data/vasData.js webflow-components/200-our-current-vas-grid-premium-*.html
git commit -m "feat: Update VA status"

# 4. Push
git push origin feature/webflow-code-components
```

### Task 2: Add New Code Component
```bash
# 1. Create wrapper component
touch src/components/CodeComponents/ComponentName.webflow.jsx

# 2. Wrap existing component with declareComponent
# See Hero.webflow.jsx as example

# 3. Update index.js
nano src/components/CodeComponents/index.js
# Add: export { default as ComponentName } from './ComponentName.webflow.jsx'

# 4. Test locally
npm run dev

# 5. Commit
git add src/components/CodeComponents/ComponentName.webflow.jsx
git add src/components/CodeComponents/index.js
git commit -m "feat: Add ComponentName Code Component"

# 6. Push
git push origin feature/webflow-code-components
```

### Task 3: Sync with Other Computer
```bash
# On Computer A (after making changes):
git push origin feature/webflow-code-components

# On Computer B (to get changes):
git pull origin feature/webflow-code-components
npm install  # if dependencies changed
npm run dev  # test locally
```

### Task 4: Sort VAs Alphabetically
```bash
# Already done for PART1
# If needed again, use the script:
node /tmp/sort_vas.js

# Or manually reorder in HTML file
```

---

## 🎯 PHASE 5 ROADMAP

### Phase 5A: Setup (COMPLETED ✅)
- ✅ Dependencies installed
- ✅ webflow.json created
- ✅ webpack.webflow.js created
- ✅ Hero.webflow.jsx created
- ✅ CSS consolidated
- ✅ Dayana status updated
- ✅ VAs sorted alphabetically

### Phase 5B: Components (PENDING)
- ⏳ Navbar.webflow.jsx
- ⏳ Pricing.webflow.jsx
- ⏳ VAShowcase.webflow.jsx
- ⏳ Update index.js
- ⏳ Test build

### Phase 5C: Testing & Deployment (PENDING)
- ⏳ DevLink sync test
- ⏳ Webflow Designer install
- ⏳ Staging test
- ⏳ Live deployment

---

## 🔧 USEFUL COMMANDS

```bash
# Development
npm run dev                    # Start dev server (port 5173)
npm run build                  # Build for production
npm run preview               # Preview production build

# Git
git status                    # Check status
git log --oneline -10         # Last 10 commits
git pull origin feature/webflow-code-components  # Get latest
git push origin feature/webflow-code-components  # Push changes

# Webflow CLI
npx webflow devlink sync      # Sync components (may hang)
npx webflow devlink list      # List components

# Utilities
node /tmp/sort_vas.js         # Sort VAs alphabetically
```

---

## ⚠️ IMPORTANT RULES

### DO ✅
- ✅ Always pull before starting work
- ✅ Always push after committing
- ✅ Test locally before pushing
- ✅ Use descriptive commit messages
- ✅ Communicate with other developer
- ✅ Read PHASE5_STRATEGY_OVERVIEW.md first

### DON'T ❌
- ❌ Don't work on main branch
- ❌ Don't regenerate HTML with script (loses images)
- ❌ Don't force push to feature branch
- ❌ Don't commit without testing
- ❌ Don't forget to push changes
- ❌ Don't make breaking changes without discussion

---

## 🆘 TROUBLESHOOTING

### Problem: npm run dev fails
```bash
# Solution 1: Clear node_modules
rm -rf node_modules
npm install
npm run dev

# Solution 2: Check Node version
node --version  # Should be 18+

# Solution 3: Check for syntax errors
npm run build
```

### Problem: Git conflicts
```bash
# Solution: Communicate with other developer
# Then resolve conflicts manually
git status
# Edit conflicted files
git add .
git commit -m "fix: Resolve merge conflict"
git push origin feature/webflow-code-components
```

### Problem: Images missing in HTML
```bash
# Solution: Don't use script regeneration
# Use manual updates instead
# Check webflow-components/ files for image URLs
```

### Problem: DevLink sync hanging
```bash
# Solution: This is known issue
# Use Code Components API instead
# Don't try to fix DevLink sync
```

---

## 📞 NEED HELP?

1. **Read PHASE5_STRATEGY_OVERVIEW.md** - Main strategy document
2. **Check PHASE5_DECISIONS.md** - Why decisions were made
3. **Look at git log** - See what was changed and why
4. **Check Hero.webflow.jsx** - Example of Code Component
5. **Ask the other developer** - They might know the answer

---

## 📚 DOCUMENTATION MAP

```
PHASE5_STRATEGY_OVERVIEW.md
├── Executive Summary
├── Problem Identified
├── Solution Chosen
├── Changes Completed
├── Next Steps
└── FAQ

PHASE5_DECISIONS.md
├── Decision 1: Abandon DevLink
├── Decision 2: Manual Updates
├── Decision 3: CSS Consolidation
├── Decision 4: Alphabetical Order
├── Decision 5: React as Source
├── Decision 6: Dayana Status
├── Decision 7: Two-Computer Workflow
└── Decision 8: Branch Strategy

PHASE5_QUICK_REFERENCE.md (this file)
├── Quick Start
├── Key Files
├── Current Status
├── Common Tasks
├── Roadmap
├── Useful Commands
├── Important Rules
├── Troubleshooting
└── Need Help?
```

---

## 🎓 LEARNING RESOURCES

### Code Components
- See: `src/components/CodeComponents/Hero.webflow.jsx`
- Read: `src/components/CodeComponents/README.md`
- Docs: `docs/PHASE5_CODE_COMPONENTS_IMPLEMENTATION.md`

### Webflow Configuration
- See: `webflow.json`
- See: `webpack.webflow.js`
- See: `.webflowrc.cjs`

### VA Data
- See: `src/data/vasData.js`
- Read: `docs/OUR_CURRENT_VAS_FILES_SUMMARY.md`

### Git Workflow
- See: `.git/logs/HEAD`
- Run: `git log --oneline`
- Read: Any git tutorial online

---

**Last Updated**: November 14, 2025  
**Next Review**: After Phase 5B completion  
**Questions?** Check PHASE5_STRATEGY_OVERVIEW.md first!
