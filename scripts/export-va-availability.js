// Export VA list (name, slug, availability) from Webflow CMS
// Usage:
//  1) Asegúrate de tener WEBFLOW_API_TOKEN y (opcional) WEBFLOW_VA_COLLECTION_ID en tu .env
//  2) Ejecuta: node scripts/export-va-availability.js
//  3) Revisa el archivo generado en: reports/va-availability.csv

import 'dotenv/config';
import fs from 'fs';
import path from 'path';

const WEBFLOW_API_BASE = 'https://api.webflow.com/v2';
const VA_COLLECTION_ID =
  process.env.WEBFLOW_VA_COLLECTION_ID || '691b82a97542c69f3f77fa76';

const API_TOKEN = process.env.WEBFLOW_API_TOKEN || process.env.WEBFLOW_TOKEN;

if (!API_TOKEN) {
  console.error(
    'ERROR: Falta WEBFLOW_API_TOKEN (o WEBFLOW_TOKEN) en variables de entorno.'
  );
  process.exit(1);
}

async function webflowRequest(endpoint, params = {}) {
  const url = new URL(`${WEBFLOW_API_BASE}${endpoint}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  });

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `Webflow API error ${res.status}: ${res.statusText} - ${text}`
    );
  }

  return res.json();
}

async function fetchAllVAItems() {
  const allItems = [];
  let offset = 0;
  const limit = 100;

  // Webflow v2 collections/items soporta paginación con offset + limit
  // Loop hasta que no regresen más items
  while (true) {
    console.log(
      `Fetching items batch: offset=${offset}, limit=${limit} (collection ${VA_COLLECTION_ID})`
    );

    const data = await webflowRequest(
      `/collections/${VA_COLLECTION_ID}/items`,
      {
        offset,
        limit,
      }
    );

    const items = data.items || data.collectionItems || [];

    if (!items.length) break;

    allItems.push(...items);

    if (items.length < limit) {
      break; // última página
    }

    offset += limit;
  }

  console.log(`Total VA items fetched: ${allItems.length}`);
  return allItems;
}

function toCsvValue(value) {
  if (value == null) return '';
  const str = String(value);
  if (str.includes('"') || str.includes(',') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

async function main() {
  try {
    const items = await fetchAllVAItems();

    const rows = [];
    rows.push(['name', 'slug', 'availability']); // header

    for (const item of items) {
      const fields = item.fieldData || item.fields || {};

      const name = fields.name || '';
      const slug = fields.slug || item.slug || '';
      const availability = fields.availability || fields['availability'] || '';

      rows.push([
        toCsvValue(name),
        toCsvValue(slug),
        toCsvValue(availability),
      ]);
    }

    const csvContent = rows.map((r) => r.join(',')).join('\n');

    const reportsDir = path.join(process.cwd(), 'reports');
    fs.mkdirSync(reportsDir, { recursive: true });

    const outPath = path.join(reportsDir, 'va-availability.csv');
    fs.writeFileSync(outPath, csvContent, 'utf8');

    console.log(`Export completado. Archivo generado: ${outPath}`);
  } catch (err) {
    console.error('Error al exportar VAs desde Webflow:');
    console.error(err);
    process.exit(1);
  }
}

main();

