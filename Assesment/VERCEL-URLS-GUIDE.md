# 🌐 Guía de URLs en Vercel

## 📍 Tipos de URLs en Vercel

Vercel genera múltiples URLs para tu proyecto. Es importante entender cuál usar:

### 1. ✅ URL Principal del Proyecto (SIEMPRE USA ESTA)

```
https://ocean-va-agency-workload-assessment.vercel.app/
```

**Características:**
- ✅ Siempre apunta al deployment de **producción más reciente**
- ✅ Nunca cambia (a menos que cambies el nombre del proyecto)
- ✅ Es la URL que debes usar para compartir tu sitio
- ✅ Funciona siempre, incluso después de nuevos deployments

**Cómo encontrarla:**
1. Ve a tu proyecto en Vercel Dashboard
2. En la página principal, busca la sección "Domains"
3. O busca el deployment marcado como "Production" (verde, no "Stale")

---

### 2. ⚠️ URLs Específicas por Deployment (Solo para testing)

```
https://ocean-va-agency-workload-assessment-cim2zoxc2.vercel.app/
```

**Características:**
- ⚠️ Cada deployment tiene su propia URL con un hash único
- ⚠️ Solo funciona si ese deployment específico está activo
- ⚠️ Puede dar 404 si el deployment se marca como "Stale" o se elimina
- ⚠️ Útil para probar deployments específicos antes de hacerlos producción

**Cuándo usar:**
- Para probar un deployment específico antes de promocionarlo a producción
- Para compartir previews de cambios con tu equipo
- Para debugging de un deployment específico

**Cuándo NO usar:**
- ❌ Para compartir con usuarios finales
- ❌ Para configurar en sistemas externos (analytics, etc.)
- ❌ Como URL permanente

---

## 🔍 Cómo Identificar la URL Correcta

### En Vercel Dashboard:

1. **Ve a tu proyecto**
2. **Busca la sección "Domains"** en la página principal
3. **O busca el deployment de "Production"** (no "Preview" ni "Stale")
4. **La URL principal aparece ahí**

### En el Deployment:

- **Status: "Ready"** (verde) → Deployment activo
- **Status: "Ready Stale"** → Deployment antiguo, puede dar 404
- **Environment: "Production"** → Este es el que usa la URL principal

---

## 🎯 Mejores Prácticas

### ✅ HACER:

1. **Usa siempre la URL principal** para:
   - Compartir con usuarios
   - Configurar en Google Analytics, Facebook Pixel, etc.
   - Enlaces en emails, redes sociales, etc.
   - Documentación

2. **Usa URLs específicas solo para:**
   - Testing de deployments específicos
   - Preview de cambios antes de producción
   - Debugging

### ❌ NO HACER:

1. ❌ No uses URLs con hash para producción
2. ❌ No compartas URLs de deployments "Stale"
3. ❌ No configures sistemas externos con URLs específicas de deployment

---

## 🔧 Configurar Dominio Personalizado

Si quieres usar un dominio personalizado (ej: `assessment.oceanvirtualassistant.com`):

### Paso 1: Agregar Dominio en Vercel

1. Ve a tu proyecto en Vercel
2. **Settings** → **Domains**
3. Click en **"Add Domain"**
4. Ingresa tu dominio: `assessment.oceanvirtualassistant.com`
5. Click en **"Add"**

### Paso 2: Configurar DNS

Vercel te dará instrucciones específicas, pero generalmente necesitas:

**Opción A: CNAME Record (Recomendado)**
```
Type: CNAME
Name: assessment (o @ para dominio raíz)
Value: cname.vercel-dns.com
```

**Opción B: A Record**
```
Type: A
Name: assessment (o @ para dominio raíz)
Value: 76.76.21.21 (IP de Vercel)
```

### Paso 3: Verificar

1. Espera a que se propague el DNS (puede tardar hasta 24 horas, generalmente 5-10 minutos)
2. Vercel verificará automáticamente
3. Una vez verificado, tu dominio personalizado funcionará

---

## 🆘 Solución de Problemas

### Problema: URL específica da 404

**Causa:** El deployment está "Stale" o fue eliminado

**Solución:**
- Usa la URL principal del proyecto
- O promociona el deployment a producción

### Problema: URL principal da 404

**Causa:** No hay deployment de producción activo

**Solución:**
1. Ve a Vercel Dashboard → Deployments
2. Busca un deployment exitoso
3. Click en "..." → "Promote to Production"
4. O haz un nuevo deploy: `vercel --prod`

### Problema: Dominio personalizado no funciona

**Causa:** DNS no configurado correctamente o aún propagándose

**Solución:**
1. Verifica que los DNS records estén correctos
2. Espera 5-10 minutos para propagación
3. Usa herramientas como `dig` o `nslookup` para verificar
4. Revisa los logs en Vercel Dashboard → Domains

---

## 📝 Resumen

- ✅ **URL Principal**: `https://ocean-va-agency-workload-assessment.vercel.app/`
- ⚠️ **URLs Específicas**: Solo para testing, pueden dar 404
- 🎯 **Mejor Práctica**: Usa siempre la URL principal para producción
- 🔧 **Dominio Personalizado**: Configúralo en Settings → Domains

---

## 🔗 Referencias

- [Vercel Domains Documentation](https://vercel.com/docs/concepts/projects/domains)
- [Vercel Deployment URLs](https://vercel.com/docs/concepts/deployments/overview#deployment-urls)

