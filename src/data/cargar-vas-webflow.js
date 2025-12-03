// Script para cargar VAs a Webflow según las indicaciones del usuario
import fs from 'fs';
import { parse } from 'csv-parse/sync';

// IDs de colecciones
const VA_COLLECTION_ID = '691b82a97542c69f3f77fa76';
const LOCALE_ID = '66fd75f52a0ded63ad5ec1d9';
const MAIN_CATEGORIES_COLLECTION_ID = '691f65ddf62cb29a405fc022';
const SPECIALIZATIONS_COLLECTION_ID = '691ccaf4f30e1de9a0437845';

// Leer CSV
const csvContent = fs.readFileSync('src/data/VAs Database - Executive Virtual Assistants.csv', 'utf-8');
const records = parse(csvContent, {
  columns: true,
  skip_empty_lines: true,
  delimiter: ';'
});

// Mapeo de cambios específicos según comentarios del usuario
const cambiosEspecificos = {
  'karen': {
    // No cambiar Main Category ni Specialization (usuario los ve iguales)
    skipFields: ['main-category', 'main-categories', 'specialization']
  },
  'joana': {
    // Cambiar Experience a "Trained Assistant", no cambiar Main Category ni Specialization
    updateFields: ['experience-years'],
    skipFields: ['main-category', 'main-categories', 'specialization']
  },
  'abigail': {
    // Cambiar Main Category (agregar Executive Virtual Assistant)
    updateFields: ['main-categories']
  },
  'jasmine': {
    // Cambiar Experience a "Trained Assistant", no cambiar Main Category ni Specialization
    updateFields: ['experience-years'],
    skipFields: ['main-category', 'main-categories', 'specialization']
  },
  'jill': {
    // Cambiar Experience a "Trained Assistant", no cambiar Main Category ni Specialization
    updateFields: ['experience-years'],
    skipFields: ['main-category', 'main-categories', 'specialization']
  },
  'ana': {
    // Cambiar Experience a "Trained Assistant", no cambiar Main Category ni Specialization
    updateFields: ['experience-years'],
    skipFields: ['main-category', 'main-categories', 'specialization']
  },
  'balbina': {
    // Cambiar Experience a "Trained Assistant", no cambiar Main Category ni Specialization
    updateFields: ['experience-years'],
    skipFields: ['main-category', 'main-categories', 'specialization']
  },
  'brandon': {
    // Aplicar todos los cambios del CSV
    updateFields: ['all']
  },
  'janice': {
    // Cambiar Experience a "Trained Assistant", no cambiar Main Category ni Specialization
    updateFields: ['experience-years'],
    skipFields: ['main-category', 'main-categories', 'specialization']
  }
};

// Función para obtener IDs de Main Categories desde Webflow
async function obtenerMainCategoriesIds() {
  const response = await fetch(`https://api.webflow.com/v2/collections/${MAIN_CATEGORIES_COLLECTION_ID}/items`, {
    headers: {
      'Authorization': `Bearer ${process.env.WEBFLOW_API_TOKEN}`,
      'Accept-Version': '1.0.0'
    }
  });
  const data = await response.json();
  const map = new Map();
  data.items.forEach(item => {
    map.set(item.fieldData.name.toLowerCase(), item.id);
    map.set(item.fieldData.slug, item.id);
  });
  return map;
}

// Función para obtener IDs de Specializations desde Webflow
async function obtenerSpecializationsIds() {
  const response = await fetch(`https://api.webflow.com/v2/collections/${SPECIALIZATIONS_COLLECTION_ID}/items`, {
    headers: {
      'Authorization': `Bearer ${process.env.WEBFLOW_API_TOKEN}`,
      'Accept-Version': '1.0.0'
    }
  });
  const data = await response.json();
  const map = new Map();
  data.items.forEach(item => {
    map.set(item.fieldData.name.toLowerCase(), item.id);
    map.set(item.fieldData.slug, item.id);
  });
  return map;
}

// Función para parsear Main Categories del CSV
function parseMainCategories(csvValue) {
  if (!csvValue) return [];
  return csvValue
    .split(',')
    .map(c => c.trim())
    .filter(c => c.length > 0);
}

// Función para parsear Specializations del CSV
function parseSpecializations(csvValue) {
  if (!csvValue) return [];
  return csvValue
    .split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

// Función para mapear nombres a IDs de Main Categories
function mapearMainCategoriesIds(csvValue, mainCategoriesMap) {
  const categories = parseMainCategories(csvValue);
  const ids = [];
  categories.forEach(cat => {
    // Buscar por nombre completo
    const idByName = mainCategoriesMap.get(cat.toLowerCase());
    if (idByName) {
      ids.push(idByName);
    } else {
      // Intentar buscar por slug (convertir nombre a slug)
      const slug = cat.toLowerCase().replace(/\s+/g, '-');
      const idBySlug = mainCategoriesMap.get(slug);
      if (idBySlug) {
        ids.push(idBySlug);
      } else {
        console.warn(`⚠️  No se encontró ID para Main Category: ${cat}`);
      }
    }
  });
  return ids;
}

// Función para mapear nombres a IDs de Specializations
function mapearSpecializationsIds(csvValue, specializationsMap) {
  const specs = parseSpecializations(csvValue);
  const ids = [];
  specs.forEach(spec => {
    // Buscar por slug (el CSV tiene slugs)
    const idBySlug = specializationsMap.get(spec.toLowerCase());
    if (idBySlug) {
      ids.push(idBySlug);
    } else {
      // Intentar buscar por nombre
      const idByName = specializationsMap.get(spec.toLowerCase());
      if (idByName) {
        ids.push(idByName);
      } else {
        console.warn(`⚠️  No se encontró ID para Specialization: ${spec}`);
      }
    }
  });
  return ids;
}

// Función para preparar fieldData para Webflow
function prepararFieldData(record, mainCategoriesMap, specializationsMap, cambios) {
  const fieldData = {
    name: record.Name,
    slug: record.Slug
  };

  // Experience: "Trained Assistant" reemplaza "null years" o "Trained insurance"
  if (cambios?.updateFields?.includes('experience-years') || cambios?.updateFields?.includes('all')) {
    fieldData['experience-years'] = record['Experience (Years)'];
  }

  // Languages
  if (!cambios?.skipFields?.includes('languages') || cambios?.updateFields?.includes('all')) {
    fieldData.languages = record.Languages;
  }

  // Availability
  if (!cambios?.skipFields?.includes('availability') || cambios?.updateFields?.includes('all')) {
    fieldData.availability = record.Availability;
  }

  // Main Categories (MultiReference)
  if (!cambios?.skipFields?.includes('main-categories') || cambios?.updateFields?.includes('all')) {
    const mainCategoriesIds = mapearMainCategoriesIds(record['Main Categories'], mainCategoriesMap);
    if (mainCategoriesIds.length > 0) {
      fieldData['main-categories'] = mainCategoriesIds;
    }
  }

  // Specialization (MultiReference)
  if (!cambios?.skipFields?.includes('specialization') || cambios?.updateFields?.includes('all')) {
    const specializationIds = mapearSpecializationsIds(record.Specialization, specializationsMap);
    if (specializationIds.length > 0) {
      fieldData.specialization = specializationIds;
    }
  }

  // Video (Link)
  if (!cambios?.skipFields?.includes('video') || cambios?.updateFields?.includes('all')) {
    if (record.Video) {
      fieldData.video = record.Video;
    }
  }

  // VA Image (Image) - campo se llama "image"
  if (!cambios?.skipFields?.includes('image') || cambios?.updateFields?.includes('all')) {
    if (record['VA Image']) {
      fieldData.image = record['VA Image'];
    }
  }

  // Profile Slug
  if (!cambios?.skipFields?.includes('profile-slug-2') || cambios?.updateFields?.includes('all')) {
    if (record['Profile Slug']) {
      fieldData['profile-slug-2'] = record['Profile Slug'];
    }
  }

  return fieldData;
}

// Función para actualizar VA existente
async function actualizarVA(itemId, fieldData) {
  const response = await fetch(`https://api.webflow.com/v2/collections/${VA_COLLECTION_ID}/items/${itemId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${process.env.WEBFLOW_API_TOKEN}`,  
      'Accept-Version': '1.0.0',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fieldData: fieldData,
      isArchived: false,
      isDraft: false
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Error actualizando VA: ${response.status} - ${error}`);
  }

  return await response.json();
}

// Función para crear VA nuevo
async function crearVA(fieldData) {
  const response = await fetch(`https://api.webflow.com/v2/collections/${VA_COLLECTION_ID}/items`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.WEBFLOW_API_TOKEN}`,
      'Accept-Version': '1.0.0',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fieldData: fieldData,
      isArchived: false,
      isDraft: false
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Error creando VA: ${response.status} - ${error}`);
  }

  return await response.json();
}

// Función principal
async function cargarVAs() {
  console.log('🚀 Iniciando carga de VAs a Webflow...\n');

  // Verificar token
  if (!process.env.WEBFLOW_API_TOKEN) {
    console.error('❌ Error: WEBFLOW_API_TOKEN no está definido en las variables de entorno');
    process.exit(1);
  }

  // Obtener mapeos de IDs
  console.log('📋 Obteniendo IDs de Main Categories y Specializations...');
  const mainCategoriesMap = await obtenerMainCategoriesIds();
  const specializationsMap = await obtenerSpecializationsIds();
  console.log(`✅ Main Categories: ${mainCategoriesMap.size} encontrados`);
  console.log(`✅ Specializations: ${specializationsMap.size} encontrados\n`);

  const resultados = {
    actualizados: [],
    creados: [],
    errores: []
  };

  // Procesar cada VA del CSV
  for (const record of records) {
    const slug = record.Slug;
    const itemId = record['Item ID'];
    const cambios = cambiosEspecificos[slug];

    try {
      console.log(`\n📝 Procesando: ${record.Name} (${slug})`);

      // Preparar fieldData
      const fieldData = prepararFieldData(record, mainCategoriesMap, specializationsMap, cambios);

      if (itemId && itemId.trim() !== '') {
        // VA existente - actualizar
        console.log(`  ↻ Actualizando VA existente (Item ID: ${itemId})`);
        const resultado = await actualizarVA(itemId, fieldData);
        resultados.actualizados.push({
          name: record.Name,
          slug: slug,
          itemId: itemId
        });
        console.log(`  ✅ ${record.Name} actualizado correctamente`);
      } else {
        // VA nuevo - crear
        console.log(`  ➕ Creando nuevo VA`);
        const resultado = await crearVA(fieldData);
        resultados.creados.push({
          name: record.Name,
          slug: slug,
          itemId: resultado.id
        });
        console.log(`  ✅ ${record.Name} creado correctamente (Item ID: ${resultado.id})`);
      }

      // Pequeña pausa para evitar rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));

    } catch (error) {
      console.error(`  ❌ Error procesando ${record.Name}:`, error.message);
      resultados.errores.push({
        name: record.Name,
        slug: slug,
        error: error.message
      });
    }
  }

  // Resumen
  console.log('\n\n📊 RESUMEN DE CARGA');
  console.log('='.repeat(50));
  console.log(`✅ VAs actualizados: ${resultados.actualizados.length}`);
  console.log(`➕ VAs creados: ${resultados.creados.length}`);
  console.log(`❌ Errores: ${resultados.errores.length}`);

  if (resultados.actualizados.length > 0) {
    console.log('\n📝 VAs actualizados:');
    resultados.actualizados.forEach(va => {
      console.log(`  - ${va.name} (${va.slug})`);
    });
  }

  if (resultados.creados.length > 0) {
    console.log('\n🆕 VAs creados:');
    resultados.creados.forEach(va => {
      console.log(`  - ${va.name} (${va.slug}) - Item ID: ${va.itemId}`);
    });
  }

  if (resultados.errores.length > 0) {
    console.log('\n❌ Errores:');
    resultados.errores.forEach(va => {
      console.log(`  - ${va.name} (${va.slug}): ${va.error}`);
    });
  }

  // Guardar resultados
  fs.writeFileSync('src/data/RESULTADOS_CARGA_VAS.json', JSON.stringify(resultados, null, 2));
  console.log('\n✅ Resultados guardados en: src/data/RESULTADOS_CARGA_VAS.json');
}

// Ejecutar
cargarVAs().catch(console.error);

