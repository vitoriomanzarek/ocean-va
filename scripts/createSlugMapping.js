/**
 * Script para crear mapeo de slugs del CMS a slugs de URL
 */

const slugMapping = {
  // VAs que necesitan mapeo especial
  'aaron-a0d16': 'aaron',
  'karl-bd0a3': 'karl',
  'bernadette-abellana': 'bernadette',
  'vicente-penaflor': 'vicente',
  'louise-a-siloterio': 'louise',
  'ximena-4e77d': 'ximena',
  'grace': 'grace-carmel',
  'maria-d': 'maria-d',
  'ellen': 'ellen-rose',
  'brandon': 'brandon-l',
  'ana': 'ana-s',
  'rona': 'rona-mae',
  'joji': 'joji-marie',
  'jay': 'jay-alvin',
  'cherry': 'cherry-mae',
  
  // Otros que pueden necesitar mapeo
  'ximena': 'ximena-g', // Ximena G.
};

// Función para obtener el slug de URL desde el slug del CMS
function getUrlSlug(cmsSlug) {
  // Primero verificar si hay un mapeo explícito
  if (slugMapping[cmsSlug]) {
    return slugMapping[cmsSlug];
  }
  
  // Si no hay mapeo, usar el slug del CMS tal cual
  return cmsSlug;
}

// Función para construir la URL completa
function buildProfileUrl(cmsSlug) {
  const urlSlug = getUrlSlug(cmsSlug);
  return `https://www.oceanvirtualassistant.com/${urlSlug}-ocean-va-profile`;
}

// Exportar para usar en otros scripts
export { getUrlSlug, buildProfileUrl, slugMapping };

// Si se ejecuta directamente, mostrar algunos ejemplos
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('Mapeo de slugs:\n');
  Object.entries(slugMapping).forEach(([cms, url]) => {
    console.log(`  ${cms} → ${url}`);
    console.log(`    URL: ${buildProfileUrl(cms)}\n`);
  });
}
