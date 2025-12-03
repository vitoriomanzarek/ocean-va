# Datos para CMS - Louise A. Siloterio

## Colección: Virtual Assistants (ID: 691b82a97542c69f3f77fa76)

### Campos Requeridos:
- **name** (PlainText, Required): `Louise A. Siloterio`
- **slug** (PlainText, Required): `louise-a-siloterio`

### Campos Opcionales:

#### Información Básica:
- **main-category** (PlainText): `Real Estate & Mortgage Virtual Assistant`
- **experience-years** (PlainText): `2.6 years`
- **languages** (PlainText): `English`
- **availability** (PlainText): `Full Time`

#### Contenido:
- **summary** (RichText):
```
Louise is a skilled Virtual Assistant with strong experience in real estate administration and U.S. mortgage support, specializing in lead qualification, client intake, property eligibility review, CRM management, and documentation coordination for realtors and loan officers. With proven experience in both real estate operations and U.S. mortgage workflows, Louise brings a dual skill set that strengthens any client-facing or back-office team. She is experienced in borrower communication, document collection, income and credit review, LOS navigation, and preparing files for underwriting and closing. Her ability to manage leads, documentation, and borrower files with speed and reliability makes her a high-value asset for busy realtors and loan officers.
```

- **tagline** (PlainText): 
```
With proven experience in both real estate operations and U.S. mortgage workflows, Louise brings a dual skill set that strengthens any client-facing or back-office team. Her ability to manage leads, documentation, and borrower files with speed and reliability makes her a high-value asset for busy realtors and loan officers.
```

- **thumbnail-description** (PlainText):
```
Real Estate Administration, Mortgage Support, Lead Qualification, Client Intake, CRM & LOS Management, Loan Processing & Documentation
```

#### Media:
- **image** (Image): `https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/692e0e83d58acc43ff964189_Louise.webp`
- **video** (Link): `https://youtu.be/n1-Hsi-PVaU`
- **profile-slug-2** (Link): `/louise-a-siloterio-ocean-va-profile`

#### Referencias (MultiReference):
- **specialization** (MultiReference - Collection: VAs Specializations):
  - **Items existentes que puedes usar:**
    - `real-estate` (ID: 691cce489aacc699b8e1bf69) - "Real Estate"
    - `mortgage-processing` (ID: 691cce46b8f41bfcd190f4de) - "Mortgage Processing"
    - `mortgage-operations` (ID: 691cce46c038b93db1201c5a) - "Mortgage Operations"
    - `loan-processing` (ID: 691cce456e735fa608212f56) - "Loan Processing"
    - `loan-underwriting` (ID: 691cce45c038b93db1201c15) - "Loan Underwriting"
    - `with-mortgage-and-lead-gen-experience` (ID: 6926099d188711c2b55f9a28) - "With Mortgage And Lead-Gen Experience"
    - `administrative-support` (ID: 6926099d188711c2b55f9a2c) - "Administrative Support"
    - `calendar-management` (ID: 6926099d188711c2b55f9a2a) - "Calendar Management"
    - `customer-service` (ID: 692609a16a22d7149f56700c) - "Customer Service"
  
  - **Items que necesitas CREAR (si no existen):**
    - `lead-qualification` - "Lead Qualification"
    - `client-intake` - "Client Intake"
    - `crm-management` - "CRM Management"
    - `los-navigation` - "LOS Navigation"

- **main-categories** (MultiReference - Collection: Main Category):
  - **Items existentes:**
    - `mortgage-specialist` (ID: 691f65e2cebf01685534d8c9) - "Mortgage Specialist"
    - `executive-virtual-assistant` (ID: 691f65de96518e22b345ed29) - "Executive Virtual Assistant"
  
  - **Item que necesitas CREAR:**
    - `real-estate-mortgage-virtual-assistant` - "Real Estate & Mortgage Virtual Assistant"
    
  **Nota:** Puedes usar "Mortgage Specialist" como alternativa temporal si no quieres crear una nueva categoría.

#### Assessments:
- **disc-description** (RichText):
```
Steadiness (S) - Dependable and patient, S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.
```

- **english-description** (RichText):
```
Shows clear communication with generally understandable pronunciation and steady pacing. Uses basic vocabulary and grammar effectively, with growing confidence in expressing simple ideas and improving consistency in longer responses. Score: 70/B1 - Intermediate
```

---

## Formato para CSV (si lo usas para importación):

```csv
Name,Slug,Main Category,Experience (Years),Languages,Availability,Summary,Tagline,Thumbnail Description,VA Image,Profile Slug,Specialization,Video,DISC Description,English Description,Main Categories
Louise A. Siloterio,louise-a-siloterio,Real Estate & Mortgage Virtual Assistant,2.6 years,English,Full Time,"Louise is a skilled Virtual Assistant with strong experience in real estate administration and U.S. mortgage support, specializing in lead qualification, client intake, property eligibility review, CRM management, and documentation coordination for realtors and loan officers. With proven experience in both real estate operations and U.S. mortgage workflows, Louise brings a dual skill set that strengthens any client-facing or back-office team. She is experienced in borrower communication, document collection, income and credit review, LOS navigation, and preparing files for underwriting and closing. Her ability to manage leads, documentation, and borrower files with speed and reliability makes her a high-value asset for busy realtors and loan officers.","With proven experience in both real estate operations and U.S. mortgage workflows, Louise brings a dual skill set that strengthens any client-facing or back-office team. Her ability to manage leads, documentation, and borrower files with speed and reliability makes her a high-value asset for busy realtors and loan officers.","Real Estate Administration, Mortgage Support, Lead Qualification, Client Intake, CRM & LOS Management, Loan Processing & Documentation",https://cdn.prod.website-files.com/66e9b3f71eb321a17e92218a/692e0e83d58acc43ff964189_Louise.webp,/louise-a-siloterio-ocean-va-profile,real-estate-administration; mortgage-support; lead-qualification-client-intake; crm-los-management; loan-processing-documentation,https://youtu.be/n1-Hsi-PVaU,"Steadiness (S) - Dependable and patient, S-type VAs provide consistent support, build strong client relationships, and ensure smooth workflows.","Shows clear communication with generally understandable pronunciation and steady pacing. Uses basic vocabulary and grammar effectively, with growing confidence in expressing simple ideas and improving consistency in longer responses. Score: 70/B1 - Intermediate",real-estate-mortgage-virtual-assistant
```

---

## Notas Importantes:

1. **Specialization**: Este campo es MultiReference, así que necesitas tener los items creados en la colección "VAs Specializations" primero. Si no existen, necesitarás crearlos antes de crear el item de Louise.

2. **Main Categories**: Similar a Specialization, necesitas tener el item "real-estate-mortgage-virtual-assistant" en la colección "Main Category".

3. **Image**: La URL de la imagen ya está disponible y lista para usar.

4. **Video**: El link de YouTube está listo para usar.

5. **Profile Slug**: Asegúrate de que la página de perfil `/louise-a-siloterio-ocean-va-profile` exista o se cree después.

