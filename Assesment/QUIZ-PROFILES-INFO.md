# 📊 Perfiles del Quiz y Asignación de PDFs

## Sistema de Scoring

El quiz calcula **3 scores principales**:

1. **Operational Score** (0-10): Mide la madurez operacional
2. **Intent Score** (0-15): Mide la intención de compra
3. **Urgency Score** (0-8): Mide la urgencia

## Perfiles y Criterios

### 🟢 PROFILE A: HOT LEAD

**Criterios:**
- `operationalScore >= 6` Y `intentScore >= 10`
- O `operationalScore >= 4` Y `intentScore >= 10` Y `urgencyScore >= 5`

**Características:**
- Prioridad: 1 (Más alta)
- Acción: `immediate-sales-call`
- Nombre: "HOT LEAD"

**PDF Asignado:**
- **Ocean-VA-Case-Study.pdf**
- Archivo HTML: `/Assesment/quiz/pdfs/profile-a-case-study.html`

**CTA Principal:**
- "SCHEDULE MY CALL NOW"
- Link: Contact Us page

---

### 🟡 PROFILE B: WARM LEAD

**Criterios:**
- `operationalScore >= 4` Y `intentScore >= 5` Y `intentScore < 10`
- O `operationalScore >= 6` Y `intentScore >= 5`

**Características:**
- Prioridad: 2
- Acción: `nurture-sequence`
- Nombre: "WARM LEAD"

**PDF Asignado:**
- **Ocean-VA-10-Tasks-Guide.pdf**
- Archivo HTML: `/Assesment/quiz/pdfs/profile-b-10-tasks-guide.html`

**CTA Principal:**
- "DOWNLOAD GUIDE NOW"
- Botón con `handleResourceDownload('B')`

---

### 🟠 PROFILE C: COLD BUT URGENT

**Criterios:**
- `operationalScore < 4` Y `urgencyScore >= 5`
- O `operationalScore < 4` Y `intentScore >= 8`

**Características:**
- Prioridad: 3
- Acción: `urgency-video`
- Nombre: "COLD BUT URGENT"

**PDF Asignado:**
- **Ocean-VA-Rescue-Plan.pdf**
- Archivo HTML: `/Assesment/quiz/pdfs/profile-c-rescue-plan.html`

**CTA Principal:**
- "WATCH VIDEO NOW"
- Link: Video embed

---

### 🔵 PROFILE D: ICE COLD (Default)

**Criterios:**
- Cualquier resultado que no cumpla con A, B o C

**Características:**
- Prioridad: 4 (Más baja)
- Acción: `passive-nurture`
- Nombre: "ICE COLD"

**PDF Asignado:**
- **Ocean-VA-Complete-Guide.pdf**
- Archivo HTML: `/Assesment/quiz/pdfs/profile-d-complete-guide.html`

**CTA Principal:**
- "EXPLORE RESOURCES"
- Link: Resources section

---

## Mapeo de PDFs

| Perfil | PDF | Archivo HTML |
|--------|-----|--------------|
| A | Ocean-VA-Case-Study.pdf | profile-a-case-study.html |
| B | Ocean-VA-10-Tasks-Guide.pdf | profile-b-10-tasks-guide.html |
| C | Ocean-VA-Rescue-Plan.pdf | profile-c-rescue-plan.html |
| D | Ocean-VA-Complete-Guide.pdf | profile-d-complete-guide.html |

## Nota sobre Porcentajes

El **porcentaje mostrado** (0-100%) es un cálculo basado en:
- Operational Score (40% del peso)
- Intent Score (40% del peso)
- Urgency Score (20% del peso)

**Fórmula:**
```
overallScore = (operationalPercent * 0.4) + (intentPercent * 0.4) + (urgencyPercent * 0.2)
```

**IMPORTANTE:** El perfil NO se determina por el porcentaje general, sino por los **scores individuales** según los criterios arriba.

Por ejemplo:
- 71% podría ser Profile B si tiene `operationalScore >= 6` y `intentScore >= 5`
- 40% podría ser Profile B si tiene `operationalScore >= 4` y `intentScore >= 5` y `intentScore < 10`

Por eso ambos pueden recibir el mismo PDF si ambos caen en Profile B.

