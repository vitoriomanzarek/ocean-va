# Language Field Migration Strategy

**Fecha**: Enero 2025  
**Problema**: Convertir `languages` (PlainText) → `language` (Option) sin perder datos en producción

---

## 📊 SITUACIÓN ACTUAL

**Campo existente:**
- **Slug**: `languages`
- **Tipo**: PlainText
- **Uso**: Ya en producción en cards
- **Datos**: Contiene valores como "English", "Bilingual Spanish-English", etc.

**Necesidad:**
- Convertir a Option field para filtros
- Opciones: "Bilingual Spanish-English VA", "English-Speaking VA"
- Mantener datos existentes
- No afectar cards en producción

---

## ⚠️ LIMITACIÓN DE WEBFLOW

**Webflow NO permite:**
- Cambiar tipo de campo directamente (PlainText → Option)
- Renombrar campos manteniendo datos sin rehacer referencias

**Opciones disponibles:**
1. Crear nuevo campo y migrar datos
2. Mantener ambos campos temporalmente

---

## ✅ ESTRATEGIA RECOMENDADA: Migración en Fases

### FASE 1: Crear Nuevo Campo (Sin afectar producción)

1. **Crear nuevo campo** en Webflow Designer:
   - Nombre: "Language" (singular)
   - Slug: `language` (nuevo)
   - Tipo: **Option**
   - Opciones:
     - "Bilingual Spanish-English VA"
     - "English-Speaking VA"
   - Estado: Optional (no requerido)

2. **Resultado**: 
   - Campo viejo `languages` (PlainText) sigue funcionando ✅
   - Campo nuevo `language` (Option) existe pero vacío
   - Cards siguen usando `languages` (sin cambios) ✅

---

### FASE 2: Migrar Datos (Script)

**Crear script de migración** que:

1. Lee todos los items de Virtual Assistants
2. Para cada item:
   - Lee valor de `languages` (PlainText)
   - Determina opción correspondiente:
     - Si contiene "Spanish", "Bilingual", "Bilingüe" → "Bilingual Spanish-English VA"
     - Si solo "English" o similar → "English-Speaking VA"
   - Escribe valor en `language` (Option)
3. Guarda cada item actualizado

**Ejemplo de lógica:**
```javascript
function mapLanguageToOption(languagesText) {
  const text = (languagesText || '').toLowerCase();
  
  if (text.includes('spanish') || text.includes('bilingual') || text.includes('bilingüe')) {
    return 'Bilingual Spanish-English VA';
  } else {
    return 'English-Speaking VA';
  }
}
```

---

### FASE 3: Actualizar Templates (Cards)

**En Webflow Designer:**

1. Actualizar template de **cards**:
   - Cambiar referencia de `languages` → `language`
   - Actualizar filtros para usar `language` (Option)
   
2. **Testing**: Verificar que cards funcionen correctamente

3. **Publicar**: Cuando todo funcione correctamente

---

### FASE 4: Actualizar Formulario

1. Actualizar formulario para usar `language` (Option) en lugar de `languages` (PlainText)
2. Cambiar input text → select dropdown

---

### FASE 5: Limpiar (Opcional - Después de verificar todo)

**Una vez que todo funcione correctamente:**

1. Verificar que ningún template use `languages` (PlainText)
2. **Opcional**: Eliminar campo `languages` (PlainText)
   - ⚠️ Solo si estás 100% seguro que no se usa
   - ⚠️ No se puede recuperar después

**Recomendación**: Mantener campo viejo `languages` como respaldo por un tiempo (ej: 1-2 meses), luego eliminarlo.

---

## 📋 CHECKLIST DE MIGRACIÓN

- [ ] **Fase 1**: Crear campo `language` (Option) en Webflow
- [ ] **Fase 2**: Crear script de migración
- [ ] **Fase 2**: Ejecutar script de migración (backup primero)
- [ ] **Fase 2**: Verificar datos migrados correctamente
- [ ] **Fase 3**: Actualizar template de cards en Webflow
- [ ] **Fase 3**: Testing de cards (filtros, visualización)
- [ ] **Fase 3**: Publicar cambios de cards
- [ ] **Fase 4**: Actualizar formulario
- [ ] **Fase 5**: (Opcional) Eliminar campo `languages` (PlainText)

---

## 🔧 SCRIPT DE MIGRACIÓN

**Archivo**: `scripts/migrate-language-field.js`

**Funcionalidad:**
- Lee todos los VAs
- Mapea valores de `languages` (PlainText) → `language` (Option)
- Actualiza campo `language` sin tocar `languages`
- Genera reporte de migración

**Ejecución:**
```bash
node scripts/migrate-language-field.js
```

---

## ⚠️ CONSIDERACIONES IMPORTANTES

1. **Backup**: Hacer backup de datos antes de migrar
2. **Testing**: Probar script en desarrollo/staging primero
3. **Fase por fase**: No saltar fases, verificar cada una
4. **Mantener campo viejo**: No eliminar `languages` hasta estar seguro
5. **Rollback plan**: Tener plan de rollback si algo sale mal

---

## 🎯 VENTAJAS DE ESTA ESTRATEGIA

✅ **Sin downtime**: Cards siguen funcionando durante migración  
✅ **Sin pérdida de datos**: Campo viejo se mantiene hasta el final  
✅ **Reversible**: Puedes revertir cambiando templates de vuelta a `languages`  
✅ **Testing seguro**: Puedes probar todo antes de eliminar campo viejo  
✅ **Control total**: Tú decides cuándo hacer cada fase

---

## 📝 NOTAS ADICIONALES

1. **Mapeo de valores**: Necesitas revisar todos los valores actuales de `languages` para mapear correctamente
2. **Casos especiales**: Puede haber valores que no encajen en las 2 opciones (ej: "French-English"). Decidir cómo manejar estos.
3. **Valores nulos**: Decidir qué hacer con valores vacíos o null
4. **Timing**: Ejecutar migración durante horas de bajo tráfico si es posible

