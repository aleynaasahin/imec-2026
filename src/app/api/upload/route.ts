import { NextRequest, NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/adminGuard';
import { put } from '@vercel/blob';
import path from 'path';
import fs from 'fs/promises';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  const guard = await requireAdminApi();
  if (guard) return guard;

  const formData = await req.formData();
  const file = formData.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file' }, { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: 'Dosya çok büyük (en fazla 8MB)' }, { status: 400 });
  }

  const ext = path.extname(file.name || '').toLowerCase() || guessExt(file.type);
  const safeExt = /^\.(png|jpe?g|webp|gif|svg)$/i.test(ext) ? ext : '.png';
  const nameHash = crypto.randomBytes(8).toString('hex');
  const fileName = `${Date.now()}-${nameHash}${safeExt}`;

  // Use Vercel Blob in production (when token is available),
  // local filesystem in development.
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`uploads/${fileName}`, file, {
      access: 'public',
      contentType: file.type || undefined,
    });
    return NextResponse.json({ url: blob.url, name: file.name });
  }

  const dir = path.join(process.cwd(), 'public', 'uploads');
  await fs.mkdir(dir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(dir, fileName), buffer);
  return NextResponse.json({ url: `/uploads/${fileName}`, name: file.name });
}

function guessExt(mime: string): string {
  if (mime === 'image/png') return '.png';
  if (mime === 'image/jpeg') return '.jpg';
  if (mime === 'image/webp') return '.webp';
  if (mime === 'image/gif') return '.gif';
  if (mime === 'image/svg+xml') return '.svg';
  return '.png';
}
