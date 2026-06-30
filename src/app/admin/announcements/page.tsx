import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { requireAdminAction } from '@/lib/adminGuard';
import UploadField from '@/components/admin/UploadField';

export const dynamic = 'force-dynamic';

function slugify(s: string) {
  return (
    s
      .toLocaleLowerCase('tr-TR')
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80) || `duyuru-${Date.now()}`
  );
}

async function createAnnouncement() {
  'use server';
  await requireAdminAction();
  const slug = `duyuru-${Date.now()}`;
  await prisma.announcement.create({
    data: { slug, titleTr: 'Yeni Duyuru', titleEn: 'New Announcement', published: false },
  });
  revalidatePath('/admin/announcements');
}

async function saveAnnouncement(formData: FormData) {
  'use server';
  await requireAdminAction();
  const id = Number(formData.get('id'));
  let slug = String(formData.get('slug') || '').trim();
  const titleTr = String(formData.get('titleTr') || '');
  if (!slug) slug = slugify(titleTr || `duyuru-${id}`);
  // Make slug unique if changed and conflicts
  const existing = await prisma.announcement.findFirst({ where: { slug, NOT: { id } } });
  if (existing) slug = `${slug}-${id}`;
  await prisma.announcement.update({
    where: { id },
    data: {
      slug,
      titleTr,
      titleEn: String(formData.get('titleEn') || ''),
      bodyTr: String(formData.get('bodyTr') || ''),
      bodyEn: String(formData.get('bodyEn') || ''),
      imageUrl: String(formData.get('imageUrl') || ''),
      published: formData.get('published') === 'on',
    },
  });
  revalidatePath('/admin/announcements');
  revalidatePath('/', 'layout');
}

async function deleteAnnouncement(formData: FormData) {
  'use server';
  await requireAdminAction();
  const id = Number(formData.get('id'));
  await prisma.announcement.delete({ where: { id } });
  revalidatePath('/admin/announcements');
  revalidatePath('/', 'layout');
}

export default async function AdminAnnouncementsPage() {
  const items = await prisma.announcement.findMany({ orderBy: { publishedAt: 'desc' } });
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="h-display text-2xl">Duyurular</h1>
          <p className="text-sm text-brand-ink/65 mt-1">Site duyurularını ekleyin, düzenleyin, yayından kaldırın.</p>
        </div>
        <form action={createAnnouncement}>
          <button className="btn-primary" type="submit">+ Yeni Duyuru</button>
        </form>
      </header>

      <div className="grid gap-5">
        {items.map((a) => (
          <div key={a.id} className="card">
            <form action={saveAnnouncement} className="grid gap-3">
              <input type="hidden" name="id" value={a.id} />
              <div className="grid gap-3 md:grid-cols-[200px_1fr]">
                <div>
                  <label className="label">Görsel</label>
                  <UploadField name="imageUrl" defaultValue={a.imageUrl} />
                </div>
                <div className="grid gap-3">
                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <label className="label">Slug (URL)</label>
                      <input className="input" name="slug" defaultValue={a.slug} />
                    </div>
                    <div className="flex items-end gap-2">
                      <label className="inline-flex items-center gap-2 text-sm">
                        <input type="checkbox" name="published" defaultChecked={a.published} /> Yayında
                      </label>
                    </div>
                    <div>
                      <label className="label">Başlık (TR)</label>
                      <input className="input" name="titleTr" defaultValue={a.titleTr} />
                    </div>
                    <div>
                      <label className="label">Title (EN)</label>
                      <input className="input" name="titleEn" defaultValue={a.titleEn} />
                    </div>
                    <div>
                      <label className="label">İçerik (TR)</label>
                      <textarea className="input min-h-[140px]" name="bodyTr" defaultValue={a.bodyTr} />
                    </div>
                    <div>
                      <label className="label">Body (EN)</label>
                      <textarea className="input min-h-[140px]" name="bodyEn" defaultValue={a.bodyEn} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="btn-primary !py-1.5 !px-3 !text-sm" type="submit">Kaydet</button>
              </div>
            </form>
            <form action={deleteAnnouncement} className="mt-3 border-t border-brand-ink/5 pt-3 flex justify-end">
              <input type="hidden" name="id" value={a.id} />
              <button type="submit" className="btn-danger">Sil</button>
            </form>
          </div>
        ))}
        {items.length === 0 ? <p className="text-brand-ink/60">Henüz duyuru yok.</p> : null}
      </div>
    </div>
  );
}
