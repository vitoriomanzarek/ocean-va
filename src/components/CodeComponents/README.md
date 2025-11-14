# Code Components for Webflow

These are React components designed to be exported to Webflow as Code Components.

## Components

### Hero
Hero section component with background image, title, subtitle, and CTA button.

**Props:**
- `title` (string) - Main heading
- `subtitle` (string) - Subheading
- `backgroundImage` (string) - Background image URL
- `ctaText` (string) - Call-to-action button text
- `ctaLink` (string) - Call-to-action button link
- `ctaStyle` (string) - Button style: 'primary' or 'secondary'

**Example:**
```jsx
<Hero 
  title="Welcome to Ocean VA"
  subtitle="Expert Virtual Assistants"
  backgroundImage="https://..."
  ctaText="Book a Call"
  ctaLink="#contact"
  ctaStyle="primary"
/>
```

### Navbar
Navigation bar with logo, links, and CTA button. Includes mobile menu.

**Props:**
- `logo` (string) - Logo image URL
- `logoAlt` (string) - Logo alt text
- `links` (array) - Navigation links with optional submenu
- `ctaText` (string) - CTA button text
- `ctaLink` (string) - CTA button link

**Example:**
```jsx
<Navbar 
  logo="/img/oceanVALogo.png"
  links={[
    { label: 'Home', href: '/', submenu: [] },
    { label: 'Services', href: '/services', submenu: [] }
  ]}
  ctaText="Book a Demo"
  ctaLink="#contact"
/>
```

### Pricing
Pricing section with multiple plans.

**Props:**
- `title` (string) - Section title
- `subtitle` (string) - Section subtitle
- `plans` (array) - Pricing plans

**Plan Object:**
```javascript
{
  name: 'Professional',
  price: '$1,999',
  period: '/month',
  description: 'For growing businesses',
  features: ['Feature 1', 'Feature 2'],
  cta: 'Get Started',
  ctaLink: '#contact',
  highlighted: true
}
```

**Example:**
```jsx
<Pricing 
  title="Simple, Transparent Pricing"
  subtitle="Choose the plan that works best"
  plans={[...]}
/>
```

## Usage

### In React
```jsx
import { Hero, Navbar, Pricing } from './CodeComponents'

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Pricing />
    </>
  )
}
```

### In Webflow
1. Copy component code
2. Paste in Webflow Designer as HTML Embed
3. Adjust props in Webflow
4. Publish

## Styling

All components use:
- **TailwindCSS** for styling
- **Lucide React** for icons
- **Inline styles** for dynamic properties

## Responsive Design

All components are fully responsive:
- Mobile (< 640px)
- Tablet (640px - 1024px)
- Desktop (> 1024px)

## Customization

Props can be customized in Webflow Designer:
1. Select component
2. Edit props in Designer
3. Changes apply immediately
4. Publish when ready

### VAShowcase
Virtual Assistants showcase component with pagination.

**Props:**
- `title` (string) - Section title
- `subtitle` (string) - Section subtitle
- `vas` (array) - Virtual Assistants data
- `itemsPerPage` (number) - Items to show per page

**VA Object:**
```javascript
{
  id: 1,
  name: 'Maria Garcia',
  image: 'https://...',
  specialization: 'Insurance Processing',
  languages: ['English', 'Spanish'],
  experience: '5+ years',
  rating: 4.9,
  reviews: 24,
  available: true
}
```

**Example:**
```jsx
<VAShowcase 
  title="Meet Our Virtual Assistants"
  subtitle="Expert professionals"
  vas={[...]}
  itemsPerPage={3}
/>
```

## Next Steps

1. ✅ Create Hero component
2. ✅ Create Navbar component
3. ✅ Create Pricing component
4. ✅ Create VAShowcase component
5. ⏳ Export to Webflow
6. ⏳ Integrate in Webflow Designer
7. ⏳ Testing
8. ⏳ Publish

## Files

- `Hero.jsx` - Hero component
- `Navbar.jsx` - Navigation component
- `Pricing.jsx` - Pricing component
- `VAShowcase.jsx` - Virtual Assistants showcase component
- `index.js` - Exports all components
- `README.md` - This file

