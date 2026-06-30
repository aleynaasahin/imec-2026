import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { requireAdminAction } from '@/lib/adminGuard';
import UploadField from '@/components/admin/UploadField';

export const dynamic = 'force-dynamic';

async function createSlide() {
  'use server';
  await requireAdminAction();
  const max = await prisma.heroSlide.aggregate({ _max: { order: true } });
  await prisma.heroSlide.create({
    data: { order: (max._max.order ?? 0) + 1, active: true },
  });
  revalidatePath('/admin/hero');
}

async function saveSlide(formData: FormData) {
  'use server';
  await requireAdminAction();
  const id = Number(formData.get('id'));
  await prisma.heroSlide.update({
    where: { id },
    data: {
      imageUrl: String(formData.get('imageUrl') || ''),
      titleTr: String(formData.get('titleTr') || ''),
      titleEn: String(formData.get('titleEn') || ''),
      subtitleTr: String(formData.get('subtitleTr') || ''),
      subtitleEn: String(formData.get('subtitleEn') || ''),
      buttonTextTr: String(formData.get('buttonTextTr') || ''),
      buttonTextEn: String(formData.get('buttonTextEn') || ''),
      buttonUrl: String(formData.get('buttonUrl') || ''),
      order: Number(formData.get('order') || 0),
      active: formData.get('active') === 'on',
    },
  });
  revalidatePath('/admin/hero');
  revalidatePath('/', 'layout');
}

async function deleteSlide(formData: FormData) {
  'use server';
  await requireAdminAction();
  const id = Number(formData.get('id'));
  await prisma.heroSlide.delete({ where: { id } });
  revalidatePath('/admin/hero');
  revalidatePath('/', 'layout');
}

export default async function AdminHeroPage() {
  const slides = await prisma.heroSlide.findMany({ orderBy: { order: 'asc' } });
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="h-display text-2xl">Manşet Slaytları</h1>
          <p className="text-sm text-brand-ink/65 mt-1">
            Anasayfa üst slider'ında görünecek slaytları yönetin. Görsel ekleyebilir, başlık/buton ekleyebilir, sırasını değiştirebilirsiniz.
          </p>
        </div>
        <form action={createSlide}>
          <button className="btn-primary" type="submit">+ Yeni Slayt</button>
        </form>
      </header>

      <div className="grid gap-5">
        {slides.map((s) => (
          <div key={s.id} className="card">
            <form action={saveSlide} className="grid gap-4">
              <input type="hidden" name="id" value={s.id} />
              <div className="grid gap-4 md:grid-cols-[280px_1fr]">
                <div>
                  <label className="label">Arka Plan Görseli</label>
                  <UploadField name="imageUrl" defaultValue={s.imageUrl} />
                </div>
                <div className="grid gap-3">
                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <label className="label">Başlık (TR)</label>
                      <input className="input" name="titleTr" defaultValue={s.titleTr} />
                    </div>
                    <div>
                      <label className="label">Title (EN)</label>
                      <input className="input" name="titleEn" defaultValue={s.titleEn} />
                    </div>
                    <div>
                      <label className="label">Alt Metin (TR)</label>
                      <input className="input" name="subtitleTr" defaultValue={s.subtitleTr} />
                    </div>
                    <div>
                      <label className="label">Subtitle (EN)</label>
                      <input className="input" name="subtitleEn" defaultValue={s.subtitleEn} />
                    </div>
                    <div>
                      <label className="label">Buton Yazısı (TR)</label>
                      <input className="input" name="buttonTextTr" defaultValue={s.buttonTextTr} />
                    </div>
                    <div>
                      <label className="label">Button Text (EN)</label>
                      <input className="input" name="buttonTextEn" defaultValue={s.buttonTextEn} />
                    </div>
                    <div className="md:col-span-2">
                      <label className="label">Buton Linki</label>
                      <input className="input" name="buttonUrl" defaultValue={s.buttonUrl} placeholder="/tr/register" />
                    </div>
                  </div>
                  <div className="flex items-center gap-6 flex-wrap">
                    <div className="flex items-center gap-2">
                      <label className="label !mb-0">Sıra</label>
                      <input className="input !w-20" type="number" name="order" defaultValue={s.order} />
                    </div>
                    <label className="inline-flex items-center gap-2 text-sm">
                      <input type="checkbox" name="active" defaultChecked={s.active} /> Aktif
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2">
                <button className="btn-primary !py-1.5 !px-3 !text-sm" type="submit">Kaydet</button>
              </div>
            </form>
            <form action={deleteSlide} className="mt-3 border-t border-brand-ink/5 pt-3 flex justify-end">
              <input type="hidden" name="id" value={s.id} />
              <button type="submit" className="btn-danger">Sil</button>
            </form>
          </div>
        ))}
        {slides.length === 0 ? (
          <p className="text-brand-ink/60">Henüz slayt yok. "Yeni Slayt" ile ekleyin.</p>
        ) : null}
      </div>
    </div>
  );
}
