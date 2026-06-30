import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { requireAdminAction } from '@/lib/adminGuard';

export const dynamic = 'force-dynamic';

function fd(d: Date) {
  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

async function deleteReg(formData: FormData) {
  'use server';
  await requireAdminAction();
  const id = Number(formData.get('id'));
  await prisma.registration.delete({ where: { id } });
  revalidatePath('/admin/registrations');
}

export default async function AdminRegistrationsPage() {
  const [regs, fields] = await Promise.all([
    prisma.registration.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.formField.findMany({ orderBy: { order: 'asc' } }),
  ]);

  const parsed = regs.map((r) => {
    let data: Record<string, string> = {};
    try {
      data = JSON.parse(r.data);
    } catch {
      data = {};
    }
    return { id: r.id, createdAt: r.createdAt, data };
  });

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="h-display text-2xl">Kayıtlar</h1>
          <p className="text-sm text-brand-ink/65 mt-1">
            Toplam <strong>{regs.length}</strong> kayıt. Tabloyu Excel veya CSV olarak indirebilirsiniz.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a href="/api/admin/registrations/export?format=xlsx" className="btn-primary !py-1.5 !px-3 !text-sm">
            Excel İndir (.xlsx)
          </a>
          <a href="/api/admin/registrations/export?format=csv" className="btn-secondary !py-1.5 !px-3 !text-sm">
            CSV İndir
          </a>
        </div>
      </header>

      {parsed.length === 0 ? (
        <div className="card text-brand-ink/60">Henüz kayıt yok.</div>
      ) : (
        <div className="overflow-x-auto card !p-0">
          <table className="min-w-full text-sm">
            <thead className="bg-brand-paper">
              <tr>
                <th className="text-left p-3 font-semibold text-brand-ink">#</th>
                <th className="text-left p-3 font-semibold text-brand-ink">Tarih</th>
                {fields.map((f) => (
                  <th key={f.id} className="text-left p-3 font-semibold text-brand-ink">{f.labelTr || f.key}</th>
                ))}
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {parsed.map((r) => (
                <tr key={r.id} className="border-t border-brand-ink/5">
                  <td className="p-3 text-brand-ink/70">{r.id}</td>
                  <td className="p-3 text-brand-ink/70 whitespace-nowrap">{fd(r.createdAt)}</td>
                  {fields.map((f) => (
                    <td key={f.id} className="p-3 text-brand-ink/80 max-w-xs">
                      <span className="block truncate" title={r.data[f.key] || ''}>
                        {r.data[f.key] || '—'}
                      </span>
                    </td>
                  ))}
                  <td className="p-3">
                    <form action={deleteReg}>
                      <input type="hidden" name="id" value={r.id} />
                      <button type="submit" className="btn-danger">Sil</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
