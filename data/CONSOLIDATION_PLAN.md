# Data Consolidation Plan

## 📊 Análisis de Datos Actuales

### 1. ocean_va_all_assistants.tsv (57 líneas)
**Contenido**: Datos de VAs en formato TSV
- Nombre, Idiomas, Años Experiencia, Especialización, Nivel Inglés, Disponibilidad, Horario, Categorías

**Estado**: ⚠️ Verificar si es duplicado de vasData.js

**Acción**: 
- [ ] Comparar con vasData.js
- [ ] Si es duplicado → ELIMINAR
- [ ] Si tiene datos diferentes → CONSOLIDAR

---

### 2. webflow-image-mapping.json (308 líneas)
**Contenido**: Mapeo de nombres de VAs a URLs de imágenes en Webflow
```json
{
  "totalImages": 57,
  "matched": 48,
  "unmatched": 9,
  "unmatchedNames": [...]
}
```

**Estado**: ✅ Active (fuente de verdad para URLs)

**Acción**: MANTENER

---

### 3. webflow-image-mapping.csv (49 líneas)
**Contenido**: Mismo mapeo en formato CSV

**Estado**: ⚠️ DUPLICADO del JSON

**Acción**: 
- [ ] ELIMINAR (mantener solo JSON)
- [ ] Si alguien necesita CSV → generar desde JSON

---

## 🎯 Recomendaciones

### Consolidación Inmediata
```
✅ MANTENER:
├── vasData.js (fuente principal de VAs)
└── webflow-image-mapping.json (mapeo de imágenes)

❌ ELIMINAR:
├── ocean_va_all_assistants.tsv (si es duplicado)
└── webflow-image-mapping.csv (duplicado del JSON)
```

### Próximos Pasos
1. Verificar si TSV es duplicado de vasData.js
2. Si es duplicado → eliminar
3. Eliminar CSV (mantener solo JSON)
4. Actualizar data/README.md
5. Commit

---

## 📝 TODO

- [ ] Comparar ocean_va_all_assistants.tsv con vasData.js
- [ ] Decidir si eliminar TSV
- [ ] Eliminar webflow-image-mapping.csv
- [ ] Generar script para convertir JSON → CSV si es necesario
- [ ] Actualizar documentación

