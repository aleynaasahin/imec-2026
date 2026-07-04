import { Lang } from '@/lib/i18n';

// Top-of-page official logos band: Ministry → MAPEG → MAYEM (in this order).
// Reuses the organizer_* logos uploaded in Admin → Media / Logolar.
export default function TopLogosStrip({
  lang,
  organizers,
}: {
  lang: Lang;
  organizers: { tag: string; url: string; name: string }[];
}) {
  const map: Record<string, string> = {};
  for (const o of organizers) map[o.tag] = o.url;

  const order = ['organizer_ministry', 'organizer_mapeg', 'organizer_mayem'];
  const labels: Record<string, { tr: string; en: string }> = {
    organizer_ministry: {
      tr: 'T.C. Enerji ve Tabii Kaynaklar Bakanlığı',
      en: 'Republic of Türkiye — Ministry of Energy and Natural Resources',
    },
    organizer_mapeg: {
      tr: 'Maden ve Petrol İşleri Genel Müdürlüğü (MAPEG)',
      en: 'General Directorate of Mining and Petroleum Affairs (MAPEG)',
    },
    organizer_mayem: {
      tr: 'MAYEM — Maden ve Yerbilimleri Profesyonelleri Mesleki Gelişim Derneği',
      en: 'MAYEM — Professional Development Association of Mining and Geoscience Professionals',
    },
  };

  return (
    <section className="bg-white border-b border-brand-ink/10">
      <div className="container-content py-6">
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 lg:gap-20">
          {order.map((tag) => {
            const url = map[tag];
            const label = labels[tag][lang];
            return (
              <div key={tag} className="flex items-center justify-center" title={label}>
                {url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={url} alt={label} className="h-16 sm:h-20 w-auto object-contain" />
                ) : (
                  <div className="h-16 sm:h-20 w-32 rounded-md border border-dashed border-brand-ink/25 grid place-items-center text-[11px] text-brand-ink/40 px-2 text-center">
                    {lang === 'tr' ? 'Logo eklenecek' : 'Logo pending'}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
