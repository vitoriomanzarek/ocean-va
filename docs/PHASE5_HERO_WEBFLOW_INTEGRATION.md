# Phase 5 - Hero Component Integration in Webflow

**Component**: Hero
**Status**: Ready for Export
**File**: `src/components/CodeComponents/Hero.webflow.html`
**Date**: November 14, 2025

---

## 🎯 Objective

Export and integrate the Hero component into Webflow staging environment.

---

## 📋 Step-by-Step Integration

### Step 1: Copy Hero Component Code

**Location**: `src/components/CodeComponents/Hero.webflow.html`

**Action**: 
```bash
# Copy the entire Hero.webflow.html file
cat src/components/CodeComponents/Hero.webflow.html
```

Or open the file in your editor and copy all content.

---

### Step 2: Open Webflow Designer

1. Go to https://webflow.com/dashboard
2. Open "Copy of Ocean VA"
3. Click "Go to Designer"
4. Select "Staging" environment

---

### Step 3: Create New Page or Edit Existing

**Option A: Create New Page**
1. Click "+" to create new page
2. Name it "Hero Test" or similar
3. Click "Create"

**Option B: Edit Existing Page**
1. Select existing page
2. Click "Edit"

---

### Step 4: Add HTML Embed Element

1. In Webflow Designer, click "Add" (or drag element)
2. Search for "HTML Embed"
3. Click to add it to the page
4. Place it at the top of the page

---

### Step 5: Paste Hero Component Code

1. Click on the HTML Embed element
2. Click "Edit Code" or "Settings"
3. Paste the entire Hero.webflow.html code
4. Click "Save"

---

### Step 6: Customize Hero Component

**In the HTML Embed code, customize:**

```html
<!-- CHANGE THESE VALUES -->

<!-- 1. Title -->
<h1>Welcome to Ocean VA</h1>
<!-- Change to your desired title -->

<!-- 2. Subtitle -->
<p>Expert Virtual Assistants for Your Business</p>
<!-- Change to your desired subtitle -->

<!-- 3. Background Image -->
background-image: url('https://cdn.prod.website-files.com/...');
<!-- Replace with your image URL -->

<!-- 4. Button Text -->
<a href="#contact">Book a Free Call</a>
<!-- Change text and link -->

<!-- 5. Button Link -->
href="#contact"
<!-- Change to your desired link (e.g., "/contact", "https://example.com") -->
```

---

### Step 7: Preview and Test

1. Click "Preview" button
2. Test on different devices:
   - **Desktop**: Should show full hero with background
   - **Tablet**: Should be responsive
   - **Mobile**: Should stack properly

**Things to check:**
- [ ] Title is visible
- [ ] Subtitle is visible
- [ ] Background image displays
- [ ] Button is clickable
- [ ] Colors look correct
- [ ] Text is readable
- [ ] Responsive on mobile

---

### Step 8: Adjust Styling (if needed)

If styling needs adjustment:

1. Click on HTML Embed element
2. Edit the CSS in the `<style>` section
3. Adjust colors, sizes, spacing
4. Test again

**Common adjustments:**
- Font sizes (change `font-size` values)
- Colors (change hex codes like `#049d98`)
- Spacing (change `padding`, `margin` values)
- Background position (change `background-position`)

---

### Step 9: Publish to Staging

1. Click "Publish" button
2. Select "Staging" environment
3. Click "Publish to Staging"
4. Wait for publish to complete

---

### Step 10: Verify in Staging

1. Go to staging URL: `https://ocean-va-solutions-f4bd14e5dc2767a69094.design.webflow.io/`
2. Navigate to your page
3. Verify Hero displays correctly
4. Test on mobile device
5. Test all interactions

---

## 🎨 Customization Options

### Change Title
```html
<h1>Your Custom Title Here</h1>
```

### Change Subtitle
```html
<p>Your custom subtitle here</p>
```

### Change Background Image
```html
background-image: url('YOUR_IMAGE_URL_HERE');
```

### Change Button Text
```html
<a href="#contact">Your Button Text</a>
```

### Change Button Link
```html
href="#contact"  <!-- Change this -->
```

### Change Colors
```html
<!-- Primary color (Ocean Turquoise) -->
rgba(5, 191, 185, 0.9)  <!-- Change to your color -->

<!-- Secondary color (Ocean Dark) -->
rgba(4, 157, 152, 0.9)  <!-- Change to your color -->
```

### Change Font Sizes
```html
font-size: 3.5rem;  <!-- Title size -->
font-size: 1.25rem;  <!-- Subtitle size -->
font-size: 1.125rem;  <!-- Button text size -->
```

---

## 📱 Responsive Breakpoints

The Hero component is responsive at these breakpoints:

- **Desktop** (> 768px): Full size, background-attachment: fixed
- **Tablet** (640px - 768px): Reduced size, adjusted fonts
- **Mobile** (< 640px): Minimal size, background-attachment: scroll

---

## ✅ Verification Checklist

### Visual Verification
- [ ] Hero displays on desktop
- [ ] Hero displays on tablet
- [ ] Hero displays on mobile
- [ ] Background image visible
- [ ] Title readable
- [ ] Subtitle readable
- [ ] Button visible and clickable

### Functional Verification
- [ ] Button link works
- [ ] Hover effects work
- [ ] Responsive layout works
- [ ] No console errors
- [ ] No styling conflicts

### Performance Verification
- [ ] Page loads quickly
- [ ] Image loads properly
- [ ] No layout shifts
- [ ] Smooth animations

---

## 🔧 Troubleshooting

### Hero Not Displaying
**Problem**: Hero section not visible
**Solution**:
1. Check HTML Embed element is added
2. Verify code is pasted correctly
3. Check for console errors
4. Verify background image URL is valid

### Styling Issues
**Problem**: Colors or fonts look wrong
**Solution**:
1. Check CSS values are correct
2. Verify hex codes are valid
3. Check for CSS conflicts
4. Test in different browser

### Responsive Issues
**Problem**: Hero not responsive on mobile
**Solution**:
1. Check media queries in CSS
2. Verify breakpoints are correct
3. Test on actual mobile device
4. Check for overflow issues

### Button Not Working
**Problem**: Button link doesn't work
**Solution**:
1. Verify href value is correct
2. Check link format (should be "#contact" or "/page")
3. Test link in staging
4. Verify page exists

---

## 📊 Next Steps

### After Hero Integration
1. ✅ Export Hero to Webflow
2. ⏳ Test Hero in staging
3. ⏳ Export Navbar component
4. ⏳ Export Pricing component
5. ⏳ Export VAShowcase component
6. ⏳ Full testing
7. ⏳ Publish to original

---

## 💡 Tips

✅ **Test early** - Don't wait to test all components
✅ **Use staging** - Always test in staging first
✅ **Document changes** - Keep track of customizations
✅ **Mobile first** - Test mobile before desktop
✅ **Get feedback** - Show team before publishing

---

## 🚀 Ready to Export?

**File to export**: `src/components/CodeComponents/Hero.webflow.html`

**Steps**:
1. Copy Hero.webflow.html code
2. Go to Webflow Designer
3. Add HTML Embed
4. Paste code
5. Customize
6. Test
7. Publish to staging

**Let's go!** 🎯

