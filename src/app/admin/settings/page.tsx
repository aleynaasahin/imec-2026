import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { requireAdminAction } from '@/lib/adminGuard';

export const dynamic = 'force-dynamic';

const SETTINGS: { key: string; label: string; hint?: string; type?: 'text' | 'checkbox' | 'datetime' }[] = [
  { key: 'contact_email', label: 'İletişim E-postası' },
  { key: 'contact_phone', label: 'İletişim Telefonu' },
  { key: 'event_date_iso', label: 'Etkinlik Başlangıç Tarihi (ISO)', hint: 'Örn: 2026-11-04T09:00:00+03:00', type: 'datetime' },
  { key: 'countdown_enabled', label: 'Geri sayımı göster', type: 'checkbox' },
  { key: 'top_logos_enabled', label: 'Üst logo şeridini göster (Enerji Bakanlığı · MAPEG · MAYEM)', type: 'checkbox' },
  { key: 'sponsors_enabled', label: 'Sponsorlar bölümünü göster', type: 'checkbox' },
  { key: 'social_instagram', label: 'Instagram URL' },
  { key: 'social_youtube', label: 'YouTube URL' },
  { key: 'social_linkedin', label: 'LinkedIn URL' },
  { key: 'social_x', label: 'X (Twitter) URL' },
  { key: 'social_facebook', label: 'Facebook URL' },
];

async function saveSettings(formData: FormData) {
  'use server';
  await requireAdminAction();
  for (const s of SETTINGS) {
    let value: string;
    if (s.type === 'checkbox') {
      value = formData.get(s.key) === 'on' ? '1' : '0';
    } else {
      value = String(formData.get(s.key) || '');
    }
    await prisma.setting.upsert({
      where: { key: s.key },
      create: { key: s.key, value },
      update: { value },
    });
  }
  revalidatePath('/admin/settings');
  revalidatePath('/', 'layout');
}

export default async function AdminSettingsPage() {
  const rows = await prisma.setting.findMany();
  const map: Record<string, string> = {};
  for (const r of rows) map[r.key] = r.value;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="h-display text-2xl">Ayarlar</h1>
        <p className="text-sm text-brand-ink/65 mt-1">
          İletişim bilgileri, sosyal medya linkleri ve site genelinde geçerli aç/kapa ayarları.
        </p>
      </header>

      <form action={saveSettings} className="card grid gap-4">
        {SETTINGS.map((s) => (
          <div key={s.key} className="grid gap-1">
            {s.type === 'checkbox' ? (
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="checkbox" name={s.key} defaultChecked={(map[s.key] || '0') === '1'} />
                {s.label}
              </label>
            ) : (
              <>
                <label className="label">{s.label}</label>
                <input
                  className="input"
                  name={s.key}
                  defaultValue={map[s.key] || ''}
                  placeholder={s.hint || ''}
                />
                {s.hint ? <p className="text-xs text-brand-ink/55">{s.hint}</p> : null}
              </>
            )}
          </div>
        ))}
        <div className="flex justify-end">
          <button type="submit" className="btn-primary">Tüm Ayarları Kaydet</button>
        </div>
      </form>
    </div>
  );
}
