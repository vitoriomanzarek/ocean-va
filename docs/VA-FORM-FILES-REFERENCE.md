# VA Form Files Reference

**Fecha**: Enero 2025

---

## 📦 ARCHIVOS DISPONIBLES

### 1. **Versión Separada** (Para desarrollo)

- **`va-form.html`** - HTML solo (sin CSS)
- **`va-form-styles.css`** - CSS solo (sin HTML)
- **`va-form-script.js`** - JavaScript (debe ir en Footer Code)

**Uso**: Para desarrollo y cuando necesites mantener CSS y HTML separados.

---

### 2. **Versión Unificada** (Para producción - RECOMENDADO)

- **`va-form-complete.html`** - HTML + CSS en un solo archivo (legible)
- **`va-form-complete-minified.html`** - HTML + CSS minificado (15% más pequeño)

**Uso**: Para producción en Webflow. Copia el contenido minificado a un HTML Embed.

---

## 🚀 RECOMENDACIÓN: Usar Versión Minificada

**Archivo**: `webflow-custom-code/va-form-complete-minified.html`

**Ventajas:**
- ✅ Todo en un solo archivo (más fácil de copiar/pegar)
- ✅ 15% más pequeño (mejor rendimiento)
- ✅ CSS integrado (no necesita agregarse por separado)
- ✅ Listo para producción

**Cómo usar:**
1. Copiar TODO el contenido de `va-form-complete-minified.html`
2. En Webflow, agregar un **HTML Embed** element
3. Pegar el contenido
4. Agregar JavaScript en Footer Code (de `va-form-script.js`)

---

## 📝 NOTA IMPORTANTE

El JavaScript (`va-form-script.js`) **siempre debe agregarse por separado** en **Page Settings → Custom Code → Footer Code**, independientemente de qué versión del HTML uses.

---

## 📊 COMPARACIÓN

| Archivo | Tamaño | Uso |
|---------|--------|-----|
| `va-form.html` + `va-form-styles.css` | ~14KB + ~8KB | Desarrollo |
| `va-form-complete.html` | ~15KB | Referencia |
| `va-form-complete-minified.html` | ~12KB | **Producción** ⭐ |

---

## 🔗 ARCHIVOS RELACIONADOS

- **JavaScript**: `webflow-custom-code/va-form-script.js`
- **API Route**: `api/webflow/va-submit.js`
- **Helpers**: `scripts/va-form-helpers.js`
- **Guía de Integración**: `docs/VA-FORM-QUICK-INTEGRATION.md`

