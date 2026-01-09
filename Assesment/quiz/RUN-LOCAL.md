# 🚀 Cómo Correr el Quiz en Local

## Opción 1: Usando Vercel Dev (Recomendado)

Este método sirve tanto el API como los archivos estáticos del quiz.

### 1. Iniciar el servidor de desarrollo

```bash
cd Assesment
npm run dev
```

Esto iniciará el servidor en `http://localhost:3000`

### 2. Abrir el quiz en el navegador

Abre tu navegador y ve a:
```
http://localhost:3000/quiz/standalone.html
```

El quiz estará completamente funcional con el API corriendo en el mismo puerto.

---

## Opción 2: Usando un Servidor HTTP Simple

Si prefieres usar un servidor HTTP simple solo para el frontend:

### 1. Instalar un servidor HTTP (si no lo tienes)

**Con Python:**
```bash
# Python 3
python -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080
```

**Con Node.js (http-server):**
```bash
npm install -g http-server
http-server -p 8080
```

**Con PHP:**
```bash
php -S localhost:8080
```

### 2. Iniciar el API en otra terminal

```bash
cd Assesment
npm run dev
```

### 3. Abrir el quiz

Navega a la carpeta `Assesment/quiz` y abre `standalone.html` en el navegador:
```
http://localhost:8080/standalone.html
```

**Nota:** El archivo `standalone.html` ya está configurado para detectar si estás en localhost y usar `http://localhost:3000/api` automáticamente.

---

## Opción 3: Abrir Directamente el Archivo (Sin API)

Si solo quieres ver el quiz sin funcionalidad del API:

1. Abre `Assesment/quiz/standalone.html` directamente en tu navegador
2. El quiz funcionará, pero los datos no se guardarán en Webflow

---

## ✅ Verificar que Funciona

1. Abre la consola del navegador (F12)
2. Haz clic en "START THE 3-MINUTE AGENCY WORKLOAD ASSESSMENT"
3. Completa el formulario de contacto
4. Responde las preguntas
5. Al finalizar, deberías ver los resultados y los datos se guardarán en Webflow (si el API está corriendo)

---

## 🐛 Solución de Problemas

**Error: "Failed to fetch" o "Network error"**
- Verifica que el servidor del API está corriendo (`npm run dev` en la carpeta `Assesment`)
- Verifica que el puerto es 3000
- Abre la consola del navegador para ver el error exacto

**Los botones no funcionan**
- Verifica que `standalone-engine.js` se está cargando (consola del navegador)
- Verifica que no hay errores de JavaScript en la consola

**El API no guarda en Webflow**
- Verifica que el archivo `.env` existe en la carpeta `Assesment`
- Verifica que las variables de entorno están configuradas correctamente
- Revisa los logs del servidor para ver errores

---

## 📝 Notas

- El archivo `standalone.html` detecta automáticamente si estás en localhost y configura el API base
- En producción (Vercel), el API base se configura automáticamente según el dominio
- Todos los archivos necesarios están en `Assesment/quiz/`

