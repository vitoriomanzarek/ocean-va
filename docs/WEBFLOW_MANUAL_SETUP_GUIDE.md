# Manual Setup Guide for VA Cards - Option 2

## 🎯 OBJETIVO

Convertir campos PlainText a Option Fields en Webflow Designer para habilitar filtros avanzados.

---

## 📋 CAMPOS A CONVERTIR

### 1. ROLE (Rol)
**Ubicación**: Collections → Virtual Assistants → Fields → Title

**Cambios**:
- Cambiar nombre: "Title" → "Role"
- Cambiar tipo: PlainText → Option
- Agregar opciones:
  - Insurance VA
  - Mortgage Specialist
  - CSR
  - Executive Admin
  - Medical VA
  - Real Estate VA

**Valor por defecto**: Insurance VA

---

### 2. AVAILABILITY (Disponibilidad)
**Ubicación**: Collections → Virtual Assistants → Fields → Availability

**Cambios**:
- Tipo: PlainText → Option
- Agregar opciones:
  - Full Time
  - Part Time
  - Assigned

**Valor por defecto**: Full Time

---

### 3. LANGUAGES (Idiomas)
**Ubicación**: Collections → Virtual Assistants → Fields → Languages

**Cambios**:
- Tipo: PlainText → Option (Multi-select)
- Agregar opciones:
  - English
  - Spanish
  - Portuguese
  - Bilingual EN-ES
  - Bilingual EN-PT

**Valor por defecto**: English

---

### 4. SPECIALIZATIONS (Especializaciones)
**Ubicación**: Collections → Virtual Assistants → Fields → Specializations

**Cambios**:
- Tipo: PlainText → Option (Multi-select)
- Agregar opciones (32 total):

**Insurance-related (26)**:
- Auto Insurance
- Home Insurance
- Health Insurance
- Life Insurance
- Commercial Insurance
- Property Insurance
- Liability Insurance
- Workers Compensation
- Disability Insurance
- Long-term Care Insurance
- Umbrella Insurance
- Travel Insurance
- Pet Insurance
- Motorcycle Insurance
- Boat Insurance
- RV Insurance
- Flood Insurance
- Earthquake Insurance
- Windstorm Insurance
- Hail Insurance
- Theft Insurance
- Fraud Insurance
- Claims Processing
- Insurance Underwriting
- Insurance Adjusting
- Insurance Brokerage

**Other (6)**:
- Mortgage
- Real Estate
- Medical
- Executive Admin
- Customer Service
- Data Entry

**Valor por defecto**: Insurance VA

---

## 🔄 PASOS EN WEBFLOW DESIGNER

### Paso 1: Ir a Collections
1. Abre Webflow Designer
2. Ve a **Collections** (lado izquierdo)
3. Selecciona **Virtual Assistants**

### Paso 2: Editar cada campo

**Para cada campo a convertir:**

1. Haz clic en el campo
2. Haz clic en el icono de engranaje (⚙️)
3. Cambia el tipo:
   - De: **PlainText**
   - A: **Option** (o **Multi-select** para Languages y Specializations)
4. Agrega las opciones
5. Guarda

### Paso 3: Actualizar valores existentes

Después de cambiar los tipos:

1. Ve a la colección
2. Abre cada item
3. Los campos ahora mostrarán dropdowns
4. Selecciona el valor correcto de la lista
5. Guarda

---

## 📊 MAPEO DE VALORES

### Role
```
Todos los VAs → "Insurance VA"
```

### Availability
```
Mantener valores existentes:
- Full Time
- Part Time
- Assigned
```

### Languages
```
Mantener valores existentes:
- English
- Spanish
- Bilingual EN-ES
- etc.
```

### Specializations
```
Convertir valores existentes a opciones:
- "Auto" → "Auto Insurance"
- "Health" → "Health Insurance"
- etc.
```

---

## ✅ CHECKLIST

- [ ] Cambiar "Title" a "Role" (Option Field)
- [ ] Cambiar "Availability" a Option Field
- [ ] Cambiar "Languages" a Multi-select Option Field
- [ ] Cambiar "Specializations" a Multi-select Option Field
- [ ] Agregar todas las opciones
- [ ] Actualizar valores en todos los 58 items
- [ ] Verificar que todos los items tengan valores válidos
- [ ] Crear página dinámica
- [ ] Agregar filtros

---

## 🚀 DESPUÉS DE COMPLETAR

Una vez que hayas convertido todos los campos:

1. **Crear página dinámica**
   - Nueva página con slug: `/our-current-vas`
   - Conectar colección: Virtual Assistants
   - Crear template de card

2. **Agregar filtros**
   - Filtro por Role
   - Filtro por Availability
   - Filtro por Languages
   - Filtro por Specializations
   - Búsqueda por nombre

3. **Diseñar cards**
   - Mostrar: Foto, Nombre, Role, Availability
   - Mostrar: Languages, Specializations
   - Botón: "View Profile"
   - Botón: "Watch Video"

4. **Publicar**
   - Testing
   - Deploy

---

## 💡 NOTAS IMPORTANTES

- Los cambios de tipo de campo NO afectarán los datos existentes
- Los valores se mantendrán como texto hasta que los actualices
- Puedes actualizar valores uno por uno o en lote
- Los filtros funcionarán automáticamente una vez que cambies a Option Fields

---

## 📝 TIEMPO ESTIMADO

- Cambiar campos: 10 minutos
- Agregar opciones: 15 minutos
- Actualizar 58 items: 30-45 minutos
- **Total: ~1 hora**

---

## 🆘 SI ALGO SALE MAL

1. Los cambios de tipo de campo son reversibles
2. Puedes volver a PlainText en cualquier momento
3. Los datos no se perderán
4. Contacta a Webflow support si necesitas ayuda

---

**¡Listo para empezar!** 🚀
