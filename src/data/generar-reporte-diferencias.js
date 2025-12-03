// Script para generar reporte de diferencias entre CSV y Webflow
import fs from 'fs';

// Datos de Webflow obtenidos anteriormente
const webflowVAs = [
  { slug: 'karen', name: 'Karen', 'experience-years': '4 years', languages: 'Bilingual (EN-ES)', availability: 'Full Time', 'main-category': 'Executive Virtual Assistant, Insurance Virtual Assistant', specialization: ['home-insurance'], video: 'https://youtu.be/TXb9ONnF310', 'profile-slug-2': '/karen-ocean-va-profile', image: 'https://cdn.prod.website-files.com/66fd75f52a0ded63ad5ec1db/691d00d9df3b2cbf3b543e7d_Karen.webp' },
  { slug: 'joana', name: 'Joana', 'experience-years': 'null years', languages: 'Bilingual (EN-ES)', availability: 'Full Time', 'main-category': 'Executive Virtual Assistant, Insurance Virtual Assistant', specialization: ['executive-assistant'], video: 'https://youtu.be/PrZ7xZryyjQ', 'profile-slug-2': '/joana-ocean-va-profile', image: 'https://cdn.prod.website-files.com/66fd75f52a0ded63ad5ec1db/691d00e08c377cb123ea65c0_Joana.webp' },
  { slug: 'abigail', name: 'Abigail', 'experience-years': '3 years', languages: 'English', availability: 'Full Time', 'main-category': 'Insurance Virtual Assistant', specialization: ['health-insurance'], video: 'https://youtu.be/z3hiwu0mPc8', 'profile-slug-2': '/abigail-ocean-va-profile', image: 'https://cdn.prod.website-files.com/66fd75f52a0ded63ad5ec1db/691d00bc95e79d5e69274efb_Abigail.webp' },
  { slug: 'jasmine', name: 'Jasmine', 'experience-years': 'Trained insurance', languages: 'English', availability: 'Part Time', 'main-category': 'Executive Virtual Assistant, Healthcare Virtual Assistant, Insurance Virtual Assistant', specialization: ['executive-assistant'], video: 'https://youtu.be/WhdFCM1GABs', 'profile-slug-2': '/jasmine-ocean-va-profile', image: 'https://cdn.prod.website-files.com/66fd75f52a0ded63ad5ec1db/691cffde142c4013f3773a65_Jasmine.webp' },
  { slug: 'jill', name: 'Jill', 'experience-years': 'Trained insurance', languages: 'English', availability: 'Part Time', 'main-category': 'Executive Virtual Assistant, Insurance Virtual Assistant', specialization: ['executive-assistant'], video: 'https://youtu.be/7yREE7oxSu0', 'profile-slug-2': '/jill-ocean-va-profile', image: 'https://cdn.prod.website-files.com/66fd75f52a0ded63ad5ec1db/691cffd08ac4932a549ff849_Jill.webp' },
  { slug: 'ana', name: 'Ana', 'experience-years': 'Trained insurance', languages: 'English', availability: 'Assigned', 'main-category': 'Executive Virtual Assistant, Insurance Virtual Assistant', specialization: ['executive-assistant', 'real-estate'], video: 'https://youtu.be/XloA9MBGtGA', 'profile-slug-2': '/ana-s-ocean-va-profile', image: 'https://cdn.prod.website-files.com/66fd75f52a0ded63ad5ec1db/691cffbca07b481ffc0e81fb_Ana.webp' },
  { slug: 'balbina', name: 'Balbina', 'experience-years': 'Trained insurance', languages: 'English', availability: 'Assigned', 'main-category': 'Executive Virtual Assistant, Insurance Virtual Assistant', specialization: ['executive-assistant'], video: 'https://youtu.be/sESom3C4Tjk', 'profile-slug-2': '/balbina-ocean-va-profile', image: 'https://cdn.prod.website-files.com/66fd75f52a0ded63ad5ec1db/691cffa59017228f265d156e_Balbina.webp' },
  { slug: 'brandon', name: 'Brandon L.', 'experience-years': '2 years', languages: 'English', availability: 'Assigned', 'main-category': 'Insurance Virtual Assistant', specialization: ['health-insurance', 'healthcare-insurance'], video: 'https://youtu.be/PVmxKa19Mz0', 'profile-slug-2': '/brandon-l-ocean-va-profile', image: 'https://cdn.prod.website-files.com/66fd75f52a0ded63ad5ec1db/691cff9acc8058348f30ae01_Brandon%20L.webp' },
  { slug: 'janice', name: 'Janice', 'experience-years': 'Trained insurance', languages: 'English', availability: 'Assigned', 'main-category': 'Executive Virtual Assistant, Insurance Virtual Assistant', specialization: ['executive-assistant'], video: 'https://youtu.be/P8gcQHNJwsk', 'profile-slug-2': '/janice-ocean-va-profile', image: 'https://cdn.prod.website-files.com/66fd75f52a0ded63ad5ec1db/691cff26333a2214cc2eee14_Janice.webp' }
];

// Leer CSV mapeado
const csvVAs = JSON.parse(fs.readFileSync('src/data/csv-vas-mapped.json', 'utf-8'));

// Crear mapa de Webflow por slug
const webflowMap = new Map();
webflowVAs.forEach(va => {
  webflowMap.set(va.slug, va);
});

// Comparar
const reporte = {
  nuevos: [],
  existentes: [],
  diferencias: []
};

csvVAs.forEach(csvVA => {
  const webflowVA = webflowMap.get(csvVA.slug);
  
  if (!webflowVA) {
    reporte.nuevos.push({
      name: csvVA.name,
      slug: csvVA.slug,
      'item-id': csvVA['item-id'] || 'NUEVO'
    });
  } else {
    const diferencias = {};
    const campos = ['name', 'experience-years', 'languages', 'availability', 'main-category', 'specialization', 'video', 'profile-slug-2', 'image'];
    
    campos.forEach(campo => {
      const csvVal = csvVA[campo];
      const webflowVal = webflowVA[campo];
      
      if (campo === 'specialization') {
        const csvSpecs = parseSpecializations(csvVal);
        const webflowSpecs = Array.isArray(webflowVal) ? webflowVal.map(s => s.toLowerCase()) : [];
        if (!compareArrays(csvSpecs, webflowSpecs)) {
          diferencias[campo] = { csv: csvSpecs, webflow: webflowSpecs };
        }
      } else if (campo === 'image') {
        const csvUrl = csvVal;
        const webflowUrl = typeof webflowVal === 'object' ? webflowVal?.url : webflowVal;
        if (csvUrl !== webflowUrl) {
          diferencias[campo] = { csv: csvUrl, webflow: webflowUrl };
        }
      } else {
        if (String(csvVal || '').trim() !== String(webflowVal || '').trim()) {
          diferencias[campo] = { csv: csvVal, webflow: webflowVal };
        }
      }
    });
    
    if (Object.keys(diferencias).length > 0) {
      reporte.diferencias.push({
        name: csvVA.name,
        slug: csvVA.slug,
        'item-id': csvVA['item-id'],
        diferencias
      });
    } else {
      reporte.existentes.push({
        name: csvVA.name,
        slug: csvVA.slug,
        'item-id': csvVA['item-id']
      });
    }
  }
});

function parseSpecializations(specString) {
  if (!specString) return [];
  return specString
    .split(/[,;]/)
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .map(s => s.toLowerCase());
}

function compareArrays(arr1, arr2) {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  return set1.size === set2.size && [...set1].every(v => set2.has(v));
}

// Guardar reporte
fs.writeFileSync('src/data/REPORTE_DIFERENCIAS_VAS.json', JSON.stringify(reporte, null, 2));

console.log('📊 Reporte de Diferencias Generado\n');
console.log(`✅ VAs sin cambios: ${reporte.existentes.length}`);
console.log(`⚠️  VAs con diferencias: ${reporte.diferencias.length}`);
console.log(`🆕 VAs nuevos: ${reporte.nuevos.length}\n`);

if (reporte.diferencias.length > 0) {
  console.log('⚠️  VAs con diferencias:');
  reporte.diferencias.forEach(va => {
    console.log(`\n${va.name} (${va.slug}):`);
    Object.keys(va.diferencias).forEach(campo => {
      console.log(`  - ${campo}:`);
      console.log(`    CSV: ${JSON.stringify(va.diferencias[campo].csv)}`);
      console.log(`    Webflow: ${JSON.stringify(va.diferencias[campo].webflow)}`);
    });
  });
}

if (reporte.nuevos.length > 0) {
  console.log('\n🆕 VAs nuevos:');
  reporte.nuevos.forEach(va => {
    console.log(`  - ${va.name} (${va.slug})`);
  });
}

console.log('\n✅ Reporte guardado en: src/data/REPORTE_DIFERENCIAS_VAS.json');

