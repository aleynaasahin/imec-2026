import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { requireAdminAction } from '@/lib/adminGuard';
import UploadField from '@/components/admin/UploadField';

export const dynamic = 'force-dynamic';

async function createGroup() {
  'use server';
  await requireAdminAction();
  const max = await prisma.committeeGroup.aggregate({ _max: { order: true } });
  await prisma.committeeGroup.create({
    data: {
      order: (max._max.order ?? 0) + 1,
      nameTr: 'Yeni Komite',
      nameEn: 'New Committee',
    },
  });
  revalidatePath('/admin/committees');
}

async function saveGroup(formData: FormData) {
  'use server';
  await requireAdminAction();
  const id = Number(formData.get('id'));
  await prisma.committeeGroup.update({
    where: { id },
    data: {
      nameTr: String(formData.get('nameTr') || ''),
      nameEn: String(formData.get('nameEn') || ''),
      order: Number(formData.get('order') || 0),
    },
  });
  revalidatePath('/admin/committees');
  revalidatePath('/', 'layout');
}

async function deleteGroup(formData: FormData) {
  'use server';
  await requireAdminAction();
  const id = Number(formData.get('id'));
  await prisma.committeeGroup.delete({ where: { id } });
  revalidatePath('/admin/committees');
  revalidatePath('/', 'layout');
}

async function createMember(formData: FormData) {
  'use server';
  await requireAdminAction();
  const groupId = Number(formData.get('groupId'));
  const max = await prisma.committeeMember.aggregate({
    where: { groupId },
    _max: { order: true },
  });
  await prisma.committeeMember.create({
    data: { groupId, fullName: 'Yeni Üye', order: (max._max.order ?? 0) + 1 },
  });
  revalidatePath('/admin/committees');
}

async function saveMember(formData: FormData) {
  'use server';
  await requireAdminAction();
  const id = Number(formData.get('id'));
  await prisma.committeeMember.update({
    where: { id },
    data: {
      fullName: String(formData.get('fullName') || ''),
      titleTr: String(formData.get('titleTr') || ''),
      titleEn: String(formData.get('titleEn') || ''),
      affiliation: String(formData.get('affiliation') || ''),
      photoUrl: String(formData.get('photoUrl') || ''),
      order: Number(formData.get('order') || 0),
    },
  });
  revalidatePath('/admin/committees');
  revalidatePath('/', 'layout');
}

async function deleteMember(formData: FormData) {
  'use server';
  await requireAdminAction();
  const id = Number(formData.get('id'));
  await prisma.committeeMember.delete({ where: { id } });
  revalidatePath('/admin/committees');
  revalidatePath('/', 'layout');
}

export default async function AdminCommitteesPage() {
  const groups = await prisma.committeeGroup.findMany({
    orderBy: { order: 'asc' },
    include: { members: { orderBy: { order: 'asc' } } },
  });
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="h-display text-2xl">Komiteler</h1>
          <p className="text-sm text-brand-ink/65 mt-1">Koordinasyon ve düzenleme komitelerini yönetin.</p>
        </div>
        <form action={createGroup}>
          <button className="btn-primary" type="submit">+ Yeni Komite</button>
        </form>
      </header>

      <div className="grid gap-6">
        {groups.map((g) => (
          <section key={g.id} className="card space-y-4">
            <form action={saveGroup} className="grid gap-3 md:grid-cols-[1fr_1fr_120px_auto] items-end">
              <input type="hidden" name="id" value={g.id} />
              <div>
                <label className="label">Ad (TR)</label>
                <input className="input" name="nameTr" defaultValue={g.nameTr} />
              </div>
              <div>
                <label className="label">Name (EN)</label>
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
                <h3 className="text-sm font-semibold text-brand-ink">Üyeler</h3>
                <form action={createMember}>
                  <input type="hidden" name="groupId" value={g.id} />
                  <button className="btn-secondary !py-1 !px-2 !text-xs" type="submit">+ Üye</button>
                </form>
              </div>
              <div className="grid gap-4">
                {g.members.map((m) => (
                  <div key={m.id} className="rounded-lg border border-brand-ink/10 p-4">
                    <form action={saveMember} className="grid gap-3 md:grid-cols-[180px_1fr] items-start">
                      <input type="hidden" name="id" value={m.id} />
                      <div>
                        <label className="label">Fotoğraf</label>
                        <UploadField name="photoUrl" defaultValue={m.photoUrl} />
                      </div>
                      <div className="grid gap-3 md:grid-cols-2">
                        <div>
                          <label className="label">Ad Soyad</label>
                          <input className="input" name="fullName" defaultValue={m.fullName} />
                        </div>
                        <div>
                          <label className="label">Kurum</label>
                          <input className="input" name="affiliation" defaultValue={m.affiliation} />
                        </div>
                        <div>
                          <label className="label">Ünvan (TR)</label>
                          <input className="input" name="titleTr" defaultValue={m.titleTr} />
                        </div>
                        <div>
                          <label className="label">Title (EN)</label>
                          <input className="input" name="titleEn" defaultValue={m.titleEn} />
                        </div>
                        <div className="flex items-center gap-2 md:col-span-2">
                          <label className="label !mb-0">Sıra</label>
                          <input className="input !w-20" type="number" name="order" defaultValue={m.order} />
                          <button className="btn-primary !py-1.5 !px-3 !text-sm ml-auto" type="submit">Kaydet</button>
                        </div>
                      </div>
                    </form>
                    <form action={deleteMember} className="mt-2 flex justify-end">
                      <input type="hidden" name="id" value={m.id} />
                      <button type="submit" className="btn-danger">Üyeyi Sil</button>
                    </form>
                  </div>
                ))}
                {g.members.length === 0 ? <p className="text-sm text-brand-ink/55">Bu komitede üye yok.</p> : null}
              </div>
            </div>

            <form action={deleteGroup} className="border-t border-brand-ink/10 pt-3 flex justify-end">
              <input type="hidden" name="id" value={g.id} />
              <button type="submit" className="btn-danger">Komiteyi Sil</button>
            </form>
          </section>
        ))}
      </div>
    </div>
  );
}
