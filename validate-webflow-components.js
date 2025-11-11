#!/usr/bin/env node

/**
 * Validate Webflow Components
 * Checks that all component files exist and are valid HTML
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMPONENTS = [
  {
    file: 'webflow-components/201-va-card-component.html',
    name: 'VA Card Component',
    required: true,
  },
  {
    file: 'webflow-components/202-va-grid-container.html',
    name: 'VA Grid Container',
    required: true,
  },
  {
    file: 'webflow-components/203-va-filters-component.html',
    name: 'VA Filters Component',
    required: true,
  },
  {
    file: 'webflow-components/200-our-current-vas-grid-complete.html',
    name: 'Complete VA Grid',
    required: true,
  },
  {
    file: 'generate-vas-html.py',
    name: 'VA HTML Generator (Python)',
    required: true,
  },
  {
    file: 'webflow-components/COMPONENT-ARCHITECTURE.md',
    name: 'Component Architecture Guide',
    required: true,
  },
  {
    file: 'WEBFLOW-VA-PAGE-UPDATE.md',
    name: 'VA Page Update Guide',
    required: true,
  },
];

function validateFile(filePath, fileName) {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (!fs.existsSync(fullPath)) {
    return {
      status: 'missing',
      message: `❌ ${fileName} - FILE NOT FOUND`,
      path: fullPath,
    };
  }

  const stats = fs.statSync(fullPath);
  const sizeKB = (stats.size / 1024).toFixed(2);

  // Check if HTML file
  if (filePath.endsWith('.html')) {
    const content = fs.readFileSync(fullPath, 'utf-8');
    
    // Basic HTML validation
    if (!content.includes('<') || !content.includes('>')) {
      return {
        status: 'invalid',
        message: `⚠️  ${fileName} - Invalid HTML`,
        size: sizeKB,
      };
    }

    // Check for required HTML elements
    const hasStyle = content.includes('<style>');
    const hasContent = content.length > 100;

    if (!hasStyle || !hasContent) {
      return {
        status: 'warning',
        message: `⚠️  ${fileName} - May be incomplete`,
        size: sizeKB,
      };
    }

    return {
      status: 'valid',
      message: `✅ ${fileName}`,
      size: sizeKB,
    };
  }

  // Check Python files
  if (filePath.endsWith('.py')) {
    const content = fs.readFileSync(fullPath, 'utf-8');
    
    if (!content.includes('def ') && !content.includes('import')) {
      return {
        status: 'warning',
        message: `⚠️  ${fileName} - May be incomplete`,
        size: sizeKB,
      };
    }

    return {
      status: 'valid',
      message: `✅ ${fileName}`,
      size: sizeKB,
    };
  }

  // Check Markdown files
  if (filePath.endsWith('.md')) {
    const content = fs.readFileSync(fullPath, 'utf-8');
    
    if (content.length < 100) {
      return {
        status: 'warning',
        message: `⚠️  ${fileName} - Very short`,
        size: sizeKB,
      };
    }

    return {
      status: 'valid',
      message: `✅ ${fileName}`,
      size: sizeKB,
    };
  }

  return {
    status: 'valid',
    message: `✅ ${fileName}`,
    size: sizeKB,
  };
}

function main() {
  console.log('🔍 Webflow Components Validation');
  console.log('═'.repeat(80));
  console.log();

  let validCount = 0;
  let warningCount = 0;
  let errorCount = 0;

  COMPONENTS.forEach(component => {
    const result = validateFile(component.file, component.name);
    
    console.log(result.message);
    if (result.size) {
      console.log(`   Size: ${result.size} KB`);
    }
    
    if (result.status === 'valid') {
      validCount++;
    } else if (result.status === 'warning') {
      warningCount++;
    } else {
      errorCount++;
    }
  });

  console.log();
  console.log('═'.repeat(80));
  console.log('📊 Summary:');
  console.log(`   ✅ Valid: ${validCount}`);
  console.log(`   ⚠️  Warnings: ${warningCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log();

  if (errorCount === 0) {
    console.log('✅ All components are ready!');
    console.log();
    console.log('📋 Next Steps:');
    console.log('   1. Create page /ovas-current-vas in Webflow');
    console.log('   2. Add HTML Embed element');
    console.log('   3. Copy content from: webflow-components/200-our-current-vas-grid-complete.html');
    console.log('   4. Paste into HTML Embed');
    console.log('   5. Publish');
    console.log();
  } else {
    console.log('❌ Some components are missing or invalid.');
    console.log('Please check the errors above.');
    process.exit(1);
  }
}

main();
