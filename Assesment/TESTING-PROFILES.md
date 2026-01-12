# Guía de Testing - Rutas para cada Perfil del Quiz

Esta guía contiene las respuestas específicas para obtener cada uno de los 4 perfiles y probar los PDFs descargables.

---

## 🔥 PROFILE A: HOT LEAD
**Condición:** `(operationalScore >= 6 && intentScore >= 10)`

### Información de Contacto:
- **Name:** Test Profile A
- **Email:** test-profile-a@example.com
- **Phone:** (555) 111-1111
- **Industry:** Insurance Agency

### Preguntas Q5-Q14 (Best Practices - Necesitas operationalScore >= 6):
- **Q5** (Documentación): `Yes` ✅
- **Q6** (Delegación): `Yes` ✅
- **Q7** (Enfoque en alto valor): `Yes` ✅
- **Q8** (Medición de tiempo): `Yes` ✅
- **Q9** (Cálculo de costos): `Yes` ✅
- **Q10** (Plan de leads): `Yes` ✅
- **Q11** (Herramientas colaborativas): `Yes` ✅
- **Q12** (COIs/Endorsements): `Yes` ✅
- **Q13** (Tareas delegables >10hrs): `No` ✅ (reverse score - NO te da puntos negativos)
- **Q14** (Turnover): `No` ✅ (reverse score - NO te da puntos negativos)

**Operational Score:** 8.0 puntos

### Preguntas Q15-Q19 (Big 5 - Necesitas intentScore >= 10):
- **Q15** (Meta principal): `focus-sales` (3 puntos) o `save-money` (3 puntos)
- **Q16** (Obstáculo principal): `cost` (3 puntos)
- **Q17** (Horas a delegar): `40-plus` (4 puntos)
- **Q18** (Solución buscada): `full-time-va` (5 puntos) ⭐
- **Q19** (Comentarios): `Need urgent help, budget available $2k/month, ready to start ASAP`

**Intent Score:** 15 puntos (máximo)

### Resultado Esperado:
- **Operational Score:** 8.0
- **Intent Score:** 15
- **Urgency Score:** 2 (por "urgent" en Q19)
- **Profile:** A (HOT LEAD)
- **PDF:** `profile-a-case-study.html`

---

## 🟡 PROFILE B: WARM LEAD
**Condición:** `(operationalScore >= 4 && intentScore >= 5 && intentScore < 10)`

### Información de Contacto:
- **Name:** Test Profile B
- **Email:** test-profile-b@example.com
- **Phone:** (555) 222-2222
- **Industry:** Real Estate

### Preguntas Q5-Q14 (Best Practices - Necesitas operationalScore >= 4):
- **Q5** (Documentación): `Sometimes` (0.5 puntos)
- **Q6** (Delegación): `Yes` (1 punto)
- **Q7** (Enfoque en alto valor): `Yes` (1 punto)
- **Q8** (Medición de tiempo): `Sometimes` (0.5 puntos)
- **Q9** (Cálculo de costos): `Yes` (1 punto)
- **Q10** (Plan de leads): `Yes` (1 punto)
- **Q11** (Herramientas colaborativas): `Sometimes` (0.5 puntos)
- **Q12** (COIs/Endorsements): `N/A - Not Insurance`
- **Q13** (Tareas delegables >10hrs): `No` ✅ (reverse score)
- **Q14** (Turnover): `No` ✅ (reverse score)

**Operational Score:** 5.5 puntos

### Preguntas Q15-Q19 (Big 5 - Necesitas intentScore entre 5-9):
- **Q15** (Meta principal): `increase-capacity` (2 puntos)
- **Q16** (Obstáculo principal): `fear-quality` (2 puntos)
- **Q17** (Horas a delegar): `20-40` (3 puntos)
- **Q18** (Solución buscada): `process-consulting` (2 puntos)
- **Q19** (Comentarios): `Looking for guidance on what tasks to delegate first`

**Intent Score:** 9 puntos

### Resultado Esperado:
- **Operational Score:** 5.5
- **Intent Score:** 9
- **Urgency Score:** 0
- **Profile:** B (WARM LEAD)
- **PDF:** `profile-b-10-tasks-guide.html`

---

## 🔴 PROFILE C: COLD BUT URGENT
**Condición:** `(operationalScore < 4 && urgencyScore >= 5)`

### Información de Contacto:
- **Name:** Test Profile C
- **Email:** test-profile-c@example.com
- **Phone:** (555) 333-3333
- **Industry:** Insurance Agency

### Preguntas Q5-Q14 (Best Practices - Necesitas operationalScore < 4):
- **Q5** (Documentación): `No` (0 puntos)
- **Q6** (Delegación): `No` (0 puntos)
- **Q7** (Enfoque en alto valor): `No` (0 puntos)
- **Q8** (Medición de tiempo): `No` (0 puntos)
- **Q9** (Cálculo de costos): `Sometimes` (0.5 puntos)
- **Q10** (Plan de leads): `Sometimes` (0.5 puntos)
- **Q11** (Herramientas colaborativas): `No` (0 puntos)
- **Q12** (COIs/Endorsements): `Sometimes` (0.5 puntos)
- **Q13** (Tareas delegables >10hrs): `Yes` ⚠️ (+5 urgency, pero -1 operational)
- **Q14** (Turnover): `Yes` ⚠️ (+3 urgency, pero -1 operational)

**Operational Score:** -1.0 → ajustado a 0 (clamp)

### Preguntas Q15-Q19 (Big 5):
- **Q15** (Meta principal): `other` (0 puntos)
- **Q16** (Obstáculo principal): `dont-know` (1 punto)
- **Q17** (Horas a delegar): `10-20` (2 puntos)
- **Q18** (Solución buscada): `just-guidance` (0 puntos)
- **Q19** (Comentarios): `Drowning in work, urgent help needed ASAP, losing leads daily`

**Intent Score:** 3 puntos (pero el urgency score es alto)

### Resultado Esperado:
- **Operational Score:** 0
- **Intent Score:** 3
- **Urgency Score:** 10 (5 de Q13 + 3 de Q14 + 2 de "urgent" en Q19, clamp a 8)
- **Profile:** C (COLD BUT URGENT)
- **PDF:** `profile-c-rescue-plan.html`

---

## ❄️ PROFILE D: ICE COLD (Default)
**Condición:** Todo lo que no califica para A, B o C

### Información de Contacto:
- **Name:** Test Profile D
- **Email:** test-profile-d@example.com
- **Phone:** (555) 444-4444
- **Industry:** Other

### Preguntas Q5-Q14 (Best Practices - Necesitas operationalScore bajo):
- **Q5** (Documentación): `No` (0 puntos)
- **Q6** (Delegación): `No` (0 puntos)
- **Q7** (Enfoque en alto valor): `No` (0 puntos)
- **Q8** (Medición de tiempo): `No` (0 puntos)
- **Q9** (Cálculo de costos): `No` (0 puntos)
- **Q10** (Plan de leads): `Sometimes` (0.5 puntos)
- **Q11** (Herramientas colaborativas): `No` (0 puntos)
- **Q12** (COIs/Endorsements): `N/A - Not Insurance`
- **Q13** (Tareas delegables >10hrs): `No` ✅
- **Q14** (Turnover): `No` ✅

**Operational Score:** 0.5 puntos

### Preguntas Q15-Q19 (Big 5 - Necesitas intentScore bajo):
- **Q15** (Meta principal): `other` (0 puntos)
- **Q16** (Obstáculo principal): `dont-know` (1 punto)
- **Q17** (Horas a delegar): `10-20` (2 puntos)
- **Q18** (Solución buscada): `just-guidance` (0 puntos)
- **Q19** (Comentarios): `Just looking, not sure yet, just exploring options`

**Intent Score:** 3 puntos (pero con -1 por "just looking" = 2 puntos)

### Resultado Esperado:
- **Operational Score:** 0.5
- **Intent Score:** 2
- **Urgency Score:** 0
- **Profile:** D (ICE COLD)
- **PDF:** `profile-d-complete-guide.html`

---

## 📋 Resumen Rápido

| Perfil | Operational Score | Intent Score | Urgency Score | PDF |
|--------|------------------|--------------|---------------|-----|
| **A - HOT LEAD** | >= 6 | >= 10 | Cualquiera | `profile-a-case-study.html` |
| **B - WARM LEAD** | >= 4 | 5-9 | Cualquiera | `profile-b-10-tasks-guide.html` |
| **C - COLD BUT URGENT** | < 4 | Cualquiera | >= 5 | `profile-c-rescue-plan.html` |
| **D - ICE COLD** | < 4 | < 5 | < 5 | `profile-d-complete-guide.html` |

---

## 🎯 Tips para Testing

1. **Usa diferentes emails** para cada perfil (test-profile-a@example.com, test-profile-b@example.com, etc.)
2. **Verifica los scores** después de completar cada quiz para confirmar que obtuviste el perfil correcto
3. **Descarga el PDF** de cada perfil para verificar que se generan correctamente
4. **Revisa en Supabase** que los registros se guardaron con los datos correctos

---

## 🔍 Verificación en el Código

Los perfiles se determinan en `Assesment/quiz/utils/scoring.js` en la función `determineLeadProfile()`:

```javascript
// PROFILE A: (operationalScore >= 6 && intentScore >= 10) OR
//           (operationalScore >= 4 && intentScore >= 10 && urgencyScore >= 5)

// PROFILE B: (operationalScore >= 4 && intentScore >= 5 && intentScore < 10) OR
//           (operationalScore >= 6 && intentScore >= 5)

// PROFILE C: (operationalScore < 4 && urgencyScore >= 5) OR
//           (operationalScore < 4 && intentScore >= 8)

// PROFILE D: Default (todo lo demás)
```

