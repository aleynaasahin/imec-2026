import { NextRequest, NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/adminGuard';
import { prisma } from '@/lib/prisma';
import * as XLSX from 'xlsx';

export async function GET(req: NextRequest) {
  const guard = await requireAdminApi();
  if (guard) return guard;

  const format = req.nextUrl.searchParams.get('format') === 'csv' ? 'csv' : 'xlsx';
  const rows = await prisma.speakerSurveyResponse.findMany({ orderBy: { createdAt: 'desc' } });

  const headers = [
    'ID',
    'Tarih',
    'Ad Soyad',
    'E-posta',
    'Kurum/Unvan',
    'Kayıt oldu mu',
    'LinkedIn takipçisi mi',
    'Yakınlarına tavsiye eder mi',
    'WhatsApp grubu onayı',
    'WhatsApp telefon',
    'Bilgi düzeltme talebi',
    'Tanıtım amaçlı kullanım onayı',
    'Fotoğraf URL',
    'Sunum metni gönderimi',
    'YouTube yayın/kanal onayı',
    'Dergide yer alma izni',
    'Ulaşım/konaklama ihtiyacı',
    'Ulaşım/konaklama detayı',
  ];

  const aoa = [
    headers,
    ...rows.map((r) => [
      r.id,
      r.createdAt.toISOString(),
      r.fullName,
      r.email,
      r.organization,
      r.registered,
      r.followsLinkedin,
      r.recommendOthers,
      r.joinWhatsapp,
      r.whatsappPhone,
      r.infoCorrection,
      r.mediaConsent,
      r.photoUrl,
      r.paperSubmission,
      r.youtubeConsent,
      r.journalConsent,
      r.travelNeeded,
      r.travelDetails,
    ]),
  ];

  const sheet = XLSX.utils.aoa_to_sheet(aoa);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, sheet, 'Konusmaci Anketi');

  const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');

  if (format === 'csv') {
    const csv = XLSX.utils.sheet_to_csv(sheet);
    return new NextResponse('﻿' + csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="imec-konusmaci-anketi-${stamp}.csv"`,
      },
    });
  }

  const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' }) as Buffer;
  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="imec-konusmaci-anketi-${stamp}.xlsx"`,
    },
  });
}
