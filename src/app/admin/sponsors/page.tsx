import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { requireAdminAction } from '@/lib/adminGuard';
import UploadField from '@/components/admin/UploadField';

export const dynamic = 'force-dynamic';

async function setSponsorsEnabled(formData: FormData) {
  'use server';
  await requireAdminAction();
  const enabled = formData.get('enabled') === 'on' ? '1' : '0';
  await prisma.setting.upsert({
    where: { key: 'sponsors_enabled' },
    create: { key: 'sponsors_enabled', value: enabled },
    update: { value: enabled },
  });
  revalidatePath('/admin/sponsors');
  revalidatePath('/', 'layout');
}

async function createTier() {
  'use server';
  await requireAdminAction();
  const max = await prisma.sponsorTier.aggregate({ _max: { order: true } });
  await prisma.sponsorTier.create({
    data: { order: (max._max.order ?? 0) + 1, nameTr: 'Yeni Kademe', nameEn: 'New Tier' },
  });
  revalidatePath('/admin/sponsors');
}

async function saveTier(formData: FormData) {
  'use server';
  await requireAdminAction();
  const id = Number(formData.get('id'));
  await prisma.sponsorTier.update({
    where: { id },
    data: {
      nameTr: String(formData.get('nameTr') || ''),
      nameEn: String(formData.get('nameEn') || ''),
      order: Number(formData.get('order') || 0),
    },
  });
  revalidatePath('/admin/sponsors');
  revalidatePath('/', 'layout');
}

async function deleteTier(formData: FormData) {
  'use server';
  await requireAdminAction();
  const id = Number(formData.get('id'));
  await prisma.sponsorTier.delete({ where: { id } });
  revalidatePath('/admin/sponsors');
  revalidatePath('/', 'layout');
}

async function createSponsor(formData: FormData) {
  'use server';
  await requireAdminAction();
  const tierId = Number(formData.get('tierId'));
  const max = await prisma.sponsor.aggregate({ where: { tierId }, _max: { order: true } });
  await prisma.sponsor.create({
    data: {
      tierId,
      name: 'Yeni Sponsor',
      order: (max._max.order ?? 0) + 1,
    },
  });
  revalidatePath('/admin/sponsors');
}

async function saveSponsor(formData: FormData) {
  'use server';
  await requireAdminAction();
  const id = Number(formData.get('id'));
  await prisma.sponsor.update({
    where: { id },
    data: {
      name: String(formData.get('name') || ''),
      url: String(formData.get('url') || ''),
      logoUrl: String(formData.get('logoUrl') || ''),
      order: Number(formData.get('order') || 0),
    },
  });
  revalidatePath('/admin/sponsors');
  revalidatePath('/', 'layout');
}

async function deleteSponsor(formData: FormData) {
  'use server';
  await requireAdminAction();
  const id = Number(formData.get('id'));
  await prisma.sponsor.delete({ where: { id } });
  revalidatePath('/admin/sponsors');
  revalidatePath('/', 'layout');
}

export default async function AdminSponsorsPage() {
  const [tiers, setting] = await Promise.all([
    prisma.sponsorTier.findMany({
      orderBy: { order: 'asc' },
      include: { sponsors: { orderBy: { order: 'asc' } } },
    }),
    prisma.setting.findUnique({ where: { key: 'sponsors_enabled' } }),
  ]);
  const enabled = (setting?.value || '0') === '1';

  return (
    <div className="space-y-6">
      <header>
        <h1 className="h-display text-2xl">Sponsorlar</h1>
        <p className="text-sm text-brand-ink/65 mt-1">
          Sponsor kademelerini ve sponsorları yönetin. Sponsorlar bölümü, aşağıdaki anahtar kapalıyken anasayfada gizlenir.
        </p>
      </header>

      <form action={setSponsorsEnabled} className="card flex items-center justify-between gap-4">
        <div>
          <p className="font-medium text-brand-ink">Sponsorlar bölümünü göster</p>
          <p className="text-xs text-brand-ink/60">Sponsor yokken kapalı bırakın (varsayılan).</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" name="enabled" defaultChecked={enabled} /> Aktif
          </label>
          <button type="submit" className="btn-primary !py-1.5 !px-3 !text-sm">Kaydet</button>
        </div>
      </form>

      <div className="flex justify-end">
        <form action={createTier}>
          <button className="btn-primary" type="submit">+ Yeni Kademe</button>
        </form>
      </div>

      <div className="grid gap-6">
        {tiers.map((tier) => (
          <section key={tier.id} className="card space-y-4">
            <form action={saveTier} className="grid gap-3 md:grid-cols-[1fr_1fr_120px_auto] items-end">
              <input type="hidden" name="id" value={tier.id} />
              <div>
                <label className="label">Kademe Adı (TR)</label>
                <input className="input" name="nameTr" defaultValue={tier.nameTr} />
              </div>
              <div>
                <label className="label">Tier Name (EN)</label>
                <input className="input" name="nameEn" defaultValue={tier.nameEn} />
              </div>
              <div>
                <label className="label">Sıra</label>
                <input className="input" type="number" name="order" defaultValue={tier.order} />
              </div>
              <button className="btn-primary !py-1.5 !px-3 !text-sm" type="submit">Kaydet</button>
            </form>

            <div className="border-t border-brand-ink/10 pt-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-brand-ink">Bu kademedeki sponsorlar</h3>
                <form action={createSponsor}>
                  <input type="hidden" name="tierId" value={tier.id} />
                  <button className="btn-secondary !py-1 !px-2 !text-xs" type="submit">+ Sponsor</button>
                </form>
              </div>
              <div className="grid gap-4">
                {tier.sponsors.map((sp) => (
                  <div key={sp.id} className="rounded-lg border border-brand-ink/10 p-4">
                    <form action={saveSponsor} className="grid gap-3 md:grid-cols-[200px_1fr] items-start">
                      <input type="hidden" name="id" value={sp.id} />
                      <div>
                        <label className="label">Logo</label>
                        <UploadField name="logoUrl" defaultValue={sp.logoUrl} />
                      </div>
                      <div className="grid gap-3">
                        <div>
                          <label className="label">İsim</label>
                          <input className="input" name="name" defaultValue={sp.name} />
                        </div>
                        <div>
                          <label className="label">Web Site / Link</label>
                          <input className="input" name="url" defaultValue={sp.url} placeholder="https://" />
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="label !mb-0">Sıra</label>
                          <input className="input !w-20" type="number" name="order" defaultValue={sp.order} />
                          <button className="btn-primary !py-1.5 !px-3 !text-sm ml-auto" type="submit">Kaydet</button>
                        </div>
                      </div>
                    </form>
                    <form action={deleteSponsor} className="mt-2 flex justify-end">
                      <input type="hidden" name="id" value={sp.id} />
                      <button type="submit" className="btn-danger">Sil</button>
                    </form>
                  </div>
                ))}
                {tier.sponsors.length === 0 ? (
                  <p className="text-sm text-brand-ink/55">Bu kademede sponsor yok.</p>
                ) : null}
              </div>
            </div>

            <form action={deleteTier} className="border-t border-brand-ink/10 pt-3 flex justify-end">
              <input type="hidden" name="id" value={tier.id} />
              <button type="submit" className="btn-danger">Kademeyi Sil</button>
            </form>
          </section>
        ))}
        {tiers.length === 0 ? (
          <p className="text-brand-ink/60">Henüz kademe yok. "Yeni Kademe" ile ekleyin.</p>
        ) : null}
      </div>
    </div>
  );
}
