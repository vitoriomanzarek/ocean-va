# Reporte de Diferencias: CSV vs Webflow

**Fecha**: 2025-11-25  
**Total VAs en CSV**: 26  
**Total VAs en Webflow**: 65

---

## 📊 Resumen Ejecutivo

### Estado de los VAs del CSV

| Categoría | Cantidad | Porcentaje |
|-----------|----------|------------|
| **Nuevos** (no existen en Webflow) | 17 | 65.4% |
| **Existentes** (ya están en Webflow) | 9 | 34.6% |
| **Con diferencias** | 9 | 34.6% |

---

## 🆕 VAs NUEVOS (17)

Estos VAs no existen en Webflow y necesitan ser creados:

1. **Ana Gabriela** (ana-gabriela) - Item ID: `k7hsyw8yyv98i11roba82c80`
2. **Angel** (angel) - Item ID: `m65p0u1roco633ibryram7ns`
3. **Branko** (branko) - Item ID: `xxbdyd8thxdtvelvwg4zifad`
4. **Fabiola** (fabiola) - Item ID: `ajgxjf1l50rqv4nj3qj9caj8`
5. **Gael** (gael) - Item ID: `09138wavrosf8mlqgr52c1sj`
6. **Hugo** (hugo) - Item ID: `bpqblfidat21yqta7auny302`
7. **Jomer** (jomer-daniel) - Item ID: `61ncrl5qbdkhxqhrooixlptb`
8. **Jose Luis** (jose-luis) - Item ID: `s8x5d6jferurolpp1oug0nm8`
9. **Marco** (marco) - Item ID: `gensqb2e2u9ycvmz8pawqzfl`
10. **Patricio** (patricio) - Item ID: `1bbrjim6xb54uvyjldg9q52r`
11. **Samantha** (samantha) - Item ID: `3uexwddsea1yq08cpfah8h0c`
12. **Ximena** (ximena) - Item ID: (vacío - nuevo)
13. **Joan Rose** (joan-rose) - Item ID: `uvnf1j8wk848az5kg0xyapnp`
14. **Joy** (joy) - Item ID: `jkgw3za4wo6ljgjwddgnfe9y`
15. **Jane** (jane) - Item ID: `uq8fgzptakz3h8ulh9yrfrg5`
16. **Maridel** (maridel) - Item ID: `sn6nbv6b646qjbwg7np9undg`
17. **Randean** (randean) - Item ID: `t68x9151gfx7e5uyywcbf2ss`

---

## ⚠️ VAs EXISTENTES con DIFERENCIAS (9)

### 1. **Karen** (karen)
- **Item ID**: `691b8a003f849707c9086eb4`
- **Diferencias**:
  - ✅ **Experience**: CSV="4 years" | Webflow="4 years" (igual)
  - ✅ **Languages**: CSV="Bilingual (EN-ES)" | Webflow="Bilingual (EN-ES)" (igual)
  - ✅ **Availability**: CSV="Full Time" | Webflow="Full Time" (igual)
  - ⚠️ **Main Category**: CSV="Executive Virtual Assistant, Insurance Virtual Assistant" | Webflow="Executive Virtual Assistant, Insurance Virtual Assistant" (igual en texto, pero necesita IDs)
  - ⚠️ **Specialization**: CSV="home-insurance" | Webflow=["home-insurance"] (igual, pero necesita ID)
  - ✅ **Video**: CSV="https://youtu.be/TXb9ONnF310" | Webflow="https://youtu.be/TXb9ONnF310" (igual)
  - ✅ **Image**: URLs coinciden
  - ✅ **Profile Slug**: CSV="/karen-ocean-va-profile" | Webflow="/karen-ocean-va-profile" (igual)

### 2. **Joana** (joana)
- **Item ID**: `691b8a0076470b927f67e85d`
- **Diferencias**:
  - ⚠️ **Experience**: CSV="Trained Assistant" | Webflow="null years" (DIFERENTE)
  - ✅ **Languages**: CSV="Bilingual (EN-ES)" | Webflow="Bilingual (EN-ES)" (igual)
  - ✅ **Availability**: CSV="Full Time" | Webflow="Full Time" (igual)
  - ⚠️ **Main Category**: CSV="Executive Virtual Assistant, Insurance Virtual Assistant" | Webflow="Executive Virtual Assistant, Insurance Virtual Assistant" (igual en texto)
  - ⚠️ **Specialization**: CSV="executive-assistant" | Webflow=["executive-assistant"] (igual, pero necesita ID)
  - ✅ **Video**: URLs coinciden
  - ✅ **Image**: URLs coinciden

### 3. **Abigail** (abigail)
- **Item ID**: `691b8a02cd945b1d36071152`
- **Diferencias**:
  - ⚠️ **Main Category**: CSV="Executive Virtual Assistant, Insurance Virtual Assistant" | Webflow="Insurance Virtual Assistant" (DIFERENTE - CSV tiene 2 categorías)
  - ⚠️ **Specialization**: CSV="health-insurance" | Webflow=["health-insurance"] (igual, pero necesita ID)
  - ✅ Resto de campos coinciden

### 4. **Jasmine** (jasmine)
- **Item ID**: `691b8a0bcd945b1d360713e6`
- **Diferencias**:
  - ⚠️ **Experience**: CSV="Trained Assistant" | Webflow="Trained insurance" (DIFERENTE - formato)
  - ⚠️ **Main Category**: CSV="Executive Virtual Assistant, Healthcare Virtual Assistant, Insurance Virtual Assistant" | Webflow="Executive Virtual Assistant, Healthcare Virtual Assistant, Insurance Virtual Assistant" (igual en texto)
  - ⚠️ **Specialization**: CSV="executive-assistant" | Webflow=["executive-assistant"] (igual, pero necesita ID)
  - ✅ Resto de campos coinciden

### 5. **Jill** (jill)
- **Item ID**: `691b8a0be00a0398d8a56cbf`
- **Diferencias**:
  - ⚠️ **Experience**: CSV="Trained Assistant" | Webflow="Trained insurance" (DIFERENTE - formato)
  - ⚠️ **Specialization**: CSV="executive-assistant" | Webflow=["executive-assistant"] (igual, pero necesita ID)
  - ✅ Resto de campos coinciden

### 6. **Ana** (ana)
- **Item ID**: `691b8a0c0569661eecba9e82`
- **Diferencias**:
  - ⚠️ **Experience**: CSV="Trained Assistant" | Webflow="Trained insurance" (DIFERENTE - formato)
  - ⚠️ **Specialization**: CSV="executive-assistant; real-estate" | Webflow=["executive-assistant", "real-estate"] (igual, pero necesita IDs y separar por punto y coma)
  - ✅ Resto de campos coinciden

### 7. **Balbina** (balbina)
- **Item ID**: `691b8a0d89b222b6b472933c`
- **Diferencias**:
  - ⚠️ **Experience**: CSV="Trained Assistant" | Webflow="Trained insurance" (DIFERENTE - formato)
  - ⚠️ **Specialization**: CSV="executive-assistant" | Webflow=["executive-assistant"] (igual, pero necesita ID)
  - ✅ Resto de campos coinciden

### 8. **Brandon L.** (brandon)
- **Item ID**: `691b8a0df83ddf1a08c15961`
- **Diferencias**:
  - ⚠️ **Main Category**: CSV="Executive Virtual Assistant" | Webflow="Insurance Virtual Assistant" (DIFERENTE)
  - ⚠️ **Specialization**: CSV="executive-assistant; real-estate" | Webflow=["health-insurance", "healthcare-insurance"] (DIFERENTE - completamente diferentes)
  - ✅ Resto de campos coinciden

### 9. **Janice** (janice)
- **Item ID**: `691b8a116363a512c63aad54`
- **Diferencias**:
  - ⚠️ **Experience**: CSV="Trained Assistant" | Webflow="Trained insurance" (DIFERENTE - formato)
  - ⚠️ **Specialization**: CSV="executive-assistant" | Webflow=["executive-assistant"] (igual, pero necesita ID)
  - ✅ Resto de campos coinciden

---

## 📝 Observaciones Importantes

### 1. **Formato de Experience**
- CSV usa: "Trained Assistant"
- Webflow tiene: "Trained insurance" o "null years"
- **Recomendación**: Estandarizar a "Trained Assistant" en ambos

### 2. **Main Categories**
- CSV tiene texto plano con múltiples valores separados por comas
- Webflow necesita IDs de la colección "Main Category"
- **Recomendación**: Convertir texto a IDs antes de cargar

### 3. **Specializations**
- CSV tiene texto plano, algunos separados por comas o punto y coma
- Webflow necesita IDs de la colección "VAs Specializations"
- **Recomendación**: Separar, normalizar y convertir a IDs antes de cargar

### 4. **Campos con problemas en el CSV**
- Ana: specialization tiene "executive-assistant; real-estate" (punto y coma)
- Brandon: specialization tiene "executive-assistant; real-estate" pero en Webflow tiene otras
- Joan Rose: specialization tiene "executive-assistant; calendar-management; administrative-support" (punto y coma)

### 5. **Ximena no tiene Item ID**
- Es un VA nuevo que necesita ser creado desde cero

---

## ✅ Próximos Pasos

1. **Revisar y corregir** las diferencias identificadas
2. **Normalizar** el formato de Experience ("Trained Assistant" vs "Trained insurance")
3. **Convertir** Main Categories y Specializations de texto a IDs
4. **Crear** los 17 VAs nuevos
5. **Actualizar** los 9 VAs existentes con las diferencias corregidas

---

**Nota**: Este reporte se generó comparando los datos del CSV con los datos actuales en Webflow. Las diferencias en Main Categories y Specializations requieren conversión de texto a IDs antes de la carga.

