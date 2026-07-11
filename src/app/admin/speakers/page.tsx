import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { requireAdminAction } from '@/lib/adminGuard';
import UploadField from '@/components/admin/UploadField';

export const dynamic = 'force-dynamic';

async function createGroup() {
  'use server';
  await requireAdminAction();
  const max = await prisma.speakerGroup.aggregate({ _max: { order: true } });
  await prisma.speakerGroup.create({
    data: {
      order: (max._max.order ?? 0) + 1,
      nameTr: 'Yeni Grup',
      nameEn: 'New Group',
    },
  });
  revalidatePath('/admin/speakers');
}

async function saveGroup(formData: FormData) {
  'use server';
  await requireAdminAction();
  const id = Number(formData.get('id'));
  await prisma.speakerGroup.update({
    where: { id },
    data: {
      nameTr: String(formData.get('nameTr') || ''),
      nameEn: String(formData.get('nameEn') || ''),
      order: Number(formData.get('order') || 0),
    },
  });
  revalidatePath('/admin/speakers');
  revalidatePath('/', 'layout');
}

async function deleteGroup(formData: FormData) {
  'use server';
  await requireAdminAction();
  const id = Number(formData.get('id'));
  await prisma.speakerGroup.delete({ where: { id } });
  revalidatePath('/admin/speakers');
  revalidatePath('/', 'layout');
}

async function createSpeaker(formData: FormData) {
  'use server';
  await requireAdminAction();
  const groupId = Number(formData.get('groupId'));
  const max = await prisma.speaker.aggregate({
    where: { groupId },
    _max: { order: true },
  });
  await prisma.speaker.create({
    data: { groupId, fullName: 'Yeni Konuşmacı', order: (max._max.order ?? 0) + 1, published: false },
  });
  revalidatePath('/admin/speakers');
}

async function saveSpeaker(formData: FormData) {
  'use server';
  await requireAdminAction();
  const id = Number(formData.get('id'));
  await prisma.speaker.update({
    where: { id },
    data: {
      fullName: String(formData.get('fullName') || ''),
      titleTr: String(formData.get('titleTr') || ''),
      titleEn: String(formData.get('titleEn') || ''),
      organization: String(formData.get('organization') || ''),
      topicTr: String(formData.get('topicTr') || ''),
      topicEn: String(formData.get('topicEn') || ''),
      bioTr: String(formData.get('bioTr') || ''),
      bioEn: String(formData.get('bioEn') || ''),
      photoUrl: String(formData.get('photoUrl') || ''),
      order: Number(formData.get('order') || 0),
      published: formData.get('published') === 'on',
    },
  });
  revalidatePath('/admin/speakers');
  revalidatePath('/', 'layout');
}

async function deleteSpeaker(formData: FormData) {
  'use server';
  await requireAdminAction();
  const id = Number(formData.get('id'));
  await prisma.speaker.delete({ where: { id } });
  revalidatePath('/admin/speakers');
  revalidatePath('/', 'layout');
}

export default async function AdminSpeakersPage() {
  const groups = await prisma.speakerGroup.findMany({
    orderBy: { order: 'asc' },
    include: { speakers: { orderBy: { order: 'asc' } } },
  });

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="h-display text-2xl">Konuşmacılar</h1>
          <p className="text-sm text-brand-ink/65 mt-1">
            Konuşmacı gruplarını (ör. Yurt Dışından Konuşmacılar, Türkiye&apos;den Uzmanlar) ve her gruptaki konuşmacıları yönetin.
            Yayınlanmamış (&quot;Yayında&quot; kutusu boş) konuşmacılar sitede görünmez — henüz kesinleşmemiş isimleri bu şekilde saklayabilirsiniz.
          </p>
        </div>
        <form action={createGroup}>
          <button className="btn-primary" type="submit">+ Yeni Grup</button>
        </form>
      </header>

      <div className="grid gap-6">
        {groups.map((g) => (
          <section key={g.id} className="card space-y-4">
            <form action={saveGroup} className="grid gap-3 md:grid-cols-[1fr_1fr_120px_auto] items-end">
              <input type="hidden" name="id" value={g.id} />
              <div>
                <label className="label">Grup Adı (TR)</label>
                <input className="input" name="nameTr" defaultValue={g.nameTr} />
              </div>
              <div>
                <label className="label">Group Name (EN)</label>
                <input className="input" name="nameEn" defaultValue={g.nameEn} />
              </div>
              <div>
                <label className="label">Sıra</label>
                <input className="input" type="number" name="order" defaultValue={g.order} />
              </div>
              <button className="btn-primary !py-1.5 !px-3 !text-sm" type="submit">Kaydet</button>
            </form>

            <div className="border-t border-brand-ink/10 pt-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-brand-ink">Konuşmacılar</h3>
                <form action={createSpeaker}>
                  <input type="hidden" name="groupId" value={g.id} />
                  <button className="btn-secondary !py-1 !px-2 !text-xs" type="submit">+ Konuşmacı</button>
                </form>
              </div>
              <div className="grid gap-4">
                {g.speakers.map((s) => (
                  <div key={s.id} className="rounded-lg border border-brand-ink/10 p-4">
                    <form action={saveSpeaker} className="grid gap-3 md:grid-cols-[160px_1fr] items-start">
                      <input type="hidden" name="id" value={s.id} />
                      <div>
                        <label className="label">Fotoğraf</label>
                        <UploadField name="photoUrl" defaultValue={s.photoUrl} />
                      </div>
                      <div className="grid gap-3">
                        <div className="grid gap-3 md:grid-cols-2">
                          <div>
                            <label className="label">Ad Soyad</label>
                            <input className="input" name="fullName" defaultValue={s.fullName} />
                          </div>
                          <div>
                            <label className="label">Kurum</label>
                            <input className="input" name="organization" defaultValue={s.organization} />
                          </div>
                          <div>
                            <label className="label">Ünvan (TR)</label>
                            <input className="input" name="titleTr" defaultValue={s.titleTr} />
                          </div>
                          <div>
                            <label className="label">Title (EN)</label>
                            <input className="input" name="titleEn" defaultValue={s.titleEn} />
                          </div>
                          <div>
                            <label className="label">Konu (TR)</label>
                            <input className="input" name="topicTr" defaultValue={s.topicTr} />
                          </div>
                          <div>
                            <label className="label">Topic (EN)</label>
                            <input className="input" name="topicEn" defaultValue={s.topicEn} />
                          </div>
                          <div>
                            <label className="label">Kısa Özgeçmiş (TR)</label>
                            <textarea className="input min-h-[120px]" name="bioTr" defaultValue={s.bioTr} />
                          </div>
                          <div>
                            <label className="label">Bio (EN)</label>
                            <textarea className="input min-h-[120px]" name="bioEn" defaultValue={s.bioEn} />
                          </div>
                        </div>
                        <div className="flex items-center gap-4 flex-wrap">
                          <div className="flex items-center gap-2">
                            <label className="label !mb-0">Sıra</label>
                            <input className="input !w-20" type="number" name="order" defaultValue={s.order} />
                          </div>
                          <label className="inline-flex items-center gap-2 text-sm">
                            <input type="checkbox" name="published" defaultChecked={s.published} /> Yayında
                          </label>
                          <button className="btn-primary !py-1.5 !px-3 !text-sm ml-auto" type="submit">Kaydet</button>
                        </div>
                      </div>
                    </form>
                    <form action={deleteSpeaker} className="mt-2 flex justify-end">
                      <input type="hidden" name="id" value={s.id} />
                      <button type="submit" className="btn-danger">Konuşmacıyı Sil</button>
                    </form>
                  </div>
                ))}
                {g.speakers.length === 0 ? <p className="text-sm text-brand-ink/55">Bu grupta konuşmacı yok.</p> : null}
              </div>
            </div>

            <form action={deleteGroup} className="border-t border-brand-ink/10 pt-3 flex justify-end">
              <input type="hidden" name="id" value={g.id} />
              <button type="submit" className="btn-danger">Grubu Sil</button>
            </form>
          </section>
        ))}
        {groups.length === 0 ? (
          <p className="text-brand-ink/60">Henüz grup yok. &quot;Yeni Grup&quot; ile ekleyin.</p>
        ) : null}
      </div>
    </div>
  );
}
