import { SignJWT } from 'jose';

const USER = process.env.TALENT_ADMIN_USER || '';
const PASS = process.env.TALENT_ADMIN_PASSWORD || '';
const JWT_SECRET = new TextEncoder().encode(process.env.TALENT_ADMIN_JWT_SECRET || 'change-me');

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body || {};
    if (!USER || !PASS || !process.env.TALENT_ADMIN_JWT_SECRET) {
      return Response.json({ error: 'Server not configured' }, { status: 500 });
    }
    if (username !== USER || password !== PASS) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    const token = await new SignJWT({ user: username })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('2h')
      .sign(JWT_SECRET);
    return Response.json({ token });
  } catch (e) {
    return Response.json({ error: 'Bad request' }, { status: 400 });
  }
}
