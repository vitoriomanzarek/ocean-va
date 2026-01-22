# Plan de Migración: Páginas Estáticas a Páginas Dinámicas (Collection Templates)

## 📋 Situación Actual

### Páginas Estáticas (Actuales)
- **Ubicación**: Páginas creadas manualmente en Webflow
- **Formato URL**: `/nombre-ocean-va-profile` (ej: `/adrian-ocean-va-profile`, `/karl-loyd-ocean-va-profile`)
- **Cantidad**: ~94 VAs con páginas estáticas
- **Estructura**: Cada página es un componente HTML individual
- **Mantenimiento**: Manual, cada cambio requiere editar la página individual

### Páginas Dinámicas (Nuevas - Collection Templates)
- **Ubicación**: Collection Template en Webflow conectado al CMS
- **Formato URL**: Depende de la configuración del Collection Template
  - Opción 1: `/{{slug}}` → `/adrian` (conflicto con páginas estáticas)
  - Opción 2: `/{{slug}}-ocean-va-profile` → `/adrian-ocean-va-profile` (mismo formato)
- **Cantidad**: Aumentando con nuevos VAs
- **Estructura**: Un template reutilizable con variables dinámicas
- **Mantenimiento**: Automático, cambios al template afectan a todos

---

## ⚠️ Problema Identificado

### Conflicto de URLs
Si las páginas dinámicas usan el mismo formato de URL que las estáticas (`/nombre-ocean-va-profile`), habrá conflicto:

```
Página Estática:  /adrian-ocean-va-profile  ← Existe
Página Dinámica:  /adrian-ocean-va-profile  ← Conflicto!
```

**Resultado**: Webflow no puede tener dos páginas con la misma URL. Una sobrescribirá a la otra.

### Campo `profile-slug-2` en CMS
- **Propósito**: Campo Link en Webflow CMS que almacena la URL del perfil
- **Formato actual en scripts**: `https://www.oceanvirtualassistant.com/${profileSlug}` (URL completa)
- **Formato esperado**: Depende del Collection Template en Webflow

---

## 🎯 Objetivos del Plan

1. ✅ Mantener las URLs existentes (SEO, links externos)
2. ✅ Migrar de páginas estáticas a dinámicas sin interrupciones
3. ✅ Evitar conflictos de URLs durante la migración
4. ✅ Automatizar el mantenimiento futuro

---

## 📐 Estrategia de Migración

### Opción A: Migración Gradual por Lotes (Recomendada)

#### Fase 1: Configuración del Collection Template
1. **Configurar Collection Template en Webflow**
   - Establecer URL format: `/{{slug}}-ocean-va-profile`
   - Esto asegura que las URLs dinámicas coincidan con las estáticas
   - Verificar que el campo `slug` en CMS contenga el valor correcto (ej: `adrian` genera `/adrian-ocean-va-profile`)

2. **Ajustar campo `slug` en CMS**
   - El campo `slug` debe contener SOLO el nombre sin el sufijo `-ocean-va-profile`
   - Ejemplo: `slug: "adrian"` genera `/adrian-ocean-va-profile`
   - Verificar que todos los VAs en CMS tengan este formato

3. **Verificar campo `profile-slug-2`**
   - Este campo debe contener la URL completa: `https://www.oceanvirtualassistant.com/adrian-ocean-va-profile`
   - Se usa principalmente para links en cards y referencias externas

#### Fase 2: Migración por Lotes
1. **Grupo 1 (Prueba - 5-10 VAs)**
   - Seleccionar 5-10 VAs para migración inicial
   - Eliminar páginas estáticas de estos VAs
   - Verificar que las páginas dinámicas funcionen correctamente
   - Verificar que las URLs coincidan exactamente

2. **Grupo 2-10 (Migración gradual)**
   - Migrar en lotes de 10-15 VAs a la vez
   - Verificar después de cada lote
   - Mantener un registro de VAs migrados

3. **Verificación Post-Migración**
   - Verificar que todas las URLs funcionen
   - Verificar SEO (301 redirects si es necesario)
   - Actualizar links internos si es necesario

### Opción B: Migración Completa (Más Riesgosa)

1. **Preparación**
   - Configurar Collection Template
   - Verificar que todos los VAs en CMS tengan datos correctos
   - Hacer backup de todas las páginas estáticas

2. **Migración Masiva**
   - Eliminar todas las páginas estáticas
   - Verificar que las páginas dinámicas funcionen
   - Monitorear por errores

3. **Riesgos**
   - Posible interrupción si algo falla
   - Más difícil de hacer rollback

---

## 🔧 Pasos Técnicos Detallados

### Paso 1: Verificar Formato de URLs en Webflow

En Webflow:
1. Ir a **CMS** > **Virtual Assistants** Collection
2. Ir a **Settings** > **Collection Settings**
3. Verificar **Collection Page Settings**:
   - **URL Structure**: Debe ser `/{{slug}}-ocean-va-profile`
   - Esto genera URLs como `/adrian-ocean-va-profile`

### Paso 2: Verificar Campos en CMS

Para cada VA en el CMS:
1. **Campo `slug`**: Debe ser solo el nombre (ej: `adrian`, `karl-loyd`)
2. **Campo `profile-slug-2`**: Debe ser URL completa (ej: `https://www.oceanvirtualassistant.com/adrian-ocean-va-profile`)

### Paso 3: Actualizar Formulario para Generar `profile-slug-2`

El formulario actualmente **NO** genera `profile-slug-2`. Necesitamos agregarlo:

```javascript
// En VACreation.jsx, en handleSubmit:
const profileSlug = `${formData.slug || generateSlug(formData.name)}-ocean-va-profile`;
const profileUrl = `https://www.oceanvirtualassistant.com/${profileSlug}`;

const submitData = {
  // ... otros campos
  'profile-slug-2': profileUrl,  // ← Agregar esto
  slug: formData.slug || generateSlug(formData.name)  // ← Ya existe
}
```

### Paso 4: Migración de Páginas

Para cada VA a migrar:
1. Verificar que existe en CMS con datos correctos
2. Verificar que el Collection Template esté configurado
3. **Eliminar** la página estática en Webflow
4. La página dinámica debería aparecer automáticamente con la misma URL

### Paso 5: Verificación

Para cada VA migrado:
1. Verificar que la URL funciona: `https://www.oceanvirtualassistant.com/nombre-ocean-va-profile`
2. Verificar que el contenido se muestra correctamente
3. Verificar que los links internos funcionen
4. Verificar que el schema markup esté en la página dinámica

---

## 📊 Checklist de Migración

### Pre-Migración
- [ ] Collection Template configurado con URL format: `/{{slug}}-ocean-va-profile`
- [ ] Todos los VAs en CMS tienen campo `slug` correcto (sin sufijo)
- [ ] Campo `profile-slug-2` contiene URLs completas
- [ ] Formulario actualizado para generar `profile-slug-2`
- [ ] Backup de todas las páginas estáticas creado

### Durante Migración
- [ ] Grupo de prueba migrado (5-10 VAs)
- [ ] URLs verificadas y funcionando
- [ ] Contenido verificando en páginas dinámicas
- [ ] Migración gradual continuada

### Post-Migración
- [ ] Todas las URLs funcionan correctamente
- [ ] Schema markups actualizados en páginas dinámicas
- [ ] Links internos verificados
- [ ] SEO verificado (no hay 404s)
- [ ] Páginas estáticas eliminadas completamente

---

## 🔍 Solución al Problema Actual

### Problema: `profile-slug-2` no llega en el formato correcto

**Causa**: El formulario no está generando `profile-slug-2`.

**Solución**: Actualizar el formulario para generar `profile-slug-2` automáticamente:

```javascript
// En src/pages/VACreation.jsx, línea ~348:
const submitData = {
  name: formData.name,
  slug: formData.slug || generateSlug(formData.name),
  'profile-slug-2': `https://www.oceanvirtualassistant.com/${formData.slug || generateSlug(formData.name)}-ocean-va-profile`,  // ← AGREGAR
  // ... resto de campos
}
```

---

## 🚨 Consideraciones Importantes

### 1. URLs Coinciden Exactamente
Las URLs de las páginas dinámicas **DEBEN** coincidir exactamente con las estáticas para evitar conflictos:
- ✅ `/adrian-ocean-va-profile` (correcto)
- ❌ `/adrian` (conflicto)
- ❌ `/va-profiles/adrian` (conflicto)

### 2. Webflow Collection Template URL Format
El Collection Template debe estar configurado así:
- **URL Structure**: `/{{slug}}-ocean-va-profile`
- **Donde**: `{{slug}}` es el campo `slug` del CMS item

### 3. Campo `slug` en CMS
El campo `slug` debe contener SOLO el nombre del VA:
- ✅ `slug: "adrian"` → genera `/adrian-ocean-va-profile`
- ❌ `slug: "adrian-ocean-va-profile"` → generaría `/adrian-ocean-va-profile-ocean-va-profile` (duplicado)

### 4. Campo `profile-slug-2` en CMS
Este campo es principalmente para referencias y links:
- Debe contener la URL completa: `https://www.oceanvirtualassistant.com/adrian-ocean-va-profile`
- Se usa en cards y para links internos

---

## 📝 Próximos Pasos Inmediatos

1. **Verificar formato de URLs en Webflow Collection Template**
   - ¿Cómo está configurado actualmente?
   - ¿Genera `/{{slug}}-ocean-va-profile` o `/{{slug}}`?

2. **Actualizar formulario para generar `profile-slug-2`**
   - Agregar generación automática en `VACreation.jsx`

3. **Decidir estrategia de migración**
   - Opción A (Gradual) o Opción B (Completa)

4. **Crear script de verificación**
   - Script que verifique que todos los VAs tienen:
     - `slug` correcto
     - `profile-slug-2` correcto
     - URLs coinciden con páginas estáticas

---

## 🤔 Preguntas Pendientes

1. **¿Cómo está configurado actualmente el Collection Template en Webflow?**
   - ¿Qué URL format tiene?
   - ¿Ya está funcionando?

2. **¿Todas las páginas estáticas usan el formato `/nombre-ocean-va-profile`?**
   - ¿Hay alguna excepción?

3. **¿Qué tan urgente es la migración?**
   - ¿Podemos hacerlo gradual o necesita ser inmediata?

4. **¿Hay VAs nuevos que solo existen como dinámicos?**
   - ¿Necesitan páginas estáticas también o solo dinámicas?

---

## 📚 Referencias

- [Webflow Collection Pages Documentation](https://university.webflow.com/lesson/collection-pages)
- [Webflow CMS URL Structure](https://university.webflow.com/lesson/cms-url-structure)
- Collection Template actual: Configurar para usar `/{{slug}}-ocean-va-profile`

---

**Última actualización**: 2025-01-XX
**Estado**: En revisión - Pendiente confirmación de configuración actual en Webflow
