# Ocean VA Operational Efficiency Scorecard

Un sistema completo de assessment/quiz basado en la metodología de **ScoreApp** para calificar leads automáticamente y segmentarlos en 4 perfiles.

## 📋 Descripción

Este quiz evalúa la eficiencia operativa de agencias de seguros y otros negocios, calculando:
- **Operational Maturity Score** (0-10): Madurez operativa y preparación para delegar
- **Purchase Intent Score** (0-15): Intención de compra y presupuesto
- **Urgency Score** (0-8): Señales de urgencia y dolor actual

## 🎯 Los 4 Perfiles de Leads

### Profile A: 🔥 HOT LEAD
- **Criterios**: Operational ≥ 6 AND Intent ≥ 10
- **Acción**: Llamada de ventas inmediata
- **Close Rate**: 60-80%

### Profile B: 🟡 WARM LEAD
- **Criterios**: Operational 4-7 AND Intent 5-9
- **Acción**: Nurture sequence + educación
- **Close Rate**: 30-50% (después de nurture)

### Profile C: 🔴 COLD BUT URGENT
- **Criterios**: Operational < 4 AND (Urgency ≥ 5 OR Intent ≥ 8)
- **Acción**: Video educativo + rescate urgente
- **Close Rate**: 20-40% (si urgencia es real)

### Profile D: ❄️ ICE COLD
- **Criterios**: Intent < 5 AND Urgency < 3
- **Acción**: Solo nurture pasivo
- **Close Rate**: 5-15% (nurture largo)

## 📁 Estructura de Archivos

```
Assesment/quiz/
├── index.html              # Landing page + Quiz interface
├── components/
│   └── quiz-engine.js      # Motor principal del quiz
├── data/
│   └── questions.js        # Todas las preguntas y opciones
├── utils/
│   └── scoring.js         # Sistema de scoring y cálculo de perfiles
├── styles/
│   └── quiz.css           # Estilos del quiz
└── README.md              # Esta documentación
```

## 🚀 Uso

### Opción 1: HTML Standalone (Recomendado para Webflow)

1. Abre `index.html` en un navegador
2. Asegúrate de que las rutas a los archivos CSS y JS sean correctas
3. Para producción, minifica los archivos y ajusta las rutas

### Opción 2: Integración con React

```jsx
import QuizEngine from './Assesment/quiz/components/quiz-engine.js';
import '../Assesment/quiz/styles/quiz.css';

function AssessmentPage() {
  return <QuizEngine />;
}
```

### Opción 3: Integración con Webflow

1. Copia el contenido de `index.html` a una página de Webflow
2. Agrega los estilos de `quiz.css` al Custom Code (Head)
3. Agrega el script `quiz-engine.js` al Custom Code (Before </body>)
4. Ajusta las rutas de los imports si es necesario

## 📊 Sistema de Scoring

### Operational Maturity (0-10 puntos)
- **Q5-Q14**: Best Practices Questions
- **YES** = 1.0 punto
- **SOMETIMES** = 0.5 puntos
- **NO** = 0 puntos
- **Q13 y Q14**: Reverse indicators (YES = 0 puntos pero alta urgencia)

### Purchase Intent (0-15 puntos)
- **Q15** (Goal): 0-3 puntos
- **Q16** (Obstacle): 0-3 puntos
- **Q17** (Hours): 0-4 puntos
- **Q18** (Solution): 0-5 puntos ⭐ MÁS IMPORTANTE
- **Q19** (Open Box): 0-2 bonus points por keywords

### Urgency Score (0-8 puntos)
- **Q13** (Losing leads): +5 puntos si YES
- **Q14** (Turnover): +3 puntos si YES
- **Q19** (Keywords): +2 puntos por "urgent", "ASAP", "drowning"

## 🔧 Configuración

### Personalizar Preguntas

Edita `data/questions.js` para modificar las preguntas, opciones o áreas de medición.

### Ajustar Scoring

Modifica las funciones en `utils/scoring.js` para cambiar los pesos o criterios de scoring.

### Personalizar Resultados

Edita `getProfileContent()` en `utils/scoring.js` para cambiar los mensajes y CTAs por perfil.

## 📈 Integración con CRM

El quiz automáticamente registra los resultados en la consola. Para integrar con tu CRM:

1. Modifica la función `calculateAndShowResults()` en `quiz-engine.js`
2. Agrega tu endpoint de API o webhook
3. Envía los datos: `contact`, `answers`, `scores`, `profile`, `savings`

### Ejemplo de Integración con Webhook

```javascript
async function sendToCRM(data) {
  await fetch('https://your-crm.com/webhook', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}
```

## 🎨 Personalización de Estilos

Los estilos usan el Design System de Ocean VA. Para personalizar:

1. Edita `styles/quiz.css`
2. Usa las variables CSS del design system:
   - `--ds-color-primary-700`
   - `--ds-spacing-*`
   - `--ds-radius-*`
   - etc.

## 📱 Responsive

El quiz es 100% responsive y se adapta a móviles, tablets y desktop.

## ✅ Checklist de Implementación

- [ ] Revisar todas las preguntas en `data/questions.js`
- [ ] Ajustar scoring según necesidades en `utils/scoring.js`
- [ ] Personalizar mensajes de resultados por perfil
- [ ] Configurar integración con CRM/Email Marketing
- [ ] Probar flujo completo del quiz
- [ ] Verificar responsive en móvil
- [ ] Configurar analytics (Google Analytics, Facebook Pixel)
- [ ] A/B test de landing page
- [ ] Configurar emails de nurture por perfil

## 🔗 Referencias

- [ScoreApp Methodology](https://www.scoreapp.com/assesments-quizzes/)
- Design System: `webflow-components-design-system/design-system.css`
- Documentación completa: `Assesment/chat briefing.md`

## 📞 Soporte

Para preguntas o modificaciones, consulta la documentación completa en `Assesment/chat briefing.md` que contiene toda la estrategia y lógica detrás del sistema.

