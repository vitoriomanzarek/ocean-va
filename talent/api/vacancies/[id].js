import { getVacancies, saveVacancies } from '../lib/blob.js';
import { verifyAuth } from '../lib/auth.js';

function getIdFromRequest(request) {
  try {
    const url = new URL(request.url);
    const parts = url.pathname.split('/').filter(Boolean);
    return parts[parts.length - 1] || '';
  } catch {
    return '';
  }
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

export async function PUT(request) {
  const user = await verifyAuth(request);
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const id = getIdFromRequest(request);
  if (!id) {
    return Response.json({ error: 'Invalid id' }, { status: 400 });
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

  try {
    const vacancies = await getVacancies();
    if (!Array.isArray(vacancies) || vacancies.length === 0) {
      return Response.json({ error: 'Vacancy not found' }, { status: 404 });
    }

    const index = vacancies.findIndex((v) => v.id === id);
    if (index === -1) {
      return Response.json({ error: 'Vacancy not found' }, { status: 404 });
    }

    const cleanTitle = title.trim();
    const cleanUrl = url.trim();
    const cleanButton =
      typeof buttonLabel === 'string' && buttonLabel.trim() ? buttonLabel.trim() : undefined;

    const updatedVacancy = {
      ...vacancies[index],
      title: cleanTitle,
      url: cleanUrl,
      ...(cleanButton ? { buttonLabel: cleanButton } : { buttonLabel: undefined }),
    };

    const updated = [...vacancies];
    updated[index] = updatedVacancy;

    await saveVacancies(updated);
    return Response.json(updatedVacancy);
  } catch (e) {
    return Response.json({ error: 'Failed to update vacancy' }, { status: 500 });
  }
}

export async function DELETE(request) {
  const user = await verifyAuth(request);
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const id = getIdFromRequest(request);
  if (!id) {
    return Response.json({ error: 'Invalid id' }, { status: 400 });
  }

  try {
    const vacancies = await getVacancies();
    if (!Array.isArray(vacancies) || vacancies.length === 0) {
      return Response.json({ error: 'Vacancy not found' }, { status: 404 });
    }

    const filtered = vacancies.filter((v) => v.id !== id);
    if (filtered.length === vacancies.length) {
      return Response.json({ error: 'Vacancy not found' }, { status: 404 });
    }

    await saveVacancies(filtered);
    return new Response(null, { status: 204 });
  } catch (e) {
    return Response.json({ error: 'Failed to delete vacancy' }, { status: 500 });
  }
}

