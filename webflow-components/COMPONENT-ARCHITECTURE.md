# Webflow VA Components Architecture

## 🏗️ Component Structure

We've created a **modular component system** for Webflow that can be assembled like building blocks.

### Components Available:

1. **201-va-card-component.html** - Individual VA Card
2. **202-va-grid-container.html** - Responsive Grid Layout
3. **203-va-filters-component.html** - Search & Filter UI
4. **200-our-current-vas-grid-complete.html** - Complete Page (all components combined)

---

## 📦 How They Work Together

```
┌─────────────────────────────────────────┐
│  Page: /ovas-current-vas                │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  203 - Filters Component        │   │
│  │  (Search, Availability, Lang)   │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  202 - Grid Container           │   │
│  │  (Responsive Layout)            │   │
│  │                                 │   │
│  │  ┌──────────┐ ┌──────────┐     │   │
│  │  │ 201 Card │ │ 201 Card │ ... │   │
│  │  │ Adrian   │ │ Alejando │     │   │
│  │  └──────────┘ └──────────┘     │   │
│  │                                 │   │
│  │  [56 Cards Total]               │   │
│  └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🎯 Implementation Options

### Option A: Use Complete Component (Easiest)
```
1. Copy: 200-our-current-vas-grid-complete.html
2. Paste into Webflow HTML Embed
3. Done! ✅
```

### Option B: Build Custom Layout (Advanced)
```
1. Add HTML Embed for filters (203)
2. Add HTML Embed for grid container (202)
3. Add HTML Embed for each card (201)
4. Customize styling as needed
```

### Option C: Mix & Match
```
1. Use complete grid (200)
2. Add custom filters (203)
3. Customize header/footer
```

---

## 🔧 Component Details

### 201 - VA Card Component

**What it does**: Displays a single VA with all their information

**Includes**:
- Profile image
- Name and role
- Experience and language
- Specialization tags
- Availability badge
- View Profile button

**How to use**:
- Copy the card div
- Duplicate for each VA
- Update the data for each VA
- Place inside grid container

**Customization**:
- Change colors (update `#049d98` to your brand color)
- Adjust card size (modify `minmax(300px, 1fr)`)
- Update button styles

---

### 202 - Grid Container

**What it does**: Provides responsive grid layout for cards

**Features**:
- Auto-responsive (3-4 cols desktop, 2 tablet, 1 mobile)
- Header section with title and description
- Proper spacing and padding
- Mobile-optimized

**How to use**:
- Copy entire container
- Place all VA cards inside `.va-grid` div
- Customize header text

**Responsive Breakpoints**:
- Desktop (1024px+): 3-4 columns
- Tablet (768px-1023px): 2-3 columns
- Mobile (480px-767px): 2 columns
- Small Mobile (<480px): 1 column

---

### 203 - Filters Component

**What it does**: Provides UI for filtering VAs

**Includes**:
- Search by name
- Availability filter (dropdown)
- Language filter (dropdown)
- Experience filter (dropdown)
- Specialization buttons
- Apply/Reset buttons

**How to use**:
- Copy entire component
- Place ABOVE the grid
- Connect to filtering logic (requires JavaScript)

**Note**: This is a UI component. To make it functional:
- Add JavaScript to filter the grid
- Or use Webflow Collections
- Or implement server-side filtering

---

## 📋 Step-by-Step Implementation

### Step 1: Create Page in Webflow
```
1. Go to Webflow Designer
2. Click "+ Add Page"
3. Name: "Our Current VAs"
4. Slug: ovas-current-vas
5. Click "Create"
```

### Step 2: Add Components
```
1. Add Section element
2. Add HTML Embed #1 (Filters - optional)
3. Add HTML Embed #2 (Grid with all cards)
4. Click "Save & Close"
```

### Step 3: Paste Component Code
```
Option A (Easiest):
- Copy: 200-our-current-vas-grid-complete.html
- Paste into single HTML Embed

Option B (Custom):
- Copy: 203-va-filters-component.html → HTML Embed #1
- Copy: 202-va-grid-container.html + 201 cards → HTML Embed #2
```

### Step 4: Customize
```
1. Update colors to match brand
2. Update image URLs (replace DiceBear with real photos)
3. Test on mobile/tablet
4. Adjust spacing if needed
```

### Step 5: Publish
```
1. Click "Publish"
2. Test live page
3. Verify all links work
```

---

## 🎨 Customization Guide

### Change Brand Color
Replace all instances of `#049d98` with your color:
```css
/* Ocean teal (default) */
#049d98

/* Change to your color */
#your-color-here
```

### Adjust Grid Columns
```css
/* Default: 3-4 columns */
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

/* Change to 2 columns */
grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));

/* Change to 5 columns */
grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
```

### Update Images
Replace DiceBear URLs with real images:
```html
<!-- Before (placeholder) -->
<img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Adrian" alt="Adrian">

<!-- After (real image) -->
<img src="https://your-domain.com/images/adrian.jpg" alt="Adrian">
```

### Modify Card Height
```css
/* Increase image height */
.va-card-image {
  height: 300px; /* was 240px */
}

/* Increase padding */
.va-card-content {
  padding: 24px; /* was 20px */
}
```

---

## 🔄 Workflow: Update VA Data

### When you update `src/data/vasData.js`:

```bash
# 1. Regenerate HTML
python3 generate-vas-html.py

# 2. This creates: 200-our-current-vas-grid-complete.html

# 3. Copy new HTML to Webflow
# - Open Webflow Designer
# - Edit page /ovas-current-vas
# - Update HTML Embed with new content
# - Publish
```

---

## 📊 Component Statistics

- **Total VAs**: 56
- **Bilingual**: 8
- **English-only**: 48
- **Full-time**: 26
- **Part-time**: 4
- **Assigned**: 26

---

## 🚀 Advanced Features (Future)

- [ ] Dynamic filtering with JavaScript
- [ ] Search functionality
- [ ] Webflow Collections integration
- [ ] CMS-driven content
- [ ] Pagination
- [ ] Sorting options
- [ ] Favorites/Bookmarks
- [ ] Share profile links

---

## 📚 File Reference

| File | Purpose | Size |
|------|---------|------|
| 201-va-card-component.html | Single card | ~2KB |
| 202-va-grid-container.html | Grid layout | ~2KB |
| 203-va-filters-component.html | Filters UI | ~3KB |
| 200-our-current-vas-grid-complete.html | Complete page | ~50KB |
| generate-vas-html.py | Generate HTML | ~3KB |

---

## ✅ Checklist

- [ ] Create page `/ovas-current-vas`
- [ ] Add HTML Embed
- [ ] Paste component code
- [ ] Test on desktop
- [ ] Test on tablet
- [ ] Test on mobile
- [ ] Update images
- [ ] Customize colors
- [ ] Test all links
- [ ] Publish

---

## 🆘 Troubleshooting

### Cards not showing?
- Check HTML Embed is visible
- Verify CSS is included
- Check browser console for errors

### Images not loading?
- Verify image URLs
- Check CORS settings
- Use Webflow's image hosting

### Layout broken on mobile?
- Check responsive breakpoints
- Test in mobile preview
- Adjust grid columns if needed

### Links not working?
- Verify profile page slugs
- Check that pages exist
- Test in preview mode first

---

## 📞 Support

For issues or questions:
1. Check this documentation
2. Review component code comments
3. Test in Webflow preview
4. Check browser console for errors

---

**Last Updated**: November 10, 2025
**Version**: 1.0
**Status**: Ready for Production
