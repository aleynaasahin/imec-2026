import { Lang } from '@/lib/i18n';

export default function OrganizerStrip({
  lang,
  organizers,
  organizedBy,
  underAuspices,
}: {
  lang: Lang;
  organizers: { tag: string; url: string; name: string }[];
  organizedBy: string;
  underAuspices: string;
}) {
  const map: Record<string, string> = {};
  for (const o of organizers) map[o.tag] = o.url;

  const groups: { title: string; tags: string[] }[] = [
    { title: organizedBy, tags: ['organizer_mayem'] },
    { title: underAuspices, tags: ['organizer_ministry', 'organizer_mapeg'] },
  ];

  const labels: Record<string, { tr: string; en: string }> = {
    organizer_mayem: {
      tr: 'MAYEM — Maden ve Yerbilimleri Profesyonelleri Mesleki Gelişim Derneği',
      en: 'MAYEM — Professional Development Association of Mining and Geoscience Professionals',
    },
    organizer_ministry: {
      tr: 'T.C. Enerji ve Tabii Kaynaklar Bakanlığı',
      en: 'Republic of Türkiye — Ministry of Energy and Natural Resources',
    },
    organizer_mapeg: {
      tr: 'Maden ve Petrol İşleri Genel Müdürlüğü (MAPEG)',
      en: 'General Directorate of Mining and Petroleum Affairs (MAPEG)',
    },
  };

  return (
    <section className="section bg-brand-paper">
      <div className="container-content">
        <div className="grid gap-10 lg:grid-cols-3">
          {groups.map((g) => (
            <div key={g.title} className="text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-ink/60 font-semibold mb-5">
                {g.title}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6">
                {g.tags.map((tag) => {
                  const url = map[tag];
                  const label = labels[tag][lang];
                  return (
                    <div key={tag} className="flex flex-col items-center gap-2 max-w-[200px]">
                      {url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={url} alt={label} className="h-16 w-auto object-contain" />
                      ) : (
                        <div className="h-16 w-32 rounded-md border border-dashed border-brand-ink/25 bg-white grid place-items-center text-xs text-brand-ink/40">
                          {lang === 'tr' ? 'Logo eklenecek' : 'Logo pending'}
                        </div>
                      )}
                      <p className="text-xs text-brand-ink/70 leading-tight">{label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
