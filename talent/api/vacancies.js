import { getVacancies, saveVacancies } from './lib/blob.js';
import { verifyAuth } from './lib/auth.js';

function generateId() {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
  } catch {
    // ignore and fallback
  }
  return Math.random().toString(36).slice(2);
}

function isValidUrl(value) {
  try {
    // eslint-disable-next-line no-new
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export async function GET() {
  try {
    let vacancies = await getVacancies();
    if (!Array.isArray(vacancies)) vacancies = [];
    // Evitar duplicados por id (p. ej. si hubo varios blobs en el pasado)
    const byId = new Map();
    vacancies.forEach((v) => {
      if (v && v.id) byId.set(v.id, v);
    });
    vacancies = Array.from(byId.values());
    return Response.json(vacancies);
  } catch (e) {
    return Response.json({ error: 'Failed to load vacancies' }, { status: 500 });
  }
}

export async function POST(request) {
  const user = await verifyAuth(request);
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { title, url, buttonLabel } = body || {};

  if (!title || typeof title !== 'string' || !title.trim()) {
    return Response.json({ error: 'Title is required' }, { status: 400 });
  }
  if (!url || typeof url !== 'string' || !url.trim()) {
    return Response.json({ error: 'URL is required' }, { status: 400 });
  }
  if (!isValidUrl(url.trim())) {
    return Response.json({ error: 'URL is not valid' }, { status: 400 });
  }

  const cleanTitle = title.trim();
  const cleanUrl = url.trim();
  const cleanButton =
    typeof buttonLabel === 'string' && buttonLabel.trim() ? buttonLabel.trim() : undefined;

  const newVacancy = {
    id: generateId(),
    title: cleanTitle,
    url: cleanUrl,
    ...(cleanButton ? { buttonLabel: cleanButton } : {}),
  };

  try {
    const vacancies = await getVacancies();
    const updated = Array.isArray(vacancies) ? [...vacancies, newVacancy] : [newVacancy];
    await saveVacancies(updated);
    return Response.json(newVacancy, { status: 201 });
  } catch (e) {
    const msg = e?.message || String(e);
    return Response.json(
      { error: 'Failed to save vacancy', detail: msg },
      { status: 500 }
    );
  }
}

