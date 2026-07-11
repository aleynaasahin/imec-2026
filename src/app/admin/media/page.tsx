import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { requireAdminAction } from '@/lib/adminGuard';
import UploadField from '@/components/admin/UploadField';

export const dynamic = 'force-dynamic';

const ORGANIZER_TAGS: { tag: string; nameTr: string; nameEn: string }[] = [
  {
    tag: 'organizer_mayem',
    nameTr: 'MAYEM — Maden ve Yerbilimleri Profesyonelleri Mesleki Gelişim Derneği',
    nameEn: 'MAYEM',
  },
  {
    tag: 'organizer_ministry',
    nameTr: 'T.C. Enerji ve Tabii Kaynaklar Bakanlığı',
    nameEn: 'Ministry of Energy and Natural Resources',
  },
  {
    tag: 'organizer_mapeg',
    nameTr: 'Maden ve Petrol İşleri Genel Müdürlüğü (MAPEG)',
    nameEn: 'MAPEG',
  },
];

async function saveOrganizerLogo(formData: FormData) {
  'use server';
  await requireAdminAction();
  const tag = String(formData.get('tag') || '');
  const url = String(formData.get('logoUrl') || '');
  const nameTr = String(formData.get('name') || tag);
  const existing = await prisma.media.findFirst({ where: { tag } });
  if (existing) {
    await prisma.media.update({ where: { id: existing.id }, data: { url, name: nameTr } });
  } else {
    await prisma.media.create({ data: { url, name: nameTr, tag } });
  }
  revalidatePath('/admin/media');
  revalidatePath('/', 'layout');
}

async function clearOrganizerLogo(formData: FormData) {
  'use server';
  await requireAdminAction();
  const tag = String(formData.get('tag') || '');
  const existing = await prisma.media.findFirst({ where: { tag } });
  if (existing) await prisma.media.delete({ where: { id: existing.id } });
  revalidatePath('/admin/media');
  revalidatePath('/', 'layout');
}

export default async function AdminMediaPage() {
  const all = await prisma.media.findMany();
  const byTag = new Map(all.map((m) => [m.tag, m]));

  return (
    <div className="space-y-6">
      <header>
        <h1 className="h-display text-2xl">Medya / Logolar</h1>
        <p className="text-sm text-brand-ink/65 mt-1">
          Anasayfa şeridinde gösterilecek düzenleyen kurum logolarını yükleyin. Logo eklenmemiş kurumlar yer tutucu olarak görünür.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        {ORGANIZER_TAGS.map((o) => {
          const m = byTag.get(o.tag);
          return (
            <div key={o.tag} className="card">
              <p className="font-semibold text-brand-ink">{o.nameTr}</p>
              <p className="text-xs text-brand-ink/60 mb-3">{o.nameEn}</p>
              <form action={saveOrganizerLogo} className="grid gap-3">
                <input type="hidden" name="tag" value={o.tag} />
                <input type="hidden" name="name" value={o.nameTr} />
                <UploadField name="logoUrl" defaultValue={m?.url ?? ''} />
                <div className="flex justify-end">
                  <button className="btn-primary !py-1.5 !px-3 !text-sm" type="submit">Kaydet</button>
                </div>
              </form>
              {m?.url ? (
                <form action={clearOrganizerLogo} className="mt-2 flex justify-end">
                  <input type="hidden" name="tag" value={o.tag} />
                  <button type="submit" className="btn-danger">Logoyu Kaldır</button>
                </form>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
