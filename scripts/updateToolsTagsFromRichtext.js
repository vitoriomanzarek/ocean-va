/**
 * Script para actualizar el campo "Tools Tags" desde "Tools Richtext"
 * para VAs que no tienen tools-tags cargados
 * 
 * Extrae las herramientas del HTML en tools-richtext y las convierte
 * a una lista separada por comas para tools-tags
 */

import 'dotenv/config';

const WEBFLOW_API_BASE = 'https://api.webflow.com/v2';
const VA_COLLECTION_ID = process.env.WEBFLOW_VA_COLLECTION_ID || '691b82a97542c69f3f77fa76';

/**
 * Make request to Webflow API
 */
async function webflowRequest(endpoint, method = 'GET', body = null) {
  const apiToken = process.env.WEBFLOW_API_TOKEN;
  
  if (!apiToken) {
    throw new Error('WEBFLOW_API_TOKEN not configured');
  }

  const url = `${WEBFLOW_API_BASE}${endpoint}`;
  const options = {
    method,
    headers: {
      'Authorization': `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  const responseText = await response.text();
  
  if (!response.ok) {
    let error;
    try {
      error = JSON.parse(responseText);
    } catch (e) {
      error = { message: responseText || response.statusText };
    }
    
    const errorMessage = error.errors || error.message || error.msg || responseText || response.statusText;
    const errorMsg = typeof errorMessage === 'string' 
      ? errorMessage 
      : JSON.stringify(errorMessage, null, 2);
    
    throw new Error(`Webflow API error: ${response.status} - ${errorMsg}`);
  }
  
  return JSON.parse(responseText);
}

// Lista de VAs a actualizar
const VAS_TO_UPDATE = [
  'Patricia Nicole',
  'Louise',
  'Kathleen',
  'Janet',
  'Randean',
  'Joy',
  'Karl',
  'Kempee',
  'Ella',
  'Alyssa',
  'Maria Christine',
  'Maridel',
  'Jane',
  'Joan Rose',
  'Patricio',
  'Jose Luis',
  'Jomer',
  'Hugo',
  'Gael',
  'Fabiola',
  'Angel',
  'Ana Gabriela',
  'Ximena'
];

/**
 * Extrae las herramientas del HTML de tools-richtext
 * @param {string} html - HTML del campo tools-richtext
 * @returns {string[]} Array de herramientas extraídas
 */
function extractToolsFromHTML(html) {
  if (!html || typeof html !== 'string') {
    return [];
  }

  const tools = [];
  
  // Buscar elementos con clase va-tool-item
  // Estructura: <div class="va-tool-item"><span class="va-tool-checkmark">✓</span><span>Tool Name</span></div>
  const toolItemRegex = /<div[^>]*class="[^"]*va-tool-item[^"]*"[^>]*>([\s\S]*?)<\/div>/gi;
  let toolItemMatch;
  
  while ((toolItemMatch = toolItemRegex.exec(html)) !== null) {
    const itemHtml = toolItemMatch[1];
    
    // Buscar todos los spans dentro del item
    const spanRegex = /<span[^>]*>([^<]+)<\/span>/gi;
    const spans = [];
    let spanMatch;
    
    while ((spanMatch = spanRegex.exec(itemHtml)) !== null) {
      spans.push(spanMatch[1].trim());
    }
    
    // El primer span suele ser el checkmark (✓), el segundo es el nombre de la herramienta
    // Pero también puede haber casos donde solo hay un span con el nombre
    for (let i = 0; i < spans.length; i++) {
      const text = spans[i];
      
      // Filtrar checkmarks y elementos vacíos
      if (text && 
          text !== '✓' && 
          !text.match(/^checkmark|check$/i) &&
          text.length > 1 &&
          !text.match(/^<|>$/)) { // Evitar HTML mal formado
        
        // Evitar duplicados
        if (!tools.includes(text)) {
          tools.push(text);
        }
        // Solo tomar el primer span válido (el nombre de la herramienta)
        break;
      }
    }
  }
  
  // Si no encontramos con el método anterior, intentar buscar directamente spans con texto
  // que no tengan la clase va-tool-checkmark
  if (tools.length === 0) {
    // Buscar spans que NO tengan la clase va-tool-checkmark
    const spanWithoutCheckmarkRegex = /<span(?!.*va-tool-checkmark)[^>]*>([^<]+)<\/span>/gi;
    let spanMatch;
    while ((spanMatch = spanWithoutCheckmarkRegex.exec(html)) !== null) {
      const text = spanMatch[1].trim();
      if (text && 
          text !== '✓' && 
          !text.match(/checkmark|check/i) &&
          text.length > 1 &&
          !tools.includes(text)) {
        tools.push(text);
      }
    }
  }
  
  return tools;
}

/**
 * Busca un VA por nombre en Webflow
 * @param {string} name - Nombre del VA
 * @returns {Object|null} Item del VA o null si no se encuentra
 */
async function findVAByName(name) {
  try {
    // Primero intentar buscar por nombre exacto
    const filter = {
      field: 'name',
      operator: 'equals',
      value: name
    };
    
    const response = await webflowRequest(
      `/collections/${VA_COLLECTION_ID}/items?filter=${encodeURIComponent(JSON.stringify(filter))}`
    );
    
    if (response.items && response.items.length > 0) {
      // Verificar que el nombre coincida exactamente
      const exactMatch = response.items.find(item => 
        item.fieldData && item.fieldData.name && item.fieldData.name.trim() === name.trim()
      );
      if (exactMatch) {
        return exactMatch;
      }
      // Si no hay coincidencia exacta, devolver el primero
      return response.items[0];
    }
    
    // Si no se encuentra con nombre exacto, buscar por slug (nombre en minúsculas, sin espacios)
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    const slugFilter = {
      field: 'slug',
      operator: 'equals',
      value: slug
    };
    
    const slugResponse = await webflowRequest(
      `/collections/${VA_COLLECTION_ID}/items?filter=${encodeURIComponent(JSON.stringify(slugFilter))}`
    );
    
    if (slugResponse.items && slugResponse.items.length > 0) {
      return slugResponse.items[0];
    }
    
    // Si aún no se encuentra, buscar todos los items y hacer búsqueda manual
    // (último recurso, puede ser lento)
    console.log(`   🔍 Búsqueda exacta falló, buscando en todos los items...`);
    let offset = 0;
    const limit = 100;
    
    while (true) {
      const allItemsResponse = await webflowRequest(
        `/collections/${VA_COLLECTION_ID}/items?limit=${limit}&offset=${offset}`
      );
      
      if (!allItemsResponse.items || allItemsResponse.items.length === 0) {
        break;
      }
      
      // Buscar por nombre (case-insensitive, parcial)
      const found = allItemsResponse.items.find(item => {
        const itemName = (item.fieldData && item.fieldData.name) || '';
        return itemName.toLowerCase().trim() === name.toLowerCase().trim();
      });
      
      if (found) {
        return found;
      }
      
      if (allItemsResponse.items.length < limit) {
        break;
      }
      
      offset += limit;
    }
    
    return null;
  } catch (error) {
    console.error(`   ❌ Error buscando VA ${name}:`, error.message);
    return null;
  }
}

/**
 * Actualiza el campo tools-tags de un VA
 * @param {string} itemId - ID del item en Webflow
 * @param {string} toolsTags - Herramientas separadas por comas
 */
async function updateToolsTags(itemId, toolsTags) {
  try {
    const response = await webflowRequest(
      `/collections/${VA_COLLECTION_ID}/items/${itemId}`,
      'PATCH',
      {
        fieldData: {
          'tools-tags': toolsTags
        },
        isDraft: false
      }
    );
    
    return response;
  } catch (error) {
    console.error(`Error actualizando tools-tags:`, error.message);
    throw error;
  }
}

/**
 * Función principal
 */
async function main() {
  console.log('🔧 Actualizando Tools Tags desde Tools Richtext\n');
  console.log(`📋 VAs a procesar: ${VAS_TO_UPDATE.length}\n`);
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  const results = {
    success: [],
    skipped: [],
    notFound: [],
    errors: []
  };
  
  for (const vaName of VAS_TO_UPDATE) {
    console.log(`\n🔍 Procesando: ${vaName}`);
    
    try {
      // Buscar VA
      const vaItem = await findVAByName(vaName);
      
      if (!vaItem) {
        console.log(`   ⚠️  No encontrado en Webflow CMS`);
        results.notFound.push(vaName);
        continue;
      }
      
      const itemId = vaItem.id || vaItem._id;
      if (!itemId) {
        console.log(`   ⚠️  No se pudo obtener el ID del item`);
        results.errors.push({ name: vaName, error: 'No item ID found' });
        continue;
      }
      
      console.log(`   ✅ Encontrado: ${vaItem.fieldData.name} (ID: ${itemId})`);
      console.log(`   Slug: ${vaItem.fieldData.slug || 'N/A'}`);
      
      // Obtener tools-richtext
      const toolsRichtext = vaItem.fieldData['tools-richtext'] || '';
      const currentToolsTags = vaItem.fieldData['tools-tags'] || '';
      
      if (!toolsRichtext || toolsRichtext.trim() === '') {
        console.log(`   ⚠️  No tiene tools-richtext, saltando...`);
        results.skipped.push({ name: vaName, reason: 'No tools-richtext' });
        continue;
      }
      
      if (currentToolsTags && currentToolsTags.trim() !== '') {
        console.log(`   ⚠️  Ya tiene tools-tags: "${currentToolsTags.substring(0, 50)}..."`);
        console.log(`   Actualizando de todas formas...`);
      }
      
      // Extraer herramientas del HTML
      console.log(`   📝 Extrayendo herramientas del HTML...`);
      const tools = extractToolsFromHTML(toolsRichtext);
      
      if (tools.length === 0) {
        console.log(`   ⚠️  No se pudieron extraer herramientas del HTML`);
        results.skipped.push({ name: vaName, reason: 'No tools extracted' });
        continue;
      }
      
      // Crear string separado por comas
      const toolsTags = tools.join(', ');
      
      console.log(`   📋 Herramientas extraídas (${tools.length}):`);
      tools.forEach((tool, index) => {
        console.log(`      ${index + 1}. ${tool}`);
      });
      console.log(`   📤 Tools Tags a cargar: "${toolsTags}"`);
      
      // Actualizar en Webflow
      await updateToolsTags(itemId, toolsTags);
      
      console.log(`   ✅ Tools Tags actualizado exitosamente`);
      results.success.push({ name: vaName, toolsCount: tools.length, toolsTags });
      
    } catch (error) {
      console.error(`   ❌ Error procesando ${vaName}:`, error.message);
      results.errors.push({ name: vaName, error: error.message });
    }
  }
  
  // Resumen
  console.log('\n\n════════════════════════════════════════════════════════════════════════════════');
  console.log('📊 RESUMEN');
  console.log('════════════════════════════════════════════════════════════════════════════════\n');
  
  console.log(`✅ Actualizados exitosamente: ${results.success.length}`);
  results.success.forEach(r => {
    console.log(`   - ${r.name} (${r.toolsCount} herramientas)`);
  });
  
  console.log(`\n⚠️  Omitidos: ${results.skipped.length}`);
  results.skipped.forEach(r => {
    console.log(`   - ${r.name}: ${r.reason}`);
  });
  
  console.log(`\n❌ No encontrados: ${results.notFound.length}`);
  results.notFound.forEach(name => {
    console.log(`   - ${name}`);
  });
  
  console.log(`\n❌ Errores: ${results.errors.length}`);
  results.errors.forEach(r => {
    console.log(`   - ${r.name}: ${r.error}`);
  });
  
  console.log('\n════════════════════════════════════════════════════════════════════════════════\n');
}

main().catch(console.error);
