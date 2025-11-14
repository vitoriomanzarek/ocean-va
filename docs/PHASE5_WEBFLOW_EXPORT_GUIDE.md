# Phase 5 Webflow Export Guide - Code Components

**Status**: ✅ 4 Code Components Ready
**Location**: `src/components/CodeComponents/`
**Next Step**: Export to Webflow Designer

---

## 📋 Components Ready for Export

1. **Hero.jsx** - Hero section with background image
2. **Navbar.jsx** - Navigation bar with mobile menu
3. **Pricing.jsx** - Pricing plans showcase
4. **VAShowcase.jsx** - Virtual Assistants showcase with pagination

---

## 🚀 How to Export to Webflow

### Option 1: Manual Copy-Paste (Recommended for Now)

Since DevLink sync is hanging, we'll use manual export:

#### Step 1: Build Components
```bash
npm run build
```

#### Step 2: Export Component Code
For each component, copy the JSX code and convert to HTML/React:

**Hero Component Export:**
```jsx
// Copy from src/components/CodeComponents/Hero.jsx
// Paste in Webflow Designer as HTML Embed
// Or use as React Code Component
```

#### Step 3: Integrate in Webflow Designer

**In Webflow:**
1. Open "Copy of Ocean VA" → Staging
2. Create new page or edit existing
3. Add HTML Embed element
4. Paste component code
5. Adjust props in Webflow
6. Publish to staging

---

## 📝 Component Export Instructions

### Hero Component

**Props to Configure in Webflow:**
```javascript
{
  title: "Welcome to Ocean VA",
  subtitle: "Expert Virtual Assistants for Your Business",
  backgroundImage: "https://...",
  ctaText: "Book a Free Call",
  ctaLink: "#contact",
  ctaStyle: "primary"
}
```

**Steps:**
1. Copy Hero.jsx code
2. Create HTML Embed in Webflow
3. Paste code
4. Update props with your values
5. Test responsiveness
6. Publish

### Navbar Component

**Props to Configure:**
```javascript
{
  logo: "/img/oceanVALogo.png",
  logoAlt: "Ocean VA Logo",
  links: [
    { label: "Home", href: "/", submenu: [] },
    { label: "Services", href: "/services", submenu: [] },
    { label: "Industries", href: "/industries", submenu: [] },
    { label: "Our VAs", href: "/ovas-current-vas" }
  ],
  ctaText: "Book a Demo",
  ctaLink: "#contact"
}
```

**Steps:**
1. Copy Navbar.jsx code
2. Create HTML Embed in Webflow
3. Paste code
4. Update logo URL
5. Update navigation links
6. Test mobile menu
7. Publish

### Pricing Component

**Props to Configure:**
```javascript
{
  title: "Simple, Transparent Pricing",
  subtitle: "Choose the plan that works best",
  plans: [
    {
      name: "Starter",
      price: "$999",
      period: "/month",
      description: "Perfect for small teams",
      features: ["1 VA", "40 hours/week", "Email support"],
      cta: "Get Started",
      ctaLink: "#contact",
      highlighted: false
    },
    // ... more plans
  ]
}
```

**Steps:**
1. Copy Pricing.jsx code
2. Create HTML Embed in Webflow
3. Paste code
4. Update pricing plans
5. Update features
6. Test highlighted plan styling
7. Publish

### VAShowcase Component

**Props to Configure:**
```javascript
{
  title: "Meet Our Virtual Assistants",
  subtitle: "Expert professionals ready to support",
  vas: [
    {
      id: 1,
      name: "Maria Garcia",
      image: "https://...",
      specialization: "Insurance Processing",
      languages: ["English", "Spanish"],
      experience: "5+ years",
      rating: 4.9,
      reviews: 24,
      available: true
    },
    // ... more VAs
  ],
  itemsPerPage: 3
}
```

**Steps:**
1. Copy VAShowcase.jsx code
2. Create HTML Embed in Webflow
3. Paste code
4. Update VA data from vasData.js
5. Update images
6. Test pagination
7. Publish

---

## 🔄 Integration Workflow

### Phase 1: Setup (Today)
- [ ] Export Hero component
- [ ] Export Navbar component
- [ ] Test in Webflow staging
- [ ] Verify responsiveness

### Phase 2: Add More Components (Tomorrow)
- [ ] Export Pricing component
- [ ] Export VAShowcase component
- [ ] Test all components
- [ ] Verify interactions

### Phase 3: Testing (Day 3)
- [ ] Test on mobile
- [ ] Test on tablet
- [ ] Test on desktop
- [ ] Test all interactions
- [ ] Verify performance

### Phase 4: Validation (Day 4-5)
- [ ] Compare with original
- [ ] Verify functionality
- [ ] Verify design
- [ ] Get team approval

### Phase 5: Publish (Week 2)
- [ ] Publish to staging
- [ ] Monitor for 24 hours
- [ ] Publish to production of copy
- [ ] Migrate to original

---

## 📊 Component Status

| Component | Status | Export | Webflow | Testing | Publish |
|-----------|--------|--------|---------|---------|---------|
| Hero | ✅ Ready | ⏳ | ⏳ | ⏳ | ⏳ |
| Navbar | ✅ Ready | ⏳ | ⏳ | ⏳ | ⏳ |
| Pricing | ✅ Ready | ⏳ | ⏳ | ⏳ | ⏳ |
| VAShowcase | ✅ Ready | ⏳ | ⏳ | ⏳ | ⏳ |

---

## 🎯 Quick Start

### Export Hero Now

1. **Copy component code:**
   ```bash
   cat src/components/CodeComponents/Hero.jsx
   ```

2. **In Webflow Designer:**
   - Go to "Copy of Ocean VA" → Staging
   - Create new page or edit existing
   - Add HTML Embed element
   - Paste Hero component code
   - Update props
   - Publish

3. **Test:**
   - Check on mobile
   - Check on tablet
   - Check on desktop
   - Verify CTA button works

---

## 🔧 Troubleshooting

### Component Not Displaying
- Check console for errors
- Verify props are correct
- Check image URLs are valid
- Verify TailwindCSS is loaded

### Styling Issues
- Verify TailwindCSS is loaded in Webflow
- Check for CSS conflicts
- Verify color classes are correct
- Test on different browsers

### Responsive Issues
- Test on actual devices
- Check breakpoints
- Verify mobile menu works
- Test on different screen sizes

---

## 📚 Resources

- **Component Code**: `src/components/CodeComponents/`
- **Component Docs**: `src/components/CodeComponents/README.md`
- **Webflow Docs**: https://developers.webflow.com/
- **React Docs**: https://react.dev/

---

## 🚀 Next Steps

1. **Export Hero** - Start with simplest component
2. **Test in Webflow** - Verify it works
3. **Export Navbar** - Add navigation
4. **Export Pricing** - Add pricing section
5. **Export VAShowcase** - Add VA showcase
6. **Full Testing** - Test all components
7. **Publish** - Deploy to original

---

## 💡 Tips

✅ **Start with Hero** - Simplest component
✅ **Test as you go** - Don't wait to test all
✅ **Use staging** - Always test in staging first
✅ **Document changes** - Keep track of what you do
✅ **Get feedback** - Show team before publishing
✅ **Monitor after publish** - Watch for issues

---

## 🎯 Timeline

**Today**: Export Hero + Navbar
**Tomorrow**: Export Pricing + VAShowcase
**Day 3**: Full testing
**Day 4-5**: Validation
**Week 2**: Publish to original

**Total: 1-2 weeks**

---

## 🚀 Ready?

Let's start exporting components to Webflow!

First component: **Hero**

Ready to go? 🎯

