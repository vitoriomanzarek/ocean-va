# Video Thumbnail Generation - Explicación

## 🎯 Objetivo

Generar automáticamente el `video-thumbnail` (imagen de vista previa) para videos de YouTube basándose en la URL del video.

---

## 📋 Proceso Actual

### Situación Actual
- El formulario captura `video-url` (ejemplo: `https://youtu.be/VIDEO_ID` o `https://www.youtube.com/watch?v=VIDEO_ID`)
- El campo `video-thumbnail` en el CMS está **vacío** o **no se envía** desde el formulario
- Webflow necesita una URL de imagen para mostrar como fondo en el contenedor de video

---

## 🔧 Solución: Generación Automática

### Opción 1: Generar en el Frontend (Formulario)

**Dónde**: En `src/pages/VACreation.jsx`

**Cuándo**: Cuando el usuario ingresa la URL del video

**Cómo**:
1. El usuario ingresa `video-url`
2. Extraer el `VIDEO_ID` de la URL
3. Generar automáticamente `video-thumbnail` usando el formato de YouTube
4. Guardar ambos valores en el estado del formulario
5. Enviar ambos al CMS

**Código**:
```javascript
// En VACreation.jsx
function extractVideoId(url) {
  if (!url) return null;
  
  // Formatos soportados:
  // https://www.youtube.com/watch?v=VIDEO_ID
  // https://youtu.be/VIDEO_ID
  // https://www.youtube.com/embed/VIDEO_ID
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/.*[?&]v=([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
}

// En el handler del campo video
useEffect(() => {
  if (formData.video) {
    const videoId = extractVideoId(formData.video);
    if (videoId) {
      // Generar thumbnail URL automáticamente
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      setFormData(prev => ({ ...prev, videoThumbnail: thumbnailUrl }));
    }
  }
}, [formData.video]);
```

---

### Opción 2: Generar en el Backend (API)

**Dónde**: En `api/webflow/va-submit.js`

**Cuándo**: Cuando se procesa el formulario antes de enviar a Webflow

**Cómo**:
1. Recibir `video-url` del formulario
2. Extraer `VIDEO_ID`
3. Generar `video-thumbnail` automáticamente
4. Añadir `video-thumbnail` a los datos que se envían al CMS

**Código**:
```javascript
// En api/webflow/va-submit.js
function extractVideoId(url) {
  if (!url) return null;
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/.*[?&]v=([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
}

function generateVideoThumbnail(videoUrl) {
  const videoId = extractVideoId(videoUrl);
  if (!videoId) return null;
  
  // Formatos disponibles de YouTube:
  // hqdefault.jpg - 480x360 (alta calidad)
  // mqdefault.jpg - 320x180 (calidad media)
  // sddefault.jpg - 640x480 (definición estándar)
  // maxresdefault.jpg - 1280x720 (máxima resolución, no siempre disponible)
  
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

// En formatDataForWebflow()
if (cleanedData.video && !cleanedData['video-thumbnail']) {
  const thumbnail = generateVideoThumbnail(cleanedData.video);
  if (thumbnail) {
    fieldData['video-thumbnail'] = thumbnail;
  }
}
```

---

### Opción 3: Generar en Webflow (JavaScript)

**Dónde**: En la página de perfil del VA (Custom Code)

**Cuándo**: Cuando se carga la página

**Cómo**:
1. Leer `video-url` del CMS
2. Extraer `VIDEO_ID` con JavaScript
3. Generar `video-thumbnail` en el cliente
4. Aplicar como `background-image` al contenedor

**Código**:
```javascript
// En el template de perfil (Custom Code)
(function() {
  const videoUrl = '{{video-url}}';
  
  function extractVideoId(url) {
    if (!url) return null;
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/.*[?&]v=([^&\n?#]+)/
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) return match[1];
    }
    return null;
  }
  
  const videoId = extractVideoId(videoUrl);
  if (videoId) {
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    const container = document.querySelector('.va-video-container');
    if (container) {
      container.style.backgroundImage = `url('${thumbnailUrl}')`;
    }
  }
})();
```

---

## 🎨 Formatos de Thumbnail de YouTube

YouTube proporciona diferentes calidades de thumbnail:

| Formato | Tamaño | URL |
|---------|--------|-----|
| **hqdefault** | 480x360 | `https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg` |
| **mqdefault** | 320x180 | `https://img.youtube.com/vi/VIDEO_ID/mqdefault.jpg` |
| **sddefault** | 640x480 | `https://img.youtube.com/vi/VIDEO_ID/sddefault.jpg` |
| **maxresdefault** | 1280x720 | `https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg` ⚠️ No siempre disponible |

**Recomendación**: Usar `hqdefault.jpg` (balance calidad/tamaño)

---

## ✅ Recomendación Final

**Usar Opción 2 (Backend)** porque:
1. ✅ El thumbnail se guarda en el CMS (mejor rendimiento)
2. ✅ No depende de JavaScript en el cliente
3. ✅ Consistencia: todos los VAs tendrán thumbnail automáticamente
4. ✅ Más rápido: la imagen ya está disponible cuando carga la página

---

## 📝 Ejemplo de Implementación

### Frontend: Añadir campo oculto (opcional, para mostrar preview)
```jsx
// Mostrar preview del thumbnail en el formulario
{formData.videoThumbnail && (
  <div>
    <label>Video Thumbnail Preview:</label>
    <img src={formData.videoThumbnail} alt="Video thumbnail" style={{ maxWidth: '200px' }} />
  </div>
)}
```

### Backend: Generar automáticamente
```javascript
// El API genera el thumbnail automáticamente antes de enviar a Webflow
// No se requiere intervención del usuario
```

---

## 🔍 Testing

Para probar la generación:

1. **URL corta**: `https://youtu.be/dQw4w9WgXcQ` → ID: `dQw4w9WgXcQ`
2. **URL larga**: `https://www.youtube.com/watch?v=dQw4w9WgXcQ` → ID: `dQw4w9WgXcQ`
3. **URL embed**: `https://www.youtube.com/embed/dQw4w9WgXcQ` → ID: `dQw4w9WgXcQ`

Thumbnail resultante: `https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg`

---

**Última actualización**: 2025-01-XX
