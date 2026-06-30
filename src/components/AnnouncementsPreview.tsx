import Link from 'next/link';
import { Lang, pick } from '@/lib/i18n';
import type { Announcement } from '@prisma/client';

function formatDate(d: Date, lang: Lang) {
  return new Intl.DateTimeFormat(lang === 'tr' ? 'tr-TR' : 'en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(d);
}

export default function AnnouncementsPreview({
  items,
  lang,
  heading,
  emptyLabel,
  viewAllLabel,
}: {
  items: Announcement[];
  lang: Lang;
  heading: string;
  emptyLabel: string;
  viewAllLabel: string;
}) {
  return (
    <section className="section bg-brand-paper">
      <div className="container-content">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold">
              {lang === 'tr' ? 'Güncel' : 'Latest'}
            </p>
            <h2 className="h-display text-3xl lg:text-4xl mt-2">{heading}</h2>
          </div>
          <Link href={`/${lang}/announcements`} className="text-sm font-semibold text-brand-green hover:text-brand-green-dark">
            {viewAllLabel} →
          </Link>
        </div>

        {items.length === 0 ? (
          <p className="mt-8 text-brand-ink/60">{emptyLabel}</p>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {items.map((a) => {
              const title = pick(a.titleTr, a.titleEn, lang);
              const body = pick(a.bodyTr, a.bodyEn, lang);
              return (
                <Link
                  key={a.id}
                  href={`/${lang}/announcements/${a.slug}`}
                  className="group block rounded-xl bg-white border border-brand-ink/10 overflow-hidden hover:border-brand-green/40 transition shadow-sm"
                >
                  {a.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={a.imageUrl} alt={title} className="h-44 w-full object-cover" />
                  ) : (
                    <div className="h-44 w-full bg-gradient-to-br from-brand-green/15 to-brand-gold/20" />
                  )}
                  <div className="p-5">
                    <p className="text-xs text-brand-ink/60">{formatDate(a.publishedAt, lang)}</p>
                    <h3 className="mt-2 font-semibold text-brand-ink group-hover:text-brand-green">{title}</h3>
                    <p className="mt-2 text-sm text-brand-ink/65 line-clamp-3">{body}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
