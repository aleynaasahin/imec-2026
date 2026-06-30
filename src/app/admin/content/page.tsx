import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { requireAdminAction } from '@/lib/adminGuard';

export const dynamic = 'force-dynamic';

async function saveText(formData: FormData) {
  'use server';
  await requireAdminAction();
  const id = Number(formData.get('id'));
  const tr = String(formData.get('tr') || '');
  const en = String(formData.get('en') || '');
  if (!Number.isFinite(id)) return;
  await prisma.text.update({ where: { id }, data: { tr, en } });
  revalidatePath('/admin/content');
  revalidatePath('/', 'layout');
}

export default async function AdminContentPage() {
  const rows = await prisma.text.findMany({ orderBy: [{ group: 'asc' }, { key: 'asc' }] });
  const grouped = new Map<string, typeof rows>();
  for (const r of rows) {
    const arr = grouped.get(r.group) || [];
    arr.push(r);
    grouped.set(r.group, arr);
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="h-display text-2xl">Metinler</h1>
        <p className="text-sm text-brand-ink/65 mt-1">
          Tüm site metinleri burada Türkçe ve İngilizce olarak düzenlenir. Değişiklikler kaydedildiğinde sitede anında görünür olur.
        </p>
      </header>

      {[...grouped.entries()].map(([group, items]) => (
        <section key={group} className="card">
          <h2 className="font-semibold text-brand-ink mb-3 capitalize">{group.replace(/_/g, ' ')}</h2>
          <div className="grid gap-4">
            {items.map((row) => (
              <form key={row.id} action={saveText} className="grid gap-2 border-t border-brand-ink/5 pt-4 first:border-0 first:pt-0">
                <input type="hidden" name="id" value={row.id} />
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div>
                    <p className="text-sm font-medium text-brand-ink">{row.label || row.key}</p>
                    <p className="text-xs text-brand-ink/50">{row.key}</p>
                  </div>
                  <button type="submit" className="btn-primary !py-1.5 !px-3 !text-sm">
                    Kaydet
                  </button>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="label">Türkçe</label>
                    {row.multiline ? (
                      <textarea name="tr" defaultValue={row.tr} className="input min-h-[100px]" />
                    ) : (
                      <input name="tr" defaultValue={row.tr} className="input" />
                    )}
                  </div>
                  <div>
                    <label className="label">English</label>
                    {row.multiline ? (
                      <textarea name="en" defaultValue={row.en} className="input min-h-[100px]" />
                    ) : (
                      <input name="en" defaultValue={row.en} className="input" />
                    )}
                  </div>
                </div>
              </form>
            ))}
          </div>
        </section>
      ))}
      {rows.length === 0 ? (
        <p className="text-brand-ink/60">Henüz tanımlı bir metin yok. `npm run seed` çalıştırın.</p>
      ) : null}
    </div>
  );
}
