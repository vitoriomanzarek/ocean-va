# Media Integration Guide - Ocean VA

## Overview
This document explains how to add images and multimedia content to the Ocean VA website.

## Current Structure

### MediaGallery Component
**Location**: `src/components/MediaGallery.jsx`
**Integrated in**: `src/Home.jsx` (after ClientLogos)

The component has two sections:

#### 1. Responsive 4-Image Grid
- **Insurance VA in Action** - VA working on insurance tasks
- **Team Collaboration** - Team collaboration image
- **Client Success Stories** - Success cases
- **Technology & Tools** - Tools and platforms

Each item includes:
- Placeholder with icon (ImageIcon from Lucide)
- Title
- Description
- Category (badge)

#### 2. Featured Section
- Large image with description
- List of proven results
- 2-column responsive layout

## How to Add Images

### Step 1: Prepare Images
1. Place your images in `/public/images/`
2. Recommended formats: `.jpg`, `.png`, `.webp`
3. Recommended sizes:
   - Grid items: 800x600px (aspect-video 16:9)
   - Featured: 1200x800px

### Step 2: Update MediaGallery.jsx

#### For the 4 grid images:
Find the `mediaItems` array and replace the items:

```jsx
const mediaItems = [
  {
    id: 1,
    title: 'Insurance VA in Action',
    description: 'Our Virtual Assistants handling complex administrative tasks...',
    image: '/images/va-working.jpg',  // ← ADD THIS LINE
    placeholder: 'Image of VA working on insurance tasks',
    category: 'Operations'
  },
  // ... more items
]
```

Then update the placeholder JSX to display the image:

```jsx
{/* Image Placeholder */}
<div className="aspect-video bg-gradient-to-br from-ocean-100 to-ocean-50 flex items-center justify-center border-2 border-dashed border-ocean-300">
  {item.image ? (
    <img 
      src={item.image} 
      alt={item.title}
      className="w-full h-full object-cover rounded-lg"
    />
  ) : (
    <div className="text-center">
      <ImageIcon className="w-12 h-12 text-ocean-400 mx-auto mb-2" />
      <p className="text-sm text-ocean-600 font-medium px-2">
        {item.placeholder}
      </p>
    </div>
  )}
</div>
```

#### For the featured image:
Find the "Featured Section" and replace:

```jsx
{/* Image Placeholder */}
<div className="aspect-video bg-gradient-to-br from-ocean-200 to-ocean-100 rounded-lg flex items-center justify-center border-2 border-dashed border-ocean-400">
  {featuredImage ? (
    <img 
      src={featuredImage} 
      alt="Agency Transformation"
      className="w-full h-full object-cover rounded-lg"
    />
  ) : (
    <div className="text-center">
      <ImageIcon className="w-16 h-16 text-ocean-500 mx-auto mb-3" />
      <p className="text-lg text-ocean-700 font-medium">
        Featured Image: Agency Transformation
      </p>
    </div>
  )}
</div>
```

### Step 3: Add Lazy Loading (Optional)
To optimize performance, you can add lazy loading:

```jsx
<img 
  src={item.image} 
  alt={item.title}
  loading="lazy"
  className="w-full h-full object-cover rounded-lg"
/>
```

## Recommended Folder Structure

```
/public/images/
├── va-working.jpg              (Insurance VA in Action)
├── team-collaboration.jpg      (Team Collaboration)
├── success-stories.jpg         (Client Success Stories)
├── technology-tools.jpg        (Technology & Tools)
└── featured-transformation.jpg (Featured Section)
```

## Optimized Image Properties

### Tailwind Classes Used
- `w-full h-full` - Full width and height
- `object-cover` - Maintains aspect ratio without distortion
- `rounded-lg` - Rounded corners
- `aspect-video` - 16:9 ratio

### Responsive Behavior
The component is fully responsive:
- Mobile: 1 column
- Tablet (md): 2 columns
- Desktop (lg): 4 columns (grid items) or 2 columns (featured)

## Important Notes

1. **Placeholders**: While you don't have images, placeholders with icons will display automatically
2. **Paths**: All images must be in `/public/images/` to be accessible
3. **Formats**: Use WebP for better compression, with JPG fallback
4. **Alt Text**: Always include descriptive alt text for accessibility
5. **Size**: Optimize images before uploading (max 500KB per image)

## Suggested Future Improvements

- [ ] Add gallery with modal/lightbox
- [ ] Implement image optimization with Next.js Image component (if migrating to Next)
- [ ] Add embedded videos in specific sections
- [ ] Create testimonial carousel with photos
- [ ] Add fade-in animations on scroll

## Getting Started
When you have images ready, simply:
1. Place them in `/public/images/`
2. Update the paths in `MediaGallery.jsx`
3. Commit and push to the `feature/media-content` branch
