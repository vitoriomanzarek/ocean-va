import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.TALENT_ADMIN_JWT_SECRET || '');

export async function verifyAuth(request) {
  const auth = request.headers.get('Authorization') || '';
  const token = auth.replace(/^Bearer\s+/i, '').trim();
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch {
    return null;
  }
}
