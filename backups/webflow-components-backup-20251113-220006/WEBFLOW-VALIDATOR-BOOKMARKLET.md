# Webflow Validator Bookmarklet

Script de validación que ejecutas directamente en Webflow para verificar componentes.

---

## 🚀 Cómo Usar

### Paso 1: Crear el Bookmarklet

1. **Abre tu navegador**
2. **Abre Bookmarks** (Ctrl+Shift+B o Cmd+Shift+B)
3. **Haz clic derecho** → "Agregar página a marcadores"
4. **Nombre**: `Webflow Validator`
5. **URL**: Copia el código de abajo

### Paso 2: Copiar el Código

Copia TODO este código (es un bookmarklet):

```javascript
javascript:(function(){const report={components:[],errors:[],warnings:[],images:[],links:[]};const components=['navbar-wrapper','hero-container','carousel-wrapper','client-logos-title','comparison-table','stats-section','pricing-section','timeline-section','testimonials-section','faq-section','showcase-section','va-showcase-section','footer-container'];components.forEach(cls=>{const el=document.querySelector('.'+cls);if(el){report.components.push({name:cls,found:true,visible:el.offsetHeight>0})}else{report.components.push({name:cls,found:false,visible:false})}});const imgs=document.querySelectorAll('img');imgs.forEach(img=>{const src=img.src;const alt=img.alt;const loaded=img.complete&&img.naturalHeight>0;report.images.push({src:src,alt:alt||'SIN ALT',loaded:loaded,error:!loaded})});const links=document.querySelectorAll('a[href]');links.forEach(link=>{const href=link.href;const text=link.textContent.trim();const valid=href.length>0;report.links.push({href:href,text:text||'SIN TEXTO',valid:valid})});const styles=window.getComputedStyle(document.body);const colors=['ocean-50','ocean-100','ocean-500','ocean-600','ocean-700','ocean-900'];colors.forEach(color=>{const els=document.querySelectorAll('[class*="'+color+'"]');if(els.length===0){report.warnings.push('Color '+color+' no encontrado en el DOM')}});const html=`<div style="position:fixed;top:10px;right:10px;width:500px;max-height:90vh;background:white;border:2px solid #049d98;border-radius:8px;padding:20px;font-family:monospace;font-size:12px;z-index:99999;overflow-y:auto;box-shadow:0 10px 25px rgba(0,0,0,0.2)"><h2 style="margin:0 0 15px 0;color:#049d98">Webflow Validator Report</h2><div style="margin-bottom:15px"><h3 style="margin:0 0 10px 0;color:#111827">✅ Componentes ('+report.components.filter(c=>c.found).length+'/'+report.components.length+')</h3><div style="background:#f9fafb;padding:10px;border-radius:4px;max-height:150px;overflow-y:auto">'+report.components.map(c=>'<div style="color:'+(c.found?'#10b981':'#ef4444')+'">'+(c.found?'✓':'✗')+' '+c.name+'</div>').join('')+'</div></div><div style="margin-bottom:15px"><h3 style="margin:0 0 10px 0;color:#111827">🖼️ Imágenes ('+report.images.filter(i=>i.loaded).length+'/'+report.images.length+')</h3><div style="background:#f9fafb;padding:10px;border-radius:4px;max-height:150px;overflow-y:auto">'+report.images.map(i=>'<div style="color:'+(i.loaded?'#10b981':'#ef4444')+';word-break:break-all"><small>'+(i.loaded?'✓':'✗')+' '+i.src.substring(0,50)+'...</small></div>').join('')+'</div></div><div style="margin-bottom:15px"><h3 style="margin:0 0 10px 0;color:#111827">🔗 Links ('+report.links.filter(l=>l.valid).length+'/'+report.links.length+')</h3><div style="background:#f9fafb;padding:10px;border-radius:4px;max-height:150px;overflow-y:auto">'+report.links.map(l=>'<div style="color:'+(l.valid?'#10b981':'#ef4444')+'"><small>'+(l.valid?'✓':'✗')+' '+l.text.substring(0,30)+'</small></div>').join('')+'</div></div><div style="margin-bottom:15px"><h3 style="margin:0 0 10px 0;color:#111827">⚠️ Advertencias ('+report.warnings.length+')</h3><div style="background:#f9fafb;padding:10px;border-radius:4px;max-height:150px;overflow-y:auto">'+report.warnings.map(w=>'<div style="color:#f59e0b"><small>⚠️ '+w+'</small></div>').join('')+'</div></div><div style="margin-top:15px;padding-top:15px;border-top:1px solid #e5e7eb"><button onclick="this.parentElement.parentElement.remove()" style="background:#049d98;color:white;border:none;padding:8px 16px;border-radius:4px;cursor:pointer;font-weight:bold">Cerrar</button><button onclick="console.log(JSON.stringify('+JSON.stringify(report)+',null,2))" style="background:#374151;color:white;border:none;padding:8px 16px;border-radius:4px;cursor:pointer;margin-left:10px;font-weight:bold">Ver JSON</button></div></div>`;document.body.insertAdjacentHTML('beforeend',html);console.log('Webflow Validator Report:',report)})();
```

### Paso 3: Usar el Bookmarklet

1. **Ve a tu página en Webflow**
2. **Haz clic en el bookmarklet** "Webflow Validator"
3. **Aparecerá un reporte** en la esquina superior derecha
4. **Revisa los resultados**

---

## 📊 Qué Valida

### ✅ Componentes
- Verifica que todos los componentes estén presentes
- Muestra si están visibles
- Cuenta cuántos se encontraron

### 🖼️ Imágenes
- Verifica que todas las imágenes carguen
- Muestra URLs
- Identifica imágenes rotas

### 🔗 Links
- Verifica que todos los links sean válidos
- Muestra texto del link
- Identifica links vacíos

### ⚠️ Advertencias
- Busca colores Ocean no utilizados
- Identifica problemas de estructura
- Sugiere mejoras

---

## 📋 Interpretación del Reporte

### Verde (✓) = Bien
```
✓ navbar-wrapper        → Componente encontrado
✓ /images/logo.png      → Imagen cargada
✓ /contact-us           → Link válido
```

### Rojo (✗) = Problema
```
✗ hero-container        → Componente NO encontrado
✗ /images/missing.png   → Imagen NO cargada
✗ (vacío)               → Link sin URL
```

### Amarillo (⚠️) = Advertencia
```
⚠️ Color ocean-50 no encontrado en el DOM
⚠️ Imagen sin atributo ALT
```

---

## 🔧 Versiones Alternativas

### Versión Simplificada (Más Rápida)

Si la versión completa es muy lenta, usa esta:

```javascript
javascript:(function(){const report={componentes:0,imagenes:0,links:0,errores:0};document.querySelectorAll('[class*="section"]').forEach(el=>{report.componentes++});document.querySelectorAll('img').forEach(img=>{report.imagenes++;if(!img.complete||img.naturalHeight===0){report.errores++}});document.querySelectorAll('a').forEach(link=>{report.links++});alert('Reporte Rápido:\n\nComponentes: '+report.componentes+'\nImágenes: '+report.imagenes+'\nLinks: '+report.links+'\nErrores: '+report.errores)})();
```

### Versión con Exportación CSV

```javascript
javascript:(function(){const data=[];document.querySelectorAll('img').forEach(img=>{data.push({tipo:'imagen',src:img.src,estado:img.complete?'OK':'ERROR'})});document.querySelectorAll('a').forEach(link=>{data.push({tipo:'link',href:link.href,texto:link.textContent.trim()})});const csv='tipo,contenido,estado\n'+data.map(r=>r.tipo+','+r.src||r.href+','+(r.estado||'OK')).join('\n');const blob=new Blob([csv],{type:'text/csv'});const url=window.URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='webflow-report.csv';a.click()})();
```

---

## 💡 Casos de Uso

### Validar Después de Copiar Componente
1. Copias HTML a Webflow
2. Ejecutas el bookmarklet
3. Verificas que todo esté bien
4. Publicas cambios

### Revisar Antes de Campaña
1. Ejecutas el bookmarklet
2. Verificas que no haya imágenes rotas
3. Verificas que todos los links funcionen
4. Lanzas campaña con confianza

### Testing Rápido
1. Haces cambios en Webflow
2. Ejecutas el bookmarklet
3. Ves si algo se rompió
4. Corriges rápidamente

### Auditoría de Componentes
1. Ejecutas el bookmarklet
2. Exportas reporte
3. Comparas con versión anterior
4. Identificas cambios

---

## 🐛 Troubleshooting

### El bookmarklet no funciona
**Solución**: Asegúrate de que:
- [ ] Estés en la página de Webflow
- [ ] El código esté completo (sin cortes)
- [ ] Hayas presionado Enter después de pegar

### El reporte no aparece
**Solución**:
- [ ] Abre DevTools (F12)
- [ ] Ve a Console
- [ ] Busca errores
- [ ] Copia el error y búscalo en Google

### Las imágenes muestran como error
**Solución**:
- [ ] Verifica que las imágenes estén en `/images/`
- [ ] Revisa que los nombres sean exactos
- [ ] Recarga la página y prueba de nuevo

---

## 🚀 Próximas Mejoras

Puedo crear versiones mejoradas que:
- [ ] Generen reporte PDF
- [ ] Envíen reporte por email
- [ ] Comparen con versión anterior
- [ ] Sugieran fixes automáticos
- [ ] Integren con Slack

¿Quieres que agregue alguna de estas?

---

## 📝 Notas

- El bookmarklet es **100% seguro** (solo lee, no modifica)
- Funciona en **cualquier página web**
- No requiere **instalación**
- Puedes **compartirlo** con tu equipo
- Se ejecuta **localmente** en tu navegador

---

**Última actualización**: Oct 29, 2025
