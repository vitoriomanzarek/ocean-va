# Reporte Detallado de Diferencias: CSV vs Webflow

**Fecha**: 2025-11-25

---

## 📊 Resumen

- **Total VAs en CSV**: 26
- **VAs nuevos** (no existen): 17
- **VAs existentes** (ya están en Webflow): 9

---

## ⚠️ VAs EXISTENTES - Comparación Campo por Campo

### 1. **Karen** (karen)
**Item ID**: `691b8a003f849707c9086eb4`

| Campo | CSV | Webflow | Estado |
|-------|-----|---------|--------|
| Name | Karen | Karen | ✅ Igual |
| Experience | 4 years | 4 years | ✅ Igual |
| Languages | Bilingual (EN-ES) | Bilingual (EN-ES) | ✅ Igual |
| Availability | Full Time | Full Time | ✅ Igual |
| Main Category (texto) | Executive Virtual Assistant, Insurance Virtual Assistant | Executive Virtual Assistant, Insurance Virtual Assistant | ✅ Igual |
| Main Categories (IDs) | insurance-virtual-assistant | ["691f65e0cebf01685534d7d4"] | ⚠️ Necesita ambos IDs |
| Specialization (texto) | home-insurance | ["home-insurance"] | ⚠️ Necesita ID |
| Video | https://youtu.be/TXb9ONnF310 | https://youtu.be/TXb9ONnF310 | ✅ Igual |
| Image URL | https://cdn.../691d00d9df3b2cbf3b543e7d_Karen.webp | https://cdn.../691d00d9df3b2cbf3b543e7d_Karen.webp | ✅ Igual |
| Profile Slug | /karen-ocean-va-profile | /karen-ocean-va-profile | ✅ Igual |

**Acción requerida**: Actualizar Main Categories para incluir ambos IDs (Executive + Insurance)

---

### 2. **Joana** (joana)
**Item ID**: `691b8a0076470b927f67e85d`

| Campo | CSV | Webflow | Estado |
|-------|-----|---------|--------|
| Name | Joana | Joana | ✅ Igual |
| Experience | **Trained Assistant** | **null years** | ❌ DIFERENTE |
| Languages | Bilingual (EN-ES) | Bilingual (EN-ES) | ✅ Igual |
| Availability | Full Time | Full Time | ✅ Igual |
| Main Category | Executive Virtual Assistant, Insurance Virtual Assistant | Executive Virtual Assistant, Insurance Virtual Assistant | ✅ Igual |
| Main Categories (IDs) | executive-virtual-assistant | ["691f65de96518e22b345ed29"] | ⚠️ Necesita ambos IDs |
| Specialization | executive-assistant | ["executive-assistant"] | ⚠️ Necesita ID |
| Video | https://youtu.be/PrZ7xZryyjQ | https://youtu.be/PrZ7xZryyjQ | ✅ Igual |
| Image | URLs coinciden | URLs coinciden | ✅ Igual |

**Acción requerida**: 
- Actualizar Experience de "null years" a "Trained Assistant"
- Actualizar Main Categories para incluir ambos IDs

---

### 3. **Abigail** (abigail)
**Item ID**: `691b8a02cd945b1d36071152`

| Campo | CSV | Webflow | Estado |
|-------|-----|---------|--------|
| Name | Abigail | Abigail | ✅ Igual |
| Experience | 3 years | 3 years | ✅ Igual |
| Languages | English | English | ✅ Igual |
| Availability | Full Time | Full Time | ✅ Igual |
| Main Category | **Executive Virtual Assistant, Insurance Virtual Assistant** | **Insurance Virtual Assistant** | ❌ DIFERENTE |
| Main Categories (IDs) | insurance-virtual-assistant | ["691f65e0cebf01685534d7d4"] | ⚠️ Necesita ambos IDs |
| Specialization | health-insurance | ["health-insurance"] | ⚠️ Necesita ID |
| Video | https://youtu.be/z3hiwu0mPc8 | https://youtu.be/z3hiwu0mPc8 | ✅ Igual |
| Image | URLs coinciden | URLs coinciden | ✅ Igual |

**Acción requerida**: 
- Actualizar Main Categories para incluir Executive Virtual Assistant además de Insurance

---

### 4. **Jasmine** (jasmine)
**Item ID**: `691b8a0bcd945b1d360713e6`

| Campo | CSV | Webflow | Estado |
|-------|-----|---------|--------|
| Name | Jasmine | Jasmine | ✅ Igual |
| Experience | **Trained Assistant** | **Trained insurance** | ❌ DIFERENTE (formato) |
| Languages | English | English | ✅ Igual |
| Availability | Part Time | Part Time | ✅ Igual |
| Main Category | Executive Virtual Assistant, Healthcare Virtual Assistant, Insurance Virtual Assistant | Executive Virtual Assistant, Healthcare Virtual Assistant, Insurance Virtual Assistant | ✅ Igual |
| Specialization | executive-assistant | ["executive-assistant"] | ⚠️ Necesita ID |
| Video | https://youtu.be/WhdFCM1GABs | https://youtu.be/WhdFCM1GABs | ✅ Igual |
| Image | URLs coinciden | URLs coinciden | ✅ Igual |

**Acción requerida**: 
- Actualizar Experience de "Trained insurance" a "Trained Assistant"

---

### 5. **Jill** (jill)
**Item ID**: `691b8a0be00a0398d8a56cbf`

| Campo | CSV | Webflow | Estado |
|-------|-----|---------|--------|
| Name | Jill | Jill | ✅ Igual |
| Experience | **Trained Assistant** | **Trained insurance** | ❌ DIFERENTE (formato) |
| Languages | English | English | ✅ Igual |
| Availability | Part Time | Part Time | ✅ Igual |
| Main Category | Executive Virtual Assistant, Insurance Virtual Assistant | Executive Virtual Assistant, Insurance Virtual Assistant | ✅ Igual |
| Specialization | executive-assistant | ["executive-assistant"] | ⚠️ Necesita ID |
| Video | https://youtu.be/7yREE7oxSu0 | https://youtu.be/7yREE7oxSu0 | ✅ Igual |
| Image | URLs coinciden | URLs coinciden | ✅ Igual |

**Acción requerida**: 
- Actualizar Experience de "Trained insurance" a "Trained Assistant"

---

### 6. **Ana** (ana)
**Item ID**: `691b8a0c0569661eecba9e82`

| Campo | CSV | Webflow | Estado |
|-------|-----|---------|--------|
| Name | Ana | Ana | ✅ Igual |
| Experience | **Trained Assistant** | **Trained insurance** | ❌ DIFERENTE (formato) |
| Languages | English | English | ✅ Igual |
| Availability | Assigned | Assigned | ✅ Igual |
| Main Category | Executive Virtual Assistant, Insurance Virtual Assistant | Executive Virtual Assistant, Insurance Virtual Assistant | ✅ Igual |
| Specialization | **executive-assistant; real-estate** | ["executive-assistant", "real-estate"] | ⚠️ Necesita IDs (2 specializations) |
| Video | https://youtu.be/XloA9MBGtGA | https://youtu.be/XloA9MBGtGA | ✅ Igual |
| Image | URLs coinciden | URLs coinciden | ✅ Igual |

**Acción requerida**: 
- Actualizar Experience de "Trained insurance" a "Trained Assistant"
- Asegurar que ambas specializations estén relacionadas (executive-assistant + real-estate)

---

### 7. **Balbina** (balbina)
**Item ID**: `691b8a0d89b222b6b472933c`

| Campo | CSV | Webflow | Estado |
|-------|-----|---------|--------|
| Name | Balbina | Balbina | ✅ Igual |
| Experience | **Trained Assistant** | **Trained insurance** | ❌ DIFERENTE (formato) |
| Languages | English | English | ✅ Igual |
| Availability | Assigned | Assigned | ✅ Igual |
| Main Category | Executive Virtual Assistant, Insurance Virtual Assistant | Executive Virtual Assistant, Insurance Virtual Assistant | ✅ Igual |
| Specialization | executive-assistant | ["executive-assistant"] | ⚠️ Necesita ID |
| Video | https://youtu.be/sESom3C4Tjk | https://youtu.be/sESom3C4Tjk | ✅ Igual |
| Image | URLs coinciden | URLs coinciden | ✅ Igual |

**Acción requerida**: 
- Actualizar Experience de "Trained insurance" a "Trained Assistant"

---

### 8. **Brandon L.** (brandon)
**Item ID**: `691b8a0df83ddf1a08c15961`

| Campo | CSV | Webflow | Estado |
|-------|-----|---------|--------|
| Name | Brandon L. | Brandon L. | ✅ Igual |
| Experience | 2 years | 2 years | ✅ Igual |
| Languages | English | English | ✅ Igual |
| Availability | Assigned | Assigned | ✅ Igual |
| Main Category | **Executive Virtual Assistant** | **Insurance Virtual Assistant** | ❌ DIFERENTE |
| Main Categories (IDs) | (vacío) | ["691f65e0cebf01685534d7d4"] | ⚠️ Necesita cambiar a Executive |
| Specialization | **executive-assistant; real-estate** | **["health-insurance", "healthcare-insurance"]** | ❌ COMPLETAMENTE DIFERENTE |
| Video | https://youtu.be/PVmxKa19Mz0 | https://youtu.be/PVmxKa19Mz0 | ✅ Igual |
| Image | URLs coinciden | URLs coinciden | ✅ Igual |

**Acción requerida**: 
- ⚠️ **CAMBIOS IMPORTANTES**:
  - Cambiar Main Category de "Insurance Virtual Assistant" a "Executive Virtual Assistant"
  - Reemplazar specializations: de ["health-insurance", "healthcare-insurance"] a ["executive-assistant", "real-estate"]

---

### 9. **Janice** (janice)
**Item ID**: `691b8a116363a512c63aad54`

| Campo | CSV | Webflow | Estado |
|-------|-----|---------|--------|
| Name | Janice | Janice | ✅ Igual |
| Experience | **Trained Assistant** | **Trained insurance** | ❌ DIFERENTE (formato) |
| Languages | English | English | ✅ Igual |
| Availability | Assigned | Assigned | ✅ Igual |
| Main Category | Executive Virtual Assistant, Insurance Virtual Assistant | Executive Virtual Assistant, Insurance Virtual Assistant | ✅ Igual |
| Specialization | executive-assistant | ["executive-assistant"] | ⚠️ Necesita ID |
| Video | https://youtu.be/P8gcQHNJwsk | https://youtu.be/P8gcQHNJwsk | ✅ Igual |
| Image | URLs coinciden | URLs coinciden | ✅ Igual |

**Acción requerida**: 
- Actualizar Experience de "Trained insurance" a "Trained Assistant"

---

## 📋 Resumen de Acciones Requeridas

### Experiencia (Experience)
**VAs a actualizar**: Joana, Jasmine, Jill, Ana, Balbina, Janice
- Cambiar de "Trained insurance" o "null years" a "Trained Assistant"

### Main Categories
**VAs a actualizar**: Karen, Joana, Abigail, Brandon
- Karen: Agregar Executive Virtual Assistant (ya tiene Insurance)
- Joana: Agregar Insurance Virtual Assistant (ya tiene Executive)
- Abigail: Agregar Executive Virtual Assistant (ya tiene Insurance)
- Brandon: **Cambiar completamente** de Insurance a Executive

### Specializations
**VAs a actualizar**: Todos (necesitan convertir texto a IDs)
- Ana: Asegurar executive-assistant + real-estate
- Brandon: **Reemplazar completamente** health-insurance/healthcare-insurance por executive-assistant + real-estate

---

## 🆕 VAs NUEVOS (17)

Estos VAs no existen en Webflow y necesitan ser creados:

1. Ana Gabriela (ana-gabriela)
2. Angel (angel)
3. Branko (branko)
4. Fabiola (fabiola)
5. Gael (gael)
6. Hugo (hugo)
7. Jomer (jomer-daniel)
8. Jose Luis (jose-luis)
9. Marco (marco)
10. Patricio (patricio)
11. Samantha (samantha)
12. Ximena (ximena) - ⚠️ Sin Item ID
13. Joan Rose (joan-rose)
14. Joy (joy)
15. Jane (jane)
16. Maridel (maridel)
17. Randean (randean)

---

## ⚠️ Problemas Detectados en el CSV

1. **Ana**: Specialization tiene formato "executive-assistant; real-estate" (punto y coma)
2. **Brandon**: Specialization tiene formato "executive-assistant; real-estate" (punto y coma)
3. **Joan Rose**: Specialization tiene formato "executive-assistant; calendar-management; administrative-support" (punto y coma)
4. **Ximena**: No tiene Item ID (será nuevo registro)

---

## ✅ Recomendaciones

1. **Estandarizar formato de Experience**: Usar "Trained Assistant" en todos los casos
2. **Corregir Main Categories**: Asegurar que todos tengan los IDs correctos
3. **Normalizar Specializations**: Separar por comas o punto y coma, convertir a IDs
4. **Revisar Brandon**: Tiene diferencias importantes que requieren atención especial
5. **Crear los 17 VAs nuevos** después de corregir los existentes

---

**Próximo paso**: Revisar este reporte y decidir qué cambios aplicar antes de proceder con la carga.

