# Our Virtual Assistants - Webflow Integration Guide

## 📋 Overview

This guide explains how to integrate the complete Virtual Assistants grid into your Webflow site. The component displays all 56 VAs with their information in a responsive grid layout.

## 📁 Files

- **200-our-current-vas-grid-complete.html** - Complete HTML component with all 56 VAs
- **generate-vas-html.py** - Python script to regenerate the HTML if you update vasData.js

## 🚀 How to Use in Webflow

### Step 1: Copy the HTML Component

1. Open `webflow-components/200-our-current-vas-grid-complete.html`
2. Copy all the content

### Step 2: Add to Webflow

1. In your Webflow Designer, go to the page where you want to add the VAs grid
2. Add an **HTML Embed** element
3. Paste the entire HTML code
4. Click "Save & Close"

### Step 3: Customize (Optional)

You can customize:
- **Colors**: Change `#049d98` (ocean teal) to your preferred color
- **Grid columns**: Modify `grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))`
- **Card styling**: Adjust padding, shadows, border-radius, etc.

## 📊 Component Statistics

- **Total VAs**: 56
- **Bilingual (EN-ES)**: 8
- **English-only**: 48
- **Full-time**: 26
- **Part-time**: 4
- **Assigned**: 26

## 🔄 Updating the HTML

If you update the VA data in `src/data/vasData.js`, regenerate the HTML:

```bash
cd /Users/victor/CascadeProjects/ocean-va
python3 generate-vas-html.py
```

This will create a new `200-our-current-vas-grid-complete.html` with the updated data.

## 🎨 Styling Classes

All styling is inline in the HTML. Key classes:

- `.ova-container` - Main wrapper
- `.ova-grid` - Grid layout
- `.ova-card` - Individual VA card
- `.ova-card-image` - Image section
- `.ova-availability-badge` - Status badge
- `.ova-card-content` - Content section
- `.ova-tags` - Specialization tags
- `.ova-btn` - Buttons

## 📱 Responsive Breakpoints

- **Desktop**: 3-4 columns (300px min-width)
- **Tablet**: 2 columns
- **Mobile**: 1 column

## 🔗 Links

Each VA card links to their profile page using the `slug` field:
- Example: `/adrian-ocean-va-profile`

Make sure these routes exist in your Webflow site or update the links accordingly.

## 🖼️ Images

Currently using placeholder images from DiceBear API:
```
https://api.dicebear.com/7.x/avataaars/svg?seed={VA_NAME}
```

To use real images:
1. Upload images to Webflow
2. Replace the `src` attribute in the `<img>` tags
3. Or update the Python script to use real image URLs

## 🎯 Next Steps

1. ✅ Copy HTML to Webflow
2. ✅ Test on different devices
3. ✅ Customize colors/styling if needed
4. ✅ Update image URLs with real photos
5. ✅ Test profile links

## 📝 Notes

- All styling is self-contained (no external CSS required)
- Component uses semantic HTML for accessibility
- Images are lazy-loaded for performance
- Fully responsive design
- No JavaScript required

## 💡 Tips

- Use the `generate-vas-html.py` script whenever you update VA data
- Keep the Python script in the project root for easy access
- Test the component on mobile before publishing
- Consider adding filters (availability, language) later if needed

---

**Last Updated**: November 10, 2025
**Component Version**: 1.0
**Total VAs**: 56
