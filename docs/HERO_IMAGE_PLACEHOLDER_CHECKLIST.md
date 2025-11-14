# Hero Section Image Placeholder Checklist

## Overview
All service pages have hero sections with text-only layouts (centered title + description + CTA buttons). These pages need image/visual placeholders added to their hero sections.

---

## ✅ Pages with Existing Media (No Changes Needed)

### 1. **App.jsx** (Home Landing)
- **Status**: ✅ Has image
- **Location**: HeroHome component
- **Media**: `/img/positive-woman.jpg` (professional VA team image)
- **Action**: SKIP - Keep as is

### 2. **InsuranceVirtualAssistant.jsx** (Insurance VA)
- **Status**: ✅ Has video
- **Location**: Hero component
- **Media**: YouTube embed (BSKxhV7nfmg)
- **Action**: SKIP - Keep as is

---

## 📋 Pages Needing Hero Image Placeholders

### Industry Pages (9 pages)

#### 1. **RealEstateVA.jsx**
- **Title**: Real Estate Virtual Assistant
- **Current**: Text-only hero (centered)
- **Suggested Image**: Professional real estate agents/team working with property listings
- **Dimensions**: 1200x800px (or 800x600px minimum)
- **Description**: Real estate professionals collaborating on deals, showing productivity and teamwork in real estate context

#### 2. **MedicalVA.jsx**
- **Title**: Medical Virtual Assistant
- **Current**: Text-only hero (centered)
- **Suggested Image**: Medical office environment or healthcare professionals
- **Dimensions**: 1200x800px (or 800x600px minimum)
- **Description**: Healthcare professionals in a modern medical office, showing patient care coordination and administrative support

#### 3. **SmallBusinessVA.jsx**
- **Title**: Virtual Assistant for Small Business
- **Current**: Text-only hero (centered)
- **Suggested Image**: Small business owner/team in office environment
- **Dimensions**: 1200x800px (or 800x600px minimum)
- **Description**: Diverse small business team working together, showing productivity, collaboration, and growth

#### 4. **MarketingVA.jsx**
- **Title**: Marketing Virtual Assistant
- **Current**: Text-only hero (centered)
- **Suggested Image**: Marketing team working on campaigns/content
- **Dimensions**: 1200x800px (or 800x600px minimum)
- **Description**: Marketing professionals collaborating on campaigns, social media, content creation with modern tools

#### 5. **EcommerceVA.jsx**
- **Title**: Ecommerce Virtual Assistant
- **Current**: Text-only hero (centered)
- **Suggested Image**: Ecommerce/online store operations
- **Dimensions**: 1200x800px (or 800x600px minimum)
- **Description**: Ecommerce operations team managing orders, inventory, and customer service

#### 6. **FinanceVA.jsx**
- **Title**: Finance Virtual Assistant
- **Current**: Text-only hero (centered)
- **Suggested Image**: Finance/accounting professional working
- **Dimensions**: 1200x800px (or 800x600px minimum)
- **Description**: Finance professional managing books, reconciliations, and reporting with modern tools

#### 7. **HRVA.jsx**
- **Title**: HR Virtual Assistant
- **Current**: Text-only hero (centered)
- **Suggested Image**: HR team/recruiting environment
- **Dimensions**: 1200x800px (or 800x600px minimum)
- **Description**: HR professionals managing recruiting, interviews, and onboarding processes

#### 8. **TechVA.jsx**
- **Title**: Tech Virtual Assistant
- **Current**: Text-only hero (centered)
- **Suggested Image**: Tech team/developers working
- **Dimensions**: 1200x800px (or 800x600px minimum)
- **Description**: Technical team collaborating on projects, documentation, and support

#### 9. **PropertyManagementVA.jsx**
- **Title**: Property Management Virtual Assistant
- **Current**: Text-only hero (centered)
- **Suggested Image**: Property management office/team
- **Dimensions**: 1200x800px (or 800x600px minimum)
- **Description**: Property management team handling tenant inquiries, maintenance coordination, and listings

#### 10. **MortgageVA.jsx**
- **Title**: Mortgage Virtual Assistant
- **Current**: Text-only hero (centered)
- **Suggested Image**: Mortgage/lending professionals
- **Dimensions**: 1200x800px (or 800x600px minimum)
- **Description**: Mortgage professionals managing loan files, documentation, and client coordination

---

### Service Pages (6 pages)

#### 11. **VirtualAdminAssistant.jsx**
- **Title**: Hire a Virtual Administrative Assistant
- **Current**: Text-only hero (centered)
- **Suggested Image**: Administrative professional at work
- **Dimensions**: 1200x800px (or 800x600px minimum)
- **Description**: Professional administrative assistant managing inbox, calendar, documents, and operations

#### 12. **VirtualAssistantServices.jsx**
- **Title**: Virtual Assistant Services
- **Current**: Text-only hero (centered)
- **Suggested Image**: Diverse VA team or multi-purpose workspace
- **Dimensions**: 1200x800px (or 800x600px minimum)
- **Description**: Diverse virtual assistant team providing various services (admin, customer service, marketing, sales)

#### 13. **CustomerServiceVA.jsx**
- **Title**: Customer Service Virtual Assistant
- **Current**: Text-only hero (centered)
- **Suggested Image**: Customer service professional/team
- **Dimensions**: 1200x800px (or 800x600px minimum)
- **Description**: Customer service professional handling phone, chat, and email with professionalism and empathy

#### 14. **VirtualReceptionist.jsx**
- **Title**: Virtual Receptionist
- **Current**: Text-only hero (centered)
- **Suggested Image**: Professional receptionist/office environment
- **Dimensions**: 1200x800px (or 800x600px minimum)
- **Description**: Professional receptionist answering calls, booking appointments, and greeting clients

#### 15. **VirtualTransactionCoordinator.jsx**
- **Title**: Virtual Transaction Coordinator (Real Estate)
- **Current**: Text-only hero (centered)
- **Suggested Image**: Real estate transaction coordination
- **Dimensions**: 1200x800px (or 800x600px minimum)
- **Description**: Transaction coordinator managing contracts, documents, vendor coordination in real estate

#### 16. **SDRVA.jsx**
- **Title**: SDR Virtual Assistant
- **Current**: Text-only hero (centered)
- **Suggested Image**: Sales development professional/team
- **Dimensions**: 1200x800px (or 800x600px minimum)
- **Description**: Sales development professional researching leads, managing CRM, and scheduling meetings

---

## Implementation Plan

### Phase 1: Add Placeholders to All Service Pages
- Add `ImageIcon` from lucide-react to each page
- Create placeholder div with:
  - Gradient background (ocean colors)
  - Dashed border
  - Icon + title + description text
  - Responsive sizing

### Phase 2: Create Folder Structure
```
/public/images/
├── industries/
│   ├── real-estate-va-hero.jpg
│   ├── medical-va-hero.jpg
│   ├── small-business-va-hero.jpg
│   ├── ecommerce-va-hero.jpg
│   ├── finance-va-hero.jpg
│   ├── hr-va-hero.jpg
│   ├── tech-va-hero.jpg
│   ├── property-management-va-hero.jpg
│   └── mortgage-va-hero.jpg
└── services/
    ├── admin-assistant-hero.jpg
    ├── va-services-hero.jpg
    ├── customer-service-hero.jpg
    ├── virtual-receptionist-hero.jpg
    ├── transaction-coordinator-hero.jpg
    └── sdr-va-hero.jpg
```

### Phase 3: Replace Placeholders with Real Images
Once images are ready, update each file to use the image path instead of placeholder.

---

## Summary

- **Total Pages**: 16 (excluding Home and Insurance VA which already have media)
- **Industry Pages**: 10
- **Service Pages**: 6
- **Image Format**: JPG recommended (WebP with fallback)
- **Recommended Size**: 1200x800px (minimum 800x600px)
- **Aspect Ratio**: 3:2 or 16:10

---

## Notes

- All pages use the same hero section pattern: centered text with CTA buttons
- Placeholders should be visually consistent with the Ocean brand (turquoise colors)
- Images should convey professionalism, productivity, and industry-specific context
- Consider using diverse, inclusive imagery across all pages
