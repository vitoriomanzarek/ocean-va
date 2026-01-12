# VA Form Setup Guide

**Status**: 🚀 Development Phase  
**Last Updated**: January 2025

---

## 📋 Overview

This guide explains how to set up and use the VA form for adding Virtual Assistants to the Webflow CMS.

---

## 🎯 What We've Built

### 1. Helper Scripts (`scripts/va-form-helpers.js`)
Utility functions for:
- Slug generation
- HTML generation for employment history and education
- Data validation
- Formatting for Webflow API

### 2. Form Script (`webflow-custom-code/va-form-script.js`)
Custom JavaScript code for Webflow that:
- Auto-generates slugs from names
- Manages dynamic employment history entries
- Manages dynamic education entries
- Generates HTML for employment/education fields
- Handles form submission

### 3. API Route (`api/webflow/va-submit.js`)
Serverless function (Vercel) that:
- Receives form submissions
- Validates data
- Creates/updates VA items in Webflow CMS
- Handles field mapping

---

## 🔧 Setup Instructions

### Step 1: Update Webflow CMS Fields (Manual - 5-10 min)

**In Webflow Designer → CMS → Virtual Assistants Collection:**

1. **Add field**: `youtube-url`
   - Type: Plain Text
   - Slug: `youtube-url`
   - Display Name: "YouTube URL"

2. **Convert field**: `disc-type` (PlainText → Option)
   - Change to: Option field
   - Options: `D`, `I`, `S`, `C`, `D+I`, `S+I`, `S+C`

3. **Convert field**: `english-score` (PlainText → Option)
   - Change to: Option field
   - Options: `A1`, `A2`, `B1`, `B2`, `C1`, `C2`

### Step 2: Configure Environment Variables

**For API Route (Vercel):**

Add to your `.env` or Vercel environment variables:
```env
WEBFLOW_API_TOKEN=your_api_token_here
WEBFLOW_VA_COLLECTION_ID=691b82a97542c69f3f77fa76
```

### Step 3: Deploy API Route

The API route (`api/webflow/va-submit.js`) should be deployed to Vercel as a serverless function.

**If using Vercel:**
- The route will be available at: `https://your-domain.com/api/webflow/va-submit`
- No additional configuration needed if file is in `api/` directory

### Step 4: Create Form in Webflow

**In Webflow Designer:**

1. Create a new page (e.g., `/admin/add-va`)
2. Add a form element with ID: `va-form`
3. Add form fields matching the structure below

**Form Structure:**

```
Form ID: va-form

Fields:
- name (text input, required)
- slug (text input, optional - auto-generated)
- main-category (text input)
- experience-years (number input)
- languages (text input)
- availability (text input)
- image (file upload)
- video (text input - URL)
- summary (rich text editor)
- tagline (text input, required)
- thumbnail-description (text area)
- skills-tags (text input - comma-separated)
- tools-tags (text input - comma-separated)
- equipment-tags (text input - comma-separated)
- disc-type (dropdown/select)
- disc-description (rich text editor)
- english-score (dropdown/select)
- english-description (rich text editor)
- specialization (multi-select - references)

Employment History Section:
- Container: [data-container="employment-entries"]
- Add Button: [data-action="add-employment"]
- Hidden Input: [name="employment-richtext"] (auto-generated HTML)

Education Section:
- Container: [data-container="education-entries"]
- Add Button: [data-action="add-education"]
- Hidden Input: [name="education-richtext"] (auto-generated HTML)

Submit Button:
- Type: submit
- Text: "Save VA"
```

### Step 5: Add Custom Code to Webflow

**In Webflow Designer → Page Settings → Custom Code → Footer Code:**

1. Copy the contents of `webflow-custom-code/va-form-script.js`
2. Paste into Footer Code
3. **Update the API endpoint URL**:
   ```javascript
   const CONFIG = {
     apiEndpoint: 'https://your-domain.com/api/webflow/va-submit', // UPDATE THIS
     formSelector: '#va-form',
     debug: true
   };
   ```

### Step 6: Add Form Styling (Optional)

Add CSS for the dynamic employment/education entry sections. You can style them in Webflow Designer or add custom CSS.

**Basic CSS structure:**
```css
.employment-entry-item,
.education-entry-item {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.remove-entry {
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
```

---

## 📝 Usage

### Adding a New VA

1. Fill in the form fields
2. Click "Add Employment" to add employment history entries
3. Click "Add Education" to add education entries
4. Click "Save VA"

The form will:
- Auto-generate slug from name
- Convert employment entries to HTML
- Convert education entries to HTML
- Submit to API
- Create/update VA in Webflow CMS

### Field Mapping

| Form Field | CMS Field Slug | Type |
|------------|----------------|------|
| name | name | PlainText |
| slug | slug | PlainText |
| main-category | main-category | PlainText |
| experience-years | experience-years | PlainText |
| languages | languages | PlainText |
| availability | availability | PlainText |
| video | video | Link |
| summary | summary | RichText |
| tagline | tagline | PlainText |
| thumbnail-description | thumbnail-description | PlainText |
| skills-tags | skills-tags | PlainText |
| tools-tags | tools-tags | PlainText |
| equipment-tags | equipment-tags | PlainText |
| employment-richtext | employment-richtext | RichText (HTML) |
| education-richtext | education-richtext | RichText (HTML) |
| disc-type | disc-type | Option |
| disc-description | disc-description | RichText |
| english-score | english-score | Option |
| english-description | english-description | RichText |
| specialization | specialization | Multi-Reference |

---

## 🐛 Troubleshooting

### Form not submitting

1. **Check API endpoint URL**: Make sure it's correct in the custom code
2. **Check browser console**: Look for JavaScript errors
3. **Check network tab**: Verify API request is being made
4. **Check API logs**: Review Vercel function logs

### API errors

1. **401 Unauthorized**: Check `WEBFLOW_API_TOKEN` is set correctly
2. **404 Not Found**: Check `WEBFLOW_VA_COLLECTION_ID` is correct
3. **400 Bad Request**: Check field mapping matches CMS structure

### Employment/Education HTML not generating

1. Check data attributes are correct: `[data-container="employment-entries"]`
2. Check hidden input exists: `[name="employment-richtext"]`
3. Check browser console for JavaScript errors

---

## ✅ Next Steps

1. Test form with sample data
2. Verify VA is created in Webflow CMS
3. Test employment/education HTML rendering
4. Adjust styling as needed
5. Add validation rules as needed

---

## 📚 Related Files

- `scripts/va-form-helpers.js` - Helper functions
- `webflow-custom-code/va-form-script.js` - Form JavaScript
- `api/webflow/va-submit.js` - API route
- `docs/VA-FORM-WEBFLOW-IMPLEMENTATION-PLAN.md` - Full implementation plan
- `docs/WEBFLOW-CMS-FIELD-ANALYSIS.md` - CMS field analysis

---

**Status**: Ready for testing! ✅

