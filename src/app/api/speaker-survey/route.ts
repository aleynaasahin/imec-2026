import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { put } from '@vercel/blob';
import path from 'path';
import fs from 'fs/promises';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const get = (k: string) => (formData.get(k)?.toString() ?? '').trim();

  const fullName = get('fullName');
  const email = get('email');
  if (!fullName || !email) {
    return NextResponse.json({ error: 'Ad Soyad ve e-posta zorunludur.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Geçersiz e-posta formatı.' }, { status: 400 });
  }

  let photoUrl = '';
  const file = formData.get('photo');
  if (file instanceof File && file.size > 0) {
    if (file.size > 8 * 1024 * 1024) {
      return NextResponse.json({ error: 'Fotoğraf çok büyük (en fazla 8MB).' }, { status: 400 });
    }
    if (!/^image\//.test(file.type)) {
      return NextResponse.json({ error: 'Yalnızca görsel dosyası yükleyebilirsiniz.' }, { status: 400 });
    }
    const ext = path.extname(file.name || '').toLowerCase();
    const safeExt = /^\.(png|jpe?g|webp|gif)$/i.test(ext) ? ext : '.jpg';
    const fileName = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}${safeExt}`;

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`speaker-survey/${fileName}`, file, {
        access: 'public',
        contentType: file.type || undefined,
      });
      photoUrl = blob.url;
    } else {
      const dir = path.join(process.cwd(), 'public', 'uploads');
      await fs.mkdir(dir, { recursive: true });
      const buffer = Buffer.from(await file.arrayBuffer());
      const localName = `survey-${fileName}`;
      await fs.writeFile(path.join(dir, localName), buffer);
      photoUrl = `/uploads/${localName}`;
    }
  }

  await prisma.speakerSurveyResponse.create({
    data: {
      fullName: fullName.slice(0, 300),
      email: email.slice(0, 300),
      organization: get('organization').slice(0, 300),
      registered: get('registered').slice(0, 50),
      followsLinkedin: get('followsLinkedin').slice(0, 50),
      recommendOthers: get('recommendOthers').slice(0, 50),
      joinWhatsapp: get('joinWhatsapp').slice(0, 50),
      whatsappPhone: get('whatsappPhone').slice(0, 100),
      infoCorrection: get('infoCorrection').slice(0, 5000),
      mediaConsent: get('mediaConsent').slice(0, 50),
      photoUrl,
      paperSubmission: get('paperSubmission').slice(0, 50),
      youtubeConsent: get('youtubeConsent').slice(0, 50),
      journalConsent: get('journalConsent').slice(0, 50),
      travelNeeded: get('travelNeeded').slice(0, 50),
      travelDetails: get('travelDetails').slice(0, 5000),
    },
  });

  return NextResponse.json({ ok: true });
}
