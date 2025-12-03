// Script para preparar los datos de carga de VAs
import fs from 'fs';
import { parse } from 'csv-parse/sync';

// Leer CSV
const csvContent = fs.readFileSync('src/data/VAs Database - Executive Virtual Assistants.csv', 'utf-8');
const records = parse(csvContent, {
  columns: true,
  skip_empty_lines: true,
  delimiter: ';',
  relax_column_count: true,
  trim: true
});

// Mapeo de cambios específicos según comentarios del usuario
const cambiosEspecificos = {
  'karen': { skipFields: ['main-category', 'main-categories', 'specialization'] },
  'joana': { updateFields: ['experience-years'], skipFields: ['main-category', 'main-categories', 'specialization'] },
  'abigail': { updateFields: ['main-categories'] },
  'jasmine': { updateFields: ['experience-years'], skipFields: ['main-category', 'main-categories', 'specialization'] },
  'jill': { updateFields: ['experience-years'], skipFields: ['main-category', 'main-categories', 'specialization'] },
  'ana': { updateFields: ['experience-years'], skipFields: ['main-category', 'main-categories', 'specialization'] },
  'balbina': { updateFields: ['experience-years'], skipFields: ['main-category', 'main-categories', 'specialization'] },
  'brandon': { updateFields: ['all'] },
  'janice': { updateFields: ['experience-years'], skipFields: ['main-category', 'main-categories', 'specialization'] }
};

// Función para parsear Main Categories
function parseMainCategories(csvValue) {
  if (!csvValue) return [];
  return csvValue.split(',').map(c => c.trim()).filter(c => c.length > 0);
}

// Función para parsear Specializations
function parseSpecializations(csvValue) {
  if (!csvValue) return [];
  return csvValue.split(',').map(s => s.trim()).filter(s => s.length > 0);
}

// Preparar datos para cada VA
const vasPreparados = records.map(record => {
  const slug = record.Slug;
  const itemId = record['Item ID'];
  const cambios = cambiosEspecificos[slug];
  const esNuevo = !itemId || itemId.trim() === '';

  const va = {
    name: record.Name,
    slug: slug,
    itemId: itemId || null,
    esNuevo: esNuevo,
    cambios: cambios || null,
    fieldData: {}
  };

  // Name y Slug siempre se incluyen
  va.fieldData.name = record.Name;
  va.fieldData.slug = record.Slug;

  // Experience
  if (!cambios || cambios.updateFields?.includes('experience-years') || cambios.updateFields?.includes('all')) {
    va.fieldData['experience-years'] = record['Experience (Years)'];
  }

  // Languages
  if (!cambios?.skipFields?.includes('languages') || cambios?.updateFields?.includes('all')) {
    va.fieldData.languages = record.Languages;
  }

  // Availability
  if (!cambios?.skipFields?.includes('availability') || cambios?.updateFields?.includes('all')) {
    va.fieldData.availability = record.Availability;
  }

  // Main Categories (necesita mapeo a IDs)
  if (!cambios?.skipFields?.includes('main-categories') || cambios?.updateFields?.includes('all')) {
    va.mainCategoriesRaw = parseMainCategories(record['Main Categories']);
  }

  // Specialization (necesita mapeo a IDs)
  if (!cambios?.skipFields?.includes('specialization') || cambios?.updateFields?.includes('all')) {
    va.specializationRaw = parseSpecializations(record.Specialization);
  }

  // Video
  if (!cambios?.skipFields?.includes('video') || cambios?.updateFields?.includes('all')) {
    if (record.Video) {
      va.fieldData.video = record.Video;
    }
  }

  // Image
  if (!cambios?.skipFields?.includes('image') || cambios?.updateFields?.includes('all')) {
    if (record['VA Image']) {
      va.fieldData.image = record['VA Image'];
    }
  }

  // Profile Slug
  if (!cambios?.skipFields?.includes('profile-slug-2') || cambios?.updateFields?.includes('all')) {
    if (record['Profile Slug']) {
      va.fieldData['profile-slug-2'] = record['Profile Slug'];
    }
  }

  return va;
});

// Guardar datos preparados
fs.writeFileSync('src/data/vas-preparados.json', JSON.stringify(vasPreparados, null, 2));

console.log('✅ Datos preparados:');
console.log(`   - Total VAs: ${vasPreparados.length}`);
console.log(`   - VAs existentes: ${vasPreparados.filter(v => !v.esNuevo).length}`);
console.log(`   - VAs nuevos: ${vasPreparados.filter(v => v.esNuevo).length}`);
console.log('\n📝 Archivo guardado en: src/data/vas-preparados.json');

