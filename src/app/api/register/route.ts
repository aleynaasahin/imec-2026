import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  let payload: { data?: Record<string, string>; lang?: string };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const data = payload.data ?? {};
  if (typeof data !== 'object') {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }

  const fields = await prisma.formField.findMany({ where: { enabled: true } });
  for (const f of fields) {
    const v = (data[f.key] || '').toString().trim();
    if (f.required && !v) {
      return NextResponse.json({ error: `Field "${f.key}" is required` }, { status: 400 });
    }
    if (f.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
      return NextResponse.json({ error: `Invalid email format` }, { status: 400 });
    }
  }

  // Only persist defined-field values (no leftovers)
  const clean: Record<string, string> = {};
  for (const f of fields) {
    clean[f.key] = (data[f.key] || '').toString().slice(0, 5000);
  }

  await prisma.registration.create({ data: { data: JSON.stringify(clean) } });
  return NextResponse.json({ ok: true });
}
