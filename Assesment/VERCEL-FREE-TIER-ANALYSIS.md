# Análisis: Límites del Plan Gratuito de Vercel para Assessment Quiz

## 📊 **Límites del Plan Hobby (Gratuito) de Vercel**

### Límites Mensuales:
- ✅ **Requests/Invocaciones**: 1,000,000 por mes
- ✅ **Transferencia de Datos**: 100 GB por mes
- ✅ **CPU activa en Functions**: 4 horas
- ✅ **Memoria aprovisionada**: 360 GB-horas
- ✅ **Invocaciones de Functions**: 1,000,000
- ✅ **Almacenamiento de Blob**: 1 GB
- ✅ **Transformaciones de imágenes**: 5,000
- ✅ **Lecturas de caché de imágenes**: 300,000

---

## 🎯 **Análisis por Sesión de Quiz**

### **Requests Generados por Sesión Completa:**

| Acción | Requests | Descripción |
|--------|----------|-------------|
| **Landing Page** | 3-5 | HTML + JS + CSS + imágenes |
| **Navegación del Quiz** | 2-4 | Preguntas, progress bar |
| **Submit Results** | 1 | API call a `/api/quiz/submit` |
| **Descargar PDF** | 1 | API call a `/api/quiz/pdfs?profile=X` |
| **Assets adicionales** | 2-3 | Más imágenes si las hay |
| **TOTAL** | **~10-15 requests** | Por sesión completa |

### **Transferencia de Datos por Sesión:**

| Recurso | Tamaño Estimado | Descripción |
|---------|----------------|-------------|
| **HTML inicial** | ~50 KB | `index.html` |
| **JS (standalone-engine.js)** | ~60 KB | Código del quiz |
| **CSS** | ~20 KB | Estilos inline |
| **Imágenes** | ~200-300 KB | 6-8 imágenes WebP |
| **PDF descargado** | ~100-200 KB | HTML del PDF |
| **API responses** | ~5-10 KB | JSON de Supabase |
| **TOTAL** | **~435-640 KB por sesión** | Por sesión completa |

---

## 🧮 **Cálculo de Sesiones Máximas**

### **Basado en Requests (Límite más restrictivo):**
```
1,000,000 requests / 12.5 requests promedio = ~80,000 sesiones/mes
```

### **Basado en Transferencia de Datos:**
```
100 GB = 100,000 MB = 100,000,000 KB
100,000,000 KB / 540 KB promedio = ~185,000 sesiones/mes
```

### **Basado en CPU (Functions):**
- Cada API call (`/api/quiz/submit`, `/api/quiz/pdfs`) toma ~50-200ms
- 4 horas = 14,400 segundos = 14,400,000 ms
- Con 2 API calls por sesión (submit + PDF): ~36,000-144,000 sesiones/mes

### **Basado en Invocaciones de Functions:**
```
1,000,000 invocaciones / 2 funciones por sesión = 500,000 sesiones/mes
```

---

## ✅ **CONCLUSIÓN: Límite Real**

El límite más restrictivo es el de **Requests (1 millón/mes)**.

### **Estimación Conservadora:**
- **~80,000 sesiones completas por mes** 
- **~2,600 sesiones por día** (asumiendo distribución uniforme)
- **~110 sesiones por hora** (pico sostenido)

### **Estimación Optimista (con caché):**
- Si Vercel cachea bien los assets estáticos (JS, imágenes, CSS):
- Solo cuentan las requests dinámicas: ~2-3 por sesión
- **~300,000-500,000 sesiones por mes**

---

## 🎯 **Para tu Assessment Quiz Específico**

### **Caso de Uso Realista:**
- **Quiz completo** (landing → questions → results → PDF download)
- **Sin caché** (primera visita): ~12-15 requests, ~500-600 KB
- **Con caché** (visitas subsecuentes): ~3-5 requests, ~100-200 KB

### **Capacidad Estimada:**
| Escenario | Sesiones/Mes | Sesiones/Día |
|-----------|--------------|--------------|
| **Sin caché (conservador)** | 60,000-80,000 | 2,000-2,600 |
| **Con caché (optimista)** | 200,000-300,000 | 6,600-10,000 |

---

## ⚠️ **Consideraciones Importantes**

### **Qué NO cuenta hacia los límites:**
- ✅ Páginas estáticas servidas desde CDN (después del primer request)
- ✅ Assets cacheados (imágenes, JS, CSS después de primera carga)
- ✅ Requests que usan ISR (Incremental Static Regeneration)

### **Qué SÍ cuenta:**
- ❌ API routes (`/api/quiz/submit`, `/api/quiz/pdfs`)
- ❌ Serverless functions
- ❌ Requests dinámicos

### **Factores que Aumentan el Uso:**
1. **Usuarios que abandonan a mitad del quiz** (menos requests pero igual cuenta)
2. **Múltiples intentos del mismo usuario** (cada intento cuenta)
3. **Sin caché** (cada asset cuenta como nuevo request)
4. **PDFs grandes** (más transferencia de datos)

---

## 📈 **Optimizaciones para Maximizar Sesiones**

### 1. **Habilitar Caché de Assets Estáticos:**
```javascript
// En vercel.json o headers
{
  "headers": [
    {
      "source": "/standalone-engine.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 2. **Optimizar Tamaño de Imágenes:**
- Usar WebP (ya lo haces ✅)
- Compresión adicional si es necesario
- Lazy loading para imágenes

### 3. **Minificar JS:**
- Minificar `standalone-engine.js`
- Podría reducir de 60KB a ~20-30KB

### 4. **Usar ISR para Páginas Estáticas:**
- Si algunas páginas no cambian frecuentemente, usar ISR

---

## 🚨 **Qué Pasa si Excedes los Límites**

### **Opciones:**
1. **Actualizar a Plan Pro** ($20/mes):
   - Sin límites de requests
   - Transferencia ilimitada
   - Más recursos

2. **Optimizar más el código** (gratis):
   - Minificar JS
   - Comprimir imágenes
   - Habilitar caché agresiva

3. **Monitorear uso**:
   - Vercel Dashboard te muestra el uso actual
   - Alertas cuando te acercas al límite

---

## 📊 **Monitoreo Recomendado**

### **En Vercel Dashboard puedes ver:**
- Requests actuales del mes
- Transferencia de datos usada
- Invocaciones de functions
- CPU tiempo usado

### **Alertas que deberías configurar:**
- Alerta al 80% de requests (800,000)
- Alerta al 80% de transferencia (80 GB)
- Alerta al 80% de CPU (3.2 horas)

---

## ✅ **Respuesta Directa**

**Para tu Assessment Quiz, con el plan gratuito de Vercel puedes manejar aproximadamente:**

### **Estimación Realista:**
- **60,000-100,000 sesiones completas por mes**
- **~2,000-3,300 sesiones por día**
- **Suficiente para tráfico moderado-alto**

### **Si tienes mucho tráfico:**
- **Plan Pro** ($20/mes): Sin límites de requests
- O **optimizar código** para reducir requests por sesión

---

## 💡 **Recomendación**

1. **Empieza con el plan gratuito** - Es suficiente para la mayoría de casos
2. **Monitorea el uso** durante el primer mes
3. **Optimiza si es necesario** (minificar JS, comprimir imágenes)
4. **Actualiza a Pro solo si**:
   - Superas 50,000-60,000 sesiones/mes consistentemente
   - O necesitas más recursos para crecer

**El plan gratuito debería ser suficiente para empezar y validar el producto. 🚀**

