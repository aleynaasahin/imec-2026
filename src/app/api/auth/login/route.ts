import { NextRequest, NextResponse } from 'next/server';
import { verifyCredentials, createSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
  const username = (body.username || '').trim();
  const password = (body.password || '').trim();
  if (!username || !password) {
    return NextResponse.json({ error: 'Kullanıcı adı ve şifre gerekli' }, { status: 400 });
  }
  const ok = await verifyCredentials(username, password);
  if (!ok) return NextResponse.json({ error: 'Hatalı kullanıcı adı veya şifre' }, { status: 401 });
  await createSession(username);
  return NextResponse.json({ ok: true });
}
