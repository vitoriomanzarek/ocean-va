# Quiz Resource PDFs

This folder contains the downloadable resources for each quiz profile result.

## Files

- **profile-a-case-study.html** - Case Study: "How Similar Agencies Saved $42K+ Per Year" (Profile A - Hot Lead)
- **profile-b-10-tasks-guide.html** - Guide: "10 Tasks to Delegate to Your First VA" (Profile B - Warm Lead)
- **profile-c-rescue-plan.html** - Rescue Plan: "How to Fix Operational Chaos in 7 Days" (Profile C - Cold but Urgent)
- **profile-d-complete-guide.html** - Complete Guide: "Complete Guide to Virtual Assistant Implementation" (Profile D - Ice Cold)

## Usage

These HTML files are designed to be:
1. **Viewed directly** in a web browser
2. **Printed to PDF** using the browser's print function (Ctrl+P / Cmd+P → Save as PDF)
3. **Converted to PDF** using tools like:
   - Chrome/Edge: Print → Save as PDF
   - Online converters
   - Command-line tools (wkhtmltopdf, puppeteer, etc.)

## Converting to PDF

### Option 1: Browser Print (Easiest)
1. Open the HTML file in your browser
2. Press `Ctrl+P` (Windows) or `Cmd+P` (Mac)
3. Select "Save as PDF" as the destination
4. Click "Save"

### Option 2: Using Node.js/Puppeteer
```bash
npm install puppeteer
node convert-to-pdf.js
```

### Option 3: Using wkhtmltopdf
```bash
wkhtmltopdf profile-a-case-study.html profile-a-case-study.pdf
```

## Styling

All files include print-optimized CSS with:
- Proper page margins (0.75in)
- Letter size (8.5" × 11")
- Print-friendly colors and fonts
- Page breaks where appropriate

## Notes

- The files are currently HTML but can be easily converted to PDF
- All styling is embedded in the HTML files
- Images and external resources should use absolute URLs or relative paths from the quiz root
- The files are designed to be professional, branded documents

