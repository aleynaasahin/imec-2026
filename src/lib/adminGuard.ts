import { getSessionUser } from './auth';
import { NextResponse } from 'next/server';

export async function requireAdminApi(): Promise<NextResponse | null> {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return null;
}

export async function requireAdminAction(): Promise<void> {
  const user = await getSessionUser();
  if (!user) throw new Error('Unauthorized');
}
