import { NextRequest, NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/adminGuard';
import { prisma } from '@/lib/prisma';
import * as XLSX from 'xlsx';

export async function GET(req: NextRequest) {
  const guard = await requireAdminApi();
  if (guard) return guard;

  const format = req.nextUrl.searchParams.get('format') === 'csv' ? 'csv' : 'xlsx';
  const [regs, fields] = await Promise.all([
    prisma.registration.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.formField.findMany({ orderBy: { order: 'asc' } }),
  ]);

  const headers = ['ID', 'Tarih', ...fields.map((f) => f.labelTr || f.key)];
  const rows = regs.map((r) => {
    let d: Record<string, string> = {};
    try {
      d = JSON.parse(r.data);
    } catch {
      d = {};
    }
    return [
      r.id,
      r.createdAt.toISOString(),
      ...fields.map((f) => d[f.key] ?? ''),
    ];
  });

  const aoa = [headers, ...rows];
  const sheet = XLSX.utils.aoa_to_sheet(aoa);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, sheet, 'Kayitlar');

  const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');

  if (format === 'csv') {
    const csv = XLSX.utils.sheet_to_csv(sheet);
    return new NextResponse('﻿' + csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="imec-kayitlar-${stamp}.csv"`,
      },
    });
  }

  const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' }) as Buffer;
  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="imec-kayitlar-${stamp}.xlsx"`,
    },
  });
}
