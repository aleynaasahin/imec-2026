import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { requireAdminAction } from '@/lib/adminGuard';

export const dynamic = 'force-dynamic';

async function createTheme() {
  'use server';
  await requireAdminAction();
  const max = await prisma.theme.aggregate({ _max: { order: true } });
  const next = (max._max.order ?? 0) + 1;
  await prisma.theme.create({
    data: { numberLabel: String(next).padStart(2, '0'), order: next },
  });
  revalidatePath('/admin/themes');
}

async function saveTheme(formData: FormData) {
  'use server';
  await requireAdminAction();
  const id = Number(formData.get('id'));
  await prisma.theme.update({
    where: { id },
    data: {
      numberLabel: String(formData.get('numberLabel') || ''),
      titleTr: String(formData.get('titleTr') || ''),
      titleEn: String(formData.get('titleEn') || ''),
      descriptionTr: String(formData.get('descriptionTr') || ''),
      descriptionEn: String(formData.get('descriptionEn') || ''),
      order: Number(formData.get('order') || 0),
    },
  });
  revalidatePath('/admin/themes');
  revalidatePath('/', 'layout');
}

async function deleteTheme(formData: FormData) {
  'use server';
  await requireAdminAction();
  const id = Number(formData.get('id'));
  await prisma.theme.delete({ where: { id } });
  revalidatePath('/admin/themes');
  revalidatePath('/', 'layout');
}

export default async function AdminThemesPage() {
  const themes = await prisma.theme.findMany({ orderBy: { order: 'asc' } });
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="h-display text-2xl">Ana Temalar</h1>
          <p className="text-sm text-brand-ink/65 mt-1">
            Konferansın 8 ana tema grubunu düzenleyin.
          </p>
        </div>
        <form action={createTheme}>
          <button className="btn-primary" type="submit">+ Yeni Tema</button>
        </form>
      </header>

      <div className="grid gap-5">
        {themes.map((t) => (
          <div key={t.id} className="card">
            <form action={saveTheme} className="grid gap-3">
              <input type="hidden" name="id" value={t.id} />
              <div className="grid gap-3 md:grid-cols-[120px_120px_1fr]">
                <div>
                  <label className="label">Numara</label>
                  <input className="input" name="numberLabel" defaultValue={t.numberLabel} />
                </div>
                <div>
                  <label className="label">Sıra</label>
                  <input className="input" type="number" name="order" defaultValue={t.order} />
                </div>
                <div />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label className="label">Başlık (TR)</label>
                  <input className="input" name="titleTr" defaultValue={t.titleTr} />
                </div>
                <div>
                  <label className="label">Title (EN)</label>
                  <input className="input" name="titleEn" defaultValue={t.titleEn} />
                </div>
                <div>
                  <label className="label">Açıklama (TR)</label>
                  <textarea className="input min-h-[100px]" name="descriptionTr" defaultValue={t.descriptionTr} />
                </div>
                <div>
                  <label className="label">Description (EN)</label>
                  <textarea className="input min-h-[100px]" name="descriptionEn" defaultValue={t.descriptionEn} />
                </div>
              </div>
              <div className="flex justify-end">
                <button className="btn-primary !py-1.5 !px-3 !text-sm" type="submit">Kaydet</button>
              </div>
            </form>
            <form action={deleteTheme} className="mt-3 border-t border-brand-ink/5 pt-3 flex justify-end">
              <input type="hidden" name="id" value={t.id} />
              <button type="submit" className="btn-danger">Sil</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
