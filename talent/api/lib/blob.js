import { put, list } from '@vercel/blob';

const BLOB_KEY = 'talent/vacancies.json';

function pathMatches(pathname) {
  if (!pathname || typeof pathname !== 'string') return false;
  const p = pathname.replace(/^\//, '');
  return p === BLOB_KEY || p.startsWith(BLOB_KEY + '-') || p.startsWith(BLOB_KEY + '.');
}

export async function getVacancies() {
  try {
    const result = await list({ prefix: 'talent/', limit: 100 });
    const blobs = result?.blobs || [];
    const withPrefix = blobs.filter((b) => pathMatches(b.pathname || b.path));
    if (withPrefix.length === 0) return [];
    const byDate = (a, b) => new Date(b.uploadedAt || 0) - new Date(a.uploadedAt || 0);
    const blob = withPrefix.sort(byDate)[0];
    if (!blob || !blob.url) return [];

    const res = await fetch(blob.url, { cache: 'no-store' });
    if (!res.ok) return [];

    const text = await res.text();
    const data = JSON.parse(text || '{}');
    let arr = Array.isArray(data.vacancies) ? data.vacancies : [];
    const byId = new Map();
    arr.forEach((v) => {
      if (v && v.id) byId.set(v.id, v);
    });
    return Array.from(byId.values());
  } catch (err) {
    console.error('[blob] getVacancies error:', err?.message || err);
    return [];
  }
}

export async function saveVacancies(vacancies) {
  // addRandomSuffix: cada guardado crea un archivo nuevo; getVacancies lee el más reciente por fecha
  const blob = await put(BLOB_KEY, JSON.stringify({ vacancies }), {
    access: 'public',
    addRandomSuffix: true,
    contentType: 'application/json',
  });
  return blob;
}
