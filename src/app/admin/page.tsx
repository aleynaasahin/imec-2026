import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [registrations, announcements, slides, themes, formFields, sponsors] = await Promise.all([
    prisma.registration.count(),
    prisma.announcement.count(),
    prisma.heroSlide.count(),
    prisma.theme.count(),
    prisma.formField.count(),
    prisma.sponsor.count(),
  ]);

  const stats = [
    { label: 'Kayıtlar', value: registrations, href: '/admin/registrations' },
    { label: 'Duyurular', value: announcements, href: '/admin/announcements' },
    { label: 'Manşet Slaytları', value: slides, href: '/admin/hero' },
    { label: 'Temalar', value: themes, href: '/admin/themes' },
    { label: 'Form Alanları', value: formFields, href: '/admin/form-fields' },
    { label: 'Sponsorlar', value: sponsors, href: '/admin/sponsors' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="h-display text-2xl">Hoş geldiniz</h1>
        <p className="text-sm text-brand-ink/65 mt-1">
          IMEC 2026 yönetim panelinden site içeriklerini düzenleyebilir, kayıtları görüntüleyebilirsiniz.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <a
            key={s.label}
            href={s.href}
            className="card hover:border-brand-green/40 transition"
          >
            <p className="text-sm text-brand-ink/60">{s.label}</p>
            <p className="font-display text-3xl font-bold text-brand-ink mt-2">{s.value}</p>
          </a>
        ))}
      </div>

      <div className="card">
        <h2 className="font-semibold text-brand-ink mb-2">Hızlı bilgi</h2>
        <ul className="list-disc list-inside text-sm text-brand-ink/75 space-y-1">
          <li>Tüm metinler hem Türkçe (TR) hem İngilizce (EN) olarak ayrı düzenlenir.</li>
          <li>Sponsorlar bölümü, aktif edilene kadar herkese açık sitede gizli kalır.</li>
          <li>Kayıt formu alanları "Kayıt Formu" sayfasından özelleştirilebilir.</li>
          <li>Kayıtlar Excel (.xlsx) veya CSV olarak dışa aktarılabilir.</li>
        </ul>
      </div>
    </div>
  );
}
